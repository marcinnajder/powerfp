/** code generator for Functors and Monads  */

export interface Options {
    name: string;
    typeName: string;
    fileName: string;
    importedTypeName?: string;
    generateTypesImport?: boolean;
    genArgs?: string;
    doPostfix?: string;
}

export function generateFpCode(options: Options) {
    options.importedTypeName = options.importedTypeName || "";
    options.genArgs = options.genArgs || "";
    options.doPostfix = options.doPostfix || "";

    let content = `// ** this code was generated automatically **`;

    if (options.generateTypesImport) {
        content += `
import { f, f3, f4, f5 } from "./types";
import { MOps } from "./monad";
import { FOps, F } from "./functor";
import { AOps, liftA2, liftA3, liftA4 } from "./applicative";
import { mapM, filterM, reduceM, liftM2, liftM3, liftM4} from "./monadicFunctions";
import { callApply, callMap, callBind } from "./utils";
import { do_, do__ } from "./do";
`;
    }

    content += `
import ${options.name}, { ${options.importedTypeName}} from "./${options.fileName}";
const { return_: ${options.name}__return_, map: ${options.name}__map, bind: ${options.name}__bind, apply:${options.name}__apply } = ${options.name};

// functor, monad, applicative functor
export const ${options.name}FunctorOps: FOps = { map: ${options.name}__map };
export const ${options.name}MonadOps: MOps = { return_: ${options.name}__return_, bind: ${options.name}__bind };
export const ${options.name}ApplicativeOps: AOps = { map: ${options.name}__map, return_: ${options.name}__return_, apply: ${options.name}__apply };


// return, map, bind, apply
export function ${options.name}Return<T${options.genArgs}>(value: T): ${options.typeName}<T${options.genArgs}> {
    return ${options.name}__return_(value);
}
export function ${options.name}Map<T, R${options.genArgs}>(f: f<T, R>): f<${options.typeName}<T${options.genArgs}>, ${options.typeName}<R${options.genArgs}>>;
export function ${options.name}Map<T, R${options.genArgs}>(m: ${options.typeName}<T${options.genArgs}>, f: f<T, R>): ${options.typeName}<R${options.genArgs}>;
export function ${options.name}Map(mf: any, f?: any): any {
    return callMap(${options.name}__map, mf, f);
}
export function ${options.name}Bind<T, R${options.genArgs}>(f: f<T, ${options.typeName}<R${options.genArgs}>>): f<${options.typeName}<T${options.genArgs}>, ${options.typeName}<R${options.genArgs}>>;
export function ${options.name}Bind<T, R${options.genArgs}>(m: ${options.typeName}<T${options.genArgs}>, f: f<T, ${options.typeName}<R${options.genArgs}>>): ${options.typeName}<R${options.genArgs}>;
export function ${options.name}Bind(mf: any, f?: any): any {
    return callBind(${options.name}__bind, mf, f);
}
export function ${options.name}Apply<T, R${options.genArgs}>(f: ${options.typeName}<f<T, R>${options.genArgs}>, m: ${options.typeName}<T${options.genArgs}>): ${options.typeName}<R${options.genArgs}>;
export function ${options.name}Apply<T, R${options.genArgs}>(f: ${options.typeName}<f<T, R>${options.genArgs}>): f<${options.typeName}<T${options.genArgs}>, ${options.typeName}<R${options.genArgs}>>;
export function ${options.name}Apply(f: any, m?: any): any {
    return callApply(${options.name}__apply, f, m);
}

// monadic functions
export function ${options.name}MapM<T, R${options.genArgs}>(items: T[], f: (item: T) => ${options.typeName}<R${options.genArgs}>): ${options.typeName}<R[]${options.genArgs}> {
    return mapM(${options.name}MonadOps, items, f) as ${options.typeName}<R[]${options.genArgs}>;
}
export function ${options.name}FilterM<T${options.genArgs}>(items: T[], f: (item: T) => ${options.typeName}<boolean${options.genArgs}>): ${options.typeName}<T[]${options.genArgs}> {
    return filterM(${options.name}MonadOps, items, f) as ${options.typeName}<T[]${options.genArgs}>;
}
export function ${options.name}ReduceM<T, A${options.genArgs}>(items: T[], f: (prev: A, item: T) => ${options.typeName}<A${options.genArgs}>, seed: A): ${options.typeName}<A${options.genArgs}> {
    return reduceM(${options.name}MonadOps, items, f, seed) as ${options.typeName}<A${options.genArgs}>;
}

export function ${options.name}LiftM2<T1, T2, R${options.genArgs}>(f: f3<T1, T2, R>, m1: ${options.typeName}<T1${options.genArgs}>, m2: ${options.typeName}<T2${options.genArgs}>): ${options.typeName}<R${options.genArgs}> {
    return liftM2(${options.name}MonadOps, f, m1, m2) as ${options.typeName}<R${options.genArgs}>;
}
export function ${options.name}LiftM3<T1, T2, T3, R${options.genArgs}>(f: f4<T1, T2, T3, R>, m1: ${options.typeName}<T1${options.genArgs}>, m2: ${options.typeName}<T2${options.genArgs}>, m3: ${options.typeName}<T3${options.genArgs}>): ${options.typeName}<R${options.genArgs}> {
    return liftM3(${options.name}MonadOps, f, m1, m2, m3) as ${options.typeName}<R${options.genArgs}>;
}
export function ${options.name}LiftM4<T1, T2, T3, T4, R${options.genArgs}>(f: f5<T1, T2, T3, T4, R>, m1: ${options.typeName}<T1${options.genArgs}>, m2: ${options.typeName}<T2${options.genArgs}>, m3: ${options.typeName}<T3${options.genArgs}>, m4: ${options.typeName}<T4${options.genArgs}>): ${options.typeName}<R${options.genArgs}> {
    return liftM4(${options.name}MonadOps, f, m1, m2, m3, m4) as ${options.typeName}<R${options.genArgs}>;
}

// applicative functions
export function ${options.name}LiftA2<T1, T2, R${options.genArgs}>(f: f3<T1, T2, R>, m1: ${options.typeName}<T1${options.genArgs}>, m2: ${options.typeName}<T2${options.genArgs}>): ${options.typeName}<R${options.genArgs}> {
    return liftA2(${options.name}ApplicativeOps, f, m1, m2) as ${options.typeName}<R${options.genArgs}>;
}
export function ${options.name}LiftA3<T1, T2, T3, R${options.genArgs}>(f: f4<T1, T2, T3, R>, m1: ${options.typeName}<T1${options.genArgs}>, m2: ${options.typeName}<T2${options.genArgs}>, m3: ${options.typeName}<T3${options.genArgs}>): ${options.typeName}<R${options.genArgs}> {
    return liftA3(${options.name}ApplicativeOps, f, m1, m2, m3) as ${options.typeName}<R${options.genArgs}>;
}
export function ${options.name}LiftA4<T1, T2, T3, T4, R${options.genArgs}>(f: f5<T1, T2, T3, T4, R>, m1: ${options.typeName}<T1${options.genArgs}>, m2: ${options.typeName}<T2${options.genArgs}>, m3: ${options.typeName}<T3${options.genArgs}>, m4: ${options.typeName}<T4${options.genArgs}>): ${options.typeName}<R${options.genArgs}> {
    return liftA4(${options.name}ApplicativeOps, f, m1, m2, m3, m4) as ${options.typeName}<R${options.genArgs}>;
}

export function ${options.name}Do<T${options.genArgs}>(generator: any): ${options.typeName}<T${options.genArgs}> {
    return do_${options.doPostfix}(${options.name}MonadOps, generator);
}
`;

    return content;
}


// const generators = [generateFpCode];
// export function generateInsideFiles(filePath: string) {
//     try {
//         const content = readFileSync(filePath, "utf8");
//         const lines = content.split(EOL);
//         const result: string[] = [];

//         let isInsideGenerator = false;
//         let generatorLine = "";

//         for (const line of lines) {
//             if (line.startsWith("//generator")) {
//                 if (!isInsideGenerator) {           // starting generator section                    
//                     generatorLine = line;
//                 } else {                            // finishing generator section
//                     const [_, generatorName, generatorArgs] = generatorLine.split(" ");
//                     const generatorFunction = generators.find(genarator => genarator.name === generatorName);

//                     if (!generatorFunction) {
//                         console.warn(`There is no generator called '${generatorName}'`);
//                     }
//                     else {
//                         const generatedContent = generatorFunction(JSON.parse(generatorArgs));
//                         console.log(`Generator '${generatorName}' processing ... `);
//                         console.log(generatedContent);
//                         result.push(generatedContent);
//                     }

//                     generatorLine = "";
//                 }
//                 isInsideGenerator = !isInsideGenerator;
//             } else {
//                 if (isInsideGenerator) continue;
//             }

//             result.push(line);
//         }

//         writeFileSync(filePath, result.join(EOL));
//         console.log(`File '${filePath}' has been processed ... `);
//     } catch (err) {
//         console.error(`Error while processing '${filePath}' file: `, err);
//         throw err;
//     }
// }
