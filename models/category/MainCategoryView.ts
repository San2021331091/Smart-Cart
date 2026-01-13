import { SubCategory } from '../category/Category';

export interface MainCategoryView {
  maincategory_id: number;
  maincategory_name: string;
  imgURL: string;
  subcategories: SubCategory[]
}
