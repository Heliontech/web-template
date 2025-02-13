export type User = {
  id: number;
  email: string;
  phone: string;
  gender?: string;
  username?: string;
  image?: string;
  status?: 'Inactive' | 'Active' | 'Deleted';
  roles?: {
    role: {
      name: string;
    };
  }[];
  description?: string;
  created_at: string;
  updated_at: string;
};

// ?pageNo=1&pageSize=10&search[name]=foobar&search[age]=38&sort
export interface ITableParams {
  page: number;
  pageSize: number;
  search?: Record<string, any>;
  // full text search
  q?: string;
  sortField: string;
  sortOrder: string;
}
