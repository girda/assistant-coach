import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
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
export class WorkoutFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('musclesGroupRef', {static: false}) musclesGroupRef: ElementRef
  @ViewChild('modal', {static: false}) modalRef: ElementRef

  isLoaded = true;
  isNew = true;

  classMod: string = "small";
  classModBig: string = "big";

  form: FormGroup;
  formMuscle: FormGroup;

  modal;

  currentMuscle: Muscle;
  currentWorkout = []; 

  musclesIdArr: any[] = [];
  musclesLocalData = null;

  // musclesGroupAccardion;
  sets = [];

  muscles$: Observable<Muscle[]>;
  musclesGroup$: Observable<MusclesGroup[]>;

  constructor(private musclesGroupService: MusclesGroupService,
              private musclesService: MuscleService) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.formMuscle = new FormGroup({
      sets: new FormControl(null, [Validators.required, Validators.minLength(1)])
    });

    this.musclesGroup$ = this.musclesGroupService.fetchWithChildren();

    this.musclesGroup$.subscribe(res => console.log(res))
  }

  ngAfterViewInit() {
    this.musclesGroup$.subscribe(res => {      
      MaterialService.initAccordion(this.musclesGroupRef)
    })

     this.modal = MaterialService.initModal(this.modalRef)
    
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  openModal(muscle: Muscle) {
    this.currentMuscle = muscle;
    this.modal.open();
    
  }

  onCancel() {
    this.modal.close();
  }

  onChangeInput() {
    const countSets = this.formMuscle.get('sets').value

    
    this.sets.forEach((set, i) => {
      this.formMuscle.removeControl(`set${i+1}`);
    })

    this.sets = [];

    for (let i = 0; i < countSets; i++) {
      this.sets.push(i+1)
    }
    this.sets.forEach((set, i) => {
      this.formMuscle.addControl(`set${set}`, new FormControl(null, [Validators.required, Validators.minLength(1)]));
    })

    console.log(this.formMuscle);
    console.log(this.sets);
    
  }

  onSubmit() {

  }

  addMuscleInList() {
    console.log(this.formMuscle.getRawValue());
    console.log(this.currentMuscle)
    const setsLength = this.formMuscle.getRawValue().sets
    const sets = []
    for (let i = 0; i < setsLength; i++) {
      sets.push(this.formMuscle.get('set' + i+1))
    }
    this.currentWorkout.push({muscle_id: this.currentMuscle._id, sets: sets, name: this.currentMuscle.name })
    this.modal.close();
  }

}
