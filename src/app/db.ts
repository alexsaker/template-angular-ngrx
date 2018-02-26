import { DBSchema } from "@ngrx/db";

/**
 * ngrx/db uses a simple schema config object to initialize stores in IndexedDB.
 */
export const schema: DBSchema = {
  version: 1,
  name: "angular-ngrx",
  stores: {
    posts: {
      autoIncrement: true,
      primaryKey: "id"
    },
    comments: {
      autoIncrement: true,
      primaryKey: "id"
    },
    albums: {
      autoIncrement: true,
      primaryKey: "id"
    },
    photos: {
      autoIncrement: true,
      primaryKey: "id"
    },
    todos: {
      autoIncrement: true,
      primaryKey: "id"
    },
    users: {
      autoIncrement: true,
      primaryKey: "id"
    }
  }
};
