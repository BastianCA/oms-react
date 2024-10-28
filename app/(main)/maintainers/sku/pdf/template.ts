var dd = {
  content: [
    {
      columns: [
        [
          {
            text: 'PATIO HEATER CON MESA SILVER',
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
                    text: '5471230',
                    bold: true,
                    color: '#aaaaab',
                    fontSize: 10,
                    alignment: 'left',
                    width: 100,
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
                    text: '',
                    bold: true,
                    color: '#aaaaab',
                    fontSize: 10,
                    alignment: 'left',
                    width: 100,
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
                    text: ' HSS-A-DGHSS',
                    bold: true,
                    color: '#aaaaab',
                    fontSize: 10,
                    alignment: 'left',
                    width: 100,
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
                    text: 'INACTIVO',
                    bold: true,
                    fontSize: 10,
                    alignment: 'left',
                    color: 'red',
                    width: 100,
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
                    text: '',
                    bold: true,
                    fontSize: 10,
                    alignment: 'left',
                    color: '#aaaaab',
                    width: 100,
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
                    text: '2/22/2024',
                    bold: true,
                    fontSize: 10,
                    alignment: 'left',
                    color: '#aaaaab',
                    width: 100,
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
                    text: '2/22/2024',
                    bold: true,
                    fontSize: 10,
                    alignment: 'left',
                    color: '#aaaaab',
                    width: 100,
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
        widths: ['*', 80],
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
              text: ' prueba',
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
              text: ' prueba',
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
              text: ' prueba',
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
              text: ' prueba',
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
              text: ' prueba',
              alignment: 'right',
              margin: [0, 0, 0, 0],
              fontSize: 10
            },
          ],
        ],
      },
    },
    '\n',
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
        widths: ['*', 80],
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
              text: 'prueba',
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

              text: 'prueba',
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
              text: 'prueba',
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
              text: 'prueba',
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
              text: 'prueba',
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
              text: 'prueba',
              alignment: 'right',
              margin: [0, 0, 0, 0],
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
    snow: 'https://sodimac.scene7.com/is/image/SodimacCL/2865939'
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

export default dd;