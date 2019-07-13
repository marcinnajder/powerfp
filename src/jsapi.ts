import { curry } from "./curry";
import { f, f3 } from "./types";

// misc
export const add = curry((a: number, b: number) => a + b);


// string
export const stringToLowerCase = (str: string) => str.toLowerCase();
export const stringToUpperCase = (str: string) => str.toUpperCase();
export const stringIndexOf = curry((substr: string, str: string) => str.indexOf(substr));
export const stringSplit = curry((separator: string, str: string) => str.split(separator));
export const stringConcat = curry((s: string, str: string) => str.concat(s));
export const stringJoin = curry((separator: string, strs: string[]) => strs.join(separator));
export const stringReplace = curry((regex: RegExp, rpl: string, str: string) => str.replace(regex, rpl));

// regex
const regexTest = curry((s: string, regex: RegExp) => regex.test(s));

const arrayMap = <T, R>(f: f<T, R>, items: T[]): R[] => items.map(f);
const arrayFilter = <T>(f: f<T, boolean>, items: T[]): T[] => items.filter(f);
const arrayReduce = <T, A>(f: f3<A, T, A>, init: A, items: T[]): A => items.reduce(f, init);
export const arrayReverse = <T>(items: T[]): T[] => items.reverse();

export const arrayMapF = <T, R>() => curry<f<T, R>, T[], R[]>(arrayMap);
export const arrayFilterF = <T>() => curry<f<T, boolean>, T[], T[]>(arrayFilter);
export const arrayReduceF = <T, A>() => curry<f3<A, T, A>, A, T[], A>(arrayReduce);
// export const arrayReverseF = <T>() => curry<T[], T[]>(arrayReverse);


// current problems with curry function and generic functions:
// - using curried generic function is very inconvenient (additional factory function call + type inference is not working)
// - type inference for pipe+curry functions does not work (next expression inside pipe is not inferred correctly)

// https://mostly-adequate.gitbooks.io/mostly-adequate-guide/appendix_c.html#concat
// missing function:
// - append
// - prop, safeProp
// - generic -> eq,  flip
// - array -> filter,forEach,head, last, map, reduce, safeHead, safeLast, sortBy, take
// - monad -> chain, join, sequence, traverse, unsafePerformIO


// const prop3 = <S extends string>(name: S) => <O extends Record<S, any>>(o: O): O[S] => {
//     return o[name];
// }
// todo: prop3Safe

// almost correct but property type is not inferred correctly
// const prop = <T>(name: keyof T) => (obj:T) => obj[name];

// T is inferred as never :( 
// const prop2 = <P extends keyof T, T>(name: P) => (obj:T) : T[P] => obj[name];