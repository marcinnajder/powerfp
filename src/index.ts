export * from "./types";
export * from "./monad";
export * from "./functor";
export * from "./monadicFunctions";
export * from "./do";
export * from "./curry";
export * from "./pipe";
export * from "./monadicFunctions";
export { Result, ResultS, ok, error, map as resultMap, bind as resultBind, resultMonadOps, resultFunctorOps } from "./result";
export { Option, none, some, map as optionMap, bind as optionBind, optionMonadOps, optionFunctorOps } from "./option";

