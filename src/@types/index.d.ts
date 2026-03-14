import { FieldValue, Timestamp } from "firebase/firestore";

export interface BaseUser {
  name: string;
  email: string;
  cpf: string;
  phone: string;
}

export interface UserFirestore extends BaseUser {
  uid: string;
  points: number;
  totalPointsEarned: number;
  level: "bronze" | "silver" | "gold" | "vip";
  createdAt: FieldValue;
  updatedAt: FieldValue;
}

export interface UserIdentity extends BaseUser {
  uid: string
}

export interface UserForm extends BaseUser {
  password: string;
  confirmPassword: string;
}
