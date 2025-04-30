const hostSignupList = [
  { hostId: 101, createdAt: '2025-04-20' },
  { hostId: 102, createdAt: '2025-04-21' },
  { hostId: 103, createdAt: '2025-04-22' },
  { hostId: 104, createdAt: '2025-04-23' },
  { hostId: 105, createdAt: '2025-04-24' },
  { hostId: 106, createdAt: '2025-04-25' },
] as const;

const hostSignupDetail = {
  email: 'host101@example.com',
  name: '홍길동',
  phoneNumber: '010-1234-5678',
  businessLicenseImageUrl: 'https://example.com/images/license_101.jpg',
  submitDocumentImageUrl: 'https://example.com/images/document_101.jpg',
} as const;

export { hostSignupList, hostSignupDetail };
