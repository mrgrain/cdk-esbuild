import { ListItem } from "./ListItem";

export interface List {
  id: string;
  title?: string;
  items: ListItem[];
}
