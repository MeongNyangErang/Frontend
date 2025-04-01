import BottomDrawer from '@components/common/BottomDrawer';
import SubPageHeader from '@components/common/SubPageHeader';
import {
  SContainer,
  SNavigatorWrap,
  SNavigator,
  SFilterItems,
  SFilterItem,
} from './styles';

interface Props {
  isOpen: boolean;
  onClose(): void;
}

const navigator = ['숙소유형', '가격', '사용자 평점', '#특징', '시설/서비스'];

const SearchFilter = ({ isOpen, onClose }: Props) => {
  return (
    <BottomDrawer isOpen={isOpen}>
      <SContainer>
        <SubPageHeader onClick={onClose} title="필터" style="x"></SubPageHeader>
        <SNavigatorWrap>
          <SNavigator>
            <div>
              {navigator.map((n) => (
                <button key={n}>{n}</button>
              ))}
            </div>
          </SNavigator>
          <SFilterItems>
            <SFilterItem>df</SFilterItem>
          </SFilterItems>
        </SNavigatorWrap>
      </SContainer>
    </BottomDrawer>
  );
};

export default SearchFilter;
