import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImovelStore {
  private http = inject(HttpClient);
  private readonly api = 'http://localhost:8080/api/imoveis';

  imoveis = signal<any[]>([]);
  paginaAtual = signal(0);
  totalPaginas = signal(0);
  totalImoveis = signal(0);
  carregando = signal(false);
  private carregado = false;

  // Variáveis dos filtros
  filtroMunicipio = signal('');
  filtroProprietario = signal('');

  // Só busca na primeira vez, evitando requisição
  // ao voltar da edição para a listagem.
  carregarSeNecessario() {
    if (this.carregado) return;
    this.recarregar();
  }

  recarregar(pagina = 0) {
    this.carregando.set(true);
    this.http
      .get<any>(
        `${this.api}?page=${pagina}&size=10` +
          `&municipio=${encodeURIComponent(this.filtroMunicipio())}` +
          `&proprietario=${encodeURIComponent(this.filtroProprietario())}`,
      )
      .subscribe((res) => {
        this.imoveis.set(res.content);
        this.paginaAtual.set(res.number);
        this.totalPaginas.set(res.totalPages);
        this.totalImoveis.set(res.totalElements);
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
