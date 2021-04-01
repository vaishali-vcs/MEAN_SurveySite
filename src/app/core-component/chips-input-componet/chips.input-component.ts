import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input, Output } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';

/**
 * @title Chips with input
 */
@Component({
  selector: 'chips-input-example',
  templateUrl: 'chips-input-component.html',
  styleUrls: ['chips-input-component.css'],
})
export class ChipsInputComponent {

  @Input() placeholder: string;
  @Input() onClickPlaceholder: string;
  @Input() groupsCtrl: FormControl;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  get chips() {
    return this.groupsCtrl;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.chips.setValue([...this.chips.value, value.trim()]);
      this.chips.updateValueAndValidity();
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    console.log(this.groupsCtrl.value);
  }

  remove(chip: string): void {
    const index = this.chips.value.indexOf(chip);

    if (index >= 0) {
      this.chips.value.splice(index, 1);
      this.chips.updateValueAndValidity();
    }
  }
}
