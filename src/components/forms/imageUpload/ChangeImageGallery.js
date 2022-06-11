
import "../../../style/AddAdventurePage.scss" 
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Grid } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";

function ChangeImageGallery({images, setImages}){


      const handleRemoveClick = index => {
        const list = [...images];
        list.splice(index, 1);
        setImages(list);
      };

    

    return(
        <div className="uploadGalleryContainer">
            {images.map((url, i)=>{
                // try{
                //     src = URL.createObjectURL(url);
                // }catch{
                //     src = url;
                // }
                return(
                    <div className="uploadedImg" >     
                        <img src={"data:image/jpg;base64," + url} width="150px" height="150px" className="img" /> 
                        <Grid>
                            <IconButton aria-label="delete" size="large" sx={{ marginLeft: "35%" }}  onClick={() => handleRemoveClick(i)}><DeleteIcon/></IconButton>  
                        </Grid>                     
                    </div >
                    
                );
            })
            
            }
        </div>
    )
}

export default ChangeImageGallery;