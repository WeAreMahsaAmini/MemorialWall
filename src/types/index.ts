export type Person = {
  id: string;
  image: string;
  name: string;
  family: string;
  age: number;
  date?: string;
  images?: string[];
  birthdate?: string;
  city: City['id'];
  isValidated: boolean;
  name_persian: string;
  family_persian: string;
  description?: string[];
  happening?: Happening['id'];
  references?: Record<string, string[]>;
};

export type Province = {
  id: string;
  name: string;
  name_persian: string;
};

export type City = {
  id: string;
  name: string;
  name_persian: string;
  province_id: Province['id'];
};

export type Happening = {
  id: string;
  title: string;
  title_persian: string;
  description?: string;
}