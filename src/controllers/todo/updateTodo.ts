import { NextFunction, Request, Response } from "express";
import { AppError } from "middlewares/errorHandler";
import Todo from "models/todoModel";

interface Params {
  id: string;
}

export const updateTodo = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title } = req.body;

    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );
    if (!updated) return next(new AppError("Todo not found!", 404));

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};
