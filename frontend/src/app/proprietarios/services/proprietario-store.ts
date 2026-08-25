import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProprietarioStore {
  private http = inject(HttpClient);
  private readonly api = 'http://localhost:8080/api/proprietarios';

  proprietarios = signal<any[]>([]);
  carregando = signal(false);
  private carregado = false;

  // Mesma ideia do ImovelStore: a lista muda pouco, então só busca na primeira vez.
  // O select do formulário de imóveis também consome daqui.
  carregarSeNecessario() {
    if (this.carregado) return;
    this.recarregar();
  }

  recarregar() {
    this.carregando.set(true);
    this.http.get<any[]>(this.api).subscribe((res) => {
      this.proprietarios.set(res);
      this.carregado = true;
      this.carregando.set(false);
    });
  }

  renomear(id: number, nome: string) {
    return this.http.put<any>(`${this.api}/${id}`, { nome });
  }

  atualizarLocal(proprietario: any) {
    this.proprietarios.update((lista) =>
      lista.map((p) => (p.id === proprietario.id ? proprietario : p)),
    );
  }

  // Busca em memória, sem ir ao servidor
  porId(id: number) {
    return this.proprietarios().find((p) => p.id === id) ?? null;
  }

  imoveisDo(id: number) {
    return this.http.get<any[]>(`${this.api}/${id}/imoveis`);
  }


}
