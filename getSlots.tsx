// @ts-ignore
import React, { isValidElement } from 'react';
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

const checkOnClient = (current, component) => current.type === component
const checkOnRSC = (current, component: React.ReactElement, componentName: string) => (current.type as any)?._payload?.value === component ||
    (current.type as any)?._payload?.value[2] === componentName

const getSlots = <TSlots,>(
  children: ReactNode | ReactNode[],
  slotNames: any,
): GetSlotsReturnType<TSlots> => {
  const childrenArray = React.Children.toArray(children);

  return childrenArray.reduce((acc, current) => {
    // ignoring direct string, number literal (every slot has to be wrapped in html element
    // and have data-slot="slot-name" prop, or be ReactComponent
    if (
      typeof current !== "number" &&
      typeof current !== "string" &&
        isValidElement(current)
    ) {
      /**
       * Example:
       * <div data-slot={'BlockquoteText'}>
       *      Grass blades swirl pure in the fermenting.
       *      Even the gate itself is a great cushion of the agreement.
       *      Lorem ipsum pain sit, they cultivated the elite.
       * </div>
       *
       * will return {BlockquoteTextSlot}
       * */
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

      /**
       * Here, we are looking for components by their displayName not data-slot prop.
       * displayName is a property that is set on the component itself, and it's a string.
       * It's quite tricky becasue it has to be handled differently on client and RSC side.
       * */
      const slotFound = Object.entries(slotNames).find(([componentName, component]) => {
        /**
         * This is a bit of a hack, but it works (uses internal react _payload, uhh...).
         * We check if the current element is a ReactComponent, and if it is, we check if it's the component we're looking for.
         * There are two ways to check if it's the component we're looking for:
         * - client-side components have a type property that is the component itself
         * - server-side components have a _payload property that contains the component, and the component is an array with the key as the third element
         *   which is the name of the component we are checking against
         *
         * Important to note about that is that this is something that can change in future of React so make sure to start
         * debugging from here if something breaks.
         * */
        return isValidElement(current) && (checkOnClient(current, component) || checkOnRSC(current, component, componentName))
      });

      logger.log("This is found slot: ")
      logger.log(slotFound)

      if(slotFound) {
        const  [componentName] = slotFound;

        return {
          ...acc,
          [`${componentName}Slot`]: current,
        };
      }

    }

    return acc;
  }, {});
};

export { getSlots };
