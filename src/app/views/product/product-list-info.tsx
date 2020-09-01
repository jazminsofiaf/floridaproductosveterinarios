import React from 'react';
import MaterialTable, {Column} from 'material-table';
import {Container} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {fetchProductsInfo} from "../../actions/actions";

interface Row {
    // id: string;
    url: string;
    name: string;
    presentation: string;
    lab: string;
    cost: number;
    extra: number;
    vetPrice: number;
    protecPrice: number;
    indPrice: number;
    otherPrice: number;
    stock: number;
    reserved: number;
    awaiting: number;
    missing: number;
}

interface TableState {
    columns: Array<Column<Row>>;
}

interface IMargin {
    vet: number;
    pro:number;
    ind:number;
    oth:number;
}


export default function ProductListInfo() {
    const {productsInfo} = useSelector((state: any) => state)
    const dispatch = useDispatch();
    const [margins, setMargins] = React.useState<IMargin>();

    const [data, setData] = React.useState<Row[]>([]);

    const columns: Array<Column<Row>> = [
            {
                title: 'Avatar',
                field: 'url',
                render: rowData => <img src={rowData.url} style={{width: 50, borderRadius: '50%'}} alt={"avatar"}/>,
                editable: 'never'
            },
            {title: 'Name', field: 'name', editable: 'never'},
            {title: 'Presentacion', field: 'presentation', editable: 'never'},
            {title: 'Laboratorio', field: 'lab', editable: 'never'},
            {title: '$Costo', field: 'cost', type: 'numeric'},
            {title: 'Margen extra%', field: 'extra', type: 'numeric', render: rowData => <>+{rowData.extra}%</>},
            {title: '$Vet', field: 'vetPrice', type: 'numeric', editable: 'never'},
            {title: '$Prot', field: 'protecPrice', type: 'numeric', editable: 'never'},
            {title: '$Ind', field: 'indPrice', type: 'numeric', editable: 'never'},
            {title: '$Otro', field: 'otherPrice', type: 'numeric', editable: 'never'},
            {title: 'Stock', field: 'stock', type: 'numeric', editable: 'never'},
            {title: 'Reservado', field: 'reserved', type: 'numeric', editable: 'never'},
            {title: 'Espera', field: 'awaiting', type: 'numeric', editable: 'never'},
            {title: 'Faltante', field: 'missing', type: 'numeric', editable: 'never'},
        ];

    React.useEffect(() => {
        if (productsInfo) {
            setMargins({
                vet : productsInfo.vet_margin,
                pro : productsInfo.protec_margin,
                ind : productsInfo.ind_margin,
                oth : productsInfo.other_margin,
            })
            const newData = productsInfo ? productsInfo.products_info.map((productInfoData: any) => {
                    return {
                        url: productInfoData.url,
                        name: productInfoData.name,
                        presentation: productInfoData.presentation,
                        lab: productInfoData.lab,
                        cost: productInfoData.cost,
                        extra: productInfoData.extra,
                        vetPrice: calculateValue(productInfoData.cost, productInfoData.extra, productsInfo.vet_margin ),
                        protecPrice: calculateValue(productInfoData.cost, productInfoData.extra, productsInfo.protec_margin ),
                        indPrice: calculateValue(productInfoData.cost, productInfoData.extra, productsInfo.ind_margin ),
                        otherPrice: calculateValue(productInfoData.cost, productInfoData.extra,productsInfo.other_margin ),
                        stock: productInfoData.stock,
                        reserved: productInfoData.reserved,
                        awaiting: productInfoData.awaiting,
                        missing: productInfoData.missing,
                    }
                }
            ) : [];
            setData(newData);
        } else {
            dispatch(fetchProductsInfo())
        }
    }, [dispatch, productsInfo, setData])

    const localization = {
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

    function calculateValue(cost:number, extraMargin: number, margin2?: number) {
        if(!cost) return 0;
        let extra = extraMargin ? extraMargin : 0;
        let marginUser = margin2 ? margin2 : 0;
        return (cost * ((extra + marginUser) / 100 + 1)).toFixed(2);
    }

    return (
        <Container maxWidth='xl'>
            <MaterialTable
                title="Informacion de productos"
                columns={columns}
                data={data}
                localization={localization}
                options={{pageSize: 10}}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            if(oldData) {
                                setTimeout(() => {
                                    const dataUpdate = [...data];
                                    const index = data.indexOf(oldData);
                                    newData.vetPrice = Number(calculateValue(newData.cost, newData.extra, margins?.vet))
                                    newData.protecPrice = Number(calculateValue(newData.cost, newData.extra, margins?.pro))
                                    newData.indPrice = Number(calculateValue(newData.cost, newData.extra, margins?.ind))
                                    newData.otherPrice = Number(calculateValue(newData.cost, newData.extra, margins?.oth))
                                    dataUpdate[index] = newData;
                                    setData([...dataUpdate]);
                                    resolve();
                                }, 600)
                            }
                        }),
                }}
            />
        </Container>
    );
}