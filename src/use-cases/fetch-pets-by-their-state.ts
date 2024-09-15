import { AddressesRepository } from "@/repositories/addresses-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { PhotosRepository } from "@/repositories/photos-repository";
import { RequirementsRepository } from "@/repositories/requirements-repository";

import { Pet } from "@prisma/client";

export class FetchPetsByTheirStateUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private addressesRepository: AddressesRepository,
    private requirementsRepository: RequirementsRepository,
    private photosRepository: PhotosRepository
  ) {}

  async execute(state: string) {
    const addressesInState =
      await this.addressesRepository.filterByState(state);

    const orgsInStateIds = addressesInState.map(address => address.orgId);

    const allPets = await this.petsRepository.index();
    let [pets] = orgsInStateIds.map(orgId => {
      const petsWithOrgId = allPets.filter(pet => pet.orgId === orgId);

      return petsWithOrgId.map(pet => pet);
    });

    const allRequirements = await this.requirementsRepository.index();
    const allPhotos = await this.photosRepository.index();
    const allAddresses = await this.addressesRepository.index();

    pets = pets.map(pet => {
      const petRequirements = allRequirements.filter(
        requirement => requirement.petId === pet.id
      );
      const petPhotos = allPhotos.filter(photo => photo.petId === pet.id);
      const [petAddresses] = allAddresses.filter(
        address => address.orgId === pet.orgId
      );

      return {
        ...pet,
        requirements: petRequirements,
        photos: petPhotos,
        address: petAddresses,
      };
    });

    return {
      pets,
    };
  }
}
