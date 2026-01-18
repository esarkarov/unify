export interface ClassListItem {
  id: number;
  name: string;
  status: 'active' | 'inactive';
  bannerUrl?: string;
  subject?: {
    name: string;
  };
  teacher?: {
    name: string;
  };
  capacity: number;
}
