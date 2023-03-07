export function exclude<T, Key extends keyof T>(row: T, ...keys: Key[]): Omit<T, Key> {
  for (let key of keys) {
    delete row[key]
  }
  return row
}
