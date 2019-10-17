// // copy of some operators from https://github.com/marcinnajder/powerseq to avoid unnecessary dependency


// export type predicate<T> = (item: T, index: number) => boolean;
// export interface OperatorRA<T, R> {
//     (source: T): R;
// }
// export interface OperatorR<T, R> extends OperatorRA<Iterable<T>, R> {}
// export interface Operator<T, R> extends OperatorR<T, Iterable<R>> { }
// export function isIterable<T>(iterable: Iterable<T> | T): iterable is Iterable<T> {
//     return typeof iterable !== "undefined" && typeof iterable[Symbol.iterator] !== "undefined";
// }
// /** in IE 11 arguments is not a iterable and this can't be polyfilled  */
// function argumentsToIterable(args: IArguments): Iterable<any> {
//     if (isIterable(args as any)) {
//         return args;
//     }
//     // code for IE 11
//     var iterable = [];
//     for (var _i = 0; _i < args.length; _i++) {
//         iterable[_i] = args[_i];
//     }
//     return iterable;
// }
// export function wrapInThunkAlways(args: IArguments, operator: Function): Operator<any, any> | OperatorR<any, any> {
//     return iterable => operator(iterable, ...argumentsToIterable(args));
// }
// export function wrapInThunk(args: IArguments, operator: Function): Operator<any, any> | OperatorR<any, any> | any | Iterable<any> {
//     if (isIterable(args[0])) {
//         return operator(...argumentsToIterable(args));
//     }
//     return wrapInThunkAlways(args, operator);
// }




// export function _find<T>(source: Iterable<T>, predicate?: predicate<T>, defaultValue?: T): T | undefined {
//     if (typeof predicate === "undefined") {
//         for (var item of source) {
//             return item;
//         }
//         return defaultValue;
//     }
//     else {
//         var index = 0;
//         for (var item of source) {
//             if (predicate(item, index++)) {
//                 return item;
//             }
//         }
//         return defaultValue;
//     }
// }
// export function find<T>(source: Iterable<T>, predicate?: predicate<T>): T | undefined;
// export function find<T>(source: Iterable<T>, predicate: predicate<T>, defaultValue: T): T;
// export function find<T>(predicate?: predicate<T>): OperatorR<T, T | undefined>;
// export function find<T>(predicate: predicate<T>, defaultValue: T): OperatorR<T, T>;
// export function find() {
//     return wrapInThunk(arguments, _find);
// }

