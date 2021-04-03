import { Component, ViewChild, OnInit } from '@angular/core'
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { element } from 'protractor';
import { QuestionSchema, SurveySchema } from 'src/app/models/survey.model';
import { SurveyService } from '../../../services/survey.service';

export interface Data {
  // id: string;
  name: string;
  // title: string;
  // status: string;
}

@Component({
  selector: 'app-list-survey',
  templateUrl: './list-survey.component.html',
  styleUrls: ['./list-survey.component.css']
})
export class ListSurveyComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'edit', 'delete' ];

  serviceResponse = '';
  SurveyList: SurveySchema[] = [];
  dataSource = new MatTableDataSource<SurveySchema>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  fetchData(): void{
    this.surveyService.fetchSurveys().subscribe(data => {
      data.forEach(element =>
        {
          this.SurveyList.push(element);
        });
      this.dataSource.data = data;
      });
    }

  ngOnInit(): void {
    this.fetchData();
    console.log(this.SurveyList);
  }

  constructor(private surveyService: SurveyService) {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  RemoveSurvey(id: string): void{
    this.serviceResponse = this.surveyService.deleteSurvey(id);
    this.fetchData();
  }

  dismiss(): void{
    this.serviceResponse = '';
  }
}
