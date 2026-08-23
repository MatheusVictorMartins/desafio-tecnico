package br.com.webgis.imovel;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ImovelInexistenteException extends RuntimeException {
    public ImovelInexistenteException(Long id){
        super("Imóvel não encontrado, id: "+id);
    }
}
