export interface JwtPayload {
  sub: string;

  username: string;

  id: number;

  email?: string;

  mobile?: string;
}
