import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterViewComponent } from './enter-view.component';

describe('EnterViewComponent', () => {
  let component: EnterViewComponent;
  let fixture: ComponentFixture<EnterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
