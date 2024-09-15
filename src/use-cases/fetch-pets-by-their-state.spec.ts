import { beforeEach, describe, expect, it } from "vitest";

import { PetsRepository } from "@/repositories/pets-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";

import { AddressesRepository } from "@/repositories/addresses-repository";
import { InMemoryAddressesRepository } from "@/repositories/in-memory/in-memory-addresses-repository";

import { RequirementsRepository } from "@/repositories/requirements-repository";
import { InMemoryRequirementsRepository } from "@/repositories/in-memory/in-memory-requirements-repository";

import { PhotosRepository } from "@/repositories/photos-repository";
import { InMemoryPhotosRepository } from "@/repositories/in-memory/in-memory-photos-repository";

import { FetchPetsByTheirStateUseCase } from "./fetch-pets-by-their-state";

let petsRepository: PetsRepository;
let addressesRepository: AddressesRepository;
let requirementsRepository: RequirementsRepository;
let photosRepository: PhotosRepository;

let sut: FetchPetsByTheirStateUseCase;

describe("Fetch Pets By Their State Use-Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();

    addressesRepository = new InMemoryAddressesRepository();
    requirementsRepository = new InMemoryRequirementsRepository();
    photosRepository = new InMemoryPhotosRepository();

    sut = new FetchPetsByTheirStateUseCase(
      petsRepository,
      addressesRepository,
      requirementsRepository,
      photosRepository
    );
  });

  it("It should be able to fetch a pet by their state", async () => {
    await addressesRepository.create({
      state: "Rio de Janeiro",
      municipality: "Niterói",
      neighborhood: "Icaraí",
      street: "Rua dos Afazeres",
      number: 123,
      cep: "23491-332",
      orgId: "some-org-id",
    });

    await addressesRepository.create({
      state: "São Paulo",
      municipality: "Osasco",
      neighborhood: "Centro",
      street: "Rua dos Afazeres",
      number: 123,
      cep: "23491-332",
      orgId: "another-org-id",
    });

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
      name: "Super Fluffy",
      about: "A sweet and beautiful dog",
      age: "Puppy",
      size: "Little",
      energy: 4,
      independencyLevel: "Low",
      space: "Normal",
      orgId: "another-org-id",
    });

    const { pets } = await sut.execute("Rio de Janeiro");

    expect(pets.length).toBe(1);
    expect(pets).toEqual([
      expect.objectContaining({
        id: createPetResponse.id,
      }),
    ]);
  });
});
