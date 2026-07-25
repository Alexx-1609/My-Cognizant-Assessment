import { Component } from '@angular/core';
import {
  UpperCasePipe,
  LowerCasePipe,
  TitleCasePipe,
  CurrencyPipe,
  DatePipe,
  PercentPipe,
  JsonPipe,
  SlicePipe
} from '@angular/common';

@Component({
  selector: 'app-pipes-demo',
  standalone: true,
  imports: [
    UpperCasePipe,
    LowerCasePipe,
    TitleCasePipe,
    CurrencyPipe,
    DatePipe,
    PercentPipe,
    JsonPipe,
    SlicePipe
  ],
  templateUrl: './pipes-demo.html',
  styleUrl: './pipes-demo.css'
})
export class PipesDemoComponent {

  name = 'angular learning';

  price = 2500;

  today = new Date();

  percentage = 0.85;

  student = {
    id: 101,
    name: 'Utkarsh',
    course: 'Angular'
  };

}