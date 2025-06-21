import { Request, Response } from "express";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const CreateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body.name) {
      res.status(422).json({
        error: "Category name is required",
      });
    }

    const newCategory = await prisma.category.create({
      data: {
        name: req.body.name,
      },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    throw error;
  }
};


