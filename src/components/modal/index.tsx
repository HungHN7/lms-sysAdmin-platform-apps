import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from 'src/components/ui';

interface ModalProps {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  classNameContent?: string;
  isShowClose?: boolean;
  dismissOnClickOutside?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  footer,
  classNameContent,
  isShowClose,
  dismissOnClickOutside = false,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onChange}
    >
      <DialogOverlay dismissOnClickOutside={dismissOnClickOutside}>
        <DialogContent
          className={classNameContent}
          isShowClose={isShowClose}
        >
          {title && (
            <DialogHeader>
              {title && <DialogTitle>{title}</DialogTitle>}
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
          )}

          {children}
          {footer && <DialogFooter className='sm:justify-start'>{footer}</DialogFooter>}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default Modal;
