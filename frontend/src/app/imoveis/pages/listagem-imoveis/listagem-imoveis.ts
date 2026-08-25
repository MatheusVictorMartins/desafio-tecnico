import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ImovelStore } from '../../services/imovel-store';

@Component({
  selector: 'app-listagem-imoveis',
  imports: [RouterLink],
  templateUrl: './listagem-imoveis.html',
  styleUrl: './listagem-imoveis.scss',
})
export class ListagemImoveis implements OnInit {
  private router = inject(Router);
  private store = inject(ImovelStore);
  // Pegar dados da página do store
  paginaAtual = this.store.paginaAtual;
  totalPaginas = this.store.totalPaginas;
  totalImoveis = this.store.totalImoveis;

  // Apelidos locais para os signals do store, só para encurtar o template
  imoveis = this.store.imoveis;
  carregando = this.store.carregando;

  mensagem = signal('');

  ngOnInit() {
    this.store.carregarSeNecessario();
  }

  // Método para trocar de página
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
    if (confirm('Excluir o imóvel de ' + i.proprietario + '?') == false) {
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
