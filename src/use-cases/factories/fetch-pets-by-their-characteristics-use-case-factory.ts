import { PrismaAddressesRepository } from "@/repositories/prisma/prisma-addresses-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PrismaPhotosRepository } from "@/repositories/prisma/prisma-photos-repository";
import { PrismaRequirementsRepository } from "@/repositories/prisma/prisma-requirements-repository";
import { FetchPetByTheirCharacteristicsUseCase } from "../fetch-pets-by-their-characteristics-use-case";

export function fetchPetsByTheirCharacteristicsUseCaseFactory() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const prismaAddressesRepository = new PrismaAddressesRepository();
  const prismaRequirementsRepository = new PrismaRequirementsRepository();
  const prismaPhotosRepository = new PrismaPhotosRepository();

  const fetchPetsByTheirCharacteristicsUseCase =
    new FetchPetByTheirCharacteristicsUseCase(
      prismaPetsRepository,
      prismaAddressesRepository,
      prismaRequirementsRepository,
      prismaPhotosRepository
    );

  return fetchPetsByTheirCharacteristicsUseCase;
}
