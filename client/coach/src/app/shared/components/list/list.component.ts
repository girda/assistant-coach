import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  @Input() list: any[];
  @Input() selectPosition

  positionId
  imagePreview

  constructor() { }

  ngOnInit(): void {

  }

  onDeletePosition() {

  }

  onSelectPosition(position) {
    this.selectPosition(position)
  
  }
}
