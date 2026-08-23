package br.com.webgis.comum;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import br.com.webgis.imovel.ImovelInexistenteException;

// Essa classe servirá para englobar todos os erros em um só lugar

@RestControllerAdvice
public class TratadorDeErros extends ResponseEntityExceptionHandler {
    @ExceptionHandler(ImovelInexistenteException.class)
    public ProblemDetail imovelNaoEncontrado(ImovelInexistenteException ex){
        var p = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
        p.setTitle("Recurso não encontrado!");
        return p;
    }
}
