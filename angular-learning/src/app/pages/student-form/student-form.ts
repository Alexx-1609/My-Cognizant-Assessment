import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css'
})
export class StudentFormComponent {

  studentForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.studentForm = this.fb.group({

      name: ['', Validators.required],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      course: ['', Validators.required]

    });

  }

  onSubmit() {

    if (this.studentForm.valid) {

      console.log(this.studentForm.value);

      alert("Student Registered Successfully!");

    } else {

      this.studentForm.markAllAsTouched();

    }

  }

}