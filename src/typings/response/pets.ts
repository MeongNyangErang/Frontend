export interface Pet {
  petId: number;
  name: string;
  birthDate: string;
  type: string;
  personality: string;
  activityLevel: string;
}

export interface MyPetListResponse {
  code: number;
  data: Pet[];
}
