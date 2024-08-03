import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGastoModalComponent } from './add-gasto-modal.component';

describe('AddGastoModalComponent', () => {
  let component: AddGastoModalComponent;
  let fixture: ComponentFixture<AddGastoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGastoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGastoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
