import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { CertificationData } from '../skuCert.model';
import { SkuCertificationDocuments, SkuObject } from "./skuDetail.model";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export default function SkuPdf(image: string, data: SkuObject, certObject: CertificationData | any, documents: SkuCertificationDocuments[], protocolList: any) {

  const setProtocol = (protocol: any) => {
    const object = protocolList.find((a: any) => +a?.id === +protocol);
    console.log(object);
    return object.name
  }

  const docArrays = documents.map(a => [
    { text: a.createdAt, border: [true, false, true, true], margin: [0, 0, 0, 0], fontSize: 10, alignment: 'left' },
    { text: a.documentType, border: [true, false, true, true], margin: [0, 0, 0, 0], fontSize: 10, alignment: 'left' },
    { text: a.documentName, border: [true, false, true, true], margin: [0, 0, 0, 0], fontSize: 10, alignment: 'left' },
  ]);
  const pdf: any = {
    content: [
      {
        columns: [
          [
            {
              text: data.descriptionSkuProduct,
              color: '#333333',
              width: '*',
              fontSize: 18,
              bold: true,
              alignment: 'left',
              margin: [0, 0, 0, 15],
            },
            {
              stack: [
                {
                  columns: [
                    {
                      text: 'SKU :',
                      color: '#333333',
                      bold: true,
                      width: '*',
                      fontSize: 10,
                      alignment: 'left',
                    },
                    {
                      text: data.sku,
                      bold: true,
                      color: '#aaaaab',
                      fontSize: 10,
                      alignment: 'left',
                      width: '*',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Marca :',
                      color: '#333333',
                      bold: true,
                      width: '*',
                      fontSize: 10,
                      alignment: 'left',
                    },
                    {
                      text: data.brandSkuProduct,
                      bold: true,
                      color: '#aaaaab',
                      fontSize: 10,
                      alignment: 'left',
                      width: '*',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Tipología :',
                      color: '#333333',
                      bold: true,
                      width: '*',
                      fontSize: 10,
                      alignment: 'left',
                    },
                    {
                      text: data.skuDetail.typology,
                      bold: true,
                      color: '#aaaaab',
                      fontSize: 10,
                      alignment: 'left',
                      width: '*',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Modelo :',
                      color: '#333333',
                      bold: true,
                      width: '*',
                      fontSize: 10,
                      alignment: 'left',
                    },
                    {
                      text: data.modelSkuProduct,
                      bold: true,
                      color: '#aaaaab',
                      fontSize: 10,
                      alignment: 'left',
                      width: '*',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Estado de Sku :',
                      color: '#333333',
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      width: '*',
                    },
                    {
                      text: data.state,
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      color: data.state == 'Inactivo' ? 'red' : 'green',
                      width: '*',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Usuario Actualización :',
                      color: '#33333',
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      width: '*',
                    },
                    {
                      text: '',//Especificar campo
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      color: '#aaaaab',
                      width: '*',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Fecha Creación :',
                      color: '#333333',
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      width: '*',
                    },
                    {
                      text: data.createdAt !== null ? new Date(data.createdAt).toLocaleDateString("es-CL", {
                        timeZone: "UTC",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }) : "",
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      color: '#aaaaab',
                      width: '*',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Fecha Actualización :',
                      color: '#333333',
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      width: '*',
                    },
                    {
                      text: data.updatedAt,
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      color: '#aaaaab',
                      width: '*',
                    },
                  ],
                },
              ]
            },
          ], {
            image: 'snow',
            width: 150
          },

        ],
      },

      '\n',
      {
        columns: [
          [
            {
              text: `CERTIFICACIÓN`,
              color: '#333333',
              width: '*',
              fontSize: 18,
              bold: true,
              alignment: 'left',
              margin: [0, 0, 0, 15],
            },
            {
              stack: [
                {
                  columns: [
                    {
                      text: 'Sistema de certificación :',
                      color: '#333333',
                      bold: true,
                      width: 200,
                      fontSize: 10,
                      alignment: 'left',
                    },
                    {
                      text: certObject.typeCertificationsId === 13 ? 'Sistema 13' : 'Sistema 23',
                      bold: true,
                      color: '#333333',
                      width: '*',
                      fontSize: 10,
                      alignment: 'left',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Días max certificación :',
                      color: '#333333',
                      bold: true,
                      width: 200,
                      fontSize: 10,
                      alignment: 'left',
                    },
                    {
                      text: certObject.certAveragePeriod,
                      bold: true,
                      color: '#333333',
                      width: '*',
                      fontSize: 10,
                      alignment: 'left',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Vencimiento Eficiencia Energética (E.E) :',
                      color: '#333333',
                      bold: true,
                      width: 200,
                      fontSize: 10,
                      alignment: 'left',
                    },
                    {
                      text: certObject.energyEfficiencyExpire !== null ? new Date(data.createdAt).toLocaleDateString("es-CL", {
                        timeZone: "UTC",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }) : "",
                      bold: true,
                      color: '#333333',
                      width: '*',
                      fontSize: 10,
                      alignment: 'left',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Organismo :',
                      color: '#333333',
                      bold: true,
                      width: 200,
                      fontSize: 10,
                      alignment: 'left',
                    },
                    {
                      text: certObject.id_agency.name,
                      bold: true,
                      color: '#333333',
                      width: '*',
                      fontSize: 10,
                      alignment: 'left',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Modelo certificado :',
                      color: '#333333',
                      bold: true,
                      width: 200,
                      fontSize: 10,
                      alignment: 'left',
                    },
                    {
                      text: certObject.certModel,
                      bold: true,
                      color: '#333333',
                      width: '*',
                      fontSize: 10,
                      alignment: 'left',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'N° de certificado :',
                      color: '#333333',
                      bold: true,
                      width: 200,
                      fontSize: 10,
                      alignment: 'left',
                    },
                    {
                      text: certObject.certNumber,
                      bold: true,
                      color: '#333333',
                      width: '*',
                      fontSize: 10,
                      alignment: 'left',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Protocolo :',
                      color: '#333333',
                      bold: true,
                      width: 200,
                      fontSize: 10,
                      alignment: 'left',
                    },
                    {
                      text: setProtocol(certObject.idProtocol),
                      bold: true,
                      color: '#333333',
                      width: '*',
                      fontSize: 10,
                      alignment: 'left',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Código QR :',
                      color: '#333333',
                      bold: true,
                      width: 200,
                      fontSize: 10,
                      alignment: 'left',
                    },
                    {
                      text: certObject.idQr,
                      bold: true,
                      color: '#333333',
                      width: '*',
                      fontSize: 10,
                      alignment: 'left',
                    },
                  ],
                }
              ]
            }

          ]
        ],
      },
      '\n\n',
      {
        layout: {
          defaultBorder: false,
          hLineWidth: function (i: any, node: any) {
            return 1;
          },
          vLineWidth: function (i: any, node: any) {
            return 1;
          },
          hLineColor: function (i: any, node: any) {
            if (i === 1 || i === 0) {
              return '#bfdde8';
            }
            return '#eaeaea';
          },
          vLineColor: function (i: any, node: any) {
            return '#eaeaea';
          },
          hLineStyle: function (i: any, node: any) {
            return null;
            //}
          },
          paddingLeft: function (i: any, node: any) {
            return 10;
          },
          paddingRight: function (i: any, node: any) {
            return 10;
          },
          paddingTop: function (i: any, node: any) {
            return 2;
          },
          paddingBottom: function (i: any, node: any) {
            return 2;
          },
          fillColor: function (rowIndex: any, node: any, columnIndex: any) {
            return '#fff';
          },
        },
        table: {
          headerRows: 1,
          widths: [80, '*'],
          body: [
            [
              {
                text: 'DETALLE SKU',
                fillColor: '#eaf2f5',
                border: [true, true, false, true],
                margin: [0, 0, 0, 0],
                fontSize: 10,
                textTransform: 'uppercase',
              },
              {
                text: '',
                border: [false, true, true, true],
                alignment: 'right',
                fillColor: '#eaf2f5',
                margin: [0, 0, 0, 0],
                fontSize: 10,
                textTransform: 'uppercase',
              },
            ],
            [
              {
                text: 'Departamento :',
                border: [true, false, false, true],
                margin: [0, 0, 0, 0],
                fontSize: 10,
                alignment: 'left',
              },
              {
                border: [false, false, true, true],
                text: data.skuDetail.descDepto,
                alignment: 'right',
                margin: [0, 0, 0, 0],
                fontSize: 10,
              },
            ],
            [
              {
                text: 'Grupo :',
                border: [true, false, false, true],
                margin: [0, 0, 0, 0],
                fontSize: 10,
                alignment: 'left',
              },
              {
                border: [false, false, true, true],
                text: data.skuDetail.descGrupo,
                alignment: 'right',
                margin: [0, 0, 0, 0],
                fontSize: 10,

              },
            ],
            [
              {
                text: 'Conjunto :',
                border: [true, false, false, true],
                margin: [0, 0, 0, 0],
                fontSize: 10,
                alignment: 'left',
              },
              {
                border: [false, false, true, true],
                text: data.skuDetail.descConjunto,
                alignment: 'right',
                margin: [0, 0, 0, 0],
                fontSize: 10,
              },
            ],
            [
              {
                text: 'Familia :',
                border: [true, false, false, true],
                margin: [0, 0, 0, 0],
                fontSize: 10, alignment: 'left',
              },
              {
                border: [false, false, true, true],
                text: data.skuDetail.descFamilia,
                alignment: 'right',
                margin: [0, 0, 0, 0],
                fontSize: 10,
              },
            ],
            [
              {
                text: 'SubFamilia :',
                border: [true, false, false, true],
                margin: [0, 0, 0, 0],
                fontSize: 10, alignment: 'left',
              },
              {
                border: [false, false, true, true],
                text: data.skuDetail.descSubFamilia,
                alignment: 'right',
                margin: [0, 0, 0, 0],
                fontSize: 10
              },
            ],
          ],
        },
      },
      '\n\n',
      {

        layout: {
          defaultBorder: false,
          hLineWidth: function (i: any, node: any) {
            return 1;
          },
          vLineWidth: function (i: any, node: any) {
            return 1;
          },
          hLineColor: function (i: any, node: any) {
            if (i === 1 || i === 0) {
              return '#bfdde8';
            }
            return '#eaeaea';
          },
          vLineColor: function (i: any, node: any) {
            return '#eaeaea';
          },
          hLineStyle: function (i: any, node: any) {
            return null;
            //}
          },
          paddingLeft: function (i: any, node: any) {
            return 10;
          },
          paddingRight: function (i: any, node: any) {
            return 10;
          },
          paddingTop: function (i: any, node: any) {
            return 2;
          },
          paddingBottom: function (i: any, node: any) {
            return 2;
          },
          fillColor: function (rowIndex: any, node: any, columnIndex: any) {
            return '#fff';
          },
        },
        table: {
          headerRows: 1,
          widths: [100, '*'],
          body: [
            [
              {
                text: 'ORIGEN',
                fillColor: '#eaf2f5',
                fontSize: 10,
                border: [true, true, false, true],
                margin: [0, 5, 0, 5],
                textTransform: 'uppercase',
              },
              {
                text: '',
                fontSize: 10,
                border: [false, true, true, true],
                alignment: 'right',
                fillColor: '#eaf2f5',
                margin: [0, 0, 0, 0],
                textTransform: 'uppercase',
              },
            ],
            [
              {
                text: 'Proveedor :',
                fontSize: 10,
                border: [true, false, false, true],
                margin: [0, 0, 0, 0],
                alignment: 'left',
              },
              {
                border: [false, false, true, true],
                text: data.provider !== null ? data.provider.providerName : '',
                fontSize: 10,
                alignment: 'right',
                margin: [0, 0, 0, 0],
              },
            ],
            [
              {
                text: 'Origen de producto :',
                fontSize: 10,
                border: [true, false, false, true],
                margin: [0, 0, 0, 0],
                alignment: 'left',
              },
              {
                border: [false, false, true, true],
                fontSize: 10,

                text: data.skuDetail.origin,
                alignment: 'right',
                margin: [0, 0, 0, 0],
              },
            ],
            [
              {
                text: 'Gerente :',
                border: [true, false, false, true],
                fontSize: 10,
                margin: [0, 0, 0, 0],
                alignment: 'left',
              },
              {
                border: [false, false, true, true],
                fontSize: 10,
                text: data.skuDetail.manager,
                alignment: 'right',
                margin: [0, 0, 0, 0],
              },
            ],
            [
              {
                text: 'Jefe :',
                border: [true, false, false, true],
                fontSize: 10,
                margin: [0, 0, 0, 0],
                alignment: 'left',
              },
              {
                border: [false, false, true, true],
                fontSize: 10,
                text: data.skuDetail.chief,
                alignment: 'right',
                margin: [0, 0, 0, 0],
              },
            ],
            [
              {
                text: 'Comprador :',
                fontSize: 10,
                border: [true, false, false, true],
                margin: [0, 0, 0, 0],
                alignment: 'left',
              },
              {
                border: [false, false, true, true],
                fontSize: 10,
                text: data.skuDetail.buyer,
                alignment: 'right',
                margin: [0, 0, 0, 0],
              },
            ],
            [
              {
                text: 'Tipo de compra :',
                border: [true, false, false, true],
                fontSize: 10,
                margin: [0, 0, 0, 0],
                alignment: 'left',
              },
              {
                border: [false, false, true, true],
                fontSize: 10,
                text: data.skuDetail.ordertype,
                alignment: 'right',
                margin: [0, 0, 0, 0],
              }
            ]
          ]
        }
      },
      '\n',
      {
        pageBreak: 'before',
        text: `DOCUMENTACION`,
        color: '#333333',
        width: '*',
        fontSize: 18,
        bold: true,
        alignment: 'left',
        margin: [0, 0, 0, 15],
      },
      '\n',
      {
        layout: {
          defaultBorder: false,
          hLineWidth: function (i: any, node: any) {
            return 1;
          },
          vLineWidth: function (i: any, node: any) {
            return 1;
          },
          hLineColor: function (i: any, node: any) {
            if (i === 1 || i === 0) {
              return '#bfdde8';
            }
            return '#eaeaea';
          },
          vLineColor: function (i: any, node: any) {
            return '#eaeaea';
          },
          hLineStyle: function (i: any, node: any) {
            return null;
            //}
          },
          paddingLeft: function (i: any, node: any) {
            return 10;
          },
          paddingRight: function (i: any, node: any) {
            return 10;
          },
          paddingTop: function (i: any, node: any) {
            return 2;
          },
          paddingBottom: function (i: any, node: any) {
            return 2;
          },
          fillColor: function (rowIndex: any, node: any, columnIndex: any) {
            return '#fff';
          },
        },
        table: {
          headerRows: 1,
          widths: ['*', '*', '*'],
          body: [
            [
              {
                text: 'Fecha',
                fillColor: '#eaf2f5',
                border: [true, true, true, true],
                margin: [0, 0, 0, 0],
                fontSize: 10,
                textTransform: 'uppercase',
              },
              {
                text: 'Tipo Documento',
                border: [true, true, true, true],
                alignment: 'left',
                fillColor: '#eaf2f5',
                margin: [0, 0, 0, 0],
                fontSize: 10,
                textTransform: 'uppercase',
              },
              {
                text: 'Nombre de archivo',
                border: [true, true, true, true],
                alignment: 'left',
                fillColor: '#eaf2f5',
                margin: [0, 0, 0, 0],
                fontSize: 10,
                textTransform: 'uppercase',
              }
            ],
            ...docArrays

          ],
        },
      },
      {
        text: documents.length !== 0 ? "" : "No existen registros.",
        margin: [5, 5, 0, 0]
      },
      {
        text: 'CCP- Sistema de certificaciones',
        style: 'notesTitle',
      },
      {
        text: 'Equipo de Desarrollo de Aplicaciones.\nGerencia de soporte, Desarrollo y Automatismos.',
        style: 'notesText'
      },
    ],
    images: {
      snow: image
    },
    styles: {
      notesTitle: {
        fontSize: 10,
        bold: true,
        margin: [0, 50, 0, 3],
      },
      notesText: {
        fontSize: 10,
      },
    },
    defaultStyle: {
      columnGap: 10,
      //font: 'Quicksand',
    }
  };
  pdfMake
    .createPdf(pdf)
    .download(`Detalle Sku:${data.sku}.pdf`);
}
