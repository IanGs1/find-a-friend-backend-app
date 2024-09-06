import { AddressesRepository } from "@/repositories/addresses-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { PhotosRepository } from "@/repositories/photos-repository";
import { RequirementsRepository } from "@/repositories/requirements-repository";

import { PetNotFoundError } from "./errors/pet-not-found-error";

export class FetchPetInfosUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private requirementsRepository: RequirementsRepository,
    private addressesRepository: AddressesRepository,
    private photosRepository: PhotosRepository,
  ) {};

  async execute(petId: string) {
    const pet = await this.petsRepository.findById(petId);
    if (!pet) {
      throw new PetNotFoundError();
    };

    const address = await this.addressesRepository.findByOrgId(pet.orgId);
    const requirements = await this.requirementsRepository.findByPetId(petId);
    const photos = await this.photosRepository.findByPetId(petId);

    return {
      pet: {
        ...pet,
        address,
        requirements,
        photos,
      },
    };
  };
};