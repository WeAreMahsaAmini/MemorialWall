export type Timing = {
  updated_at: string;
  uploaded_at: string;
};

export type Person = {
  id: string;
  age?: number;
  name: string;
  family: string;
  image?: string;
  date?: string;
  reason?: string;
  city: City['id'];
  images?: string[];
  birthdate?: string;
  hashtags?: string[];
  isValidated: boolean;
  name_persian: string;
  family_persian: string;
  description: string[];
  description_fa: string[];
  happening?: Happening['id'];
  media: Record<string, string>;
  references: Record<string, string>;
} & Timing;

export type Province = {
  id: string;
  name: string;
  name_persian: string;
} & Timing;

export type City = {
  id: string;
  name: string;
  name_persian: string;
  province_id: Province['id'];
} & Timing;

export type Happening = {
  id: string;
  title: string;
  title_persian: string;
  description?: string;
};
