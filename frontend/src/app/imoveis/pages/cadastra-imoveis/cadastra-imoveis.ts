import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { FormImoveis } from '../../components/form-imoveis/form-imoveis';

@Component({
  selector: 'app-cadastra-imoveis',
  imports: [FormImoveis, RouterLink],
  templateUrl: './cadastra-imoveis.html',
  styleUrl: './cadastra-imoveis.scss',
})
export class CadastraImoveis {
  private router = inject(Router);

  voltar() {
    this.router.navigate(['/imoveis']);
  }
}
