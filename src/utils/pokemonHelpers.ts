export const getPokemonId = (url: string) => {
    const segments = url.split('/').filter(Boolean);
    return Number(segments[segments.length - 1]);
};

export const obtenerRegion = (id: number) => {
    if (id <= 151) return 'kanto';
    if (id <= 251) return 'Johto';
    if (id <= 386) return 'Hoenn';
    if (id <= 493) return 'Sinnoh';
    if (id <= 649) return 'Unova / Teselia';
    if (id <= 721) return 'kalos';
    if (id <= 809) return 'Alola';
    if (id <= 898) return 'Galar';
    return 'Paldea';
};


export const obtenerColorTipo = (tipo: string) => {
    const colores: { [key: string]: string } = {
        normal: 'bg-gray-400/20 text-gray-300 border-gray-400/40',
        fire: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
        water: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
        grass: 'bg-green-500/20 text-green-300 border-green-500/40',
        electric: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/40',
        ice: 'bg-cyan-300/20 text-cyan-200 border-cyan-300/40',
        fighting: 'bg-red-600/20 text-red-400 border-red-600/40',
        poison: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
        ground: 'bg-yellow-600/20 text-yellow-500 border-yellow-600/40',
        flying: 'bg-indigo-400/20 text-indigo-300 border-indigo-400/40',
        psychic: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
        bug: 'bg-lime-500/20 text-lime-300 border-lime-500/40',
        rock: 'bg-yellow-700/20 text-yellow-600 border-yellow-700/40',
        ghost: 'bg-purple-700/20 text-purple-400 border-purple-700/40',
        dragon: 'bg-indigo-600/20 text-indigo-400 border-indigo-600/40',
        dark: 'bg-gray-800/40 text-gray-400 border-gray-700/50',
        steel: 'bg-slate-400/20 text-slate-300 border-slate-400/40',
        fairy:'bg-pink-400/20 text-pink-200 border-pink-400/40',
    };
    return colores[tipo] || 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30';
};