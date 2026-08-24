package br.com.webgis.proprietario;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.webgis.imovel.Imovel;

@RestController
@RequestMapping("/api/proprietarios")
@CrossOrigin(origins = "*")
public class ProprietarioController {
    private ProprietarioService service;

    public ProprietarioController(ProprietarioService service){
        this.service = service;
    }

    @GetMapping
    public List<Proprietario> listar(){
        return service.listar();
    }

    @GetMapping("/{id}/imoveis")
    public List<Imovel> listarImoveil(@PathVariable Long id){
        return service.listarImovel(id);
    }
}


