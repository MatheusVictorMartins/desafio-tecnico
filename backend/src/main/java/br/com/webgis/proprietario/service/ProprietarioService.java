package br.com.webgis.proprietario.service;

import java.util.List;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.webgis.imovel.model.Imovel;
import br.com.webgis.imovel.repository.ImovelRepository;
import br.com.webgis.proprietario.exception.ProprietarioInexistenteException;
import br.com.webgis.proprietario.model.Proprietario;
import br.com.webgis.proprietario.repository.ProprietarioRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class ProprietarioService {
    private final ProprietarioRepository repository;
    private final ImovelRepository imovelRepository;

    public Page<Proprietario> listar(Pageable pageable){
        return repository.findAll(pageable);
    }

    public List<Imovel> listarImovel(Long id){
        if(!repository.existsById(id)){
            throw new ProprietarioInexistenteException(id);
        }
        return imovelRepository.findByProprietarioId(id);
    }

    @Transactional
    public Proprietario renomear(Long id, String novoNome){
        Proprietario proprietario = repository.findById(id).orElseThrow(() -> new ProprietarioInexistenteException(id));

        proprietario.nome = novoNome;

        return proprietario;
    }
}
