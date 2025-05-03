interface ReportListItem {
  reviewId: number;
  reporterId: number;
  reporterType: 'USER' | 'HOST';
  reason: string;
  evidenceImageUrl: string;
  status: 'PENDING' | 'COMPLETED';
  createdAt: string;
}

export { ReportListItem };
