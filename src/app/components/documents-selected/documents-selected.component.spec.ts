import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsSelectedComponent } from './documents-selected.component';

describe('DocumentsSelectedComponent', () => {
  let component: DocumentsSelectedComponent;
  let fixture: ComponentFixture<DocumentsSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
