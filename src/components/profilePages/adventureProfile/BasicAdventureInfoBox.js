import "./AdventureProfilePage.scss";
import ArticleIcon from "@mui/icons-material/Article";
import ShowMoreText from "react-show-more-text";
import PersonIcon from "@mui/icons-material/Person";

function executeOnClick(isExpanded) {
  console.log(isExpanded);
}

function BasicAdventureInfoBox({ basicInfo }) {
  return (
    <div className="basicInfoContainer">
      <div>
        <div className="basicBoxItem">
          <ArticleIcon color="action" />
        </div>
        <label className="basicBoxItemTitle">Additional Equipment: </label>

        <div className="descriptionText">
          <ShowMoreText
            lines={3}
            more="Show more"
            less="Show less"
            className="content-css"
            anchorClass="my-anchor-css-class"
            onClick={executeOnClick}
            expanded={false}
            width={280}
            truncatedEndingComponent={"... "}
          >
            {basicInfo.additionalEquipment}
          </ShowMoreText>
        </div>
      </div>
      <br></br>
      <div>
        <div className="basicBoxItem">
          <ArticleIcon color="action" />
        </div>
        <label className="basicBoxItemTitle">Description: </label>
        <div className="descriptionText">
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
            {basicInfo.description}
          </ShowMoreText>
        </div>
      </div>
      <br></br>
      <div>
        <div className="basicBoxItem">
          <PersonIcon color="action" />
        </div>
        <label className="basicBoxItemTitle">Maximum number of people: </label>
        <label className="basicBoxItemText">{basicInfo.peopleNum}</label>
      </div>
    </div>
  );
}

export default BasicAdventureInfoBox;
