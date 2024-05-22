export function roundingNumber(
  number: string | number,
  separator?: string,
  place?: number | string,
) {
  const _number = number.toString().replace(',', '.');
  if (separator) {
    const coefficient = Math.pow(10, Number(place));
    const result = (Math.round(Number(_number) * coefficient) / coefficient)
      .toString()
      .replace(separator === '.' ? ',' : '.', separator);

    return result.toString();
  } else {
    return Math.ceil(Number(_number)).toString();
  }
}

export const formatFileSize = (size: number): string => {
  if (size === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
