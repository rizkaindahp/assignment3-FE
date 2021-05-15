export interface Product {
    _id: string;
    name: string;
    price: number;
    imagePath: string;
    stock: number;
    description: string;
    categories: string[];
}

export interface Categories {
    _id: string;
    nameCategory: string;
}
