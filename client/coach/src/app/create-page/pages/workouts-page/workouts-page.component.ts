import { Component, OnInit } from '@angular/core';
import { Workout } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';
import { WorkoutsService } from '../../../shared/services/workouts.service'

@Component({
  selector: 'app-workouts-page',
  templateUrl: './workouts-page.component.html',
  styleUrls: ['./workouts-page.component.sass']
})
export class WorkoutsPageComponent implements OnInit {

  workouts$: Observable<Workout[]>;

  constructor(private workoutsService: WorkoutsService) { }

  ngOnInit() {
    this.workouts$ = this.workoutsService.fetch();
  }

}
