export interface IDropdown{
  value: string | number;
  label: string;
}

export interface ICheckBoxDescription{
  id: number;
  name: string;
  description: string;
}
export enum SortDirection{
  ASC = 'asc',
  DESC = 'desc'
}

export interface IPagination{
  search?: string | undefined |  null
  date_from?: string;
  date_to?: string
  sort_by?: string;
  sort_direction?: string;
  page?: number;
  per_page?: number;
}

export interface IPaginationResponse{
  current_page:number
  from:number
  last_page:number
  to:number
  total:number
}