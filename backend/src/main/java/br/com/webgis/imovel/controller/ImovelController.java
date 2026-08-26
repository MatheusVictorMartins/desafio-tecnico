package br.com.webgis.imovel.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.webgis.imovel.model.Imovel;
import br.com.webgis.imovel.service.ImovelService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/imoveis")
@CrossOrigin(origins = "*")
public class ImovelController {

	private final ImovelService service;

	@GetMapping
	public Page<Imovel> listar(
			@RequestParam(required = false) String municipio,
			@RequestParam(required = false) String proprietario,
			@PageableDefault(size = 10, sort = "id") Pageable pageable) {
		return service.listar(municipio, proprietario, pageable);
	}

	@GetMapping("/mapa")
	public List<Imovel> listarParaMapa(){
		return service.listarParaMapa();
	}

	@GetMapping("/{id}")
	public Imovel buscar(@PathVariable Long id) {
		return service.buscaImovelPorId(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Imovel criar(@Valid @RequestBody Imovel corpo) {
		return service.criar(corpo);
	}

	@PutMapping("/{id}")
	public Imovel atualizar(@PathVariable Long id,@Valid @RequestBody Imovel corpo) {
		return service.atualizar(id, corpo);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void excluir(@PathVariable Long id) {
		service.excluir(id);
	}
}
