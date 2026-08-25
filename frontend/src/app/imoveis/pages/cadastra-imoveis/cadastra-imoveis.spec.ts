import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastraImoveis } from './cadastra-imoveis';

describe('CadastraImoveis', () => {
  let component: CadastraImoveis;
  let fixture: ComponentFixture<CadastraImoveis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastraImoveis],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastraImoveis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
