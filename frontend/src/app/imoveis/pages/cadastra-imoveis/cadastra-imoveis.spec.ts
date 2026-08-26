import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { CadastraImoveis } from './cadastra-imoveis';

describe('CadastraImoveis', () => {
  let component: CadastraImoveis;
  let fixture: ComponentFixture<CadastraImoveis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastraImoveis],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastraImoveis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
