// Recovered from app.js:669028-669417.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import ImageBlockTemplate from "../templates/ImageBlockTemplate.html";
import "../../styles/extracted/ImageBlockStyles.js";
var getImageBlockTemplate = () => ImageBlockTemplate;
/* 点击时复制当前图片节点交给共享 overlay；保留原图片在故事布局中的位置，覆盖层拥有副本的挂载位置。 */
class ImageBlock extends EyesPublicApi.StoryBaseContentBlock {
  onClick() {
    const expandedImage = this._element.cloneNode(true);
    expandedImage.classList.add("fullscreen");
    expandedImage.classList.remove("clickable");
    this._app.getComponent("overlay").setContent(expandedImage);
    this._app.getComponent("overlay").show();
  }
}
ImageBlock.html = getImageBlockTemplate();
export { ImageBlock };
