import { memo } from 'react';
import { SItemName } from './styles';
import { FaPaw } from 'react-icons/fa';

const FilterItemName = ({ category }: { category: string }) => {
  const typedCategory = category as keyof typeof IconMap;
  return (
    <>
      <SItemName>
        {category}
        {IconMap[typedCategory] && <i>{IconMap[typedCategory]}</i>}
      </SItemName>
    </>
  );
};

export default memo(FilterItemName);

const IconMap = {
  '동반 반려동물': <FaPaw />,
};
