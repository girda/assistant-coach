import {Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {FormGroup, FormControl, Validators, FormControlName} from '@angular/forms';
import {MaterialService} from 'src/app/shared/services/material.service';
import {Observable} from 'rxjs';
import {IMusclesGroup, IMuscle, IWorkout, IExercise, IClient} from 'src/app/shared/interfaces';
import {MusclesGroupService} from 'src/app/shared/services/muscles-group.service';
import {MuscleService} from 'src/app/shared/services/muscle.service';
import {WorkoutsService} from "../../../../shared/services/workouts.service";
import {ActivatedRoute, Router, Params} from '@angular/router';
import {switchMap} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.sass']
})
export class WorkoutFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('musclesGroupRef', {static: false}) musclesGroupRef: ElementRef;
  @ViewChild('modal', {static: false}) modalRef: ElementRef;
  @ViewChild('autocopmplete', {static: false}) autocopmpleteRef: ElementRef;
  @ViewChild('date', {static: false}) dateeRef: ElementRef;

  isLoaded: boolean = true;
  isNew: boolean = true;

  cssMod: string = "small";
  cssModBig: string = "big";

  defaultCountSet: number = 15;
  defaultCountSets: number = 3

  form: FormGroup;
  formMuscle: FormGroup;

  modal;
  materialService = MaterialService;
  currentExercise: IExercise;

  workout: IWorkout = {name: '', exercises: [], clients: []};

  defaultSets = [this.defaultCountSet, this.defaultCountSet, this.defaultCountSet];
  sets = this.defaultSets.slice();

  defaultWeights = [null, null, null];
  weights = this.defaultWeights.slice();

  musclesGroup$: Observable<IMusclesGroup[]>;
  clients$: Observable<IClient[]>

  aSubMusclesGroup$;
  aSubWorkout$;
  aSubMClients$;

  datePicker;

  dataClients;
  configClients = {
    displayKey: 'name',
    search: true,
    placeholder: 'Клиенты',
    searchPlaceholder: 'Поиск'
  };
  selectedClients = []
  constructor(private musclesGroupService: MusclesGroupService,
              private musclesService: MuscleService,
              private workoutService: WorkoutsService,
              private clintsService: ClientService,
              private route: ActivatedRoute,
              private router: Router) {
  }


  ngOnInit(): void {

    this.musclesGroup$ = this.musclesGroupService.fetchWithChildren();
    this.clients$ = this.clintsService.fetch();
    
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
            this.datePicker.setDate(this.workout.date);
            this.datePicker.setInputValue();
          }

          this.aSubMClients$ = this.clients$.subscribe(clients => {
            this.dataClients = clients.map(client => {
              if (this.workout.clients) {
                this.workout.clients.forEach(clientId => {
                  if (clientId === client._id) {
                    this.selectedClients.push({id: client._id, name: client.name})
                  }
                })
              }

              return {
                id: client._id, 
                name: client.name
              }
            });
            console.log(this.dataClients);
            
          });
        },
        error => {
          MaterialService.toast(error.error.message)
        }
      );

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      client: new FormControl(null),
      date: new FormControl(null)
    });

    this.formMuscle = new FormGroup({
      sets: new FormControl(this.defaultCountSets, [Validators.required, Validators.min(1)]),
      set1: new FormControl(this.defaultCountSet, [Validators.required, Validators.min(1)]),
      set2: new FormControl(this.defaultCountSet, [Validators.required, Validators.min(1)]),
      set3: new FormControl(this.defaultCountSet, [Validators.required, Validators.min(1)]),
      weight1: new FormControl(null),
      weight2: new FormControl(null),
      weight3: new FormControl(null)

    });

    
  }

  ngAfterViewInit() {

    this.aSubMusclesGroup$ = this.musclesGroup$.subscribe(res => {
      const initAccordion = () => {
        MaterialService.initAccordion(this.musclesGroupRef)
      };
      setTimeout(initAccordion, 100)
    });
    this.datePicker = MaterialService.initDatepicker(this.dateeRef);
    // this.datePicker.setDate(this.workout.date);
    // this.datePicker.setInputValue();
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy() {
    this.modal.destroy();
    this.datePicker.destroy();

    if (this.aSubMusclesGroup$) {
      this.aSubMusclesGroup$.unsubscribe();
    }

    if (this.aSubWorkout$) {
      this.aSubWorkout$.unsubscribe();
    }
  }

  openModal(exercise: IExercise) {
    this.sets = this.defaultSets.slice();
    this.weights = this.defaultWeights.slice()
    this.currentExercise = exercise;

    this.modal.open();
    this._updateForm()
    MaterialService.updateTextInputs()
  }

  onCancel() {
    this.modal.close();
  }

  onChangeSets() {
    const countSets = this.formMuscle.get('sets').value;

    this.sets.forEach((set, i) => {
      this.formMuscle.removeControl(`set${i + 1}`);
      this.formMuscle.removeControl(`weight${i + 1}`);
    });

    this.sets = [];

    for (let i = 0; i < countSets; i++) {
      this.sets.push(this.defaultCountSet)
    }
    
    this._updateForm()
   
    setTimeout(MaterialService.updateTextInputs, 0)
  }

  _updateForm() {
    const formValue = {sets: this.sets.length, weights: this.sets.length}

    this.sets.forEach((set, i) => {
      formValue[`set${i + 1}`] = set;
      this.formMuscle.addControl(`set${i + 1}`, new FormControl(null, [Validators.required, Validators.minLength(1)]));
    });

    this.weights.forEach((set, i) => {
      formValue[`weight${i + 1}`] = set;
      this.formMuscle.addControl(`weight${i + 1}`, new FormControl(null));
    });

    this.formMuscle.patchValue(formValue);
  }

  onSubmit() {
    this.workout.name = this.form.get('name').value;
    this.workout.clients = this.form.get('client').value.map(client => client.id);
    this.workout.date = this.datePicker.date
    
    if (this.isNew) {
      this.aSubWorkout$ = this.workoutService.create(this.workout)
        .subscribe(
          res => {
            this.router.navigate(['/create/workouts']);
            MaterialService.toast(res.message);
          },
          error => {
            MaterialService.toast(error.error.message);
          })
    } else {
      this.aSubWorkout$ = this.workoutService.update(this.workout)
        .subscribe(res => {
          this.router.navigate(['/create/workouts']);
          MaterialService.toast(res.message);
        })
    }

  }

  addMuscleInList() {
    const setsLength = this.formMuscle.getRawValue().sets;
    const sets = [];
    const weights = []
    const candidateIndex = this.workout.exercises.findIndex(exercise => exercise._id === this.currentExercise._id);

    for (let i = 0; i < setsLength; i++) {
      sets.push(this.formMuscle.get('set' + (i + 1)).value)
      weights.push(this.formMuscle.get('weight' + (i + 1)).value)
    }

    if (candidateIndex === -1) {
      this.workout.exercises.push({
        _id: this.currentExercise._id,
        name: this.currentExercise.name,
        sets,
        weights
      });
    } else {
      this.workout.exercises[candidateIndex].name = this.currentExercise.name;
      this.workout.exercises[candidateIndex].sets = sets;
      this.workout.exercises[candidateIndex].weights = weights;
    }

    this.modal.close();
  }

  onSelectExercise(exercise: IExercise) {
    console.log(exercise.weights);
    
    this.sets = exercise.sets
    this.weights = exercise.weights ? exercise.weights : this.defaultWeights.slice()
    this._updateForm()
    this.currentExercise = exercise;
    this.modal.open();
    setTimeout(MaterialService.updateTextInputs, 0)
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
