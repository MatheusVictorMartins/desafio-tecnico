package br.com.webgis.imovel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/imoveis")
@CrossOrigin(origins = "*")
public class ImovelController {

	private final ImovelService service;

	public ImovelController(ImovelService service){
		this.service = service;
	}

	@GetMapping
	public List<Imovel> listar() {
		System.out.println("listando imoveis");
		return service.listar();
	}

	@GetMapping("/{id}")
	public Object buscar(@PathVariable Long id) {
		return service.buscaImovelPorId(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Object criar(@RequestBody Imovel corpo) {
		return service.criar(corpo);
	}

	@PutMapping("/{id}")
	public Object atualizar(@PathVariable Long id, @RequestBody Imovel corpo) {
		return service.atualizar(id, corpo);
	}

	@DeleteMapping("/{id}")
	public void excluir(@PathVariable Long id) {
		service.excluir(id);;
	}
}
