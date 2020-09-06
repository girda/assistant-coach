import { Component, OnInit } from '@angular/core';
import { MusclesGroupService } from "../../../shared/services/muscles-group.service";
import { MusclesGroup } from "../../../shared/interfaces";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-muscles-page',
  templateUrl: './muscles-page.component.html',
  styleUrls: ['./muscles-page.component.sass']
})
export class MusclesPageComponent implements OnInit {

  musclesGroup$: Observable<MusclesGroup[]>;

  constructor(private musclesGroupService: MusclesGroupService) { }

  ngOnInit() {
    this.musclesGroup$ = this.musclesGroupService.fetch();
  }

}
