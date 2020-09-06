import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.sass']
})
export class CreatePageComponent implements OnInit {

  feature: any[] = [
    {title: 'Тренировки', route: 'create/workouts', imgUrl: 'workouts.jpg'},
    {title: 'Групы мышц', route: 'create/muscles', imgUrl: 'muscles.jpg'},
    {title: 'Клиенты', route: 'create/clients', imgUrl: 'users.jpg'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
