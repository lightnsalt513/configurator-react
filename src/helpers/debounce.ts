export function debounce(func: () => any, delay: number): () => void {
  let inDebounce: ReturnType<typeof setTimeout>;
  return function (this: typeof debounce, ...args) {
    const context = this;
    const newArgs = args;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, newArgs), delay);
  };
}
