export interface SurveySchema {
  id: string,
  name: string,
  title: string,
  description: string,
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

