import { OrgsRepository } from "@/repositories/orgs-repository";
import { AddressesRepository } from "@/repositories/addresses-repository";

import { EmailAlreadyInUseError } from "./errors/email-already-in-use-error";

/** Avoiding using ORM things in the Use Case layer */
interface CreateOrgRequest {
  responsableName: string;
  email: string;
  password: string;
  phone: string;

  address: {
    state: string
    municipality: string
    neighborhood: string
    street: string
    number: number
    cep: string
  };
};

export class RegisterOrgUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private addressesRepository: AddressesRepository,
  ) {};

  async execute({ address: addressData, ...orgData }: CreateOrgRequest) {
    const emailAlreadyInUse = await this.orgsRepository.findByEmail(orgData.email);
    if (emailAlreadyInUse) {
      throw new EmailAlreadyInUseError();
    };

    const org = await this.orgsRepository.create(orgData);
    const address = await this.addressesRepository.create({
      ...addressData,
      orgId: org.id,
    });

    return {
      ...org,
      address: {
        ...address,
      },
    };
  };
};