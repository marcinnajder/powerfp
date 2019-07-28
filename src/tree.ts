export { node, emptynode, Tree_node, Tree_emptynode } from "./adt.generated";

export type Tree<T> =
    | { type: "node"; value: T; left: Tree<T>, right: Tree<T> }
    | { type: "emptynode" };
