import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MusclesGroupService} from "../../../../shared/services/muscles-group.service";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import {MaterialService} from "../../../../shared/services/material.service";
import {MusclesGroup} from "../../../../shared/interfaces";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-muscles-form',
  templateUrl: './muscles-form.component.html',
  styleUrls: ['./muscles-form.component.css']
})
export class MusclesFormComponent implements OnInit {

  classMod: string = "small";
  form: FormGroup;
  isLoaded= false;
  isNew = true;
  musclesGroup: MusclesGroup;
  environment = environment;

  constructor(private route: ActivatedRoute,
              private musclesGroupService: MusclesGroupService,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.form.disable();

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false;
              return this.musclesGroupService.getById(params['id'])
            }

            return of(null)
          }
        )
      )
      .subscribe(
        (musclesGroup: MusclesGroup) => {
          if (musclesGroup) {
            this.musclesGroup = musclesGroup;
            this.form.patchValue({
              name: musclesGroup.name
            });
            MaterialService.updateTextInputs();
          }
          
          this.isLoaded = true;
          this.form.enable();
        },
        error => {
          MaterialService.toast(error.error.message)
        }
      );
  }

  

  deleteCategory() {
    const decision  = window.confirm(`Вы уверены, что хотите удалить категорию "${this.musclesGroup.name}"`);

    if (decision) {
      this.musclesGroupService.delete(this.musclesGroup._id)
        .subscribe(
          response => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.message),
          () => this.router.navigate(['/muscles'])
        )
    }
  }

  

  onSubmit() {
    let obs$;
    this.form.disable();

    if (this.isNew) {
      obs$ = this.musclesGroupService.create(this.form.value.name)
    } else {
      obs$ = this.musclesGroupService.update(this.musclesGroup._id, this.form.value.name)
    }

    obs$.subscribe(
      musclesGroup => {
        console.log(musclesGroup);
        this.musclesGroup = musclesGroup;
        MaterialService.toast('Изменения сохранены.');
        this.form.enable();
      },
      error => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    )
  }
}