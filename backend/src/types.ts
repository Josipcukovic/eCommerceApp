type SuccessData = string | object | object[];

type JWTPayload = {
  email: string;
  id: string;
};

export { SuccessData, JWTPayload };
