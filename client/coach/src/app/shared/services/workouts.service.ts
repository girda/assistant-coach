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
        return this.http.get<IWorkout[]>(`${environment.apiUrl}/api/workout`)
      }

//   fetch(): Observable<MusclesGroup[]> {
//     return this.http.get<MusclesGroup[]>(`${environment.apiUrl}/api/muscles-group`)
//   }

  getById(id: string): Observable<IWorkout> {
    return this.http.get<IWorkout>(`${environment.apiUrl}/api/workout/${id}`)
  }

  create(workout: IWorkout): Observable<IWorkout | any> {
    return this.http.post<IWorkout>(`${environment.apiUrl}/api/workout`, workout)
  }

  update(workout: IWorkout): Observable<IWorkout | any> {
    return this.http.patch<IWorkout>(`${environment.apiUrl}/api/workout/${workout._id}`, workout)
  }

//   delete(id: string): Observable<Message> {
//     return this.http.delete<Message>(`${environment.apiUrl}/api/muscles-group/${id}`)
//   }
}
