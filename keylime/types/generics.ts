type IfEquals<T, U, Y = true, N = false> =
    (<G>() => G extends T ? 1 : 2) extends
    (<G>() => G extends U ? 1 : 2) ? Y : N;

export type ExtractMutable<T> = {
    [Prop in keyof T]:
    /**
     * Example:
     * IfEquals<{readonly a: string}, Record<'a',string> -> returns false
     */
    IfEquals<Pick<T, Prop>, Record<Prop, T[Prop]>> extends false
    ? never
    : Prop
}[keyof T]
