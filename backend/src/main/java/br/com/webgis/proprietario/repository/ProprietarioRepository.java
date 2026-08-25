package br.com.webgis.proprietario.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.webgis.proprietario.model.Proprietario;

public interface ProprietarioRepository extends JpaRepository<Proprietario, Long>{
    List<Proprietario> findAllByOrderByNomeAsc();
}