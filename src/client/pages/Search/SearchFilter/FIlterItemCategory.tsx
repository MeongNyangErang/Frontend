import { memo } from 'react';
import { SItemCategory } from './styles';
import { FaPaw } from 'react-icons/fa';

const FilterItemCategory = ({ category }: { category: string }) => {
  const typedCategory = category as keyof typeof IconMap;
  return (
    <SItemCategory>
      {category}
      {IconMap[typedCategory] && <i>{IconMap[typedCategory]}</i>}
    </SItemCategory>
  );
};

export default memo(FilterItemCategory);

const IconMap = {
  '동반 반려동물': <FaPaw />,
};
