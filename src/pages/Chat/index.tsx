import { useParams } from 'react-router-dom';
import useMediaQuery from '@hooks/ui/useMediaQuery';
import { BREAK_POINTS } from '@components/styles/responsive';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import { SChatWrap, SChatContiner } from './styles';

const Chat = () => {
  const { roomId } = useParams();
  const isMobile = useMediaQuery(`(max-width:${BREAK_POINTS.tablet})`);

  if (isMobile) {
    return roomId ? (
      <SChatWrap>
        <ChatRoom />
      </SChatWrap>
    ) : (
      <SChatWrap>
        <ChatList />
      </SChatWrap>
    );
  }
  return (
    <SChatWrap>
      <SChatContiner>
        <ChatList />
        <ChatRoom />
      </SChatContiner>
    </SChatWrap>
  );
};

export default Chat;
