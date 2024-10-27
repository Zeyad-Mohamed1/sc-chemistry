export type RegisterUserDto = {
  firstName: string;
  lastName: string;
  studentNumber: string;
  parentNumber: string;
  password: string;
  governorate: string;
  yearOfStudy: string;
};

export type LoginUserDto = {
  studentNumber: string;
  password: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  studentNumber: string;
  parentNumber: string;
  password: string;
  governorate: string;
  yearOfStudy: string;
  isAdmin: boolean;
};

export type Year = {
  id?: string;
  name: string;
  image: string;
  isActive?: boolean;
};

export type Course = {
  id?: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isActive?: boolean;
};
