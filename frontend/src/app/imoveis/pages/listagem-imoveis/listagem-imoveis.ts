import { ChangeDetectorRef, Component, OnInit, viewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { FormImoveis } from '../../components/form-imoveis/form-imoveis';

@Component({
  selector: 'app-listagem-imoveis',
  imports: [CommonModule, RouterLink],
  templateUrl: './listagem-imoveis.html',
  styleUrl: './listagem-imoveis.scss',
})
export class ListagemImoveis implements OnInit {
  private formulario = viewChild.required(FormImoveis);

  imoveis: any = [];
  carregando: any = false;
  mensagem: any = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.carregando = true;

    this.http.get('http://localhost:8080/api/imoveis').subscribe((res: any) => {
      this.imoveis = res;
      this.carregando = false;
      console.log('imoveis', res);
      this.cdr.detectChanges();
    });
  }

  editar(i: any) {
    this.formulario().editar(i);
    window.scrollTo(0, 0);
  }

  excluir(i: any) {
    if (confirm('Excluir o imóvel de ' + i.proprietario + '?') == false) {
      return;
    }

    this.http.delete('http://localhost:8080/api/imoveis/' + i.id).subscribe((res: any) => {
      this.mensagem = 'Imóvel excluído!';

      this.http.get('http://localhost:8080/api/imoveis').subscribe((r: any) => {
        this.imoveis = r;
        this.cdr.detectChanges();
      });
    });
  }

  endereco(i: any) {
    return i.rua + ', ' + i.numero + ' - ' + i.bairro;
  }

  totalArea() {
    let total = 0;
    for (let i = 0; i < this.imoveis.length; i++) {
      if (this.imoveis[i].areaM2 != null) {
        total = total + Number(this.imoveis[i].areaM2);
      }
    }
    return total.toFixed(2);
  }
}
