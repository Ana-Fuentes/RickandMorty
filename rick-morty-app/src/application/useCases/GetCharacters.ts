import { Character } from "../../domain/entities/Character";
import { CharacterRepository } from "../../domain/repositories/CharacterRepository";

export class GetCharacters {
  constructor(private repository: CharacterRepository) {}

  async execute(): Promise<Character[]> {
    return await this.repository.getCharacters();
  }
}