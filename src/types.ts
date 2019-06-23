// functions
export type f1<R> = () => R;
export type f2<T1, R> = (a1: T1) => R;
export type f3<T1, T2, R> = (a1: T1, a2: T2) => R;
export type f4<T1, T2, T3, R> = (a1: T1, a2: T2, a3: T3) => R;

export type f<T1, R> = f2<T1, R>;


// curried functions
export type cf2<T1, R> = {
    (arg1: T1): R;
    (): cf2<T1, R>;
}
export type cf3<T1, T2, R> = {
    (arg1: T1, arg2: T2): R;
    (arg1: T1): cf2<T2, R>;
    (): cf3<T1, T2, R>;
}
export type cf4<T1, T2, T3, R> = {
    (arg1: T1, arg2: T2, arg3: T3): R;
    (arg1: T1, arg2: T2): cf2<T3, R>;
    (arg1: T1): cf3<T2, T3, R>;
    (): cf4<T1, T2, T3, R>;
}