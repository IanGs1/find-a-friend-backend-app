import { beforeEach, describe, expect, it } from "vitest";

import { PetsRepository } from "@/repositories/pets-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";

import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";

import { RequirementsRepository } from "@/repositories/requirements-repository";
import { InMemoryRequirementsRepository } from "@/repositories/in-memory/in-memory-requirements-repository";

import { RegisterPetUseCase } from "./register-pet-use-case";
import { OrgNotFoundError } from "./errors/org-not-found-error";

let petsRepository: PetsRepository;
let orgsRepository: OrgsRepository;
let requirementsRepository: RequirementsRepository;
let sut: RegisterPetUseCase;

describe("Register Org Use-Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    requirementsRepository = new InMemoryRequirementsRepository();
    sut = new RegisterPetUseCase(orgsRepository, petsRepository, requirementsRepository);
  });

  it("It should be able to register as a Pet", async () => {
    const createOrgResponse = await orgsRepository.create({
      responsableName: "Jonh Doe",
      email: "jonhdoe@email.com",
      password: "123456",
      phone: "(24) 93245-4321",
    });

    const { pet } = await sut.execute({
      name: "Fluffy",
      about: "A sweet and beautiful dog",
      age: "Puppy",
      size: "Little",
      energy: 4,
      independencyLevel: "Low",
      space: "Normal",
      orgId: createOrgResponse.id,
      requirements: ["Food", "Safe zone"],
    });

    expect(pet.id).toEqual(expect.any(String));
  });

  it("It should not be able to register a Pet with a not valid ORG Id", async () => {
    await expect(() => 
      sut.execute({
        name: "Fluffy",
        about: "A sweet and beautiful dog",
        age: "Puppy",
        size: "Little",
        energy: 4,
        independencyLevel: "Low",
        space: "Normal",
        orgId: "not-valid-id",
        requirements: ["Food", "Safe zone"],
      })
    ).rejects.toBeInstanceOf(OrgNotFoundError);
  });
});