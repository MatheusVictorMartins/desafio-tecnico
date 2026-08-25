package br.com.webgis.comum;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import br.com.webgis.imovel.exception.ImovelInexistenteException;
import br.com.webgis.proprietario.exception.ProprietarioInexistenteException;

// Essa classe servirá para englobar todos os erros em um só lugar

@RestControllerAdvice
public class TratadorDeErros extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ImovelInexistenteException.class)
    public ProblemDetail imovelNaoEncontrado(ImovelInexistenteException ex){
        var p = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
        p.setTitle("Recurso não encontrado!");
        return p;
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ProblemDetail violacaoDeIntegridade(DataIntegrityViolationException ex) {
        logger.warn("Violação de integridade no banco de dados", ex);

        var p = ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT,
                "A operação viola uma restrição de integridade dos dados.");
        p.setTitle("Conflito de dados");
        return p;
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail erroInesperado(Exception ex) {
        logger.error("Erro não tratado", ex);

        var p = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR,
                "Ocorreu um erro interno. Tente novamente mais tarde.");
        p.setTitle("Erro interno do servidor");
        return p;
    }
    @ExceptionHandler(ProprietarioInexistenteException.class)
    public ProblemDetail proprietarioNaoEncontrado(ProprietarioInexistenteException ex){
        var p = ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, ex.getMessage());
        p.setTitle("Recurso não encontrado!");
        return p;
    }

}
