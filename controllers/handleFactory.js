import { appError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new appError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: null,
    });
  });

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new appError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

export const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find();

    res.status(200).json({
      status: "success",
      result: doc.length,
      data: doc,
    });
  });

export const getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(new appError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      result: doc.length,
      data: doc,
    });
  });

export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: doc,
    });
  });
