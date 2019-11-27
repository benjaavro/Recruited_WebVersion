'use strict'

class TableRow{
    constructor(properties){
        this.cellNumber = properties.cellNumber;    //Adds the number of cells to the row created
        this.idSet      = properties.idSet;         //Adds ids to the cell set
        this.appendTo   = properties.appendTo;
    }

    appendRow(rowNum,cls,prefix){
        if(!prefix)
            prefix = "";

        var code =  '<tr id="tr'+prefix+rowNum+'">\n';

        if(!cls)
            cls='listen-enter';

        for (let i = 0; i < this.cellNumber; i++) {
            if(this.idSet[i].toLowerCase().indexOf("date") != -1){
                code+="\t<td><input type='date' id='"+this.idSet[i]+""+rowNum+"' class='form-control'></td>\n";
            }else{
                code+="\t<td><input type='text' id='"+this.idSet[i]+""+rowNum+"' class='form-control'></td>\n";
            }
        }

        code = code.substr(0,code.length-8);
        code+=" "+cls+"'></td>\n";    //Only last TR listens for the enter key event

        code+="</tr>";

        console.log(code);
        
        $("#"+this.appendTo).append(code);
    }

    extractTableContent(insertedRowsQty){
        var tData = [];

        for (let index = 1; index < insertedRowsQty; index++) {
            var cell = {};
            for(let i = 0; i < this.cellNumber; i++){
                cell[this.idSet[i]] = $("#"+this.idSet[i]+index).val();
            }

            tData.push(cell);
        }

        return tData;
    }

    extractTableContents(insertedRowsQty,desiredIds){
        var tData = []; 
        for (let index = 1; index < insertedRowsQty; index++) {
            var element = {};
            for(let i = 0; i < desiredIds.length; i++){
                element[desiredIds[i]] = $("#"+desiredIds[i]+index).val();
            }

            tData.push(element);
        }

        return tData;
    }

    //Assumes properties array is "aligned" with desired ids
    extractTableContentsForProps(insertedRowsQty,desiredIds,props){
        var tData = [];
        
        for (let index = 1; index <= insertedRowsQty; index++) {
            var element = {};
            for(let i = 0; i < desiredIds.length; i++){
                element[props[i]] = $("#"+desiredIds[i]+index).val();
            }
            tData.push(element);
        }

        return tData;
    }
}

module.exports = TableRow;