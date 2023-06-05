
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BuyButton, DeleteButton } from '../components/Buttons';
import { useNavigate } from 'react-router';

const ContentProductCard = ({type, name, price, description}) => (
    <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {type}
        </Typography>
        <Typography variant="h5" component="div">
            {name}
        </Typography>
        <Typography variant="h5" sx={{ mb: 1.5 }} color="text.secondary">
            {price} $
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            by vendor x
        </Typography>
        <Typography variant="body2">
            {description}
        <br />
        </Typography>
    </CardContent>
)

const UnsafeContentProductCard = ({type, name, price, description}) => (
    <CardContent>
        <div color="text.secondary" gutterBottom dangerouslySetInnerHTML={{__html: type}}/>
        <div dangerouslySetInnerHTML={{__html: name}}/>
        <div sx={{ mb: 1.5 }} color="text.secondary" dangerouslySetInnerHTML={{__html: price}}/>
        <div sx={{ mb: 1.5 }} color="text.secondary">
            by vendor x
        </div>
        <div variant="body2" dangerouslySetInnerHTML={{__html: description}}/>
        <br />
    </CardContent>
)

const BasicProductCard = ({type, name, price, description}) => {
    // <ContentProductCard type={type} name = {name} price ={price} description={description }/>
    return (
        <Card sx={{ minWidth: 275 }}>
            <ContentProductCard type={type} name = {name} price ={price} description={description }/>
        </Card>
    )

}

const BuyerProductCard = ({id, type, name, price, description, buyFunction}) => {

    const navigate = useNavigate();
    const redirect = () => navigate(`/product?id=${id}`);
        // <ContentProductCard type={type} name = {name} price ={price} description={description }/>
    return (
        <Card sx={{ minWidth: 275 }}>
            <UnsafeContentProductCard type={type} name = {name} price ={price} description={description }/>
            <CardActions>
                <div style={{margin: "auto"}}>
                    <Button size="small" style={{marginRight: 10}} onClick={() => redirect()}>See Reviews</Button>
                    <BuyButton alreadyOwned={false}  buyFunction={buyFunction} />
                </div>
            </CardActions>
        </Card>
    )

}

const VendorProductCard = ({id, type, name, price, description, deleteFunction}) => {

    const navigate = useNavigate();
    const redirect = () => navigate(`/product?id=${id}`);

    return (
        <Card sx={{ minWidth: 275 }}>
            <ContentProductCard type={type} name = {name} price ={price}  description={description }/>
            <CardActions >
                <div style={{margin: "auto"}}>
                    <Button size="small" style={{marginRight: 10}} onClick={() => redirect()}>See Reviews</Button>
                    <DeleteButton onClick={() => deleteFunction(id)}/>
                </div>
            </CardActions>
        </Card>
    )

}

const ReviewCard = ({rating, title, description, writer, answer}) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {rating}
                </Typography>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    written by {writer}
                </Typography>
                <Typography variant="body2">
                    {description}
                <br />
                </Typography>
                {/* {answer ? <div style={{marginTop: 10}}> */}
                    {answer}
                    {/* <div/> : <></>} */}
            </CardContent>
        </Card>
    )
}

const OrderCard = ({basicProductCard, buyer, date, idProd}) => {

    const navigate = useNavigate();
    const reviewRedirect = () => navigate(`/product?id=${idProd}`);

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                {basicProductCard}
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    bought by {buyer} 
                    {/* on {date} */}
                </Typography>
                <div style={{margin: "auto"}}>
                    <Button size="small" style={{marginRight: 10}} onClick={() => reviewRedirect()}>See Reviews</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export {BasicProductCard, ReviewCard, BuyerProductCard, VendorProductCard, OrderCard}