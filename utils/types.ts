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
