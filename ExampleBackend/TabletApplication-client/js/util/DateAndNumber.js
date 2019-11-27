/**
 * 
 * @param {Number} a 
 * @param {Number} b 
 * @param {Number} threshold 
 */
function isLooselyEqual(a,b,threshold){
    return (Math.abs(a-b) <= threshold) ? true : false;
}

function zeroPad(pad){
    if(pad < 10)
        return '0'+pad;
    else 
        return pad;
}

function dateNTime(){
    const dt = new Date();
    let yyyy = dt.getFullYear();
    let mm = zeroPad(dt.getMonth()+1);
    let dd = zeroPad(dt.getDate());

    let hh = zeroPad(dt.getHours());
    let mn = zeroPad(dt.getMinutes());
    let ss = zeroPad(dt.getSeconds());

    return yyyy+"-"+mm+"-"+dd+" "+hh+":"+mn+":"+ss;
}

function dateNoTime(){
    const dt = new Date();
    let yyyy = dt.getFullYear();
    let mm = zeroPad(dt.getMonth()+1);
    let dd = zeroPad(dt.getDate());

    return yyyy+"-"+mm+"-"+dd;
}

function formatDate(adate){
    const dtArr = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

    let dd = adate.getDate();
    let mm = dtArr[adate.getMonth()];
    let yyyy = adate.getFullYear();

    return dd+" de "+mm+" de "+yyyy+" "+adate.getHours()+":"+adate.getMinutes()+" "+adate.getSeconds();
}

Number.prototype.formatMoney = function(c, d, t){
    var n = this, 
        c = isNaN(c = Math.abs(c)) ? 2 : c, 
        d = d == undefined ? "." : d, 
        t = t == undefined ? "," : t, 
        s = n < 0 ? "-" : "", 
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
        j = (j = i.length) > 3 ? j % 3 : 0;
       return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

module.exports = {
    isLooselyEqual: isLooselyEqual,
    getDateAndTime: dateNTime,
    getDate: dateNoTime,
    formatDate: formatDate
}