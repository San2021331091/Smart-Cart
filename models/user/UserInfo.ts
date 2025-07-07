export interface UserInfo {
  uid: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}