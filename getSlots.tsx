// @ts-ignore
import React, { cloneElement, createElement } from "react";
// @ts-ignore
import type { ReactNode, Fragment } from "react";
import { createLogger } from "./createLogger";

export type GetSlotsReturnType<Type> = {
  [Property in keyof Type]: Type[Property];
};

const isReactFragment = (variableToInspect: any) => {
  if (variableToInspect.type) {
    return variableToInspect.type === React.Fragment;
  }
  return variableToInspect === React.Fragment;
};

const logger = createLogger("getSlots");

const getSlots = <TSlots,>(
  children: ReactNode | ReactNode[],
  slotNames: any,
): GetSlotsReturnType<TSlots> => {
  logger.box(children);

  const childrenArray = React.Children.toArray(children);
  logger.log(childrenArray);

  const toSlots = childrenArray.reduce((acc, current) => {
    // logger.box("current", current);
    // ignoring direct string, number literal (every slot has to be wrapped in html element
    // and have data-slot="slot-name" prop, or be ReactComponent
    if (
      typeof current !== "number" &&
      typeof current !== "string" &&
      "type" in current
    ) {
      if (typeof current.type === "string") {
        return {
          ...acc,
          [`${current.props["data-slot"]}Slot`]: current,
        };
      }

      if (isReactFragment(current)) {
        return {
          ...acc,
          fragment: current,
        };
      }

      const slotNamesEntries = Object.entries(slotNames);

      const foundOne = slotNamesEntries.find(([key, component]) => {
        if (
          current.type === component ||
          (current.type as any)?._payload?.value === component ||
          (current.type as any)?._payload?.value[2] === key
        ) {
          return {
            ...acc,
            [key]: current,
          };
        }
      });

      return {
        ...acc,
        [`${(foundOne as any)[0]}Slot`]: current,
      };

      // if (
      //   current.type === slotNames.Blockuq ||
      //   current.type?._payload?.value === component ||
      //   current.type?._payload?.value[2] === key
      // ) {
      //   return {
      //     ...acc,
      //     [key]: current,
      //   };
      // }

      // if (typeof current.type === "function") {
      //   if (current.props["data-slot"]) {
      //     return {
      //       ...acc,
      //       [current.props["data-slot"]]: current,
      //     };
      //   }
      //   // ReactComponent, like ModalContent, ModalTrigger
      //   return {
      //     ...acc,
      //     // @ts-ignore
      //     [current.type.displayName]: current,
      //   };
      // } else if (isReactFragment(current)) {
      //   return {
      //     ...acc,
      //     fragment: current,
      //   };
      // } else {
      //   // ReactElement (span, div, h2, etc...)
      //   return {
      //     ...acc,
      //     [current.props["data-slot"]]: current.props.children,
      //   };
      // }
    }

    return acc;
  }, {});

  // @ts-ignore
  return toSlots;
};

export { getSlots };
