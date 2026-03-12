declare module 'lodash/debounce' {
  type DebouncedFunction<T extends (...args: never[]) => void> = ((
    ...args: Parameters<T>
  ) => void) & {
    cancel: () => void
    flush: () => void
  }

  export default function debounce<T extends (...args: never[]) => void>(
    func: T,
    wait?: number,
  ): DebouncedFunction<T>
}
