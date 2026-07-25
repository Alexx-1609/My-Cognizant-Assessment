import { Component, Input } from '@angular/core';
import { CoursePipe } from '../../pipes/course-pipe';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CoursePipe],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCardComponent {

  @Input()
  course: any;

}