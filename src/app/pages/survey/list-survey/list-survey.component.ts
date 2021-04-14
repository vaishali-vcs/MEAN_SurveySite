/*
File Name: index.js
Name: Vaishali Siddeshwar
Student ID: 301172372
Date: April-12-2021
This module displays all Surveys and their Status.
*/

import { Component, ViewChild, OnInit } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SurveySchema } from 'src/app/models/survey.model';
import { SurveyService } from '../../../services/survey.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-list-survey',
  templateUrl: './list-survey.component.html',
  styleUrls: ['./list-survey.component.css']
})
export class ListSurveyComponent implements OnInit {

  // columns to display
  displayedColumnsAuths: string[] = ['title', 'description', 'status', 'edit', 'delete', 'report' ];
  displayedColumns: string[] = ['title','description', 'status' ];
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  serviceResponse = '';
  SurveyList: SurveySchema[] = [];
  dataSource = new MatTableDataSource<SurveySchema>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // get Surveys
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
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  constructor(private surveyService: SurveyService, public routes:Router, private authService: AuthService) {
  }

  // assign the datasource to table
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // function for filter functionality
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //event handler for EDIT button click
  editButtonClick(editId: string): void{
    this.routes.navigate(['/survey/edit-survey', editId]);
  }

  // event handler for DELETE button click
  RemoveSurvey(id: string): void{
    this.serviceResponse = this.surveyService.deleteSurvey(id);
    this.fetchData();
  }

  // event handler to dismiss messages displayed to user
  dismiss(): void{
    this.serviceResponse = '';
  }
}
