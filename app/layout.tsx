"use client";
import { LayoutProvider } from "../layout/context/layoutcontext";

import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import { PrimeReactProvider, addLocale, locale } from "primereact/api";
import "primereact/resources/primereact.css";
import "../styles/demo/Demos.scss";
import "../styles/layout/layout.scss";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  addLocale("es", {
    accept: "Sí",
    addRule: "Agregar regla",
    apply: "Aplicar",
    cancel: "Cancelar",
    // choose: "Escoger",
    clear: "Limpiar",
    contains: "Contenga",
    custom: "Personalizar",
    dateAfter: "Fecha después de",
    dateBefore: "Fecha antes de",
    dateFormat: "dd/mm/yy",
    dateIs: "Fecha igual a",
    dateIsNot: "Fecha diferente a",
    dayNames: [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ],
    dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
    dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    emptyFilterMessage: "Sin opciones disponibles",
    emptyMessage: "No se han encontrado resultados",
    equals: "Igual a",
    firstDayOfWeek: 1,
    gt: "Mayor que",
    gte: "Mayor o igual a",
    lt: "Menor que",
    lte: "Menor o igual a",
    matchAll: "Coincidir todo",
    matchAny: "Coincidir con cualquiera",
    medium: "Medio",
    monthNames: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    monthNamesShort: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    noFilter: "Sin filtro",
    notContains: "No contenga",
    notEquals: "Diferente a",
    passwordPrompt: "Escriba una contraseña",
    reject: "No",
    removeRule: "Eliminar regla",
    startsWith: "Comience con",
    strong: "Fuerte",
    today: "Hoy",
    upload: "Subir",
    weak: "Débil",
    weekHeader: "Sem",
    // aria: {
    //   falseLabel: "Falso",
    //   lastPageLabel: "Última Página",
    //   nextPageLabel: "Siguiente Página",
    //   nullLabel: "No seleccionado",
    //   pageLabel: "Página {page}",
    //   previousPageLabel: "Página Anterior",
    //   trueLabel: "Verdadero",
    // },
  });

  locale("es");
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          id="theme-link"
          href={`/theme/theme-light/red/theme.css`}
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <PrimeReactProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
