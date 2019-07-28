import { MOps, M } from "./monad";
import { f3, f4, f5 } from "./types";

export const forM = mapM;

export function replicateM<T>(ops: MOps, count: number, m: M<T>): M<T[]> {
    const next: (index: number) => M<T[]> = index => {
        if (index === count) {
            return ops.return_([]);
        } else {
            return ops.bind(m, x => ops.bind(next(index + 1), xs => ops.return_([x, ...xs])));
        }
    };
    return next(0);
}

export function when(ops: MOps, condition: boolean, m: M<void>): M<void> {
    return condition ? m : ops.return_(undefined);
}

export function liftM2<T1, T2, R>(ops: MOps, f: f3<T1, T2, R>, m1: M<T1>, m2: M<T2>) {
    return ops.bind(m1, v1 => ops.bind(m2, v2 => ops.return_(f(v1, v2))));
}
export function liftM3<T1, T2, T3, R>(ops: MOps, f: f4<T1, T2, T3, R>, m1: M<T1>, m2: M<T2>, m3: M<T3>): M<R> {
    return ops.bind(m1, v1 => ops.bind(m2, v2 => ops.bind(m3, v3 => ops.return_(f(v1, v2, v3)))));
}
export function liftM4<T1, T2, T3, T4, R>(ops: MOps, f: f5<T1, T2, T3, T4, R>, m1: M<T1>, m2: M<T2>, m3: M<T3>, m4: M<T4>): M<R> {
    return ops.bind(m1, v1 => ops.bind(m2, v2 => ops.bind(m3, v3 => ops.bind(m4, v4 => ops.return_(f(v1, v2, v3, v4))))));
}





// export function mapM<T, T2>(items: T[], f: (item: T) => Monad<T2>, ops: MonadOperations): Monad<T2[]> {
//   const next: (index: number) => Monad<T2[]> = index => {
//     if (index === items.length) {
//       return ops.return_([]);
//     } else {
//       return ops.bind(f(items[index]), x => ops.bind(next(index + 1), xs => ops.return_([x, ...xs])));
//     }
//   };
//   return next(0);
// }
// export function filterM<T>(items: T[], f: (item: T) => Monad<boolean>, ops: MonadOperations): Monad<T[]> {
//   const next: (index: number) => Monad<T[]> = index => {
//     if (index === items.length) {
//       return ops.return_([]);
//     } else {
//       return ops.bind(f(items[index]), x => ops.bind(next(index + 1), xs => ops.return_(x ? [items[index], ...xs] : xs)));
//     }
//   };
//   return next(0);
// }


export function mapM<T, T2>(ops: MOps, items: T[], f: (item: T) => M<T2>): M<T2[]> {
    return reduceM(ops, items, (prev, item) => ops.bind(f(item), x => ops.return_([...prev, x])), []);
}

export function filterM<T>(ops: MOps, items: T[], f: (item: T) => M<boolean>): M<T[]> {
    return reduceM(ops, items, (prev, item) => ops.bind(f(item), x => ops.return_(x ? [...prev, item] : prev)), []);
}

export function reduceM<T, TA>(ops: MOps, items: T[], f: (prev: TA, item: T) => M<TA>, seed: TA): M<TA> {
    const next: (index: number, acc: TA) => M<TA> = (index, acc) => {
        if (index === items.length) {
            return ops.return_(acc);
        } else {
            return ops.bind(f(acc, items[index]), x => next(index + 1, x));
        }
    };
    return next(0, seed);
}







