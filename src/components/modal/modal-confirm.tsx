import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  //   AlertDialogTrigger,
  //   Button,
} from 'src/components/ui';

interface ModalConfirmProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  footer?: React.ReactNode;
  action?: {
    label?: string;
    handle?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type?: 'main' | 'danger';
    isClose?: boolean;
    className?: string;
  };
  cancel?: {
    label?: string;
    handle?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    className?: string;
  };
  hiddenFooter?: boolean;
  children?: React.ReactNode;
  title?: React.ReactNode;
  message?: React.ReactNode;
  className?: string;
  classNameFooter?: string;
}

export function ModalConfirm({
  open,
  setOpen,
  footer,
  action,
  cancel,
  hiddenFooter,
  children,
  title,
  message,
  className,
  classNameFooter,
}: ModalConfirmProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogContent className={className}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}

        {!hiddenFooter && (
          <AlertDialogFooter className={classNameFooter}>
            {footer ? (
              footer
            ) : (
              <>
                <AlertDialogCancel
                  className={cancel?.className}
                  onClick={cancel?.handle}
                >
                  {cancel?.label ? cancel?.label : 'Cancel'}
                </AlertDialogCancel>
                <AlertDialogAction
                  className={action?.className}
                  typeButton={action?.type}
                  onClick={action?.handle}
                >
                  {action?.label ? action?.label : 'OK'}
                </AlertDialogAction>
              </>
            )}
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
