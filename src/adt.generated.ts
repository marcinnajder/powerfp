// ** this code was generated automatically **
import { UnionChoice } from "./types";
import { Option } from "./option";


export type Option_some<T> = UnionChoice<Option<T>, "some">;
export const some = <T>(value: T) => ({ type: "some", value }) as Option_some<T>;
export type Option_none = UnionChoice<Option<never>, "none">;
export const none = { type: "none" } as Option_none;

// ** this code was generated automatically **

import { Result } from "./result";


export type Result_ok<T> = UnionChoice<Result<T, never>, "ok">;
export const ok = <T>(value: T) => ({ type: "ok", value }) as Result_ok<T>;
export type Result_error<E> = UnionChoice<Result<never, E>, "error">;
export const error = <E>(err: E) => ({ type: "error", err }) as Result_error<E>;

// ** this code was generated automatically **

import { List } from "./list";


export type List_cons<T> = UnionChoice<List<T>, "cons">;
export const cons = <T>(head: T, tail: List<T>) => ({ type: "cons", head, tail }) as List_cons<T>;
export type List_empty = UnionChoice<List<never>, "empty">;
export const empty = { type: "empty" } as List_empty;

// ** this code was generated automatically **

import { Tree } from "./tree";


export type Tree_node<T> = UnionChoice<Tree<T>, "node">;
export const node = <T>(value: T, left: Tree<T>, right: Tree<T>) => ({ type: "node", value, left, right }) as Tree_node<T>;
export type Tree_emptynode = UnionChoice<Tree<never>, "emptynode">;
export const emptynode = { type: "emptynode" } as Tree_emptynode;
