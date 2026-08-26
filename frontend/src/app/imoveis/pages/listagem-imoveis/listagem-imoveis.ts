import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ImovelStore } from '../../services/imovel-store';
import { FormControl } from '@angular/forms';
import { FormCampo } from '../../components/form-campo/form-campo';

@Component({
  selector: 'app-listagem-imoveis',
  imports: [RouterLink, FormCampo],
  templateUrl: './listagem-imoveis.html',
  styleUrl: './listagem-imoveis.scss',
})
export class ListagemImoveis implements OnInit {
  private router = inject(Router);
  private store = inject(ImovelStore);

  // Apelidos locais para os signals do store, só para encurtar o template
  imoveis = this.store.imoveis;
  carregando = this.store.carregando;
  paginaAtual = this.store.paginaAtual;
  totalPaginas = this.store.totalPaginas;
  totalImoveis = this.store.totalImoveis;

  // Campos do form para os filtros
  filtroMunicipio = new FormControl('', { nonNullable: true });
  filtroProprietario = new FormControl('', { nonNullable: true });

  mensagem = signal('');

  ngOnInit() {
    this.store.carregarSeNecessario();
  }

  // Guarda o filtro no store e volta para a primeira página: filtrar estando na
  // página 4 poderia cair num resultado que só tem 1 página.
  pesquisar() {
    this.store.filtroMunicipio.set(this.filtroMunicipio.value.trim());
    this.store.filtroProprietario.set(this.filtroProprietario.value.trim());
    this.store.recarregar(0);
  }

  limpar() {
    this.filtroMunicipio.setValue('');
    this.filtroProprietario.setValue('');
    this.pesquisar();
  }

  trocarPagina(pagina: number) {
    this.store.recarregar(pagina);
  }

  totalArea() {
    let total = 0;
    const lista = this.imoveis();
    for (let i = 0; i < lista.length; i++) {
      if (lista[i].areaM2 != null) {
        total = total + Number(lista[i].areaM2);
      }
    }
    return total.toFixed(2);
  }

  editar(i: any) {
    this.router.navigate(['/imoveis', i.id, 'editar']);
  }

  excluir(i: any) {
    if (confirm('Excluir o imóvel de ' + i.proprietario.nome + '?') == false) {
      return;
    }

    this.store.excluir(i.id).subscribe(() => {
      this.mensagem.set('Imóvel excluído!');
      this.store.recarregar();
    });
  }

  endereco(i: any) {
    return i.rua + ', ' + i.numero + ' - ' + i.bairro;
  }
}
