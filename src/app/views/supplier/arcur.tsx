import React, {useState} from 'react';
import clsx from 'clsx';
import {Button, Container, Grid, TextField, Typography} from '@material-ui/core';
import MaterialTable from "material-table";
import {makeStyles} from "@material-ui/core/styles";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles({
    button: {
        background: 'linear-gradient(45deg, #9fafbc 30%, #b9bec2 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        // padding: '0 30px',
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    buttonBlue: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    },
});

let customStyle = {
    padding: '0px, 0, 3px, 0',
    color: "#2196F3",
    width: "20em",
    selected: "blue"
};

export default function ArcurList(props: any) {
    const classes = useStyles();
    const [cartOpen, setCartOpen] = useState(false);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const tableRef = React.createRef<any>();

    let data = [
        {name: 'Super mega producto del Oeste', surname: 'Baran', price: 1987, birthCity: 63},
        {name: 'Zerya Betül', surname: 'Baran', price: 2017, birthCity: 34},
    ]

    function details(data: any) {
        console.log(data)
    }

    let columns: any = [
        {title: 'Nombre', field: 'name'},
        {title: 'Laboratorio', field: 'surname'},
        {title: 'Stock', field: 'price', type: 'numeric'},
        {title: 'Precio', field: 'birthCity', type: 'numeric'},
        // {
        //     render: (data: any) => <Button onClick={() => details(data)}><ArrowForwardIosIcon/></Button>,
        // },
    ];

    function openCart(open: boolean) {
        setCartOpen(open);
    }

    function viewItem(event: React.MouseEvent<Element, MouseEvent> | undefined, togglePanel: ((panelIndex?: number) => void) | undefined, rowData: any | undefined) {
        console.log(tableRef.current.props.detailPanel);
        console.log(rowData);
        if (togglePanel) {
            togglePanel()
        }
    }

    return (
        <Container maxWidth={"sm"}>
            <Typography variant={"h5"}>Arcuri</Typography>
            <Grid container>
                <Grid item xs={6}>
                    <Button className={clsx(classes.button, {[classes.buttonBlue]: !cartOpen})} fullWidth
                            onClick={() => openCart(false)} variant={"contained"} size={'large'}>
                        Listado
                        <FormatListBulletedIcon/>
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button className={clsx(classes.button, {[classes.buttonBlue]: cartOpen})} fullWidth
                            onClick={() => openCart(true)} variant={"contained"} size={'large'}>
                        Carrito
                        <ShoppingCartIcon/>
                        +1
                    </Button>
                </Grid>
            </Grid>
            {cartOpen ? <></> :
                <MaterialTable
                    tableRef={tableRef}
                    columns={columns}
                    data={data}
                    // data={query =>
                    //     new Promise((resolve, reject) => {
                    //         let url = 'https://reqres.in/api/users?'
                    //         url += 'per_page=' + query.pageSize
                    //         url += '&page=' + (query.page + 1)
                    //         fetch(url)
                    //             .then(response => response.json())
                    //             .then(result => {
                    //                 resolve({
                    //                     data: result.data,
                    //                     page: result.page - 1,
                    //                     totalCount: result.total,
                    //                 })
                    //             })
                    //     })
                    // }
                    detailPanel={rowData => {
                        return (
                            <div>
                                {rowData.name}
                                {rowData.price}
                                {/*<iframe*/}
                                {/*        width="100%"*/}
                                {/*        height="315"*/}
                                {/*        src="https://www.youtube.com/embed/C0DPdy98e4c"*/}
                                {/*        frameBorder='0'*/}
                                {/*        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"*/}
                                {/*        allowFullScreen*/}
                                {/*        onDragOver={() => console.log("Drag OVer")}*/}
                                {/*/>*/}
                            </div>
                        )
                    }}
                    options={{
                        padding: 'dense',
                        showTitle: false,
                        searchFieldStyle: customStyle,
                        searchFieldAlignment: 'left',
                        pageSize: 20,
                        detailPanelType: 'single',
                        detailPanelColumnAlignment: 'right',
                        headerStyle: {
                            position: 'sticky',
                            top: 0,
                            fontSize: 15,
                            fontWeight: "bold",
                            color: "white",
                            backgroundColor: '#21CBF3'
                        },
                    }}
                    onRowClick={(event, rowData, togglePanel) => viewItem(event, togglePanel, rowData)}
                />}

        </Container>
    )

}
