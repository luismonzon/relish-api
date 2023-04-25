export interface Album {
  userId: number;
  id: number;
  title: string;
}
export interface EnrichedPhoto extends Partial<Photo> {
  album?: Partial<Album> & { user?: User };
}

export type Filter<T> = (enrichedPhoto: T) => boolean;
export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { lat: string; lng: string };
  phone: string;
  website: string;
  company: Company;
}
interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
