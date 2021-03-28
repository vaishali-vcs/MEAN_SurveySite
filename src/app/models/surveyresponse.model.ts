export interface SurveyResponseSchema {
  surveyid: string;
  questions: QuestionAnswerSchema[];
}

export interface QuestionAnswerSchema {
  question: string;
  answer: string;
}
