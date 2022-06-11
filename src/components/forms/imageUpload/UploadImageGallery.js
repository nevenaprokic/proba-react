
import "../../../style/AddAdventurePage.scss" 
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Grid } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";

function UploadImageGallery({images, pictureSetInputList}){

    const handleRemoveClick = index => {
        const list = [...images];
        list.splice(index, 1);
        pictureSetInputList(list);

      };

    return(
        <div className="uploadGalleryContainer">
            {images.map((url, i)=>{
                let src;
                try{
                    src = URL.createObjectURL(url);
                }catch{
                    src = url;
                }
                return(
                   
                    <div className="uploadedImg" >     
                        <img src={src} width="150px" height="150px" className="img" /> 
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

export default UploadImageGallery;