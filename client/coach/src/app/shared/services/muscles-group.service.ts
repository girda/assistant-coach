import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IMusclesGroup, IMessage} from "../interfaces";
import {Observable} from "rxjs/internal/Observable";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MusclesGroupService {

  constructor(private http: HttpClient) {}

  fetch(): Observable<IMusclesGroup[]> {
    return this.http.get<IMusclesGroup[]>(`${environment.apiUrl}/api/muscles-group`)
  }

  fetchWithChildren(): Observable<IMusclesGroup[]> {
    return this.http.get<IMusclesGroup[]>(`${environment.apiUrl}/api/muscles-group/muscles`)
  }

  getById(id: string): Observable<IMusclesGroup> {
    return this.http.get<IMusclesGroup>(`${environment.apiUrl}/api/muscles-group/${id}`)
  }

  create(name: string): Observable<IMusclesGroup> {
    const formData = new FormData();
    formData.append('name', name);
    console.log(formData);
    console.log(name);

    return this.http.post<IMusclesGroup>(`${environment.apiUrl}/api/muscles-group`, formData)
  }

  update(id: string, name: string, image?: File): Observable<IMusclesGroup> {
    let formData = new FormData();

    if (image) {
      formData.append('image', image, image.name);
    }
    formData.append('name', name);

    return this.http.patch<IMusclesGroup>(`${environment.apiUrl}/api/muscles-group/${id}`, formData)
  }

  delete(id: string): Observable<IMessage> {
    return this.http.delete<IMessage>(`${environment.apiUrl}/api/muscles-group/${id}`)
  }
}
