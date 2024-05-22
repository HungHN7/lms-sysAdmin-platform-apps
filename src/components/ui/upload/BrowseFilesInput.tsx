import React from 'react';
import { Button } from '../button';
import { Label } from '../label';
import { If, Then } from 'react-if';
import { X } from 'lucide-react';

interface BrowseFilesInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  files: File[];
  label?: string;
  sizeFilesInput?: 'small' | 'medium' | 'large';
  multiple?: boolean;
  required?: boolean;
  accept?: string;
  onChangeFile: (files: File[]) => void;
  onRemoveFile: (index: number) => void;
}

const containerSize = {
  small: { width: '300px', height: '32px', padding: '6px 12px', fontSize: '14px' },
  medium: { width: '300px', height: '40px', padding: '10px 16px', fontSize: '14px' },
  large: { width: '300px', height: '48px', padding: '14px 20px', fontSize: '16px' },
};

const BrowseFilesInput: React.FC<BrowseFilesInputProps> = ({
  files,
  label = '',
  accept,
  sizeFilesInput = 'medium',
  multiple = false,
  required = false,
  onChangeFile,
  onRemoveFile,
  ...inputProps
}) => {
  const { width, height, padding, fontSize } = containerSize[sizeFilesInput];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files;
    if (!newFiles) return;

    const fileList = Array.from(newFiles);
    const updatedFiles = multiple ? [...files, ...fileList] : fileList;
    onChangeFile(updatedFiles);
  };

  const isInvalidFile = (file: File): boolean => {
    return typeof accept === 'string' && !file.type.startsWith(accept);
  };

  const getErrorMessage = (file: File): string => {
    if (isInvalidFile(file)) {
      return 'Feedback text';
    }
    return '';
  };

  return (
    <div className='flex flex-col gap-1'>
      <Label className='font-inter font-semibold text-sm'>
        {label}
        {required && <span className='text-red-500'>*</span>}
      </Label>
      <div
        className='flex rounded-md border border-muted items-center gap-4'
        style={{ width, height }}
      >
        <Label
          htmlFor='fileInput'
          className='flex-1 text-sm font-normal text-muted-foreground p-[10px]'
        >
          Choose files
        </Label>
        <Button
          className='h-full'
          style={{ padding, fontSize }}
        >
          <label htmlFor='fileInput'>Browse Files</label>
          <input
            className='hidden'
            id='fileInput'
            type='file'
            onChange={handleFileChange}
            multiple={multiple}
            required={required}
            accept={accept}
            {...inputProps}
          />
        </Button>
      </div>
      <div className='text-sm text-muted-foreground'>Maximum file size is 100MB</div>
      <If condition={files.length > 0}>
        <Then>
          <div className='flex flex-col gap-1'>
            {files.map((file, index) => (
              <React.Fragment key={index}>
                <div
                  className={`flex items-center justify-between text-sm p-2 rounded-md ${
                    isInvalidFile(file) ? 'border border-red-500' : 'bg-accent'
                  }`}
                  style={{ width, height }}
                >
                  <div>{file.name}</div>
                  <X
                    className='w-4 h-4 cursor-pointer'
                    onClick={() => onRemoveFile(index)}
                  />
                </div>
                {isInvalidFile(file) && (
                  <div
                    key={`error-${index}`}
                    className='text-sm text-red-500'
                  >
                    {getErrorMessage(file)}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </Then>
      </If>
    </div>
  );
};

export default BrowseFilesInput;
