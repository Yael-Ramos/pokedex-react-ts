export const getPokemonId = (url: string) => {
    const segments = url.split('/').filter(Boolean);
    return Number(segments[segments.length - 1]);
};

export const obtenerRegion = (id: number) => {
    if(id <= 151) return 'kanto';
    if(id <= 251) return 'Johto';
    if(id <= 386) return 'Hoenn';
    if(id <= 493) return 'Sinnoh';
    if(id <= 649) return 'Unova / Teselia';
    if(id <= 721) return 'kalos';
    if(id <= 809) return 'Alola';
    if(id <= 898) return 'Galar';
    return 'Paldea';
};