import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ImovelStore } from '../../../imoveis/services/imovel-store';
import { ProprietarioStore } from '../../services/proprietario-store';

@Component({
  selector: 'app-listagem-proprietarios',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './listagem-proprietarios.html',
  styleUrl: './listagem-proprietarios.scss',
})
export class ListagemProprietarios implements OnInit {
  private router = inject(Router);
  private store = inject(ProprietarioStore);
  private imovelStore = inject(ImovelStore);

  // Apelidos locais para os signals do store, só para encurtar o template
  proprietarios = this.store.proprietarios;
  carregando = this.store.carregando;

  // id do proprietário em edição na tabela; null quando ninguém está sendo editado
  editandoId = signal<number | null>(null);
  mensagem = signal('');
  erro = signal('');

  nomeEditado = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(120)],
  });

  ngOnInit() {
    this.store.carregarSeNecessario();
  }

  verImoveis(p: any) {
    this.router.navigate(['/proprietarios', p.id, 'imoveis']);
  }

  iniciarEdicao(p: any) {
    this.editandoId.set(p.id);
    this.nomeEditado.setValue(p.nome);
    this.mensagem.set('');
    this.erro.set('');
  }

  cancelarEdicao() {
    this.editandoId.set(null);
    this.erro.set('');
  }

  salvarNome(p: any) {
    if (this.nomeEditado.invalid) {
      this.erro.set('Informe um nome com até 120 caracteres.');
      return;
    }

    const nome = this.nomeEditado.value.trim();

    if (nome == p.nome) {
      this.cancelarEdicao();
      return;
    }

    this.erro.set('');

    this.store.renomear(p.id, nome).subscribe({
      next: (res) => {
        this.store.atualizarLocal(res);

        // Cada imóvel carrega o nome do proprietário aninhado. O cache da
        // listagem de imóveis ficou com o nome antigo, então vence aqui.
        this.imovelStore.invalidar();

        this.editandoId.set(null);
        this.mensagem.set('Proprietário renomeado!');
      },
      error: () => {
        this.erro.set('Não foi possível renomear. Já existe um proprietário com esse nome?');
      },
    });
  }
}
