import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { pinoHttp } from "pino-http";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { apiRateLimiter } from "./middleware/rate-limit.js";
import { requireAuth } from "./middleware/auth.middleware.js";
import { resolveTenant } from "./middleware/tenant.middleware.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";
import { UPLOAD_STATIC_DIR, UPLOAD_URL_PREFIX } from "./modules/uploads/local-storage.js";

import authRoutes from "./modules/auth/auth.routes.js";
import publicMenuRoutes from "./modules/menus/public-menu.routes.js";
import categoriesRoutes from "./modules/categories/categories.routes.js";
import productsRoutes from "./modules/products/products.routes.js";
import companiesRoutes from "./modules/companies/companies.routes.js";
import menusRoutes from "./modules/menus/menus.routes.js";
import qrRoutes from "./modules/qr/qr.routes.js";
import uploadsRoutes from "./modules/uploads/uploads.routes.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", 1);

  app.use(
    helmet({
      // The API only ever serves JSON + uploaded images, never HTML, so a
      // strict default-deny CSP is safe and doesn't need script/style allowances.
      contentSecurityPolicy: { directives: { defaultSrc: ["'none'"], imgSrc: ["'self'"] } },
      crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
  );
  app.use(cors({ origin: env.corsOrigins, credentials: true }));
  app.use(cookieParser());
  app.use(express.json({ limit: "1mb" }));
  app.use(pinoHttp({ logger, autoLogging: !env.isTest }));
  app.use(apiRateLimiter);

  app.use(`${UPLOAD_URL_PREFIX}`, express.static(UPLOAD_STATIC_DIR));

  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  // Public surface: no auth, tenant-agnostic.
  app.use("/api/auth", authRoutes);
  app.use("/api/public/menu", publicMenuRoutes);

  // Authenticated surface: every route below resolves its tenant from the
  // caller's membership - never from client input.
  const adminRouter = express.Router();
  adminRouter.use(requireAuth, resolveTenant);
  adminRouter.use("/categories", categoriesRoutes);
  adminRouter.use("/products", productsRoutes);
  adminRouter.use("/companies", companiesRoutes);
  adminRouter.use("/menu", menusRoutes);
  adminRouter.use("/qr", qrRoutes);
  adminRouter.use("/uploads", uploadsRoutes);
  app.use("/api/admin", adminRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
