import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';


@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule, MatCardModule, MatProgressSpinnerModule, MatFormFieldModule, MatInputModule,
    MatButtonModule],
  declarations: [LoginComponent, RegisterComponent],
  exports: [LoginComponent, RegisterComponent]
})

export class AuthModule {}
