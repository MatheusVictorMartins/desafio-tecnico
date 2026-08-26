import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { FormImoveis } from './form-imoveis';

describe('FormImoveis', () => {
  let component: FormImoveis;
  let fixture: ComponentFixture<FormImoveis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormImoveis],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(FormImoveis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
