import { PetsRepository } from "@/repositories/pets-repository";
import { PhotosRepository } from "@/repositories/photos-repository";

import { PetNotFoundError } from "@/use-cases/errors/pet-not-found-error";

import { DiskStorage } from "@/utils/disk-storage";
import path from "path";

interface UploadPetPhotosUseCaseRequest {
  file: string;
  petId: string;
};

export class UploadPetPhotosUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private photosRepository: PhotosRepository,
    private diskStorage: DiskStorage,
  ) {};

  async execute({ petId, file }: UploadPetPhotosUseCaseRequest) {
    const pet = await this.petsRepository.findById(petId);
    console.log(pet);
    if (!pet) {
      throw new PetNotFoundError();
    };

    const filename = await this.diskStorage.save(file);

    const filepath = path.resolve(__dirname, "..", "..", "tmp", "uploads", filename);

    const photo = await this.photosRepository.upload({
      path: filepath,
      petId,
    });

    return {
      photo,
    }
  };
};