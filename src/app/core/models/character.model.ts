export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

export interface CharacterFilters {
  page: number;
  name: string;
  status: string;
  species: string;
  gender: string;
}
