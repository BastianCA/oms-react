import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Inspector, Organization, Vehicle } from './organism.model';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
export default function OrganimsPdf(image: string, inspector: Inspector[], organism: Organization, vehicle: Vehicle[], ejecutives: any) {
  const inspectorArray = inspector.map(a => [
    { text: a.name, border: [true, false, true, true], margin: [0, 0, 0, 0], fontSize: 10, alignment: 'left', width: 120 },
    { text: a.documentNumber, border: [true, false, true, true], margin: [0, 0, 0, 0], fontSize: 10, alignment: 'left' },
    { text: a.phoneNumber, border: [true, false, true, true], margin: [0, 0, 0, 0], fontSize: 10, alignment: 'left' },
    { text: a.email, border: [true, false, true, true], margin: [0, 0, 0, 0], fontSize: 10, alignment: 'left' }
  ]);
  const vehicleArray = vehicle.map(a => [
    { text: a.patent, border: [true, false, true, true], margin: [0, 0, 0, 0], fontSize: 10, alignment: 'left', width: 120 },
    { text: a.model, border: [true, false, true, true], margin: [0, 0, 0, 0], fontSize: 10, alignment: 'left' },
    { text: a.brand, border: [true, false, true, true], margin: [0, 0, 0, 0], fontSize: 10, alignment: 'left' },
    { text: a.color, border: [true, false, true, true], margin: [0, 0, 0, 0], fontSize: 10, alignment: 'left' }
  ]);
  const ejecutivesArray = ejecutives.map((a: any) => [
    { text: a.executiveName, border: [true, false, true, true], margin: [0, 0, 0, 0], fontSize: 10, alignment: 'left' },
    { text: a.executiveEmail, border: [true, false, true, true], margin: [0, 0, 0, 0], fontSize: 10, alignment: 'left' },
    { text: a.executivePhoneNumber, border: [true, false, true, true], margin: [0, 0, 0, 0], fontSize: 10, alignment: 'left' },
  ]);
  const pdf: any = {
    content: [
      {
        columns: [
          [
            {
              text: `ORGANISMO: ${organism.organismName}`,
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
                      text: 'Contacto :',
                      color: '#333333',
                      bold: true,
                      width: 100,
                      fontSize: 10,
                      alignment: 'left',
                    },
                    {
                      text: organism.contact,
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
                      text: 'Email organismo :',
                      color: '#333333',
                      bold: true,
                      width: 100,
                      fontSize: 10,
                      alignment: 'left',
                    },
                    {
                      text: organism.email,
                      bold: true,
                      color: '#333333',
                      fontSize: 10,
                      alignment: 'left',
                      width: '*',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'RUT organismo :',
                      color: '#333333',
                      bold: true,
                      width: 100,
                      fontSize: 10,
                      alignment: 'left',
                    },
                    {
                      text: organism.rut,
                      bold: true,
                      color: '#333333',
                      fontSize: 10,
                      alignment: 'left',
                      width: '*',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Teléfono organismo :',
                      color: '#333333',
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      width: 100,
                    },
                    {
                      text: organism.phone,
                      bold: true,
                      color: '#333333',
                      fontSize: 10,
                      alignment: 'left',
                      width: '*',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Dirección :',
                      color: '#33333',
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      width: 100,
                    },
                    {
                      text: organism.address,
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      color: '#333333',
                      width: '*',
                    },
                  ],
                }
              ]
            }, '\n',
            {
              text: 'EJECUTIVO/A DE CUENTAS',
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
                      text: 'Nombre:',
                      color: '#333333',
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      width: 100
                    },
                    {
                      text: organism.ejecutiveName,
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      color: '#333333',
                      width: '*',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Teléfono :',
                      color: '#333333',
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      width: 100,
                    },
                    {
                      text: organism.ejecutivePhone,
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      color: '#333333',
                      width: '*',
                    },
                  ],
                },
                {
                  columns: [
                    {
                      text: 'Email :',
                      color: '#333333',
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      width: 100,
                    },
                    {
                      text: organism.ejecutiveEmail,
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      color: '#333333',
                      width: '*',
                    },
                  ],
                },
              ]
            },
          ], {
            image: 'snow',
            width: 180
          },

        ],
      },
      '\n\n',
      {
        text: 'Fiscalizadores',
        color: '#333333',
        width: '*',
        fontSize: 18,
        bold: true,
        alignment: 'left',
        margin: [0, 0, 0, 15],
      },
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
          widths: [120, '*', '*', '*'],
          body: [
            [
              {
                text: 'Nombre',
                fillColor: '#eaf2f5',
                border: [true, true, true, true],
                margin: [0, 0, 0, 0],
                fontSize: 10,
                textTransform: 'uppercase',
              },
              {
                text: 'Rut',
                border: [true, true, true, true],
                alignment: 'left',
                fillColor: '#eaf2f5',
                margin: [0, 0, 0, 0],
                fontSize: 10,
                textTransform: 'uppercase',
              },
              {
                text: 'Número de contacto',
                border: [true, true, true, true],
                alignment: 'left',
                fillColor: '#eaf2f5',
                margin: [0, 0, 0, 0],
                fontSize: 10,
                textTransform: 'uppercase',
              },
              {
                text: 'Email',
                border: [true, true, true, true],
                alignment: 'left',
                fillColor: '#eaf2f5',
                margin: [0, 0, 0, 0],
                fontSize: 10,
                textTransform: 'uppercase',
              },
            ],
            ...inspectorArray

          ],
        },
      },
      '\n',
      '\n\n',
      {
        text: 'Patentes',
        color: '#333333',
        width: '*',
        fontSize: 18,
        bold: true,
        alignment: 'left',
        margin: [0, 0, 0, 15],
      },
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
          widths: [120, '*', '*', '*'],
          body: [
            [
              {
                text: 'Patente',
                fillColor: '#eaf2f5',
                border: [true, true, true, true],
                margin: [0, 0, 0, 0],
                fontSize: 10,
                textTransform: 'uppercase',
              },
              {
                text: 'Modelo',
                border: [true, true, true, true],
                alignment: 'left',
                fillColor: '#eaf2f5',
                margin: [0, 0, 0, 0],
                fontSize: 10,
                textTransform: 'uppercase',
              },
              {
                text: 'Marca',
                border: [true, true, true, true],
                alignment: 'left',
                fillColor: '#eaf2f5',
                margin: [0, 0, 0, 0],
                fontSize: 10,
                textTransform: 'uppercase',
              },
              {
                text: 'Color',
                border: [true, true, true, true],
                alignment: 'left',
                fillColor: '#eaf2f5',
                margin: [0, 0, 0, 0],
                fontSize: 10,
                textTransform: 'uppercase',
              },
            ],
            ...vehicleArray
          ],
        },
      },
      '\n',
      '\n\n',
      {
        text: 'Ejecutivos',
        color: '#333333',
        width: '*',
        fontSize: 18,
        bold: true,
        alignment: 'left',
        margin: [0, 0, 0, 15],
      },
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
          widths: ['*', '*', '*', '*'],
          body: [
            [
              {
                text: 'Nombre',
                fillColor: '#eaf2f5',
                border: [true, true, true, true],
                margin: [0, 0, 0, 0],
                fontSize: 10,
                textTransform: 'uppercase',
              },
              {
                text: 'Email',
                border: [true, true, true, true],
                alignment: 'left',
                fillColor: '#eaf2f5',
                margin: [0, 0, 0, 0],
                fontSize: 10,
                textTransform: 'uppercase',
              },
              {
                text: 'Telefono',
                border: [true, true, true, true],
                alignment: 'left',
                fillColor: '#eaf2f5',
                margin: [0, 0, 0, 0],
                fontSize: 10,
                textTransform: 'uppercase',
              },

            ],
            ...ejecutivesArray
          ],
        },
      },
      '\n',
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
      snow: image ?? ""
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
    .download(`Organismo :${organism.organismName}.pdf`);
}