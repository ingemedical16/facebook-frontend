import { Request, Response } from "express";
import { createErrorResponse, createSuccussResponse, searchImages, uploadsFilesToCloud } from "../../helpers";
import formidable from "formidable";
import path from "path";


export const uploadFile = async (req: Request, res: Response) => {

  try {
    const form = formidable({
      uploadDir: path.join(__dirname, "..","..", "public"),
      filename(name, ext, part) {
        const uniqueFileName =
          Date.now() + "_" + (part.originalFilename ?? name + ".jpg");
        return uniqueFileName;
      },
    });
    await form.parse(req);

    return createSuccussResponse(
      res,
      200,
      "FILE_UPLOADED",
      "File uploaded successfully."
    );
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const uploadFilesToCloud = async (req: Request, res: Response) => {
  try {
    const { folder } = req.body;
    const { files } = req;
    const images = files?.images;
    const result = await uploadsFilesToCloud(images ?? [], folder);
    return createSuccussResponse(
      res,
      200,
      "FILE_UPLOADED_TO_CLOUD",
      "File uploaded to cloud successfully.",
      {files: result }
    );
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};

export const searchImagesInCloud = async (req: Request, res: Response) => {
  try {
    const { path, sort, max } = req.query;
    const result = await searchImages(
      path as string,
      sort as "asc" | "desc",
      Number(max)
    );
    return res.status(200).json({
      code: "IMAGES_SEARCHED",
      message: "Images searched successfully.",
      data: result,
    });
  } catch (error: unknown) {
    const errorMessage =
      (error as Error).message ||
      "An unexpected error occurred. Please try again later.";
    return createErrorResponse(res, 500, "SERVER_ERROR", errorMessage);
  }
};
