import { Request, Response } from "express";
import Task from "../models/task.model";
import paginationHelper from "../helpers/pagination";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const sort = req.query.sort === "desc" ? -1 : 1;
    const find = {
      deleted: false,
    };
    // Build a dynamic query
    const query: any = { deleted: false };
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }
    // Pagination setup
    let initPagination = {
      currentPage: 1,
      limitItems: 2,
    };
    const countProducts = await Task.countDocuments(find); // Use countDocuments instead of count
    const pagination = paginationHelper(
      initPagination,
      req.query,
      countProducts
    );
    // Fetch tasks from the database with sorting
    const tasks = await Task.find(query)
      .sort({ title: sort })
      .limit(pagination.limitItems)
      .skip(pagination.skip ?? 0);

    res.status(200).json({ message: "Successful!", data: tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

export const getTasksDetail = async (req: Request, res: Response) => {
  const id: String = req.params.id;
  const tasks = await Task.find({
    _id: id,
    deleted: false,
  }); // Không có điều kiện "deleted: false"
  res.status(200).json({ message: "Successful !", data: tasks });
};
