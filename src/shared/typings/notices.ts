interface Notice {
  noticeId: number;
  title: string;
  createdAt: string;
}

interface NoticeDetail {
  noticeId: number;
  title: string;
  content: string;
  noticeImageUrl: string;
  createdAt: string;
}

export { Notice, NoticeDetail };
