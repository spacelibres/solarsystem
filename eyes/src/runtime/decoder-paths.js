/** @eyes-analysis
 * 文件职责：按 decoder manifest revision 构造解码器资源绝对 URL
 * 依据：imports: ../../decoders/manifest.json
 * 语义细节、命名依据和未确认项：docs/eyes-analysis/README.md 中本文件条目。
 * 短名称保留其作用域；语义建议不等同于恢复 NASA 未发布的原始标识符。
 */
import decoderManifest from '../../decoders/manifest.json' with { type: 'json' };
export function localDecoderUrl(resource, baseUrl = document.baseURI) {
  return new URL('decoders/' + decoderManifest.revision + '/' + resource, baseUrl).href;
}
