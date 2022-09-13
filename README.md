# useSlots
Kinda vue-like useSlots function, quite handicapped must say but (usually) works

```js
type Slots = {
  ComponentContent: FC<any>;
  Slot1: any;
  Slot2: any;
}

/**
 *
 * Example component
 *
 */
const Example= () => {
  const { ComponentContent, Slot1, Slot2 } = useSlots<Slots>(children);
  // const { ComponentContent, Slot1, Slot2 } = useSlots<any>(children);

  return (
    <SomeWrapperComponent>
      <h2>{Slot2}</h2>
      <div>
        <h2>Some other stuff</h2>
        <p>Oh come oooooon</p>
      </div>
      {Slot1}
      <Dialog.Portal>
        <Dialog.Overlay>
          {ComponentContent}
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
      <ComponentContent />
      <div data-slot="Slot2">
        Some stuff in slot2
      </div>
      <p data-slot="Slot1">Some text in slot 1</p>
    </Example>
  )
}
```

This is purely for my internal needs
