import { Character } from "../entities/Character";

export interface CharacterRepository {
  getCharacters(): Promise<Character[]>;
}