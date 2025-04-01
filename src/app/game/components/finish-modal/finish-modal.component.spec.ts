import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishModalComponent } from './finish-modal.component';
import { BaseModule } from '../../../base/base.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('FinishModalComponent', () => {
  let component: FinishModalComponent;
  let fixture: ComponentFixture<FinishModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FinishModalComponent
      ],
      imports: [
        BaseModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} }, // Mock de MatDialogRef
        { provide: MAT_DIALOG_DATA, useValue: { message: 'game has finished' } } // Mock de MAT_DIALOG_DATA
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishModalComponent);
    component = fixture.componentInstance;
    component.data = { message: 'game has finished' };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
