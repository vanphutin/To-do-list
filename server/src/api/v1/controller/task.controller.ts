import { Request, Response } from "express";
import Task from "../models/task.model";
import paginationHelper from "../helpers/pagination";
import searchHelper from "../helpers/search";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const keyword = req.query.search as string;
    const sort = req.query.sort === "desc" ? -1 : 1;
    interface Find {
      deleted: Boolean;
      title?: RegExp;
    }
    const find: Find = {
      deleted: false,
    };
    // Search by title
    const objectSearch = searchHelper(req.query);
    if (keyword) {
      find.title = objectSearch.regex;
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
    const tasks = await Task.find(find)
      .sort({ title: sort })
      .limit(pagination.limitItems)
      .skip(pagination.skip ?? 0);

    res.status(200).json({ message: "Successful!", data: tasks });
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).json({
      message: "Error fetching tasks",
      error: (error as Error).message || error,
    });
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
