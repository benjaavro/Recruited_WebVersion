function showMessageDialog(id,msg){
    $(id).html("<span class='alert alert-danger'>"+msg+"</span>");
}

function clearMessageDialog(id){
    $(id).html("");
}

module.exports = {
    showMessageDialog: showMessageDialog,
    clearMessageDialog: clearMessageDialog
}