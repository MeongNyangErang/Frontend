import React from 'react';
import { SSubPageTitle } from '@admin/components/styles/mixins';
import ROUTES from '@admin/constants/routes';
import useNumericParam from '@admin/hooks/router/useNumericParam';
import useNoticeDetail from '@admin/hooks/page/useNoticeDetail';
import InfoField from '@shared/components/common/InfoField';
import MessageBox from '@shared/components/common/MessageBox';
import NoticeControlButtons from './NoticeControlButtons';
import { SNoticeImageBox } from './styles';

const NOTICE_FIELDS = [
  { id: 'title', name: '제목' },
  { id: 'createdAt', name: '작성일자' },
] as const;

const NoticeDetail = () => {
  const numericNoticeId = useNumericParam('noticeId', ROUTES.notices.root(0));

  if (!numericNoticeId) return null;

  const { data, isLoading, error } = useNoticeDetail(numericNoticeId);

  if (isLoading || (!data && !error)) return null;

  if (error) {
    return (
      <>
        <SSubPageTitle>공지사항</SSubPageTitle>
        <MessageBox variant="light">
          데이터를 불러오는데 실패했습니다.
        </MessageBox>
      </>
    );
  }

  return (
    <>
      <SSubPageTitle>공지사항</SSubPageTitle>
      {data && (
        <>
          {NOTICE_FIELDS.map(({ id, name }) => {
            return (
              <React.Fragment key={id}>
                <InfoField name={name}>{data[id]}</InfoField>
              </React.Fragment>
            );
          })}
          <InfoField name="내용">
            <div>
              {data.noticeImageUrl && (
                <SNoticeImageBox>
                  <img src={data.noticeImageUrl} alt="첨부 이미지" />
                </SNoticeImageBox>
              )}
              {data.content}
            </div>
          </InfoField>
          <NoticeControlButtons noticeId={numericNoticeId} />
        </>
      )}
    </>
  );
};

export default NoticeDetail;
