import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-item-adding-form',
  templateUrl: './item-adding-form.component.html',
  styleUrls: ['./item-adding-form.component.css']
})
export class ItemAddingFormComponent implements OnInit {
  public addingItemForm: FormGroup;
  @Output() public addNewItem: EventEmitter<string> = new EventEmitter();
  @Input() public statusSwitcher: BehaviorSubject<boolean>;
  @Input() public cleaner: Subject<void>;

  constructor() { }

  ngOnInit() {
    this.addingItemForm = new FormGroup({
      addingField: new FormControl('', Validators.required)
    });

    this.statusSwitcher.subscribe(status => {
      if (status) {
        return this.addingItemForm.enable();
      }

      this.addingItemForm.disable();
    });

    this.cleaner.subscribe(() => this.addingItemForm.reset());
  }

  onAddNewItem(value: string) {
    if (!value) return;

    this.addNewItem.emit(value);
  }
}
