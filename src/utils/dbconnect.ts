import mysql from "mysql2/typings/mysql";

interface DbConfig {
  host: string | undefined;
  user: string | undefined;
  password: string | undefined;
  database: string | undefined;
  port: number;
}
const createDbConnection = async (): Promise<mysql.Connection> => {
  const dbConfig: DbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || "3306"), //이거 왜이럼 귀찮게
  };

  return await mysql.createConnection(dbConfig);
};

export default createDbConnection;
