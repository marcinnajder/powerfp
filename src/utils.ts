export function callMap(map: any, mf: any, f?: any) {
    return f ? map(mf, f) : (m: any) => map(m, mf);
}
export function callBind(bind: any, mf: any, f?: any) {
    return f ? bind(mf, f) : (m: any) => bind(m, mf);
}
export function callApply(apply: any, f: any, m?: any) {
    return m ? apply(f, m) : (m: any) => apply(f, m);
}

export function extendObjWithFunctionResult<T extends Function>(extendObj: any, fun: T): T {
    return ((...args: any[]) => ({ ...extendObj, ...fun(...args) })) as any as T;
}
