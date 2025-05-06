import { useState } from 'react';
import { ReviewToReport } from '@typings/report';

const useReviewReport = () => {
  const [reviewToReport, setReviewToReport] = useState<ReviewToReport | null>(
    null,
  );

  const handleReportClick = (
    reviewId: number,
    nickname: string,
    content: string,
  ) => {
    setReviewToReport({ reviewId, nickname, content });
  };

  const handleReportClose = () => {
    setReviewToReport(null);
  };

  return { reviewToReport, handleReportClick, handleReportClose };
};

export default useReviewReport;
