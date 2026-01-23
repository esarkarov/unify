export interface OverviewStats {
  classes: number;
  departments: number;
  subjects: number;
  teachers: number;
  users: number;
}

export interface ClassWithRelations {
  id: number;
  name: string;
  inviteCode: string;
  createdAt: string;
  subject: {
    id: number;
    name: string;
    code: string;
  } | null;
  teacher: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface LatestStats {
  latestClasses: ClassWithRelations[];
  latestTeachers: Teacher[];
}

export interface UsersByRole {
  role: string;
  total: number;
}

export interface SubjectsByDepartment {
  departmentId: number;
  departmentName: string;
  totalSubjects: number;
}

export interface ClassesBySubject {
  subjectId: number;
  subjectName: string;
  totalClasses: number;
}

export interface ChartsStats {
  classesBySubject: ClassesBySubject[];
  subjectsByDepartment: SubjectsByDepartment[];
  usersByRole: UsersByRole[];
}
