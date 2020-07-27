import React from 'react'
import {Container, Grid} from "@material-ui/core";
import ProductListInfo from "./product-list-info";
import UpperBar from "../upperBar/UpperBar";

export default function ProductInfoPage() {
    return (
        <Grid container direction="column" justify="flex-start" spacing={2}>
            <UpperBar/>
            <Container maxWidth='xl' style={{marginTop: "6em"}}>
                <ProductListInfo/>
            </Container>
        </Grid>
    )

}