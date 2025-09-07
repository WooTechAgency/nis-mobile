export interface IDropdown{
  value: string | number;
  label: string;
}
export interface PreviewProps {
  allowEdit: boolean
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
}