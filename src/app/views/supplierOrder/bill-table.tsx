import React from 'react'
import MaterialTable, {Column} from "material-table";
import {BillRow, generateBillRow} from "./bill-form";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {TextField} from "@material-ui/core";
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            // display: 'flex',
            // flexWrap: 'wrap',
        },
        textField: {
            // marginLeft: theme.spacing(1),
            // marginRight: theme.spacing(1),
            // width: 200,
        },
    }),
);


function BillTable(props: any) {
    const classes = useStyles();
    const {useState} = React;
    const {data, setData, billMargins} = props;
    dayjs.extend(customParseFormat)


    const [columns] = useState<Array<Column<BillRow>>>([
        {title: 'Nombre', field: 'name', editable: 'never'},
        {title: 'Cant.', field: 'amount', type: 'numeric'},
        {
            title: 'FechaVencimiento', field: 'expirationDate', width: 100, editComponent: props => (
                <TextField
                    id="date"
                    label="Vencimiento"
                    type="date"
                    defaultValue={dayjs(props.value, "DD/MM/YYYY").format('YYYY-MM-DD')}
                    className={classes.textField}
                    onChange={(date: any) => props.onChange(dayjs(date.target.value, 'YYYY-MM-DD').toDate())}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    size={'small'}
                />
                // <MuiPickersUtilsProvider utils={DateFnsUtils}>
                //     <KeyboardDatePicker
                //         disableToolbar
                //         disablePast
                //         fullWidth
                //         key={props.value}
                //         label="Fecha venc."
                //         format="dd/MM/yyyy"
                //         value={props.value}
                //         onChange={(date) => props.onChange(date?.toLocaleString())}
                //         inputVariant="standard"
                //         size={'small'}
                //     />
                // </MuiPickersUtilsProvider>
            )
        },
        {title: 'P.Lista', field: 'priceList', type: 'numeric'},
        {title: `Desc.BM(%)`, field: 'discount', type: 'numeric'},
        {title: `Desc.BM(-)`, field: 'discountBM', type: 'numeric', editable: 'never'},
        {title: `Desc.Dist(-)`, field: 'discountDist', type: 'numeric', editable: 'never'},
        {title: `Arancel`, field: 'itemTax', type: 'numeric'},
        {title: 'Subtotal', field: 'subtotalProduct', type: 'numeric', editable: 'never'},
        {title: `IIBB(+)`, field: 'taxOne', type: 'numeric', editable: 'never'},
        {title: `IVA(+)`, field: 'taxTwo', type: 'numeric', editable: 'never'},
        {title: 'Total', field: 'totalProduct', type: 'numeric', editable: 'never'},
        {title: 'Costo (xU.+IVA)', field: 'unitCost', type: 'numeric', editable: 'never'},
        {title: 'Costo (Final)', field: 'unitCostBillDiscount', type: 'numeric', editable: 'never'},
        {title: 'R.Lista', field: 'unitPrice', type: 'numeric', editable: 'never'},
    ]);

    return (
        <MaterialTable
            title="Productos"
            options={{
                header: true,
                search: false,
                toolbar: false,
                paging: false
            }}
            columns={columns}
            data={data}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            setData([...data, newData]);

                            resolve();
                        }, 100)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            if (oldData) {
                                const dataUpdate = [...data];
                                const index = data.indexOf(oldData);
                                newData = generateBillRow({id:newData.id, name:newData.name, refPrice:newData.unitPrice, price: newData.priceList, expiration_date:
                                    newData.expirationDate, amount: newData.amount, itemTax:newData.itemTax , discount:newData.discount}, billMargins, false)
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);

                                resolve();
                            }
                        }, 100)
                    }),
            }}
            actions={[
                {
                    icon: 'add',
                    tooltip: 'Agregar mercaderia bonificada',
                    isFreeAction: true,
                    onClick: (event) => alert("You want to add a new row")
                }
            ]}
        />
    )
}

export default BillTable;