import { ChangeDetectorRef, Component, inject, input, OnInit, signal } from '@angular/core';
import { FormImoveis } from '../../components/form-imoveis/form-imoveis';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastra-imoveis',
  imports: [FormImoveis],
  templateUrl: './cadastra-imoveis.html',
  styleUrl: './cadastra-imoveis.scss',
})
export class CadastraImoveis implements OnInit {
  private router = inject(Router);
  private http = inject(HttpClient);

  // Pegar :id da rota para injeção de dados nos inputs
  id = input<string>();
  imovel = signal<any | null>(null);

  ngOnInit() {
    const id = this.id();
    if (!id) {
      return;
    }
    this.http
      .get('http://localhost:8080/api/imoveis/' + id)
      .subscribe((res) => this.imovel.set(res));
  }

  voltar() {
    this.router.navigate(['/imoveis']);
  }
}
