import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialService } from 'src/app/shared/services/material.service';
import { Observable } from 'rxjs';
import { MusclesGroup, Muscle } from 'src/app/shared/interfaces';
import { MusclesGroupService } from 'src/app/shared/services/muscles-group.service';
import { MuscleService } from 'src/app/shared/services/muscle.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.sass']
})
export class WorkoutFormComponent implements OnInit, AfterViewInit {

  @ViewChild('musclesGroupRef', {static: false}) musclesGroupRef: ElementRef

  isLoaded = true;
  isNew = true;
  classMod: string = "small";
  classModBig: string = "big";
  form: FormGroup;

  musclesIdArr: any[] = [];
  musclesLocalData = null;

  // musclesGroupAccardion;

  muscles$: Observable<Muscle[]>;
  musclesGroup$: Observable<MusclesGroup[]>;

  constructor(private musclesGroupService: MusclesGroupService,
              private musclesService: MuscleService) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.musclesGroup$ = this.musclesGroupService.fetchWithChildren();

    this.musclesGroup$.subscribe(res => console.log(res))
  }

  ngAfterViewInit() {
    this.musclesGroup$.subscribe(res => {      
       MaterialService.initAccordion(this.musclesGroupRef)
    })
    
  }

  // getMuscles(musclesId) {
  //   // console.log(musclesId);
  //   // // console.log(this.muscles);
  //   // if (this.musclesIdArr.includes(musclesId)) {

  //   //   console.log(this.musclesLocalData[musclesId]);
  //   //   return
  //   // } else {
  //     this.musclesIdArr.push(musclesId)
  //     this.muscles$ = this.musclesService.fetch(musclesId)
  //     // this.musclesGroupAccardion.onOpenStart(() => {
  //     //   console.log('WoRK')
  //     // });
      
  //     // this.muscles$.subscribe(res => {
  //     //   console.log(res);
        
  //     // })
  //     // console.log(this.musclesIdArr);
  //     // console.log(this.musclesIdArr.includes(musclesId));
  //   // }
    
  //   // this.muscles$ = this.musclesService.fetch(musclesId)
  // }

  onSubmit() {

  }

}
