# getSlots
Kinda vue-like getSlots function, (usually) works

```js
import {FirstComponent, SecondComponent, ThirdComponent} from './components';
import { getSlots } from 'slot-me-in';

type Slots = {
  FirstComponentSlot: ReactElement<typeof FirstComponent>;
  SecondComponentSlot: ReactElement<typeof SecondComponent>;
  ThirdComponentSlot: ReactElement<typeof ThirdComponent>;
};

/**
 *
 * Example component
 *
 */
const Example= () => {
  const { FirstComponentSlot, SecondComponentSlot } = useSlots<Slots>(children, {FirstComponent, SecondComponent, ThirdComponent});

  return (
    <SomeWrapperComponent>
      <h2>{FirstComponentSlot}</h2>
      <div>
        <h2>Some other stuff</h2>
        <p>Oh come oooooon</p>
      </div>
      {SecondComponentSlot}
      <Dialog.Portal>
        <Dialog.Overlay>
          {ThirdComponent}
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
```


```js
const Wrapper = () => {
  return (
    <Example>
      <FirstComponent />
      <div data-slot="SecondComponent">
        Some stuff in slot2
      </div>
      <p data-slot="ThirdComponent">Some text in slot 1</p>
    </Example>
  )
}
```

This is purely for my internal needs, but if you find it useful, feel free to use it. It's not perfect, but it kinda (usually) works.
