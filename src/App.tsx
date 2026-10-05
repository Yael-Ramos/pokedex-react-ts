import { useState, useEffect } from 'react';
import { usePokemons } from './Hooks/usePokemons';
import './index.css'
import { getPokemonId, obtenerRegion } from './utils/pokemonHelpers';

function App() {
  const { pokemons, cardPokemon, getPokemon } = usePokemons();


  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [textoDebounce, setTextoDebounce] = useState('');

  useEffect(() => {
    const miTemporizador = setTimeout(() => {
      setTextoDebounce(textoBusqueda);
    }, 500);

    return () => {
      clearTimeout(miTemporizador);
    };
  }, [textoBusqueda]
  )
  const pokemonsFiltrados = pokemons.filter((poke) =>
    poke.name.toLocaleLowerCase().includes(textoDebounce.toLowerCase())
  );
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-emerald-900 via-gray-900 to-black p-6">
      {/* Card de bienvenida */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-10 border border-emerald-400/40 text-center">
        <h1 className="text-4xl font-bold text-emerald-300 tracking-wide drop-shadow-lg">
          Bienvenido a VDE-Test
        </h1>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-6xl">
        {/* Lista de Pokémon */}
        <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-white/20 transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">
            Lista de Pokémon
          </h2>

          <input type="text"
            placeholder='Buscar pokemon'
            className='w-full mb-4 px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500
           focus:outline-none focus:border-cyan-400 transition-colors'
            value={textoBusqueda}
            onChange={(e) => setTextoBusqueda(e.target.value)}
          />

          <div className="flex flex-col gap-2 text-gray-300 overflow-y-auto h-[550px]">
            {pokemonsFiltrados.length > 0 ? (
              pokemonsFiltrados.map((poke, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-400/50 cursor-pointer transition shadow-sm"
                  onClick={() => getPokemon(getPokemonId(poke.url))}
                >
                  <div className='flex items-center space-x-3 min-w-0'>
                    <span className='text-xs font-mono text-slate-400 font-semibold'>#{String(index + 1).padStart(3, '0')}</span>

                    {/* NUEVO: Mini Sprite del Pokémon */}
                    <img src={poke.sprite} alt={poke.name} className="w-10 h-10 object-contain drop-shadow-md" />

                    <div className='flex flex-col min-w-0 gap-1'>
                      <span className='text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors uppercase tracking-wide'>
                        {poke.name}
                      </span>

                      {/* NUEVO: Contenedor para Región y Tipos */}
                      <div className="flex items-center gap-2">
                        <span className='text-[10px] font-mono text-slate-400'>
                          {obtenerRegion(getPokemonId(poke.url))}
                        </span>

                        {/* Píldoras de Tipos */}
                        <div className="flex gap-1">
                          {poke.types.map((tipoObj, i) => (
                            <span
                              key={i}
                              className="px-2 py-[2px] bg-emerald-500/20 rounded text-[8px] font-bold text-emerald-200 uppercase border border-emerald-400/30"
                            >
                              {tipoObj.type.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className='text-cyan-400 text-xs font-mono'>&gt;</span>
                </div>
              ))
            ) : (
              <p className="text-gray-400">Cargando...</p>
            )}
          </div>
        </div>

        {/* Card de Pokémon */}
        <div className="lg:col-span-7 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-white/20 transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-emerald-300 mb-4">
            Card de Pokémon
          </h2>
          <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
            {cardPokemon ? (
              <div className="flex flex-col items-center w-full mt-2">

                {/* 1. Nombre */}
                <h3 className="text-3xl font-bold text-white capitalize mb-6 drop-shadow-md">
                  {cardPokemon.name}
                </h3>

                {/* 2. Imagen Retro */}
                <img
                  src={cardPokemon.sprites.front_default}
                  alt={cardPokemon.name}
                  className="w-32 h-32 object-contain mb-8 transition-transform hover:scale-110"
                />

                {/* 3. Tipos */}
                <div className="flex gap-2 mb-8">
                  {cardPokemon.types.map((item: { type: { name: string } }) => (
                    <span
                      key={item.type.name}
                      className="px-4 py-1 bg-emerald-500/20 rounded-full text-sm font-semibold text-emerald-200 capitalize border border-emerald-400/40"
                    >
                      {item.type.name}
                    </span>
                  ))}
                </div>

                {/* 4. Altura y Peso */}
                <div className='grid grid-cols-2 gap-4 w-full max-w-sm mb-6'>
                  <div className='bg-black/40 border border-white/10 rounded-lg p-3 flex flex-col items-center justify-center hover:border-cyan-400/50 transition-colors'>
                    <span className='text-[10px] text-cyan-400 font-mono tracking-widest uppercase mb-1'>
                      Altura
                    </span>
                    <span className='text-lg font-bold text-white'>
                      {cardPokemon.height / 10} m
                    </span>
                  </div>

                  <div className='bg-black/40 border border-white/10 rounded-lg p-3 flex flex-col justify-center items-center hover:border-cyan-400/50 transition-colors'>
                    <span className='text-[10px] text-cyan-400 font-mono tracking-widest uppercase mb-1'>
                      Peso
                    </span>
                    <span className='text-lg font-bold text-white'>
                      {cardPokemon.weight / 10} kg
                    </span>
                  </div>
                </div>

                {/* 5. Movimientos */}
                {/* 5. Movimientos */}
                <div className="bg-black/20 border border-white/5 rounded-lg p-3 w-full max-w-sm text-center">
                  <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase mb-3 block">
                    Movimientos
                  </span>
                  <div className='grid grid-cols-5 gap-2'>
                    {cardPokemon.moves.slice(0, 5).map((item: { move: { name: string } }) => (
                      <div
                        key={item.move.name}
                        className='bg-black/40 border border-white/10 rounded py-1 px-1 flex items-center justify-center hover:border-emerald-400/50 transition-colors'
                      >
                        <span className='text-[9px] text-gray-300 capitalize truncate w-full' title={item.move.name}>
                          {item.move.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div> {/* <-- AQUÍ SE CIERRA LA CAJA DE MOVIMIENTOS */}

                {/* 6. Estadísticas Base */}
                <div className='w-full max-w-sm mt-6 bg-black/20 border border-white/5 rounded-lg p-4'>
                  <h4 className='text-[10px] text-emerald-400 font-mono tracking-widest uppercase mb-4 text-center'>
                    Estadisticas base
                  </h4>
                  <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
                    {cardPokemon.stats.map((item: { base_stat: number; stat: { name: string } }) => {
                      const statPercentage = Math.min((item.base_stat / 150) * 100, 100);

                      return (
                        <div key={item.stat.name} className='flex items-center gap-3'>
                          <span className='w-24 text-[10px] text-gray-400 font-mono uppercase truncate'>
                            {item.stat.name.replace('-', ' ')}
                          </span>

                          <span className='w-16 text-xs font-bold text-white text-right font-mono'>
                            <span className='text-emerald-400'>{item.base_stat}</span> /150
                          </span>

                          <div className='flex-1 h-2 bg-black/50 rounded-full overflow-hidden border border-white/5'>
                            <div
                              className='h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out'
                              style={{ width: `${statPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>


              </div>
            ) : (
              <p className="text-gray-400 font-mono tracking-widest uppercase text-sm">
                POR FAVOR SELECCIONA UN POKEMON
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App