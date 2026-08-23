package br.com.webgis.imovel;

public class ImovelInexistenteException extends RuntimeException {
    public ImovelInexistenteException(Long id){
        super("Imóvel não encontrado, id: "+id);
    }
}
