import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useNavigation } from "@react-navigation/native";


export interface Pokemon {
    id: number;
    name: string;
    image: string;
}

interface Props {
    pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: Props) {
    return (
        <Link
            href={`/pokemon/${pokemon.id}` as any}
            asChild
        >
            <TouchableOpacity style={styles.card}>
                <Image source={{ uri: pokemon.image }} style={styles.image} />

                <Text style={styles.id}>#{pokemon.id}</Text>
                <Text style={styles.name}>{pokemon.name}</Text>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        margin: 8,
        alignItems: "center",
        width: "45%",
        elevation: 4,
    },
    image: {
        width: 90,
        height: 90,
    },
    id: {
        color: "#666",
        marginTop: 4,
    },
    name: {
        marginTop: 2,
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "capitalize",
    },
});
