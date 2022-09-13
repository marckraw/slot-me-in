// @ts-ignore
import React from 'react';
// @ts-ignore
import type { ReactNode, Fragment } from 'react';

export type UseSlotsReturnType<Type> = {
  [Property in keyof Type]: Property;
};

const isReactFragment = (variableToInspect) => {
  if (variableToInspect.type) {
    return variableToInspect.type === React.Fragment;
  }
  return variableToInspect === React.Fragment;
};

const useSlots = <TSlots,>(
  children: ReactNode | ReactNode[]
): UseSlotsReturnType<TSlots> => {
  const childrenArray = React.Children.toArray(children);

  const toSlots = childrenArray.reduce((prev, next) => {
    // ignoring direct string, number literal (every slot has to be wrapped in html element
    // and have data-slot="slot-name" prop, or be ReactComponent
    if (
      typeof next !== 'number' &&
      typeof next !== 'string' &&
      'type' in next
    ) {
      if (typeof next.type === 'function') {
        // ReactComponent, like ModalContent, ModalTrigger
        return {
          ...prev,
          // @ts-ignore
          [next.type.displayName]: next,
        };
      } else if (isReactFragment(next)) {
        return {
          ...prev,
          fragment: next,
        };
      } else {
        // ReactElement (span, div, h2, etc...)
        return {
          ...prev,
          [next.props['data-slot']]: next,
        };
      }
    }

    return prev;
  }, {});

  // @ts-ignore
  return toSlots;
};

export { useSlots };
