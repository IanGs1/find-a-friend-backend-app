import multer from "fastify-multer";
import { Options } from "fastify-multer/lib/interfaces";

import path from "node:path";
import crypto from "node:crypto"

export const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

export const uploadsFolder = path.resolve(tmpFolder, "uploads");

export const multerConfig = {
  storage: multer.diskStorage({
    destination: tmpFolder,
    // This funcion is called right after the upload, so, in request.file object the filename is already this one;
    filename: (_, file, callback) => {
      const filenameHash = crypto.randomBytes(7).toString("hex");
      const filename = `${filenameHash}-${file.originalname}`;
  
      return callback(null, filename);
    },
  }),
} as Options