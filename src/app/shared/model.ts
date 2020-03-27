
export interface Role {
  label: string;
}

export interface User {
  id: number;
  name: string;
  role: Role;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  dateTime: Date;
  author: User;
}
