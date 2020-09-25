import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { IMessage, IMuscle } from "../interfaces";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MuscleService {
  constructor(private http: HttpClient) {

  }

  fetch(musclesGroup: string): Observable<IMuscle[]> {
    return this.http.get<IMuscle[]>(`${environment.apiUrl}/api/muscle/${musclesGroup}`)
  }

  create(muscle: IMuscle, image?: File): Observable<IMuscle> {
    const formData = new FormData();

    if (image) {
      formData.append('image', image, image.name);
    }
    for (let key in muscle) {
      formData.append(key, muscle[key]);
    }

    return this.http.post<IMuscle>(`${environment.apiUrl}/api/muscle`, formData)
  }

  update(muscle: IMuscle, image?: File): Observable<IMuscle> {
    const formData = new FormData();

    if (image) {
      formData.append('image', image, image.name);
    }
    for (var key in muscle) {
      formData.append(key, muscle[key]);
    }
    return this.http.patch<IMuscle>(`${environment.apiUrl}/api/muscle/${muscle._id}`, formData)
  }

  delete(muscle: IMuscle): Observable<IMessage> {
    return this.http.delete<IMessage>(`${environment.apiUrl}/api/muscle/${muscle._id}`)
  }
}
