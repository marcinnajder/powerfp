
<a name="0.0.2"></a>
# [0.0.2](https://github.com/marcinnajder/powerfp/releases/tag/0.0.2) (2020-02-10)

* `SumType` type inferring ADT type from the constructor functions
* `matchValue` predicate function matching single value against specified pattern (primitive values, object, array)
* `match` function providing "pattern matching" functionality
* `toOption` converting value of type `T|null|undefined` into `Option<T>`
* upgrading TypeScript to version`^3.6.3` (from version `^3.5.2`)
* change `Error` type `error` case from from `{type:"error": error: R}` to `{type:"error": err: R}` 

<a name="0.0.1"></a>
# [0.0.1](https://github.com/marcinnajder/powerfp/releases/tag/0.0.1) (2019-11-11)

* implementation of useful algebraic data types: `Option, Result, ResultS, Tree, List`
* utility functions used for function composition: `compose, pipe, curry`
* infrastructure for the implementation of functors, monads and applicative functors
* functors, monads and applicative functors implementation for algebraic data type (`Option, Result, ResultS, Tree, List`) and other frequently used types (`Array, Promise, Iterable, Observable, IO`)
* `do` Haskell notation using ES6 generators 
* code generators for algebraic data types and functors, monads and applicative functors
* utility functions like memoize and functions extracted from types like string, Regex (useful with function composition) 


