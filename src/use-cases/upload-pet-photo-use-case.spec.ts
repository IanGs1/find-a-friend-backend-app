import { beforeEach, describe, expect, it } from "vitest";

import { PetsRepository } from "@/repositories/pets-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";

import { InMemoryPhotosRepository } from "@/repositories/in-memory/in-memory-photos-repository";
import { PhotosRepository } from "@/repositories/photos-repository";

import { UploadPetPhotosUseCase } from "./upload-pet-photo-use-case";
import { PetNotFoundError } from "./errors/pet-not-found-error";

import { DiskStorage } from "@/utils/disk-storage";

import fs from "node:fs";

let petsRepository: PetsRepository;
let diskStorage: DiskStorage;
let photosRepository: PhotosRepository;
let sut: UploadPetPhotosUseCase;

describe("Register Org Use-Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    diskStorage = new DiskStorage();
    photosRepository = new InMemoryPhotosRepository();
    sut = new UploadPetPhotosUseCase(
      petsRepository,
      photosRepository,
      diskStorage
    );
  });

  it.skip("It should be able to upload a Pet photo", async () => {
    const createPetResponse = await petsRepository.create({
      name: "Fluffy",
      about: "A sweet and beautiful dog",
      age: "Puppy",
      size: "Little",
      energy: 4,
      independencyLevel: "Low",
      space: "Normal",
      orgId: "fake-org-id",
    });

    const filename = "image.png";

    const { photo } = await sut.execute({
      petId: createPetResponse.id,
      file: filename,
    });

    const isFilepathValid = Boolean(await fs.promises.stat(photo.path));

    expect(photo.id).toEqual(expect.any(String));
    expect(isFilepathValid).toBe(true);
  });

  it.skip("It should not bel able to upload a Pet Photo with a invalid Pet Id", async () => {
    await expect(() =>
      sut.execute({
        petId: "not-valid-pet-id",
        file: "node-js",
      })
    ).rejects.toBeInstanceOf(PetNotFoundError);
  });
});
