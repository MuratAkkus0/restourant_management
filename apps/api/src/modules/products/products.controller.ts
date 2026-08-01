import type { Request, Response } from "express";
import type { CreateProductInput, ReorderProductsInput, UpdateProductInput } from "@manegio/shared";
import { getParam } from "../../utils/request.js";
import { productsService } from "./products.service.js";

export const productsController = {
  async list(req: Request, res: Response) {
    const products = await productsService.list(req.tenant!.companyId);
    res.json({ products });
  },

  async get(req: Request, res: Response) {
    const product = await productsService.get(req.tenant!.companyId, getParam(req, "id"));
    res.json({ product });
  },

  async create(req: Request, res: Response) {
    const product = await productsService.create(req.tenant!.companyId, req.body as CreateProductInput);
    res.status(201).json({ product });
  },

  async update(req: Request, res: Response) {
    const product = await productsService.update(
      req.tenant!.companyId,
      getParam(req, "id"),
      req.body as UpdateProductInput,
    );
    res.json({ product });
  },

  async remove(req: Request, res: Response) {
    await productsService.delete(req.tenant!.companyId, getParam(req, "id"));
    res.status(204).send();
  },

  async setPublished(req: Request, res: Response) {
    const product = await productsService.setPublished(
      req.tenant!.companyId,
      getParam(req, "id"),
      Boolean(req.body.isPublished),
    );
    res.json({ product });
  },

  async reorder(req: Request, res: Response) {
    const products = await productsService.reorder(req.tenant!.companyId, req.body as ReorderProductsInput);
    res.json({ products });
  },
};
