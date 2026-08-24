import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { FormImoveis } from '../../components/form-imoveis/form-imoveis';
import { ImovelStore } from '../../services/imovel-store';

@Component({
  selector: 'app-edita-imoveis',
  imports: [FormImoveis, RouterLink],
  templateUrl: './edita-imoveis.html',
  styleUrl: './edita-imoveis.scss',
})
export class EditaImoveis implements OnInit {
  private router = inject(Router);
  private store = inject(ImovelStore);

  // Pega o :id da rota via withComponentInputBinding
  id = input<string>();
  imovel = signal<any | null>(null);

  ngOnInit() {
    const id = Number(this.id());
    if (!id) return;

    // Caminho normal: veio da listagem, o imóvel já está em memória
    const emMemoria = this.store.porId(id);
    if (emMemoria) {
      this.imovel.set(emMemoria);
      return;
    }

    // Acesso direto à URL (F5): o store está vazio, aí sim busca no servidor
    this.store.buscarPorId(id).subscribe((res) => this.imovel.set(res));
  }

  aoSalvar(imovel: any) {
    // Atualiza o cache para a listagem não precisar refazer o GET
    this.store.atualizarLocal(imovel);
    this.voltar();
  }

  voltar() {
    this.router.navigate(['/imoveis']);
  }
}
