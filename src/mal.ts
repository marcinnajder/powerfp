import { ResultS } from "./resultS";

export type ListType = "list" | "vector" | "hash-map";
export type MalFuncType = (args: MalType[]) => ResultS<MalType>;

export type MalType =
    | { type: "nil" }
    | { type: "true_" }
    | { type: "false_" }

    | { type: "number_", value: number }
    | { type: "symbol", name: string }
    | { type: "keyword", name: string }

    | { type: "quote", mal: MalType }
    | { type: "quasiquote", mal: MalType }
    | { type: "unquote", mal: MalType }
    | { type: "splice_unquote", mal: MalType }

    | { type: "fn", fn: MalFuncType }
    | { type: "list", items: MalType[], listType: ListType }
    ;