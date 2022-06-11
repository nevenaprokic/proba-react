import LoyaltyCard from "./LoyaltyCard";
import { useEffect, useState } from "react";
import "./LoyaltyProgram.scss";
import { loyaltyCategory, userType } from "../../app/Enum";
import { getAllClientCategories, getAllOwnerCategories } from "../../services/LoyaltyService";
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
import { Button, Typography, IconButton } from "@mui/material";
import AddLoyaltyCategory from "../forms/loyaltyCategory/AddLoyaltyCategory";
import Modal from '@mui/material/Modal';
import AddBoxIcon from '@mui/icons-material/AddBox';

function LoyalyProgeramPage(){

    const [loyaltyCategories, setLoyaltyCategories] = useState();
    const [categoryType, setCategorType] = useState();
    const [openAddForm, setOpenAddForm] = useState(false);

    function handleOpenAddForm(){
        setOpenAddForm(true);
    }

    function handleCloseAddForm(){
        setOpenAddForm(false);
    }
     

    function handleClientCategory(){
        async function getData(){      
            const responseData = await getAllClientCategories();
            setLoyaltyCategories(responseData.data ? responseData.data : {}); 
            setCategorType(userType.CLIENT);
        }
        getData();
    }
    function handleOwnerCategory(){
        async function getData(){
                const responseData = await getAllOwnerCategories();
                console.log(responseData.data);
                setLoyaltyCategories(responseData.data ? responseData.data : {});
                setCategorType(userType.OWNER);
                console.log("qqqq", categoryType);
            }
            
        getData();


    }

    return (
        <div className="categoriesContainer">
            <div>
            <div className="categoryBtn">
            <Typography variant="h6" sx={{color:"#5f6d5f"}}>
                Select categories
            </Typography>
            </div>
            
            <div className="categoryBtn">
                <Button
                    size="midle"
                    variant="outlined"
                    bgcolor="secondary"
                    color="primary"
                    onClick={handleClientCategory}
                >
                    CLient categories
                </Button>
            </div>
            <div className="categoryBtn">
                    <Button
                        size="midle"
                        variant="outlined"
                        bgcolor="secondary"
                        color="primary"
                        onClick={handleOwnerCategory}
                    >
                            Owner categories
                        </Button>
                    
            </div>
            <div className="addBtn">
                    <IconButton
                        size="midle"
                        variant="outlined"
                        bgcolor="secondary"
                        color="primary"
                        onClick={handleOpenAddForm}
                    >
                            <AddBoxIcon/> New
                        </IconButton>

            </div>
            </div>
            {!!loyaltyCategories && !!setLoyaltyCategories &&
            <Container sx={{ py: 8}} >
                <Grid container spacing={5}> 
                    {loyaltyCategories.map((category) => (
                    <Grid item key={category.name} sx={{width: "330px"}}>
                        <LoyaltyCard type={categoryType} category={category} setLoyaltyCategories={setLoyaltyCategories}/>           
                    </Grid>
                    ))}
                </Grid>
            </Container>
            }

        <Modal
            open={openAddForm}
            onClose={handleCloseAddForm}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{backgroundColor:"rgb(218, 224, 210, 0.6)", overflow:"auto"}}
        >
                        <AddLoyaltyCategory close={handleCloseAddForm} setLoyaltyCategories={setLoyaltyCategories}/>
                    
        </Modal>
            
        </div>
        
    );

}

export default LoyalyProgeramPage;