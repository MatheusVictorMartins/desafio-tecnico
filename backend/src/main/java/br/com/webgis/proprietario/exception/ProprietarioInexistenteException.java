package br.com.webgis.proprietario.exception;

public class ProprietarioInexistenteException extends RuntimeException {

    public ProprietarioInexistenteException(Long id){
        super("Proprietário não encontrado, id: "+id);
    }

}
