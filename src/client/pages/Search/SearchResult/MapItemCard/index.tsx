import { FaUser, FaPaw } from 'react-icons/fa6';
import { FaStar } from 'react-icons/fa';
import { ACCOMMODATION_TYPE_MAP } from '@constants/accommodation';
import { Accommodation } from '@typings/response/accommodations';
import {
  SItem,
  SItemType,
  SImageArea,
  STextArea,
  STextAreaTop,
  SName,
  SRating,
  SPrice,
  SCapacity,
} from './styles';

type MapItemCardProps = Omit<Accommodation, 'latitude' | 'longitude'> & {
  onClickCard: (accommodationId: number) => void;
};

const MapItemCard = ({
  accommodationType,
  accommodationId,
  accommodationName,
  thumbnailUrl,
  totalRating,
  price,
  standardPetCount,
  standardPeopleCount,
  onClickCard,
}: MapItemCardProps) => {
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
      <SImageArea>
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt={accommodationName} />
        ) : (
          <div>NO IMAGE</div>
        )}
        <SRating>
          <FaStar />
          {totalRating.toString().padEnd(3, '.0')}
        </SRating>
      </SImageArea>
      <STextArea>
        <STextAreaTop>
          <SItemType>{ACCOMMODATION_TYPE_MAP[accommodationType]}</SItemType>
          <SName>{accommodationName}</SName>
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
        </STextAreaTop>
        <SPrice>
          <span>1박/</span>
          {price.toLocaleString()}원~
        </SPrice>
      </STextArea>
    </SItem>
  );
};

export default MapItemCard;
