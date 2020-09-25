import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IClient} from "../../../shared/interfaces";
import {ClientService} from "../../../shared/services/client.service";

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.sass']
})
export class ClientPageComponent implements OnInit {

  clients$: Observable<IClient[]>;

  constructor(private clientsService: ClientService) { }

  ngOnInit() {
    this.clients$ = this.clientsService.fetch();
  }

}
