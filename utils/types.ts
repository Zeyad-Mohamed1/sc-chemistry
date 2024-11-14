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
  createdAt?: string;
  updatedAt?: string;
};

export type Lesson = {
  id: string;
  name: string;
  description: string;
  image: string;
  isFree?: boolean;
  createdAt?: string;
  updatedAt?: string;
  courseId?: string;
};

// createdAt
// :
// "2024-10-21T19:23:15.338Z"
// description
// :
// "Introduction to the course"
// id
// :
// "3f95bbd3-7ca0-40e6-a07b-960532881d4d"
// image
// :
// "https://utfs.io/f/bb4cZaICR3J7nMXywY8fl4wd0DvjBp8oI9nOQmcuViLgESqr"
// isFree
// :
// true
// name
// :
// updatedAt
