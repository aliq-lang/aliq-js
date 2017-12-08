export interface Const<T> {
    readonly type: "const"
    readonly value: T
}

export interface ExternalInput<T> {
    readonly type: "externalInput"
}

export interface FlatMap<T, I> {
    readonly type: "flatMap"
    readonly input: Bag<I>
    readonly func: (i: I) => Iterable<T>
}

export interface GroupBy<T> {
    readonly type: "groupBy"
    readonly input: Bag<T>
    readonly getKey: (v: T) => string
    readonly reduce: (a: T, b: T) => T
}

export interface Product<T, A, B> {
    readonly type: "product"
    readonly inputA: Bag<A>
    readonly inputB: Bag<B>
    readonly func: (a: A, b: B) => Iterable<T>
}

export interface Merge<T> {
    readonly type: "merge"
    readonly inputs: Bag<T>[]
}

export type Bag<T>
    = Const<T>
    | ExternalInput<T>
    | FlatMap<T, any>
    | GroupBy<T>
    | Product<T, any, any>
    | Merge<T>

export function const_<T>(value: T) : Const<T> {
    return {
        type: "const",
        value: value,
    }
}

export function externalInput<T>() : ExternalInput<T> {
    return { type: "externalInput" }
}

export function flatMap<T, I>(input: Bag<I>, func: (v: I) => Iterable<T>) : FlatMap<T, I> {
    return {
        type: "flatMap",
        input: input,
        func: func,
    }
}

export function groupBy<T>(input: Bag<T>, getKey: (v: T) => string, reduce: (a: T, b: T) => T)
    : GroupBy<T> {
    return {
        type: "groupBy",
        input: input,
        getKey: getKey,
        reduce: reduce,
    }
}

export function product<T, A, B>(inputA: Bag<A>, inputB: Bag<B>, func: (a: A, b: B) => Iterable<T>)
    : Product<T, A, B> {
    return {
        type: "product",
        inputA: inputA,
        inputB: inputB,
        func: func,
    }
}

export function merge<T>(input: Bag<T>[]) : Merge<T> {
    return {
        type: "merge",
        inputs: input
    }
}