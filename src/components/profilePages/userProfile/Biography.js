
import ShowMoreText from "react-show-more-text";
import "./OwnerProfile.scss" ;
import ArticleIcon from '@mui/icons-material/Article';

function Biography({bigraphy}){

    function executeOnClick(isExpanded) {
        console.log(isExpanded);
    }

        return(
            <div>
                 <div className="boxItem">
                    <ArticleIcon color="action"/>
                </div>
                <label className="boxItemTitle">Biography: </label>
                <div className="biograpy">
                    <ShowMoreText
                        
                        lines={4}
                        more="Show more"
                        less="Show less"
                        className="content-css"
                        anchorClass="my-anchor-css-class"
                        onClick={executeOnClick}
                        expanded={false}
                        width={280}
                        truncatedEndingComponent={"... "}
                    >
                        {bigraphy}
                    </ShowMoreText>
                </div>
                
            </div>
            
        );
}

export default Biography;