import { COLUMN_LOCAL_STORAGE } from './constants';
import { TColumnCurrent } from './type';

export function sortColumns(arrA: string[], arrB: TColumnCurrent[]) {
  const indexMap = {};

  arrA.forEach((item, index) => {
    indexMap[item] = index;
  });

  arrB.sort((item1, item2) => {
    const index1 = indexMap[item1.accessorKey];
    const index2 = indexMap[item2.accessorKey];
    return index1 - index2;
  });

  return arrB;
}

export const setColumnsLocalStorage = ({
  pathname,
  columnsHidden,
  columnsAlwaysPresent,
  columnsSortable,
}) => {
  try {
    const columnsTableStorage = localStorage.getItem(COLUMN_LOCAL_STORAGE);
    const columnsTableOld = columnsTableStorage ? JSON.parse(columnsTableStorage) : undefined;

    const newColumnsItem = {
      [pathname]: {
        columnsHidden,
        columnsAlwaysPresent,
        columnsSortable,
      },
    };
    const newColumnsTable = columnsTableOld
      ? {
          ...columnsTableOld,
          ...newColumnsItem,
        }
      : newColumnsItem;

    localStorage.setItem(COLUMN_LOCAL_STORAGE, JSON.stringify(newColumnsTable));
  } catch (error) {
    console.log('---JSON ERROR---', error);
    localStorage.removeItem(COLUMN_LOCAL_STORAGE);
  }
};
