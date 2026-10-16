import decoderManifest from '../../decoders/manifest.json' with { type: 'json' };
export function localDecoderUrl(resource, baseUrl = document.baseURI) {
  return new URL('decoders/' + decoderManifest.revision + '/' + resource, baseUrl).href;
}
