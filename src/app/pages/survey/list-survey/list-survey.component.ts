import { Component, ViewChild, OnInit } from '@angular/core'
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { element } from 'protractor';
import { SurveySchema } from 'src/app/models/survey.model';
import { SurveyService } from '../../../services/survey.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-list-survey',
  templateUrl: './list-survey.component.html',
  styleUrls: ['./list-survey.component.css']
})
export class ListSurveyComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'color', 'edit', 'delete'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  serviceResponse = '';
  SurveyDataList: SurveySchema[] = [];


  fetchData():void{
    this.surveyService.fetchSurveys().subscribe(data => {

      this.SurveyDataList = data;

      /*
      data = data as SurveySchema [];
      console.log(typeof(data));

      
      data.forEach(element => {
        this.SurveyDataList.push({
          id: element.id,
          title: element.title,
          name: element.name,
          created: element.created,
          expires: element.expires,
          status: element.status,
          questions: element.questions
        });
*/
      });
    }

  ngOnInit() {
    console.log(this.SurveyDataList);
  }

  constructor(private surveyService: SurveyService) {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    this.fetchData();
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
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
    this.serviceResponse = this.surveyService.deleteSurvey('6063af6c6a6fdf08a0eb2ec8');
    // console.log('clicked');
  }

  dismiss(): void{
    this.serviceResponse = '';
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';



  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}


