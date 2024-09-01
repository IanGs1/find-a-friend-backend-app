import { PetsRepository } from "@/repositories/pets-repository";
import { RequirementsRepository } from "@/repositories/requirements-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";

import { OrgNotFoundError } from "./errors/org-not-found-error";

interface RegisterPetUseCaseRequest {
  name: string;
  about: string;
  age: "Puppy" | "Adult" | "Old";
  size: "Little" | "Normal" | "Big";
  energy: number;
  independencyLevel: "Low" | "Middle" | "High";
  space: "Normal" | "Small" | "Wide";
  orgId: string;
  requirements: string[];
};

interface CreateRequirementResponse {
  id: string;
  name: string;
  petId: string;
};

export class RegisterPetUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
    private requirementsRepository: RequirementsRepository
  ) {};

  async execute({requirements: requirementsData, ...petData}: RegisterPetUseCaseRequest) {
    let requirements: CreateRequirementResponse[] = [];

    const org = await this.orgsRepository.findById(petData.orgId);
    if (!org) {
      throw new OrgNotFoundError();
    };

    const pet = await this.petsRepository.create(petData);
    requirementsData.forEach(async requirement => {
      const createRequirementResponse = await this.requirementsRepository.create({
        name: requirement,
        petId: pet.id,
      });

      requirements.push(createRequirementResponse);
    });

    return {
      pet: {
        ...pet,
        requirements,
      }
    }
  };
};