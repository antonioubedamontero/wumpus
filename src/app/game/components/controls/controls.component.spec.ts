import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsComponent } from './controls.component';
import { PipesModule } from '../../pipes/pipes.module';

describe('ControlsComponent', () => {
  let component: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ControlsComponent
      ],
      imports: [
        PipesModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
