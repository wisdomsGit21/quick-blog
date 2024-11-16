export interface Author {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeaturedImage {
  id: number;
  alt: string;
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: {
    root: {
      children: Array<{
        type: string;
        children: Array<{
          text: string;
        }>;
      }>;
    };
  };
  featuredImage: FeaturedImage;
  category: Category;
  author: Author;
  publishedDate: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

export type PostsResponse = PaginatedResponse<Post>;
export type CategoriesResponse = PaginatedResponse<Category>;
