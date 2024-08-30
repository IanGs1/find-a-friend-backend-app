import { Prisma, Requirement } from "@prisma/client";

export interface PetsRepository {
  create(data: Prisma.RequirementUncheckedCreateInput): Promise<Requirement>
  findByPetId(petId: string): Promise<Requirement[] | null>
};