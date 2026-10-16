// Recovered from app.js:668705-668890.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import TitleBlockTemplate from "../templates/TitleBlockTemplate.html";
var getTitleBlockTemplate = () => TitleBlockTemplate;
class TitleBlock extends EyesPublicApi.StoryBaseContentBlock {}
TitleBlock.html = getTitleBlockTemplate();
export { TitleBlock };
