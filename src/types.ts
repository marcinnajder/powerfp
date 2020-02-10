// f - functions
export type f1<R> = () => R;
export type f2<T1, R> = (a1: T1) => R;
export type f3<T1, T2, R> = (a1: T1, a2: T2) => R;
export type f4<T1, T2, T3, R> = (a1: T1, a2: T2, a3: T3) => R;
export type f5<T1, T2, T3, T4, R> = (a1: T1, a2: T2, a3: T3, a4: T4) => R;

export type f<T1, R> = f2<T1, R>;


// cf - curried functions (also supporting partial function application)
export type cf2<T1, R> = {
    (): cf2<T1, R>;
    (arg1: T1): R;
}
export type cf3<T1, T2, R> = {
    (): cf3<T1, T2, R>;
    (arg1: T1): cf2<T2, R>;
    (arg1: T1, arg2: T2): R;
}
export type cf4<T1, T2, T3, R> = {
    (): cf4<T1, T2, T3, R>;
    (arg1: T1): cf3<T2, T3, R>;
    (arg1: T1, arg2: T2): cf2<T3, R>;
    (arg1: T1, arg2: T2, arg3: T3): R;
}
export type cf5<T1, T2, T3, T4, R> = {
    (): cf5<T1, T2, T3, T4, R>;
    (arg1: T1): cf4<T2, T3, T4, R>;
    (arg1: T1, arg2: T2): cf3<T3, T4, R>;
    (arg1: T1, arg2: T2, arg3: T3): cf2<T4, R>;
    (arg1: T1, arg2: T2, arg3: T3, arg4: T4): R;
}

// ocf - only curried functions 
export type ocf2<T1, R> = f<T1, R>;
export type ocf3<T1, T2, R> = f<T1, f<T2, R>>;
export type ocf4<T1, T2, T3, R> = f<T1, ocf3<T2, T3, R>>;
export type ocf5<T1, T2, T3, T4, R> = f<T1, ocf4<T2, T3, T4, R>>;


// union types
export type TypedObj<T = string> = { type: T };
export type UnionChoice<T extends TypedObj<string>, TT extends T["type"]> = Extract<T, { type: TT }>;

export type ValueOrFunc<T, R> =
    | R
    | ((value: T) => R);

export type ExhaustiveMatchTypedObj<T extends TypedObj<string>, R> = {
    [P in T["type"]]: ValueOrFunc<Extract<T, { type: P }>, R>;
}

export type MatchTypedObj<T extends TypedObj<string>, R> =
    | ExhaustiveMatchTypedObj<T, R>
    | (Partial<ExhaustiveMatchTypedObj<T, R>> & { _: R | ((union: T) => R) });

export type SumType<T> = T extends (...args: any) => any ? ReturnType<T> : T;