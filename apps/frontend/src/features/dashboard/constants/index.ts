import { BookOpen, Building2, GraduationCap, Layers, Users } from 'lucide-react';

export const ROLE_COLORS = ['#f97316', '#0ea5e9', '#22c55e', '#a855f7'] as const;

export const CHART_COLORS = {
  SUBJECTS_BY_DEPT: '#f97316',
  CLASSES_BY_SUBJECT: '#0ea5e9',
} as const;

export const KPI_CONFIG = [
  {
    label: 'Total Users',
    key: 'totalUsers',
    icon: Users,
    accent: 'text-blue-600',
  },
  {
    label: 'Teachers',
    key: 'teachers',
    icon: GraduationCap,
    accent: 'text-emerald-600',
  },
  {
    label: 'Subjects',
    key: 'subjects',
    icon: BookOpen,
    accent: 'text-purple-600',
  },
  {
    label: 'Departments',
    key: 'departments',
    icon: Building2,
    accent: 'text-cyan-600',
  },
  {
    label: 'Classes',
    key: 'classes',
    icon: Layers,
    accent: 'text-rose-600',
  },
] as const;
