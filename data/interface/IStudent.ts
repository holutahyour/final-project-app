export interface IStudent {
  id: number;
  code: string;
  accountName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  studentStatus: number;
  nationality: string;
  stateOrigin: string;
  mobile: string;
  skype: string;
  facebook: string;
  accountEmail: string;
  studentCode: string;
  programCode: string;
  streamCode: string;
  streamName: string;
  departmentCode: string;
  departmentName: string;
  facultyCode: string;
  admissionTypeCode: string;
  admissionTypeName: string;
  academicLevelCode: string;
  photo: string;
  classCode: string;
  className: string;
  currency: string;
  studentType: string;
  sessionCode: string;
  courseCode: string;
  courseName: string;
  period: string;
  academicStanding: number;
  active: boolean;
  isLMS: boolean;
  isCheck: boolean;
}

export interface IStudentResponse {
  content: IStudent[];
}
