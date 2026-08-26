import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { MapaImoveis } from './mapa-imoveis';

describe('MapaImoveis', () => {
  let component: MapaImoveis;
  let fixture: ComponentFixture<MapaImoveis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaImoveis],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(MapaImoveis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
