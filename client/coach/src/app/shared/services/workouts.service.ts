import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IWorkout, IMessage, IExercise} from "../interfaces";
import {Observable} from "rxjs/internal/Observable";
import {environment} from '../../../environments/environment';
import {MaterialService} from "./material.service";

@Injectable({
  providedIn: 'root'
})

export class WorkoutsService {

  workout: IWorkout

  constructor(private http: HttpClient) {}

  fetch(): Observable<IWorkout[]> {
        return this.http.get<IWorkout[]>(`${environment.apiUrl}/api/workouts`)
      }

  getById(id: string): Observable<IWorkout> {
    return this.http.get<IWorkout>(`${environment.apiUrl}/api/workouts/${id}`)
  }

  create(workout: IWorkout): Observable<IMessage> {
    return this.http.post<IMessage>(`${environment.apiUrl}/api/workouts`, workout)
  }

  update(workout: IWorkout): Observable<IMessage> {
    return this.http.patch<IMessage>(`${environment.apiUrl}/api/workouts/${workout._id}`, workout)
  }

//   delete(id: string): Observable<Message> {
//     return this.http.delete<Message>(`${environment.apiUrl}/api/muscles-group/${id}`)
//   }

  deleteExercise(event: Event, exercise: IExercise) {
    event.stopPropagation();
    const decision = confirm(`Удалить упражнение "${exercise.name}"?`);

    if (decision) {
      const candidateIndex = this.workout.exercises.findIndex(ex => ex._id === exercise._id);
      this.workout.exercises.splice(candidateIndex, 1);
      MaterialService.toast(`Упражнение ${exercise.name} удалено!`);
    }
  }
}
