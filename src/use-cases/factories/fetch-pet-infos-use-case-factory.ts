import { PrismaAddressesRepository } from "@/repositories/prisma/prisma-addresses-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PrismaPhotosRepository } from "@/repositories/prisma/prisma-photos-repository";
import { PrismaRequirementsRepository } from "@/repositories/prisma/prisma-requirements-repository";
import { FetchPetInfosUseCase } from "../fetch-pet-infos-use-case";

export function fetchPetInfosUseCaseFactory() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const prismaAddressesRepository = new PrismaAddressesRepository();
  const prismaRequirementsRepository = new PrismaRequirementsRepository();
  const prismaPhotosRepository = new PrismaPhotosRepository();

  const fetchPetInfosUseCase = new FetchPetInfosUseCase(
    prismaPetsRepository,
    prismaRequirementsRepository,
    prismaAddressesRepository,
    prismaPhotosRepository
  );

  return fetchPetInfosUseCase;
}
