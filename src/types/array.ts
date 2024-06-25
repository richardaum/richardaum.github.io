export type DeepRequired<T> = {
  [P in keyof T]-?: DeepRequired<NonNullable<T[P]>>;
} & Required<T>;

export type At<T, Path extends PathsIn<T>> =
  Path extends KeysIn<T>
    ? NonNullable<T[Path]> extends Array<infer R>
      ? NonNullable<R>
      : NonNullable<T[Path]>
    : Path extends `${infer First}.${infer Rest}`
      ? First extends KeysIn<T>
        ? NonNullable<T[First]> extends unknown[]
          ? Rest extends PathsIn<NonNullable<T[First]>[number]>
            ? At<NonNullable<NonNullable<T[First]>[number]>, Rest>
            : never
          : Rest extends PathsIn<T[First]>
            ? At<NonNullable<T[First]>, Rest>
            : never
        : never
      : never;

type PathsIn<T, Path extends string = ""> =
  T extends Array<infer R>
    ? Path | PathsIn<R, `${Path}`>
    : T extends object
      ? {
          [K in KeysIn<T>]:
            | Path
            | PathsIn<T[K], `${Path}${Path extends "" ? "" : "."}${K}`>;
        }[KeysIn<T>]
      : Path;

type KeysIn<T> = T extends object
  ? keyof T extends string | number
    ? keyof T
    : never
  : never;
