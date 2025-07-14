export interface IResponse<T> {
  content: T[];
}

// export interface IResponse<T> {
//   content: T[];
//   totalCount?: number; // Optional, for paginated responses
//   message?: string; // Optional, for additional information
//   success: boolean; // Indicates if the request was successful
// }