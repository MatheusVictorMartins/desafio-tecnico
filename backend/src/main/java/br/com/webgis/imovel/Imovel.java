package br.com.webgis.imovel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;



import java.math.BigDecimal;
import java.time.OffsetDateTime;

import br.com.webgis.proprietario.Proprietario;

@Entity
@Table(name = "imovel")
public class Imovel {
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

	@NotNull
	@ManyToOne
	@JoinColumn(name = "proprietario_id")
	public Proprietario proprietario;

	@NotBlank
	@Size(max = 120)
	@Column(length = 120)
	public String municipio;

	@NotBlank
	@Pattern(regexp = "[A-Z]{2}", message = "{imovel.uf.formato}")
	@Column(length = 2)
	public String uf;

	@Size(max=100)
	@Column(length = 100)
	public String bairro;

	@Size(max=150)
	@Column(length = 150)
	public String rua;

	@Size(max=10)
	@Column(length = 10)
	public String numero;

	@NotNull
	@DecimalMin(value = "-90.0",message = "{imovel.latitude.faixa}" )  @DecimalMax(value = "90.0", message = "{imovel.latitude.faixa}")
	@Column(precision = 10, scale = 7)
	public BigDecimal latitude;

	@NotNull
	@DecimalMin(value = "-180.0", message = "{imovel.longitude.faixa}") @DecimalMax(value = "180.0", message = "{imovel.longitude.faixa}")
	@Column(precision = 10, scale = 7)
	public BigDecimal longitude;

	@Positive(message = "{imovel.area.positiva}")
	@Column(name = "area_m2", precision = 12, scale = 2)
	public BigDecimal areaM2;

	@NotNull
	public boolean ativo;

	@Column(name = "criado_em")
	public OffsetDateTime criadoEm;

	@Column(name = "atualizado_em")
	public OffsetDateTime atualizadoEm;
}
