import { MOps, M } from "./monad";

export const forM = mapM;

export function replicateM<T>(count: number, m: M<T>, ops: MOps): M<T[]> {
    const next: (index: number) => M<T[]> = index => {
        if (index === count) {
            return ops.return_([]);
        } else {
            return ops.bind(m, x => ops.bind(next(index + 1), xs => ops.return_([x, ...xs])));
        }
    };
    return next(0);
}

export function when(condition: boolean, m: M<void>, ops: MOps): M<void> {
    return condition ? m : ops.return_(undefined);
}

export function liftM<T, T2>(f: (a: T) => T2, ops: MOps): (a: M<T>) => M<T2> {
    return m => ops.bind(m, v => ops.return_(f(v)));
}

export function liftM2<T1, T2, T3>(f: (a: T1, b: T2) => T3, ops: MOps): (a: M<T1>, b: M<T2>) => M<T3> {
    return (m1, m2) => ops.bind(m1, v1 => ops.bind(m2, v2 => ops.return_(f(v1, v2))));
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


export function mapM<T, T2>(items: T[], f: (item: T) => M<T2>, ops: MOps): M<T2[]> {
    return reduceM(items, (prev, item) => ops.bind(f(item), x => ops.return_([...prev, x])), [], ops);
}

export function filterM<T>(items: T[], f: (item: T) => M<boolean>, ops: MOps): M<T[]> {
    return reduceM(items, (prev, item) => ops.bind(f(item), x => ops.return_(x ? [...prev, item] : prev)), [], ops);
}

export function reduceM<T, TA>(items: T[], f: (prev: TA, item: T) => M<TA>, seed: TA, ops: MOps): M<TA> {
    const next: (index: number, acc: TA) => M<TA> = (index, acc) => {
        if (index === items.length) {
            return ops.return_(acc);
        } else {
            return ops.bind(f(acc, items[index]), x => next(index + 1, x));
        }
    };
    return next(0, seed);
}


// // Options
// export function mapO<T, T2>(items: T[], f: (item: T) => Option<T2>): Option<T2[]> {
//     return mapM(items, f, optionMonadOps) as Option<T2[]>;
// }
// export function filterO<T>(items: T[], f: (item: T) => Option<boolean>): Option<T[]> {
//     return filterM(items, f, optionMonadOps) as Option<T[]>;
// }
// export function reduceO<T, TA>(items: T[], f: (prev: TA, item: T) => Option<TA>, seed: TA): Option<TA> {
//     return reduceM(items, f, seed, optionMonadOps) as Option<TA>;
// }

// // ResultS
// export function mapRS<T, T2>(items: T[], f: (item: T) => ResultS<T2>): ResultS<T2[]> {
//     return mapM(items, f, resultMonadOps) as ResultS<T2[]>;
// }
// export function filterRS<T>(items: T[], f: (item: T) => ResultS<boolean>): ResultS<T[]> {
//     return filterM(items, f, resultMonadOps) as ResultS<T[]>;
// }
// export function reduceRS<T, TA>(items: T[], f: (prev: TA, item: T) => ResultS<TA>, seed: TA): ResultS<TA> {
//     return reduceM(items, f, seed, resultMonadOps) as ResultS<TA>;
// }
// export function liftRS<T, T2>(f: (a: T) => T2): (a: ResultS<T>) => ResultS<T2> {
//     return liftM(f, resultMonadOps) as any;
// }


