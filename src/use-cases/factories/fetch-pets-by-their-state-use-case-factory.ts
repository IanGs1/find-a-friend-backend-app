import { PrismaAddressesRepository } from "@/repositories/prisma/prisma-addresses-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { PrismaPhotosRepository } from "@/repositories/prisma/prisma-photos-repository";
import { PrismaRequirementsRepository } from "@/repositories/prisma/prisma-requirements-repository";
import { FetchPetsByTheirStateUseCase } from "../fetch-pets-by-their-state";

export function fetchPetsByTheirStateUseCaseFactory() {
  const prismaPetsRepository = new PrismaPetsRepository();
  const prismaAddressesRepository = new PrismaAddressesRepository();
  const prismaRequirementsRepository = new PrismaRequirementsRepository();
  const prismaPhotosRepository = new PrismaPhotosRepository();

  const fetchPetsByTheirStateUseCase = new FetchPetsByTheirStateUseCase(
    prismaPetsRepository,
    prismaAddressesRepository,
    prismaRequirementsRepository,
    prismaPhotosRepository
  );

  return fetchPetsByTheirStateUseCase;
}
