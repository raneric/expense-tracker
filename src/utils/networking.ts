export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () =>
          reject(
            new Error(
              `Timeout error, request can't exceed ${timeoutMs / 1000}s`
            )
          ),
        timeoutMs
      )
    ),
  ]);
}
