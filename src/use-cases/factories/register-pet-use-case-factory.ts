import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PrismaRequirementsRepository } from "@/repositories/prisma/prisma-requirements-repository";
import { RegisterPetUseCase } from "../register-pet-use-case";

export function registerPetUseCaseFactory() {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const prismaPetsRepository = new PrismaPetsRepository();
  const prismaRequirementsRepository = new PrismaRequirementsRepository();

  const registerPetUseCase = new RegisterPetUseCase(
    prismaOrgsRepository,
    prismaPetsRepository,
    prismaRequirementsRepository
  );

  return registerPetUseCase;
}
