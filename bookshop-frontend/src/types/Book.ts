export enum TSaleAbility {
  FOR_SALE = "FOR_SALE",
}

export interface IBook {
  id: string;
  volumeInfo: {
    title: string;
    description: string;
    imageLinks: {
      smallThumbnail: string;
    };
    pageCount: number;
  };
  saleInfo?: {
    saleability: TSaleAbility;
    retailPrice: {
      amount: number;
      currencyCode: string;
    };
  };
  revision?: number;
}
