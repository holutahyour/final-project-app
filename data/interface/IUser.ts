export interface IUser {
  code: string;
  userName: string;
  email: string;
  title: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  roles: string[];
  facultyId: string;
  faculty: string;
  departmentId: string;
  department: string;
  expertiseId?: string;
  expertise?: string;
  matriculationNumber?: string;
  levelId?: string;
  level?: string;
  id: string;
}
