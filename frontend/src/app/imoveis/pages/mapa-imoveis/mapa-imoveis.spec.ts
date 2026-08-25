import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaImoveis } from './mapa-imoveis';

describe('MapaImoveis', () => {
  let component: MapaImoveis;
  let fixture: ComponentFixture<MapaImoveis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaImoveis],
    }).compileComponents();

    fixture = TestBed.createComponent(MapaImoveis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
