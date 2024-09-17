import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateOrgUseCase } from "../authenticate-org-use-case";

export function authenticateOrgUseCaseFactory() {
  const prismaOrgsRepository = new PrismaOrgsRepository();

  const authenticateOrgUseCase = new AuthenticateOrgUseCase(
    prismaOrgsRepository
  );

  return authenticateOrgUseCase;
}
