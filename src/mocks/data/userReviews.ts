export const userReviews = [
  {
    reviewId: '1',
    accommodationName: '멍냥 오션뷰 리조트',
    totalRating: 4.5,
    content:
      '숙소가 정말 깨끗하고 반려동물이 좋아했어요! 다음에 또 오고 싶네요.',
    reviewImages: [
      { imageId: 1, imageUrl: 'https://i.imgur.com/ng8iy94.jpeg' },
    ],
    createdAt: '2025-04-05',
  },
  {
    reviewId: '2',
    accommodationName: '펫프렌들리 하우스',
    totalRating: 4.0,
    content: '호스트분이 친절하고 애견 전용 놀이터가 있어 좋았어요.',
    reviewImages: [
      { imageId: 3, imageUrl: 'https://i.imgur.com/dzEd8tV.jpeg' },
    ],
    createdAt: '2025-03-22',
  },
  {
    reviewId: '3',
    accommodationName: '애견전용 풀빌라',
    totalRating: 5.0,
    content:
      '수영장이 강아지 전용이라 너무 만족했어요. 사진보다 더 예쁜 숙소예요!',
    reviewImages: [
      { imageId: 4, imageUrl: 'https://i.imgur.com/VQLUCX9.jpeg' },
      { imageId: 5, imageUrl: 'https://i.imgur.com/dzEd8tV.jpeg' },
      { imageId: 6, imageUrl: 'https://i.imgur.com/8e9fh2Y.jpeg' },
    ],
    createdAt: '2025-02-28',
  },
  {
    reviewId: '4',
    accommodationName: '반려동물 펜션하우스',
    totalRating: 4.5,
    content: '전체적으로 만족했지만 방음이 조금 아쉬웠어요.',
    reviewImages: [],
    createdAt: '2025-01-15',
  },
  {
    reviewId: '5',
    accommodationName: '힐링 펫스테이',
    totalRating: 4.0,
    content: '정말 조용하고 산책로가 잘 되어 있어서 힐링했어요.',
    reviewImages: [
      { imageId: 7, imageUrl: 'https://i.imgur.com/dzEd8tV.jpeg' },
    ],
    createdAt: '2024-12-30',
  },
] as const;
