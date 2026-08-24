package br.com.webgis.proprietario;

import java.time.OffsetDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


@Entity
@Table(name = "proprietario")
public class Proprietario {
    
@PrePersist
	void aoCriar(){
		this.criadoEm = OffsetDateTime.now();
		this.atualizadoEm = this.criadoEm;
	}

	@PreUpdate
	void aoAtualizar(){
		this.atualizadoEm = OffsetDateTime.now();
	}


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @NotBlank
    @Size(max = 120)
    @Column(length = 120)
    public String nome;

    @Column(name = "criado_em")
	public OffsetDateTime criadoEm;

	@Column(name = "atualizado_em")
	public OffsetDateTime atualizadoEm;
}
