export interface IPost {
  _id: string;
  title: string;
  link: string;
  description: string;
  pubDate: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ICreatePostBody {
  title: string;
  link: string;
  description: string;
  pubDate: Date;
}

export interface IUpdatePostBody {
  title: string;
  link: string;
  description: string;
}

export interface IPostFilter {
  page?: string;
  perPage?: string;
  sort?: SortEnum;
  sortBy?: SortNamesEnum;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export enum SortNamesEnum {
  title = "title",
  link = "link",
  description = "description",
  pubDate = "pubDate",
  created_at = "created_at",
}

export enum SortEnum {
  ASC = "ASC",
  DESC = "DESC",
}
