import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCampo } from './form-campo';

describe('FormCampo', () => {
  let component: FormCampo;
  let fixture: ComponentFixture<FormCampo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCampo],
    }).compileComponents();

    fixture = TestBed.createComponent(FormCampo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
