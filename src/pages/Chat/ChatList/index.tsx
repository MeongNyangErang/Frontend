import useAuth from '@hooks/auth/useAuth';
import useChatList from '@hooks/query/useChatList';
import useInfiniteScroll from '@hooks/ui/useInfiniteScroll';
import Loader from '@components/common/Loader';
import ROUTES from '@constants/routes';
import {
  SChatListWrap,
  SChatTitle,
  SChatListContainer,
  SChatListBox,
  SChatListItem,
  SItemImage,
  SItemInfo,
  SItemUnread,
  SChatItemBottom,
} from './styles';

const ChatList = () => {
  const { member } = useAuth();
  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, error } =
    useChatList();
  const list = data?.pages.flatMap(({ content }) => content);
  const enableToFetch = !isFetchingNextPage && hasNextPage && !error;
  const observeTarget = useInfiniteScroll(fetchNextPage, enableToFetch);

  return (
    <SChatListWrap>
      <SChatTitle>
        {member?.role === 'user' ? '호스트 1:1 문의' : '유저 1:1 문의'}
      </SChatTitle>
      <SChatListContainer>
        <SChatListBox>
          {list?.map(
            ({
              chatRoomId,
              lastMessage,
              lastMessageTime,
              partnerImageUrl,
              partnerName,
              partnerId,
              unreadCount,
            }) => (
              <SChatListItem
                key={chatRoomId}
                to={ROUTES.chat.room(chatRoomId)}
                state={{ partnerName, partnerImageUrl, partnerId }}
              >
                <SItemImage>
                  <img src={partnerImageUrl} alt="프로필 이미지" />
                </SItemImage>
                <SItemInfo>
                  <div>{partnerName}</div>
                  <p>{lastMessage}</p>
                  <span>{lastMessageTime}</span>
                </SItemInfo>
                <SItemUnread>
                  {unreadCount > 0 && <span>{unreadCount}</span>}
                </SItemUnread>
              </SChatListItem>
            ),
          )}
        </SChatListBox>
        <SChatItemBottom ref={observeTarget}>
          {isFetchingNextPage && <Loader loading size={8} color="grayBorder" />}
        </SChatItemBottom>
      </SChatListContainer>
    </SChatListWrap>
  );
};

export default ChatList;
