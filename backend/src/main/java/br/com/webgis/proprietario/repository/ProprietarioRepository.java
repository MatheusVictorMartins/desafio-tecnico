package br.com.webgis.proprietario.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.webgis.proprietario.model.Proprietario;

public interface ProprietarioRepository extends JpaRepository<Proprietario, Long>{
}