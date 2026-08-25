package br.com.webgis.imovel.repository;

import br.com.webgis.imovel.model.Imovel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ImovelRepository  extends JpaRepository<Imovel, Long>{
    Page<Imovel> findByProprietarioId(Long proprietarioId, Pageable pageable);

@Query("""
    select i from Imovel i
    where lower(i.municipio) like lower(concat('%', :municipio, '%'))
      and lower(i.proprietario.nome) like lower(concat('%', :proprietario, '%'))
    """)
    Page<Imovel> buscar(String municipio, String proprietario, Pageable pageable);
}
