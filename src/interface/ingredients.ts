export interface ingredients {
    id: string | number;
    type: string;
    name: string;
    ppu: number;
    batters: batter[];
    toppings: topping[];
}

export interface batter {
    id: string | number;
    type: string;
}

export interface topping {
    id: string | number;
    type: string;
}

