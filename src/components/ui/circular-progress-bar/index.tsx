import {
  CircularProgressbar as CircularProgressbarBase,
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import React from 'react';
import { CircularProgressbarProps } from 'react-circular-progressbar/dist/types';

import 'react-circular-progressbar/dist/styles.css';
import { Else, If, Then } from 'react-if';
import { Check } from 'lucide-react';

export function CircularProgressbar(props: CircularProgressbarProps) {
  return (
    <If condition={props.value === props.maxValue}>
      <Then>
        <CircularProgressbarWithChildren
          {...props}
          styles={buildStyles({
            textColor: '#00D1CA',
            pathColor: '#00D1CA',
          })}
          text=''
        >
          <Check
            className='text-primary'
            size={70}
          />
        </CircularProgressbarWithChildren>
      </Then>
      <Else>
        <CircularProgressbarBase
          {...props}
          styles={buildStyles({
            textColor: '#00D1CA',
            pathColor: '#00D1CA',
          })}
        />
      </Else>
    </If>
  );
}
