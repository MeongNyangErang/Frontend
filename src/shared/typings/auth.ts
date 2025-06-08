interface PayloadFromToken {
  sub: string;
  exp: number;
  role?: string;
}

export { PayloadFromToken };
