import { SelectProps } from '@radix-ui/react-select';
import React, { ReactElement } from 'react';
import {
  ScrollArea,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui';
import { Show } from 'src/shared';
import { cn } from 'src/utils/classnames';

export type Option<T = unknown> = {
  value: string;
  label: ReactElement | string;
} & T;

export type PropsSelectCustom<T = unknown> = SelectProps & {
  value?: Option<T>['value'];
  options?: Option<T>[];
  placeholder?: string;
  selectLabel?: string;
  onChange?: (v: Option<T>['value'], option?: Option<T>) => void;
  contentCn?: string;
  triggerCn?: string;
};

function SelectCustom<T>(props: PropsSelectCustom<T>, ref) {
  function handleChangeValue(v: string) {
    const foundOpt = props.options?.find((o) => o.value == v);
    props.onChange && props.onChange(v as Option<T>['value'], foundOpt);
  }
  const selectRef = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(ref, () => selectRef.current as HTMLInputElement);

  return (
    <Select
      onValueChange={handleChangeValue}
      value={props?.value}
      {...props}
    >
      <SelectTrigger className={cn('w-full', props.triggerCn ?? '')}>
        <SelectValue placeholder={props.placeholder ?? 'Select a fruit'} />
      </SelectTrigger>
      <ScrollArea>
        <SelectContent className={cn('select-content', props.contentCn)}>
          <SelectGroup>
            <Show when={props?.selectLabel}>
              <SelectLabel>{props?.selectLabel}</SelectLabel>
            </Show>
            {(props.options ?? []).map((optionsI) => (
              <SelectItem
                key={'select-option-' + optionsI.value}
                value={optionsI.value}
              >
                {optionsI.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </ScrollArea>
    </Select>
  );
}

export default React.forwardRef(SelectCustom);
