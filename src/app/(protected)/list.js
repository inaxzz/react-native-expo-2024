import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useProductsDatabase } from "../../database/useProductsDatabase"; // Alterado para o banco de produtos
import { FlashList } from "@shopify/flash-list";
import { formatCurrencyBRL } from "../../utils/formatCurrent"; // Continua útil para preços
import { set } from "zod";

export default function ProductList() {
  const [data, setData] = useState([]);
  const { getProducts } = useProductsDatabase(); // Função para buscar produtos
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  async function fetchData() {
    if (hasMore === false) return;
    console.log(page);

    setPage(page + 1);

    const products = await getProducts(page); // Busca produtos ao invés de pagamentos

    if (products.length < 5) setHasMore(false);
    setData([...data, ...products]);
    setLoading(false);
  }

  useEffect(() => {
    setPage(0);
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        margin: 5,
        margin: 10,
        padding: 3,
        backgroundColor: "#007BFF",
        height: 150,
      }}
    >
      <View style={{ flex: 1, gap: 5 }}>
        <Text style={{ fontFamily: "bold", color: "#fff", fontSize: 18, textTransform: "uppercase" }}>
          {item.nome} {/* Nome do produto */}
        </Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Text style={{ fontFamily: "regular", color: "#fff" }}>
            {item.descricao || "Sem descrição"} {/* Descrição do produto */}
          </Text>
        </View>
      </View>
      <View>
        <Text
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
          }}
        >
          {formatCurrencyBRL(item.preco || 0)} {/* Preço do produto */}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <FlashList
          data={data}
          renderItem={renderItem}
          estimatedItemSize={50}
          onEndReached={fetchData}
          onEndReachedThreshold={0.8}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}
