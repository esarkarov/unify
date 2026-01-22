import { ClassListItem } from '@/features/classes/types';
import { Subject } from '@/features/subjects/types';
import { User } from '@/shared/types';

export function groupUsersByRole(users: User[]) {
  const counts = users.reduce<Record<string, number>>((acc, user) => {
    const role = user.role ?? 'unknown';
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).map(([role, total]) => ({ role, total }));
}

export function groupSubjectsByDepartment(subjects: Subject[]) {
  const counts = subjects.reduce<Record<string, number>>((acc, subject) => {
    const departmentName = (subject as { department?: { name?: string } }).department?.name ?? 'Unassigned';
    acc[departmentName] = (acc[departmentName] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).map(([departmentName, totalSubjects]) => ({
    departmentName,
    totalSubjects,
  }));
}

export function groupClassesBySubject(classes: ClassListItem[]) {
  const counts = classes.reduce<Record<string, number>>((acc, classItem) => {
    const subjectName = classItem.subject?.name ?? 'Unassigned';
    acc[subjectName] = (acc[subjectName] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).map(([subjectName, totalClasses]) => ({
    subjectName,
    totalClasses,
  }));
}

export function getNewestItems<T extends { createdAt?: string | Date }>(items: T[], limit: number = 5): T[] {
  return [...items]
    .sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, limit);
}

export function getNewestTeachers(users: User[], limit: number = 5): User[] {
  const teachers = users.filter((user) => user.role === 'teacher');
  return getNewestItems(teachers, limit);
}

export function getTopItems<T>(items: T[], sortKey: keyof T, limit: number = 5): T[] {
  return [...items]
    .sort((a, b) => {
      const aVal = Number(a[sortKey]) || 0;
      const bVal = Number(b[sortKey]) || 0;
      return bVal - aVal;
    })
    .slice(0, limit);
}
