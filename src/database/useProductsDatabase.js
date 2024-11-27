import { useSQLiteContext } from "expo-sqlite";

export function useProductsDatabase() {
  const database = useSQLiteContext();

  async function createProduct({ nome, descricao, preco, quantidade }) {
    const statement = await database.prepareAsync(`
        INSERT INTO products (nome, descricao, preco, quantidade)
         VALUES ($nome, $descricao, $preco, $quantidade);
    `);

    try {
      const result = await statement.executeAsync({
        $nome: nome,
        $descricao: descricao,
        $preco: preco,
        $quantidade: quantidade,
      });
      const insertedID = result.lastInsertRowId.toString();
      return { insertedID };
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function getProducts(page) {
    try {
      const products = await database.getAllAsync(`
        SELECT * FROM products
        ORDER BY created_at DESC
        LIMIT 7 OFFSET ${page * 7};
      `);
      return products;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return { createProduct, getProducts };
}
