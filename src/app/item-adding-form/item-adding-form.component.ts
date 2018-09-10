import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-adding-form',
  templateUrl: './item-adding-form.component.html',
  styleUrls: ['./item-adding-form.component.css']
})
export class ItemAddingFormComponent implements OnInit {
  public addingItemForm: FormGroup;
  @Output() public addNewItem: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.addingItemForm = new FormGroup({
      addingField: new FormControl('', Validators.required)
    });
  }

  onAddNewItem(value: string) {
    if (!value) return;

    this.addNewItem.emit(value);
  }
}
