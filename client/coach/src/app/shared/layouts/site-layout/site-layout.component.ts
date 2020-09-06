import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MaterialService} from "../../services/material.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.sass']
})
export class SiteLayoutComponent implements AfterViewInit {

  @ViewChild('floating', {static: false}) floatingRef: ElementRef;

  links: any[] = [
    {name: 'Ежедневник', url: 'diary'},
    {name: 'Создать', url: 'create'},
    {name: 'Клиенты', url: 'clients'},
    {name: 'Профиль', url: 'profile'},
    {name: 'История', url: 'history'},
  ];

  constructor(private auth: AuthService,
              private router: Router) { }

  ngAfterViewInit() {
    MaterialService.initializeFloatingButton(this.floatingRef)
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
