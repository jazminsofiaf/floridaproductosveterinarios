import React from 'react';
import MaterialTable, { Column } from 'material-table';

interface Row {
    name: string;
    surname: string;
    birthYear: number;
    birthCity: number;
}

interface TableState {
    columns: Array<Column<Row>>;
    data: Row[];
}



export default function MaterialTableDemo() {
    const [state, setState] = React.useState<TableState>({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Surname', field: 'surname' },
            { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
            {
                title: 'Birth Place',
                field: 'birthCity',
                lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            },
        ],
        data: [
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
            {
                name: 'Zerya Betül',
                surname: 'Baran',
                birthYear: 2017,
                birthCity: 34,
            },
        ],
    });

    const localization={
        body: {
            emptyDataSourceMessage: 'Ningun dato disponible',
                addTooltip: 'Agregar',
                deleteTooltip: 'Eliminar',
                editTooltip: 'Editar',
                filterRow: {
                filterTooltip: 'Filtro'
            },
            editRow: {
                deleteText: 'Esta seguro que desea eliminar?',
                    cancelTooltip: 'Cancelar',
                    saveTooltip: 'Guardar'
            }
        },
        grouping: {
            placeholder: 'Arrastrar encabezado ...',
                groupedBy: 'Agrupar por:'
        },
        header: {
            actions: 'Acciones'
        },
        pagination: {
            labelDisplayedRows: '{from}-{to} de {count}',
                labelRowsSelect: 'Filas',
                labelRowsPerPage: 'Filas por pagina:',
                firstAriaLabel: 'Primera pagina',
                firstTooltip: 'Primera pagina',
                previousAriaLabel: 'Pagina anterior',
                previousTooltip: 'Pagina anterior',
                nextAriaLabel: 'Siguiente pagina',
                nextTooltip: 'Siguiente pagina',
                lastAriaLabel: 'Ultima pagina',
                lastTooltip: 'Ultima pagina'
        },
        toolbar: {
            addRemoveColumns: 'Agregar o eliminar columnas',
                nRowsSelected: '{0} fila(n) seleccionada',
                showColumnsTitle: 'Mostrar columnas',
                showColumnsAriaLabel: 'Mostrar columnas',
                exportTitle: 'Exportar',
                exportAriaLabel: 'Exportar',
                exportName: 'Exportar como CSV',
                searchTooltip: 'Buscar',
                searchPlaceholder: 'Buscar'
        }
    };

    return (
        <MaterialTable
            title="Editable Example"
            columns={state.columns}
            data={state.data}
            localization={localization}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
}


class IProductLink {
    // supplierProductId: string;
    // supplierProductName: string;
    // ratio: number;
    // productName: string;
    // productLab: string;
    // productCategory: string;
    // productPresentation: IProductPresentation;
    species?: string[]
}

interface IProductLinker {
    products: IProductLink[];
}