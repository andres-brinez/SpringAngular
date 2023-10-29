import { Cliente } from "src/app/clientes/Cliente";
import { Itemfactura } from "./itemfactura";

export class Factura {

    // Al declarar las propiedades de esta forma, no es necesario declararlas en el constructor para que se inicialicen
    id: number=0;
    descripcion: string='';
    observacion: string='';
    items: Array<Itemfactura> =[];
    cliente: Cliente=new Cliente();
    total: number=0;
    createAt: string='';

    // Calcular Gran Total
    calcularGranTotal():number{
        this.total=0;
        // recorre cada item obteniendo el importe de cada uno de los items y lo suma al total
        this.items.forEach((item:Itemfactura)=>{
            this.total += item.calcularImporte();
        });
        return this.total;
    }


}
