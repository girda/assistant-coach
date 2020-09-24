import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialService } from 'src/app/shared/services/material.service';
import { Observable } from 'rxjs';
import { MusclesGroup, Muscle } from 'src/app/shared/interfaces';
import { MusclesGroupService } from 'src/app/shared/services/muscles-group.service';
import { MuscleService } from 'src/app/shared/services/muscle.service';
import {WorkoutsService} from "../../../../shared/services/workouts.service";

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.sass']
})
export class WorkoutFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('musclesGroupRef', {static: false}) musclesGroupRef: ElementRef;
  @ViewChild('modal', {static: false}) modalRef: ElementRef;

  isLoaded = true;
  isNew = true;

  cssMod: string = "small";
  cssModBig: string = "big";

  form: FormGroup;
  formMuscle: FormGroup;

  modal;
  materialService = MaterialService;
  currentMuscle: Muscle;
  currentWorkout = {name: '', exercises: []};

  musclesIdArr: any[] = [];
  musclesLocalData = null;

  // musclesGroupAccordion;
  sets = [15, 15, 15];

  muscles$: Observable<Muscle[]>;
  musclesGroup$: Observable<MusclesGroup[]>;

  constructor(private musclesGroupService: MusclesGroupService,
              private musclesService: MuscleService,
              private workoutService: WorkoutsService) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.formMuscle = new FormGroup({
      sets: new FormControl(3, [Validators.required, Validators.min(1)]),
      set1: new FormControl(15, [Validators.required, Validators.min(1)]),
      set2: new FormControl(15, [Validators.required, Validators.min(1)]),
      set3: new FormControl(15, [Validators.required, Validators.min(1)])

    });

    this.musclesGroup$ = this.musclesGroupService.fetchWithChildren();

    this.musclesGroup$.subscribe(res => console.log(res))
  }

  ngAfterViewInit() {
    this.musclesGroup$.subscribe(res => {
      MaterialService.initAccordion(this.musclesGroupRef)
    });

     this.modal = MaterialService.initModal(this.modalRef)

  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  openModal(muscle: Muscle) {
    this.currentMuscle = muscle;
    this.modal.open();
    MaterialService.updateTextInputs()
  }

  onCancel() {
    this.modal.close();
  }

  onChangeSets() {
    const countSets = this.formMuscle.get('sets').value;


    this.sets.forEach((set, i) => {
      this.formMuscle.removeControl(`set${i+1}`);
    })

    this.sets = [];

    for (let i = 0; i < countSets; i++) {
      this.sets.push(15)
    }
    const formValue = {sets: this.sets.length}
    this.sets.forEach((set, i) => {
      // console.log(i+1);
      formValue[`set${i+1}`] = set;
      this.formMuscle.addControl(`set${i+1}`, new FormControl(null, [Validators.required, Validators.minLength(1)]));
    });
    console.log(formValue);
    console.log(this.formMuscle);
    console.log(this.sets);
    this.formMuscle.patchValue(formValue);
    setTimeout(MaterialService.updateTextInputs, 100)

  }

  onSubmit() {
    this.currentWorkout.name = this.form.get('name').value;
    this.currentWorkout.exercises.filter(exercise => delete exercise.name);
    console.log(this.currentWorkout)
    this.workoutService.create(this.currentWorkout).subscribe(res => {
      console.log(res)
    })
  }

  addMuscleInList() {
    console.log(this.formMuscle.getRawValue());
    console.log(this.currentMuscle);
    const setsLength = this.formMuscle.getRawValue().sets;
    const sets = [];
    for (let i = 0; i < setsLength; i++) {
      sets.push(this.formMuscle.get('set' + (i+1)).value)
    }

    console.log(sets)
    this.currentWorkout.exercises.push({muscle_id: this.currentMuscle._id, sets: sets, name: this.currentMuscle.name });
    this.modal.close();
    console.log(this.currentWorkout)
  }

}
