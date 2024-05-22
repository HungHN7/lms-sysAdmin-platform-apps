import type { PropsWithChildren, ReactNode } from 'react';
import { createContext, Fragment, useCallback, useContext, useState } from 'react';
import { Dialog, DialogContent } from 'src/components/ui';

interface IPropsModal {
  domNode?: Element;
  isNested?: boolean | undefined;
  isCloseMask?: boolean;
}

interface IFnModal {
  open: (modal: ReactNode, propsModal?: IPropsModal) => void;
  destroy: VoidFunction;
  close: VoidFunction;
  isModalOpen: boolean;
}
interface IStateModal {
  modals: ReactNode[];
}
interface IModal extends IFnModal, IStateModal {}

export const ModalContext = createContext<IModal>(null as unknown as IModal);
ModalContext.displayName = 'ModalContext';

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Please add Provider ModalContext!!!');
  }

  return context;
};

function Modals() {
  const { modals } = useModalContext();

  return (
    <Fragment>
      {modals.map((modal, index) => {
        return <Fragment key={index}>{modal}</Fragment>;
      })}
    </Fragment>
  );
}
export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modals, setModals] = useState<ReactNode[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const destroy = useCallback(() => {
    setIsModalOpen(false);
    setModals([]);
  }, []);

  const removeLastModal = useCallback(() => {
    setModals((prev) => {
      return prev.slice(0, -1);
    });
  }, []);
  const open = useCallback((modal: ReactNode, props?: IPropsModal) => {
    const onChange = (open: boolean) => {
      if (!open) {
        removeLastModal();
      }
    };
    setModals((prev) => {
      const modalPortal = (
        <Dialog
          open={true}
          onOpenChange={onChange}
        >
          <DialogContent
            {...props}
            zIndex={prev.length + 50}
          >
            {modal}
          </DialogContent>
        </Dialog>
      );
      if (props?.isNested) {
        return [...prev, modalPortal];
      }
      setIsModalOpen(true);
      return [modalPortal];
    });
  }, []);
  return (
    <ModalContext.Provider
      value={{
        open,
        destroy,
        modals,
        isModalOpen,
        close: removeLastModal,
      }}
    >
      {children}
      <Modals />
    </ModalContext.Provider>
  );
};
