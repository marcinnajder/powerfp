
### Installation 
```
npm install powerfp
```

### Features

- implementation of useful algebraic data types: `Option, Result, ResultS, Tree, List`
- utility functions used for function composition: `compose, pipe, curry`
- infrastructure for the implementation of functors, monads and applicative functors in TypeScript
- functors, monads and applicative functors implementation for algebraic data type (`Option, Result, ResultS, Tree, List`) and other commonly used types (`Array, Promise, Iterable, Observable, IO`)
- `do` Haskell notation using ES6 generators 
- code generators for algebraic data types and functors, monads and applicative functors
- utility functions like `memoize` and functions extracted from types like string, Regex (useful with function composition) 
- `SumType` type inferring ADT type from the constructor functions
- `matchValue` predicate function matching single value against specified pattern (primitive values, object, array)
- `match` function providing "pattern matching" functionality
- `toOption` converting value of type `T|null|undefined` into `Option<T>`

### Sample code

```typescript
import { Option, none, some } from "powerfp";

function tryParseNumber(text: string): Option<number> {
  const n = Number(text);
  return Number.isNaN(n) ? none : some(n);
}


// ** powerfp**
type Option<T> =        
  | { type: "some", value: T }
  | { type: "none" };   
```

```typescript
import { matchUnion, isUnion } from "powerfp";

function format(n: Option<number>) : string{
    return matchUnion(n, {
        some: ({ value }) => `${Math.round(value)} zl`,
        none: () => "0 zl"        
    });
}

const o: Option<number> = ...;
console.log(isUnion(o, "some") ? o.value : "");
```


more detailed documentation coming soon ..