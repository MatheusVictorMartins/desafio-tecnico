import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemProprietarios } from './listagem-proprietarios';

describe('ListagemProprietarios', () => {
  let component: ListagemProprietarios;
  let fixture: ComponentFixture<ListagemProprietarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListagemProprietarios],
    }).compileComponents();

    fixture = TestBed.createComponent(ListagemProprietarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
