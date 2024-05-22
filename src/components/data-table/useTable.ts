import React from 'react';
import { PaginationState, SortingState } from '@tanstack/react-table';
import { useSearchParams } from 'react-router-dom';

export const sizePages = [10, 25, 50, 100, 150];

export interface UseTableProps {
  page?: number;
  size?: (typeof sizePages)[number];
  sort?: {
    id: string;
    desc: boolean;
  };
}

const useTable = (initialValue?: UseTableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSorting, setIsSorting] = React.useState(false);

  const pageIndex = initialValue?.page ? initialValue?.page : 0;
  const pageSize = initialValue?.size ? initialValue?.size : 10;
  const defaultSort = initialValue?.sort ? [initialValue?.sort] : [];

  const paramSize = (searchParams.get('size') && Number(searchParams.get('size'))) || pageSize;
  const paramPage =
    (searchParams.get('page') &&
      Number(searchParams.get('page')) >= 1 &&
      Number(searchParams.get('page')) - 1) ||
    pageIndex;

  const getPageSize = (size: number) => {
    if (!sizePages.includes(size)) {
      if (size <= 10) return 10;
      if (size > 10 && size <= 25) return 25;
      if (size > 25 && size <= 50) return 50;
      if (size > 50 && size <= 100) return 100;
      if (size > 100) return 150;
    }

    return size;
  };

  React.useEffect(() => {
    searchParams.set('size', getPageSize(paramSize).toString());
    setSearchParams(searchParams, { replace: true });
  }, [paramSize]);

  React.useEffect(() => {
    if (searchParams.get('page') && Number(searchParams.get('page')) < 1) {
      searchParams.set('page', '1');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams.get('page')]);

  const [sorting, setSorting] = React.useState<SortingState>(
    searchParams.get('sort')
      ? [
          {
            id: searchParams.get('sort')!.split(',')[0],
            desc: searchParams.get('sort')!.split(',')[1] === 'desc',
          },
        ]
      : defaultSort,
  );
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: paramPage,
    pageSize: getPageSize(paramSize),
  });

  const setPageIndex = (pageIndex: number) => {
    searchParams.set('page', (pageIndex + 1).toString());
    setSearchParams(searchParams);
    setPagination((prev) => ({ ...prev, pageIndex }));
  };
  const setPageSize = (pageSize: number) => {
    searchParams.delete('page');
    searchParams.set('size', pageSize.toString());
    setSearchParams(searchParams);

    setPagination((prev) => ({ ...prev, pageSize }));
  };

  // ----------------------------------- RESET --------------------------------
  const resetPagination = () => {
    setPagination({
      pageIndex,
      pageSize,
    });

    searchParams.delete('page');
    searchParams.delete('size');
    setSearchParams(searchParams);
  };
  const resetSorting = () => setSorting(defaultSort);
  const resetParams = () => {
    setSorting(defaultSort);
    setPagination({
      pageIndex,
      pageSize,
    });

    searchParams.delete('page');
    searchParams.delete('size');
    searchParams.delete('sort');
    setSearchParams(searchParams);
  };

  React.useEffect(() => {
    if (isSorting) {
      if (sorting?.[0]) {
        searchParams.set('sort', `${sorting?.[0]?.id},${sorting?.[0]?.desc ? 'desc' : 'asc'}`);
        searchParams.delete('page');
        setPageIndex(0);
        setSearchParams(searchParams);
      } else if (searchParams.get('sort')) {
        searchParams.delete('sort');
        searchParams.delete('page');
        setSearchParams(searchParams);
      }
      setIsSorting(false);
    }
  }, [sorting, isSorting]);

  return {
    params: {
      ...(sorting?.[0]
        ? {
            sort: sorting?.[0]?.id,
            direction: sorting?.[0]?.desc ? 'desc' : 'asc',
          }
        : {}),
      page: pagination.pageIndex + 1,
      size: pagination.pageSize,
    },
    pageable: {
      'pageable.page': pagination.pageIndex + 1,
      'pageable.size': pagination.pageSize,
      ...(sorting?.[0]
        ? { 'pageable.sort': `${sorting?.[0]?.id},${sorting?.[0]?.desc ? 'desc' : 'asc'}` }
        : {}),
    },
    sorting,
    pagination,
    setSorting: (e) => {
      setSorting(e);
      setIsSorting(true);
    },
    setPagination,
    resetParams,
    setPageIndex,
    setPageSize,
    resetPagination,
    resetSorting,
  };
};

export default useTable;
