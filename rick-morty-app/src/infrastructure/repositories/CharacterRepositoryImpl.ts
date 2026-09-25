import { Character } from "../../domain/entities/Character";
import { CharacterRepository } from "../../domain/repositories/CharacterRepository";
import { getCharacters } from "../api/RickMortyApi";

export class CharacterRepositoryImpl implements CharacterRepository {
  async getCharacters(): Promise<Character[]> {
    return await getCharacters();
  }
}