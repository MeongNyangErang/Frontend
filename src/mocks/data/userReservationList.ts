export const reservedReservations = [
  {
    reservationId: '1',
    reservationDate: '2025-04-01',
    accommodationName: '행복한 발자국 리조트',
    roomName: '디럭스 펫 스위트',
    checkInDate: '2025-04-15',
    checkOutDate: '2025-04-17',
    checkInTime: '14:00',
    checkOutTime: '11:00',
    peopleCount: 2,
    petCount: 1,
    totalPrice: 180000,
  },
  {
    reservationId: '2',
    reservationDate: '2025-04-02',
    accommodationName: '포근한 꼬리 인',
    roomName: '스탠다드룸',
    checkInDate: '2025-04-20',
    checkOutDate: '2025-04-22',
    checkInTime: '15:00',
    checkOutTime: '10:00',
    peopleCount: 1,
    petCount: 2,
    totalPrice: 160000,
  },
  {
    reservationId: '3',
    reservationDate: '2025-04-03',
    accommodationName: '멍멍쉼터',
    roomName: '패밀리룸',
    checkInDate: '2025-05-01',
    checkOutDate: '2025-05-04',
    checkInTime: '14:30',
    checkOutTime: '11:00',
    peopleCount: 3,
    petCount: 1,
    totalPrice: 250000,
  },
  {
    reservationId: '4',
    reservationDate: '2025-04-04',
    accommodationName: '펫토피아 스테이',
    roomName: '오션뷰룸',
    checkInDate: '2025-05-10',
    checkOutDate: '2025-05-12',
    checkInTime: '16:00',
    checkOutTime: '12:00',
    peopleCount: 2,
    petCount: 2,
    totalPrice: 220000,
  },
  {
    reservationId: '5',
    reservationDate: '2025-04-05',
    accommodationName: '바크 호텔',
    roomName: '스위트룸',
    checkInDate: '2025-05-15',
    checkOutDate: '2025-05-17',
    checkInTime: '13:00',
    checkOutTime: '11:00',
    peopleCount: 1,
    petCount: 1,
    totalPrice: 150000,
  },
] as const;

export const completedReservations = [
  {
    reservationId: '6',
    reservationDate: '2025-03-01',
    accommodationName: '반려의 쉼터',
    roomName: '디럭스룸',
    checkInDate: '2025-03-10',
    checkOutDate: '2025-03-12',
    checkInTime: '14:00',
    checkOutTime: '11:00',
    peopleCount: 2,
    petCount: 1,
    totalPrice: 170000,
  },
  {
    reservationId: '7',
    reservationDate: '2025-03-05',
    accommodationName: '퍼피하우스',
    roomName: '스탠다드룸',
    checkInDate: '2025-03-15',
    checkOutDate: '2025-03-16',
    checkInTime: '15:00',
    checkOutTime: '10:00',
    peopleCount: 1,
    petCount: 2,
    totalPrice: 130000,
  },
  {
    reservationId: '8',
    reservationDate: '2025-03-10',
    accommodationName: '냥이와휴',
    roomName: '패밀리룸',
    checkInDate: '2025-03-20',
    checkOutDate: '2025-03-23',
    checkInTime: '13:00',
    checkOutTime: '11:00',
    peopleCount: 3,
    petCount: 1,
    totalPrice: 210000,
  },
] as const;

export const canceledReservations = [
  {
    reservationId: '9',
    reservationDate: '2025-02-20',
    accommodationName: '멍냥리조트',
    roomName: '오션뷰룸',
    checkInDate: '2025-02-25',
    checkOutDate: '2025-02-27',
    checkInTime: '16:00',
    checkOutTime: '12:00',
    peopleCount: 2,
    petCount: 2,
    totalPrice: 190000,
  },
  {
    reservationId: '10',
    reservationDate: '2025-02-25',
    accommodationName: '동물의숲펜션',
    roomName: '로프트룸',
    checkInDate: '2025-03-01',
    checkOutDate: '2025-03-03',
    checkInTime: '14:00',
    checkOutTime: '11:00',
    peopleCount: 1,
    petCount: 1,
    totalPrice: 140000,
  },
] as const;
