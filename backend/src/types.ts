type SuccessData = string | object | object[];

type JWTPayload = {
  email: string;
  id: string;
};

type CartItem = {
  productId: string;
  quantity: number;
  totalPrice: number;
};

export { SuccessData, JWTPayload, CartItem };
