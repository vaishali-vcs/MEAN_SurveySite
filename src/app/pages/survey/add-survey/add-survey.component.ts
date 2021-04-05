import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
  AbstractControl
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { SurveySchema, QuestionSchema } from '../../../models/survey.model';
import { SurveyService } from '../../../services/survey.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css'],
})
export class AddSurveyComponent {
  data = [];
  isDataLoaded:boolean = false;
  private mode = "create";
  private surveyId: string;
  answertype: string[] = [
    'Dropdown',
    'Text',
    'Radio Button',
    'Date Picker',
  ];
  options: ['test1', 'test2', 'Test3']
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns: string[] = ['question', 'answertype', 'options', 'remove'];
  form: FormGroup = this.fb.group({
    titleCtrl: new FormControl(''),
    descriptionCtrl: new FormControl(''),
    expiretCtrl: new FormControl(''),
    questions:this.fb.array([
      this.addQuestionFormGroup()
    ])
  });

  /** UniversityWebPagesFields */
  surveyQuestionsPlaceholder: string = 'Options';
  surveyQuestionsInputPlaceholder: string =
    'Option 1, Option 2, Option 3, Option 4';

  constructor(public surveyService: SurveyService, private fb: FormBuilder, public route: ActivatedRoute) {}

  ngOnInit() {
    this.onEditPage();
    this.data.forEach(() => this.onAddQuestion());
    this.updateView();
  }

  onEditPage(){
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("id")) {
        if(this.isDataLoaded === false){
          this.mode = "edit";
          this.surveyId = paramMap.get("id")!;
          this.surveyService.getSurvey(this.surveyId).subscribe(
            (survey: SurveySchema) => this.editSurvey(survey),
            (err:any) => console.log(err)
          );
        }else return;
      } else {
        this.mode = "create";
        this.surveyId = null!;
      }
    });
  }

  editSurvey(survey: SurveySchema){
    this.form.patchValue({
      titleCtrl: survey.title,
      descriptionCtrl:  survey.description,
      expiretCtrl: survey.expires,
    });
    this.form.setControl('questions', this.setExistingQuestions(survey.questions));
    this.updateView();
    this.isDataLoaded = true;
  }

  setExistingQuestions(questions: QuestionSchema[]): FormArray{
    const formArray = new FormArray([]);
    questions.forEach(q =>{
      formArray.push(this.fb.group({
        question: [q.question],
        type: [q.type],
        options: [q.options]
      }));
    });
    console.log(formArray);
    return formArray;
  }


  emptyTable() {
    while (this.getQuestionsFormArray().length !== 1) {
      this.getQuestionsFormArray().removeAt(0);
    }
    this.ngOnInit()
  }

  removeAt(index: number) {
    this.getQuestionsFormArray().removeAt(index);
    this.ngOnInit()
  }

  getQuestionsFormArray():FormArray{
    return (<FormArray>this.form.get('questions'));
  }

  updateView() {
    this.dataSource.next(this.getQuestionsFormArray().controls);
  }

  addQuestionFormGroup(): FormGroup {
    return this.fb.group({
      question: '',
      type: '',
      options: '',
    });
  }

  onAddQuestion():void{
    this.getQuestionsFormArray().push(this.addQuestionFormGroup());
    this.updateView();
  }

  onSaveSurvey(): void {
    if (this.form.invalid || this.form.controls.questions.value == 0 ) {
      return;
    }

    const surveyData: SurveySchema = {
      id: null!,
      name: "Name of User",
      title: this.form.controls.titleCtrl.value,
      description: this.form.controls.descriptionCtrl.value,
      created: new Date(),
      expires: this.form.controls.expiretCtrl.value,
      status: 'Created',
      questions: this.form.controls.questions.value,
    };

    if(this.mode === 'create'){
      this.surveyService.addSurvey(surveyData);
    } else{
      surveyData.id = this.surveyId;
      this.surveyService.editSurvey(surveyData);
    }

  }
}
