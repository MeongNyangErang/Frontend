export type PetType = 'SMALL_DOG' | 'MEDIUM_DOG' | 'LARGE_DOG' | 'CAT';
export type PetPersonality = 'EXTROVERT' | 'INTROVERT';
export type PetActivityLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface PetInfo {
  petId: number;
  name: string;
  birthDate: string;
  type: PetType;
  personality: PetPersonality;
  activityLevel: PetActivityLevel;
}

export type PetInfoList = PetInfo[];

export interface PetInfoState {
  name: string;
  birthDate: string;
  type: '' | PetType;
  personality: '' | PetPersonality;
  activityLevel: '' | PetActivityLevel;
}

export type PetInfoKey = keyof PetInfoState;
export type PetInfoValue = PetInfoState[keyof PetInfoState];
