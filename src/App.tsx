import { useState, useEffect, useRef } from 'react';
import { usePokemons } from './Hooks/usePokemons';
import './index.css'
import { getPokemonId, obtenerRegion, obtenerColorTipo } from './utils/pokemonHelpers';

function App() {
  const { pokemons, cardPokemon, getPokemon } = usePokemons();
  const detailleRef = useRef<HTMLDivElement>(null);


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

  useEffect(() => {
    if (cardPokemon) {
      detailleRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [cardPokemon]);

  const pokemonsFiltrados = pokemons.filter((poke) =>
    poke.name.toLocaleLowerCase().includes(textoDebounce.toLowerCase())
  );
  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-[#121212] text-gray-300 font-sans">

      {/* Card de bienvenida */}
      <div className="bg-[#1E1E1E] border borya der-orange-500/30 rounded-2xl shadow-lg p-6 mb-10">
        <h1 className="text-4xl font-bold text-orange-500 tracking-wide drop-shadow-md">
          Bienvenido a Mi Pokedex
        </h1>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-6xl">
        {/* Lista de Pokémon */}
        {/* Lista de Pokémon (Panel Izquierdo) */}
        <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col h-full border border-white/20 transition transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">
            Lista de Pokémon
          </h2>

          <input type="text"
            placeholder='Buscar pokemon'
            className='w-full mb-4 px-4 py-2 bg-black/40 border border-white/10 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors'
            value={textoBusqueda}
            onChange={(e) => setTextoBusqueda(e.target.value)}
          />

          {/* EL TRUCO MAESTRO: Contenedor Relativo + Scroll Absoluto */}
          <div className="relative flex-1 min-h-[550px]">
            {/* La clase 'absolute inset-0' ancla la lista a las 4 esquinas de su padre, forzando el scroll */}
            <div className="absolute inset-0 overflow-y-auto flex flex-col gap-2 text-gray-300 pr-2">
              {pokemonsFiltrados.length > 0 ? (
                pokemonsFiltrados.map((poke) => {

                  const pokeId = getPokemonId(poke.url);
                  const esActivo = cardPokemon?.id === Number(pokeId);

                  return (
                    <div
                      key={poke.name}
                      onClick={() => getPokemon(pokeId)}
                      className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all shadow-sm border
                       ${esActivo
                          ? 'bg-gradient-to-r from-orange-500/25 to-transparent border-orange-500/60 shadow-[0_0_15px_rgba(249,115,22,0.15)]'
                          : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-cyan-400/50'
                        }`}
                    >
                      <div className='flex items-center space-x-3 min-w-0'>
                        <span className={`text-xs font-mono font-semibold ${esActivo ? 'text-orange-400' : 'text-slate-400'}`}>
                          #{String(pokeId).padStart(3, '0')}
                        </span>

                        <img src={poke.sprite} alt={poke.name} className="w-10 h-10 object-contain drop-shadow-md" />

                        <div className='flex flex-col min-w-0 gap-1'>

                          <div className="flex items-center gap-2">

                            <span className='text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors uppercase tracking-wide truncate'>
                              {poke.name}
                            </span>
                            {esActivo && (
                              <span className='text-[8px] font-mono font-bold bg-orange-500 text-black px-1.5 py-0.5 rounded uppercase'>
                                Activo
                              </span>
                            )}
                          </div>
                          <div className='flex items-center gap-2'>
                            <span className='text-[10px] font-mono text-slate-400'>
                              {obtenerRegion(pokeId)}
                            </span>
                            <div className="flex gap-1">
                              {poke.types.map((tipoObj, i) => (
                                <span
                                  key={i}
                                  className={`px-2 py-[2px] rounded text-[8px] font-bold uppercase border ${obtenerColorTipo(tipoObj.type.name)}`}
                                >
                                  {tipoObj.type.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <span className={`text-xs font-mono ${esActivo ? 'text-orange-400' : 'text-cyan-400'}`}>&gt;</span>
                    </div>
                  );
                })
              ) : (
              <p className="text-gray-400">Cargando...</p>
              )}
            </div>
          </div>
        </div>

        {/* Card de Pokémon */}
        <div ref={detailleRef} className='col-span-1 lg:col-span-7 '>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-white/20 transition transform hover:scale-105 hover:shadow-2xl">
            <h2 className="text-2xl font-semibold text-orange-500 mb-4">
              Tarjeta de Pokémon
            </h2>

            <div className="flex-1 flex flex-col items-center justify-center text-gray-300">
              {cardPokemon ? (
                <div className="flex flex-col items-center w-full mt-2">

                  {/* 1. Nombre */}
                  <h3 className="text-3xl font-bold text-white capitalize mb-6 drop-shadow-md">
                    {cardPokemon.name}
                  </h3>


                  {/* 2. Imagen Retro con Escenario Holográfico */}
                  {/* 2. Imagen Retro con Escenario Holográfico */}
                  <div className="relative flex justify-center items-center w-full py-6 mt-2 mb-8">
                    {/* Luz ambiental holográfica */}
                    <div className="absolute w-40 h-40 bg-gradient-to-br from-orange-500/30 to-yellow-500/10 blur-[40px] rounded-full pointer-events-none"></div>

                    {/* Base luminosa del piso */}
                    <div className="absolute bottom-2 w-32 h-3 bg-orange-500/40 blur-md rounded-[100%] pointer-events-none"></div>

                    {/* Sprite del Pokémon al frente */}
                    <img
                      src={cardPokemon.sprites.front_default}
                      alt={cardPokemon.name}
                      className="relative z-10 w-32 h-32 object-contain drop-shadow-[0_0_15px_rgba(249,115,22,0.6)] transition-transform duration-300 hover:scale-110"
                    />
                  </div>


                  {/* 3. Tipos */}
                  <div className="flex gap-2 mb-8">
                    {cardPokemon.types.map((item: { type: { name: string } }) => (
                      <span
                        key={item.type.name}
                        className={`px-4 py-1 rounded-full text-sm font-semibold capitalize border ${obtenerColorTipo(item.type.name)}`}
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
                  <div className='w-full max-w-sm mt-6 bg-black/40 border border-orange-500/20 rounded-lg p-5'>

                    <h4 className='text-[10px] text-orange-400 font-mono tracking-widest uppercase mb-5 border-b border-orange-500/20 pb-2 text-center'>
                      Estadisticas base
                    </h4>

                    <div className='flex flex-col gap-4'>
                      {cardPokemon.stats.map((item: { base_stat: number; stat: { name: string } }) => {
                        const statPercentage = Math.min((item.base_stat / 150) * 100, 100);

                        return (
                          <div key={item.stat.name} className='flex flex-col gap-1.5'>

                            <div className='flex justify-between items-center text-[10px] font-mono'>

                              <span className='text-gray-400 uppercase tracking-widest'>
                                {item.stat.name.replace('-', ' ')}
                              </span>

                              <span className='font-bold text-white tracking-widest'>
                                <span className='text-orange-400'>{item.base_stat}</span> /150
                              </span>

                            </div>

                            <div className='w-full h-1.5 bg-black/80 rounded-full overflow-hidden border border-white/5'>
                              <div
                                className='h-full bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-400 shadow-[0_0_9px_rgba(249,115,22,0.6)]
                                 rounded-full transition-all duration-1000 ease-out'
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
    </div>
  )
}

export default App