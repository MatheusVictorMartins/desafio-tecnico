package br.com.webgis.imovel.exception;

public class ImovelInexistenteException extends RuntimeException {
    public ImovelInexistenteException(Long id){
        super("Imóvel não encontrado, id: "+id);
    }
}
