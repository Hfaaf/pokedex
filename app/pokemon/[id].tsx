import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from "react-native";

export default function PokemonDetails() {
    const { id } = useLocalSearchParams();
    const [pokemon, setPokemon] = useState<any>(null);

    async function loadPokemon() {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            setPokemon(data);
        } catch (error) {
            console.log("Erro ao carregar Pokémon:", error);
        }
    }

    useEffect(() => {
        loadPokemon();
    }, []);

    if (!pokemon) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="red" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} #{pokemon.id}
            </Text>

            <Image
                source={{ uri: pokemon.sprites.other["official-artwork"].front_default }}
                style={styles.image}
            />

            <Text style={styles.section}>Tipos</Text>
            <View style={styles.row}>
                {pokemon.types.map((t: any) => (
                    <Text key={t.type.name} style={styles.type}>
                        {t.type.name}
                    </Text>
                ))}
            </View>

            <Text style={styles.section}>Altura / Peso</Text>
            <Text>Altura: {pokemon.height / 10} m</Text>
            <Text>Peso: {pokemon.weight / 10} kg</Text>

            <Text style={styles.section}>Habilidades</Text>
            {pokemon.abilities.map((a: any) => (
                <Text key={a.ability.name}>• {a.ability.name}</Text>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 16,
        textTransform: "capitalize",
    },
    image: {
        width: 250,
        height: 250,
    },
    section: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: "bold",
    },
    type: {
        backgroundColor: "#eee",
        padding: 8,
        borderRadius: 8,
        marginHorizontal: 5,
        textTransform: "capitalize",
    },
    row: {
        flexDirection: "row",
        marginTop: 8,
    },
});
