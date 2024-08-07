import { bookshelfInstance } from "../config/dbConfig.js";

const User = bookshelfInstance.Model.extend({
  tableName: "user_accounts",
  idAttribute: "id",
});

export { User };
