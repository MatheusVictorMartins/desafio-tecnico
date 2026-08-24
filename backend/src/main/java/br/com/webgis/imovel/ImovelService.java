package br.com.webgis.imovel;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional(readOnly = true)

public class ImovelService{
	private final ImovelRepository repository;

	public ImovelService(ImovelRepository repository){
		this.repository = repository;
	}

	public List<Imovel> listar(){
		return repository.findAllByOrderByProprietarioAsc();
	}

	public Imovel buscaImovelPorId(long id){
		return repository.findById(id).orElseThrow(() -> new ImovelInexistenteException(id));
	}

	@Transactional
	public Imovel criar(Imovel novo){
		novo.id = null;
		return repository.save(novo);
	}

	@Transactional
	public Imovel atualizar(Long id, Imovel dados){
		Imovel imovel = buscaImovelPorId(id);
		imovel.proprietario = dados.proprietario;
		imovel.municipio = dados.municipio;
		imovel.uf = dados.uf;
		imovel.bairro = dados.bairro;
		imovel.rua = dados.rua;
		imovel.numero = dados.numero;
		imovel.latitude = dados.latitude;
		imovel.longitude = dados.longitude;
		imovel.areaM2 = dados.areaM2;
		imovel.ativo = dados.ativo;
		
		return imovel;
	}

	@Transactional
	public void excluir(Long id){
		if(!repository.existsById(id)){
			throw new ImovelInexistenteException(id);
		}
		repository.deleteById(id);
	}

	
}