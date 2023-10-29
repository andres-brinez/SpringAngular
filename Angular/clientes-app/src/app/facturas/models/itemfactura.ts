import { Producto } from "./producto";

export class Itemfactura {

    producto:Producto=new Producto();
    cantidad: number=1;
    importe: number=0;

    // Se calcula el importe que es el total 
    public calcularImporte():number{
        return this.cantidad*this.producto.precio;
    }

}
