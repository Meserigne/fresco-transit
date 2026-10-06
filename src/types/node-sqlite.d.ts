declare module "node:sqlite" {
  export class DatabaseSync {
    constructor(path: string);
    prepare(sql: string): {
      all(...params: Array<string | number | null>): Array<Record<string, unknown>>;
    };
  }
}
