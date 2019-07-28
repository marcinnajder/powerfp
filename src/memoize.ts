export function memoize<T extends Function>(f: T): T {
    const cache: { [args: string]: any } = {};
    return ((...args: any[]) => {
        const json = JSON.stringify(args);
        return cache[json] || (cache[json] = f(...args));
    }) as any;
}