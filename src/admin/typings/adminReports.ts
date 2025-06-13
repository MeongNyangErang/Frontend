interface ReportListItem {
  reviewId: number;
  reporterId: number;
  reporterType: 'USER' | 'HOST';
  reason: string;
  evidenceImageUrl: string;
  status: 'PENDING' | 'COMPLETED';
  createdAt: string;
}

interface ReportDetail {
  reviewId: number;
  reviewerNickname: string;
  reporterNickname: string;
  reason: string;
  evidenceImageUrl: string;
  reportDate: string;
}

export { ReportListItem, ReportDetail };
