export interface Functor<T = {}> { }

export interface FunctorOperations {
    map<T1, T2>(m: Functor<T1>, f: (value: T1) => T2): Functor<T2>;
}

export const promiseFunctorOps: FunctorOperations = {
    map<T1, T2>(m: Promise<T1>, f: (value: T1) => T2): Promise<T2> {
        return m.then(f);
    }
};

export const arrayFunctorOps: FunctorOperations = {
    map<T1, T2>(m: Array<T1>, f: (value: T1) => T2): Array<T2> {
        return m.map(f);
    }
};


export const iterableFunctorOps: FunctorOperations = {
    map<T1, T2>(m: Iterable<T1>, f: (value: T1) => T2): Iterable<T2> {
        return mapI(m, f);
    }
};


function* mapI<T1, T2>(m: Iterable<T1>, f: (value: T1) => T2): Iterable<T2> {
    for (const item of m) {
        yield f(item);
    }
}