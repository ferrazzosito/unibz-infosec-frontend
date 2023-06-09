import { Grid } from "@mui/material";
import { SignUpForm } from "../fragments/Forms";
import { Title } from "../components/Typography";
import { useNavigate } from "react-router";
import { authContext, useUser } from "../hooks/useUser";
import AuthConsumer from "../hooks/useUser";
import { useContext } from "react";
import { useEffect } from "react";

const RegistrationPage = () => { 
    
    const navigate = useNavigate();

    const redirect = () => navigate("/");

    const {user, registerUser} = useContext(authContext);

    useEffect( () => {
        
        if(user && user.accessToken)
            redirect();
        
    }, [])

    // reload();

    return(
        <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={8}>
                <Title text="Sign Up" />
                <SignUpForm onSubmitForm = {registerUser} redirect = {redirect} />
                <span>Already have an account? &nbsp;
                    <span 
                        style={{textDecorationLine : "underline", cursor: "pointer"}} 
                        onClick={() => navigate("/login")}
                    > 
                         Sign In!
                    </span> 
                </span>
            </Grid>
        </Grid>
    )

}

export default RegistrationPage;