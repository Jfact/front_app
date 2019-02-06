import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbChildComponent } from './breadcrumb-child.component';

describe('BreadcrumbChildComponent', () => {
  let component: BreadcrumbChildComponent;
  let fixture: ComponentFixture<BreadcrumbChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
