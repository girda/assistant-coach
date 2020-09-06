import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MusclesGroup, Message} from "../interfaces";
import {Observable} from "rxjs/internal/Observable";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MusclesGroupService {

  constructor(private http: HttpClient) {}

  fetch(): Observable<MusclesGroup[]> {
    return this.http.get<MusclesGroup[]>(`${environment.apiUrl}/api/muscles-group`)
  }

  getById(id: string): Observable<MusclesGroup> {
    return this.http.get<MusclesGroup>(`${environment.apiUrl}/api/muscles-group/${id}`)
  }

  create(name: string): Observable<MusclesGroup> {
    const formData = new FormData();
    formData.append('name', name);
    console.log(formData);
    console.log(name);
    
    return this.http.post<MusclesGroup>(`${environment.apiUrl}/api/muscles-group`, formData)
  }

  update(id: string, name: string, image?: File): Observable<MusclesGroup> {
    let formData = new FormData();

    if (image) {
      formData.append('image', image, image.name);
    }
    formData.append('name', name);

    return this.http.patch<MusclesGroup>(`${environment.apiUrl}/api/muscles-group/${id}`, formData)
  }

  delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`${environment.apiUrl}/api/muscles-group/${id}`)
  }
}
