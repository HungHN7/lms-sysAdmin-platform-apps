import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from 'src/utils/classnames';

const TooltipProvider = TooltipPrimitive.Provider;

const TooltipRoot = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipArrow = TooltipPrimitive.Arrow;
const TooltipPortal = TooltipPrimitive.Portal;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-[5px] bg-foreground text-background px-4 py-2 text-sm break-all max-w-[450px]',
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export interface TooltipProps {
  delayDuration?: number;
  disableHoverableContent?: boolean;
  children: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  className?: string;
  hiddenArrow?: boolean;
}
const Tooltip = ({
  delayDuration = 100,
  disableHoverableContent,
  side,
  sideOffset,
  content,
  children,
  hiddenArrow,
}: TooltipProps) => {
  return (
    <TooltipProvider
      delayDuration={delayDuration}
      disableHoverableContent={disableHoverableContent}
      skipDelayDuration={delayDuration}
    >
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            side={side}
            sideOffset={sideOffset}
          >
            {content}
            {!hiddenArrow && <TooltipArrow className='text-foreground' />}
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  );
};

export { TooltipRoot, TooltipTrigger, TooltipContent, TooltipProvider, Tooltip };
