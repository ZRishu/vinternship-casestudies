export interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

export let products: Product[] = [
  { id: "1", name: "Bananas", price: 1.5, inStock: true },
  { id: "2", name: "Apples", price: 2.0, inStock: false },
];
