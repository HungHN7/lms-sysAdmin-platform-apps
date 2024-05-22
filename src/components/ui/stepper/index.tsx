import { Check } from 'lucide-react';
import React, { useRef } from 'react';
import { cn } from 'src/utils/classnames';

interface StepComponent {
  title: string;
}

interface LinearStepperProps {
  steps: StepComponent[];
  activeStep: number;
  direction: 'vertical' | 'horizontal';
  className?: string;
  isTextUnderIcon?: boolean;
}

const Stepper: React.FC<LinearStepperProps> = ({
  activeStep,
  steps,
  direction = 'horizontal',
  className,
  isTextUnderIcon = false,
}) => {
  const refs = Array.from({ length: steps.length }, () => useRef<HTMLDivElement>(null));
  const HALF_ICON_WIDTH = 16;
  const WIDTH = 120;

  return (
    <>
      {!isTextUnderIcon && (
        <div
          aria-label='Stepper'
          className={cn(`flex mb-6 mx-auto`, className)}
        >
          {steps.map((_, index) => {
            const isActive = index === activeStep;
            const isChecked = index < activeStep;
            return (
              <div
                className={`step-item relative ${
                  index < steps.length - 1 ? 'flex-1' : 'flex-none'
                }`}
                key={index}
              >
                <div
                  role='button'
                  className='group flex gap-2 items-center justify-center'
                >
                  <div
                    className={`step-icon h-6 w-6 border rounded-full flex items-center justify-center text-sm relative ml-3 ${
                      isActive
                        ? 'bg-primary border-primary transition-all text-primary-foreground '
                        : isChecked
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : 'bg-primary-foreground text-[#5E6060] font-semibold group-hover:opacity-100'
                    }`}
                    // style={{
                    //   marginLeft: WIDTH
                    //     ? `${WIDTH / 2 > 0 ? WIDTH / 2 - HALF_ICON_WIDTH : 0}px`
                    //     : 'auto',
                    // }}
                  >
                    <span>{isChecked ? <Check size={12} /> : index + 1}</span>
                  </div>
                  <div
                    className={`step-contain w-max text-sm  text-center ${
                      isActive
                        ? 'font-semibold text-[#353636]'
                        : isChecked
                          ? 'font-semibold'
                          : ' group-hover:opacity-100 text-[#5E6060] font-semibold'
                    }`}
                    ref={refs[index]}
                    // style={{ width: WIDTH }}
                  >
                    <p>{steps[index].title}</p>
                  </div>
                  {index !== steps.length - 1 && (
                    <div
                      className={`step-tail w-1/3 flex-1`}
                      style={
                        {
                          // marginLeft: WIDTH ? `${WIDTH / 2 > 0 ? WIDTH / 2 : 0}px` : 'auto',
                        }
                      }
                    >
                      <div
                        className={`border-b-2 h-1/3 border-[#C8C9C9]
                         ${isChecked ? ' border-primary' : ''}`}
                      ></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {isTextUnderIcon && (
        <div
          aria-label='Stepper'
          className={cn(
            `flex mb-6 mx-auto  ${direction === 'horizontal' ? 'flex-row' : 'flex-col'}`,
            className,
          )}
        >
          {steps.map((_, index) => {
            const isActive = index === activeStep;
            const isChecked = index < activeStep;
            return (
              <div
                className={`step-item relative ${
                  index < steps.length - 1 ? 'flex-1' : 'flex-none'
                }`}
                key={index}
              >
                <div
                  role='button'
                  className='group'
                >
                  {index !== steps.length - 1 && (
                    <div
                      className={`step-tail w-full absolute top-3 left-0 px-6`}
                      style={{
                        marginLeft: WIDTH ? `${WIDTH / 2 > 0 ? WIDTH / 2 - 4 : 0}px` : 'auto',
                      }}
                    >
                      <div
                        className={`border-b-2 h-1/3 border-[#C8C9C9]
                         ${isChecked ? ' border-primary' : ''}`}
                      ></div>
                    </div>
                  )}
                  <div
                    className={`step-icon h-6 w-6 border rounded-full flex items-center justify-center text-sm relative  ${
                      isActive
                        ? 'bg-primary border-primary transition-all text-primary-foreground'
                        : isChecked
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-primary-foreground group-hover:opacity-100'
                    }`}
                    style={{
                      marginLeft: WIDTH
                        ? `${WIDTH / 2 > 0 ? WIDTH / 2 - HALF_ICON_WIDTH : 0}px`
                        : 'auto',
                    }}
                  >
                    <span>{isChecked ? <Check size={12} /> : index + 1}</span>
                  </div>
                  <div
                    className={`step-contain w-max text-sm text-center mt-2 font-semibold ${
                      isActive
                        ? 'font-semiboldx'
                        : isChecked
                          ? 'font-semibold'
                          : 'group-hover:opacity-100'
                    }`}
                    ref={refs[index]}
                    // style={{ width: WIDTH }}
                  >
                    <div>{steps[index].title}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
Stepper.displayName = 'Stepper';

export { Stepper };
