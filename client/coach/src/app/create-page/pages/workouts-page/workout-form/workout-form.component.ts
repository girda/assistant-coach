import {Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {MaterialService} from 'src/app/shared/services/material.service';
import {Observable} from 'rxjs';
import {IMusclesGroup, IMuscle, IWorkout, IExercise} from 'src/app/shared/interfaces';
import {MusclesGroupService} from 'src/app/shared/services/muscles-group.service';
import {MuscleService} from 'src/app/shared/services/muscle.service';
import {WorkoutsService} from "../../../../shared/services/workouts.service";
import {ActivatedRoute, Router, Params} from '@angular/router';
import {switchMap} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.sass']
})
export class WorkoutFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('musclesGroupRef', {static: false}) musclesGroupRef: ElementRef;
  @ViewChild('modal', {static: false}) modalRef: ElementRef;

  isLoaded: boolean = true;
  isNew: boolean = true;

  cssMod: string = "small";
  cssModBig: string = "big";
  defaultCountSet: number = 15;

  form: FormGroup;
  formMuscle: FormGroup;

  modal;
  materialService = MaterialService;
  currentExercise: IExercise;

  workout: IWorkout = {name: '', exercises: []};
  sets = [this.defaultCountSet, this.defaultCountSet, this.defaultCountSet];

  musclesGroup$: Observable<IMusclesGroup[]>;

  aSubMusclesGroup;
  aSubWorkoutService;

  constructor(private musclesGroupService: MusclesGroupService,
              private musclesService: MuscleService,
              private workoutService: WorkoutsService,
              private route: ActivatedRoute,
              private router: Router) {
  }


  ngOnInit(): void {

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false;
              return this.workoutService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe(
        (workout: IWorkout) => {
          if (workout) {
            this.workout = workout;
            this.form.patchValue({
              name: workout.name
            });
            MaterialService.updateTextInputs();
          }
        },
        error => {
          MaterialService.toast(error.error.message)
        }
      );

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.formMuscle = new FormGroup({
      sets: new FormControl(3, [Validators.required, Validators.min(1)]),
      set1: new FormControl(this.defaultCountSet, [Validators.required, Validators.min(1)]),
      set2: new FormControl(this.defaultCountSet, [Validators.required, Validators.min(1)]),
      set3: new FormControl(this.defaultCountSet, [Validators.required, Validators.min(1)])

    });

    this.musclesGroup$ = this.musclesGroupService.fetchWithChildren();
  }

  ngAfterViewInit() {
    this.aSubMusclesGroup = this.musclesGroup$.subscribe(res => {
      const initAccordion = () => {
        MaterialService.initAccordion(this.musclesGroupRef)
      };
      setTimeout(initAccordion, 100)
    });
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy() {
    this.modal.destroy();

    if (this.aSubMusclesGroup) {
      this.aSubMusclesGroup.unsubscribe();
    }

    if (this.aSubWorkoutService) {
      this.aSubWorkoutService.unsubscribe();
    }
  }

  openModal(exercise: IExercise) {
    this.currentExercise = exercise;
    this.modal.open();
    MaterialService.updateTextInputs()
  }

  onCancel() {
    this.modal.close();
  }

  onChangeSets() {
    const countSets = this.formMuscle.get('sets').value;

    this.sets.forEach((set, i) => {
      this.formMuscle.removeControl(`set${i + 1}`);
    });

    this.sets = [];

    for (let i = 0; i < countSets; i++) {
      this.sets.push(this.defaultCountSet)
    }
    const formValue = {sets: this.sets.length}
    this.sets.forEach((set, i) => {
      formValue[`set${i + 1}`] = set;
      this.formMuscle.addControl(`set${i + 1}`, new FormControl(null, [Validators.required, Validators.minLength(1)]));
    });

    this.formMuscle.patchValue(formValue);
    setTimeout(MaterialService.updateTextInputs, 100)
  }

  onSubmit() {
    this.workout.name = this.form.get('name').value;

    if (this.isNew) {
      this.aSubWorkoutService = this.workoutService.create(this.workout)
        .subscribe(
          res => {
            this.router.navigate(['/create/workouts']);
            MaterialService.toast(res.message);
          },
          error => {
            MaterialService.toast(error.error.message);
          })
    } else {
      this.aSubWorkoutService = this.workoutService.update(this.workout)
        .subscribe(res => {
          this.router.navigate(['/create/workouts']);
          MaterialService.toast(res.message);
        })
    }

  }

  addMuscleInList() {
    const setsLength = this.formMuscle.getRawValue().sets;
    const sets = [];
    const candidateIndex = this.workout.exercises.findIndex(exercise => exercise._id === this.currentExercise._id);

    for (let i = 0; i < setsLength; i++) {
      sets.push(this.formMuscle.get('set' + (i + 1)).value)
    }

    if (candidateIndex === -1) {
      this.workout.exercises.push({
        _id: this.currentExercise._id,
        name: this.currentExercise.name,
        sets
      });
    } else {
      this.workout.exercises[candidateIndex].name = this.currentExercise.name;
      this.workout.exercises[candidateIndex].sets = sets;
    }

    this.modal.close();
  }

  onSelectExercise(exercise: IExercise) {
    this.currentExercise = exercise;
    this.modal.open();
    MaterialService.updateTextInputs()
  }

  onDeleteExercise(event: Event, exercise: IExercise) {
    event.stopPropagation();
    const decision = confirm(`Удалить упражнение "${exercise.name}"?`);

    if (decision) {
      const candidateIndex = this.workout.exercises.findIndex(ex => ex._id === exercise._id);
      this.workout.exercises.splice(candidateIndex, 1);
      MaterialService.toast(`Упражнение ${exercise.name} удалено!`);
    }
  }

}
