export interface Cart {
    _id: string;
    quantity: number;
    totalprice: number;
    product: string[];
    user: string[];
}

export interface Checkout {
    _id: string;
    totalpayment: number;
    totalorder: number;
    product: string[];
    user: string[];
    cart: string;
}
