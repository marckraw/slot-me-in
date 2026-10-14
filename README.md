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

## Releasing

Releases are automated with [changesets](https://github.com/changesets/changesets).

1. In your PR, run `npx changeset`, pick the bump type (patch / minor / major) and describe the change. Commit the generated `.changeset/*.md` file.
2. When the PR is merged to `master`, the Release workflow opens (or updates) a **"chore: release"** PR that bumps the version and updates `CHANGELOG.md`.
3. Merging that release PR publishes the new version to npm and creates a GitHub release + tag.
