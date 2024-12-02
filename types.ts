export interface Banner {
    id: string;
    label: string;
    imageUrl: string;
}

export interface Category {
    id: string;
    name: string;
    banner: Banner
}

export interface Product {
    id: string;
    category: Category;
    name: string;
    price: string;
    description: string;
    benefits?: string;
    usage?: string;
    isFeatured: boolean;
    images: Image[]
}

export interface Image {
    id: string;
    url: string;
}