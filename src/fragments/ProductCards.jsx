
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BuyButton, DeleteButton } from '../components/Buttons';

const ContentProductCard = ({type, name, description}) => (
    <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {type}
        </Typography>
        <Typography variant="h5" component="div">
            {name}
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

const BasicProductCard = ({type, name, description}) => {

    return (
        <Card sx={{ minWidth: 275 }}>
            <ContentProductCard type={type} name = {name} description={description }/>
        </Card>
    )

}

const BuyerProductCard = ({type, name, description}) => {

    return (
        <Card sx={{ minWidth: 275 }}>
            <ContentProductCard type={type} name = {name} description={description }/>
            <CardActions >
                <div style={{margin: "auto"}}>
                    <Button size="small" style={{marginRight: 10}}>See Reviews</Button>
                    <BuyButton alreadyOwned={false}/>
                </div>
            </CardActions>
        </Card>
    )

}

const VendorProductCard = ({type, name, description}) => {

    return (
        <Card sx={{ minWidth: 275 }}>
            <ContentProductCard type={type} name = {name} description={description }/>
            <CardActions >
                <div style={{margin: "auto"}}>
                    <Button size="small" style={{marginRight: 10}}>See Reviews</Button>
                    <DeleteButton/>
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

export {BasicProductCard, ReviewCard, BuyerProductCard, VendorProductCard}