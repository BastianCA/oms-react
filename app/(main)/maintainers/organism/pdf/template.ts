var dd = {
    content: [
      {
        columns: [
          [
            {
              text: 'ORGANISMO: CESMEC',
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
                      text: 'Bastian Ortega',
                      bold: true,
                      color: '#aaaaab',
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
                      text: 'bastian-antonio.gonzalez-ortega@bureauve',
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
                      text: 'RUT organismo :',
                      color: '#333333',
                      bold: true,
                      width: 100,
                      fontSize: 10,
                      alignment: 'left',
                    },
                    {
                      text: '81.185.000-4',
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
                      text: 'Teléfono organismo :',
                      color: '#333333',
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      width: 100,
                    },
                    {
                      text: '',
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      color: 'red',
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
                      text: 'Marathon 2595 Macul.',
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      color: '#aaaaab',
                      width: '*',
                    },
                  ],
                }
              ]},'\n',
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
                      text: 'Equipo Cesmec',
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
                      text: 'Teléfono :',
                      color: '#333333',
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      width: 100,
                    },
                    {
                      text: '',
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
                      text: 'Email :',
                      color: '#333333',
                      bold: true,
                      fontSize: 10,
                      alignment: 'left',
                      width: 100,
                    },
                    {
                      text: 'bastian-antonio.gonzalez-ortega@bureauve',
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
          ],{
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
          hLineWidth: function(i:any, node:any) {
            return 1;
          },
          vLineWidth: function(i:any, node:any) {
            return 1;
          },
          hLineColor: function(i:any, node:any) {
            if (i === 1 || i === 0) {
              return '#bfdde8';
            }
            return '#eaeaea';
          },
          vLineColor: function(i:any, node:any) {
            return '#eaeaea';
          },
          hLineStyle: function(i:any, node:any) {
            return null;
            //}
          },
          paddingLeft: function(i:any, node:any) {
            return 10;
          },
          paddingRight: function(i:any, node:any) {
            return 10;
          },
          paddingTop: function(i:any, node:any) {
            return 2;
          },
          paddingBottom: function(i:any, node:any) {
            return 2;
          },
          fillColor: function(rowIndex:any, node:any, columnIndex:any) {
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
                fontSize:10,
                textTransform: 'uppercase',
              },
              {
                text: 'Rut',
                border: [true, true, true, true],
                alignment: 'left',
                fillColor: '#eaf2f5',
                margin: [0, 0, 0, 0],
                fontSize:10,
                textTransform: 'uppercase',
              },
              {
                text: 'Número de contacto',
                border: [true, true, true, true],
                alignment: 'left',
                fillColor: '#eaf2f5',
                margin: [0, 0, 0, 0],
                fontSize:10,
                textTransform: 'uppercase',
              },
              {
                text: 'Email',
                border: [true, true, true, true],
                alignment: 'left',
                fillColor: '#eaf2f5',
                margin: [0, 0, 0, 0],
                fontSize:10,
                textTransform: 'uppercase',
              },
            ],
            [
              {
                text: 'Gonzalo Felipe Matus',
                border: [true, false, true, true],
                margin: [0, 0, 0, 0],
                fontSize:10,
                alignment: 'left',
              },
              {
                border: [true, false, true, true],
                text: '13.663.283-3',
                alignment: 'left',
                margin: [0, 0, 0, 0],
                fontSize:10,
                },
              {
                text: '+562 5647 3332',
                border: [true, false, true, true],
                margin: [0, 0, 0, 0],
                fontSize:10,
                alignment: 'left',
              },
              {
                border: [true, false, true, true],
                text: 'confirmar@gmail.com',
                alignment: 'left',
                margin: [0, 0, 0, 0],
                fontSize:10,
                }
            ]
           
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
          hLineWidth: function(i:any, node:any) {
            return 1;
          },
          vLineWidth: function(i:any, node:any) {
            return 1;
          },
          hLineColor: function(i:any, node:any) {
            if (i === 1 || i === 0) {
              return '#bfdde8';
            }
            return '#eaeaea';
          },
          vLineColor: function(i:any, node:any) {
            return '#eaeaea';
          },
          hLineStyle: function(i:any, node:any) {
            return null;
            //}
          },
          paddingLeft: function(i:any, node:any) {
            return 10;
          },
          paddingRight: function(i:any, node:any) {
            return 10;
          },
          paddingTop: function(i:any, node:any) {
            return 2;
          },
          paddingBottom: function(i:any, node:any) {
            return 2;
          },
          fillColor: function(rowIndex:any, node:any, columnIndex:any) {
            return '#fff';
          },
        },
        table: {
          headerRows: 1,
          widths: ['*', '*', '*', '*'],
          body: [
            [
              {
                text: 'Patente',
                fillColor: '#eaf2f5',
                border: [true, true, true, true],
                margin: [0, 0, 0, 0],
                fontSize:10,
                textTransform: 'uppercase',
              },
              {
                text: 'Modelo',
                border: [true, true, true, true],
                alignment: 'left',
                fillColor: '#eaf2f5',
                margin: [0, 0, 0, 0],
                fontSize:10,
                textTransform: 'uppercase',
              },
              {
                text: 'Marca',
                border: [true, true, true, true],
                alignment: 'left',
                fillColor: '#eaf2f5',
                margin: [0, 0, 0, 0],
                fontSize:10,
                textTransform: 'uppercase',
              },
              {
                text: 'Color',
                border: [true, true, true, true],
                alignment: 'left',
                fillColor: '#eaf2f5',
                margin: [0, 0, 0, 0],
                fontSize:10,
                textTransform: 'uppercase',
              },
            ],
            [
              {
                text: 'RYWJ-72',
                border: [true, false, true, true],
                margin: [0, 0, 0, 0],
                fontSize:10,
                alignment: 'left',
              },
              {
                border: [true, false, true, true],
                text: 'Por Definir',
                alignment: 'left',
                margin: [0, 0, 0, 0],
                fontSize:10,
                },
              {
                text: 'Por Definir',
                border: [true, false, true, true],
                margin: [0, 0, 0, 0],
                fontSize:10,
                alignment: 'left',
              },
              {
                border: [true, false, true, true],
                text: 'Por Definir',
                alignment: 'left',
                margin: [0, 0, 0, 0],
                fontSize:10,
                }
            ]
           
          ],
        },
      },
      '\n',
      {
        text: 'SODIMAC',
        style: 'notesTitle',
      },
      {
        text: 'Certificacion SEC.',
        style: 'notesText'
      },
    ],
     images: {
      snow: 'https://thanos.dda.sodimac.cl:3056/filebyid/65ea127c0f78ba3eb272f249'
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