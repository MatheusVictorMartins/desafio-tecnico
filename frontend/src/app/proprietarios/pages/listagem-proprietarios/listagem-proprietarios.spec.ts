import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ListagemProprietarios } from './listagem-proprietarios';

describe('ListagemProprietarios', () => {
  let component: ListagemProprietarios;
  let fixture: ComponentFixture<ListagemProprietarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemProprietarios],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListagemProprietarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
