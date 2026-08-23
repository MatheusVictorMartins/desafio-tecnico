import { ChangeDetectorRef, Component, inject, viewChild } from '@angular/core';
import { FormImoveis } from '../../components/form-imoveis/form-imoveis';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastra-imoveis',
  imports: [FormImoveis],
  templateUrl: './cadastra-imoveis.html',
  styleUrl: './cadastra-imoveis.scss',
})
export class CadastraImoveis {
  private formulario = viewChild.required(FormImoveis);
  private router = inject(Router);

  imoveis: any = [];
  carregando: any = false;
  mensagem: any = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  voltar() {
    this.router.navigate(['/imoveis']);
  }
}
