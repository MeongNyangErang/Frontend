import { AccommodationReview } from '@typings/review';

const accommodationrReviews: AccommodationReview[] = [
  {
    reviewId: 1,
    roomName: '오션뷰 스위트룸',
    nickname: '멍멍이집사',
    profileImageUrl: 'https://example.com/profile1.jpg',
    totalRating: 4.8,
    content: '정말 깨끗하고 반려동물과 함께하기에 너무 좋았어요!',
    reviewImages: [
      'https://example.com/review1_1.jpg',
      'https://example.com/review1_2.jpg',
    ],
    createdAt: '2025-04-28T14:10:00Z',
  },
  {
    reviewId: 2,
    roomName: '독채하우스 1호',
    nickname: '냥집사88',
    profileImageUrl: 'https://example.com/profile2.jpg',
    totalRating: 4.5,
    content: '한적하고 조용해서 고양이랑 힐링하기 딱이에요.',
    reviewImages: ['https://example.com/review2_1.jpg'],
    createdAt: '2025-04-25T09:30:00Z',
  },
  {
    reviewId: 3,
    roomName: '럭셔리 풀빌라',
    nickname: '산책러버',
    profileImageUrl: 'https://example.com/profile3.jpg',
    totalRating: 5.0,
    content: '수영장도 좋고 강아지가 마음껏 뛰어놀 수 있었어요!',
    reviewImages: [
      'https://example.com/review3_1.jpg',
      'https://example.com/review3_2.jpg',
      'https://example.com/review3_3.jpg',
    ],
    createdAt: '2025-04-20T17:45:00Z',
  },
  {
    reviewId: 4,
    roomName: '펜션 2층 복층룸',
    nickname: '캠핑좋아',
    profileImageUrl: 'https://example.com/profile4.jpg',
    totalRating: 4.2,
    content: '다 좋은데 방음이 조금 아쉬웠어요. 그래도 만족!',
    reviewImages: [],
    createdAt: '2025-04-22T11:15:00Z',
  },
  {
    reviewId: 5,
    roomName: '호텔 프리미엄룸',
    nickname: '뽀송이엄마',
    profileImageUrl: 'https://example.com/profile5.jpg',
    totalRating: 4.7,
    content: '청결하고 서비스가 친절했어요. 다시 방문하고 싶어요.',
    reviewImages: ['https://example.com/review5_1.jpg'],
    createdAt: '2025-04-29T08:50:00Z',
  },
  {
    reviewId: 6,
    roomName: '숲속 독채하우스',
    nickname: '도시탈출러',
    profileImageUrl: 'https://example.com/profile6.jpg',
    totalRating: 4.9,
    content: '조용하고 공기도 좋아서 푹 쉬다 왔어요. 강추!',
    reviewImages: ['https://example.com/review6_1.jpg'],
    createdAt: '2025-04-26T19:25:00Z',
  },
] as const;

export { accommodationrReviews };
