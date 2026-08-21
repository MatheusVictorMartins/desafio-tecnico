import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaImoveis } from './lista-imoveis';

describe('ListaImoveis', () => {
  let component: ListaImoveis;
  let fixture: ComponentFixture<ListaImoveis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaImoveis],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaImoveis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
