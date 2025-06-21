import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const CreateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.body.name) {
      res.status(422).json({
        error: "Category name is required",
      });
    }

    if (
      await prisma.category.findUnique({
        where: {
          name: req.body.name,
        },
      })
    ) {
      res.status(422).json({
        error: "Category already exists",
      });
      return;
    }

    const newCategory = await prisma.category.create({
      data: {
        name: req.body.name,
      },
    });
    res.status(201).json(newCategory);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal server error" });
    throw error;
  }
};

export const GetCategories = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const getAllCategories = await prisma.category.findMany();
    res.status(200).json(getAllCategories);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal server error" });
    throw error;
  }
};

export const UpdateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (
      !(await prisma.category.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      }))
    ) {
      res.status(404).json({ error: "Category not found" });
    }
    if (!req.body.name) {
      res.status(422).json({
        error: "Category name is required",
      });
    }

    if (
      await prisma.category.findUnique({
        where: {
          name: req.body.name,
        },
      })
    ) {
      res.status(422).json({
        error: "Category already exists",
      });
      return;
    }

    const updatedCategory = await prisma.category.update({
      data: {
        name: req.body.name,
      },
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(200).json({ updatedCategory });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal server error" });
    throw error;
  }
};
