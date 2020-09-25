import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MaterialService} from "../../../../shared/services/material.service";
import {ClientService} from "../../../../shared/services/client.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {IClient} from "../../../../shared/interfaces";

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.sass']
})
export class ClientFormComponent implements OnInit, OnDestroy {

  isNew: boolean = true;
  isLoaded: boolean = true;

  cssMod: string = "small";

  form: FormGroup;
  client: IClient;
  aSub;

  constructor(private clientServices: ClientService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false;
              return this.clientServices.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe(
        (client: IClient) => {
          if (client) {
            this.client = client;
            this.form.patchValue({
              name: client.name,
              price: client.price
            });
            MaterialService.updateTextInputs();
          }
        },
        error => {
          MaterialService.toast(error.error.message)
        }
      );

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      price: new FormControl(null)
    });
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable();

    this.client.name = this.form.get('name').value;
    this.client.price = this.form.get('price').value;

    if (this.isNew) {
      this.aSub = this.clientServices.create(this.client).subscribe(
        res => {
          this.router.navigate(['/create/clients']);
          MaterialService.toast(res.message);
        },
        error => {
          MaterialService.toast(error.error.message);
          this.form.enable();
        }
      )
    } else {
      this.aSub = this.clientServices.update(this.client).subscribe(
        res => {
          this.router.navigate(['/create/clients']);
          MaterialService.toast(res.message);
        },
        error => {
          MaterialService.toast(error.error.message);
          this.form.enable();
        }
      )
    }

  }

}
