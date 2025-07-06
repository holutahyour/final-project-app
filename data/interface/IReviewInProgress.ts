export interface IReviewInProgress {
  id?: number;
  code?: string;
  title: string;
  lastOpened: string;
  progress: string;
  status: string;
  submittedAt: Date;
  reviewer: string;
}

export interface IReviewInProgressResponse {
  content: IReviewInProgress[];
}
