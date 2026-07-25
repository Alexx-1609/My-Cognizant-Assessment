import { Component, OnInit } from '@angular/core';
import { CourseCardComponent } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CourseCardComponent],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit {

  courses: any[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {

    this.courseService.getCourses().subscribe({

      next: (data) => {

        this.courses = data;
        console.log(this.courses);

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

}