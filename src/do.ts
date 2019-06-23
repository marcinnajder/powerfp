import { M, MOps } from "./monad";

export function do_<T extends M>(generator: () => Iterator<M>, ops: MOps): T {
    const iterator = generator();

    const next = (value: any): M => {
        const iteratorResult = iterator.next(value);
        if (iteratorResult.done) {
            return (iteratorResult.value || ops.return_(undefined));
        } else {
            return ops.bind(iteratorResult.value, next);
        }
    };

    return next(undefined) as T;
}

export function do__<T extends M>(generator: () => Iterator<M>, ops: MOps): T {
    function interateForValues(values: any[]) {
        const iterator = generator();
        let iteratorResult: IteratorResult<M> | undefined;

        for (const value of values) {
            iteratorResult = iterator.next(value);
            if (iteratorResult.done) {
                return iteratorResult;
            }
        }

        return iteratorResult!;
    }

    function createNext(values: any[]) {
        return (value: any): M => {
            const nextValues = [...values, value];
            const iteratorResult = interateForValues(nextValues);

            if (iteratorResult.done) {
                return (iteratorResult.value || ops.return_(undefined));
            } else {
                return ops.bind(iteratorResult.value, createNext(nextValues));
            }
        };
    }

    return createNext([])(undefined) as T;
}

