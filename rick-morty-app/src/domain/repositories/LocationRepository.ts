import { Location } from "../entities/Location";

export interface LocationRepository {
  getLocations(): Promise<Location[]>;
}