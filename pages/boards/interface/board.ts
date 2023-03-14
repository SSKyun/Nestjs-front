export interface Board {
  id: number;
  title: string;
  description: string;
  status: 'PUBLIC' | 'PRIVATE';
  createDate: Date;
  user: {
    id: number;
    nickname : string
  };
}