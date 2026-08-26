package br.com.webgis.imovel.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.webgis.imovel.exception.ImovelInexistenteException;
import br.com.webgis.imovel.model.Imovel;
import br.com.webgis.imovel.repository.ImovelRepository;
import br.com.webgis.proprietario.exception.ProprietarioInexistenteException;
import br.com.webgis.proprietario.model.Proprietario;
import br.com.webgis.proprietario.repository.ProprietarioRepository;
import lombok.RequiredArgsConstructor;

// @RequiredArgsConstructor gera o construtor com os campos final, no lugar da
// injeção por campo que existia antes.
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ImovelService {
	private final ImovelRepository repository;
	private final ProprietarioRepository proprietarioRepository;

	public Page<Imovel> listar(String municipio, String proprietario, Pageable pageable) {
		// Filtro vazio vira string vazia: 'like %%' casa com tudo, e assim a query
		// não precisa comparar parâmetro com null (o Postgres não infere o tipo).
		if (municipio == null || municipio.isBlank()) {
			municipio = "";
		}
		if (proprietario == null || proprietario.isBlank()) {
			proprietario = "";
		}
		return repository.buscar(municipio, proprietario, pageable);
	}

	// Sem paginação de propósito: o mapa precisa de todos os pontos de uma vez.
	public List<Imovel> listarParaMapa() {
		return repository.findAll();
	}

	public Imovel buscaImovelPorId(Long id) {
		return repository.findById(id).orElseThrow(() -> new ImovelInexistenteException(id));
	}

	@Transactional
	public Imovel criar(Imovel novo) {
		novo.id = null;
		novo.proprietario = buscaProprietario(novo.proprietario.id);
		return repository.save(novo);
	}

	@Transactional
	public Imovel atualizar(Long id, Imovel dados) {
		Imovel imovel = buscaImovelPorId(id);
		imovel.proprietario = buscaProprietario(dados.proprietario.id);
		imovel.municipio = dados.municipio;
		imovel.uf = dados.uf;
		imovel.bairro = dados.bairro;
		imovel.rua = dados.rua;
		imovel.numero = dados.numero;
		imovel.latitude = dados.latitude;
		imovel.longitude = dados.longitude;
		imovel.areaM2 = dados.areaM2;
		imovel.ativo = dados.ativo;

		// Sem save(): dentro da transação o JPA detecta a mudança e persiste sozinho.
		return imovel;
	}

	@Transactional
	public void excluir(Long id) {
		if (!repository.existsById(id)) {
			throw new ImovelInexistenteException(id);
		}
		repository.deleteById(id);
	}

	private Proprietario buscaProprietario(Long id) {
		return proprietarioRepository.findById(id).orElseThrow(() -> new ProprietarioInexistenteException(id));
	}
}
