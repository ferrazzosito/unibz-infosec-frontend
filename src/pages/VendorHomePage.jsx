import { Grid } from "@mui/material";
import { BasicProductCard, BuyerProductCard, VendorProductCard } from "../fragments/ProductCards";
import { Title } from "../components/Typography";
import { ProductForm } from "../fragments/Forms";

const VendorHomePage = () => {

    return (
        <Grid container justifyContent="center" >
            <Grid item xs={12}>
                <Title text="Home Page" />
            </Grid>
            <Grid item container xs={12} justifyContent="center"> 
                <Grid item xs={7}>
                    <ProductForm />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Title text="Your Products" />
            </Grid>
            <Grid item container xs={9} spacing={7} justifyContent="center" >
                <Grid item xs={3}>
                    <VendorProductCard type="vulnerability" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />
                </Grid>
                <Grid item xs={3}>
                    <VendorProductCard type="vulnerability" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />
                </Grid>
                <Grid item xs={3}>
                    <VendorProductCard type="vulnerability" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />
                </Grid>
                <Grid item xs={3}>
                    <VendorProductCard type="vulnerability" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />
                </Grid>
                <Grid item xs={3}>
                    <VendorProductCard type="vulnerability" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />
                </Grid>
                <Grid item xs={3}>
                    <VendorProductCard type="vulnerability" name="Salt in Passwords" description="lorem ipsum lorem ipsum lorem ipsum" />
                </Grid>
            </Grid>
        </Grid>
    )

}

export default VendorHomePage;