import { beforeEach, describe, expect, it } from "vitest";

import { PetsRepository } from "@/repositories/pets-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";

import { FetchPetByTheirCharacteristicsUseCase } from "./fetch-pets-by-their-characteristics-use-case";

let petsRepository: PetsRepository;
let sut: FetchPetByTheirCharacteristicsUseCase;

describe("Fetch Pets By Their Characteristics Use-Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new FetchPetByTheirCharacteristicsUseCase(petsRepository);
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