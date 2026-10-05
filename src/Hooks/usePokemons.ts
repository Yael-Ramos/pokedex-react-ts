import { type Result } from '../Types/interface';
import { type PokemonDetails } from '../Types/PokemonDetails';
import { useEffect, useState } from 'react';


export const usePokemons = () => {
    const [pokemons, setPokemons] = useState<Result[]>([]) // TODO: PISTA 1 - debe crear el tipo de datos
    const [cardPokemon, setCardPokemon] = useState<PokemonDetails | null>(null) // TODO: PISTA 2 - debe crear el tipo de datos

    useEffect(() => {
        getList()
    }, [])

  const getList = async () => {
        try {
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            // Cambié el límite a 151 para que tengas la primera generación completa, como en tu diseño
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151', options) 
            const data = await response.json()

            // MAGIA AQUÍ: Pedimos los detalles de cada uno al mismo tiempo
            const promesas = data.results.map(async (poke: { name: string, url: string }) => {
                const res = await fetch(poke.url);
                const detalles = await res.json();
                
                // Filtramos y guardamos SOLO lo que necesitamos para la lista izquierda
                return {
                    name: poke.name,
                    url: poke.url, // Conservamos la URL porque tu App.tsx la usa para el ID
                    types: detalles.types, // Guardamos los tipos para las píldoras
                    sprite: detalles.sprites.front_default // Y el mini icono (sprite)
                };
            });

            // Esperamos a que todos los recortes estén listos
            const pokemonsLigero = await Promise.all(promesas);
            
            setPokemons(pokemonsLigero);
        } catch (error) {
            console.error("Error fetching pokemons:", error)
        }
    }

    const getPokemon = async (id: number) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await response.json()
        setCardPokemon(data)
    }

    return {
        pokemons,
        cardPokemon,
        getPokemon
    };
}
