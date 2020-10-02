import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import AccountTable from "./account-table";
import {fetchUserAccount} from "../../actions/actions";
import {Container, Grid} from "@material-ui/core";

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


    return (
        <Container maxWidth={'md'}>
            <div>
                {!accountInfo ? null :
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <AccountTable tableData={accountInfo} tableName={`Movimientos de ${accountInfo.name}`}/>
                        </Grid>
                    </Grid>
                }
            </div>
        </Container>
    );
}