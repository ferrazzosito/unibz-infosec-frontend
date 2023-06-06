import { Grid } from "@mui/material";
import { BalanceCard, BasicProductCard, BuyerProductCard, VendorProductCard } from "../fragments/ProductCards";
import { Title } from "../components/Typography";
import { SearchField, UnsafeStringField } from "../components/FormComponents";
import { useEffect, useState } from "react";
import {SearchBar, UnsafeSearchBar} from "../fragments/SearchBar";
import { useNavigate } from "react-router";
import { useProducts } from "../hooks/useProducts";
import { useUser } from "../hooks/useUser";
import AuthConsumer from "../hooks/useUser";
import { ConfirmationButton } from "../components/Buttons";
import { useContext } from "react";
import { authContext } from "../hooks/useUser";
import { useOrders } from "../hooks/useOrders";
import { OrderCard } from "../fragments/ProductCards";
import { useReviews } from "../hooks/useReviews";
import { TopUpMoneyForm } from "../fragments/Forms";

const ProdCard = ({ordId, prodId, getProduct}) =>{

    const [vendorId, setVendorId] = useState(1);

    useEffect(
        () => {
            getProduct(prodId)
            .then (resp => {
                // console.log(JSON.stringify(resp))
                setVendorId(resp.vendorId)});
        }, []
    )

    console.log(vendorId);

    return (<BasicProductCard 
        // type="vulnerability" 
        name={ordId}
        vendorId={vendorId}
        // escription="lorem ipsum lorem ipsum lorem ipsum" 
    />)
}

const BuyerProfilePage = () => {

    const {user, logUser, registerUser, logout} = useContext(authContext);     

    const {orders} = useOrders(user.accessToken);
    const {reviews} = useReviews(user.accessToken);
    const {getProduct} = useProducts(user.accessToken);
    const {topUp} = useUser(user.accessToken);

    const [balance, setBalance] = useState("N/A");

    const navigate = useNavigate();
    const redirect = () => navigate("/");

    useEffect(() => {
        topUp(0).then(r => (setBalance(r.balance) || "N/A").toString());
    }, []);

    return (
    
        <Grid container justifyContent="center" >
            <Grid item xs={12}>
                <Title text="Profile Page" />
            </Grid>
            <Grid container xs={12} justifyContent="center">
                <BalanceCard amount={balance}/> 
            </Grid>
            <Grid  container xs={12} justifyContent="center">
                <TopUpMoneyForm onSubmitForm={({money}) => {
                    topUp(money).then(r => (setBalance(r.balance) || "N/A").toString());
                }}/> 
            </Grid>
            <Grid item xs={12}>
                <Title text="Your past orders" />
            </Grid>
            <Grid item container xs={12} justifyContent="center" spacing={7}>
                <Grid item container xs={12} justifyContent="center"> 
                    {orders.map((ord) => (
                            <Grid item xs={7}>
                                <OrderCard
                                    basicProductCard={  <ProdCard ordId = {ord.id} prodId = {ord.productId} getProduct = {getProduct}/>  }
                                    buyer="you"
                                    role={user.payload.role}
                                    approved={ord.approved}
                                        // date="10/20/2024"
                                    idProd = {ord.productId}
                                />
                            </Grid>
                        ))}
                    
                </Grid>
            </Grid>
        
            <Grid item container xs={12} justifyContent="center">
                <Grid item xs={7}>
                    <ConfirmationButton title={"Homepage"} onClick={() => { 
                        redirect()
                    }} />
                </Grid>
            </Grid>
            <Grid item container xs={12} justifyContent="center">
                <Grid item xs={7}>
                    <ConfirmationButton title={"Logout"} onClick={() => { 
                        logout()
                    }} />
                </Grid>
            </Grid>
            
        </Grid>
    )

}

export default BuyerProfilePage;