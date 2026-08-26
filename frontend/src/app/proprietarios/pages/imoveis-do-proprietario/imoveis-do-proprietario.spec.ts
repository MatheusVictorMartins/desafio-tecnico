import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ImoveisDoProprietario } from './imoveis-do-proprietario';

describe('ImoveisDoProprietario', () => {
  let component: ImoveisDoProprietario;
  let fixture: ComponentFixture<ImoveisDoProprietario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImoveisDoProprietario],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ImoveisDoProprietario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
