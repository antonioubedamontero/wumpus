import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePageComponent } from './game-page.component';
import { BaseModule } from 'src/app/base/base.module';
import { CommonModule } from '@angular/common';

describe('GamePageComponent', () => {
  let component: GamePageComponent;
  let fixture: ComponentFixture<GamePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GamePageComponent
      ],
      imports: [
        BaseModule,
        CommonModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
