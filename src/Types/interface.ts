export interface Pokedex {
    count: number;
    next: string;
    previous: null;
    results: Result[];
}

export interface Result {
    name: string;
    url: string;
    sprite: string;
    types: {
        type: {
            name: string;
        };
    }[];
}
