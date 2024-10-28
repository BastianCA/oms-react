export abstract class Menu {
  static readonly MenuData: any = [
    {
      label: "Administración",
      icon: "pi pi-wrench",
      items: [
        {
          label: "Usuarios",
          icon: "pi pi-fw pi-users",
          to: "/maintainers/users",
          idPermission: 7,
        },
        {
          label: "Roles",
          icon: "pi pi-fw pi-user-edit",
          to: "/maintainers/permissions",
          idPermission: 8,
        },
      ],
    },
    {
      label: "Inventario",
      icon: "pi pi-fw pi-box",
      items: [
        {
          label: "Tipos de inventario",
          icon: "pi pi-fw pi-calendar",
          to: "/inventory/types",
          idPermission: 2,
        },
        {
          label: "Tipos de balance",
          icon: "pi pi-fw pi-chart-line",
          to: "/inventory/type-balance",
          idPermission: 1,
        },
        {
          label: "Código de transacción",
          icon: "pi pi-fw pi-file",
          to: "/inventory/transaction-code",
          idPermission: 3,
        },
        {
          label: "Código de reporte detalle",
          icon: "pi pi-fw pi-file",
          to: "/inventory/code-detail-report",
          idPermission: 4,
        },
        {
          label: "Código de reporte mayor",
          icon: "pi pi-fw pi-briefcase",
          to: "/inventory/code-mayor-report",
          idPermission: 5,
        },
        {
          label: "Stock de seguridad",
          icon: "pi pi-fw pi-lock",
          to: "/inventory/security-stock",
          idPermission: 6,
        },
      ],
    },
    {
      label: "Consultas",
      icon: "pi pi-fw pi-search",
      items: [
        {
          label: "Consulta estado del inventario",
          icon: "pi pi-fw pi-eye",
          to: "/queries/inventorystatus",
          idPermission: 9,
        },
        {
          label: "Consulta de saldos",
          icon: "pi pi-fw pi-money-bill",
          to: "/inventory/saldos",
          idPermission: 10,
        },
        {
          label: "Consulta de parámetros",
          icon: "pi pi-fw pi-sliders-h",
          to: "/inventory/parametros",
          idPermission: 26,
        },
        {
          label: "Consulta de errores",
          icon: "pi pi-fw pi-sliders-h",
          to: "/inventory/errores",
          idPermission: 27,
        },
      ],
    },
    {
      label: "Transacciones",
      icon: "pi pi-fw pi-exchange",
      items: [
        {
          label: "Transacciones rechazadas",
          icon: "pi pi-fw pi-times-circle",
          to: "/transactions/rejected",
          idPermission: 17,
        },
      ],
    },
    {
      label: "Agendamiento",
      icon: "pi pi-fw pi-calendar",
      items: [
        {
          label: "Configuración calendario",
          icon: "pi pi-fw pi-calendar-plus",
          to: "/schedule/calendarconfig",
          idPermission: 18,
        },
        {
          label: "Configuración horarios",
          icon: "pi pi-fw pi-clock",
          to: "/schedule/timingsconfig",
          idPermission: 19,
        },
        {
          label: "Conf. capacidad sucursal",
          icon: "pi pi-fw pi-building",
          to: "/schedule/storecapacity",
          idPermission: 20,
        },
        {
          label: "Métodos despacho",
          icon: "pi pi-fw pi-truck",
          to: "/schedule/dispatchmethods",
          idPermission: 21,
        },
      ],
    },
    {
      label: "Maestros",
      icon: "pi pi-fw pi-cog",
      items: [
        {
          label: "Sucursales",
          icon: "pi pi-fw pi-map-marker",
          to: "/master/branches",
          idPermission: 22,
        },
        {
          label: "Productos",
          icon: "pi pi-fw pi-box",
          to: "/master/products",
          idPermission: 23,
        },
        {
          label: "Localidades",
          icon: "pi pi-fw pi-compass",
          to: "/master/locations",
          idPermission: 24,
        },
      ],
    },
    {
      label: "Órdenes",
      icon: "pi pi-fw pi-list",
      items: [
        {
          label: "Consulta de órdenes",
          icon: "pi pi-fw pi-list-check",
          to: "/orders/inquiries",
          idPermission: 25,
        },
        {
          label: "Folios de trabajo",
          icon: "pi pi-fw pi-file",
          to: "/orders/workfolios",
          idPermission: 26,
        },
      ],
    },
  ];

}
