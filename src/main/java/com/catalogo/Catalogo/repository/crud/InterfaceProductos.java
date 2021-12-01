/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.catalogo.Catalogo.repository.crud;

import com.catalogo.Catalogo.model.Productos;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author nflopez
 */
public interface InterfaceProductos extends CrudRepository<Productos, Integer>{
    
    public Optional <Productos> findByReference(String reference);
    
    public void deleteByReference(String reference);
    
}
