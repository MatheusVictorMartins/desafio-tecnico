import { Component, inject, output, input, signal, effect } from '@angular/core';
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
  // Emite o imóvel salvo para quem hospeda o formulário poder sincronizar o store
  salvo = output<any>();
  cancelado = output<void>();
  imovel = input<any | null>(null);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  private readonly api = 'http://localhost:8080/api/imoveis';

  mensagem = signal('');
  erro = signal('');
  editandoId = signal<number | null>(null);
  proprietarios = signal<any[]>([]);

  form = this.fb.nonNullable.group({
    proprietarioId: [null as number | null, Validators.required],
    municipio: ['', [Validators.required, Validators.maxLength(120)]],
    uf: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{2}$/)]],
    bairro: ['', Validators.maxLength(100)],
    rua: ['', Validators.maxLength(150)],
    numero: ['', Validators.maxLength(10)],
    // required porque a entidade do backend marca latitude/longitude com @NotNull
    latitude: [
      null as number | null,
      [Validators.required, Validators.min(-90), Validators.max(90)],
    ],
    longitude: [
      null as number | null,
      [Validators.required, Validators.min(-180), Validators.max(180)],
    ],
    areaM2: [null as number | null, Validators.min(0)],
    ativo: [true],
  });

  // Pegar dados do imovel por effect
  // ngOnInit não conseguiria lidar
  constructor() {
    this.http
      .get<any[]>('http://localhost:8080/api/proprietarios')
      .subscribe((res) => this.proprietarios.set(res));
    effect(() => {
      const i = this.imovel();
      if (!i) return;

      this.editandoId.set(i.id);
      this.form.patchValue({ ...i, proprietarioId: i.proprietario?.id ?? null });
    });
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const id = this.editandoId();
    const dados = this.form.getRawValue();

    // O backend valida UF com [A-Z]{2}; aqui o usuário pode digitar minúsculo
    dados.uf = dados.uf.toUpperCase();

    const corpo = {
      ...dados,
      proprietario: { id: dados.proprietarioId },
    };

    const requisicao =
      id != null ? this.http.put(this.api + '/' + id, corpo) : this.http.post(this.api, corpo);

    this.erro.set('');

    requisicao.subscribe({
      next: (res) => {
        this.mensagem.set(id != null ? 'Imóvel atualizado!' : 'Imóvel cadastrado!');
        this.limpar();
        this.salvo.emit(res);
      },
      error: () => {
        this.erro.set('Não foi possível salvar. Confira os campos e tente novamente.');
      },
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

  cancelar() {
    if (this.form.dirty && !confirm('Descartar o preenchimento e voltar?')) {
      return;
    }
    this.limpar();
    this.cancelado.emit();
  }
}
