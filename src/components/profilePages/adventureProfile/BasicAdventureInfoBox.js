import "./AdventureProfilePage.scss";
import ArticleIcon from "@mui/icons-material/Article";
import ShowMoreText from "react-show-more-text";

function executeOnClick(isExpanded) {
  console.log(isExpanded);
}

function BasicAdventureInfiBox({ basicInfo }) {
  return (
    <div className="basicInfoContainer">
      <div></div>
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
    </div>
  );
}

export default BasicAdventureInfiBox;
