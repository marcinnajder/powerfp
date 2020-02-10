import { M, MOps } from "./monad";

export function do_<T extends M<unknown>>(ops: MOps, generator: any): T {
    const iterator = (generator as () => Iterator<M<unknown>>)();

    const next = (value: any): M<unknown> => {
        const iteratorResult = iterator.next(value);
        if (iteratorResult.done) {
            return (iteratorResult.value || ops.return_(undefined));
        } else {
            return ops.bind(iteratorResult.value, next);
        }
    };

    return next(undefined) as T;
}

export function do__<T extends M<unknown>>(ops: MOps, generator: any): T {
    function interateForValues(values: any[]) {
        const iterator = (generator as () => Iterator<M<unknown>>)();
        let iteratorResult: IteratorResult<M<unknown>> | undefined;

        for (const value of values) {
            iteratorResult = iterator.next(value);
            if (iteratorResult.done) {
                return iteratorResult;
            }
        }

        return iteratorResult!;
    }

    function createNext(values: any[]) {
        return (value: any): M<unknown> => {
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

