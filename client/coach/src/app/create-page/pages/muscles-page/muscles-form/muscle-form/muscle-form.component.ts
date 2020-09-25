import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MuscleService} from "../../../../../shared/services/muscle.service";
import {IMuscle} from "../../../../../shared/interfaces";
import {MaterialInstance, MaterialService} from "../../../../../shared/services/material.service";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-muscle-form',
  templateUrl: './muscle-form.component.html',
  styleUrls: ['./muscle-form.component.css']
})
export class MuscleFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId: string;
  @ViewChild('modal', {static: false}) modalRef: ElementRef;
  @ViewChild('inputFile', {static: false}) inputFileRef: ElementRef;
  @ViewChild('textarea', {static: false}) textareaRef: ElementRef;

  positions: IMuscle[] = [];
  loading = false;
  positionId = null;
  modal: MaterialInstance;
  form: FormGroup;

  image: File;
  imagePreview;

  constructor(private positionService: MuscleService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null)
    });

    this.loading = true;
    this.positionService.fetch(this.categoryId).subscribe(
      positions => {
      this.positions = positions;
      this.loading = false;
      },
      error => {
        console.log(error)
      }
    )
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  triggerClick() {
    this.inputFileRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file)
  }

  onSelectPosition(position: IMuscle) {
    console.log(position)
    this.positionId = position._id;
    this.imagePreview = `${environment.apiUrl}/${position.imageSrc}`;
    console.log(this.form);

    this.form.patchValue({
      name: position.name,
      description: position.description
    });


    this.modal.open();

    MaterialService.updateTextInputs()
    MaterialService.textareaAutoResize(this.textareaRef)
  }

  onAddPosition() {
    this.positionId = null;
    this.form.reset({
      name: null,
      description: null
    });
    this.imagePreview = null;
    this.modal.open();

    MaterialService.updateTextInputs()
  }

  onDeletePosition(event: Event, position: IMuscle) {
    event.stopPropagation();
    const decision = confirm(`Удалить позицию "${position.name}"?`);

    if (decision) {
      this.positionService.delete(position).subscribe(
        response => {
          const index = this.positions.findIndex(p => p._id === position._id)
          this.positions.splice(index, 1);
          MaterialService.toast(response.message);
        },
        error => MaterialService.toast(error.error.message)
      )
    }
  }

  onCancel() {
    this.modal.close()
  }

  onSubmit() {
    this.form.disable();

    const newPosition: IMuscle = {
      name: this.form.value.name,
      description: this.form.value.description,
      category: this.categoryId
    };

    const completed = () => {
      this.modal.close();
      this.form.reset({name: '', cost: ''});
      this.form.enable();
    };

    if (this.positionId) {
      newPosition._id = this.positionId;

      this.positionService.update(newPosition, this.image).subscribe(
        position => {
          const index = this.positions.findIndex(p => p._id === position._id);
          this.positions[index] = position;
          MaterialService.toast('Изменения сохранены');
        },
        error =>  MaterialService.toast(error.error.message),
        completed
      )
    } else {
      this.positionService.create(newPosition , this.image).subscribe(
        position => {
          MaterialService.toast('Позиция создана');
          this.positions.push(position);
        },
        error =>  MaterialService.toast(error.error.message),
        completed
      )
    }


  }
}
