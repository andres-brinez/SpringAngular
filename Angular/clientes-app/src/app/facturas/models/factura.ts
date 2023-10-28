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


}
