import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseModule } from '../../base/base.module';
import { ConfigPageComponent } from './config-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfigPageComponent', () => {
  let component: ConfigPageComponent;
  let fixture: ComponentFixture<ConfigPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ConfigPageComponent
      ],
      imports: [
        BaseModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
