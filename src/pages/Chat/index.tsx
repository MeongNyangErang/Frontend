import { useParams, useLocation, Navigate } from 'react-router-dom';
import useMediaQuery from '@hooks/ui/useMediaQuery';
import useChatList from '@hooks/query/useChatList';
import { BREAK_POINTS } from '@components/styles/responsive';
import { ChatPartnerState } from '@typings/chat';
import ROUTES from '@constants/routes';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import { SChatWrap, SChatContiner, SEmptyChatRoomMessage } from './styles';

const Chat = () => {
  const { chatRoomId } = useParams();
  const location = useLocation();
  const state = location.state as ChatPartnerState;
  const isTablet = useMediaQuery(`(max-width:${BREAK_POINTS.tablet})`);
  const { data } = useChatList();
  const listSize = data?.pages.flatMap(({ content }) => content).length;
  console.log(data, 'data');
  if (isTablet) {
    return (
      <SChatWrap>
        <SChatContiner>
          {!chatRoomId && <ChatList />}
          {chatRoomId && state && (
            <ChatRoom chatRoomId={chatRoomId} partnerInfo={state} />
          )}
          {chatRoomId && !state && <Navigate to={ROUTES.chat.list} />}
        </SChatContiner>
      </SChatWrap>
    );
  }
  return (
    <SChatWrap>
      <SChatContiner>
        <ChatList />
        {!chatRoomId && (
          <SEmptyChatRoomMessage>
            <p>
              {listSize && listSize > 0
                ? '대화하실 호스트를 선택해주세요.'
                : '대화중인 호스트가 없습니다.'}
            </p>
          </SEmptyChatRoomMessage>
        )}
        {chatRoomId && state && (
          <ChatRoom chatRoomId={chatRoomId} partnerInfo={state} />
        )}
        {chatRoomId && !state && <Navigate to={ROUTES.chat.list} />}
      </SChatContiner>
    </SChatWrap>
  );
};

export default Chat;
