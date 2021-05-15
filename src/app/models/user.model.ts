export interface User {
    _id: string;
    username: string;
    fullname: string;
    email: string;
    password: string;
    address: string;
    city: string;
    province: string;
    handphone: string;
}

export interface AuthLogin {
    email: string;
    password: string;
}
