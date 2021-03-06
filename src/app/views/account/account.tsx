import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import AccountTable from "./account-table";
import {addCustomerPayment, fetchUserAccount} from "../../actions/actions";
import {Container, Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Payment from "../payment/payment";

export default function Account(props: any) {
    const {match} = props;
    const dispatch = useDispatch();
    const {accountInfo} = useSelector((state: any) => state);
    const id = match.params.id;

    useEffect(() => {
        if (id) {
            dispatch(fetchUserAccount(id))
        }
    }, [dispatch, id])

    function customerPayment(values: IPaymentPostData) {
        if (id) {
            values.owner_id = id;
            dispatch(addCustomerPayment(values))
        }
    }

    return (
        <Container maxWidth={'md'}>
            <div>
                {!accountInfo ? null :
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <AccountTable tableData={accountInfo} tableName={`Movimientos de ${accountInfo.name}`}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper>
                                <Payment action={customerPayment}/>
                            </Paper>
                        </Grid>
                    </Grid>
                }
            </div>
        </Container>
    );
}