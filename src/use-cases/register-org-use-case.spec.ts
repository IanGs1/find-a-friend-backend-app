import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";

import { AddressesRepository } from "@/repositories/addresses-repository";
import { InMemoryAddressesRepository } from "@/repositories/in-memory/in-memory-addresses-repository";

import { RegisterOrgUseCase } from "./register-org-use-case";
import { EmailAlreadyInUseError } from "./errors/email-already-in-use-error";

import { compare } from "bcryptjs";

let orgsRepository: OrgsRepository;
let addressesRepository: AddressesRepository;
let sut: RegisterOrgUseCase;

describe("Register Org Use-Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    addressesRepository = new InMemoryAddressesRepository();
    sut = new RegisterOrgUseCase(orgsRepository, addressesRepository);
  });

  it("It should be able to register as an ORG", async () => {
    const data = {
      responsableName: "Jonh Doe",
      email: "jonhdoe@email.com",
      password: "123456",
      phone: "(24) 93245-4321",
      address: {
        state: "Rio de Janeiro",
        municipality: "Niterói",
        neighborhood: "Icaraí",
        street: "Rua dos Afazeres",
        number: 123,
        cep: "23491-332",
      },
    };

    const { org } = await sut.execute(data);

    expect(org.id).toEqual(expect.any(String));
  });

  it("A password should be encrypted while registering an ORG", async () => {
    const data = {
      responsableName: "Jonh Doe",
      email: "jonhdoe@email.com",
      password: "123456",
      phone: "(24) 93245-4321",
      address: {
        state: "Rio de Janeiro",
        municipality: "Niterói",
        neighborhood: "Icaraí",
        street: "Rua dos Afazeres",
        number: 123,
        cep: "23491-332",
      },
    };

    const { org } = await sut.execute(data);

    const passwordMatch = await compare("123456", org.password);

    expect(passwordMatch).toBe(true);
  });

  it("It should not be able to register an ORG if the email is already in use", async () => {
    const data = {
      responsableName: "Jonh Doe",
      email: "jonhdoe@email.com",
      password: "123456",
      phone: "(24) 93245-4321",
      address: {
        state: "Rio de Janeiro",
        municipality: "Niterói",
        neighborhood: "Icaraí",
        street: "Rua dos Afazeres",
        number: 123,
        cep: "23491-332",
      },
    };

    await sut.execute(data);

    await expect(() => 
      sut.execute(data),
    ).rejects.toBeInstanceOf(EmailAlreadyInUseError);
  });
});