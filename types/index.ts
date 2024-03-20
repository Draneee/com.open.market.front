export interface TypeGetItemsMarketplace {
  total: number;
  inventory: Inventory[];
}

export interface Inventory {
  pictureUrl: string;
  id: number;
  productName: string;
  SKU: string;
  price: number;
  quantity: number;
  ownerId: number;
}

export interface GetItemsMarketplace {
  id: number;
  email: string;
  nickname: string;
}
