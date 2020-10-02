import React from 'react'
import {Container, Grid} from "@material-ui/core";
import ProductListInfo from "./product-list-info";

export default function ProductInfoPage() {
    return (
        <Grid container direction="column" justify="flex-start" spacing={2}>
            <Container maxWidth='xl'>
                <ProductListInfo/>
            </Container>
        </Grid>
    )

}