export async function initializeDatabase(database) {
  try {
    await database.execAsync(`
        /*DROP TABLE IF EXISTS products;

        DROP TABLE IF EXISTS users; 

        DROP INDEX IF EXISTS idx_users_nome;

        DROP INDEX IF EXISTS idx_products_nome; */

        CREATE TABLE IF NOT EXISTS users (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         nome TEXT,
         email TEXT NOT NULL UNIQUE,
         senha TEXT NOT NULL DEFAULT 'A123456a!',
         role TEXT NOT NULL DEFAULT 'USER',
         updated_at DATE
        );

        CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          descricao TEXT,
          preco REAL NOT NULL,
          quantidade INTEGER NOT NULL,
          created_at DATE DEFAULT CURRENT_TIMESTAMP,
          updated_at DATE
        );

        CREATE INDEX IF NOT EXISTS idx_users_nome ON users (nome);

        CREATE INDEX IF NOT EXISTS idx_products_nome ON products (nome);

        /* INSERT OR REPLACE INTO users (nome, email, senha, role) VALUES ('Admin', 'admin@email.com', 'A123456a!', 'ADMIN'); */
    `);
  } catch (error) {
    console.log(error);
  }
}
