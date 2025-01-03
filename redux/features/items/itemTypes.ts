import { Item } from "@/components/ItemsTable";

export type ItemResponse = {
  items: Item[];
  meta: {
    current_page: number;
    total_pages: number;
    total_count: number;
  };
};
