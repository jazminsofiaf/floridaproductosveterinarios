import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import AccountTable from "./account-table";
import {addSupplierPayment, fetchSupplierAccount} from "../../actions/actions";
import {Container, Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Payment from "../payment/payment";

export default function SupplierAccount(props: any) {
    const {match} = props;
    const dispatch = useDispatch();
    const {supplierAccount} = useSelector((state: any) => state);
    const id = match.params.id;

    useEffect(() => {
        if (id) {
            dispatch(fetchSupplierAccount(id))
        }
    }, [dispatch, id])

    function supplierPayment(values: IPaymentPostData) {
        if (id) {
            values.owner_id = id;
            dispatch(addSupplierPayment(values))
        }
    }

    return (
        <Container maxWidth={'md'}>
            <div>
                {!supplierAccount ? null :
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <AccountTable tableData={supplierAccount}
                                          tableName={`Estado de cuenta de ${supplierAccount.name}`}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <Payment action={supplierPayment}/>
                            </Paper>
                        </Grid>
                    </Grid>
                }
            </div>
        </Container>
    );
}