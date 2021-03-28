export interface SurveySchema {
  id: string | null,
  name: string,
  title: string,
  created: Date,
  expires: Date,
  status: string,
  questions: QuestionSchema[]
}

export interface QuestionSchema {
  question: string,
  type: string,
  options: string[]
}

