import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";

import { AuthenticateOrgUseCase } from "./authenticate-org-use-case";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let orgsRepository: OrgsRepository;
let sut: AuthenticateOrgUseCase;

describe("Register Org Use-Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateOrgUseCase(orgsRepository);
  });

  it("It should be able to authenticate as an ORG", async () => {
    const createOrgResponse = await orgsRepository.create({
      responsableName: "Jonh Doe",
      email: "jonhdoe@email.com",
      password: "123456",
      phone: "(24) 93245-4321",
    });
    
    const data = {
      email: "jonhdoe@email.com",
      password: "123456",
    };

    const { org } = await sut.execute(data);

    expect(org.id).toEqual(createOrgResponse.id);
  });

  it("It should not be able to authenticate as an ORG with wrong credentials", async () => {
    await expect(() =>  
      sut.execute({
        email: "not-a-valid-email@email.com",
        password: "not-a-valid-password",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});