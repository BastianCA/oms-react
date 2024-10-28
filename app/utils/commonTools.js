const {Constants} = require("../../API/constants");
const {getFilesById} = require("../../API/api-imagenes");

exports.toastShow = (
    toast,
    detail = "",
    severity = "success"
) =>{
    let summary = "Aceptado";
    if(severity==='error') summary='Error';
    if(severity==='warn') summary='Advertencia';
    if(severity==='info') summary='Información';

    toast.current?.show({
        severity: severity,
        summary: summary,
        detail: detail,
        life: 3000,
    });
}


exports.skuState = (value) => {
    if (["1", "Activo"].includes(value + "")) {
        return "Activo";
    }
    if (["5", "En trámite"].includes(value + "")) {
        return "En trámite";
    }
    return "Inactivo";
};


exports.downloadExcel = (
    endpoint,
    filename,
    callback= ()=>false
) => {
    const downloadLink = document.createElement('a');
    downloadLink.href = `${Constants.API_URL_REPORTS_XLSX}/${endpoint}`;
    downloadLink.download = filename;
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    callback()
}

exports.resolveImage =(photoID, setter)=>{
    if (["", "undefined", "null"].includes(photoID + "")){
        setter(null)
    }
    else {
        getFilesById(photoID).then((a) => {
            if(a && a.err) {
                setter(constants.IMAGE_SRC_DEFAULT);
            } else {
                setter(`${Constants.API_URL_IMAGE}/filebyid/${photoID}`);
            }
        });
    }
}

exports.blankIfNull=(value)=>{
    return value ? value : ''
}


exports.localeDays = (day, locale) =>{

    const index = {
        'Monday' :{
            es : 'Lunes'
        },
        'Tuesday' :{
            es : 'Martes'
        },
        'Wednesday' :{
            es : 'Miercoles'
        },
        'Thursday' :{
            es : 'Jueves'
        },
        'Friday' :{
            es : 'Viernes'
        },
        'Saturday' :{
            es : 'Sábado'
        },
        'Sunday' :{
            es : 'Domingo'
        },
    }
    if(index[day] && index[day][locale])
        return index[day][locale]
    return day
}
