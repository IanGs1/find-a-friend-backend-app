import path from "node:path";
import fs from "node:fs";

import { tmpFolder, uploadsFolder } from "../config/upload-config";

export class DiskStorage {
  async save(filename: string) {
    await fs.promises.rename(
      path.resolve(__dirname, tmpFolder, filename),
      path.resolve(__dirname, uploadsFolder, filename),
    );

    return filename;
  };

  async delete(filename: string) {
    const filepath = path.resolve(uploadsFolder, filename);

    try {
      await fs.promises.stat(filepath);
    } catch {
      return;
    };

    await fs.promises.unlink(filepath);
  };
};