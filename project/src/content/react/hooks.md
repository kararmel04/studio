---
title: 'React Hooks Guide'
category: 'React'
tags: ['react', 'hooks', 'frontend']
---

# A Quick Guide to React Hooks

Hooks let you use state and other React features without writing a class.

## Basic Hooks

### `useState`

The `useState` hook is used to add state to functional components.

```javascript
import { useState } from 'react';

function Counter() {
  // Declares a new state variable called "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### `useEffect`

The `useEffect` hook lets you perform side effects in functional components. It's a close replacement for `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

```javascript
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  }, [count]); // Only re-run the effect if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Additional Hooks

-   `useContext`: Accepts a context object and returns the current context value.
-   `useReducer`: An alternative to `useState`. Accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a `dispatch` method.
-   `useCallback`: Returns a memoized callback.
-   `useMemo`: Returns a memoized value.
-   `useRef`: Returns a mutable ref object.
-   `useLayoutEffect`: Identical to `useEffect`, but it fires synchronously after all DOM mutations.
