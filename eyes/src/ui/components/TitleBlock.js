// Recovered from app.js:668705-668890.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import TitleBlockTemplate from "../templates/TitleBlockTemplate.html";
var getTitleBlockTemplate = () => TitleBlockTemplate;
/* 此类只选择故事标题模板；状态、点击与进入退出行为完全继承 StoryBaseContentBlock，没有独立事件或资源所有权。 */
class TitleBlock extends EyesPublicApi.StoryBaseContentBlock {}
TitleBlock.html = getTitleBlockTemplate();
export { TitleBlock };
