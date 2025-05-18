import { FaUser, FaPaw } from 'react-icons/fa6';
import { FaStar, FaHeart } from 'react-icons/fa';
import { ACCOMMODATION_TYPE_MAP } from '@constants/accommodation';
import { Accommodation } from '@typings/response/accommodations';
import {
  SItem,
  SItemTypeBadge,
  SImageArea,
  STextArea,
  SNameBox,
  SPriceBox,
  SName,
  SRating,
  SPrice,
  SCapacity,
  SWishButton,
} from './styles';

type ListItemCardProps = Omit<Accommodation, 'latitude' | 'longitude'> & {
  onClickCard: (accommodationId: number) => void;
  onClickWishButton?: (
    e: React.MouseEvent,
    accommodationId: number,
    wishlisted: boolean,
  ) => void;
};

const ListItemCard = ({
  accommodationType,
  accommodationId,
  accommodationName,
  thumbnailUrl,
  totalRating,
  price,
  standardPetCount,
  standardPeopleCount,
  wishlisted,
  onClickWishButton,
  onClickCard,
}: ListItemCardProps) => {
  return (
    <SItem
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClickCard(accommodationId);
        }
      }}
      onClick={() => onClickCard(accommodationId)}
    >
      {!!onClickWishButton && (
        <SWishButton
          onClick={(e) => {
            onClickWishButton(e, accommodationId, wishlisted);
          }}
          $isActive={wishlisted}
        >
          <FaHeart />
        </SWishButton>
      )}
      <SImageArea>
        <SItemTypeBadge $type={accommodationType}>
          {ACCOMMODATION_TYPE_MAP[accommodationType]}
        </SItemTypeBadge>
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={accommodationName} />
        ) : (
          <div>NO IMAGE</div>
        )}
      </SImageArea>
      <STextArea>
        <SNameBox>
          <SName $line={1}>{accommodationName}</SName>
          <SRating>
            <FaStar />
            {totalRating.toString().padEnd(3, '.0')}
          </SRating>
        </SNameBox>
        <SPriceBox>
          <SCapacity>
            <div>
              <FaUser />
              {standardPeopleCount}
            </div>
            <div>
              <FaPaw />
              {standardPetCount}
            </div>
          </SCapacity>
          <SPrice $line={1}>
            <span>1박/</span>
            {price.toLocaleString()}원~
          </SPrice>
        </SPriceBox>
      </STextArea>
    </SItem>
  );
};

export default ListItemCard;
