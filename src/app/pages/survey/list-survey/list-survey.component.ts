import { Component, ViewChild, OnInit } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SurveySchema } from 'src/app/models/survey.model';
import { SurveyService } from '../../../services/survey.service';

@Component({
  selector: 'app-list-survey',
  templateUrl: './list-survey.component.html',
  styleUrls: ['./list-survey.component.css']
})
export class ListSurveyComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'edit', 'delete', 'report' ];

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
  }

  constructor(private surveyService: SurveyService, public routes:Router) {
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

  editButtonClick(editId: string): void{
    this.routes.navigate(['/survey/edit-survey', editId]);
  }

  RemoveSurvey(id: string): void{
    this.serviceResponse = this.surveyService.deleteSurvey(id);
    this.fetchData();
  }

  dismiss(): void{
    this.serviceResponse = '';
  }
}
