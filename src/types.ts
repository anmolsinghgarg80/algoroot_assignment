export interface User {
  id?: string;
  email: string;
  name?: string;
  password: string;
}

export interface TableDataItem {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  signup: (userData: User) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  deleteAccount: () => void;
}
