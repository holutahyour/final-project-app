import axios, { AxiosError, AxiosResponse } from "axios";
import {
  IAcademicDepartment,
  IAcademicDepartmentResponse,
} from "../interface/IAcademicDepartment";
import { toaster } from "@/components/ui/chakra-toaster";
import { IResponse } from "../interface/IResponse";
import { IUser } from "../interface/IUser";


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  // baseURL: "https://educ8e-connector-app.azurewebsites.net/api",
  // baseURL: "https://educ8e-connector.azurewebsites.net/api",
  // baseURL: "https://localhost:7082/api",

  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    // Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // Add auth token if required
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    const method = response.config.method?.toLowerCase();
    if (method === "post" || method === "put" || method === "delete") {
      toaster.dismiss();
      toaster.success({
        title: "Operation completed successfully!",
        description: "Looks great",
      });
    }
    return response;
  },
  (error: AxiosError) => {
    const method = error?.config?.method?.toLowerCase();
    if (method === "post" || method === "put" || method === "delete") {
      if (error.response) {
        toaster.dismiss();
        toaster.error({
          title: "Error",
          description:
            error instanceof Error
              ? "Sorry a server error"
              : "An error occurred",
        });
      } else {
        console.error("Error setting up request:", error.message);
        toaster.dismiss();
        toaster.error({
          title: "Error",
          description:
            error instanceof Error ? error.message : "An error occurred",
        });
        //toast.error(`Error setting up request: ${error.message}`);
      }
    }

    return Promise.reject(error);
  }
);

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: async <T>(url: string) => {
    try {
      const { data } = await axiosInstance.get<T>(encodeURI(url));
      // For testing
      // await new Promise((res) => setTimeout(res, 10000));
      return data;
    } catch (error) {
      console.error("GET request failed:", error);
      return null; // Return null in case of error
    }
  },
  post: async <T>(url: string, body?: T) => {
    try {
      const { content } = await axiosInstance
        .post<T>(encodeURI(url), body)
        .then(responseBody);
      // For testing
      // await new Promise((res) => setTimeout(res, 10000));
      return content;
    } catch (error) {
      console.error("POST request failed:", error);
      return null; // Return null in case of error
    }
  },
  put: async <T>(url: string, body: T) => {
    try {
      const { content } = await axiosInstance
        .put<T>(encodeURI(url), body)
        .then(responseBody);
      // For testing
      // await new Promise((res) => setTimeout(res, 10000));
      // console.log("from post", content);

      return content;
    } catch (error) {
      console.error("PUT request failed:", error);
      return null; // Return null in case of error
    }
  },
  patch: async <T>(url: string) => {
    try {
      const { content } = await axiosInstance
        .patch<T>(encodeURI(url))
        .then(responseBody);
      return content;
    } catch (error) {
      console.error("PATCH request failed:", error);
      return null; // Return null in case of error
    }
  },

  // post: <T>(url: string, body: {}) =>
  //   axios.post<T>(encodeURI(url), body).then(responseBody),
  // delete: <T>(url: string) =>
  //   axios.delete<T>(encodeURI(url)).then(responseBody),
};


const academicDepartments = {
  list: () =>
    requests.get<IAcademicDepartmentResponse>(`/academic_departments`),
  create: (academicDepartment: IAcademicDepartment) =>
    requests.post<IAcademicDepartment>(
      "/academic_departments",
      academicDepartment
    ),
  update: (id: number, academicDepartment: IAcademicDepartment) =>
    requests.put<IAcademicDepartment>(
      `/academic_departments?id=${id}`,
      academicDepartment
    ),
  import: (academicDepartments: any) =>
    requests.post<any>("/academic_departments/import", academicDepartments),
};

const users = {
  list: () =>
    requests.get<IResponse<IUser>>(`/users`),
  create: (user: IUser) =>
    requests.post<IUser>(
      "/users",
      user
    ),
  update: (id: number, user: IUser) =>
    requests.put<IUser>(
      `/users?id=${id}`,
      user
    ),
  import: (users: any) =>
    requests.post<any>("/users/import", users),
  admins: () =>
    requests.get<IResponse<IUser>>(`/users/admins`),
  boardMembers: () =>
    requests.get<IResponse<IUser>>(`/users/board-members`),
  reviewers: () =>
    requests.get<IResponse<IUser>>(`/users/reviewers`),
  students: () =>
    requests.get<IResponse<IUser>>(`/users/students`),
};

const apiHandler = {
  users,
};

export default apiHandler;