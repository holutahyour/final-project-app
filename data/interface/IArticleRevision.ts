export interface IArticleRevision {
  id: number;
  articleName: string;
  version: string;
  dateSubmitted: Date;
  status: string;
  reviewers: IReviewer[];
}

export interface IReviewerFeedback {
  page: number;
  feedback: string | null;
  date: Date | null;
}

export interface IReviewer {
  name: string;
  feedbacks: IReviewerFeedback[];
}