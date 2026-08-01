import type { Request, Response } from "express";
import { companiesService } from "../companies/companies.service.js";
import { qrService } from "./qr.service.js";

export const qrController = {
  async get(req: Request, res: Response) {
    const company = await companiesService.getProfile(req.tenant!.companyId);
    const format = req.query.format === "svg" ? "svg" : "png";

    if (format === "svg") {
      const svg = await qrService.toSvg(company.slug);
      res.set("Content-Type", "image/svg+xml");
      res.send(svg);
      return;
    }

    const png = await qrService.toPng(company.slug);
    res.set("Content-Type", "image/png");
    res.send(png);
  },

  async getMeta(req: Request, res: Response) {
    const company = await companiesService.getProfile(req.tenant!.companyId);
    res.json({ menuUrl: qrService.publicMenuUrl(company.slug) });
  },
};
