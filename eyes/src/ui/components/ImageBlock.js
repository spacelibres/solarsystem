// Recovered from app.js:669028-669417.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import ImageBlockTemplate from "../templates/ImageBlockTemplate.html";
import "../../styles/extracted/ImageBlockStyles.js";
var getImageBlockTemplate = () => ImageBlockTemplate;
class ImageBlock extends EyesPublicApi.StoryBaseContentBlock {
  onClick() {
    const t = this._element.cloneNode(true);
    t.classList.add("fullscreen");
    t.classList.remove("clickable");
    this._app.getComponent("overlay").setContent(t);
    this._app.getComponent("overlay").show();
  }
}
ImageBlock.html = getImageBlockTemplate();
export { ImageBlock };
