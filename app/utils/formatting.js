exports.formatDollar = (value) => {
  if (value)
    return value.toLocaleString("es-ES", {
      style: "currency",
      currency: "USD",
    });
  return "";
};

exports.formatDollarV1 = (value) => {
  if (value !== null) {
    return Number(value)
      .toFixed(2)
      .toString()
      .replace(/\./g, ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else {
    return "";
  }
};

exports.numberFormat = (value) => {
  return Number(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

exports.dateYear = (myDate, separator = "/", order = "last") => {
  if (["", "undefined", "null"].includes(myDate + "")) return myDate;

  let objectDate = myDate;
  if (isNaN(myDate)) {
    objectDate = new Date(myDate);
  }
  objectDate = this.dateWithoutTimezone(objectDate);
  let day = objectDate.getDate();
  let month = objectDate.getMonth() + 1;
  let year = objectDate.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  if (order === "first") return `${year}${separator}${month}${separator}${day}`;
  //default year last
  return `${day}${separator}${month}${separator}${year}`;
};

exports.dateWithoutTimezone = (myDate) => {
  if (["", "undefined", "null"].includes(myDate + "")) return myDate;
  let date = myDate;
  if (isNaN(myDate)) {
    date = new Date(myDate);
  }

  const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
  return new Date(date.valueOf() + tzoffset);
};

exports.localDate = (value) => {
  if (["", "undefined", "null"].includes(value + "")) return "";
  const newDate = new Date(value).toLocaleDateString("es-CL", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  if (newDate + "" === "Invalid Date") return value;
  return newDate;
};

exports.localDateHour = (value) => {
  if (["", "undefined", "null"].includes(value + "")) return "";
  const newDate = new Date(value).toLocaleDateString("es-CL", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  if (newDate + "" === "Invalid Date") return value;
  return newDate;
};
exports.localDateFilter = (value, options) => {
  const fecha = new Date(value);
  if (!isNaN(fecha?.getTime())) {
    // Comprueba si la fecha es válida
    options.filterCallback(
      fecha.toLocaleDateString("es-CL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      options.index
    );
  }
};

exports.formatMiles = (value) => {
  if (value !== null && value !== undefined) {
    const formatValue = Number(value);
    return formatValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else {
    return "";
  }
};

exports.validateDate = (value) => {
  if (value !== null) {
    const dateParts = value.split("-");
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Restar 1 porque los meses van de 0 a 11
    const day = parseInt(dateParts[2]);

    const date = new Date(year, month, day);
    if (!isNaN(date.getTime())) {
      // La fecha es válida
      // console.log(date);
      return date;
    } else {
      // La fecha no es válida
      return ""; // Devolver una cadena vacía
    }
  } else {
    return "";
  }
};

exports.formatearRut = (event) => {
  let rut = event.target.value.replace(/[^\dkK]/g, ""); // Permitir solo números y la letra 'k' (minúscula o mayúscula)

  if (rut.length > 0) {
    // Extraer el dígito verificador y eliminarlo del RUT
    let digitoVerificador = rut.slice(-1);
    rut = rut.slice(0, -1);

    // Formatear Rut
    let rutFormateado =
      rut.replace(/^(\d{1,2})(\d{3})(\d{3})$/, "$1.$2.$3") + // Agregar puntos
      "-" +
      digitoVerificador; // Agregar guión y dígito verificador

    // Permitir ingresar 'k' (minúscula o mayúscula) después del último guión
    if (
      event.target.value.slice(-2) === "-k" ||
      event.target.value.slice(-2) === "-K"
    ) {
      rutFormateado += "k";
    }

    event.target.value = rutFormateado;
  }
};
