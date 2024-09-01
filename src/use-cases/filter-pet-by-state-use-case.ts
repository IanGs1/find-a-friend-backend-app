import { AddressesRepository } from "@/repositories/addresses-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { PhotosRepository } from "@/repositories/photos-repository";

interface Pet {
  id: string;
  name: string;
  about: string;
  age: "Puppy" | "Adult" | "Old";
  size: "Little" | "Normal" | "Big";
  energy: number;
  independencyLevel: "Low" | "Middle" | "High";
  space: "Normal" | "Small" | "Wide";
  orgId: string;
};

interface Address {
  id: string;
  state: string;
  municipality: string;
  neighborhood: string;
  street: string;
  number: number;
  cep: string;
  orgId: string;
};

interface Photo {
  id: string
  path: string
  petId: string
};

interface PetsWithPhotosAndAddress {
  id: string;
  name: string;
  about: string;
  age: "Puppy" | "Adult" | "Old";
  size: "Little" | "Normal" | "Big";
  energy: number;
  independencyLevel: "Low" | "Middle" | "High";
  space: "Normal" | "Small" | "Wide";
  orgId: string;

  address: Address;
  photos: Photo[];
};

export class FilterPetByStateUseCase {
  private pets: Pet[] = [];
  private addresses: Address[] = [];

  private petWithPhotosAndAddresses: PetsWithPhotosAndAddress[] = [];

  constructor(
    private petsRepository: PetsRepository,
    private addressesRepository: AddressesRepository,
    private photosRepository: PhotosRepository,
  ) {};

  async execute(state: string) { 

    this.addresses = await this.addressesRepository.filterByState(state);

    this.addresses.forEach(async address => {
      this.pets = await this.petsRepository.findByOrgId(address.orgId);
    });

    this.pets.forEach(async pet => {
      const photos = await this.photosRepository.findByPetId(pet.id);
      const address = await this.addressesRepository.findByOrgId(pet.orgId);

      this.petWithPhotosAndAddresses = [
        {
          ...pet,
          address,
          photos: [
            ...photos,
          ],
        },
        ...this.petWithPhotosAndAddresses,
      ];
    });

    return {
      pets: [
        ...this.petWithPhotosAndAddresses
      ]
    }
  };
};