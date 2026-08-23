import { Component, inject, output, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { FormCampo } from '../form-campo/form-campo';

@Component({
  selector: 'app-form-imoveis',
  imports: [ReactiveFormsModule, FormCampo],
  templateUrl: './form-imoveis.html',
  styleUrl: './form-imoveis.scss',
})
export class FormImoveis {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  private readonly api = 'http://localhost:8080/api/imoveis';

  salvo = output<void>();

  mensagem = signal('');
  editandoId = signal<number | null>(null);

  form = this.fb.nonNullable.group({
    proprietario: ['', [Validators.required, Validators.maxLength(120)]],
    municipio: ['', [Validators.required, Validators.maxLength(120)]],
    uf: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2}$/)]],
    bairro: ['', Validators.maxLength(100)],
    rua: ['', Validators.maxLength(150)],
    numero: ['', Validators.maxLength(10)],
    latitude: [null as number | null, [Validators.min(-90), Validators.max(90)]],
    longitude: [null as number | null, [Validators.min(-180), Validators.max(180)]],
    areaM2: [null as number | null, Validators.min(0)],
    ativo: [true],
  });

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const id = this.editandoId();
    const dados = this.form.getRawValue();

    const requisicao =
      id != null ? this.http.put(this.api + '/' + id, dados) : this.http.post(this.api, dados);

    requisicao.subscribe(() => {
      this.mensagem.set(id != null ? 'Imóvel atualizado!' : 'Imóvel cadastrado!');
      this.limpar();
      this.salvo.emit();
    });
  }

  editar(imovel: any) {
    this.editandoId.set(imovel.id);
    this.form.patchValue(imovel);
  }

  limpar() {
    this.editandoId.set(null);
    this.form.reset();
  }
}
