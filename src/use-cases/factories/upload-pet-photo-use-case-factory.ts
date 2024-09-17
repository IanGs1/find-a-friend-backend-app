import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PrismaPhotosRepository } from "@/repositories/prisma/prisma-photos-repository";
import { DiskStorage } from "@/utils/disk-storage";
import { UploadPetPhotosUseCase } from "../upload-pet-photo-use-case";

export function uploadPetPhotoUseCaseFactory() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const prismaPhotosRepository = new PrismaPhotosRepository();

  const diskStorage = new DiskStorage();

  const uploadPetPhotoUseCase = new UploadPetPhotosUseCase(
    prismaPetsRepository,
    prismaPhotosRepository,
    diskStorage
  );

  return uploadPetPhotoUseCase;
}
