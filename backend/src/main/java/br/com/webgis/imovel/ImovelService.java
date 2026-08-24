package br.com.webgis.imovel;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.webgis.proprietario.Proprietario;
import br.com.webgis.proprietario.ProprietarioInexistenteException;
import br.com.webgis.proprietario.ProprietarioRepository;

import java.util.List;


@Service
@Transactional(readOnly = true)

public class ImovelService{
	private final ImovelRepository repository;
	private final ProprietarioRepository proprietarioRepository;

	public ImovelService(ImovelRepository repository, ProprietarioRepository propRepository){
		this.repository = repository;
		this.proprietarioRepository = propRepository;
	}

	public List<Imovel> listar(){
		return repository.findAllByOrderByProprietarioNomeAsc();
	}

	public Imovel buscaImovelPorId(Long id){
		return repository.findById(id).orElseThrow(() -> new ImovelInexistenteException(id));
	}

	private Proprietario buscaProprietario(Long id){
		return proprietarioRepository.findById(id).orElseThrow(() -> new ProprietarioInexistenteException(id));
	}

	@Transactional
	public Imovel criar(Imovel novo){
		novo.id = null;
		novo.proprietario = buscaProprietario(novo.proprietario.id);
		return repository.save(novo);
	}

	@Transactional
	public Imovel atualizar(Long id, Imovel dados){
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