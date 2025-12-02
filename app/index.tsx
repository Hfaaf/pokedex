import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput } from "react-native";
import { PokemonCard, Pokemon } from "../components/PokemonCard";

export default function Home() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [filtered, setFiltered] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    async function loadPokemons() {
        try {
            const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200");
            const data = await response.json();

            const formatted = await Promise.all(
                data.results.map(async (pokemon: any) => {
                    const detail = await fetch(pokemon.url).then(res => res.json());

                    return {
                        id: detail.id,
                        name: detail.name,
                        image: detail.sprites.other["official-artwork"].front_default,
                    };
                })
            );

            setPokemons(formatted);
            setFiltered(formatted);
        } catch (error) {
            console.log("Erro ao carregar pokemons:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadPokemons();
    }, []);

    useEffect(() => {
        const text = search.toLowerCase();
        const results = pokemons.filter(p =>
            p.name.toLowerCase().includes(text) ||
            p.id.toString() === text
        );
        setFiltered(results);
    }, [search]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pokédex</Text>

            {/* 🔍 Campo de pesquisa */}
            <TextInput
                placeholder="Pesquisar por nome ou ID..."
                value={search}
                onChangeText={setSearch}
                style={styles.search}
            />

            {loading ? (
                <ActivityIndicator size="large" color="red" />
            ) : (
                <FlatList
                    data={filtered}
                    numColumns={2}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <PokemonCard pokemon={item} />}
                    contentContainerStyle={{ paddingBottom: 40 }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fce4ec",
        paddingTop: 60,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
    },
    search: {
        backgroundColor: "#fff",
        marginHorizontal: 20,
        padding: 12,
        borderRadius: 12,
        fontSize: 16,
        marginBottom: 16,
        elevation: 2,
    },
});
