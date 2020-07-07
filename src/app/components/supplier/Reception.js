import React from 'react';
import ReceptionRow from "./ReceptionRow"
import Grid from '@material-ui/core/Grid';
import { FieldArray} from "formik";



function Reception(props) {

    const values = props.values;

    return (
        <div style={{ backgroundColor: '#F7EDE2', fontWeight: 'bold' }}>
            <Grid container spacing={1}>
                <Grid item xs={5}>Nombre</Grid>
                <Grid item xs={1}>$Lista</Grid>
                <Grid item xs={1}>Cant.</Grid>
                <Grid item xs={3}>Vencimiento</Grid>
                <Grid item xs={1}>$Fact.</Grid>
                <Grid item xs={1}>Tot.</Grid>
            </Grid>
            <FieldArray name={"received_products"}>
                {({ push, remove }) => (
                    <>
                    {values.received_products && values.received_products.length > 0 && values.received_products.map((item, index) =>
                            <ReceptionRow key={`received_products[${index}]`} item={item} onClick={props.onClick} index={index}/>
                        )}
                    </>
                )}
            </FieldArray>
        </div>
    )

}

export default Reception;