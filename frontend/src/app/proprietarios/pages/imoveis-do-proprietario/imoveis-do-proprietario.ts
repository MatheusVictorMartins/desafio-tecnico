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

  ngOnInit() {
    const id = Number(this.id());
    if (!id) return;

    // Caminho normal: veio da listagem, o proprietário já está em memória
    this.proprietario.set(this.store.porId(id));

    this.carregando.set(true);
    this.store.imoveisDo(id).subscribe((res) => {
      this.imoveis.set(res);
      this.carregando.set(false);

      // Acesso direto à URL (F5): o store está vazio, então pega o nome do próprio imóvel
      if (this.proprietario() == null && res.length > 0) {
        this.proprietario.set(res[0].proprietario);
      }
    });
  }

  endereco(i: any) {
    return i.rua + ', ' + i.numero + ' - ' + i.bairro;
  }
}
