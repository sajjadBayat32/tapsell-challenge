import { Component, input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-field-error-message',
  standalone: true,
  imports: [],
  templateUrl: './field-error-message.component.html',
  styleUrl: './field-error-message.component.scss',
})
export class FieldErrorMessageComponent {
  field = input<FormControl>();
}
