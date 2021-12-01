/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.catalogo.Catalogo.repository;

import com.catalogo.Catalogo.model.Productos;
import com.catalogo.Catalogo.repository.crud.InterfaceProductos;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 *
 * @author nflopez
 */
@Repository
public class RepositoryProductos {
    @Autowired
    private InterfaceProductos crProductos;
    
    public List<Productos> getAll(){
        return (List<Productos>) crProductos.findAll();
    }
    
    public Optional <Productos> getProducto(String reference){
        return crProductos.findByReference(reference);
    }
    
    public Productos save(Productos productos){
        return crProductos.save(productos);
    }
    
    public void delete(String reference){
        crProductos.deleteByReference(reference);
    }
}