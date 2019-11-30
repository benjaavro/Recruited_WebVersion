var InventoryController = require('../controller/InventoryController.js')
var ItemCategoryController = require('../controller/ItemCategoryController.js')


//TODO FACTORIZE
const inventoryController = new InventoryController();
const itemCategoryController=new ItemCategoryController();

/**
 * This function recollects all the data captured by the operator on screen
 * and configures it in an object which then returns to its caller
 */
function getDataFromScreen(){
    let item             = {};

    item.codigoBarras               = $("#codigoBarras").val();
    item.nombreProducto             = $("#nombreProducto").val();
    item.marcaProducto              = $("#marcaProducto").val();
    item.descripcionProducto        = $("#descripcionProducto").val();
    //item.tipoSalida                 = $("#tipoSalida option:selected").val();
    item.precioPromedio             = $("#precioPromedio").val();  //Nullable

    item.categoriaPrincipal         = $("#categoriaPrincipal").val();

    item.unidadDeCompra             = $("#unidadDeCompra").val();
    item.unidadDeMedida             = $("#unidadDeMedida").val();
    item.factorDeConversion         = $("#factorDeConversion").val();          //Nullable
    item.iva                        = $("input[name=iva]:checked").val();
    item.ieps                       = $("input[name=ieps]:checked").val();
    item.origen                     = $("#origen").val();
    item.maxCantidadInventarios     = $("#maxCantidadInventarios").val();
    item.minCantidadInventarios     = $("#minCantidadInventarios").val();
    item.tiempoEntrega              = $("#tiempoEntrega").val();
    item.prioridad                  = $("#prioridad option:selected").val();
    item.holgura                    = $("input[name=holgura]:checked").val();
    item.diasHolgura                = $("#diasHolgura").val();
    item.expiracion                 = $("input[name=expiracion]:checked").val();
    item.tipoRegistroSalida         = $("#tipoRegistroSalida").val();  //Nullable
    item.prodInt                    = $("input[name=prodInt]:checked").val();
    item.tiempoEsperaInterno        = $("#tiempoEsperaInterno").val();
    item.condEspecAlma              = $("#condEspecAlma").val();
    
    //item.subCategoria1              = $("#subCategoria1 option:selected").val();
    item.tipoCosto                  = $("#tipoCosto").val();  //Nullable

    //item.centroCostos               = $("#centroCostos").val();
    item.precioEstandar             = $("#precioEstandar").val();

    if(!item.diasHolgura || item.diasHolgura == '')
        item.diasHolgura = null;
    if(!item.tiempoEsperaInterno || item.tiempoEsperaInterno == '')
        item.tiempoEsperaInterno = null;
    

    return item;
}

function insertOnJoinTable(itemId){
    let it = [];

    if(!$("#categoriaPrincipal").val()){
        alert("Debe seleccionar la categoría principal");
        return;
    }

    it.push({itemIdRef:itemId,idCategory:$("#categoriaPrincipal").val()});

    if(!$("#categoriaSecundaria_disp").hasClass('d-none')){
        let cS = $("#categoriaSecundaria").val();

        if(!cS){
            alert("Debe seleccionar también la categoría Secundaria");
            return;
        }

        it.push({itemIdRef:itemId,idCategory:cS});
    }

    if(!$("#categoriaTerciaria_disp").hasClass('d-none')){
        let cT = $("#categoriaTerciaria").val();

        if(!cT){
            alert("Si su articulo tiene categoria terciaria,debe seleccionarla");
            return;
        }

        it.push({itemIdRef:itemId,idCategory:cT});
    }

    if(!$("#categoriaCuaternaria_disp").hasClass('d-none')){
        let cQ = $("#categoriaCuaternaria").val();

        if(!cQ){
            alert("Si su articulo tiene categoria cuaternaria,debe seleccionarla");
            return;
        }

        it.push({itemIdRef:itemId,idCategory:cQ});
    }

    console.log(it);

    var finalCategoriesArr = [];

    it.forEach(function(item){
        let im = [];
        im.push(item.idCategory);
        im.push(item.itemIdRef);

        finalCategoriesArr.push(im);
    });
    
    itemCategoryController.saveCategoriesArr(finalCategoriesArr).then(
        success=>{
            console.log(success);
            $("#registerItem").prop('disabled', true);
        },err=>{
            alert("Hubo un error al guardar las categorías del artículo, favor de reportar.");
            $("#registerItem").prop('disabled', true);
        }
    );
}

$(document).ready(function(){
   // console.log(InventoryController.createDbInventory());

    //Orchestrator for the cow registration event
    $("#registerItem").click(()=>{
        var item = getDataFromScreen();
        
        if(!item || item === null){
            alert("Error, alguno de los campos no es válido");
            return;
        }else{
            console.log(item);

            inventoryController.storeItem(item).then(
                (success)=>{
                    console.log(success);

                    insertOnJoinTable(item.codigoBarras);
                    alert("Se registró correctamente el inventario");
                },err=>{
                    console.log(err);
                    alert("Hubo un error al tratar de guardar los datos");
                }
            )
        }
    })   
})