import { Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getOfferMarks } from "../../../services/MarkService";
import './CottageProfilePage.scss';
import Rating from "@mui/material/Rating";

function MarksContainer({offerId}){

    const [marks, setMarks] = useState();
    const [error, setError] = useState();
    
    useEffect(() => {
        async function setData(){
            getOfferMarks(offerId).then(response => {
                
                setMarks(!!response.data ? response.data : []
                )
                
            }).catch((err) => setError(err.reposne))
        }
        setData();

    }, [])

    if(!!marks){
        console.log(marks);
        return(
            <div className="markContainer">
                 <div className="specialOffersTitle">
                <label className="tittle">Reviews:</label>
                <hr className="tittleLine"></hr>
            </div>

            <div className="specialOfferSrollBox">
          {marks.length != 0 ? (
            <>
              {marks.map((mark) => {
                console.log(marks);
                return (
                  <div className="scolledItemsContainer">
                    <h3 className="actionTittle">
                      {`${mark.reservationDTO.clienName} ${mark.reservationDTO.clientLastName}`}
                    </h3>
                    
                            <Rating
                            name="half-rating-read"
                            precision={0.5}
                            value={mark.mark}
                            readOnly
                            />
                    
                      <Typography variant="body1">
                        <label className="commentTitle"> Comment: </label>
                                           {mark.comment}
                      </Typography>

                    <Divider></Divider>
                    </div>
                );
              })}
            </>
          ) : (
            <h3 className="actionTittle"> There are no reviews. </h3>
          )}
        
      </div>
    </div>
        );
    }
    else if(!!error){
        return(
            toast.err(error.data, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 1500,
            })
        );
    }
    else{
        return null;
    }
}

export default MarksContainer;