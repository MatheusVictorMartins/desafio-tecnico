package br.com.webgis.imovel.repository;

import br.com.webgis.imovel.model.Imovel;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ImovelRepository  extends JpaRepository<Imovel, Long>{
    List<Imovel> findAllByOrderByProprietarioNomeAsc();
    List<Imovel> findByProprietarioId(Long proprietarioId);   
}
