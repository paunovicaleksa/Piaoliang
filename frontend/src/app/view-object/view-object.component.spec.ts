import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewObjectComponent } from './view-object.component';

describe('ViewObjectComponent', () => {
  let component: ViewObjectComponent;
  let fixture: ComponentFixture<ViewObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewObjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
