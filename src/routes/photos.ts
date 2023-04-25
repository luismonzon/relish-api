import express, { NextFunction, Request, Response } from "express";
import photoEnrichmentService from "../services/photoEnrichment.service";
import { query, validationResult } from "express-validator";

const router = express.Router();

router.get(
  "/",
  [
    query("title").isString().optional(),
    query("album.title").isString().optional(),
    query("album.user.email").isString().optional(),
  ],
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      res.send({ errors: result.array() });
      return;
    }

    try {
      const albumTitle = req.query["album.title"] as string;
      const userEmail = req.query["album.user.email"] as string;
      const title = req.query.title as string;

      const enrichedPhotos = await photoEnrichmentService.getPhotosBy({
        title,
        userEmail,
        albumTitle,
      });
      res.send(enrichedPhotos);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:photoId",
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { photoId } = req.params;

    try {
      const enrichedPhoto = await photoEnrichmentService.getPhoto(+photoId);
      res.send(enrichedPhoto);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
