import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Workout, Message} from "../interfaces";
import {Observable} from "rxjs/internal/Observable";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class WorkoutsService {

  constructor(private http: HttpClient) {}

  fetch(): Observable<Workout[]> {
        return this.http.get<Workout[]>(`${environment.apiUrl}/api/workout`)
      }

//   fetch(): Observable<MusclesGroup[]> {
//     return this.http.get<MusclesGroup[]>(`${environment.apiUrl}/api/muscles-group`)
//   }

//   getById(id: string): Observable<MusclesGroup> {
//     return this.http.get<MusclesGroup>(`${environment.apiUrl}/api/muscles-group/${id}`)
//   }

  create(workout: Workout): Observable<Workout> {
    // const formData = new FormData();
    // formData.append('name', name);


    return this.http.post<Workout>(`${environment.apiUrl}/api/workout`, workout)
  }

//   update(id: string, name: string, image?: File): Observable<MusclesGroup> {
//     let formData = new FormData();

//     if (image) {
//       formData.append('image', image, image.name);
//     }
//     formData.append('name', name);

//     return this.http.patch<MusclesGroup>(`${environment.apiUrl}/api/muscles-group/${id}`, formData)
//   }

//   delete(id: string): Observable<Message> {
//     return this.http.delete<Message>(`${environment.apiUrl}/api/muscles-group/${id}`)
//   }
}
