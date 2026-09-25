import { Location } from "../../domain/entities/Location";
import { LocationRepository } from "../../domain/repositories/LocationRepository";
import { getLocations } from "../api/RickMortyApi";

export class LocationRepositoryImpl implements LocationRepository {
  async getLocations(): Promise<Location[]> {
    return await getLocations();
  }
}