import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CreateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.body.name) {
      res.status(422).json({ error: "Name is required" });
    }

    if (!req.body.price) {
      res.status(422).json({ error: "Price is required" });
    } else {
      if (typeof req.body.price !== "number" || req.body.price < 0) {
        res.status(422).json({ error: "Price must be a non negative number" });
      }
    }

    if (!req.body.categoryId) {
      res.status(422).json({ error: "Category Id is required" });
    } else {
      if (
        !(await prisma.category.findUnique({
          where: {
            id: parseInt(req.body.categoryId),
          },
        }))
      ) {
        res.status(404).json({ error: "Category Id not found" });
      }
    }

    const createProduct = await prisma.product.create({
      data: req.body,
    });
    res.status(201).json({ createProduct });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal server error" });
    throw error;
  }
};

export const GetProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getAllProducts = await prisma.product.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
      omit: {
        categoryId: true, //remove categoryId from the response
      },
    });
    res.status(200).json(getAllProducts);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal server error" });
    throw error;
  }
};

export const GetProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = parseInt(req.params.id);
    const getProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      omit: {
        categoryId: true,
      },
    });

    if (!getProduct) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.status(200).json(getProduct);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal server error" });
    throw error;
  }
};

export const UpdateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = parseInt(req.params.id);
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!existingProduct) {
      res.status(404).json({ error: "Product not found" });
    }

    if (!req.body.name === undefined || req.body.name.trim() == "") {
      res.status(422).json({ error: "Name can not be empty" });
    }

    const updatedProduct = await prisma.product.update({
      data: req.body,
      where: {
        id: productId,
      },
    });
    res.status(200).json({ updatedProduct });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal server error" });
    throw error;
  }
};

export const DeleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId = parseInt(req.params.id);
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!existingProduct) {
      res.status(404).json({ error: "Product not found" });
    }

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    res.status(204).send("Product deleted successfully");
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal server error" });
    throw error;
  }
};
