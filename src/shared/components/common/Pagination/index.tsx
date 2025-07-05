import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SPagination, SPaginationItem, SNavigationButton } from './styles';

interface PaginationProps {
  currentPage: number;
  totalResults: number;
  size: number;
  onClick: (page: number) => void;
}

const GROUP_SIZE = 5;

const Pagination = ({
  currentPage,
  size,
  totalResults,
  onClick,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalResults / size);
  const totalGroups = Math.ceil(totalPages / GROUP_SIZE);
  const currentPageOneBased = currentPage + 1;
  const currentGroup = Math.ceil(currentPageOneBased / GROUP_SIZE);
  const groupStart = GROUP_SIZE * (currentGroup - 1) + 1;
  const groupEnd = Math.min(groupStart + GROUP_SIZE - 1, totalPages);

  const paginationItems = Array.from(
    { length: groupEnd - groupStart + 1 },
    (_, i) => groupStart + i,
  );

  const handleClickNavButton = (groupOrder: number) => {
    if (groupOrder < 1 || groupOrder > totalGroups) return;
    const firstPageOfTheGroup = (groupOrder - 1) * GROUP_SIZE + 1;
    onClick(firstPageOfTheGroup - 1);
  };

  if (totalResults <= 0) {
    return null;
  }

  return (
    <SPagination>
      <SNavigationButton
        disabled={currentGroup === 1}
        onClick={() => handleClickNavButton(currentGroup - 1)}
      >
        <FaChevronLeft />
      </SNavigationButton>
      {paginationItems.map((page) => {
        const isActive = currentPage === page - 1;
        return (
          <SPaginationItem
            key={page}
            className={isActive ? 'is--active' : ''}
            disabled={isActive}
            onClick={() => onClick(page - 1)}
          >
            {page}
          </SPaginationItem>
        );
      })}
      <SNavigationButton
        disabled={currentGroup === totalGroups}
        onClick={() => handleClickNavButton(currentGroup + 1)}
      >
        <FaChevronRight />
      </SNavigationButton>
    </SPagination>
  );
};

export default Pagination;
