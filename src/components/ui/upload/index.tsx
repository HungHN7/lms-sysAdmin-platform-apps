import { Edit, PlusIcon, Trash } from 'lucide-react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Else, If, Then } from 'react-if';
import { cn } from 'src/utils/classnames';
interface IUpload {
  accept?: string;
  onChange?: (file: File | undefined) => void;
  maxSize?: number;
  value?: string;
  className?: string;
  onRemove?: () => void;
}
export function Upload({
  accept = 'image',
  onChange,
  maxSize = 10,
  value,
  className,
  onRemove,
}: IUpload) {
  const onDrop = useCallback((files: File[]) => {
    const file = files && files[0];
    if (file.size > maxSize * 1024 * 1024) return;
    if (file.type.startsWith(accept)) onChange?.(file || undefined);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      [`${accept}/*`]: [],
    },
  });
  return (
    <>
      <If condition={!!value}>
        <Then>
          <div
            className={cn(
              'w-[100px] h-[100px] group flex flex-col items-center justify-center border-[1px] border-primary rounded-lg cursor-pointer relative ',
              className,
            )}
          >
            <img
              src={value}
              className={cn('w-[100px] h-[100px] rounded-lg object-contain', className)}
            />
            <div
              className={cn(
                'hidden group-hover:flex items-center justify-center gap-1 absolute top-0 left-0 w-full h-full group-hover:bg-[#00000073] z-10 rounded-lg ',
                className,
              )}
            >
              <div {...getRootProps()}>
                <Edit
                  size={16}
                  className='text-white'
                />
              </div>

              <Trash
                size={16}
                className='text-white'
                onClick={onRemove}
              />
            </div>
          </div>
        </Then>
        <Else>
          <div
            className={cn(
              'w-[100px] h-[100px] group flex flex-col items-center justify-center border-[1px] border-muted hover:border-primary border-dashed rounded-lg cursor-pointer',
              className,
            )}
            {...getRootProps()}
          >
            <PlusIcon className='w-4 h-4 text-primary' />
          </div>
        </Else>
      </If>
      <input
        {...getInputProps()}
        accept={`${accept}/*`}
      />
    </>
  );
}
