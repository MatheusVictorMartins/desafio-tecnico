package br.com.webgis.proprietario;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.webgis.imovel.Imovel;
import br.com.webgis.imovel.ImovelRepository;

@Service
@Transactional(readOnly = true)
public class ProprietarioService {
    private final ProprietarioRepository repository;
    private final ImovelRepository imovelRepository;

    public ProprietarioService(ProprietarioRepository repository,ImovelRepository imovelRepository){
        this.repository = repository;
        this.imovelRepository = imovelRepository;
    }

    public List<Proprietario> listar(){
        return repository.findAllByOrderByNomeAsc();
    }

    public List<Imovel> listarImovel(Long id){
        if(!repository.existsById(id)){
            throw new ProprietarioInexistenteException(id);
        }
        return imovelRepository.findByProprietarioId(id);
    }
}
