import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from 'src/components/ui';

interface DataTablePagination2Props {
  currentPage: number;
  totalPages: number;
  setPageIndex: (page: number) => void;
}

const DataTablePagination2: React.FC<DataTablePagination2Props> = ({
  currentPage,
  totalPages,
  setPageIndex,
}) => {
  const [valuePage, setValuePage] = React.useState(currentPage.toString());

  React.useEffect(() => {
    if (Number(currentPage) !== Number(valuePage)) {
      setValuePage(currentPage.toString());
    }
  }, [currentPage]);

  return totalPages > 0 ? (
    <div className='ml-auto flex items-center gap-4'>
      {/*  <div className='flex items-center gap-1.5'>
        <span className='text-sm'>Page</span>
        <Input
          className={cn(
            'w-8 h-8 text-center px-0',
            valuePage.toString().length > 1 && 'w-10',
            valuePage.toString().length > 2 && 'w-12',
          )}
          inputMode='numeric'
          value={valuePage}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (valuePage && Number(valuePage) >= 1 && Number(valuePage) <= totalPages) {
                setPageIndex(Number(Number(valuePage) - 1));
              }
            }
          }}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/^-?\d*$/.test(inputValue)) {
              setValuePage(inputValue);
            }
          }}
          onBlur={() => {
            setValuePage(currentPage.toString());
          }}
          disabled={totalPages === 1}
        />
        <span className='text-sm'>{`of ${totalPages}`}</span>
        <div className='flex items-center'>
          <Button
            className='h-8 w-8'
            variant='secondary'
            typeButton='ghost'
            size='icon'
            disabled={currentPage === 1}
            onClick={() => setPageIndex(Number(currentPage - 2))}
          >
            <ArrowLeftCircleIcon className='w-5 h-5' />
          </Button>
          <Button
            className='h-8 w-8'
            variant='secondary'
            typeButton='ghost'
            size='icon'
            disabled={currentPage === totalPages}
            onClick={() => setPageIndex(Number(currentPage))}
          >
            <ArrowRightCircleIcon className='w-5 h-5' />
          </Button>
        </div>
      </div> */}
      <Pagination className='w-fit'>
        <PaginationContent>
          {
            <PaginationItem>
              <PaginationPrevious
                disabled={currentPage === 1}
                onClick={() => setPageIndex(Number(currentPage - 2))}
              />
            </PaginationItem>
          }

          {totalPages < 4 ? (
            Array.from({ length: totalPages }).map((_, index: number) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => setPageIndex(index)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))
          ) : (
            <>
              <PaginationItem>
                <PaginationLink
                  isActive={1 === currentPage}
                  onClick={() => setPageIndex(0)}
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {currentPage > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {currentPage === totalPages && (
                <PaginationItem>
                  <PaginationLink onClick={() => setPageIndex(currentPage - 3)}>
                    {currentPage - 2}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage > 2 && (
                <PaginationItem>
                  <PaginationLink onClick={() => setPageIndex(currentPage - 2)}>
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage !== 1 && currentPage !== totalPages && (
                <PaginationItem>
                  <PaginationLink
                    isActive
                    onClick={() => setPageIndex(currentPage - 1)}
                  >
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink onClick={() => setPageIndex(currentPage)}>
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage === 1 && (
                <PaginationItem>
                  <PaginationLink onClick={() => setPageIndex(currentPage + 1)}>
                    {currentPage + 2}
                  </PaginationLink>
                </PaginationItem>
              )}

              {currentPage < totalPages - 2 && totalPages > 4 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {totalPages > 1 && (
                <PaginationItem>
                  <PaginationLink
                    isActive={currentPage === totalPages}
                    onClick={() => setPageIndex(totalPages - 1)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
            </>
          )}

          {
            <PaginationItem>
              <PaginationNext
                disabled={currentPage === totalPages}
                onClick={() => setPageIndex(Number(currentPage))}
              />
            </PaginationItem>
          }
        </PaginationContent>
      </Pagination>
    </div>
  ) : null;
};

export default DataTablePagination2;
