import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImoveisDoProprietario } from './imoveis-do-proprietario';

describe('ImoveisDoProprietario', () => {
  let component: ImoveisDoProprietario;
  let fixture: ComponentFixture<ImoveisDoProprietario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImoveisDoProprietario],
    }).compileComponents();

    fixture = TestBed.createComponent(ImoveisDoProprietario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
