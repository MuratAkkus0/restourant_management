import type { Request, Response } from "express";
import type { CreateCategoryInput, ReorderCategoriesInput, UpdateCategoryInput } from "@manegio/shared";
import { getParam } from "../../utils/request.js";
import { categoriesService } from "./categories.service.js";

export const categoriesController = {
  async list(req: Request, res: Response) {
    const categories = await categoriesService.list(req.tenant!.companyId);
    res.json({ categories });
  },

  async create(req: Request, res: Response) {
    const category = await categoriesService.create(req.tenant!.companyId, req.body as CreateCategoryInput);
    res.status(201).json({ category });
  },

  async update(req: Request, res: Response) {
    const category = await categoriesService.update(
      req.tenant!.companyId,
      getParam(req, "id"),
      req.body as UpdateCategoryInput,
    );
    res.json({ category });
  },

  async remove(req: Request, res: Response) {
    await categoriesService.delete(req.tenant!.companyId, getParam(req, "id"));
    res.status(204).send();
  },

  async reorder(req: Request, res: Response) {
    const categories = await categoriesService.reorder(
      req.tenant!.companyId,
      req.body as ReorderCategoriesInput,
    );
    res.json({ categories });
  },
};
