import { AddressesRepository } from "@/repositories/addresses-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { PhotosRepository } from "@/repositories/photos-repository";
import { RequirementsRepository } from "@/repositories/requirements-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchPetInfosUseCase } from "./fetch-pet-infos-use-case";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { InMemoryRequirementsRepository } from "@/repositories/in-memory/in-memory-requirements-repository";
import { InMemoryAddressesRepository } from "@/repositories/in-memory/in-memory-addresses-repository";
import { InMemoryPhotosRepository } from "@/repositories/in-memory/in-memory-photos-repository";

let petsRepository: PetsRepository;
let requirementsRepository: RequirementsRepository;
let addressesRepository: AddressesRepository;
let photosRepository: PhotosRepository;
let sut: FetchPetInfosUseCase;

describe("Fetch Pet Infos Use-Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    requirementsRepository = new InMemoryRequirementsRepository();
    addressesRepository = new InMemoryAddressesRepository();
    photosRepository = new InMemoryPhotosRepository();

    sut = new FetchPetInfosUseCase(
      petsRepository,
      requirementsRepository,
      addressesRepository,
      photosRepository,
    );
  });

  it("It should be able to fetch pet infos", async () => {
    await addressesRepository.create({
      state: "Rio de Janeiro",
      municipality: "Niterói",
      neighborhood: "Icaraí",
      street: "Rua dos Afazeres",
      number: 123,
      cep: "23491-332",
      orgId: "any-org-id",
    });

    const createPetResponse = await petsRepository.create({
      name: "Fluffy",
      about: "A sweet and beautiful dog",
      age: "Puppy",
      size: "Little",
      energy: 4,
      independencyLevel: "Low",
      space: "Normal",
      orgId: "any-org-id",
    });

    const { pet } = await sut.execute(createPetResponse.id);

    expect(pet.id).toEqual(createPetResponse.id);
    expect(pet).toEqual(
      expect.objectContaining({
        name: "Fluffy",
        address: expect.objectContaining({
          municipality: "Niterói"
        }),
        requirements: [],
        photos: [],
      }),
    )
  });
});