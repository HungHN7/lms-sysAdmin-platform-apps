import { ToastProviderProps } from '@radix-ui/react-toast';
import {
  RiAlertFill,
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiInformationFill,
} from 'react-icons/ri';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider as ToastProviderRoot,
  ToastTitle,
  ToastViewport,
} from 'src/components/ui';
import { useToast } from 'src/hooks';
import { cn } from 'src/utils/classnames';

export default function ToastProvider(props: ToastProviderProps) {
  const { toasts } = useToast();

  return (
    <ToastProviderRoot {...props}>
      {toasts.map(
        ({ id, title, description, action, showIcon = false, closable = true, ...props }) => {
          return !description ? (
            <Toast
              key={id}
              {...props}
            >
              <div className='flex gap-4 justify-between w-full'>
                <div className='flex gap-2 '>
                  {showIcon && (
                    <>
                      {props.variant === 'info' && <RiInformationFill size={20} />}
                      {props.variant === 'success' && <RiCheckboxCircleFill size={20} />}
                      {props.variant === 'warning' && <RiAlertFill size={20} />}
                      {props.variant === 'error' ||
                        (props.variant === 'destructive' && <RiCloseCircleFill size={20} />)}
                      {props.variant === 'successLight' && <RiCheckboxCircleFill size={20} />}
                    </>
                  )}
                  <div className='flex flex-col justify-center flex-grow'>
                    {title && <ToastTitle>{title}</ToastTitle>}
                    {description && (
                      <ToastDescription className={cn(title ? 'text-[#444646]' : '')}>
                        {description}
                      </ToastDescription>
                    )}
                  </div>
                </div>
                <div className='flex gap-4'>
                  {action}
                  {closable && <ToastClose />}
                </div>
              </div>
            </Toast>
          ) : (
            <Toast
              key={id}
              {...props}
            >
              <div className='flex justify-between w-full'>
                <div className='flex gap-2'>
                  {showIcon && (
                    <>
                      {props.variant === 'info' && <RiInformationFill size={20} />}
                      {props.variant === 'success' && <RiCheckboxCircleFill size={20} />}
                      {props.variant === 'warning' && <RiAlertFill size={20} />}
                      {props.variant === 'error' ||
                        (props.variant === 'destructive' && <RiCloseCircleFill size={20} />)}
                      {props.variant === 'successLight' && <RiCheckboxCircleFill size={20} />}
                    </>
                  )}
                  <div className='flex flex-col items-baseline flex-grow gap-2'>
                    {title && <ToastTitle>{title}</ToastTitle>}
                    {description && (
                      <ToastDescription className={cn(title ? 'text-grey-10' : '')}>
                        {description}
                      </ToastDescription>
                    )}
                    {closable && action}
                  </div>
                </div>
                <div className='flex gap-4 items-start'>{closable ? <ToastClose /> : action}</div>
              </div>
            </Toast>
          );
        },
      )}
      <ToastViewport />
    </ToastProviderRoot>
  );
}
