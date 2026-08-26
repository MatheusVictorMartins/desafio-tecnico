import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-campo',
  imports: [ReactiveFormsModule],
  templateUrl: './form-campo.html',
  styleUrl: './form-campo.scss',
})
export class FormCampo {
  // Inicializa props do input
  label = input.required<string>();
  id = input.required<string>();
  controle = input.required<FormControl>();

  tipo = input<'text' | 'number' | 'email' | 'tel'>('text');
  placeholder = input('');
  maxlength = input<number | null>(null);
  erro = input('Preencha este campo');
  requerido = input(false);
}
