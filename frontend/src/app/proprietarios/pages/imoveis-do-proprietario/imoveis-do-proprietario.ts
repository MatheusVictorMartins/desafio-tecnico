import { Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProprietarioStore } from '../../services/proprietario-store';

@Component({
  selector: 'app-imoveis-do-proprietario',
  imports: [RouterLink],
  templateUrl: './imoveis-do-proprietario.html',
  styleUrl: './imoveis-do-proprietario.scss',
})
export class ImoveisDoProprietario implements OnInit {
  private store = inject(ProprietarioStore);

  // Pega o :id da rota via withComponentInputBinding
  id = input<string>();

  proprietario = signal<any | null>(null);
  imoveis = signal<any[]>([]);
  carregando = signal(false);
  // Pegando dados da paginação
  paginaAtual = signal(0);
  totalPaginas = signal(0);
  totalImoveis = signal(0);

  ngOnInit() {
    const id = Number(this.id());
    if (!id) return;

    // Caminho normal: veio da listagem, o proprietário já está em memória
    this.proprietario.set(this.store.porId(id));

    this.trocarPagina(0);
  }

  // Método para trocar de página
  trocarPagina(pagina: number) {
    const id = Number(this.id());
    if (!id) return;

    this.carregando.set(true);
    this.store.imoveisDo(id, pagina).subscribe((res) => {
      this.imoveis.set(res.content);
      this.paginaAtual.set(res.number);
      this.totalPaginas.set(res.totalPages);
      this.totalImoveis.set(res.totalElements);
      this.carregando.set(false);

      // Acesso direto à URL (F5): o store está vazio, então pega o nome do próprio imóvel
      if (this.proprietario() == null && res.content.length > 0) {
        this.proprietario.set(res.content[0].proprietario);
      }
    });
  }

  endereco(i: any) {
    return i.rua + ', ' + i.numero + ' - ' + i.bairro;
  }
}
