import { MutableRefObject, useEffect, useMemo, useRef } from 'react';

export class ComponentUnloadState {
  constructor(private readonly reference: MutableRefObject<boolean>) {}

  get isComponentUnloaded(): boolean {
    return this.reference.current;
  }
}

/**
 * `useUnloadState` will give you an object that you can use to track
 * if the current component has been unloaded or not. You can access
 * `unloadState.isComponentUnloaded` to perform this check.
 *
 * `UnloadState` is a wrapper on a `MutableRefObject<boolean>` (obtained via `React.useRef`),
 * so if you use it in another hook that requires a dependency array, be sure to add
 * the whole state object to the array, not the return value of `isComponentUnloaded`, like so:
 *
 * ```ts
 * const unloadState = useUnloadState();
 *
 * const myFunction = useCallback(
 *     () => {
 *         // a function where you somewhere access unloadState.isComponentUnloaded, maybe after doing something asynchronous
 *     },
 *     [unloadState] // be sure to add the whole object, not unloadState.isComponentUnloaded
 * );
 * ```
 */
export function useComponentUnloadState(): ComponentUnloadState {
  const reference = useRef(false);
  const unloadState = useMemo<ComponentUnloadState>(
    () => new ComponentUnloadState(reference),
    []
  );
  useEffect(() => {
    return () => {
      reference.current = true;
    };
  }, []);
  return unloadState;
}
