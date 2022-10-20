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
  full_name_persian: string;
  description?: string[];
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
