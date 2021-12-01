/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.catalogo.Catalogo.service;

import com.catalogo.Catalogo.model.Productos;
import com.catalogo.Catalogo.repository.RepositoryProductos;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author nflopez
 */
@Service
public class ServiceProductos {
    @Autowired
    
    private RepositoryProductos mCrproductos;
    
    public List<Productos> getAll(){
        return mCrproductos.getAll();
    }
    
    public Optional<Productos> getProducto(String reference){
        return mCrproductos.getProducto(reference);
    }
    
    public Productos save(Productos productos){
        if (productos.getReference() == null) {
            return mCrproductos.save(productos);
        }else{
            Optional<Productos> evt = mCrproductos.getProducto(productos.getReference());
            if(evt.isEmpty()){
                return mCrproductos.save(productos);
            }else{
                return productos;
            }
        }
    }
    
    public Productos update(Productos productos){
        if(productos.getReference()!= null){
            Optional<Productos> evt = mCrproductos.getProducto(productos.getReference());
            if(!evt.isEmpty()){
                if(productos.getBrand() != null){
                    evt.get().setBrand(productos.getBrand());
                }
                
                if(productos.getCategory() != null){
                    evt.get().setCategory(productos.getCategory());
                }
              
                if(productos.getPresentation() != null){
                    evt.get().setPresentation(productos.getPresentation());
                }
                
                if(productos.getDescription() != null){
                    evt.get().setDescription(productos.getDescription());
                }
                
                if(productos.getAvailability() != null){
                    evt.get().setAvailability(productos.getAvailability());
                }
                
                if(productos.getPrice() != null){
                    evt.get().setPrice(productos.getPrice());
                }
                
                if(productos.getQuantity() != null){
                    evt.get().setQuantity(productos.getQuantity());
                }
                
                if(productos.getPhotography()!= null){
                    evt.get().setPhotography(productos.getPhotography());
                }
            }
            
            return mCrproductos.save(evt.get());
        }
        return productos;
    }
    
    public boolean delete(String reference){
        Optional<Productos> evt = mCrproductos.getProducto(reference);
        if(!evt.isEmpty()){
            mCrproductos.delete(reference);
            return true;
        }
        
        return false;
    }
}