import { Grid, Box} from "@mui/material";
import "./AdventureProfilePage.scss" ;
import { Carousel } from 'react-carousel-minimal';
 

function ImagesBox({images}){

    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
      }
      const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
      }
      return (
        <div className="App" maxHeight="300px" style={{marginTop: "0%"}}>
          <div style={{ textAlign: "center", alignItems: "center"}}>
            <div style={{
              padding: "0 10px"
            }}>
              <Carousel
                data={images}
                time={2000}
                width="850px"
                height="350px"
                captionStyle={captionStyle}
                radius="10px"
                slideNumber={true}
                slideNumberStyle={slideNumberStyle}
                captionPosition="bottom"
                automatic={true}
                dots={true}
                pauseIconColor="white"
                pauseIconSize="40px"npm start
                slideBackgroundColor="darkgrey"
                slideImageFit="cover"
                thumbnails={false}
                thumbnailWidth="100px"
                style={{
                  textAlign: "center",
                  maxWidth: "850px",
                  maxHeight: "500px",
                  margin: "40px auto",
                }}
              />
            </div>
          </div>
        </div>
      );
    }
    


export default ImagesBox;