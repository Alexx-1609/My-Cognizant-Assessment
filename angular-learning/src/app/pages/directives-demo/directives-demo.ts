import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-directives-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './directives-demo.html',
  styleUrl: './directives-demo.css'
})
export class DirectivesDemoComponent {

  isLoggedIn = true;

  students = [
    'Utkarsh',
    'Rahul',
    'Priya',
    'Ankit'
  ];

  status = 'success';

}