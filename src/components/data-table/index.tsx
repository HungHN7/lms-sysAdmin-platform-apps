import * as React from 'react';
import {
  ColumnDef,
  ColumnOrderState,
  ExpandedState,
  OnChangeFn,
  PaginationState,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Checkbox,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
} from 'src/components/ui';

import { ChevronDown } from 'lucide-react';
import useTable, { sizePages } from './useTable';
import { cn } from 'src/utils/classnames';
import DataTablePagination2 from './data-table-pagination-2';
import ButtonVisible from './button-visiable';
import Loading from '../loading';
import { RiArrowDownLine, RiArrowUpDownLine, RiArrowUpLine } from 'react-icons/ri';
import { TColumnCurrent } from './type';
import { containsSubstring } from 'src/utils/helpers/string';
import { isEmpty } from 'lodash';

export interface TableInstanceProps {
  params: {
    sort?: string;
    direction?: string;
    page: number;
    size: number;
  };
  pageable: {
    'pageable.sort'?: string | undefined;
    'pageable.page': number;
    'pageable.size': number;
  };
  sorting: SortingState;
  pagination: PaginationState;
  setSorting: OnChangeFn<SortingState>;
  setPagination: OnChangeFn<PaginationState>;
  setPageIndex: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  resetSorting: () => void;
  resetPagination: () => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  columnsHidden?: string[];
  columnsAlwaysPresent?: string[];
  data: TData[];
  totalPages: number;
  tableInstance: TableInstanceProps;
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string;
  rowSelection?: {
    rowKey: string;
    disabledRowKeys?: string[];
    selectedRowKeys?: string[];
    onSelect?: (selected: string[], selectedRows: TData[]) => void;
    size?: number;
    isViewSelected?: boolean;
    listActionSelected?: React.ReactNode;
    onToggleSelect?: (selected: string[], selectedRows: TData[], isSelected: boolean) => void;
  };
  rowEmpty?: string | React.ReactNode;
  isViewOption?: boolean;
  toolbar?: React.ReactNode;
  classNameToolbar?: string;
  dataRender?: React.ReactNode;
  totalElements?: TTotalElement;
  height?: number | string;
  loading?: boolean;
}

type TTotalElement =
  | number
  | {
      total: number;
      nameElement?: string;
      nameElements?: string;
    };

export function DataTable<TData, TValue>({
  columns,
  columnsHidden = [],
  columnsAlwaysPresent = [],
  data,
  tableInstance,
  rowSelection,
  getRowId,
  rowEmpty,
  isViewOption,
  toolbar,
  classNameToolbar,
  totalPages,
  dataRender,
  totalElements,
  height,
  loading,
}: DataTableProps<TData, TValue>) {
  const { sorting, pagination, setSorting, setPageIndex, setPageSize, params } = tableInstance;

  const [rowSelected, setRowSelected] = React.useState(
    rowSelection?.selectedRowKeys?.reduce((acc: Record<string, boolean>, val) => {
      acc[val] = true;
      return acc;
    }, {}) ?? {},
  );
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);
  const [countMount, setCountMount] = React.useState<number>(0);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [currentColumns, setCurrentColumns] = React.useState<ColumnDef<TData, TValue>[]>(columns);

  const table = useReactTable({
    data,
    columns: [
      ...(rowSelection?.rowKey && getRowId
        ? [
            {
              id: 'rowSelection',
              size: 48,
              header: () => {
                const isChecked = Object.keys(table.getRowModel().rowsById)?.every(
                  (selected) =>
                    [
                      ...(rowSelection?.selectedRowKeys || []),
                      ...(rowSelection?.disabledRowKeys || []),
                    ]?.includes(selected),
                );

                return (
                  <div className='flex items-center gap-2'>
                    {table.getCanSomeRowsExpand() && (
                      <button
                        {...{
                          onClick: table.getToggleAllRowsExpandedHandler(),
                          style: { cursor: 'pointer' },
                        }}
                      >
                        <ChevronDown
                          className={cn(
                            'w-4 h-4 transition-all duration-300',
                            table.getIsAllRowsExpanded() && 'rotate-180',
                            table.getIsSomeRowsExpanded() && '-rotate-90',
                          )}
                        />
                      </button>
                    )}
                    <Checkbox
                      checked={isChecked || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                      onCheckedChange={(value) => {
                        table.toggleAllPageRowsSelected(!!value);

                        rowSelection?.onToggleSelect?.(
                          Object.keys(table.getRowModel().rowsById)?.filter(
                            (key) => !rowSelection?.disabledRowKeys?.includes(key),
                          ),
                          Object.values(
                            table
                              .getRowModel()
                              .flatRows.map(({ original }) => original)
                              ?.filter(
                                (row) =>
                                  !rowSelection?.disabledRowKeys?.includes(
                                    row[rowSelection?.rowKey],
                                  ),
                              ),
                          ),
                          !!value,
                        );
                      }}
                      aria-label='Select all'
                      className='translate-y-[2px]'
                    />
                  </div>
                );
              },
              cell: ({ row }: { row: Row<TData> }) => {
                return (
                  <div
                    className='flex items-center gap-2'
                    style={{
                      paddingLeft: `${row.depth * 16}px`,
                    }}
                  >
                    {table.getCanSomeRowsExpand() && (
                      <div className='w-4 h-4'>
                        {row.getCanExpand() && (
                          <button
                            {...{
                              onClick: row.getToggleExpandedHandler(),
                              style: { cursor: 'pointer' },
                            }}
                          >
                            <ChevronDown
                              className={cn(
                                'w-4 h-4 transition-all duration-300',
                                row.getIsExpanded() && 'rotate-180',
                              )}
                            />
                          </button>
                        )}
                      </div>
                    )}
                    <Checkbox
                      checked={row.getIsSelected()}
                      disabled={rowSelection?.disabledRowKeys?.includes(
                        row.original[rowSelection?.rowKey],
                      )}
                      onCheckedChange={(value) => {
                        row.toggleSelected(!!value);
                        rowSelection?.onToggleSelect?.([row.id], [row.original], !!value);
                      }}
                      aria-label='Select row'
                      className='translate-y-[2px]'
                    />
                  </div>
                );
              },
              enableSorting: false,
              enableHiding: false,
              ...(rowSelection.size && { size: rowSelection.size }),
            },
          ]
        : []),
      ...currentColumns,
    ],
    state: {
      sorting,
      rowSelection: rowSelected,
      // columnVisibility,
      expanded,
      columnOrder,
    },
    enableRowSelection: true,

    onRowSelectionChange: (rowSelect) => {
      setRowSelected(rowSelect as Record<string, boolean>);
    },
    onSortingChange: (e) => {
      setSorting(e);
    },
    // onPaginationChange: setPagination, // Bug pagination fetching API
    onExpandedChange: setExpanded,
    getSubRows: (row) =>
      (
        row as {
          subRows?: TData[];
        }
      ).subRows,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    ...(getRowId ? { getRowId } : {}),
  });

  React.useEffect(() => {
    if (countMount !== 0 && rowSelection?.rowKey)
      rowSelection?.onSelect?.(
        Object.keys(table.getSelectedRowModel().rowsById),
        Object.values(table.getSelectedRowModel().flatRows.map(({ original }) => original)),
      );

    setCountMount(1);
  }, [rowSelected]);

  React.useEffect(() => {
    if (rowSelection?.selectedRowKeys)
      setRowSelected(
        rowSelection?.selectedRowKeys?.reduce((acc: Record<string, boolean>, val) => {
          acc[val] = true;
          return acc;
        }, {}) ?? {},
      );
  }, [rowSelection?.selectedRowKeys?.length]);

  const _totalPages = React.useMemo(() => totalPages, [data]);

  return (
    <Loading isLoading={loading}>
      <div className='space-y-6 h-full flex flex-col pb-1'>
        <div className={cn('flex items-center gap-x-6', classNameToolbar)}>
          {isViewOption && (
            <div className='w-10 h-10'>
              <ButtonVisible
                columnsHidden={columnsHidden}
                columnsAlwaysPresent={columnsAlwaysPresent}
                columns={columns as unknown as TColumnCurrent[]}
                setCurrentColumns={setCurrentColumns}
              />
            </div>
          )}

          {toolbar}
        </div>

        {(rowSelection?.isViewSelected || rowSelection?.listActionSelected) &&
          !!rowSelection?.selectedRowKeys?.length && (
            <div className={cn('flex items-center justify-between')}>
              <div className='text-sm'>
                {rowSelection?.isViewSelected &&
                  `${rowSelection?.selectedRowKeys?.length} item(s) selected`}
              </div>
              {rowSelection?.listActionSelected}
            </div>
          )}

        <>
          {!dataRender ? (
            <div>
              <Table height={height}>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            key={header.id}
                            colSpan={header.colSpan}
                            style={{ width: `${header.column.columnDef.size}px` }}
                          >
                            {header.isPlaceholder ? null : (
                              <>
                                {!header.column.getCanSort() ? (
                                  <div className='w-full font-semibold px-4 focus:ring-ring focus:ring-2 focus:outline-none'>
                                    {flexRender(
                                      header.column.columnDef.header,
                                      header.getContext(),
                                    )}
                                  </div>
                                ) : (
                                  <button
                                    {...{
                                      className:
                                        'flex px-4 w-full h-full items-center justify-between font-semibold group focus:ring-ring focus:ring-2',
                                      onClick: header.column.getToggleSortingHandler(),
                                    }}
                                  >
                                    <span className='flex-1 text-start'>
                                      {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                      )}
                                    </span>
                                    {{
                                      asc: <RiArrowUpLine className='ml-2 h-5 w-5' />,
                                      desc: <RiArrowDownLine className='ml-2 h-5 w-5' />,
                                      false: (
                                        <RiArrowUpDownLine className='ml-2 h-5 w-5 transition-all duration-300 opacity-0 group-hover:opacity-100' />
                                      ),
                                    }[header.column.getIsSorted() as string] ?? null}
                                  </button>
                                )}
                              </>
                            )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                {table.getRowModel().rows?.length > 0 && (
                  <TableBody>
                    {table.getRowModel().rows.map((row) => {
                      const error = (row?.original as unknown as { errors?: boolean })?.errors
                        ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                          Object.values((row?.original as any)?.errors)[0]
                        : null;
                      return (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && 'selected'}
                          style={
                            error
                              ? {
                                  backgroundColor: '#fe9394',
                                }
                              : {}
                          }
                          className='hover:!bg-accent'
                        >
                          {row.getVisibleCells().map((cell) => {
                            let cellRender = flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            );

                            if (typeof cell.getValue() === 'number') {
                              cellRender = <div className='min-w-[max-content]'>{cellRender}</div>;
                            }
                            return containsSubstring(
                              // Default column hidden tooltip
                              ['rowSelection', 'actions', 'index', 'image', 'icon', 'status'],
                              cell.column.id,
                            ) ||
                              !cell.getValue() ||
                              cell.getValue()?.toString() === '-' ||
                              isEmpty(cell.getValue()) ? (
                              <TableCell>{cellRender}</TableCell>
                            ) : typeof cell.getValue() === 'string' ? (
                              <Tooltip
                                content={cell.getValue() as React.ReactNode}
                                side='bottom'
                                key={cell.id}
                              >
                                <TableCell>{cellRender}</TableCell>
                              </Tooltip>
                            ) : (
                              <TableCell>{cellRender}</TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                )}
              </Table>
              {!(table.getRowModel().rows?.length > 0) && (
                <div className='h-24 w-full flex items-center justify-center text-sm'>
                  {rowEmpty ? rowEmpty : 'No results found.'}
                </div>
              )}
            </div>
          ) : (
            dataRender
          )}
        </>

        <div
          className={cn(
            'items-center justify-between hidden',
            table.getRowModel().rows?.length > 0 && 'flex',
          )}
        >
          <TotalElements
            totalElements={totalElements}
            pagination={pagination}
            totalPages={_totalPages}
            setPageSize={setPageSize}
            setPageIndex={setPageIndex}
            size={params.size}
          />
          <DataTablePagination2
            currentPage={pagination.pageIndex + 1}
            setPageIndex={setPageIndex}
            totalPages={_totalPages}
          />
        </div>
      </div>
    </Loading>
  );
}

DataTable.useTable = useTable;

const TotalElements = ({
  totalElements,
  pagination,
  totalPages,
  setPageSize,
  setPageIndex,
  size,
}: {
  totalElements?: TTotalElement;
  pagination: PaginationState;
  totalPages: number;
  setPageSize: (size: number) => void;
  setPageIndex: (size: number) => void;
  size: number;
}) => {
  if (!totalElements) {
    return null;
  }
  const total = typeof totalElements === 'number' ? totalElements : totalElements.total;

  return (
    <div className={cn('hidden', total > 0 && 'flex items-center gap-2 text-sm')}>
      <span className='text-sm'>Result per page</span>
      <Select
        value={size.toString()}
        onValueChange={(size) => {
          setPageSize(Number(size));
          setPageIndex(0);
        }}
      >
        <SelectTrigger className='w-[80px] h-8 pr-1'>
          <SelectValue placeholder={size} />
        </SelectTrigger>
        <SelectContent className='min-w-[80px]'>
          {sizePages.map((option) => (
            <SelectItem
              key={option}
              value={option.toString()}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className='font-semibold'>
        {total > 0 &&
          `${pagination.pageIndex === 0 ? 1 : pagination.pageIndex * pagination.pageSize + 1}-${
            total < pagination.pageSize
              ? total
              : totalPages === pagination.pageIndex + 1
                ? total
                : (pagination.pageIndex + 1) * pagination.pageSize
          }`}
      </span>
      <span>{` of ${total}`}</span>
    </div>
  );
};
