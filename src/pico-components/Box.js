import React, { forwardRef } from 'react';
import { classNames } from './utils';

export const Box = forwardRef(function A(
  {
    children,
    direction = 'column',
    justify = 'start',
    align = 'start',
    wrap = 'nowrap',
    margin = '0',
    pad = '0',
    width = 'auto',
    height = 'auto',
    border,
    borderRadius = '0',
    onClick,
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={classNames({
        flex: true,
        flexRow: direction === 'row',
        flexColumn: direction === 'column',
        flexWrap: wrap,
        justifyConter: justify === 'center',
        justifyStart: justify === 'start',
        justifyEnd: justify === 'end',
        justifyBetween: justify === 'between',
        alignStart: align === 'start',
        alignEnd: align === 'end',
        alignCenter: align === 'center',
        alignBaseline: align === 'baseline',
        border: !!border,
        borderCritical: border === 'critical',
        borderSuccess: border === 'success',
        borderRadius: !!borderRadius,
      })}
      style={{
        margin,
        padding: pad,
        width,
        height,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
});
