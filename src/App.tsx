import { useEffect, useState } from 'react'
import './index.css'
import { type Result } from './interface';
import { type PokemonDetails } from './PokemonDetails';



function App() {
  const [pokemons, setPokemons] = useState<Result[]>([]) // TODO: PISTA 1 - debe crear el tipo de datos
  const [cardPokemon, setCardPokemon] = useState<PokemonDetails | null>(null) // TODO: PISTA 2 - debe crear el tipo de datos

  // Fetch inicial de la lista de Pokémon
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
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10', options) // PISTA 3 - la URL ya está lista
      const data = await response.json()
      setPokemons(data.results)
    } catch (error) {
      console.error("Error fetching pokemons:", error)
    }
  }

  const getPokemon = async (id: number) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const data = await response.json()
    setCardPokemon(data)
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-emerald-900 via-gray-900 to-black p-6">
      {/* Card de bienvenida */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-10 border border-emerald-400/40 text-center">
        <h1 className="text-4xl font-bold text-emerald-300 tracking-wide drop-shadow-lg">
          Bienvenido a VDE-Test
        </h1>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-5 grid-rows-5 gap-8 w-full max-w-6xl">
        {/* Lista de Pokémon */}
        <div className="row-span-4 col-start-2 row-start-2 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-white/20 transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">
            Lista de Pokémon
          </h2>
          <div className="flex-1 flex flex-col gap-2 text-gray-300 overflow-y-auto">
            {pokemons.length > 0 ? (
              pokemons.map((poke, index) => (
                <div
                  key={index}
                  className="p-2 bg-white/5 rounded-lg hover:bg-emerald-600/30 cursor-pointer transition"
                  // TODO: PISTA 4 - debe manejar el click para seleccionar un Pokémon
                  onClick={() => getPokemon(index + 1)}
                >
                  {/* TODO: PISTA 5 - debe mostrar el nombre del Pokémon */}
                  <span>{poke.name}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-400">Cargando...</p>
            )}
          </div>
        </div>

        {/* Card de Pokémon */}
        <div className="row-span-4 col-start-4 row-start-2 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-white/20 transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">
            Card de Pokémon
          </h2>
          <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
            {cardPokemon ? (
              <>
                {/* TODO: PISTA 6 - debe mostrar el nombre del Pokémon seleccionado */}
                <h3 className=" text-xl font-bold text-white">
                  {cardPokemon.name}
                </h3>
                {/* TODO: PISTA 7 - opcional: fetch a la URL para obtener imagen y stats */}
                <div className="mt-4">
                  <img
                    src={cardPokemon.sprites.front_default}
                    alt={cardPokemon.name}
                    className='w-32 h-32 object-contain mb-4'
                  >
                  </img>
                  <p
                    className=''
                  >{cardPokemon.height} ft</p>
                  <p>
                    Movimientos: {cardPokemon.moves.slice(0, 5).map(item => item.move.name).join(', ')}
                  </p>

                </div>
              </>
            ) : (
              <p className="text-gray-400">POR FAVOR SELECCIONA UN POKEMON</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
