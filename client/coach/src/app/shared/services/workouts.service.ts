import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IWorkout, IMessage} from "../interfaces";
import {Observable} from "rxjs/internal/Observable";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class WorkoutsService {

  constructor(private http: HttpClient) {}

  fetch(): Observable<IWorkout[]> {
        return this.http.get<IWorkout[]>(`${environment.apiUrl}/api/workouts`)
      }

//   fetch(): Observable<MusclesGroup[]> {
//     return this.http.get<MusclesGroup[]>(`${environment.apiUrl}/api/muscles-group`)
//   }

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
}
