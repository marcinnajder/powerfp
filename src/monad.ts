export interface M<T = {}> { }

export interface MOps {
    return_<T>(value: T): M<T>;
    bind<T1, T2>(m: M<T1>, f: (value: T1) => M<T2>): M<T2>;
}


export const promiseMonadOps: MOps = {
    return_<T>(value: T): Promise<T> {
        return Promise.resolve(value);
    },
    bind<T1, T2>(m: Promise<T1>, f: (value: T1) => Promise<T2>): Promise<T2> {
        return m.then(f);
    }
};

export const arrayMonadOps: MOps = {
    return_<T>(value: T): Array<T> {
        return [value];
    },
    bind<T1, T2>(m: Array<T1>, f: (value: T1) => Array<T2>): Array<T2> {
        return flatmap(m, f);
    }
};


function flatmap<T, T2>(m: Array<T>, f: (item: T) => T2[]): T2[] {
    return m.map(f).reduce((p, c) => p.concat(c), []);
}


// Array.prototype.flatmap = function <T, T2>(this: Array<T>, f: (item: T) => T2[]): T2[] {
//     return this.map(f).reduce((p, c) => p.concat(c), []);
// };

export const iterableMonadOps: MOps = {
    return_<T>(value: T): Iterable<T> {
        return (function* () {
            yield value;
        })();
    },
    bind<T1, T2>(m: Iterable<T1>, f: (value: T1) => Iterable<T2>): Iterable<T2> {
        return flatmapI(m, f);
    }
};


function* flatmapI<T1, T2>(m: Iterable<T1>, f: (value: T1) => Iterable<T2>): Iterable<T2> {
    for (const item of m) {
        yield* f(item);
    }
}



