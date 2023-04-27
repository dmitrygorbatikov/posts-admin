export interface IRequestError {
  [key: string]: string;
}

export interface ITableHeaderProps {
  [key: string]: { name: string; sort?: boolean; isDate?: boolean };
}
