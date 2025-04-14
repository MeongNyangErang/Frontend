import { useParams } from 'react-router-dom';
import useMediaQuery from '@hooks/ui/useMediaQuery';
import { BREAK_POINTS } from '@components/styles/responsive';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';
import { SChatWrap, SChatContiner } from './styles';

const Chat = () => {
  const { roomId } = useParams();
  const isTablet = useMediaQuery(`(max-width:${BREAK_POINTS.tablet})`);

  if (isTablet) {
    return (
      <SChatWrap>
        <SChatContiner>{roomId ? <ChatRoom /> : <ChatList />} </SChatContiner>
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
