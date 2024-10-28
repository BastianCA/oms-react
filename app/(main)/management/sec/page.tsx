"use client";

import {
  createNewCertificationSli,
  getCertificationData,
  getCertificationsCard,
  getComboOrganism,
  getOcSli
} from "@/API/apis";
import { useRouter } from "next/navigation";

import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Carousel, CarouselResponsiveOption } from "primereact/carousel";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";

import {
  DataTable,
  DataTableDataSelectableEvent,
  DataTableFilterMeta,
} from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

import OptionsColumn from "@/app/(main)/management/sec/components/optionsColumn";
import { Toast } from "primereact/toast";
import { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineDollar } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { IoBarcodeSharp } from "react-icons/io5";
const useUtils = require('@/app/utils')

const defaultFilters: DataTableFilterMeta = {
  batch_state_id: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
  batch_id: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
  po_id: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.EQUALS }],
  },
  sku_id: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.EQUALS }],
  },
  phase_type: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
  system_type: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
  description: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
  quantity: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
  dias_habiles: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
  monto_uf: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
  agency_name: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
  fecha_fin_ensayo: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
  ultima_gestion: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
};

const defaultNewLoteFilters: DataTableFilterMeta = {
  description: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
  sku_id: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
  system_type: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
  quantity: {
    operator: FilterOperator.AND,
    constraints: [{ value: "", matchMode: FilterMatchMode.CONTAINS }],
  },
}


export default function ManagementSEC() {
  const util = useUtils();
  const dataTable = useRef<any>(null);
  const dataTable2 = useRef<any>(null);
  const [batchs, setBatchs] = useState<any[]>([]);
  const [filteredBatchs, setFilteredBatchs] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>("none");
  const [organismCombo, setOrganismCombo] = useState<any[]>([]);
  const vaCombo = useMemo(() => [
    { value: 1, label: "Bloqueado" },
    { value: 2, label: "Desbloqueado" },], []);
  const [selectedSku, setSelectedSku] = useState<any[]>([]);
  const [fases, setFases] = useState<any[]>([]);
  const systemCombo = useMemo(() => [
    { value: 13, label: "13" },
    { value: 22, label: "22" },
  ], []);
  const [sumSku, setSumSku] = useState<number>(0);
  const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
  const [cards, setCards] = useState<any[]>([]);
  const [selectedOcSli, setSelectedOcSli] = useState<any>(null);
  const [filters2, setFilters2] = useState<DataTableFilterMeta>(defaultNewLoteFilters);

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>("");
  const [oc, setOc] = useState<any[]>([]);
  const [visibleOCDialog, setVisibleOCDialog] = useState(false);
  const toast = useRef<Toast>(null);
  const router = useRouter();

  const getRandomColor = () => {
    return "#9b4fa2";
  };

  const coloresStatus: any = {
    pendiente: {
      background: "#00DDBB",
    },
    coordinación: {
      background: "#B20093",
    },
    inspección: {
      background: "#E56A17",
    },
    laboratorio: {
      background: "#EFAE30",
    },
    observación: {
      background: "#DC05FF",
    },
    certificación: {
      background: "#005DAD",
    },
    finalizado: {
      background: "#22C55E",
    },
    amparado: {
      background: "#cc520b",
    },
    default: {
      background: getRandomColor(),
    }, // Estilo predeterminado
  };

  const colores: any = {
    pendiente: {
      background: "linear-gradient(to right, #00DDBB 15px, #fffffd 15px)",
      color: "#00DDBB",
    },
    coordinación: {
      background: "linear-gradient(to right, #B20093 15px, #fffffd 15px)",
      color: "#B20093",
    },
    inspección: {
      background: "linear-gradient(to right, #E56A17 15px, #fffffd 15px)",
      color: "#E56A17",
    },
    laboratorio: {
      background: "linear-gradient(to right, #EFAE30 15px, #fffffd 15px)",
      color: "#EFAE30",
    },
    observación: {
      background: "linear-gradient(to right, #DC05FF 15px, #fffffd 15px)",
      color: "#DC05FF",
    },
    certificación: {
      background: "linear-gradient(to right, #005DAD 15px, #fffffd 15px)",
      color: "#005DAD",
    },
    finalizado: {
      background: "linear-gradient(to right, #22C55E 15px, #fffffd 15px)",
      color: "#22C55E",
    },
    amparado: {
      background: "linear-gradient(to right, #cc520b 15px, #fffffd 15px)",
      color: "#cc520b",
    },
    default: {
      background:
        "linear-gradient(to right, " +
        getRandomColor() +
        " 15px, #fffffd 15px)",
      color: "#22C55E",
    }, // Estilo predeterminado
  };

  const responsiveOptions: CarouselResponsiveOption[] = [
    {
      breakpoint: "1400px",
      numVisible: 6,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 6,
      numScroll: 3,
    },
    {
      breakpoint: "767px",
      numVisible: 6,
      numScroll: 6,
    },
    {
      breakpoint: "575px",
      numVisible: 6,
      numScroll: 6,
    },
  ];


  useEffect(() => {
    if (!localStorage.getItem("userData")) {
      router.push("/");
    }
    const filteredFase = JSON.parse(localStorage.getItem("fases") ?? "{}");
    setFases(filteredFase.map((a: any) => ({ value: a.name, label: a.name })));
    loadTrayData()
    getComboOrganism().then(
      (data: any) => {
        if (data) {
          setOrganismCombo(data.map((e: any) => ({
            value: e.agencyName,
            label: e.agencyName,
          }))
          )
        }
      },
      (err) => {
        console.log("getComboOrganism err", err);
      }
    );

    initFilters();
    initFilters2();
    if (JSON.parse(localStorage.getItem("table-state") || "{}")) {
      dataTable.current.restoreTableState(JSON.parse(localStorage.getItem("table-state") ?? "{}"))
    }
  }, []);

  const isSelectable = (data: any) => data.sku_type_id === 1;

  const isRowSelectable = (event: DataTableDataSelectableEvent) =>
    event.data ? isSelectable(event.data) : true;

  const rowClassName = (data: any) => (isSelectable(data) ? "" : "p-disabled");

  const headerDialogTemplate = () => {
    return (
      <div className="flex justify-content-center font-bold align-items-center">
        Datos de OC en SLI
      </div>
    );
  };

  const cantBodyTemplate = (row: any) => {
    return (
      <div>
        {util.formatMiles(row.quantity)}
      </div>
    );
  };
  const loadTrayData = () => {
    setLoading(true);
    getCertificationsCard().then((a) => {
      setCards(a);
    });
    getCertificationData().then((data: any) => {
      if (data && !data.error) {
        const formatArray = data.map((objeto: any) => {
          return {
            ...objeto,
            fecha_fin_ensayo: util.dateYear(objeto.fecha_fin_ensayo),
            created_at_f: util.dateYear(objeto.created_at),
          };
        });
        setBatchs(formatArray);
        setFilteredBatchs(formatArray);

        setLoading(false);
        setLoadingButton(false);
      } else {
        setLoading(false);
        setLoadingButton(false);
      }
      setSelectedCategory("none")
    });
  }

  const clearFilter = () => {
    setSelectedCategory("none")
    loadTrayData();
    initFilters();
    dataTable.current.reset();
    localStorage.setItem("table-state", '{}');
  };

  const initFilters = () => {
    setFilters(defaultFilters);
  };

  const clearFilter2 = () => {
    initFilters2();
    dataTable2.current.reset();
  };

  const initFilters2 = () => {
    setFilters2(defaultNewLoteFilters);
  };

  const sumCertificableSku = (arr: any) => {
    return arr.reduce((accumulator: number, currentValue: any) => {
      // Verificar si el valor de sku_type_id es igual a 1
      if (currentValue.sku_type_id === 1) {
        return accumulator + 1; // Sumar 1 al acumulador
      } else {
        return accumulator;
      }
    }, 0);
  };

  const getNewBatch = (e: any) => {
    setGlobalFilterValue(e.target.value);
    if (e.target.value.length >= 3) {
      getOcSli(e.target.value).then(
        (a: any) => {
          if (a && !a?.error) {
            setOc(a);
            setSumSku(sumCertificableSku(a));
          } else {
            setOc([]);
            setSumSku(0);
          }
        },
        (err) => {
          console.log("getOcSli err", err);
        }
      );
    } else {
      setOc([]);
    }
  }

  const renderHeader2 = () => {
    return (
      <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
        <span className="p-input-icon-left ">
          <i className="pi pi-search lupa-padding" />
          <InputText
            name="global"
            value={globalFilterValue}
            onChange={(e: any) => getNewBatch(e)}
            placeholder="OC en Sistema 22"
            className="border-round-3xl"
          />
        </span>
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Limpiar filtros"
          aria-label="Filter"
          outlined
          className="border-round-3xl"
          onClick={clearFilter2}
        />
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          label="Buscar OC en SLI"
          className="border-round-3xl"
          onClick={() => {
            setVisibleOCDialog(true);
            setOc([])
            setSumSku(0)
          }}
        ></Button>
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Limpiar filtros"
          aria-label="Filter"
          outlined
          loading={loading}
          className="border-round-3xl"
          onClick={clearFilter}
        />
      </div>
    );
  };

  const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e: any) => util.localDateFilter(e.value, options)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };

  const faseBodyTemplate = (rowData: any) => {
    const estilo: any =
      coloresStatus[rowData.phase_type?.toLowerCase()] || coloresStatus.default;
    if (rowData.phase_type !== null && rowData.phase_type !== undefined) {
      return (
        <div
          className={
            "flex justify-content-center align-items-center font-bold p-2 text-lg text-white border-round dot-color "
          }
          style={{ ...estilo, width: "80%" }}
        >
          {rowData.phase_type}
        </div>
      );
    } else {
      return (
        <div>{rowData.phase_type}</div>
      )
    }
  };

  const statusBodyTemplate = (rowData: any) => {
    if (rowData.sku_type_id === 1) {
      return (
        <div className="bg-green-700 text-white font-bold text-center p-2 border-round">
          Certificable
        </div>
      );
    } else if (rowData.sku_type_id === 2) {
      return (
        <div className="bg-yellow-700 text-white font-bold text-center p-2 border-round">
          Ya existe lote
        </div>
      );
    } else {
      return (
        <div className="bg-red-700 text-white font-bold text-center p-2 border-round">
          No Certificable
        </div>
      );
    }
  };

  const onBatchSelect = (event: any) => {
    if (event !== null) {
      router.push(`/management/sec/product-management/?lote=${event.data.batch_id}`);
    }
  };

  const productTemplate = (item: any) => {
    item.total_value = Number(item.total_value).toFixed(2);
    const dollarFormat = util.formatDollarV1(item.total_value);
    const estilo: any =
      colores[item.phase_type.toLowerCase()] || colores.default;
    return (
      <div
        className={
          "card flex flex-column mr-2 border-round-3xl surface-ground card-certification-sec cursor-pointer "
          + (item.phase_type === selectedCategory ? 'border-primary-200 ' : '')
        }
        style={{
          ...estilo,
          padding: "1rem 1rem 1rem 1.5rem",
          marginBottom: "0",
          boxShadow: (item.phase_type === selectedCategory ? "rgb(0 0 0 / 46%) 10px 15px 10px -6px" : '')
        }}
        onClick={() => {
          if (selectedCategory !== item.phase_type) {
            const filteredBatchs = batchs.filter(
              (element: any) => element.phase_type === item.phase_type
            );
            setFilteredBatchs(filteredBatchs);
            setSelectedCategory(item.phase_type)
          }
          else {
            setFilteredBatchs(batchs);
            setSelectedCategory("none")
          }
        }}
      >
        <p style={{ marginBottom: "5px", fontSize: "24px", color: "#000000" }}>
          {item.phase_type
            .split(" ")
            .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </p>
        <div className="flex" style={{ color: "#000000" }}>
          <AiOutlineDollar />
          <p className="ml-1" style={{ color: "#000000" }}>
            {dollarFormat + " USD"}
          </p>
        </div>
        <div className="flex" style={{ color: "#000000" }}>
          <FiBox />
          <p className="ml-1" style={{ color: "#000000" }}>
            {util.numberFormat(item.batch_count)} Lotes
          </p>
        </div>
        <div className="flex justify-content-between">
          <div className="flex" style={{ color: "#000000" }}>
            <IoBarcodeSharp />
            <p className="ml-1">{util.numberFormat(item.sku_count)} Sku</p>
          </div>
          <FaChevronRight />
        </div>
      </div>
    );
  };

  const fasesFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Dropdown
        value={options.value}
        options={fases}
        onChange={(e: DropdownChangeEvent) =>
          options.filterCallback(e.value, options.index)
        }
        placeholder="Seleccione"
        className="p-column-filter"
        showClear
      />
    );
  };

  const organismFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {

    return (
      <Dropdown
        value={options.value}
        options={organismCombo}
        onChange={(e: DropdownChangeEvent) =>
          options.filterCallback(e.value, options.index)
        }
        placeholder="Seleccione"
        className="p-column-filter"
        showClear
      />
    );
  };
  const vaFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {

    return (
      <Dropdown
        value={options.value}
        options={vaCombo}
        onChange={(e: DropdownChangeEvent) =>
          options.filterCallback(e.value, options.index)
        }
        placeholder="Seleccione"
        className="p-column-filter"
        showClear
      />
    );
  };

  const systemFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
    return (
      <Dropdown
        value={options.value}
        options={systemCombo}
        onChange={(e: DropdownChangeEvent) =>
          options.filterCallback(e.value, options.index)
        }
        placeholder="Seleccione"
        className="p-column-filter"
        showClear
      />
    );
  };


  const batchIconsColumn = (rowData: any) => {
    return (
      <OptionsColumn
        rowData={rowData}
        handleSelect={(data: any) => {
          onBatchSelect({ data: data })
        }}
      />
    )
  }

  const batchStatusTemplate = (rowData: any) => {
    if (rowData.batch_state_id !== null) {
      return (
        <span
          className={
            "pi " +
            (rowData.batch_state_id === 1 ? "pi-lock" : "pi-lock-open") +
            " text-" +
            (rowData.batch_state_id === 1 ? "red" : "green") +
            "-500 text-xl ml-2 font-bold"
          }
        ></span>
      );
    } else {
      return "";
    }
  };

  const importBatch = () => {
    setLoadingButton(true);
    const body = {
      po_id: +selectedOcSli.po_id,
      sku_id: selectedOcSli.sku_id,
      user_id: JSON.parse(localStorage.getItem("userData") ?? "{}").id
    }
    createNewCertificationSli(body).then(a => {
      if (!a.error) {
        router.push(`/management/sec/product-management/?lote=${a.new_psd_id}`);
      } else {
        setLoadingButton(false);
        util.toastShow(toast, a.error, "error")
      }
    })
  }

  const handleState = (event: any) => {
    const filters = [
      "batch_state_id",
      "batch_id",
      "po_id",
      "sku_id",
      "phase_type",
      "system_type",
      "description",
      "quantity",
      "agency_name",
      "fecha_fin_ensayo",
      "ultima_gestion",
    ];
    for (const key of filters) {
      const value = event.filters[key]?.constraints[0]?.value;
      if (value && value !== "") {
        if (JSON.parse(localStorage.getItem("table-state") ?? "{}")) {
          localStorage.setItem("first-change", "false");
          localStorage.setItem("table-state", JSON.stringify(event));
        } else {
          localStorage.setItem("first-change", "true");
          localStorage.setItem("table-state", JSON.stringify(event));
        }
      }
    }
  };

  const handleTableChanges = () => {
    console.log("change");

  }


  return (
    <div>
      <Toast ref={toast} />
      <div style={{ fontSize: "55px" }}>Certificaciones</div>
      <Carousel
        value={cards}
        numScroll={3}
        numVisible={6}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
        showNavigators={false}
      />
      <DataTable
        removableSort
        ref={dataTable}
        value={filteredBatchs}
        size="small"
        paginator
        rows={10}
        loading={loading}
        onRowDoubleClick={onBatchSelect}
        selectionMode="single"
        stateStorage="custom"
        customSaveState={handleState}
        onValueChange={handleTableChanges}
        resizableColumns
        dataKey="batch_id"
        selection={selectedSku}
        onSelectionChange={(e) => setSelectedSku(e.value)}
        rowsPerPageOptions={[5, 10, 20, 50]}
        scrollHeight="49vh"
        scrollable
        filters={filters}
        header={renderHeader}
        emptyMessage="No se encontraron registros."
        className="bandeja-datatable"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
        currentPageReportTemplate="Mostrando del {first} a {last}, de un total de {totalRecords} resultados"
      >
        <Column
          align={"left"}
          field="batch_state_id"
          header="VA"
          sortable
          filter
          filterElement={vaFilterTemplate}
          style={{ maxWidth: "7rem" }}
          showFilterMatchModes={false}
          showFilterOperator={false}
          showAddButton={false}
          body={batchStatusTemplate}
        />
        <Column
          field="batch_id"
          header="ID Lote"
          sortable
          filter
          style={{ minWidth: "7rem" }}
          showFilterMatchModes={false}
          showFilterOperator={false}
          showAddButton={false}
        />

        <Column
          alignHeader={"center"}
          field="phase_type"
          header="Fase"
          filter
          sortable
          body={faseBodyTemplate}
          style={{ minWidth: "12rem" }}
          showFilterMatchModes={false}
          showFilterOperator={false}
          showAddButton={false}
          filterElement={fasesFilterTemplate}
        />
        <Column
          align={"center"}
          field="system_type"
          header="Sistema"
          sortable
          filter
          filterElement={systemFilterTemplate}
          style={{ minWidth: "7rem" }}
          showFilterMatchModes={false}
          showFilterOperator={false}
          showAddButton={false}
        />
        <Column
          field="po_id"
          sortable
          header="PO"
          filter
          style={{ minWidth: "7rem" }}
          showFilterMatchModes={false}
          showFilterOperator={false}
          showAddButton={false}
        />
        <Column
          field="sku_id"
          header="Sku"
          sortable
          filter
          style={{ minWidth: "7rem" }}
          showFilterMatchModes={false}
          showFilterOperator={false}
          showAddButton={false}
        />
        <Column
          field="description"
          sortable
          header="Descripción de Producto"
          style={{ minWidth: "12rem" }}
          filter
          showFilterMatchModes={false}
          showFilterOperator={false}
          showAddButton={false}
        />
        <Column
          align={"center"}
          field="quantity"
          header="Cantidad"
          sortable
          style={{ minWidth: "6rem" }}
          showFilterMatchModes={false}
          showFilterOperator={false}
          showAddButton={false}
          body={cantBodyTemplate}
        />
        <Column
          align={"center"}
          field="dias_habiles"
          header="Días"
          sortable
          style={{ minWidth: "6rem" }}
          showFilterMatchModes={false}
          showFilterOperator={false}
          showAddButton={false}
        />
        <Column
          align={"center"}
          field="monto_uf"
          header="Valor UF"
          sortable
          style={{ minWidth: "6rem" }}
          showFilterMatchModes={false}
          showFilterOperator={false}
          showAddButton={false}
        />
        <Column
          align={"center"}
          field="agency_name"
          header="Organismo"
          filter
          sortable
          style={{ minWidth: "7rem" }}
          showFilterMatchModes={false}
          filterElement={organismFilterTemplate}
          showFilterOperator={false}
          showAddButton={false}
        />

        <Column
          align={"center"}
          header="Fin Ensayo"
          field="fecha_fin_ensayo"
          sortable
          style={{ minWidth: "10rem" }}
          filter
          showFilterMatchModes={false}
          showFilterOperator={false}
          showAddButton={false}
          filterElement={dateFilterTemplate}
        />
        <Column
          header="Fecha Creación"
          field="created_at_f"
          sortable
          style={{ minWidth: "10rem" }}
          showFilterMatchModes={false}
          showFilterOperator={false}
          showAddButton={false}
          filter
          filterElement={dateFilterTemplate}
          sortField="created_at"
        />
        <Column
          field=""
          header="Opciones"
          frozen
          alignHeader={"center"}
          alignFrozen="right"
          body={batchIconsColumn}
          style={{ minWidth: "13rem" }}
        />
      </DataTable>
      <Dialog
        visible={visibleOCDialog}
        onHide={() => {
          setGlobalFilterValue("");
          setVisibleOCDialog(false);
        }}
        draggable={false}
        header={headerDialogTemplate}
      >
        <div className="p-3 new-lote-modal">
          <DataTable
            ref={dataTable2}
            value={oc}
            paginator
            header={renderHeader2}
            rows={5}
            scrollable
            dataKey="sku_id"
            selection={selectedOcSli}
            onSelectionChange={(e: any) => setSelectedOcSli(e.value)}
            isDataSelectable={isRowSelectable}
            rowClassName={rowClassName}
            filters={filters2}
            filterDisplay="menu"
            scrollHeight="30vh"
            emptyMessage="No se encontraron resultados."
          >
            <Column
              selectionMode="single"
              headerStyle={{ width: "3rem" }}
            ></Column>
            <Column
              field="description"
              header="Descripción"
              sortable
              filter
              showFilterOperator={false}
              showAddButton={false}
              showFilterMatchModes={false}
              style={{ minWidth: "14rem" }}
            />

            <Column
              field="sku_id"
              header="Sku"
              sortable
              style={{ minWidth: "7rem" }}
              showFilterOperator={false}
              showAddButton={false}
              showFilterMatchModes={false}
              filter
            />
            <Column
              align={"center"}
              field="system_type"
              header="Sistema de Certificación"
              sortable
              filterElement={systemFilterTemplate}
              style={{ minWidth: "12rem" }}
              showFilterOperator={false}
              showAddButton={false}
              showFilterMatchModes={false}
              filter
            />
            <Column
              align={"center"}
              field="quantity"
              header="Cantidad"
              sortable
              dataType="numeric"
              style={{ minWidth: "8rem" }}
              showFilterOperator={false}
              showAddButton={false}
              showFilterMatchModes={false}
              filter
            />

            <Column
              field="sku_type_id"
              header="Certificable"
              style={{ minWidth: "9rem" }}
              body={statusBodyTemplate}
            />
          </DataTable>
          <div className="flex align-items-center p-5 h-3rem justify-content-between border-y-1 surface-hover border-black-alpha-10">
            En total existen {sumSku} Skus Certificables sin importar.
            <Button
              type="button"
              label="Importar lote"
              disabled={!selectedOcSli}
              className="border-round-3xl"
              loading={loadingButton}
              onClick={importBatch}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
