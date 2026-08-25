package br.com.webgis.proprietario.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.webgis.imovel.model.Imovel;
import br.com.webgis.proprietario.model.Proprietario;
import br.com.webgis.proprietario.service.ProprietarioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/proprietarios")
@CrossOrigin(origins = "*")
public class ProprietarioController {

    private final ProprietarioService service;

    @GetMapping
    public List<Proprietario> listar(){
        return service.listar();
    }

    @GetMapping("/{id}/imoveis")
    public List<Imovel> listarImoveil(@PathVariable Long id){
        return service.listarImovel(id);
    }

    @PutMapping("/{id}")
    public Proprietario renomear(@PathVariable Long id, @Valid @RequestBody Proprietario corpo){
        return service.renomear(id, corpo.nome);
    }
}


