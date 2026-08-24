package br.com.webgis.proprietario;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProprietarioRepository extends JpaRepository<Proprietario, Long>{
    List<Proprietario> findAllByOrderByNomeAsc();
}