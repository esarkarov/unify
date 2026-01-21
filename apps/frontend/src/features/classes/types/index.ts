import { Department } from '@/features/departments/types';
import { Subject } from '@/features/subjects/types';
import { Schedule, User } from '@/shared/types';

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

export type ClassDetails = {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  capacity: number;
  courseCode: string;
  courseName: string;
  bannerUrl?: string;
  bannerCldPubId?: string;
  subject?: Subject;
  teacher?: User;
  department?: Department;
  schedules: Schedule[];
  inviteCode?: string;
};

export interface ClassUser {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string | null;
}
