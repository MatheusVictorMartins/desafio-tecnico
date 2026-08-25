package br.com.webgis.imovel.repository;

import br.com.webgis.imovel.model.Imovel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImovelRepository  extends JpaRepository<Imovel, Long>{
    Page<Imovel> findByProprietarioId(Long proprietarioId, Pageable pageable);
}
