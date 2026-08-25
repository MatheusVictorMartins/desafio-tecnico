import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImovelStore {
  private http = inject(HttpClient);
  private readonly api = 'http://localhost:8080/api/imoveis';

  imoveis = signal<any[]>([]);
  carregando = signal(false);
  private carregado = false;

  // Só busca na primeira vez. É isso que evita a requisição
  // ao voltar da edição para a listagem.
  carregarSeNecessario() {
    if (this.carregado) return;
    this.recarregar();
  }

  recarregar() {
    this.carregando.set(true);
    this.http.get<any[]>(this.api).subscribe((res) => {
      this.imoveis.set(res);
      this.carregado = true;
      this.carregando.set(false);
    });
  }

  // Busca em memória, sem ir ao servidor
  porId(id: number) {
    return this.imoveis().find((i) => i.id === id) ?? null;
  }

  // Usado só quando o store está vazio (acesso direto à URL de edição)
  buscarPorId(id: number) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  excluir(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }

  // Mantém o cache coerente depois de uma edição, sem refazer o GET
  atualizarLocal(imovel: any) {
    this.imoveis.update((lista) => lista.map((i) => (i.id === imovel.id ? imovel : i)));
  }

  // Marca o cache como vencido: a próxima visita à listagem busca de novo.
  // Usado quando algo fora daqui muda um dado que os imóveis exibem — hoje,
  // o rename do proprietário, que vem aninhado em cada imóvel.
  invalidar() {
    this.carregado = false;
  }
}
