import { PrismaAddressesRepository } from "@/repositories/prisma/prisma-addresses-repository";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterOrgUseCase } from "../register-org-use-case";

export function registerOrgUseCaseFactory() {
  const prismaOrgsRepository = new PrismaOrgsRepository();
  const prismaAddressesRepository = new PrismaAddressesRepository();

  const registerOrgUseCase = new RegisterOrgUseCase(
    prismaOrgsRepository,
    prismaAddressesRepository
  );

  return registerOrgUseCase;
}
