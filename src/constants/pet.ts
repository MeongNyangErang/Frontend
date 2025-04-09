export const PET_SIZE_MAP = {
  고양이: '',
  소형견: '10kg 미만',
  중형견: '10kg~25kg',
  대형견: '25kg 이상',
} as const;

export const PET_TYPE_MAP = {
  SMALL_DOG: '소형견',
  MEDIUM_DOG: '중형견',
  LARGE_DOG: '대형견',
  CAT: '고양이',
} as const;

export const PET_PERONALITY_MAP = {
  EXTROVERT: '외향적',
  INTROVERT: '내향적',
} as const;

export const PET_ACTIVITY_LEVEL_MAP = {
  LOW: '적음',
  MEDIUM: '보통',
  HIGH: '많음',
} as const;

export const PET_FORM_FIELDS = [
  {
    id: 'type',
    label: '종류',
    options: Object.entries(PET_TYPE_MAP).map(([key, value]) => ({
      name: value,
      value: key,
    })),
  },
  { id: 'name', label: '이름' },
  { id: 'birthDate', label: '생일' },
  {
    id: 'personality',
    label: '성향',
    options: Object.entries(PET_PERONALITY_MAP).map(([key, value]) => ({
      name: value,
      value: key,
    })),
  },
  {
    id: 'activityLevel',
    label: '활동량',
    options: Object.entries(PET_ACTIVITY_LEVEL_MAP).map(([key, value]) => ({
      name: value,
      value: key,
    })),
  },
] as const;

export const initialPetInfoState = {
  petId: undefined,
  name: '',
  birthDate: '',
  type: '',
  personality: '',
  activityLevel: '',
} as const;
