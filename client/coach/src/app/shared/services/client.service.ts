import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IMessage, IClient} from "../interfaces";
import {Observable} from "rxjs/internal/Observable";
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

  constructor(private http: HttpClient) {}

  fetch(): Observable<IClient[]> {
    return this.http.get<IClient[]>(`${environment.apiUrl}/api/clients`)
  }

//   fetch(): Observable<MusclesGroup[]> {
//     return this.http.get<MusclesGroup[]>(`${environment.apiUrl}/api/muscles-group`)
//   }

  getById(id: string): Observable<IClient> {
    return this.http.get<IClient>(`${environment.apiUrl}/api/clients/${id}`)
  }

  create(client: IClient): Observable<IMessage> {
    return this.http.post<IMessage>(`${environment.apiUrl}/api/clients`, client)
  }

  update(client: IClient): Observable<IMessage> {
    return this.http.patch<IMessage>(`${environment.apiUrl}/api/clients/${client._id}`, client)
  }

//   delete(id: string): Observable<Message> {
//     return this.http.delete<Message>(`${environment.apiUrl}/api/muscles-group/${id}`)
//   }
}
