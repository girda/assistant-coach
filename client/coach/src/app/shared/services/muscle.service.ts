import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { Message, Muscle } from "../interfaces";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MuscleService {
  constructor(private http: HttpClient) {

  }

  fetch(musclesGroup: string): Observable<Muscle[]> {
    return this.http.get<Muscle[]>(`${environment.apiUrl}/api/muscle/${musclesGroup}`)
  }

  create(muscle: Muscle, image?: File): Observable<Muscle> {
    const formData = new FormData();

    if (image) {
      formData.append('image', image, image.name);
    }
    for (let key in muscle) {
      formData.append(key, muscle[key]);
    }
    
    return this.http.post<Muscle>(`${environment.apiUrl}/api/muscle`, formData)
  }

  update(muscle: Muscle, image?: File): Observable<Muscle> {
    const formData = new FormData();

    if (image) {
      formData.append('image', image, image.name);
    }
    for (var key in muscle) {
      formData.append(key, muscle[key]);
    }
    return this.http.patch<Muscle>(`${environment.apiUrl}/api/muscle/${muscle._id}`, formData)
  }

  delete(muscle: Muscle): Observable<Message> {
    return this.http.delete<Message>(`${environment.apiUrl}/api/muscle/${muscle._id}`)
  }
}
