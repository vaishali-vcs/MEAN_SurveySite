export interface SurveyResponseSchema {
  responseid: string | null;
  surveyid: string | null;
  createdby: string;
  createdon: Date;
  questions: QuestionAnswerSchema[];
}

export interface QuestionAnswerSchema {
  question: string;
  answer: string;
}
