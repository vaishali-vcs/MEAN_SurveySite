import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ChipsInputComponent } from './chips-input-componet/chips.input-component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule, MatFormFieldModule, MatChipsModule, MatIconModule, ReactiveFormsModule],
  declarations: [ChipsInputComponent],
  exports: [ChipsInputComponent]
})

export class CoreComponentModule {}
