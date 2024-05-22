import React, { useCallback, useState } from 'react';
import { DropzoneOptions, ErrorCode, FileRejection, useDropzone } from 'react-dropzone';
import { Else, If, Then } from 'react-if';
import { Button } from '../button';
import { DocumentIcon, FileIcon, UploadIcon } from 'src/assets/icons';
import { cn } from 'src/utils/classnames';
import { Label } from '../label';
import { X } from 'lucide-react';
import { formatFileSize } from 'src/utils/helpers/numbers';
import { AlertMessage } from '../alert';

const FILE_STATUS_CODE = {
  [ErrorCode.FileTooLarge]: 'The file exceeds 2MB. Please upload again!',
  [ErrorCode.FileInvalidType]: <p>The file extension is not supported. Please upload again!</p>,
  [ErrorCode.FileTooSmall]: 'The file is too small. Please upload again!',
  [ErrorCode.TooManyFiles]: 'Only allow upload 1 filed. Please upload again!',
};
export interface FilePreview {
  preview: string;
  name: string;
  size: number;
}

interface FilePreviewProps {
  filePreview: FilePreview;
  fileType: 'image' | 'excel' | null;
  isViewMode: boolean;
  containerSizePreview: { heightPreview: number; widthImg: number; heightImg: number };
  onRemove?: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({
  filePreview,
  fileType,
  isViewMode,
  containerSizePreview,
  onRemove,
}) => {
  const { name, preview, size } = filePreview;
  const { heightPreview, heightImg, widthImg } = containerSizePreview;

  return (
    <div
      className={cn(
        'rounded-lg shadow-md flex items-center justify-between',
        !isViewMode && 'bg-accent p-2',
      )}
      style={{ height: isViewMode ? '200px' : `${heightPreview}px` }}
    >
      <If condition={!isViewMode}>
        <Then>
          <div className='flex gap-2 flex-grow'>
            <If condition={fileType === 'image'}>
              <Then>
                <img
                  src={preview}
                  alt={name}
                  className='object-fill rounded shadow-md pointer-events-none'
                  style={{ width: `${widthImg}px`, height: `${heightImg}px` }}
                />
              </Then>
              <Else>
                <DocumentIcon
                  width={widthImg}
                  height={heightImg}
                />
              </Else>
            </If>
            <div className='flex flex-col justify-start flex-grow'>
              <span className='text-sm leading-[18px] line-clamp-1 break-all'>{name}</span>
              <span className='text-[#707171] text-xs leading-[16px]'>{formatFileSize(size)}</span>
            </div>

            {onRemove && (
              <span
                className='cursor-pointer flex justify-end h-fit'
                onClick={onRemove}
              >
                <X className='h-5 w-5' />
              </span>
            )}
          </div>
        </Then>
        <Else>
          <img
            src={preview}
            alt='Image'
            className={cn('w-full h-full object-fill rounded-lg shadow-md', !preview && 'hidden')}
          />
        </Else>
      </If>
    </div>
  );
};

type FileType = 'image' | 'excel' | null;
interface BrowseFilesAreaProps extends DropzoneOptions {
  label?: string;
  maxSize?: number;
  noDrag?: boolean;
  required?: boolean;
  multiple?: boolean;
  isViewMode?: boolean;
  fileType?: FileType;
  sizeFilesArea?: 'small' | 'medium' | 'large';
  sizeFilesPreview?: 'small' | 'medium' | 'large';
  dragAndDropForm?: 'simple' | 'highlighted';
  files: FilePreview[];
  onChangeFile?: (acceptedFiles: File[] | File | null, rejectedFiles?: FileRejection[]) => void;
  onRemoveFile?: (index: number) => void;
}

const containerSizeSimple = {
  small: { height: '132px' },
  medium: { height: '164px' },
  large: { height: '180px' },
};

const containerSizeHighlighted = {
  small: { height: '208px' },
  medium: { height: '256px' },
  large: { height: '280px' },
};

const containerSizePreview = {
  small: { height: 64, widthImg: 40, heightImg: 40 },
  medium: { height: 80, widthImg: 56, heightImg: 56 },
  large: { height: 92, widthImg: 64, heightImg: 64 },
};

const BrowseFilesArea: React.FC<BrowseFilesAreaProps> = ({
  label,
  files,
  maxSize = 2,
  isViewMode = false,
  noDrag = false,
  required = false,
  multiple = false,
  fileType = 'image',
  sizeFilesArea = 'medium',
  sizeFilesPreview = 'medium',
  dragAndDropForm = 'simple',
  onChangeFile,
  onRemoveFile,
  ...props
}) => {
  const { height } = containerSizeSimple[sizeFilesArea];
  const { height: heightHighlighted } = containerSizeHighlighted[sizeFilesArea];
  const { height: heightPreview, widthImg, heightImg } = containerSizePreview[sizeFilesPreview];

  const maxSizeInMegaBytes = maxSize * 1024 * 1024;
  const isSimpleFormDragAndDrop = dragAndDropForm === 'simple';
  const [rejectedFileCode, setRejectedFileCode] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        const errorCode = fileRejections[0].errors[0].code;
        setRejectedFileCode(errorCode);
      } else {
        setRejectedFileCode(null);
      }
      if (onChangeFile) {
        onChangeFile(multiple ? acceptedFiles : acceptedFiles[0] || null, fileRejections);
      }
    },
    [multiple],
  );

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop,
    noDrag,
    multiple,
    maxSize: maxSizeInMegaBytes,
    ...props,
  });

  const renderDragAndDropText = noDrag ? (
    <span className='text-sm text-[#707171]'>Browse Files</span>
  ) : (
    <p className='font-semibold text-sm text-[#707171] text-center'>
      Drop your files here, or{' '}
      <button
        className='text-[#0067EA] underline underline-offset-2 cursor-pointer font-normal'
        onClick={(event) => {
          event.preventDefault();
          open();
        }}
      >
        Browse
      </button>
    </p>
  );

  return (
    <>
      <input {...getInputProps()} />
      {label && (
        <Label className='font-inter font-semibold text-sm'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </Label>
      )}
      <If condition={!isViewMode}>
        <Then>
          <If condition={isSimpleFormDragAndDrop}>
            <Then>
              <div
                {...getRootProps()}
                className={cn(
                  'group flex flex-col gap-3 items-center justify-center border-[2px] border-muted hover:border-primary border-dashed rounded-lg',
                  isDragActive ? 'border-solid border-primary bg-teal-100' : '',
                )}
                style={{ height }}
              >
                <UploadIcon />
                {renderDragAndDropText}
                <div className='text-xs text-muted-foreground text-center'>
                  Maximum file size is {fileType === 'excel' ? '100MB' : '2MB'}
                </div>
              </div>
            </Then>
            <Else>
              <div
                {...getRootProps()}
                className={cn(
                  'group flex flex-col gap-3 items-center justify-center border-[2px] border-muted hover:border-primary border-dashed rounded-lg',
                  isDragActive ? 'border-solid border-primary bg-teal-100' : '',
                )}
                style={{ height: heightHighlighted }}
              >
                <UploadIcon fillColor='#707171' />
                <span className='font-semibold text-sm text-[#707171]'>Drag & drop files here</span>
                <FileIcon />
                <Button
                  typeButton='main'
                  variant='secondary'
                  onClick={open}
                >
                  Browse Files
                </Button>
                <div className='text-xs text-muted-foreground'>Maximum file size is 100MB</div>
              </div>
            </Else>
          </If>
        </Then>
      </If>
      {/* Preview files */}
      <If condition={!rejectedFileCode}>
        <Then>
          <div
            className={cn(
              'flex flex-col gap-2',
              isViewMode &&
                (!files || files.length === 0) &&
                'border-dashed border border-[#9c9d9d] h-[200px] w-[300px] rounded-lg shadow-md',
            )}
          >
            {files.map((file, index) => (
              <FilePreview
                key={index}
                filePreview={file}
                fileType={fileType}
                isViewMode={isViewMode}
                containerSizePreview={{ heightPreview, widthImg, heightImg }}
                onRemove={() => onRemoveFile && onRemoveFile(index)}
              />
            ))}
          </div>
        </Then>
        <Else>
          <AlertMessage
            showIcon
            className='w-[300px]'
            variant='error'
            message='Unable to upload'
            description={FILE_STATUS_CODE[rejectedFileCode as ErrorCode]?.toString()}
          />
        </Else>
      </If>
      {/* End Preview files */}
    </>
  );
};

export default BrowseFilesArea;
