import { ReactNode, useEffect, useRef } from 'react';
import { DeleteBinIcon } from 'src/assets/icons';
import {
  Button,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  TTypeButton,
} from 'src/components/ui';
import { Show } from 'src/shared';

interface Props {
  onOk: VoidFunction;
  onCancel: VoidFunction;
  textOk?: string;
  textCancel?: string;
  content?: ReactNode;
  typeButtonOk?: TTypeButton;
  typeButtonCancel?: TTypeButton;
}
const focusable =
  'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select';

export function DeleteModal({
  onOk,
  onCancel,
  textOk,
  textCancel,
  content = 'Are you sure you want to delete selected item(s)?',
  typeButtonOk = 'danger',
  typeButtonCancel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleBlur = () => {
    if (!ref.current) return;
    const focusableModalElements = ref.current.querySelectorAll(focusable);

    // eslint-disable-next-line no-undef
    setTimeout(() => {
      focusableModalElements.forEach(function (element) {
        (element as HTMLElement).blur();
      });
    }, 1);
  };

  useEffect(() => {
    handleBlur();
  }, []);

  return (
    <div
      className='sm:max-w-lg lg:w-full min-w-[32rem]'
      ref={ref}
    >
      <DialogHeader>
        <DialogTitle>
          <div className='flex items-center justify-center'>
            <DeleteBinIcon
              width={48}
              height={48}
            />
          </div>
        </DialogTitle>
      </DialogHeader>
      <Show when={content}>
        <DialogDescription className='my-4 text-foreground text-center'>
          {content}
        </DialogDescription>
      </Show>
      <DialogFooter className='flex flex-row justify-center gap-x-2 pt-3'>
        <Show when={textCancel}>
          <Button
            variant={'tertiary'}
            className='px-3 w-[200px]'
            onClick={onCancel}
            typeButton={typeButtonCancel}
            tabIndex={0}
            autoFocus={false}
          >
            {textCancel}
          </Button>
        </Show>
        <Show when={textOk}>
          <Button
            typeButton={typeButtonOk}
            variant='primary'
            className='px-3 w-[200px]'
            onClick={onOk}
            tabIndex={0}
          >
            {textOk}
          </Button>
        </Show>
      </DialogFooter>
    </div>
  );
}
