import { beforeEach, describe, expect, it } from "vitest";

import { PetsRepository } from "@/repositories/pets-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";

import { AddressesRepository } from "@/repositories/addresses-repository";
import { InMemoryAddressesRepository } from "@/repositories/in-memory/in-memory-addresses-repository";

import { RequirementsRepository } from "@/repositories/requirements-repository";
import { InMemoryRequirementsRepository } from "@/repositories/in-memory/in-memory-requirements-repository";

import { PhotosRepository } from "@/repositories/photos-repository";
import { InMemoryPhotosRepository } from "@/repositories/in-memory/in-memory-photos-repository";

import { FetchPetByTheirCharacteristicsUseCase } from "./fetch-pets-by-their-characteristics-use-case";

let petsRepository: PetsRepository;
let addressesRepository: AddressesRepository
let requirementsRepository: RequirementsRepository;
let photosRepository: PhotosRepository;

let sut: FetchPetByTheirCharacteristicsUseCase;

describe("Fetch Pets By Their Characteristics Use-Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();

    addressesRepository = new InMemoryAddressesRepository();
    requirementsRepository = new InMemoryRequirementsRepository();
    photosRepository = new InMemoryPhotosRepository();

    sut = new FetchPetByTheirCharacteristicsUseCase(petsRepository, addressesRepository, requirementsRepository, photosRepository);
  });

  it("It should be able to fetch a pet by their characteristics", async () => {
    const createPetResponse = await petsRepository.create({
      name: "Fluffy",
      about: "A sweet and beautiful dog",
      age: "Puppy",
      size: "Little",
      energy: 4,
      independencyLevel: "Low",
      space: "Normal",
      orgId: "some-org-id",
    });

    await petsRepository.create({
      name: "Fluffy",
      about: "A sweet and beautiful dog",
      age: "Puppy",
      size: "Little",
      energy: 3,
      independencyLevel: "Low",
      space: "Normal",
      orgId: "some-org-id",
    });

    const petCharacteristics = {
      energy: 4,
    };

    const { pets } = await sut.execute(petCharacteristics);

    expect(pets.length).toBe(1)
    expect(pets).toEqual([
      expect.objectContaining({
        id: createPetResponse.id
      }),
    ]);
  });
});