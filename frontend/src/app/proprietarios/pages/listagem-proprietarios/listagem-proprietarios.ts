import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { ProprietarioStore } from '../../services/proprietario-store';

@Component({
  selector: 'app-listagem-proprietarios',
  imports: [RouterLink],
  templateUrl: './listagem-proprietarios.html',
  styleUrl: './listagem-proprietarios.scss',
})
export class ListagemProprietarios implements OnInit {
  private router = inject(Router);
  private store = inject(ProprietarioStore);

  // Apelidos locais para os signals do store, só para encurtar o template
  proprietarios = this.store.proprietarios;
  carregando = this.store.carregando;

  ngOnInit() {
    this.store.carregarSeNecessario();
  }

  verImoveis(p: any) {
    this.router.navigate(['/proprietarios', p.id, 'imoveis']);
  }
}
