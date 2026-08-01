import type { Request, Response } from "express";
import { getParam } from "../../utils/request.js";
import { menusService } from "./menus.service.js";

export const menusController = {
  async getAdminMenu(req: Request, res: Response) {
    const menu = await menusService.getAdminMenu(req.tenant!.companyId);
    res.json(menu);
  },

  async setPublished(req: Request, res: Response) {
    const company = await menusService.setPublished(req.tenant!.companyId, Boolean(req.body.isPublished));
    res.json({ company });
  },

  async getPublicMenu(req: Request, res: Response) {
    const menu = await menusService.getPublicMenu(getParam(req, "companySlug"));
    // The public menu is safe to cache briefly at the edge/browser - it has
    // no per-user data and changes only when an admin edits the menu.
    res.set("Cache-Control", "public, max-age=60");
    res.json(menu);
  },
};
