import React from 'react';
import { Button, Card, Label } from '../ui';
import { RiSettings3Fill } from 'react-icons/ri';
import { MoreVerticalIcon, Plus, X } from 'lucide-react';
import { ReactSortable } from 'react-sortablejs';
import { SelectPro, TSelectProOption } from '../select-pro';
import { cn } from 'src/utils/classnames';
import { useLocation } from 'react-router-dom';
import { COLUMN_LOCAL_STORAGE, columnNoCheck } from './constants';
import { setColumnsLocalStorage, sortColumns } from './helper';
import { TColumnCurrent, TColumnEdit } from './type';

function ButtonVisible({
  columnsHidden,
  columnsAlwaysPresent,
  columns,
  setCurrentColumns,
}: {
  columnsHidden: string[];
  columnsAlwaysPresent: string[];
  columns: TColumnCurrent[];
  setCurrentColumns: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const { pathname } = useLocation();
  const refContent = React.useRef<HTMLDivElement>(null);
  const refActionShow = React.useRef<HTMLButtonElement>(null);
  const [stateVisibility, setStateVisibility] = React.useState<string[]>([]);
  const [isShow, setIsShow] = React.useState<boolean>(false);

  const columnCurrent = columns
    .filter((column) => !columnNoCheck.includes(column.accessorKey))
    .map((column) => ({
      id: column.accessorKey,
      label: column.header,
    }));

  const dataOption = columnCurrent?.map((column) => ({
    value: column.id,
    label: column.label,
  }));

  const [columnEdit, setColumnEdit] = React.useState<TColumnEdit[]>(
    columnCurrent as unknown as TColumnEdit[],
  );

  React.useEffect(() => {
    const mouseEvent = (e: MouseEvent) => {
      if (refActionShow.current && refActionShow.current.contains(e.target as unknown as Node)) {
        setIsShow((prev) => !prev);
      } else {
        if (refContent.current && !refContent.current.contains(e.target as unknown as Node)) {
          setIsShow(false);
        }
      }
    };

    document.addEventListener('mousedown', mouseEvent);

    return () => document.removeEventListener('mousedown', mouseEvent);
  }, [refActionShow, refContent]);

  React.useEffect(() => {
    try {
      const columnsTableStorage = localStorage.getItem(COLUMN_LOCAL_STORAGE);
      const columnsTable = columnsTableStorage ? JSON.parse(columnsTableStorage) : undefined;

      if (columnsTable?.[pathname]) {
        const currentColumnsHidden = columnsTable?.[pathname]?.columnsHidden;
        const columnsSortable = columnsTable?.[pathname]?.columnsSortable;

        const currentColumns = columns.filter(
          (col) => !currentColumnsHidden?.includes((col as TColumnCurrent)?.accessorKey || ''),
        );
        const resultColumn = sortColumns(columnsSortable, currentColumns);

        setCurrentColumns(resultColumn);
        setStateVisibility(currentColumnsHidden);
        setColumnEdit((prev) =>
          prev.filter(({ id }) => !currentColumnsHidden.includes(id)).filter(Boolean),
        );
      }
      //
      else {
        setColumnsLocalStorage({
          pathname,
          columnsHidden,
          columnsAlwaysPresent,
          columnsSortable: columns.map((col) => (col as TColumnCurrent)?.accessorKey || ''),
        });

        setCurrentColumns(() =>
          columns.filter(
            (col) => !columnsHidden?.includes((col as TColumnCurrent)?.accessorKey || ''),
          ),
        );
        setStateVisibility(columnsHidden);
        setColumnEdit((prev) =>
          prev.filter(({ id }) => !columnsHidden.includes(id)).filter(Boolean),
        );
      }
    } catch (error) {
      console.log('---JSON ERROR---', error);
      localStorage.removeItem(COLUMN_LOCAL_STORAGE);
    }
  }, [columnsHidden, columns, pathname]);

  const handleApply = () => {
    const newColumnsSortable = columnEdit.map((col) => col.id);
    const newColumnsHidden = columnCurrent
      .map((col) => col.id)
      .filter((col) => !newColumnsSortable.includes(col));

    const newColumns = sortColumns(newColumnsSortable, columns).filter(
      (col) => !newColumnsHidden.includes(col?.accessorKey || ''),
    );

    setCurrentColumns(newColumns);
    setColumnsLocalStorage({
      pathname,
      columnsHidden: newColumnsHidden,
      columnsAlwaysPresent,
      columnsSortable: newColumnsSortable,
    });

    setIsShow(false);
  };

  return (
    <div className='relative'>
      <Button
        ref={refActionShow}
        variant='tertiary'
        size='icon'
        className='data-[state=open]:border-background data-[state=open]:bg-primary/20 data-[state=open]:text-primary data-[state=open]:ring-ring data-[state=open]:ring-2'
      >
        <RiSettings3Fill className='w-5 h-5' />
      </Button>
      <Card
        className={cn(
          'w-[320px] absolute bg-background z-50 top-[calc(100%+2px)] hidden',
          isShow && 'block',
        )}
        ref={refContent}
      >
        <Label className='p-4 !pb-2 font-semibold text-base leading-6 block'>
          Customize column
        </Label>
        <div className='px-4'>
          <div className='custom-scroll max-h-[calc(100vh-350px)] overflow-y-auto'>
            <ReactSortable
              list={columnEdit}
              setList={setColumnEdit}
              animation={150}
              handle='.move-column'
              forceFallback
            >
              {columnEdit.map((column, idx) => {
                return (
                  <div
                    className='flex gap-2 items-center py-2 relative'
                    key={column.id}
                  >
                    <span className='absolute left-0 move-column cursor-grab'>
                      <MoreVerticalIcon className='w-4 h-4 text-background-second' />
                    </span>

                    <div className='flex-1 bg-[#dedede] rounded-lg p-[.15rem] flex items-center'>
                      <div className='w-full ml-3'>
                        <SelectPro
                          placement='top'
                          menuPortalTarget={document.body}
                          options={
                            stateVisibility.length > 0
                              ? dataOption.filter((item) => stateVisibility.includes(item.value))
                              : []
                          }
                          value={
                            dataOption?.find(
                              (option) => option.value === column.id,
                            ) as TSelectProOption
                          }
                          onChange={(value) => {
                            setStateVisibility((prev) =>
                              [...prev.filter((vl) => vl !== value?.value), column.id].filter(
                                Boolean,
                              ),
                            );
                            setColumnEdit(
                              (prev) =>
                                prev.map((item, index) =>
                                  index === idx ? { id: value?.value, label: value.label } : item,
                                ) as TColumnEdit[],
                            );
                          }}
                          disabled={columnsAlwaysPresent.includes(column.id)}
                        />
                      </div>
                    </div>

                    <Button
                      typeButton='ghost'
                      variant='secondary'
                      size={'icon'}
                      className='ml-auto'
                      onClick={(e) => {
                        e.preventDefault();
                        setStateVisibility((prev) =>
                          (prev.includes(column.id)
                            ? prev.filter((vl) => vl !== column.id)
                            : [...prev, column.id]
                          ).filter(Boolean),
                        );
                        setColumnEdit(columnEdit.filter((item) => item.id !== column.id));
                      }}
                      disabled={columnsAlwaysPresent.includes(column.id)}
                    >
                      <X className='w-6 h-6' />
                    </Button>
                  </div>
                );
              })}
            </ReactSortable>
          </div>
        </div>

        <div className='block justify-end'>
          <div className='w-full flex justify-center my-1'>
            <Button
              type='submit'
              onClick={() => {
                setColumnEdit(() => [
                  ...columnEdit,
                  { id: '', label: '' } as unknown as TColumnEdit,
                ]);
              }}
              disabled={stateVisibility.length === 0 || columnEdit.some((col) => !col.id)}
              typeButton='ghost'
              variant='primary'
            >
              <span className='flex items-center gap-2'>
                <Plus /> Add more column
              </span>
            </Button>
          </div>

          <div className='flex justify-end mr-4 mb-4'>
            <Button
              variant='primary'
              typeButton='main'
              className='text-primary text-white'
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ButtonVisible;
