import { randomUUID } from "node:crypto";

import { Pet, Prisma } from "@prisma/client";

import { PetsRepository } from "../pets-repository";


export class InMemoryPetsRepository implements PetsRepository {
  pets: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      ...data,
    } as Pet;

    this.pets.push(pet);

    return pet;
  };

  async findById(id: string) {
    const pet = this.pets.find(pet => pet.id === id);

    return pet;
  };
};