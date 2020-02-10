// import { UnionChoice } from "./types";

// type SumType<T> = T extends (...args: any) => any ? ReturnType<T> : T;

// export const none = { type: "none" } as const;
// export const some = <T>(value: T) => ({ type: "some", value } as const);

// export type Option_none = UnionChoice<Option<never>, "none">;
// export type Option_some<T> = UnionChoice<Option<T>, "some">;

// class O<T>{
//     arg: any;
//     some() {
//         return some<T>(this.arg);
//     }
// }

// type Option<T> = SumType<typeof none | O<T>["some"]>;

// var o: Option<string>;
// var o1 = none;
// var o2 = some("heh");


// // --

// export const ok = <T>(value: T) => ({ type: "ok", value }) as const;
// export const error = <E>(error: E) => ({ type: "error", error }) as const;
// class R<T, E>{
//     arg: any;
//     ok() {
//         return ok<T>(this.arg);
//     }
//     error(...args: Parameters<typeof error>) {
//         return error<E>(this.arg);
//     }
// }

// type Result<T, E> = SumType<R<T, E>["ok"] | R<T, E>["error"]>;


// var r: Result<number, string>;
// var r1 = ok(12);
// r = r1;
// r = error("heh");

// // export type List_cons<T> = UnionChoice<List<T>, "cons">;
// // export const cons = <T>(head: T, tail: List<T>) => ({ type: "cons", head, tail }) as List_cons<T>;
// // export type List_empty = UnionChoice<List<never>, "empty">;
// // export const empty = { type: "empty" } as List_empty;


// export const cons = <T>(head: T, tail: List<T>) => ({ type: "cons", head, tail }) as const;
// export const empty = { type: "empty" } as const;

// class L<T>{
//     private arg: any;
//     cons() {
//         return cons<T>(this.arg, this.arg);
//     }
// }

// type List<T> = SumType<typeof empty | L<T>["cons"]>;



// // nizej zawartosc przeklejona z ts playground


// // export type TypedObj<T = string> = { type: T };
// // export type UnionChoice<T extends TypedObj<string>, TT extends T["type"]> = Extract<T, { type: TT }>;

// // type SumType<T> = T extends (...args: any) => any ? ReturnType<T> : T;

// // export const none = { type: "none" } as const;
// // export const some = <T>(value: T) => ({ type: "some", value } as const);

// // export const ok = <T>(value: T) => ({ type: "ok", value }) as const;
// // export const error = <E>(error: E) => ({ type: "error", error }) as const;


// // // --- --- --- --- --- --- --- --- --- --- --- 

// // class O<T>{
// //     some() { return some<T>(null as any); }
// // }

// // type Option1<T> = SumType<typeof none | O<T>["some"]>;

// // let none1 = none;
// // let some1 = some("abc");


// // class R<T, E>{
// //     ok() {
// //         return ok<T>(null as any);
// //     }
// //     error() {
// //         return error<E>(null as any);
// //     }
// // }

// // type Result<T, E> = SumType<R<T, E>["ok"] | R<T, E>["error"]>;

// // var ok1: Result<number, string> = ok(123);
// // var error1: Result<number, string> = error("abc");


// // export type Result_ok<T> = UnionChoice<Result<T, never>, "ok">;
// // export type Result_error<E> = UnionChoice<Result<never, E>, "error">;



// // // --- --- --- --- --- --- --- --- --- --- --- 


// // export type ChangedPropTypes<T> = {
// //     [P in keyof T]?: T[P] extends object ? ChangedPropTypes<T[P]> : any;
// // }

// // type Merge<T1, T2 extends ChangedPropTypes<T1>> = {
// //     [P in keyof T1]: T1[P] extends object ?
// //         (T2[P] extends object ? Merge<T1[P], T2[P]> : T1[P])
// //         : (P extends keyof T2 ? T2[P] : T1[P])
// // }

// // type Merge2<T1, T2 extends ChangedPropTypes<T1>> = T1 & T2;


// // type MergeTest = Merge<
// //     { name: unknown; age: number, address: { city: unknown, street: string; } },
// //     { name: number; address: { city: boolean } }
// //     >;

// // var aa: MergeTest;


// // type Option2<T> = SumType<typeof none> | Merge<ReturnType<typeof some>, { value: T}>;
// // // type Option2<T> = SumType<typeof none> | (ReturnType<typeof some> & { value: T});

// // let oo = some("") as Option2<string>;
// // switch (oo.type){
// //     case "none": {
// //         oo
// //         break;
// //     }
// //     case "some": {
// //         oo.value
// //     }
// // }


// // // --- --- --- --- --- --- --- --- --- --- --- 

// // interface GenFunc<T, R> {
// //     <T>(...args: any[]): R;
// // }
// // type Bla<F, T> = F extends GenFunc<infer Z, infer R> ? [Z,R] : never;


// // // type Hej<T> = T extends <infer>(...args: any[]) => string ? string: number;



// // // var aaa1: GenFunc<string, {value: boolean}> = some;
// // // aaa1()


// // var aaa: Bla<typeof some, number>;
