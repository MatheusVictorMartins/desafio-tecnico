import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

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

    // O componente tem inputs obrigatórios: sem eles a renderização quebra
    fixture.componentRef.setInput('label', 'Município');
    fixture.componentRef.setInput('id', 'municipio');
    fixture.componentRef.setInput('controle', new FormControl(''));

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
