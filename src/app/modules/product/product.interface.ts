//  declare a type  decare for TVariants
export type TVariants = {
  type: string;
  value: string;
};

// type declartion TInverntory 
export type TInventory = {
  quantity: number;
  inStock: boolean;
};
// type declartion TPproduct
export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariants[];
  inventory: TInventory;
  isDelete?: boolean;
};
