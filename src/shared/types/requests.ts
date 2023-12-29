export interface ILinksPaginationData {
  href: string;
  ref: string;
}
export interface IPaginationData<T> {
  items: T & { links: ILinksPaginationData[] }[];
  links: ILinksPaginationData[];
  total_items: number;
  total_pages: number;
}
