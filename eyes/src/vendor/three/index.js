// Recovered from vendors.js:154-386330.
import * as ThreeCore from "./core.js";
function i() {
  let e = null,
    t = !1,
    n = null,
    r = null;
  function i(t, a) {
    n(t, a), r = e.requestAnimationFrame(i);
  }
  return {
    start: function () {
      !0 !== t && null !== n && null !== e && (r = e.requestAnimationFrame(i), t = !0);
    },
    stop: function () {
      null !== e && e.cancelAnimationFrame(r), t = !1;
    },
    setAnimationLoop: function (e) {
      n = e;
    },
    setContext: function (t) {
      e = t;
    }
  };
}
function a(e) {
  const weakMap = new WeakMap();
  return {
    get: function (e) {
      return e.isInterleavedBufferAttribute && (e = e.data), weakMap.get(e);
    },
    remove: function (n) {
      n.isInterleavedBufferAttribute && (n = n.data);
      const r = weakMap.get(n);
      r && (e.deleteBuffer(r.buffer), weakMap.delete(n));
    },
    update: function (n, r) {
      if (n.isInterleavedBufferAttribute && (n = n.data), n.isGLBufferAttribute) {
        const e = weakMap.get(n);
        return void ((!e || e.version < n.version) && weakMap.set(n, {
          buffer: n.buffer,
          type: n.type,
          bytesPerElement: n.elementSize,
          version: n.version
        }));
      }
      const i = weakMap.get(n);
      if (void 0 === i) weakMap.set(n, function (t, n) {
        const r = t.array,
          i = t.usage,
          a = r.byteLength,
          s = e.createBuffer();
        let o;
        if (e.bindBuffer(n, s), e.bufferData(n, r, i), t.onUploadCallback(), r instanceof Float32Array) o = e.FLOAT;else if ("undefined" != typeof Float16Array && r instanceof Float16Array) o = e.HALF_FLOAT;else if (r instanceof Uint16Array) o = t.isFloat16BufferAttribute ? e.HALF_FLOAT : e.UNSIGNED_SHORT;else if (r instanceof Int16Array) o = e.SHORT;else if (r instanceof Uint32Array) o = e.UNSIGNED_INT;else if (r instanceof Int32Array) o = e.INT;else if (r instanceof Int8Array) o = e.BYTE;else if (r instanceof Uint8Array) o = e.UNSIGNED_BYTE;else {
          if (!(r instanceof Uint8ClampedArray)) throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + r);
          o = e.UNSIGNED_BYTE;
        }
        return {
          buffer: s,
          type: o,
          bytesPerElement: r.BYTES_PER_ELEMENT,
          version: t.version,
          size: a
        };
      }(n, r));else if (i.version < n.version) {
        if (i.size !== n.array.byteLength) throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
        !function (t, n, r) {
          const i = n.array,
            a = n.updateRanges;
          if (e.bindBuffer(r, t), 0 === a.length) e.bufferSubData(r, 0, i);else {
            a.sort((e, t) => e.start - t.start);
            let t = 0;
            for (let e = 1; e < a.length; e++) {
              const n = a[t],
                r = a[e];
              r.start <= n.start + n.count + 1 ? n.count = Math.max(n.count, r.start + r.count - n.start) : (++t, a[t] = r);
            }
            a.length = t + 1;
            for (let t = 0, n = a.length; t < n; t++) {
              const n = a[t];
              e.bufferSubData(r, n.start * i.BYTES_PER_ELEMENT, i, n.start, n.count);
            }
            n.clearUpdateRanges();
          }
          n.onUploadCallback();
        }(i.buffer, n, r), i.version = n.version;
      }
    }
  };
}
const ShaderChunk = {
    alphahash_fragment: "#ifdef USE_ALPHAHASH\n\tif ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n#endif",
    alphahash_pars_fragment: "#ifdef USE_ALPHAHASH\n\tconst float ALPHA_HASH_SCALE = 0.05;\n\tfloat hash2D( vec2 value ) {\n\t\treturn fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n\t}\n\tfloat hash3D( vec3 value ) {\n\t\treturn hash2D( vec2( hash2D( value.xy ), value.z ) );\n\t}\n\tfloat getAlphaHashThreshold( vec3 position ) {\n\t\tfloat maxDeriv = max(\n\t\t\tlength( dFdx( position.xyz ) ),\n\t\t\tlength( dFdy( position.xyz ) )\n\t\t);\n\t\tfloat pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n\t\tvec2 pixScales = vec2(\n\t\t\texp2( floor( log2( pixScale ) ) ),\n\t\t\texp2( ceil( log2( pixScale ) ) )\n\t\t);\n\t\tvec2 alpha = vec2(\n\t\t\thash3D( floor( pixScales.x * position.xyz ) ),\n\t\t\thash3D( floor( pixScales.y * position.xyz ) )\n\t\t);\n\t\tfloat lerpFactor = fract( log2( pixScale ) );\n\t\tfloat x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n\t\tfloat a = min( lerpFactor, 1.0 - lerpFactor );\n\t\tvec3 cases = vec3(\n\t\t\tx * x / ( 2.0 * a * ( 1.0 - a ) ),\n\t\t\t( x - 0.5 * a ) / ( 1.0 - a ),\n\t\t\t1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n\t\t);\n\t\tfloat threshold = ( x < ( 1.0 - a ) )\n\t\t\t? ( ( x < a ) ? cases.x : cases.y )\n\t\t\t: cases.z;\n\t\treturn clamp( threshold , 1.0e-6, 1.0 );\n\t}\n#endif",
    alphamap_fragment: "#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n#endif",
    alphamap_pars_fragment: "#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",
    alphatest_fragment: "#ifdef USE_ALPHATEST\n\t#ifdef ALPHA_TO_COVERAGE\n\tdiffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );\n\tif ( diffuseColor.a == 0.0 ) discard;\n\t#else\n\tif ( diffuseColor.a < alphaTest ) discard;\n\t#endif\n#endif",
    alphatest_pars_fragment: "#ifdef USE_ALPHATEST\n\tuniform float alphaTest;\n#endif",
    aomap_fragment: "#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_CLEARCOAT ) \n\t\tclearcoatSpecularIndirect *= ambientOcclusion;\n\t#endif\n\t#if defined( USE_SHEEN ) \n\t\tsheenSpecularIndirect *= ambientOcclusion;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n\t#endif\n#endif",
    aomap_pars_fragment: "#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",
    batching_pars_vertex: "#ifdef USE_BATCHING\n\t#if ! defined( GL_ANGLE_multi_draw )\n\t#define gl_DrawID _gl_DrawID\n\tuniform int _gl_DrawID;\n\t#endif\n\tuniform highp sampler2D batchingTexture;\n\tuniform highp usampler2D batchingIdTexture;\n\tmat4 getBatchingMatrix( const in float i ) {\n\t\tint size = textureSize( batchingTexture, 0 ).x;\n\t\tint j = int( i ) * 4;\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\tvec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n\t\tvec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n\t\tvec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n\t\tvec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n\t\treturn mat4( v1, v2, v3, v4 );\n\t}\n\tfloat getIndirectIndex( const in int i ) {\n\t\tint size = textureSize( batchingIdTexture, 0 ).x;\n\t\tint x = i % size;\n\t\tint y = i / size;\n\t\treturn float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );\n\t}\n#endif\n#ifdef USE_BATCHING_COLOR\n\tuniform sampler2D batchingColorTexture;\n\tvec4 getBatchingColor( const in float i ) {\n\t\tint size = textureSize( batchingColorTexture, 0 ).x;\n\t\tint j = int( i );\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\treturn texelFetch( batchingColorTexture, ivec2( x, y ), 0 );\n\t}\n#endif",
    batching_vertex: "#ifdef USE_BATCHING\n\tmat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );\n#endif",
    begin_vertex: "vec3 transformed = vec3( position );\n#ifdef USE_ALPHAHASH\n\tvPosition = vec3( position );\n#endif",
    beginnormal_vertex: "vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif",
    bsdfs: "float G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, 1.0, dotVH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n} // validated",
    iridescence_fragment: "#ifdef USE_IRIDESCENCE\n\tconst mat3 XYZ_TO_REC709 = mat3(\n\t\t 3.2404542, -0.9692660,  0.0556434,\n\t\t-1.5371385,  1.8760108, -0.2040259,\n\t\t-0.4985314,  0.0415560,  1.0572252\n\t);\n\tvec3 Fresnel0ToIor( vec3 fresnel0 ) {\n\t\tvec3 sqrtF0 = sqrt( fresnel0 );\n\t\treturn ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n\t}\n\tvec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n\t\treturn pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n\t}\n\tfloat IorToFresnel0( float transmittedIor, float incidentIor ) {\n\t\treturn pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n\t}\n\tvec3 evalSensitivity( float OPD, vec3 shift ) {\n\t\tfloat phase = 2.0 * PI * OPD * 1.0e-9;\n\t\tvec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n\t\tvec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n\t\tvec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n\t\tvec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n\t\txyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n\t\txyz /= 1.0685e-7;\n\t\tvec3 rgb = XYZ_TO_REC709 * xyz;\n\t\treturn rgb;\n\t}\n\tvec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n\t\tvec3 I;\n\t\tfloat iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n\t\tfloat sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n\t\tfloat cosTheta2Sq = 1.0 - sinTheta2Sq;\n\t\tif ( cosTheta2Sq < 0.0 ) {\n\t\t\treturn vec3( 1.0 );\n\t\t}\n\t\tfloat cosTheta2 = sqrt( cosTheta2Sq );\n\t\tfloat R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n\t\tfloat R12 = F_Schlick( R0, 1.0, cosTheta1 );\n\t\tfloat T121 = 1.0 - R12;\n\t\tfloat phi12 = 0.0;\n\t\tif ( iridescenceIOR < outsideIOR ) phi12 = PI;\n\t\tfloat phi21 = PI - phi12;\n\t\tvec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );\t\tvec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n\t\tvec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n\t\tvec3 phi23 = vec3( 0.0 );\n\t\tif ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n\t\tif ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n\t\tif ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n\t\tfloat OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n\t\tvec3 phi = vec3( phi21 ) + phi23;\n\t\tvec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n\t\tvec3 r123 = sqrt( R123 );\n\t\tvec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n\t\tvec3 C0 = R12 + Rs;\n\t\tI = C0;\n\t\tvec3 Cm = Rs - T121;\n\t\tfor ( int m = 1; m <= 2; ++ m ) {\n\t\t\tCm *= r123;\n\t\t\tvec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n\t\t\tI += Cm * Sm;\n\t\t}\n\t\treturn max( I, vec3( 0.0 ) );\n\t}\n#endif",
    bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vBumpMapUv );\n\t\tvec2 dSTdy = dFdy( vBumpMapUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\t\tvec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n\t\tvec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif",
    clipping_planes_fragment: "#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#ifdef ALPHA_TO_COVERAGE\n\t\tfloat distanceToPlane, distanceGradient;\n\t\tfloat clipOpacity = 1.0;\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tdistanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n\t\t\tdistanceGradient = fwidth( distanceToPlane ) / 2.0;\n\t\t\tclipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n\t\t\tif ( clipOpacity == 0.0 ) discard;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\t\tfloat unionClipOpacity = 1.0;\n\t\t\t#pragma unroll_loop_start\n\t\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\t\tplane = clippingPlanes[ i ];\n\t\t\t\tdistanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n\t\t\t\tdistanceGradient = fwidth( distanceToPlane ) / 2.0;\n\t\t\t\tunionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n\t\t\t}\n\t\t\t#pragma unroll_loop_end\n\t\t\tclipOpacity *= 1.0 - unionClipOpacity;\n\t\t#endif\n\t\tdiffuseColor.a *= clipOpacity;\n\t\tif ( diffuseColor.a == 0.0 ) discard;\n\t#else\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\t\tbool clipped = true;\n\t\t\t#pragma unroll_loop_start\n\t\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\t\tplane = clippingPlanes[ i ];\n\t\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t\t}\n\t\t\t#pragma unroll_loop_end\n\t\t\tif ( clipped ) discard;\n\t\t#endif\n\t#endif\n#endif",
    clipping_planes_pars_fragment: "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif",
    clipping_planes_pars_vertex: "#if NUM_CLIPPING_PLANES > 0\n\tvarying vec3 vClipPosition;\n#endif",
    clipping_planes_vertex: "#if NUM_CLIPPING_PLANES > 0\n\tvClipPosition = - mvPosition.xyz;\n#endif",
    color_fragment: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )\n\tdiffuseColor *= vColor;\n#endif",
    color_pars_fragment: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )\n\tvarying vec4 vColor;\n#endif",
    color_pars_vertex: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n\tvarying vec4 vColor;\n#endif",
    color_vertex: "#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n\tvColor = vec4( 1.0 );\n#endif\n#ifdef USE_COLOR_ALPHA\n\tvColor *= color;\n#elif defined( USE_COLOR )\n\tvColor.rgb *= color;\n#endif\n#ifdef USE_INSTANCING_COLOR\n\tvColor.rgb *= instanceColor.rgb;\n#endif\n#ifdef USE_BATCHING_COLOR\n\tvColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );\n#endif",
    common: "#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract( sin( sn ) * c );\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\n#ifdef USE_ALPHAHASH\n\tvarying vec3 vPosition;\n#endif\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\n#define inverseTransformDirection transformDirectionByInverseViewMatrix\nvec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {\n\treturn normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );\n}\nvec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n\treturn m[ 2 ][ 3 ] == - 1.0;\n}\nvec2 equirectUv( in vec3 dir ) {\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\treturn vec2( u, v );\n}\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n}\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n} // validated",
    cube_uv_reflection_fragment: "#ifdef ENVMAP_TYPE_CUBE_UV\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_minTileSize 16.0\n\tfloat getFace( vec3 direction ) {\n\t\tvec3 absDirection = abs( direction );\n\t\tfloat face = - 1.0;\n\t\tif ( absDirection.x > absDirection.z ) {\n\t\t\tif ( absDirection.x > absDirection.y )\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t} else {\n\t\t\tif ( absDirection.z > absDirection.y )\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\t\t\telse\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\t\t}\n\t\treturn face;\n\t}\n\tvec2 getUV( vec3 direction, float face ) {\n\t\tvec2 uv;\n\t\tif ( face == 0.0 ) {\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 1.0 ) {\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y );\n\t\t} else if ( face == 2.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z );\n\t\t} else if ( face == 3.0 ) {\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x );\n\t\t} else if ( face == 4.0 ) {\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y );\n\t\t} else {\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z );\n\t\t}\n\t\treturn 0.5 * ( uv + 1.0 );\n\t}\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\t\tfloat face = getFace( direction );\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\t\tfloat faceSize = exp2( mipInt );\n\t\thighp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;\n\t\tif ( face > 2.0 ) {\n\t\t\tuv.y += faceSize;\n\t\t\tface -= 3.0;\n\t\t}\n\t\tuv.x += face * faceSize;\n\t\tuv.x += filterInt * 3.0 * cubeUV_minTileSize;\n\t\tuv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );\n\t\tuv.x *= CUBEUV_TEXEL_WIDTH;\n\t\tuv.y *= CUBEUV_TEXEL_HEIGHT;\n\t\t#ifdef texture2DGradEXT\n\t\t\treturn texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;\n\t\t#else\n\t\t\treturn texture2D( envMap, uv ).rgb;\n\t\t#endif\n\t}\n\t#define cubeUV_r0 1.0\n\t#define cubeUV_m0 - 2.0\n\t#define cubeUV_r1 0.8\n\t#define cubeUV_m1 - 1.0\n\t#define cubeUV_r4 0.4\n\t#define cubeUV_m4 2.0\n\t#define cubeUV_r5 0.305\n\t#define cubeUV_m5 3.0\n\t#define cubeUV_r6 0.21\n\t#define cubeUV_m6 4.0\n\tfloat roughnessToMip( float roughness ) {\n\t\tfloat mip = 0.0;\n\t\tif ( roughness >= cubeUV_r1 ) {\n\t\t\tmip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;\n\t\t} else if ( roughness >= cubeUV_r4 ) {\n\t\t\tmip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;\n\t\t} else if ( roughness >= cubeUV_r5 ) {\n\t\t\tmip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;\n\t\t} else if ( roughness >= cubeUV_r6 ) {\n\t\t\tmip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;\n\t\t} else {\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness );\t\t}\n\t\treturn mip;\n\t}\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\t\tfloat mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );\n\t\tfloat mipF = fract( mip );\n\t\tfloat mipInt = floor( mip );\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\t\tif ( mipF == 0.0 ) {\n\t\t\treturn vec4( color0, 1.0 );\n\t\t} else {\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\t\t}\n\t}\n#endif",
    defaultnormal_vertex: "vec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = objectTangent;\n#endif\n#ifdef USE_BATCHING\n\tmat3 bm = mat3( batchingMatrix );\n\ttransformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n\ttransformedNormal = bm * transformedNormal;\n\t#ifdef USE_TANGENT\n\t\ttransformedTangent = bm * transformedTangent;\n\t#endif\n#endif\n#ifdef USE_INSTANCING\n\tmat3 im = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n\ttransformedNormal = im * transformedNormal;\n\t#ifdef USE_TANGENT\n\t\ttransformedTangent = im * transformedTangent;\n\t#endif\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\ttransformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n#endif",
    displacementmap_pars_vertex: "#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif",
    displacementmap_vertex: "#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n#endif",
    emissivemap_fragment: "#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n\t#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE\n\t\temissiveColor = sRGBTransferEOTF( emissiveColor );\n\t#endif\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif",
    emissivemap_pars_fragment: "#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif",
    colorspace_fragment: "gl_FragColor = linearToOutputTexel( gl_FragColor );",
    colorspace_pars_fragment: "vec4 LinearTransferOETF( in vec4 value ) {\n\treturn value;\n}\nvec4 sRGBTransferEOTF( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 sRGBTransferOETF( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}",
    envmap_fragment: "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, envMapRotation * reflectVec );\n\t\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t\t#endif\n\t#endif\n#endif",
    envmap_common_pars_fragment: "#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform mat3 envMapRotation;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n#endif",
    envmap_pars_fragment: "#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif",
    envmap_pars_vertex: "#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif",
    envmap_physical_pars_fragment: "#ifdef USE_ENVMAP\n\tvec3 getIBLIrradiance( const in vec3 normal ) {\n\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\t\t\tvec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );\n\t\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n\tvec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\t\t\tvec3 reflectVec = reflect( - viewDir, normal );\n\t\t\treflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );\n\t\t\treflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );\n\t\t\treturn envMapColor.rgb * envMapIntensity;\n\t\t#else\n\t\t\treturn vec3( 0.0 );\n\t\t#endif\n\t}\n\t#ifdef USE_ANISOTROPY\n\t\tvec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n\t\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\t\t\t\tvec3 bentNormal = cross( bitangent, viewDir );\n\t\t\t\tbentNormal = normalize( cross( bentNormal, bitangent ) );\n\t\t\t\tbentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n\t\t\t\treturn getIBLRadiance( viewDir, bentNormal, roughness );\n\t\t\t#else\n\t\t\t\treturn vec3( 0.0 );\n\t\t\t#endif\n\t\t}\n\t#endif\n#endif",
    envmap_vertex: "#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif",
    fog_vertex: "#ifdef USE_FOG\n\tvFogDepth = - mvPosition.z;\n#endif",
    fog_pars_vertex: "#ifdef USE_FOG\n\tvarying float vFogDepth;\n#endif",
    fog_fragment: "#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif",
    fog_pars_fragment: "#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float vFogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif",
    gradientmap_pars_fragment: "#ifdef USE_GRADIENTMAP\n\tuniform sampler2D gradientMap;\n#endif\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t#ifdef USE_GRADIENTMAP\n\t\treturn vec3( texture2D( gradientMap, coord ).r );\n\t#else\n\t\tvec2 fw = fwidth( coord ) * 0.5;\n\t\treturn mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n\t#endif\n}",
    lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",
    lights_lambert_fragment: "LambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;",
    lights_lambert_pars_fragment: "varying vec3 vViewPosition;\nstruct LambertMaterial {\n\tvec3 diffuseColor;\n\tfloat specularStrength;\n};\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Lambert\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Lambert",
    lights_pars_begin: "uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n#if defined( USE_LIGHT_PROBES )\n\tuniform vec3 lightProbe[ 9 ];\n#endif\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n\tvec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\treturn irradiance;\n}\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif ( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n}\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n\treturn smoothstep( coneCosine, penumbraCosine, angleCosine );\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n\t\tlight.color = directionalLight.color;\n\t\tlight.direction = directionalLight.direction;\n\t\tlight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n\t\tvec3 lVector = pointLight.position - geometryPosition;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tlight.color = pointLight.color;\n\t\tlight.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n\t\tvec3 lVector = spotLight.position - geometryPosition;\n\t\tlight.direction = normalize( lVector );\n\t\tfloat angleCos = dot( light.direction, spotLight.direction );\n\t\tfloat spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\tif ( spotAttenuation > 0.0 ) {\n\t\t\tfloat lightDistance = length( lVector );\n\t\t\tlight.color = spotLight.color * spotAttenuation;\n\t\t\tlight.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\t\t} else {\n\t\t\tlight.color = vec3( 0.0 );\n\t\t\tlight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n\t\tfloat dotNL = dot( normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\treturn irradiance;\n\t}\n#endif\n#include <lightprobes_pars_fragment>",
    lights_toon_fragment: "ToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;",
    lights_toon_pars_fragment: "varying vec3 vViewPosition;\nstruct ToonMaterial {\n\tvec3 diffuseColor;\n};\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon",
    lights_phong_fragment: "BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;",
    lights_phong_pars_fragment: "varying vec3 vViewPosition;\nstruct BlinnPhongMaterial {\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong",
    lights_physical_fragment: "PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.metalness = metalnessFactor;\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\nmaterial.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n#ifdef IOR\n\tmaterial.ior = ior;\n\t#ifdef USE_SPECULAR\n\t\tfloat specularIntensityFactor = specularIntensity;\n\t\tvec3 specularColorFactor = specularColor;\n\t\t#ifdef USE_SPECULAR_COLORMAP\n\t\t\tspecularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n\t\t#endif\n\t\t#ifdef USE_SPECULAR_INTENSITYMAP\n\t\t\tspecularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n\t\t#endif\n\t\tmaterial.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n\t#else\n\t\tfloat specularIntensityFactor = 1.0;\n\t\tvec3 specularColorFactor = vec3( 1.0 );\n\t\tmaterial.specularF90 = 1.0;\n\t#endif\n\tmaterial.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;\n\tmaterial.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = vec3( 0.04 );\n\tmaterial.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );\n\tmaterial.specularF90 = 1.0;\n#endif\n#ifdef USE_CLEARCOAT\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\tmaterial.clearcoatF0 = vec3( 0.04 );\n\tmaterial.clearcoatF90 = 1.0;\n\t#ifdef USE_CLEARCOATMAP\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n\t#endif\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n\t#endif\n\tmaterial.clearcoat = saturate( material.clearcoat );\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n#endif\n#ifdef USE_DISPERSION\n\tmaterial.dispersion = dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n\tmaterial.iridescence = iridescence;\n\tmaterial.iridescenceIOR = iridescenceIOR;\n\t#ifdef USE_IRIDESCENCEMAP\n\t\tmaterial.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n\t#endif\n\t#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\t\tmaterial.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n\t#else\n\t\tmaterial.iridescenceThickness = iridescenceThicknessMaximum;\n\t#endif\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheenColor;\n\t#ifdef USE_SHEEN_COLORMAP\n\t\tmaterial.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n\t#endif\n\tmaterial.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\t\tmaterial.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n\t#endif\n#endif\n#ifdef USE_ANISOTROPY\n\t#ifdef USE_ANISOTROPYMAP\n\t\tmat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n\t\tvec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n\t\tvec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n\t#else\n\t\tvec2 anisotropyV = anisotropyVector;\n\t#endif\n\tmaterial.anisotropy = length( anisotropyV );\n\tif( material.anisotropy == 0.0 ) {\n\t\tanisotropyV = vec2( 1.0, 0.0 );\n\t} else {\n\t\tanisotropyV /= material.anisotropy;\n\t\tmaterial.anisotropy = saturate( material.anisotropy );\n\t}\n\tmaterial.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n\tmaterial.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n\tmaterial.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n#endif",
    lights_physical_pars_fragment: "uniform sampler2D dfgLUT;\nstruct PhysicalMaterial {\n\tvec3 diffuseColor;\n\tvec3 diffuseContribution;\n\tvec3 specularColor;\n\tvec3 specularColorBlended;\n\tfloat roughness;\n\tfloat metalness;\n\tfloat specularF90;\n\tfloat dispersion;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat clearcoat;\n\t\tfloat clearcoatRoughness;\n\t\tvec3 clearcoatF0;\n\t\tfloat clearcoatF90;\n\t#endif\n\t#ifdef USE_IRIDESCENCE\n\t\tfloat iridescence;\n\t\tfloat iridescenceIOR;\n\t\tfloat iridescenceThickness;\n\t\tvec3 iridescenceFresnel;\n\t\tvec3 iridescenceF0;\n\t\tvec3 iridescenceFresnelDielectric;\n\t\tvec3 iridescenceFresnelMetallic;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tvec3 sheenColor;\n\t\tfloat sheenRoughness;\n\t#endif\n\t#ifdef IOR\n\t\tfloat ior;\n\t#endif\n\t#ifdef USE_TRANSMISSION\n\t\tfloat transmission;\n\t\tfloat transmissionAlpha;\n\t\tfloat thickness;\n\t\tfloat attenuationDistance;\n\t\tvec3 attenuationColor;\n\t#endif\n\t#ifdef USE_ANISOTROPY\n\t\tfloat anisotropy;\n\t\tfloat alphaT;\n\t\tvec3 anisotropyT;\n\t\tvec3 anisotropyB;\n\t#endif\n};\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\n#ifdef USE_ANISOTROPY\n\tfloat V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n\t\tfloat gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n\t\tfloat gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n\t\treturn 0.5 / max( gv + gl, EPSILON );\n\t}\n\tfloat D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n\t\tfloat a2 = alphaT * alphaB;\n\t\thighp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n\t\thighp float v2 = dot( v, v );\n\t\tfloat w2 = a2 / v2;\n\t\treturn RECIPROCAL_PI * a2 * pow2 ( w2 );\n\t}\n#endif\n#ifdef USE_CLEARCOAT\n\tvec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n\t\tvec3 f0 = material.clearcoatF0;\n\t\tfloat f90 = material.clearcoatF90;\n\t\tfloat roughness = material.clearcoatRoughness;\n\t\tfloat alpha = pow2( roughness );\n\t\tvec3 halfDir = normalize( lightDir + viewDir );\n\t\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\t\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\t\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\t\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\t\tvec3 F = F_Schlick( f0, f90, dotVH );\n\t\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\t\tfloat D = D_GGX( alpha, dotNH );\n\t\treturn F * ( V * D );\n\t}\n#endif\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n\tvec3 f0 = material.specularColorBlended;\n\tfloat f90 = material.specularF90;\n\tfloat roughness = material.roughness;\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\tvec3 F = F_Schlick( f0, f90, dotVH );\n\t#ifdef USE_IRIDESCENCE\n\t\tF = mix( F, material.iridescenceFresnel, material.iridescence );\n\t#endif\n\t#ifdef USE_ANISOTROPY\n\t\tfloat dotTL = dot( material.anisotropyT, lightDir );\n\t\tfloat dotTV = dot( material.anisotropyT, viewDir );\n\t\tfloat dotTH = dot( material.anisotropyT, halfDir );\n\t\tfloat dotBL = dot( material.anisotropyB, lightDir );\n\t\tfloat dotBV = dot( material.anisotropyB, viewDir );\n\t\tfloat dotBH = dot( material.anisotropyB, halfDir );\n\t\tfloat V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n\t\tfloat D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );\n\t#else\n\t\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\t\tfloat D = D_GGX( alpha, dotNH );\n\t#endif\n\treturn F * ( V * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transpose( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie( float roughness, float dotNH ) {\n\tfloat alpha = pow2( roughness );\n\tfloat invAlpha = 1.0 / alpha;\n\tfloat cos2h = dotNH * dotNH;\n\tfloat sin2h = max( 1.0 - cos2h, 0.0078125 );\n\treturn ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n}\nfloat V_Neubelt( float dotNV, float dotNL ) {\n\treturn saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n}\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat D = D_Charlie( sheenRoughness, dotNH );\n\tfloat V = V_Neubelt( dotNV, dotNL );\n\treturn sheenColor * ( D * V );\n}\n#endif\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat r2 = roughness * roughness;\n\tfloat rInv = 1.0 / ( roughness + 0.1 );\n\tfloat a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;\n\tfloat b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;\n\tfloat DG = exp( a * dotNV + b );\n\treturn saturate( DG );\n}\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tvec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;\n\treturn specularColor * fab.x + specularF90 * fab.y;\n}\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tvec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;\n\t#ifdef USE_IRIDESCENCE\n\t\tvec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n\t#else\n\t\tvec3 Fr = specularColor;\n\t#endif\n\tvec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n\tfloat Ess = fab.x + fab.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\nvec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n\tvec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tvec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;\n\tvec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;\n\tvec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;\n\tvec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;\n\tfloat Ess_V = dfgV.x + dfgV.y;\n\tfloat Ess_L = dfgL.x + dfgL.y;\n\tfloat Ems_V = 1.0 - Ess_V;\n\tfloat Ems_L = 1.0 - Ess_L;\n\tvec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;\n\tvec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );\n\tfloat compensationFactor = Ems_V * Ems_L;\n\tvec3 multiScatter = Fms * compensationFactor;\n\treturn singleScatter + multiScatter;\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometryNormal;\n\t\tvec3 viewDir = geometryViewDir;\n\t\tvec3 position = geometryPosition;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.roughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t\t#ifdef USE_CLEARCOAT\n\t\t\tvec3 Ncc = geometryClearcoatNormal;\n\t\t\tvec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );\n\t\t\tvec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );\n\t\t\tvec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );\n\t\t\tmat3 mInvClearcoat = mat3(\n\t\t\t\tvec3( t1Clearcoat.x, 0, t1Clearcoat.y ),\n\t\t\t\tvec3(             0, 1,             0 ),\n\t\t\t\tvec3( t1Clearcoat.z, 0, t1Clearcoat.w )\n\t\t\t);\n\t\t\tvec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;\n\t\t\tclearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );\n\t\t#endif\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = dotNLcc * directLight.color;\n\t\tclearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n\t#endif\n\t#ifdef USE_SHEEN\n \n \t\tsheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n \n \t\tfloat sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n \t\tfloat sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );\n \n \t\tfloat sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );\n \n \t\tirradiance *= sheenEnergyComp;\n \n \t#endif\n\treflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tvec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );\n\t#ifdef USE_SHEEN\n\t\tfloat sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n\t\tfloat sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n\t\tdiffuse *= sheenEnergyComp;\n\t#endif\n\treflectedLight.indirectDiffuse += diffuse;\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\t#endif\n\t#ifdef USE_SHEEN\n\t\tsheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;\n \t#endif\n\tvec3 singleScatteringDielectric = vec3( 0.0 );\n\tvec3 multiScatteringDielectric = vec3( 0.0 );\n\tvec3 singleScatteringMetallic = vec3( 0.0 );\n\tvec3 multiScatteringMetallic = vec3( 0.0 );\n\t#ifdef USE_IRIDESCENCE\n\t\tcomputeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );\n\t\tcomputeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );\n\t#else\n\t\tcomputeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );\n\t\tcomputeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );\n\t#endif\n\tvec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );\n\tvec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );\n\tvec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;\n\tvec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\tvec3 indirectSpecular = radiance * singleScattering;\n\tindirectSpecular += multiScattering * cosineWeightedIrradiance;\n\tvec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;\n\t#ifdef USE_SHEEN\n\t\tfloat sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n\t\tfloat sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;\n\t\tindirectSpecular *= sheenEnergyComp;\n\t\tindirectDiffuse *= sheenEnergyComp;\n\t#endif\n\treflectedLight.indirectSpecular += indirectSpecular;\n\treflectedLight.indirectDiffuse += indirectDiffuse;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}",
    lights_fragment_begin: "\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n#ifdef USE_CLEARCOAT\n\tgeometryClearcoatNormal = clearcoatNormal;\n#endif\n#ifdef USE_IRIDESCENCE\n\tfloat dotNVi = saturate( dot( normal, geometryViewDir ) );\n\tif ( material.iridescenceThickness == 0.0 ) {\n\t\tmaterial.iridescence = 0.0;\n\t} else {\n\t\tmaterial.iridescence = saturate( material.iridescence );\n\t}\n\tif ( material.iridescence > 0.0 ) {\n\t\tmaterial.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n\t\tmaterial.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );\n\t\tmaterial.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );\n\t\tmaterial.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );\n\t}\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointLightInfo( pointLight, geometryPosition, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\tvec4 spotColor;\n\tvec3 spotLightCoord;\n\tbool inSpotLightMap;\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotLightInfo( spotLight, geometryPosition, directLight );\n\t\t#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n\t\t#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n\t\t#else\n\t\t#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#endif\n\t\t#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n\t\t\tspotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n\t\t\tinSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n\t\t\tspotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n\t\t\tdirectLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n\t\t#endif\n\t\t#undef SPOT_LIGHT_MAP_INDEX\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalLightInfo( directionalLight, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\t}\n\t#pragma unroll_loop_end\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#if defined( USE_LIGHT_PROBES )\n\t\tirradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n\t#endif\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n\t#ifdef USE_LIGHT_PROBES_GRID\n\t\tvec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;\n\t\tvec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );\n\t\tirradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif",
    lights_fragment_maps: "#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\t#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )\n\t\t\tiblIrradiance += getIBLIrradiance( geometryNormal );\n\t\t#endif\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\t#ifdef USE_ANISOTROPY\n\t\tradiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n\t#else\n\t\tradiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n\t#endif\n\t#ifdef USE_CLEARCOAT\n\t\tclearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n\t#endif\n#endif",
    lights_fragment_end: "#if defined( RE_IndirectDiffuse )\n\t#if defined( LAMBERT ) || defined( PHONG )\n\t\tirradiance += iblIrradiance;\n\t#endif\n\tRE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n#endif",
    lightprobes_pars_fragment: "#ifdef USE_LIGHT_PROBES_GRID\nuniform highp sampler3D probesSH;\nuniform vec3 probesMin;\nuniform vec3 probesMax;\nuniform vec3 probesResolution;\nvec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {\n\tvec3 res = probesResolution;\n\tvec3 gridRange = probesMax - probesMin;\n\tvec3 resMinusOne = res - 1.0;\n\tvec3 probeSpacing = gridRange / resMinusOne;\n\tvec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;\n\tvec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );\n\tuvw = uvw * resMinusOne / res + 0.5 / res;\n\tfloat nz          = res.z;\n\tfloat paddedSlices = nz + 2.0;\n\tfloat atlasDepth  = 7.0 * paddedSlices;\n\tfloat uvZBase     = uvw.z * nz + 1.0;\n\tvec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );\n\tvec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );\n\tvec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );\n\tvec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );\n\tvec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );\n\tvec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );\n\tvec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );\n\tvec3 c0 = s0.xyz;\n\tvec3 c1 = vec3( s0.w, s1.xy );\n\tvec3 c2 = vec3( s1.zw, s2.x );\n\tvec3 c3 = s2.yzw;\n\tvec3 c4 = s3.xyz;\n\tvec3 c5 = vec3( s3.w, s4.xy );\n\tvec3 c6 = vec3( s4.zw, s5.x );\n\tvec3 c7 = s5.yzw;\n\tvec3 c8 = s6.xyz;\n\tfloat x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;\n\tvec3 result = c0 * 0.886227;\n\tresult += c1 * 2.0 * 0.511664 * y;\n\tresult += c2 * 2.0 * 0.511664 * z;\n\tresult += c3 * 2.0 * 0.511664 * x;\n\tresult += c4 * 2.0 * 0.429043 * x * y;\n\tresult += c5 * 2.0 * 0.429043 * y * z;\n\tresult += c6 * ( 0.743125 * z * z - 0.247708 );\n\tresult += c7 * 2.0 * 0.429043 * x * z;\n\tresult += c8 * 0.429043 * ( x * x - y * y );\n\treturn max( result, vec3( 0.0 ) );\n}\n#endif",
    logdepthbuf_fragment: "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n\tgl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif",
    logdepthbuf_pars_fragment: "#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif",
    logdepthbuf_pars_vertex: "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif",
    logdepthbuf_vertex: "#ifdef USE_LOGARITHMIC_DEPTH_BUFFER\n\tvFragDepth = 1.0 + gl_Position.w;\n\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n#endif",
    map_fragment: "#ifdef USE_MAP\n\tvec4 sampledDiffuseColor = texture2D( map, vMapUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\tsampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );\n\t#endif\n\tdiffuseColor *= sampledDiffuseColor;\n#endif",
    map_pars_fragment: "#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif",
    map_particle_fragment: "#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\t#if defined( USE_POINTS_UV )\n\t\tvec2 uv = vUv;\n\t#else\n\t\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\t#endif\n#endif\n#ifdef USE_MAP\n\tdiffuseColor *= texture2D( map, uv );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif",
    map_particle_pars_fragment: "#if defined( USE_POINTS_UV )\n\tvarying vec2 vUv;\n#else\n\t#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\t\tuniform mat3 uvTransform;\n\t#endif\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif",
    metalnessmap_fragment: "float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif",
    metalnessmap_pars_fragment: "#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",
    morphinstance_vertex: "#ifdef USE_INSTANCING_MORPH\n\tfloat morphTargetInfluences[ MORPHTARGETS_COUNT ];\n\tfloat morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\tmorphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;\n\t}\n#endif",
    morphcolor_vertex: "#if defined( USE_MORPHCOLORS )\n\tvColor *= morphTargetBaseInfluence;\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\t#if defined( USE_COLOR_ALPHA )\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n\t\t#elif defined( USE_COLOR )\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n\t\t#endif\n\t}\n#endif",
    morphnormal_vertex: "#ifdef USE_MORPHNORMALS\n\tobjectNormal *= morphTargetBaseInfluence;\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\tif ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n\t}\n#endif",
    morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n\t#ifndef USE_INSTANCING_MORPH\n\t\tuniform float morphTargetBaseInfluence;\n\t\tuniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n\t#endif\n\tuniform sampler2DArray morphTargetsTexture;\n\tuniform ivec2 morphTargetsTextureSize;\n\tvec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n\t\tint texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n\t\tint y = texelIndex / morphTargetsTextureSize.x;\n\t\tint x = texelIndex - y * morphTargetsTextureSize.x;\n\t\tivec3 morphUV = ivec3( x, y, morphTargetIndex );\n\t\treturn texelFetch( morphTargetsTexture, morphUV, 0 );\n\t}\n#endif",
    morphtarget_vertex: "#ifdef USE_MORPHTARGETS\n\ttransformed *= morphTargetBaseInfluence;\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\t\tif ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n\t}\n#endif",
    normal_fragment_begin: "float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n#ifdef FLAT_SHADED\n\tvec3 fdx = dFdx( vViewPosition );\n\tvec3 fdy = dFdy( vViewPosition );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal *= faceDirection;\n\t#endif\n#endif\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n\t#ifdef USE_TANGENT\n\t\tmat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\t#else\n\t\tmat3 tbn = getTangentFrame( - vViewPosition, normal,\n\t\t#if defined( USE_NORMALMAP )\n\t\t\tvNormalMapUv\n\t\t#elif defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tvClearcoatNormalMapUv\n\t\t#else\n\t\t\tvUv\n\t\t#endif\n\t\t);\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\ttbn[0] *= faceDirection;\n\t\ttbn[1] *= faceDirection;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\t#ifdef USE_TANGENT\n\t\tmat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\t#else\n\t\tmat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\ttbn2[0] *= faceDirection;\n\t\ttbn2[1] *= faceDirection;\n\t#endif\n#endif\nvec3 nonPerturbedNormal = normal;",
    normal_fragment_maps: "#ifdef USE_NORMALMAP_OBJECTSPACE\n\tnormal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * faceDirection;\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n\tvec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n\t#if defined( USE_PACKED_NORMALMAP )\n\t\tmapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );\n\t#endif\n\tmapN.xy *= normalScale;\n\tnormal = normalize( tbn * mapN );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n#endif",
    normal_pars_fragment: "#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif",
    normal_pars_vertex: "#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif",
    normal_vertex: "#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t\t#ifdef FLIP_SIDED\n\t\t\tvBitangent = - vBitangent;\n\t\t#endif\n\t#endif\n#endif",
    normalmap_pars_fragment: "#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef USE_NORMALMAP_OBJECTSPACE\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n\tmat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( uv.st );\n\t\tvec2 st1 = dFdy( uv.st );\n\t\tvec3 N = surf_norm;\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n\t\treturn mat3( T * scale, B * scale, N );\n\t}\n#endif",
    clearcoat_normal_fragment_begin: "#ifdef USE_CLEARCOAT\n\tvec3 clearcoatNormal = nonPerturbedNormal;\n#endif",
    clearcoat_normal_fragment_maps: "#ifdef USE_CLEARCOAT_NORMALMAP\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\tclearcoatNormal = normalize( tbn2 * clearcoatMapN );\n#endif",
    clearcoat_pars_fragment: "#ifdef USE_CLEARCOATMAP\n\tuniform sampler2D clearcoatMap;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform sampler2D clearcoatRoughnessMap;\n#endif",
    iridescence_pars_fragment: "#ifdef USE_IRIDESCENCEMAP\n\tuniform sampler2D iridescenceMap;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tuniform sampler2D iridescenceThicknessMap;\n#endif",
    opaque_fragment: "#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );",
    packing: "vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;\nconst float Inv255 = 1. / 255.;\nconst vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );\nconst vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );\nconst vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );\nconst vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );\nvec4 packDepthToRGBA( const in float v ) {\n\tif( v <= 0.0 )\n\t\treturn vec4( 0., 0., 0., 0. );\n\tif( v >= 1.0 )\n\t\treturn vec4( 1., 1., 1., 1. );\n\tfloat vuf;\n\tfloat af = modf( v * PackFactors.a, vuf );\n\tfloat bf = modf( vuf * ShiftRight8, vuf );\n\tfloat gf = modf( vuf * ShiftRight8, vuf );\n\treturn vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );\n}\nvec3 packDepthToRGB( const in float v ) {\n\tif( v <= 0.0 )\n\t\treturn vec3( 0., 0., 0. );\n\tif( v >= 1.0 )\n\t\treturn vec3( 1., 1., 1. );\n\tfloat vuf;\n\tfloat bf = modf( v * PackFactors.b, vuf );\n\tfloat gf = modf( vuf * ShiftRight8, vuf );\n\treturn vec3( vuf * Inv255, gf * PackUpscale, bf );\n}\nvec2 packDepthToRG( const in float v ) {\n\tif( v <= 0.0 )\n\t\treturn vec2( 0., 0. );\n\tif( v >= 1.0 )\n\t\treturn vec2( 1., 1. );\n\tfloat vuf;\n\tfloat gf = modf( v * 256., vuf );\n\treturn vec2( vuf * Inv255, gf );\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors4 );\n}\nfloat unpackRGBToDepth( const in vec3 v ) {\n\treturn dot( v, UnpackFactors3 );\n}\nfloat unpackRGToDepth( const in vec2 v ) {\n\treturn v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;\n}\nvec4 pack2HalfToRGBA( const in vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\nvec2 unpackRGBATo2Half( const in vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\t#ifdef USE_REVERSED_DEPTH_BUFFER\n\t\n\t\treturn depth * ( far - near ) - far;\n\t#else\n\t\treturn depth * ( near - far ) - near;\n\t#endif\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\t\n\t#ifdef USE_REVERSED_DEPTH_BUFFER\n\t\treturn ( near * far ) / ( ( near - far ) * depth - near );\n\t#else\n\t\treturn ( near * far ) / ( ( far - near ) * depth - far );\n\t#endif\n}",
    premultiplied_alpha_fragment: "#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif",
    project_vertex: "vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_BATCHING\n\tmvPosition = batchingMatrix * mvPosition;\n#endif\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;",
    dithering_fragment: "#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif",
    dithering_pars_fragment: "#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif",
    roughnessmap_fragment: "float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n\troughnessFactor *= texelRoughness.g;\n#endif",
    roughnessmap_pars_fragment: "#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",
    shadowmap_pars_fragment: "#if NUM_SPOT_LIGHT_COORDS > 0\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#if NUM_SPOT_LIGHT_MAPS > 0\n\tuniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n#endif\n#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tuniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\t#else\n\t\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\t#endif\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tuniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\t#else\n\t\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\t#endif\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tuniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\t#elif defined( SHADOWMAP_TYPE_BASIC )\n\t\t\tuniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\t#endif\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\tfloat interleavedGradientNoise( vec2 position ) {\n\t\t\treturn fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );\n\t\t}\n\t\tvec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {\n\t\t\tconst float goldenAngle = 2.399963229728653;\n\t\t\tfloat r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );\n\t\t\tfloat theta = float( sampleIndex ) * goldenAngle + phi;\n\t\t\treturn vec2( cos( theta ), sin( theta ) ) * r;\n\t\t}\n\t#endif\n\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\tfloat getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\t\tfloat shadow = 1.0;\n\t\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\t\tshadowCoord.z += shadowBias;\n\t\t\tbool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n\t\t\tbool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n\t\t\tif ( frustumTest ) {\n\t\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\t\tfloat radius = shadowRadius * texelSize.x;\n\t\t\t\tfloat phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;\n\t\t\t\tshadow = (\n\t\t\t\t\ttexture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +\n\t\t\t\t\ttexture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +\n\t\t\t\t\ttexture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +\n\t\t\t\t\ttexture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +\n\t\t\t\t\ttexture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )\n\t\t\t\t) * 0.2;\n\t\t\t}\n\t\t\treturn mix( 1.0, shadow, shadowIntensity );\n\t\t}\n\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\t\tfloat shadow = 1.0;\n\t\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\t\t#ifdef USE_REVERSED_DEPTH_BUFFER\n\t\t\t\tshadowCoord.z -= shadowBias;\n\t\t\t#else\n\t\t\t\tshadowCoord.z += shadowBias;\n\t\t\t#endif\n\t\t\tbool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n\t\t\tbool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n\t\t\tif ( frustumTest ) {\n\t\t\t\tvec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;\n\t\t\t\tfloat mean = distribution.x;\n\t\t\t\tfloat variance = distribution.y * distribution.y;\n\t\t\t\t#ifdef USE_REVERSED_DEPTH_BUFFER\n\t\t\t\t\tfloat hard_shadow = step( mean, shadowCoord.z );\n\t\t\t\t#else\n\t\t\t\t\tfloat hard_shadow = step( shadowCoord.z, mean );\n\t\t\t\t#endif\n\t\t\t\t\n\t\t\t\tif ( hard_shadow == 1.0 ) {\n\t\t\t\t\tshadow = 1.0;\n\t\t\t\t} else {\n\t\t\t\t\tvariance = max( variance, 0.0000001 );\n\t\t\t\t\tfloat d = shadowCoord.z - mean;\n\t\t\t\t\tfloat p_max = variance / ( variance + d * d );\n\t\t\t\t\tp_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );\n\t\t\t\t\tshadow = max( hard_shadow, p_max );\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn mix( 1.0, shadow, shadowIntensity );\n\t\t}\n\t#else\n\t\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\t\tfloat shadow = 1.0;\n\t\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\t\t#ifdef USE_REVERSED_DEPTH_BUFFER\n\t\t\t\tshadowCoord.z -= shadowBias;\n\t\t\t#else\n\t\t\t\tshadowCoord.z += shadowBias;\n\t\t\t#endif\n\t\t\tbool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n\t\t\tbool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n\t\t\tif ( frustumTest ) {\n\t\t\t\tfloat depth = texture2D( shadowMap, shadowCoord.xy ).r;\n\t\t\t\t#ifdef USE_REVERSED_DEPTH_BUFFER\n\t\t\t\t\tshadow = step( depth, shadowCoord.z );\n\t\t\t\t#else\n\t\t\t\t\tshadow = step( shadowCoord.z, depth );\n\t\t\t\t#endif\n\t\t\t}\n\t\t\treturn mix( 1.0, shadow, shadowIntensity );\n\t\t}\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t#if defined( SHADOWMAP_TYPE_PCF )\n\tfloat getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tfloat shadow = 1.0;\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\tvec3 absVec = abs( lightToPosition );\n\t\tfloat viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n\t\tif ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n\t\t\t#ifdef USE_REVERSED_DEPTH_BUFFER\n\t\t\t\tfloat dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n\t\t\t\tdp -= shadowBias;\n\t\t\t#else\n\t\t\t\tfloat dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n\t\t\t\tdp += shadowBias;\n\t\t\t#endif\n\t\t\tfloat texelSize = shadowRadius / shadowMapSize.x;\n\t\t\tvec3 absDir = abs( bd3D );\n\t\t\tvec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );\n\t\t\ttangent = normalize( cross( bd3D, tangent ) );\n\t\t\tvec3 bitangent = cross( bd3D, tangent );\n\t\t\tfloat phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;\n\t\t\tvec2 sample0 = vogelDiskSample( 0, 5, phi );\n\t\t\tvec2 sample1 = vogelDiskSample( 1, 5, phi );\n\t\t\tvec2 sample2 = vogelDiskSample( 2, 5, phi );\n\t\t\tvec2 sample3 = vogelDiskSample( 3, 5, phi );\n\t\t\tvec2 sample4 = vogelDiskSample( 4, 5, phi );\n\t\t\tshadow = (\n\t\t\t\ttexture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +\n\t\t\t\ttexture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +\n\t\t\t\ttexture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +\n\t\t\t\ttexture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +\n\t\t\t\ttexture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )\n\t\t\t) * 0.2;\n\t\t}\n\t\treturn mix( 1.0, shadow, shadowIntensity );\n\t}\n\t#elif defined( SHADOWMAP_TYPE_BASIC )\n\tfloat getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tfloat shadow = 1.0;\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tvec3 absVec = abs( lightToPosition );\n\t\tfloat viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );\n\t\tif ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {\n\t\t\tfloat dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );\n\t\t\tdp += shadowBias;\n\t\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t\tfloat depth = textureCube( shadowMap, bd3D ).r;\n\t\t\t#ifdef USE_REVERSED_DEPTH_BUFFER\n\t\t\t\tdepth = 1.0 - depth;\n\t\t\t#endif\n\t\t\tshadow = step( dp, depth );\n\t\t}\n\t\treturn mix( 1.0, shadow, shadowIntensity );\n\t}\n\t#endif\n\t#endif\n#endif",
    shadowmap_pars_vertex: "#if NUM_SPOT_LIGHT_COORDS > 0\n\tuniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n#endif\n#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif",
    shadowmap_vertex: "#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n\t#ifdef HAS_NORMAL\n\t\tvec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );\n\t#else\n\t\tvec3 shadowWorldNormal = vec3( 0.0 );\n\t#endif\n\tvec4 shadowWorldPosition;\n#endif\n#if defined( USE_SHADOWMAP )\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\t\t}\n\t\t#pragma unroll_loop_end\n\t#endif\n#endif\n#if NUM_SPOT_LIGHT_COORDS > 0\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n\t\tshadowWorldPosition = worldPosition;\n\t\t#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t\tshadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n\t\t#endif\n\t\tvSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n\t}\n\t#pragma unroll_loop_end\n#endif",
    shadowmask_pars_fragment: "float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )\n\tPointLightShadow pointLight;\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#pragma unroll_loop_end\n\t#endif\n\t#endif\n\treturn shadow;\n}",
    skinbase_vertex: "#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",
    skinning_pars_vertex: "#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\tuniform highp sampler2D boneTexture;\n\tmat4 getBoneMatrix( const in float i ) {\n\t\tint size = textureSize( boneTexture, 0 ).x;\n\t\tint j = int( i ) * 4;\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\tvec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n\t\tvec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n\t\tvec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n\t\tvec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n\t\treturn mat4( v1, v2, v3, v4 );\n\t}\n#endif",
    skinning_vertex: "#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif",
    skinnormal_vertex: "#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif",
    specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",
    specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",
    tonemapping_fragment: "#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif",
    tonemapping_pars_fragment: "#ifndef saturate\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn saturate( toneMappingExposure * color );\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\nvec3 CineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 RRTAndODTFit( vec3 v ) {\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ),\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(  1.60475, -0.10208, -0.00327 ),\t\tvec3( -0.53108,  1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,  1.07602 )\n\t);\n\tcolor *= toneMappingExposure / 0.6;\n\tcolor = ACESInputMat * color;\n\tcolor = RRTAndODTFit( color );\n\tcolor = ACESOutputMat * color;\n\treturn saturate( color );\n}\nconst mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(\n\tvec3( 1.6605, - 0.1246, - 0.0182 ),\n\tvec3( - 0.5876, 1.1329, - 0.1006 ),\n\tvec3( - 0.0728, - 0.0083, 1.1187 )\n);\nconst mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(\n\tvec3( 0.6274, 0.0691, 0.0164 ),\n\tvec3( 0.3293, 0.9195, 0.0880 ),\n\tvec3( 0.0433, 0.0113, 0.8956 )\n);\nvec3 agxDefaultContrastApprox( vec3 x ) {\n\tvec3 x2 = x * x;\n\tvec3 x4 = x2 * x2;\n\treturn + 15.5 * x4 * x2\n\t\t- 40.14 * x4 * x\n\t\t+ 31.96 * x4\n\t\t- 6.868 * x2 * x\n\t\t+ 0.4298 * x2\n\t\t+ 0.1191 * x\n\t\t- 0.00232;\n}\nvec3 AgXToneMapping( vec3 color ) {\n\tconst mat3 AgXInsetMatrix = mat3(\n\t\tvec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),\n\t\tvec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),\n\t\tvec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )\n\t);\n\tconst mat3 AgXOutsetMatrix = mat3(\n\t\tvec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),\n\t\tvec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),\n\t\tvec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )\n\t);\n\tconst float AgxMinEv = - 12.47393;\tconst float AgxMaxEv = 4.026069;\n\tcolor *= toneMappingExposure;\n\tcolor = LINEAR_SRGB_TO_LINEAR_REC2020 * color;\n\tcolor = AgXInsetMatrix * color;\n\tcolor = max( color, 1e-10 );\tcolor = log2( color );\n\tcolor = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );\n\tcolor = clamp( color, 0.0, 1.0 );\n\tcolor = agxDefaultContrastApprox( color );\n\tcolor = AgXOutsetMatrix * color;\n\tcolor = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );\n\tcolor = LINEAR_REC2020_TO_LINEAR_SRGB * color;\n\tcolor = clamp( color, 0.0, 1.0 );\n\treturn color;\n}\nvec3 NeutralToneMapping( vec3 color ) {\n\tconst float StartCompression = 0.8 - 0.04;\n\tconst float Desaturation = 0.15;\n\tcolor *= toneMappingExposure;\n\tfloat x = min( color.r, min( color.g, color.b ) );\n\tfloat offset = x < 0.08 ? x - 6.25 * x * x : 0.04;\n\tcolor -= offset;\n\tfloat peak = max( color.r, max( color.g, color.b ) );\n\tif ( peak < StartCompression ) return color;\n\tfloat d = 1. - StartCompression;\n\tfloat newPeak = 1. - d * d / ( peak + d - StartCompression );\n\tcolor *= newPeak / peak;\n\tfloat g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );\n\treturn mix( color, vec3( newPeak ), g );\n}\nvec3 CustomToneMapping( vec3 color ) { return color; }",
    transmission_fragment: "#ifdef USE_TRANSMISSION\n\tmaterial.transmission = transmission;\n\tmaterial.transmissionAlpha = 1.0;\n\tmaterial.thickness = thickness;\n\tmaterial.attenuationDistance = attenuationDistance;\n\tmaterial.attenuationColor = attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tmaterial.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tmaterial.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n\t#endif\n\tvec3 pos = vWorldPosition;\n\tvec3 v = normalize( cameraPosition - pos );\n\tvec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );\n\tvec4 transmitted = getIBLVolumeRefraction(\n\t\tn, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,\n\t\tpos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,\n\t\tmaterial.attenuationColor, material.attenuationDistance );\n\tmaterial.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n\ttotalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n#endif",
    transmission_pars_fragment: "#ifdef USE_TRANSMISSION\n\tuniform float transmission;\n\tuniform float thickness;\n\tuniform float attenuationDistance;\n\tuniform vec3 attenuationColor;\n\t#ifdef USE_TRANSMISSIONMAP\n\t\tuniform sampler2D transmissionMap;\n\t#endif\n\t#ifdef USE_THICKNESSMAP\n\t\tuniform sampler2D thicknessMap;\n\t#endif\n\tuniform vec2 transmissionSamplerSize;\n\tuniform sampler2D transmissionSamplerMap;\n\tuniform mat4 modelMatrix;\n\tuniform mat4 projectionMatrix;\n\tvarying vec3 vWorldPosition;\n\tfloat w0( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n\t}\n\tfloat w1( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n\t}\n\tfloat w2( float a ){\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n\t}\n\tfloat w3( float a ) {\n\t\treturn ( 1.0 / 6.0 ) * ( a * a * a );\n\t}\n\tfloat g0( float a ) {\n\t\treturn w0( a ) + w1( a );\n\t}\n\tfloat g1( float a ) {\n\t\treturn w2( a ) + w3( a );\n\t}\n\tfloat h0( float a ) {\n\t\treturn - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n\t}\n\tfloat h1( float a ) {\n\t\treturn 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n\t}\n\tvec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n\t\tuv = uv * texelSize.zw + 0.5;\n\t\tvec2 iuv = floor( uv );\n\t\tvec2 fuv = fract( uv );\n\t\tfloat g0x = g0( fuv.x );\n\t\tfloat g1x = g1( fuv.x );\n\t\tfloat h0x = h0( fuv.x );\n\t\tfloat h1x = h1( fuv.x );\n\t\tfloat h0y = h0( fuv.y );\n\t\tfloat h1y = h1( fuv.y );\n\t\tvec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\t\treturn g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n\t\t\tg1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n\t}\n\tvec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n\t\tvec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n\t\tvec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n\t\tvec2 fLodSizeInv = 1.0 / fLodSize;\n\t\tvec2 cLodSizeInv = 1.0 / cLodSize;\n\t\tvec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n\t\tvec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n\t\treturn mix( fSample, cSample, fract( lod ) );\n\t}\n\tvec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n\t\tvec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n\t\tvec3 modelScale;\n\t\tmodelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n\t\tmodelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n\t\tmodelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n\t\treturn normalize( refractionVector ) * thickness * modelScale;\n\t}\n\tfloat applyIorToRoughness( const in float roughness, const in float ior ) {\n\t\treturn roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n\t}\n\tvec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n\t\tfloat lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n\t\treturn textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n\t}\n\tvec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tif ( isinf( attenuationDistance ) ) {\n\t\t\treturn vec3( 1.0 );\n\t\t} else {\n\t\t\tvec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n\t\t\tvec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );\t\t\treturn transmittance;\n\t\t}\n\t}\n\tvec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n\t\tconst in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n\t\tconst in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,\n\t\tconst in vec3 attenuationColor, const in float attenuationDistance ) {\n\t\tvec4 transmittedLight;\n\t\tvec3 transmittance;\n\t\t#ifdef USE_DISPERSION\n\t\t\tfloat halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;\n\t\t\tvec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );\n\t\t\tfor ( int i = 0; i < 3; i ++ ) {\n\t\t\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );\n\t\t\t\tvec3 refractedRayExit = position + transmissionRay;\n\t\t\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\t\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\t\t\trefractionCoords += 1.0;\n\t\t\t\trefractionCoords /= 2.0;\n\t\t\t\tvec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );\n\t\t\t\ttransmittedLight[ i ] = transmissionSample[ i ];\n\t\t\t\ttransmittedLight.a += transmissionSample.a;\n\t\t\t\ttransmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];\n\t\t\t}\n\t\t\ttransmittedLight.a /= 3.0;\n\t\t#else\n\t\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n\t\t\tvec3 refractedRayExit = position + transmissionRay;\n\t\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\t\trefractionCoords += 1.0;\n\t\t\trefractionCoords /= 2.0;\n\t\t\ttransmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n\t\t\ttransmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n\t\t#endif\n\t\tvec3 attenuatedColor = transmittance * transmittedLight.rgb;\n\t\tvec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n\t\tfloat transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n\t\treturn vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n\t}\n#endif",
    uv_pars_fragment: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\n\tvarying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n\tvarying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n\tvarying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n\tvarying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n\tvarying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n\tvarying vec2 vNormalMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tvarying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n\tvarying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tvarying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n\tvarying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tvarying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tvarying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tvarying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tvarying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tvarying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tvarying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tvarying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n\tvarying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tvarying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tvarying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n#endif",
    uv_pars_vertex: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\tvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\n\tuniform mat3 mapTransform;\n\tvarying vec2 vMapUv;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform mat3 alphaMapTransform;\n\tvarying vec2 vAlphaMapUv;\n#endif\n#ifdef USE_LIGHTMAP\n\tuniform mat3 lightMapTransform;\n\tvarying vec2 vLightMapUv;\n#endif\n#ifdef USE_AOMAP\n\tuniform mat3 aoMapTransform;\n\tvarying vec2 vAoMapUv;\n#endif\n#ifdef USE_BUMPMAP\n\tuniform mat3 bumpMapTransform;\n\tvarying vec2 vBumpMapUv;\n#endif\n#ifdef USE_NORMALMAP\n\tuniform mat3 normalMapTransform;\n\tvarying vec2 vNormalMapUv;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\tuniform mat3 displacementMapTransform;\n\tvarying vec2 vDisplacementMapUv;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tuniform mat3 emissiveMapTransform;\n\tvarying vec2 vEmissiveMapUv;\n#endif\n#ifdef USE_METALNESSMAP\n\tuniform mat3 metalnessMapTransform;\n\tvarying vec2 vMetalnessMapUv;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tuniform mat3 roughnessMapTransform;\n\tvarying vec2 vRoughnessMapUv;\n#endif\n#ifdef USE_ANISOTROPYMAP\n\tuniform mat3 anisotropyMapTransform;\n\tvarying vec2 vAnisotropyMapUv;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tuniform mat3 clearcoatMapTransform;\n\tvarying vec2 vClearcoatMapUv;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform mat3 clearcoatNormalMapTransform;\n\tvarying vec2 vClearcoatNormalMapUv;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tuniform mat3 clearcoatRoughnessMapTransform;\n\tvarying vec2 vClearcoatRoughnessMapUv;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tuniform mat3 sheenColorMapTransform;\n\tvarying vec2 vSheenColorMapUv;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tuniform mat3 sheenRoughnessMapTransform;\n\tvarying vec2 vSheenRoughnessMapUv;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tuniform mat3 iridescenceMapTransform;\n\tvarying vec2 vIridescenceMapUv;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tuniform mat3 iridescenceThicknessMapTransform;\n\tvarying vec2 vIridescenceThicknessMapUv;\n#endif\n#ifdef USE_SPECULARMAP\n\tuniform mat3 specularMapTransform;\n\tvarying vec2 vSpecularMapUv;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tuniform mat3 specularColorMapTransform;\n\tvarying vec2 vSpecularColorMapUv;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tuniform mat3 specularIntensityMapTransform;\n\tvarying vec2 vSpecularIntensityMapUv;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n#endif\n#ifdef USE_THICKNESSMAP\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n#endif",
    uv_vertex: "#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\tvUv = vec3( uv, 1 ).xy;\n#endif\n#ifdef USE_MAP\n\tvMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ALPHAMAP\n\tvAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_LIGHTMAP\n\tvLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_AOMAP\n\tvAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_BUMPMAP\n\tvBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_NORMALMAP\n\tvNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\tvDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_EMISSIVEMAP\n\tvEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_METALNESSMAP\n\tvMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ROUGHNESSMAP\n\tvRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_ANISOTROPYMAP\n\tvAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOATMAP\n\tvClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\tvClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\tvClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\tvIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\tvIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\tvSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\tvSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULARMAP\n\tvSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\tvSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\tvSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\tvTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n#endif\n#ifdef USE_THICKNESSMAP\n\tvThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n#endif",
    worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_BATCHING\n\t\tworldPosition = batchingMatrix * worldPosition;\n\t#endif\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif",
    background_vert: "varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}",
    background_frag: "uniform sampler2D t2D;\nuniform float backgroundIntensity;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\t#ifdef DECODE_VIDEO_TEXTURE\n\t\ttexColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n\t#endif\n\ttexColor.rgb *= backgroundIntensity;\n\tgl_FragColor = texColor;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",
    backgroundCube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}",
    backgroundCube_frag: "#ifdef ENVMAP_TYPE_CUBE\n\tuniform samplerCube envMap;\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n\tuniform sampler2D envMap;\n#endif\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nuniform mat3 backgroundRotation;\nvarying vec3 vWorldDirection;\n#include <cube_uv_reflection_fragment>\nvoid main() {\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\tvec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );\n\t#else\n\t\tvec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t#endif\n\ttexColor.rgb *= backgroundIntensity;\n\tgl_FragColor = texColor;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",
    cube_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}",
    cube_frag: "uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n\tvec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n\tgl_FragColor = texColor;\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",
    depth_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <skinbase_vertex>\n\t#include <morphinstance_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvHighPrecisionZW = gl_Position.zw;\n}",
    depth_frag: "#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvarying vec2 vHighPrecisionZW;\nvoid main() {\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <clipping_planes_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <logdepthbuf_fragment>\n\t#ifdef USE_REVERSED_DEPTH_BUFFER\n\t\tfloat fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];\n\t#else\n\t\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;\n\t#endif\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\t#elif DEPTH_PACKING == 3202\n\t\tgl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );\n\t#elif DEPTH_PACKING == 3203\n\t\tgl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );\n\t#endif\n}",
    distance_vert: "#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <skinbase_vertex>\n\t#include <morphinstance_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}",
    distance_frag: "#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <clipping_planes_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );\n}",
    equirect_vert: "varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}",
    equirect_frag: "uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV = equirectUv( direction );\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n}",
    linedashed_vert: "uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\tvLineDistance = scale * lineDistance;\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",
    linedashed_frag: "uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
    meshbasic_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinbase_vertex>\n\t\t#include <skinnormal_vertex>\n\t\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}",
    meshbasic_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\treflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
    meshlambert_vert: "#define LAMBERT\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
    meshlambert_frag: "#define LAMBERT\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_lambert_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
    meshmatcap_vert: "#define MATCAP\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}",
    meshmatcap_frag: "#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t#else\n\t\tvec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
    meshnormal_vert: "#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvarying vec3 vViewPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}",
    meshnormal_frag: "#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\tvarying vec3 vViewPosition;\n#endif\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );\n\t#ifdef OPAQUE\n\t\tgl_FragColor.a = 1.0;\n\t#endif\n}",
    meshphong_vert: "#define PHONG\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
    meshphong_frag: "#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
    meshphysical_vert: "#define STANDARD\nvarying vec3 vViewPosition;\n#ifdef USE_TRANSMISSION\n\tvarying vec3 vWorldPosition;\n#endif\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n#ifdef USE_TRANSMISSION\n\tvWorldPosition = worldPosition.xyz;\n#endif\n}",
    meshphysical_frag: "#define STANDARD\n#ifdef PHYSICAL\n\t#define IOR\n\t#define USE_SPECULAR\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef IOR\n\tuniform float ior;\n#endif\n#ifdef USE_SPECULAR\n\tuniform float specularIntensity;\n\tuniform vec3 specularColor;\n\t#ifdef USE_SPECULAR_COLORMAP\n\t\tuniform sampler2D specularColorMap;\n\t#endif\n\t#ifdef USE_SPECULAR_INTENSITYMAP\n\t\tuniform sampler2D specularIntensityMap;\n\t#endif\n#endif\n#ifdef USE_CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_DISPERSION\n\tuniform float dispersion;\n#endif\n#ifdef USE_IRIDESCENCE\n\tuniform float iridescence;\n\tuniform float iridescenceIOR;\n\tuniform float iridescenceThicknessMinimum;\n\tuniform float iridescenceThicknessMaximum;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheenColor;\n\tuniform float sheenRoughness;\n\t#ifdef USE_SHEEN_COLORMAP\n\t\tuniform sampler2D sheenColorMap;\n\t#endif\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\t\tuniform sampler2D sheenRoughnessMap;\n\t#endif\n#endif\n#ifdef USE_ANISOTROPY\n\tuniform vec2 anisotropyVector;\n\t#ifdef USE_ANISOTROPYMAP\n\t\tuniform sampler2D anisotropyMap;\n\t#endif\n#endif\nvarying vec3 vViewPosition;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\tvec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n\t#include <transmission_fragment>\n\tvec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n\t#ifdef USE_SHEEN\n \n\t\toutgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;\n \n \t#endif\n\t#ifdef USE_CLEARCOAT\n\t\tfloat dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n\t\tvec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n\t\toutgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n\t#endif\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
    meshtoon_vert: "#define TOON\nvarying vec3 vViewPosition;\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
    meshtoon_frag: "#define TOON\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}",
    points_vert: "uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n#ifdef USE_POINTS_UV\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n#endif\nvoid main() {\n\t#ifdef USE_POINTS_UV\n\t\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\t#endif\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}",
    points_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
    shadow_vert: "#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <batching_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}",
    shadow_frag: "uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n}",
    sprite_vert: "uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix[ 3 ];\n\tvec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}",
    sprite_frag: "uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n}"
  },
  UniformsLib = {
    common: {
      diffuse: {
        value: new ThreeCore.Color(16777215)
      },
      opacity: {
        value: 1
      },
      map: {
        value: null
      },
      mapTransform: {
        value: new ThreeCore.Matrix3()
      },
      alphaMap: {
        value: null
      },
      alphaMapTransform: {
        value: new ThreeCore.Matrix3()
      },
      alphaTest: {
        value: 0
      }
    },
    specularmap: {
      specularMap: {
        value: null
      },
      specularMapTransform: {
        value: new ThreeCore.Matrix3()
      }
    },
    envmap: {
      envMap: {
        value: null
      },
      envMapRotation: {
        value: new ThreeCore.Matrix3()
      },
      reflectivity: {
        value: 1
      },
      ior: {
        value: 1.5
      },
      refractionRatio: {
        value: .98
      },
      dfgLUT: {
        value: null
      }
    },
    aomap: {
      aoMap: {
        value: null
      },
      aoMapIntensity: {
        value: 1
      },
      aoMapTransform: {
        value: new ThreeCore.Matrix3()
      }
    },
    lightmap: {
      lightMap: {
        value: null
      },
      lightMapIntensity: {
        value: 1
      },
      lightMapTransform: {
        value: new ThreeCore.Matrix3()
      }
    },
    bumpmap: {
      bumpMap: {
        value: null
      },
      bumpMapTransform: {
        value: new ThreeCore.Matrix3()
      },
      bumpScale: {
        value: 1
      }
    },
    normalmap: {
      normalMap: {
        value: null
      },
      normalMapTransform: {
        value: new ThreeCore.Matrix3()
      },
      normalScale: {
        value: new ThreeCore.Vector2(1, 1)
      }
    },
    displacementmap: {
      displacementMap: {
        value: null
      },
      displacementMapTransform: {
        value: new ThreeCore.Matrix3()
      },
      displacementScale: {
        value: 1
      },
      displacementBias: {
        value: 0
      }
    },
    emissivemap: {
      emissiveMap: {
        value: null
      },
      emissiveMapTransform: {
        value: new ThreeCore.Matrix3()
      }
    },
    metalnessmap: {
      metalnessMap: {
        value: null
      },
      metalnessMapTransform: {
        value: new ThreeCore.Matrix3()
      }
    },
    roughnessmap: {
      roughnessMap: {
        value: null
      },
      roughnessMapTransform: {
        value: new ThreeCore.Matrix3()
      }
    },
    gradientmap: {
      gradientMap: {
        value: null
      }
    },
    fog: {
      fogDensity: {
        value: 25e-5
      },
      fogNear: {
        value: 1
      },
      fogFar: {
        value: 2e3
      },
      fogColor: {
        value: new ThreeCore.Color(16777215)
      }
    },
    lights: {
      ambientLightColor: {
        value: []
      },
      lightProbe: {
        value: []
      },
      directionalLights: {
        value: [],
        properties: {
          direction: {},
          color: {}
        }
      },
      directionalLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {}
        }
      },
      directionalShadowMatrix: {
        value: []
      },
      spotLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          direction: {},
          distance: {},
          coneCos: {},
          penumbraCos: {},
          decay: {}
        }
      },
      spotLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {}
        }
      },
      spotLightMap: {
        value: []
      },
      spotLightMatrix: {
        value: []
      },
      pointLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          decay: {},
          distance: {}
        }
      },
      pointLightShadows: {
        value: [],
        properties: {
          shadowIntensity: 1,
          shadowBias: {},
          shadowNormalBias: {},
          shadowRadius: {},
          shadowMapSize: {},
          shadowCameraNear: {},
          shadowCameraFar: {}
        }
      },
      pointShadowMatrix: {
        value: []
      },
      hemisphereLights: {
        value: [],
        properties: {
          direction: {},
          skyColor: {},
          groundColor: {}
        }
      },
      rectAreaLights: {
        value: [],
        properties: {
          color: {},
          position: {},
          width: {},
          height: {}
        }
      },
      ltc_1: {
        value: null
      },
      ltc_2: {
        value: null
      },
      probesSH: {
        value: null
      },
      probesMin: {
        value: new ThreeCore.Vector3()
      },
      probesMax: {
        value: new ThreeCore.Vector3()
      },
      probesResolution: {
        value: new ThreeCore.Vector3()
      }
    },
    points: {
      diffuse: {
        value: new ThreeCore.Color(16777215)
      },
      opacity: {
        value: 1
      },
      size: {
        value: 1
      },
      scale: {
        value: 1
      },
      map: {
        value: null
      },
      alphaMap: {
        value: null
      },
      alphaMapTransform: {
        value: new ThreeCore.Matrix3()
      },
      alphaTest: {
        value: 0
      },
      uvTransform: {
        value: new ThreeCore.Matrix3()
      }
    },
    sprite: {
      diffuse: {
        value: new ThreeCore.Color(16777215)
      },
      opacity: {
        value: 1
      },
      center: {
        value: new ThreeCore.Vector2(.5, .5)
      },
      rotation: {
        value: 0
      },
      map: {
        value: null
      },
      mapTransform: {
        value: new ThreeCore.Matrix3()
      },
      alphaMap: {
        value: null
      },
      alphaMapTransform: {
        value: new ThreeCore.Matrix3()
      },
      alphaTest: {
        value: 0
      }
    }
  },
  ShaderLib = {
    basic: {
      uniforms: (0, ThreeCore.mergeUniforms)([UniformsLib.common, UniformsLib.specularmap, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.fog]),
      vertexShader: ShaderChunk.meshbasic_vert,
      fragmentShader: ShaderChunk.meshbasic_frag
    },
    lambert: {
      uniforms: (0, ThreeCore.mergeUniforms)([UniformsLib.common, UniformsLib.specularmap, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.fog, UniformsLib.lights, {
        emissive: {
          value: new ThreeCore.Color(0)
        },
        envMapIntensity: {
          value: 1
        }
      }]),
      vertexShader: ShaderChunk.meshlambert_vert,
      fragmentShader: ShaderChunk.meshlambert_frag
    },
    phong: {
      uniforms: (0, ThreeCore.mergeUniforms)([UniformsLib.common, UniformsLib.specularmap, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.fog, UniformsLib.lights, {
        emissive: {
          value: new ThreeCore.Color(0)
        },
        specular: {
          value: new ThreeCore.Color(1118481)
        },
        shininess: {
          value: 30
        },
        envMapIntensity: {
          value: 1
        }
      }]),
      vertexShader: ShaderChunk.meshphong_vert,
      fragmentShader: ShaderChunk.meshphong_frag
    },
    standard: {
      uniforms: (0, ThreeCore.mergeUniforms)([UniformsLib.common, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.roughnessmap, UniformsLib.metalnessmap, UniformsLib.fog, UniformsLib.lights, {
        emissive: {
          value: new ThreeCore.Color(0)
        },
        roughness: {
          value: 1
        },
        metalness: {
          value: 0
        },
        envMapIntensity: {
          value: 1
        }
      }]),
      vertexShader: ShaderChunk.meshphysical_vert,
      fragmentShader: ShaderChunk.meshphysical_frag
    },
    toon: {
      uniforms: (0, ThreeCore.mergeUniforms)([UniformsLib.common, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.gradientmap, UniformsLib.fog, UniformsLib.lights, {
        emissive: {
          value: new ThreeCore.Color(0)
        }
      }]),
      vertexShader: ShaderChunk.meshtoon_vert,
      fragmentShader: ShaderChunk.meshtoon_frag
    },
    matcap: {
      uniforms: (0, ThreeCore.mergeUniforms)([UniformsLib.common, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.fog, {
        matcap: {
          value: null
        }
      }]),
      vertexShader: ShaderChunk.meshmatcap_vert,
      fragmentShader: ShaderChunk.meshmatcap_frag
    },
    points: {
      uniforms: (0, ThreeCore.mergeUniforms)([UniformsLib.points, UniformsLib.fog]),
      vertexShader: ShaderChunk.points_vert,
      fragmentShader: ShaderChunk.points_frag
    },
    dashed: {
      uniforms: (0, ThreeCore.mergeUniforms)([UniformsLib.common, UniformsLib.fog, {
        scale: {
          value: 1
        },
        dashSize: {
          value: 1
        },
        totalSize: {
          value: 2
        }
      }]),
      vertexShader: ShaderChunk.linedashed_vert,
      fragmentShader: ShaderChunk.linedashed_frag
    },
    depth: {
      uniforms: (0, ThreeCore.mergeUniforms)([UniformsLib.common, UniformsLib.displacementmap]),
      vertexShader: ShaderChunk.depth_vert,
      fragmentShader: ShaderChunk.depth_frag
    },
    normal: {
      uniforms: (0, ThreeCore.mergeUniforms)([UniformsLib.common, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, {
        opacity: {
          value: 1
        }
      }]),
      vertexShader: ShaderChunk.meshnormal_vert,
      fragmentShader: ShaderChunk.meshnormal_frag
    },
    sprite: {
      uniforms: (0, ThreeCore.mergeUniforms)([UniformsLib.sprite, UniformsLib.fog]),
      vertexShader: ShaderChunk.sprite_vert,
      fragmentShader: ShaderChunk.sprite_frag
    },
    background: {
      uniforms: {
        uvTransform: {
          value: new ThreeCore.Matrix3()
        },
        t2D: {
          value: null
        },
        backgroundIntensity: {
          value: 1
        }
      },
      vertexShader: ShaderChunk.background_vert,
      fragmentShader: ShaderChunk.background_frag
    },
    backgroundCube: {
      uniforms: {
        envMap: {
          value: null
        },
        backgroundBlurriness: {
          value: 0
        },
        backgroundIntensity: {
          value: 1
        },
        backgroundRotation: {
          value: new ThreeCore.Matrix3()
        }
      },
      vertexShader: ShaderChunk.backgroundCube_vert,
      fragmentShader: ShaderChunk.backgroundCube_frag
    },
    cube: {
      uniforms: {
        tCube: {
          value: null
        },
        tFlip: {
          value: -1
        },
        opacity: {
          value: 1
        }
      },
      vertexShader: ShaderChunk.cube_vert,
      fragmentShader: ShaderChunk.cube_frag
    },
    equirect: {
      uniforms: {
        tEquirect: {
          value: null
        }
      },
      vertexShader: ShaderChunk.equirect_vert,
      fragmentShader: ShaderChunk.equirect_frag
    },
    distance: {
      uniforms: (0, ThreeCore.mergeUniforms)([UniformsLib.common, UniformsLib.displacementmap, {
        referencePosition: {
          value: new ThreeCore.Vector3()
        },
        nearDistance: {
          value: 1
        },
        farDistance: {
          value: 1e3
        }
      }]),
      vertexShader: ShaderChunk.distance_vert,
      fragmentShader: ShaderChunk.distance_frag
    },
    shadow: {
      uniforms: (0, ThreeCore.mergeUniforms)([UniformsLib.lights, UniformsLib.fog, {
        color: {
          value: new ThreeCore.Color(0)
        },
        opacity: {
          value: 1
        }
      }]),
      vertexShader: ShaderChunk.shadow_vert,
      fragmentShader: ShaderChunk.shadow_frag
    }
  };
ShaderLib.physical = {
  uniforms: (0, ThreeCore.mergeUniforms)([ShaderLib.standard.uniforms, {
    clearcoat: {
      value: 0
    },
    clearcoatMap: {
      value: null
    },
    clearcoatMapTransform: {
      value: new ThreeCore.Matrix3()
    },
    clearcoatNormalMap: {
      value: null
    },
    clearcoatNormalMapTransform: {
      value: new ThreeCore.Matrix3()
    },
    clearcoatNormalScale: {
      value: new ThreeCore.Vector2(1, 1)
    },
    clearcoatRoughness: {
      value: 0
    },
    clearcoatRoughnessMap: {
      value: null
    },
    clearcoatRoughnessMapTransform: {
      value: new ThreeCore.Matrix3()
    },
    dispersion: {
      value: 0
    },
    iridescence: {
      value: 0
    },
    iridescenceMap: {
      value: null
    },
    iridescenceMapTransform: {
      value: new ThreeCore.Matrix3()
    },
    iridescenceIOR: {
      value: 1.3
    },
    iridescenceThicknessMinimum: {
      value: 100
    },
    iridescenceThicknessMaximum: {
      value: 400
    },
    iridescenceThicknessMap: {
      value: null
    },
    iridescenceThicknessMapTransform: {
      value: new ThreeCore.Matrix3()
    },
    sheen: {
      value: 0
    },
    sheenColor: {
      value: new ThreeCore.Color(0)
    },
    sheenColorMap: {
      value: null
    },
    sheenColorMapTransform: {
      value: new ThreeCore.Matrix3()
    },
    sheenRoughness: {
      value: 1
    },
    sheenRoughnessMap: {
      value: null
    },
    sheenRoughnessMapTransform: {
      value: new ThreeCore.Matrix3()
    },
    transmission: {
      value: 0
    },
    transmissionMap: {
      value: null
    },
    transmissionMapTransform: {
      value: new ThreeCore.Matrix3()
    },
    transmissionSamplerSize: {
      value: new ThreeCore.Vector2()
    },
    transmissionSamplerMap: {
      value: null
    },
    thickness: {
      value: 0
    },
    thicknessMap: {
      value: null
    },
    thicknessMapTransform: {
      value: new ThreeCore.Matrix3()
    },
    attenuationDistance: {
      value: 0
    },
    attenuationColor: {
      value: new ThreeCore.Color(0)
    },
    specularColor: {
      value: new ThreeCore.Color(1, 1, 1)
    },
    specularColorMap: {
      value: null
    },
    specularColorMapTransform: {
      value: new ThreeCore.Matrix3()
    },
    specularIntensity: {
      value: 1
    },
    specularIntensityMap: {
      value: null
    },
    specularIntensityMapTransform: {
      value: new ThreeCore.Matrix3()
    },
    anisotropyVector: {
      value: new ThreeCore.Vector2()
    },
    anisotropyMap: {
      value: null
    },
    anisotropyMapTransform: {
      value: new ThreeCore.Matrix3()
    }
  }]),
  vertexShader: ShaderChunk.meshphysical_vert,
  fragmentShader: ShaderChunk.meshphysical_frag
};
const l = {
    r: 0,
    b: 0,
    g: 0
  },
  matrix4 = new ThreeCore.Matrix4(),
  matrix3 = new ThreeCore.Matrix3();
function h(e, t, n, i, a, s) {
  const color = new ThreeCore.Color(0);
  let h,
    p,
    f = !0 === a ? 0 : 1,
    m = null,
    M = 0,
    _ = null;
  function A(e) {
    let n = !0 === e.isScene ? e.background : null;
    if (n && n.isTexture) {
      const r = e.backgroundBlurriness > 0;
      n = t.get(n, r);
    }
    return n;
  }
  function g(t, i) {
    t.getRGB(l, (0, ThreeCore.getUnlitUniformColorSpace)(e)), n.buffers.color.setClear(l.r, l.g, l.b, i, s);
  }
  return {
    getClearColor: function () {
      return color;
    },
    setClearColor: function (e, t = 1) {
      color.set(e), f = t, g(color, f);
    },
    getClearAlpha: function () {
      return f;
    },
    setClearAlpha: function (e) {
      f = e, g(color, f);
    },
    render: function (t) {
      let r = !1;
      const i = A(t);
      null === i ? g(color, f) : i && i.isColor && (g(i, 1), r = !0);
      const a = e.xr.getEnvironmentBlendMode();
      "additive" === a ? n.buffers.color.setClear(0, 0, 0, 1, s) : "alpha-blend" === a && n.buffers.color.setClear(0, 0, 0, 0, s), (e.autoClear || r) && (n.buffers.depth.setTest(!0), n.buffers.depth.setMask(!0), n.buffers.color.setMask(!0), e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil));
    },
    addToRenderList: function (t, n) {
      const a = A(n);
      a && (a.isCubeTexture || a.mapping === ThreeCore.CubeUVReflectionMapping) ? (void 0 === p && (p = new ThreeCore.Mesh(new ThreeCore.BoxGeometry(1, 1, 1), new ThreeCore.ShaderMaterial({
        name: "BackgroundCubeMaterial",
        uniforms: (0, ThreeCore.cloneUniforms)(ShaderLib.backgroundCube.uniforms),
        vertexShader: ShaderLib.backgroundCube.vertexShader,
        fragmentShader: ShaderLib.backgroundCube.fragmentShader,
        side: ThreeCore.BackSide,
        depthTest: !1,
        depthWrite: !1,
        fog: !1,
        allowOverride: !1
      })), p.geometry.deleteAttribute("normal"), p.geometry.deleteAttribute("uv"), p.onBeforeRender = function (e, t, n) {
        this.matrixWorld.copyPosition(n.matrixWorld);
      }, Object.defineProperty(p.material, "envMap", {
        get: function () {
          return this.uniforms.envMap.value;
        }
      }), i.update(p)), p.material.uniforms.envMap.value = a, p.material.uniforms.backgroundBlurriness.value = n.backgroundBlurriness, p.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, p.material.uniforms.backgroundRotation.value.setFromMatrix4(matrix4.makeRotationFromEuler(n.backgroundRotation)).transpose(), a.isCubeTexture && !1 === a.isRenderTargetTexture && p.material.uniforms.backgroundRotation.value.premultiply(matrix3), p.material.toneMapped = ThreeCore.ColorManagement.getTransfer(a.colorSpace) !== ThreeCore.SRGBTransfer, m === a && M === a.version && _ === e.toneMapping || (p.material.needsUpdate = !0, m = a, M = a.version, _ = e.toneMapping), p.layers.enableAll(), t.unshift(p, p.geometry, p.material, 0, 0, null)) : a && a.isTexture && (void 0 === h && (h = new ThreeCore.Mesh(new ThreeCore.PlaneGeometry(2, 2), new ThreeCore.ShaderMaterial({
        name: "BackgroundMaterial",
        uniforms: (0, ThreeCore.cloneUniforms)(ShaderLib.background.uniforms),
        vertexShader: ShaderLib.background.vertexShader,
        fragmentShader: ShaderLib.background.fragmentShader,
        side: ThreeCore.FrontSide,
        depthTest: !1,
        depthWrite: !1,
        fog: !1,
        allowOverride: !1
      })), h.geometry.deleteAttribute("normal"), Object.defineProperty(h.material, "map", {
        get: function () {
          return this.uniforms.t2D.value;
        }
      }), i.update(h)), h.material.uniforms.t2D.value = a, h.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, h.material.toneMapped = ThreeCore.ColorManagement.getTransfer(a.colorSpace) !== ThreeCore.SRGBTransfer, !0 === a.matrixAutoUpdate && a.updateMatrix(), h.material.uniforms.uvTransform.value.copy(a.matrix), m === a && M === a.version && _ === e.toneMapping || (h.material.needsUpdate = !0, m = a, M = a.version, _ = e.toneMapping), h.layers.enableAll(), t.unshift(h, h.geometry, h.material, 0, 0, null));
    },
    dispose: function () {
      void 0 !== p && (p.geometry.dispose(), p.material.dispose(), p = void 0), void 0 !== h && (h.geometry.dispose(), h.material.dispose(), h = void 0);
    }
  };
}
function p(e, t) {
  const n = e.getParameter(e.MAX_VERTEX_ATTRIBS),
    i = {},
    a = u(null);
  let s = a,
    o = !1;
  function c(t) {
    return e.bindVertexArray(t);
  }
  function l(t) {
    return e.deleteVertexArray(t);
  }
  function u(e) {
    const t = [],
      r = [],
      i = [];
    for (let e = 0; e < n; e++) t[e] = 0, r[e] = 0, i[e] = 0;
    return {
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: t,
      enabledAttributes: r,
      attributeDivisors: i,
      object: e,
      attributes: {},
      index: null
    };
  }
  function d() {
    const e = s.newAttributes;
    for (let t = 0, n = e.length; t < n; t++) e[t] = 0;
  }
  function h(e) {
    p(e, 0);
  }
  function p(t, n) {
    const r = s.newAttributes,
      i = s.enabledAttributes,
      a = s.attributeDivisors;
    r[t] = 1, 0 === i[t] && (e.enableVertexAttribArray(t), i[t] = 1), a[t] !== n && (e.vertexAttribDivisor(t, n), a[t] = n);
  }
  function f() {
    const t = s.newAttributes,
      n = s.enabledAttributes;
    for (let r = 0, i = n.length; r < i; r++) n[r] !== t[r] && (e.disableVertexAttribArray(r), n[r] = 0);
  }
  function m(t, n, r, i, a, s, o) {
    !0 === o ? e.vertexAttribIPointer(t, n, r, a, s) : e.vertexAttribPointer(t, n, r, i, a, s);
  }
  function M() {
    _(), o = !0, s !== a && (s = a, c(s.object));
  }
  function _() {
    a.geometry = null, a.program = null, a.wireframe = !1;
  }
  return {
    setup: function (n, a, l, M, _) {
      let A = !1;
      const g = function (t, n, r, a) {
        const s = !0 === a.wireframe;
        let o = i[n.id];
        void 0 === o && (o = {}, i[n.id] = o);
        const c = !0 === t.isInstancedMesh ? t.id : 0;
        let l = o[c];
        void 0 === l && (l = {}, o[c] = l);
        let d = l[r.id];
        void 0 === d && (d = {}, l[r.id] = d);
        let h = d[s];
        void 0 === h && (h = u(e.createVertexArray()), d[s] = h);
        return h;
      }(n, M, l, a);
      s !== g && (s = g, c(s.object)), A = function (e, t, n, r) {
        const i = s.attributes,
          a = t.attributes;
        let o = 0;
        const c = n.getAttributes();
        for (const t in c) {
          if (c[t].location >= 0) {
            const n = i[t];
            let r = a[t];
            if (void 0 === r && ("instanceMatrix" === t && e.instanceMatrix && (r = e.instanceMatrix), "instanceColor" === t && e.instanceColor && (r = e.instanceColor)), void 0 === n) return !0;
            if (n.attribute !== r) return !0;
            if (r && n.data !== r.data) return !0;
            o++;
          }
        }
        return s.attributesNum !== o || s.index !== r;
      }(n, M, l, _), A && function (e, t, n, r) {
        const i = {},
          a = t.attributes;
        let o = 0;
        const c = n.getAttributes();
        for (const t in c) {
          if (c[t].location >= 0) {
            let n = a[t];
            void 0 === n && ("instanceMatrix" === t && e.instanceMatrix && (n = e.instanceMatrix), "instanceColor" === t && e.instanceColor && (n = e.instanceColor));
            const r = {};
            r.attribute = n, n && n.data && (r.data = n.data), i[t] = r, o++;
          }
        }
        s.attributes = i, s.attributesNum = o, s.index = r;
      }(n, M, l, _), null !== _ && t.update(_, e.ELEMENT_ARRAY_BUFFER), (A || o) && (o = !1, function (n, i, a, s) {
        d();
        const o = s.attributes,
          c = a.getAttributes(),
          l = i.defaultAttributeValues;
        for (const i in c) {
          const a = c[i];
          if (a.location >= 0) {
            let c = o[i];
            if (void 0 === c && ("instanceMatrix" === i && n.instanceMatrix && (c = n.instanceMatrix), "instanceColor" === i && n.instanceColor && (c = n.instanceColor)), void 0 !== c) {
              const i = c.normalized,
                o = c.itemSize,
                l = t.get(c);
              if (void 0 === l) continue;
              const u = l.buffer,
                d = l.type,
                f = l.bytesPerElement,
                M = d === e.INT || d === e.UNSIGNED_INT || c.gpuType === ThreeCore.IntType;
              if (c.isInterleavedBufferAttribute) {
                const t = c.data,
                  r = t.stride,
                  l = c.offset;
                if (t.isInstancedInterleavedBuffer) {
                  for (let e = 0; e < a.locationSize; e++) p(a.location + e, t.meshPerAttribute);
                  !0 !== n.isInstancedMesh && void 0 === s._maxInstanceCount && (s._maxInstanceCount = t.meshPerAttribute * t.count);
                } else for (let e = 0; e < a.locationSize; e++) h(a.location + e);
                e.bindBuffer(e.ARRAY_BUFFER, u);
                for (let e = 0; e < a.locationSize; e++) m(a.location + e, o / a.locationSize, d, i, r * f, (l + o / a.locationSize * e) * f, M);
              } else {
                if (c.isInstancedBufferAttribute) {
                  for (let e = 0; e < a.locationSize; e++) p(a.location + e, c.meshPerAttribute);
                  !0 !== n.isInstancedMesh && void 0 === s._maxInstanceCount && (s._maxInstanceCount = c.meshPerAttribute * c.count);
                } else for (let e = 0; e < a.locationSize; e++) h(a.location + e);
                e.bindBuffer(e.ARRAY_BUFFER, u);
                for (let e = 0; e < a.locationSize; e++) m(a.location + e, o / a.locationSize, d, i, o * f, o / a.locationSize * e * f, M);
              }
            } else if (void 0 !== l) {
              const t = l[i];
              if (void 0 !== t) switch (t.length) {
                case 2:
                  e.vertexAttrib2fv(a.location, t);
                  break;
                case 3:
                  e.vertexAttrib3fv(a.location, t);
                  break;
                case 4:
                  e.vertexAttrib4fv(a.location, t);
                  break;
                default:
                  e.vertexAttrib1fv(a.location, t);
              }
            }
          }
        }
        f();
      }(n, a, l, M), null !== _ && e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t.get(_).buffer));
    },
    reset: M,
    resetDefaultState: _,
    dispose: function () {
      M();
      for (const e in i) {
        const t = i[e];
        for (const e in t) {
          const n = t[e];
          for (const e in n) {
            const t = n[e];
            for (const e in t) l(t[e].object), delete t[e];
            delete n[e];
          }
        }
        delete i[e];
      }
    },
    releaseStatesOfGeometry: function (e) {
      if (void 0 === i[e.id]) return;
      const t = i[e.id];
      for (const e in t) {
        const n = t[e];
        for (const e in n) {
          const t = n[e];
          for (const e in t) l(t[e].object), delete t[e];
          delete n[e];
        }
      }
      delete i[e.id];
    },
    releaseStatesOfObject: function (e) {
      for (const t in i) {
        const n = i[t],
          r = !0 === e.isInstancedMesh ? e.id : 0,
          a = n[r];
        if (void 0 !== a) {
          for (const e in a) {
            const t = a[e];
            for (const e in t) l(t[e].object), delete t[e];
            delete a[e];
          }
          delete n[r], 0 === Object.keys(n).length && delete i[t];
        }
      }
    },
    releaseStatesOfProgram: function (e) {
      for (const t in i) {
        const n = i[t];
        for (const t in n) {
          const r = n[t];
          if (void 0 === r[e.id]) continue;
          const i = r[e.id];
          for (const e in i) l(i[e].object), delete i[e];
          delete r[e.id];
        }
      }
    },
    initAttributes: d,
    enableAttribute: h,
    disableUnusedAttributes: f
  };
}
function f(e, t, n) {
  let r;
  this.setMode = function (e) {
    r = e;
  }, this.render = function (t, i) {
    e.drawArrays(r, t, i), n.update(i, r, 1);
  }, this.renderInstances = function (t, i, a) {
    0 !== a && (e.drawArraysInstanced(r, t, i, a), n.update(i, r, a));
  }, this.renderMultiDraw = function (e, i, a) {
    if (0 === a) return;
    t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r, e, 0, i, 0, a);
    let s = 0;
    for (let e = 0; e < a; e++) s += i[e];
    n.update(s, r, 1);
  };
}
function m(e, t, n, i) {
  let a;
  function s(t) {
    if ("highp" === t) {
      if (e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.HIGH_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.HIGH_FLOAT).precision > 0) return "highp";
      t = "mediump";
    }
    return "mediump" === t && e.getShaderPrecisionFormat(e.VERTEX_SHADER, e.MEDIUM_FLOAT).precision > 0 && e.getShaderPrecisionFormat(e.FRAGMENT_SHADER, e.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let o = void 0 !== n.precision ? n.precision : "highp";
  const c = s(o);
  c !== o && ((0, ThreeCore.warn)("WebGLRenderer:", o, "not supported, using", c, "instead."), o = c);
  const l = !0 === n.logarithmicDepthBuffer,
    u = !0 === n.reversedDepthBuffer && t.has("EXT_clip_control");
  !0 === n.reversedDepthBuffer && !1 === u && (0, ThreeCore.warn)("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");
  return {
    isWebGL2: !0,
    getMaxAnisotropy: function () {
      if (void 0 !== a) return a;
      if (!0 === t.has("EXT_texture_filter_anisotropic")) {
        const n = t.get("EXT_texture_filter_anisotropic");
        a = e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      } else a = 0;
      return a;
    },
    getMaxPrecision: s,
    textureFormatReadable: function (t) {
      return t === ThreeCore.RGBAFormat || i.convert(t) === e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT);
    },
    textureTypeReadable: function (n) {
      const a = n === ThreeCore.HalfFloatType && (t.has("EXT_color_buffer_half_float") || t.has("EXT_color_buffer_float"));
      return !(n !== ThreeCore.UnsignedByteType && i.convert(n) !== e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE) && n !== ThreeCore.FloatType && !a);
    },
    precision: o,
    logarithmicDepthBuffer: l,
    reversedDepthBuffer: u,
    maxTextures: e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),
    maxVertexTextures: e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),
    maxTextureSize: e.getParameter(e.MAX_TEXTURE_SIZE),
    maxCubemapSize: e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),
    maxAttributes: e.getParameter(e.MAX_VERTEX_ATTRIBS),
    maxVertexUniforms: e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),
    maxVaryings: e.getParameter(e.MAX_VARYING_VECTORS),
    maxFragmentUniforms: e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),
    maxSamples: e.getParameter(e.MAX_SAMPLES),
    samples: e.getParameter(e.SAMPLES)
  };
}
function M(e) {
  const t = this;
  let n = null,
    i = 0,
    a = !1,
    s = !1;
  const plane = new ThreeCore.Plane(),
    c = new ThreeCore.Matrix3(),
    uniform = {
      value: null,
      needsUpdate: !1
    };
  function u(e, n, r, i) {
    const a = null !== e ? e.length : 0;
    let s = null;
    if (0 !== a) {
      if (s = uniform.value, !0 !== i || null === s) {
        const t = r + 4 * a,
          i = n.matrixWorldInverse;
        c.getNormalMatrix(i), (null === s || s.length < t) && (s = new Float32Array(t));
        for (let t = 0, n = r; t !== a; ++t, n += 4) plane.copy(e[t]).applyMatrix4(i, c), plane.normal.toArray(s, n), s[n + 3] = plane.constant;
      }
      uniform.value = s, uniform.needsUpdate = !0;
    }
    return t.numPlanes = a, t.numIntersection = 0, s;
  }
  this.uniform = uniform, this.numPlanes = 0, this.numIntersection = 0, this.init = function (e, t) {
    const n = 0 !== e.length || t || 0 !== i || a;
    return a = t, i = e.length, n;
  }, this.beginShadows = function () {
    s = !0, u(null);
  }, this.endShadows = function () {
    s = !1;
  }, this.setGlobalState = function (e, t) {
    n = u(e, t, 0);
  }, this.setState = function (r, o, c) {
    const d = r.clippingPlanes,
      h = r.clipIntersection,
      p = r.clipShadows,
      f = e.get(r);
    if (!a || null === d || 0 === d.length || s && !p) s ? u(null) : function () {
      uniform.value !== n && (uniform.value = n, uniform.needsUpdate = i > 0);
      t.numPlanes = i, t.numIntersection = 0;
    }();else {
      const numPlanes = s ? 0 : i,
        t = 4 * numPlanes;
      let r = f.clippingState || null;
      uniform.value = r, r = u(d, o, t, c);
      for (let e = 0; e !== t; ++e) r[e] = n[e];
      f.clippingState = r, this.numIntersection = h ? this.numPlanes : 0, this.numPlanes += numPlanes;
    }
  };
}
matrix3.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
const _ = [.125, .215, .35, .446, .526, .582],
  A = 20,
  orthographicCamera = new ThreeCore.OrthographicCamera(),
  color = new ThreeCore.Color();
let y = null,
  L = 0,
  v = 0,
  T = !1;
const vector3 = new ThreeCore.Vector3();
class PMREMGenerator {
  constructor(renderer) {
    this._renderer = renderer, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._sigmas = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
  }
  fromScene(e, t = 0, n = .1, r = 100, i = {}) {
    const {
      size: a = 256,
      position: s = vector3
    } = i;
    y = this._renderer.getRenderTarget(), L = this._renderer.getActiveCubeFace(), v = this._renderer.getActiveMipmapLevel(), T = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(a);
    const o = this._allocateTargets();
    return o.depthBuffer = !0, this._sceneToCubeUV(e, n, r, o, s), t > 0 && this._blur(o, 0, 0, t), this._applyPMREM(o), this._cleanup(o), o;
  }
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  compileCubemapShader() {
    null === this._cubemapMaterial && (this._cubemapMaterial = C(), this._compileMaterial(this._cubemapMaterial));
  }
  compileEquirectangularShader() {
    null === this._equirectMaterial && (this._equirectMaterial = x(), this._compileMaterial(this._equirectMaterial));
  }
  dispose() {
    this._dispose(), null !== this._cubemapMaterial && this._cubemapMaterial.dispose(), null !== this._equirectMaterial && this._equirectMaterial.dispose(), null !== this._backgroundBox && (this._backgroundBox.geometry.dispose(), this._backgroundBox.material.dispose());
  }
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    null !== this._blurMaterial && this._blurMaterial.dispose(), null !== this._ggxMaterial && this._ggxMaterial.dispose(), null !== this._pingPongRenderTarget && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodMeshes.length; e++) this._lodMeshes[e].geometry.dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(y, L, v), this._renderer.xr.enabled = T, e.scissorTest = !1, E(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === ThreeCore.CubeReflectionMapping || e.mapping === ThreeCore.CubeRefractionMapping ? this._setSize(0 === e.image.length ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), y = this._renderer.getRenderTarget(), L = this._renderer.getActiveCubeFace(), v = this._renderer.getActiveMipmapLevel(), T = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = t || this._allocateTargets();
    return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112),
      t = 4 * this._cubeSize,
      n = {
        magFilter: ThreeCore.LinearFilter,
        minFilter: ThreeCore.LinearFilter,
        generateMipmaps: !1,
        type: ThreeCore.HalfFloatType,
        format: ThreeCore.RGBAFormat,
        colorSpace: ThreeCore.LinearSRGBColorSpace,
        depthBuffer: !1
      },
      i = w(e, t, n);
    if (null === this._pingPongRenderTarget || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      null !== this._pingPongRenderTarget && this._dispose(), this._pingPongRenderTarget = w(e, t, n);
      const {
        _lodMax: _lodMax
      } = this;
      ({
        lodMeshes: this._lodMeshes,
        sizeLods: this._sizeLods,
        sigmas: this._sigmas
      } = function (e) {
        const t = [],
          n = [],
          i = [];
        let a = e;
        const s = e - 4 + 1 + _.length;
        for (let o = 0; o < s; o++) {
          const s = Math.pow(2, a);
          t.push(s);
          let c = 1 / s;
          o > e - 4 ? c = _[o - e + 4 - 1] : 0 === o && (c = 0), n.push(c);
          const l = 1 / (s - 2),
            u = -l,
            d = 1 + l,
            h = [u, u, d, u, d, d, u, u, d, d, u, d],
            p = 6,
            f = 6,
            m = 3,
            M = 2,
            A = 1,
            float32Array = new Float32Array(m * f * p),
            b = new Float32Array(M * f * p),
            y = new Float32Array(A * f * p);
          for (let e = 0; e < p; e++) {
            const t = e % 3 * 2 / 3 - 1,
              n = e > 2 ? 0 : -1,
              r = [t, n, 0, t + 2 / 3, n, 0, t + 2 / 3, n + 1, 0, t, n, 0, t + 2 / 3, n + 1, 0, t, n + 1, 0];
            float32Array.set(r, m * f * e), b.set(h, M * f * e);
            const i = [e, e, e, e, e, e];
            y.set(i, A * f * e);
          }
          const bufferGeometry = new ThreeCore.BufferGeometry();
          bufferGeometry.setAttribute("position", new ThreeCore.BufferAttribute(float32Array, m)), bufferGeometry.setAttribute("uv", new ThreeCore.BufferAttribute(b, M)), bufferGeometry.setAttribute("faceIndex", new ThreeCore.BufferAttribute(y, A)), i.push(new ThreeCore.Mesh(bufferGeometry, null)), a > 4 && a--;
        }
        return {
          lodMeshes: i,
          sizeLods: t,
          sigmas: n
        };
      }(_lodMax)), this._blurMaterial = function (e, t, n) {
        const float32Array = new Float32Array(A),
          a = new ThreeCore.Vector3(0, 1, 0),
          shaderMaterial = new ThreeCore.ShaderMaterial({
            name: "SphericalGaussianBlur",
            defines: {
              n: A,
              CUBEUV_TEXEL_WIDTH: 1 / t,
              CUBEUV_TEXEL_HEIGHT: 1 / n,
              CUBEUV_MAX_MIP: `${e}.0`
            },
            uniforms: {
              envMap: {
                value: null
              },
              samples: {
                value: 1
              },
              weights: {
                value: float32Array
              },
              latitudinal: {
                value: !1
              },
              dTheta: {
                value: 0
              },
              mipInt: {
                value: 0
              },
              poleAxis: {
                value: a
              }
            },
            vertexShader: z(),
            fragmentShader: "\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\t\t\tuniform int samples;\n\t\t\tuniform float weights[ n ];\n\t\t\tuniform bool latitudinal;\n\t\t\tuniform float dTheta;\n\t\t\tuniform float mipInt;\n\t\t\tuniform vec3 poleAxis;\n\n\t\t\t#define ENVMAP_TYPE_CUBE_UV\n\t\t\t#include <cube_uv_reflection_fragment>\n\n\t\t\tvec3 getSample( float theta, vec3 axis ) {\n\n\t\t\t\tfloat cosTheta = cos( theta );\n\t\t\t\t// Rodrigues' axis-angle rotation\n\t\t\t\tvec3 sampleDirection = vOutputDirection * cosTheta\n\t\t\t\t\t+ cross( axis, vOutputDirection ) * sin( theta )\n\t\t\t\t\t+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );\n\n\t\t\t\treturn bilinearCubeUV( envMap, sampleDirection, mipInt );\n\n\t\t\t}\n\n\t\t\tvoid main() {\n\n\t\t\t\tvec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );\n\n\t\t\t\tif ( all( equal( axis, vec3( 0.0 ) ) ) ) {\n\n\t\t\t\t\taxis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );\n\n\t\t\t\t}\n\n\t\t\t\taxis = normalize( axis );\n\n\t\t\t\tgl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t\t\t\tgl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );\n\n\t\t\t\tfor ( int i = 1; i < n; i++ ) {\n\n\t\t\t\t\tif ( i >= samples ) {\n\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t}\n\n\t\t\t\t\tfloat theta = dTheta * float( i );\n\t\t\t\t\tgl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );\n\t\t\t\t\tgl_FragColor.rgb += weights[ i ] * getSample( theta, axis );\n\n\t\t\t\t}\n\n\t\t\t}\n\t\t",
            blending: ThreeCore.NoBlending,
            depthTest: !1,
            depthWrite: !1
          });
        return shaderMaterial;
      }(_lodMax, e, t), this._ggxMaterial = function (e, t, n) {
        const shaderMaterial = new ThreeCore.ShaderMaterial({
          name: "PMREMGGXConvolution",
          defines: {
            GGX_SAMPLES: 256,
            CUBEUV_TEXEL_WIDTH: 1 / t,
            CUBEUV_TEXEL_HEIGHT: 1 / n,
            CUBEUV_MAX_MIP: `${e}.0`
          },
          uniforms: {
            envMap: {
              value: null
            },
            roughness: {
              value: 0
            },
            mipInt: {
              value: 0
            }
          },
          vertexShader: z(),
          fragmentShader: '\n\n\t\t\tprecision highp float;\n\t\t\tprecision highp int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\t\t\tuniform float roughness;\n\t\t\tuniform float mipInt;\n\n\t\t\t#define ENVMAP_TYPE_CUBE_UV\n\t\t\t#include <cube_uv_reflection_fragment>\n\n\t\t\t#define PI 3.14159265359\n\n\t\t\t// Van der Corput radical inverse\n\t\t\tfloat radicalInverse_VdC(uint bits) {\n\t\t\t\tbits = (bits << 16u) | (bits >> 16u);\n\t\t\t\tbits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);\n\t\t\t\tbits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);\n\t\t\t\tbits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);\n\t\t\t\tbits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);\n\t\t\t\treturn float(bits) * 2.3283064365386963e-10; // / 0x100000000\n\t\t\t}\n\n\t\t\t// Hammersley sequence\n\t\t\tvec2 hammersley(uint i, uint N) {\n\t\t\t\treturn vec2(float(i) / float(N), radicalInverse_VdC(i));\n\t\t\t}\n\n\t\t\t// GGX VNDF importance sampling (Eric Heitz 2018)\n\t\t\t// "Sampling the GGX Distribution of Visible Normals"\n\t\t\t// https://jcgt.org/published/0007/04/01/\n\t\t\tvec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {\n\t\t\t\tfloat alpha = roughness * roughness;\n\n\t\t\t\t// Section 4.1: Orthonormal basis\n\t\t\t\tvec3 T1 = vec3(1.0, 0.0, 0.0);\n\t\t\t\tvec3 T2 = cross(V, T1);\n\n\t\t\t\t// Section 4.2: Parameterization of projected area\n\t\t\t\tfloat r = sqrt(Xi.x);\n\t\t\t\tfloat phi = 2.0 * PI * Xi.y;\n\t\t\t\tfloat t1 = r * cos(phi);\n\t\t\t\tfloat t2 = r * sin(phi);\n\t\t\t\tfloat s = 0.5 * (1.0 + V.z);\n\t\t\t\tt2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;\n\n\t\t\t\t// Section 4.3: Reprojection onto hemisphere\n\t\t\t\tvec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;\n\n\t\t\t\t// Section 3.4: Transform back to ellipsoid configuration\n\t\t\t\treturn normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));\n\t\t\t}\n\n\t\t\tvoid main() {\n\t\t\t\tvec3 N = normalize(vOutputDirection);\n\t\t\t\tvec3 V = N; // Assume view direction equals normal for pre-filtering\n\n\t\t\t\tvec3 prefilteredColor = vec3(0.0);\n\t\t\t\tfloat totalWeight = 0.0;\n\n\t\t\t\t// For very low roughness, just sample the environment directly\n\t\t\t\tif (roughness < 0.001) {\n\t\t\t\t\tgl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\t// Tangent space basis for VNDF sampling\n\t\t\t\tvec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);\n\t\t\t\tvec3 tangent = normalize(cross(up, N));\n\t\t\t\tvec3 bitangent = cross(N, tangent);\n\n\t\t\t\tfor(uint i = 0u; i < uint(GGX_SAMPLES); i++) {\n\t\t\t\t\tvec2 Xi = hammersley(i, uint(GGX_SAMPLES));\n\n\t\t\t\t\t// For PMREM, V = N, so in tangent space V is always (0, 0, 1)\n\t\t\t\t\tvec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);\n\n\t\t\t\t\t// Transform H back to world space\n\t\t\t\t\tvec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);\n\t\t\t\t\tvec3 L = normalize(2.0 * dot(V, H) * H - V);\n\n\t\t\t\t\tfloat NdotL = max(dot(N, L), 0.0);\n\n\t\t\t\t\tif(NdotL > 0.0) {\n\t\t\t\t\t\t// Sample environment at fixed mip level\n\t\t\t\t\t\t// VNDF importance sampling handles the distribution filtering\n\t\t\t\t\t\tvec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);\n\n\t\t\t\t\t\t// Weight by NdotL for the split-sum approximation\n\t\t\t\t\t\t// VNDF PDF naturally accounts for the visible microfacet distribution\n\t\t\t\t\t\tprefilteredColor += sampleColor * NdotL;\n\t\t\t\t\t\ttotalWeight += NdotL;\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tif (totalWeight > 0.0) {\n\t\t\t\t\tprefilteredColor = prefilteredColor / totalWeight;\n\t\t\t\t}\n\n\t\t\t\tgl_FragColor = vec4(prefilteredColor, 1.0);\n\t\t\t}\n\t\t',
          blending: ThreeCore.NoBlending,
          depthTest: !1,
          depthWrite: !1
        });
        return shaderMaterial;
      }(_lodMax, e, t);
    }
    return i;
  }
  _compileMaterial(e) {
    const mesh = new ThreeCore.Mesh(new ThreeCore.BufferGeometry(), e);
    this._renderer.compile(mesh, orthographicCamera);
  }
  _sceneToCubeUV(e, t, n, i, a) {
    const perspectiveCamera = new ThreeCore.PerspectiveCamera(90, 1, t, n),
      o = [1, -1, 1, 1, 1, 1],
      c = [1, 1, 1, -1, -1, -1],
      renderer = this._renderer,
      u = renderer.autoClear,
      d = renderer.toneMapping;
    renderer.getClearColor(color), renderer.toneMapping = ThreeCore.NoToneMapping, renderer.autoClear = !1;
    renderer.state.buffers.depth.getReversed() && (renderer.setRenderTarget(i), renderer.clearDepth(), renderer.setRenderTarget(null)), null === this._backgroundBox && (this._backgroundBox = new ThreeCore.Mesh(new ThreeCore.BoxGeometry(), new ThreeCore.MeshBasicMaterial({
      name: "PMREM.Background",
      side: ThreeCore.BackSide,
      depthWrite: !1,
      depthTest: !1
    })));
    const backgroundBox = this._backgroundBox,
      p = backgroundBox.material;
    let f = !1;
    const m = e.background;
    m ? m.isColor && (p.color.copy(m), e.background = null, f = !0) : (p.color.copy(color), f = !0);
    for (let t = 0; t < 6; t++) {
      const n = t % 3;
      0 === n ? (perspectiveCamera.up.set(0, o[t], 0), perspectiveCamera.position.set(a.x, a.y, a.z), perspectiveCamera.lookAt(a.x + c[t], a.y, a.z)) : 1 === n ? (perspectiveCamera.up.set(0, 0, o[t]), perspectiveCamera.position.set(a.x, a.y, a.z), perspectiveCamera.lookAt(a.x, a.y + c[t], a.z)) : (perspectiveCamera.up.set(0, o[t], 0), perspectiveCamera.position.set(a.x, a.y, a.z), perspectiveCamera.lookAt(a.x, a.y, a.z + c[t]));
      const cubeSize = this._cubeSize;
      E(i, n * cubeSize, t > 2 ? cubeSize : 0, cubeSize, cubeSize), renderer.setRenderTarget(i), f && renderer.render(backgroundBox, perspectiveCamera), renderer.render(e, perspectiveCamera);
    }
    renderer.toneMapping = d, renderer.autoClear = u, e.background = m;
  }
  _textureToCubeUV(e, t) {
    const renderer = this._renderer,
      i = e.mapping === ThreeCore.CubeReflectionMapping || e.mapping === ThreeCore.CubeRefractionMapping;
    i ? (null === this._cubemapMaterial && (this._cubemapMaterial = C()), this._cubemapMaterial.uniforms.flipEnvMap.value = !1 === e.isRenderTargetTexture ? -1 : 1) : null === this._equirectMaterial && (this._equirectMaterial = x());
    const a = i ? this._cubemapMaterial : this._equirectMaterial,
      s = this._lodMeshes[0];
    s.material = a;
    a.uniforms.envMap.value = e;
    const cubeSize = this._cubeSize;
    E(t, 0, 0, 3 * cubeSize, 2 * cubeSize), renderer.setRenderTarget(t), renderer.render(s, orthographicCamera);
  }
  _applyPMREM(e) {
    const renderer = this._renderer,
      n = renderer.autoClear;
    renderer.autoClear = !1;
    const r = this._lodMeshes.length;
    for (let t = 1; t < r; t++) this._applyGGXFilter(e, t - 1, t);
    renderer.autoClear = n;
  }
  _applyGGXFilter(e, t, n) {
    const renderer = this._renderer,
      pingPongRenderTarget = this._pingPongRenderTarget,
      ggxMaterial = this._ggxMaterial,
      s = this._lodMeshes[n];
    s.material = ggxMaterial;
    const o = ggxMaterial.uniforms,
      c = n / (this._lodMeshes.length - 1),
      l = t / (this._lodMeshes.length - 1),
      u = Math.sqrt(c * c - l * l) * (0 + 1.25 * c),
      {
        _lodMax: _lodMax
      } = this,
      h = this._sizeLods[n],
      p = 3 * h * (n > _lodMax - 4 ? n - _lodMax + 4 : 0),
      f = 4 * (this._cubeSize - h);
    o.envMap.value = e.texture, o.roughness.value = u, o.mipInt.value = _lodMax - t, E(pingPongRenderTarget, p, f, 3 * h, 2 * h), renderer.setRenderTarget(pingPongRenderTarget), renderer.render(s, orthographicCamera), o.envMap.value = pingPongRenderTarget.texture, o.roughness.value = 0, o.mipInt.value = _lodMax - n, E(e, p, f, 3 * h, 2 * h), renderer.setRenderTarget(e), renderer.render(s, orthographicCamera);
  }
  _blur(e, t, n, r, i) {
    const pingPongRenderTarget = this._pingPongRenderTarget;
    this._halfBlur(e, pingPongRenderTarget, t, n, r, "latitudinal", i), this._halfBlur(pingPongRenderTarget, e, n, n, r, "longitudinal", i);
  }
  _halfBlur(e, t, n, i, a, s, o) {
    const renderer = this._renderer,
      blurMaterial = this._blurMaterial;
    "latitudinal" !== s && "longitudinal" !== s && (0, ThreeCore.error)("blur direction must be either latitudinal or longitudinal!");
    const u = this._lodMeshes[i];
    u.material = blurMaterial;
    const d = blurMaterial.uniforms,
      h = this._sizeLods[n] - 1,
      p = isFinite(a) ? Math.PI / (2 * h) : 2 * Math.PI / 39,
      f = a / p,
      m = isFinite(a) ? 1 + Math.floor(3 * f) : A;
    m > A && (0, ThreeCore.warn)(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to 20`);
    const M = [];
    let _ = 0;
    for (let e = 0; e < A; ++e) {
      const t = e / f,
        n = Math.exp(-t * t / 2);
      M.push(n), 0 === e ? _ += n : e < m && (_ += 2 * n);
    }
    for (let e = 0; e < M.length; e++) M[e] = M[e] / _;
    d.envMap.value = e.texture, d.samples.value = m, d.weights.value = M, d.latitudinal.value = "latitudinal" === s, o && (d.poleAxis.value = o);
    const {
      _lodMax: _lodMax
    } = this;
    d.dTheta.value = p, d.mipInt.value = _lodMax - n;
    const y = this._sizeLods[i];
    E(t, 3 * y * (i > _lodMax - 4 ? i - _lodMax + 4 : 0), 4 * (this._cubeSize - y), 3 * y, 2 * y), renderer.setRenderTarget(t), renderer.render(u, orthographicCamera);
  }
}
function w(e, t, n) {
  const webGLRenderTarget = new ThreeCore.WebGLRenderTarget(e, t, n);
  return webGLRenderTarget.texture.mapping = ThreeCore.CubeUVReflectionMapping, webGLRenderTarget.texture.name = "PMREM.cubeUv", webGLRenderTarget.scissorTest = !0, webGLRenderTarget;
}
function E(e, t, n, r, i) {
  e.viewport.set(t, n, r, i), e.scissor.set(t, n, r, i);
}
function x() {
  return new ThreeCore.ShaderMaterial({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: {
        value: null
      }
    },
    vertexShader: z(),
    fragmentShader: "\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\n\t\t\t#include <common>\n\n\t\t\tvoid main() {\n\n\t\t\t\tvec3 outputDirection = normalize( vOutputDirection );\n\t\t\t\tvec2 uv = equirectUv( outputDirection );\n\n\t\t\t\tgl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );\n\n\t\t\t}\n\t\t",
    blending: ThreeCore.NoBlending,
    depthTest: !1,
    depthWrite: !1
  });
}
function C() {
  return new ThreeCore.ShaderMaterial({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: {
        value: null
      },
      flipEnvMap: {
        value: -1
      }
    },
    vertexShader: z(),
    fragmentShader: "\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tuniform float flipEnvMap;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform samplerCube envMap;\n\n\t\t\tvoid main() {\n\n\t\t\t\tgl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );\n\n\t\t\t}\n\t\t",
    blending: ThreeCore.NoBlending,
    depthTest: !1,
    depthWrite: !1
  });
}
function z() {
  return "\n\n\t\tprecision mediump float;\n\t\tprecision mediump int;\n\n\t\tattribute float faceIndex;\n\n\t\tvarying vec3 vOutputDirection;\n\n\t\t// RH coordinate system; PMREM face-indexing convention\n\t\tvec3 getDirection( vec2 uv, float face ) {\n\n\t\t\tuv = 2.0 * uv - 1.0;\n\n\t\t\tvec3 direction = vec3( uv, 1.0 );\n\n\t\t\tif ( face == 0.0 ) {\n\n\t\t\t\tdirection = direction.zyx; // ( 1, v, u ) pos x\n\n\t\t\t} else if ( face == 1.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n\t\t\t} else if ( face == 2.0 ) {\n\n\t\t\t\tdirection.x *= -1.0; // ( -u, v, 1 ) pos z\n\n\t\t\t} else if ( face == 3.0 ) {\n\n\t\t\t\tdirection = direction.zyx;\n\t\t\t\tdirection.xz *= -1.0; // ( -1, v, -u ) neg x\n\n\t\t\t} else if ( face == 4.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xy *= -1.0; // ( -u, -1, v ) neg y\n\n\t\t\t} else if ( face == 5.0 ) {\n\n\t\t\t\tdirection.z *= -1.0; // ( u, v, -1 ) neg z\n\n\t\t\t}\n\n\t\t\treturn direction;\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvOutputDirection = getDirection( uv, faceIndex );\n\t\t\tgl_Position = vec4( position, 1.0 );\n\n\t\t}\n\t";
}
class WebGLCubeRenderTarget extends ThreeCore.WebGLRenderTarget {
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const n = {
        width: e,
        height: e,
        depth: 1
      },
      i = [n, n, n, n, n, n];
    this.texture = new ThreeCore.CubeTexture(i), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0;
  }
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const n = {
        uniforms: {
          tEquirect: {
            value: null
          }
        },
        vertexShader: "\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\tvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\t\t\t\t\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t\t\t\t\t#include <begin_vertex>\n\t\t\t\t\t#include <project_vertex>\n\n\t\t\t\t}\n\t\t\t",
        fragmentShader: "\n\n\t\t\t\tuniform sampler2D tEquirect;\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\t#include <common>\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvec3 direction = normalize( vWorldDirection );\n\n\t\t\t\t\tvec2 sampleUV = equirectUv( direction );\n\n\t\t\t\t\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\n\t\t\t\t}\n\t\t\t"
      },
      boxGeometry = new ThreeCore.BoxGeometry(5, 5, 5),
      shaderMaterial = new ThreeCore.ShaderMaterial({
        name: "CubemapFromEquirect",
        uniforms: (0, ThreeCore.cloneUniforms)(n.uniforms),
        vertexShader: n.vertexShader,
        fragmentShader: n.fragmentShader,
        side: ThreeCore.BackSide,
        blending: ThreeCore.NoBlending
      });
    shaderMaterial.uniforms.tEquirect.value = t;
    const mesh = new ThreeCore.Mesh(boxGeometry, shaderMaterial),
      o = t.minFilter;
    t.minFilter === ThreeCore.LinearMipmapLinearFilter && (t.minFilter = ThreeCore.LinearFilter);
    return new ThreeCore.CubeCamera(1, 10, this).update(e, mesh), t.minFilter = o, mesh.geometry.dispose(), mesh.material.dispose(), this;
  }
  clear(e, t = !0, n = !0, r = !0) {
    const i = e.getRenderTarget();
    for (let i = 0; i < 6; i++) e.setRenderTarget(this, i), e.clear(t, n, r);
    e.setRenderTarget(i);
  }
}
function O(e) {
  let weakMap = new WeakMap(),
    n = new WeakMap(),
    i = null;
  function a(e, t) {
    return t === ThreeCore.EquirectangularReflectionMapping ? e.mapping = ThreeCore.CubeReflectionMapping : t === ThreeCore.EquirectangularRefractionMapping && (e.mapping = ThreeCore.CubeRefractionMapping), e;
  }
  function s(e) {
    const n = e.target;
    n.removeEventListener("dispose", s);
    const r = weakMap.get(n);
    void 0 !== r && (weakMap.delete(n), r.dispose());
  }
  function o(e) {
    const t = e.target;
    t.removeEventListener("dispose", o);
    const r = n.get(t);
    void 0 !== r && (n.delete(t), r.dispose());
  }
  return {
    get: function (c, l = !1) {
      return null == c ? null : l ? function (t) {
        if (t && t.isTexture) {
          const a = t.mapping,
            s = a === ThreeCore.EquirectangularReflectionMapping || a === ThreeCore.EquirectangularRefractionMapping,
            c = a === ThreeCore.CubeReflectionMapping || a === ThreeCore.CubeRefractionMapping;
          if (s || c) {
            let r = n.get(t);
            const a = void 0 !== r ? r.texture.pmremVersion : 0;
            if (t.isRenderTargetTexture && t.pmremVersion !== a) return null === i && (i = new PMREMGenerator(e)), r = s ? i.fromEquirectangular(t, r) : i.fromCubemap(t, r), r.texture.pmremVersion = t.pmremVersion, n.set(t, r), r.texture;
            if (void 0 !== r) return r.texture;
            {
              const a = t.image;
              return s && a && a.height > 0 || c && a && function (e) {
                let t = 0;
                const n = 6;
                for (let r = 0; r < n; r++) void 0 !== e[r] && t++;
                return t === n;
              }(a) ? (null === i && (i = new PMREMGenerator(e)), r = s ? i.fromEquirectangular(t) : i.fromCubemap(t), r.texture.pmremVersion = t.pmremVersion, n.set(t, r), t.addEventListener("dispose", o), r.texture) : null;
            }
          }
        }
        return t;
      }(c) : function (n) {
        if (n && n.isTexture) {
          const i = n.mapping;
          if (i === ThreeCore.EquirectangularReflectionMapping || i === ThreeCore.EquirectangularRefractionMapping) {
            if (weakMap.has(n)) {
              return a(weakMap.get(n).texture, n.mapping);
            }
            {
              const r = n.image;
              if (r && r.height > 0) {
                const webGLCubeRenderTarget = new WebGLCubeRenderTarget(r.height);
                return webGLCubeRenderTarget.fromEquirectangularTexture(e, n), weakMap.set(n, webGLCubeRenderTarget), n.addEventListener("dispose", s), a(webGLCubeRenderTarget.texture, n.mapping);
              }
              return null;
            }
          }
        }
        return n;
      }(c);
    },
    dispose: function () {
      weakMap = new WeakMap(), n = new WeakMap(), null !== i && (i.dispose(), i = null);
    }
  };
}
function B(e) {
  const t = {};
  function n(n) {
    if (void 0 !== t[n]) return t[n];
    const r = e.getExtension(n);
    return t[n] = r, r;
  }
  return {
    has: function (e) {
      return null !== n(e);
    },
    init: function () {
      n("EXT_color_buffer_float"), n("WEBGL_clip_cull_distance"), n("OES_texture_float_linear"), n("EXT_color_buffer_half_float"), n("WEBGL_multisampled_render_to_texture"), n("WEBGL_render_shared_exponent");
    },
    get: function (e) {
      const t = n(e);
      return null === t && (0, ThreeCore.warnOnce)("WebGLRenderer: " + e + " extension not supported."), t;
    }
  };
}
function D(e, t, n, i) {
  const a = {},
    weakMap = new WeakMap();
  function o(e) {
    const r = e.target;
    null !== r.index && t.remove(r.index);
    for (const e in r.attributes) t.remove(r.attributes[e]);
    r.removeEventListener("dispose", o), delete a[r.id];
    const c = weakMap.get(r);
    c && (t.remove(c), weakMap.delete(r)), i.releaseStatesOfGeometry(r), !0 === r.isInstancedBufferGeometry && delete r._maxInstanceCount, n.memory.geometries--;
  }
  function c(e) {
    const n = [],
      i = e.index,
      a = e.attributes.position;
    let o = 0;
    if (void 0 === a) return;
    if (null !== i) {
      const e = i.array;
      o = i.version;
      for (let t = 0, r = e.length; t < r; t += 3) {
        const r = e[t + 0],
          i = e[t + 1],
          a = e[t + 2];
        n.push(r, i, i, a, a, r);
      }
    } else {
      const e = a.array;
      o = a.version;
      for (let t = 0, r = e.length / 3 - 1; t < r; t += 3) {
        const e = t + 0,
          r = t + 1,
          i = t + 2;
        n.push(e, r, r, i, i, e);
      }
    }
    const c = new (a.count >= 65535 ? ThreeCore.Uint32BufferAttribute : ThreeCore.Uint16BufferAttribute)(n, 1);
    c.version = o;
    const l = weakMap.get(e);
    l && t.remove(l), weakMap.set(e, c);
  }
  return {
    get: function (e, t) {
      return !0 === a[t.id] || (t.addEventListener("dispose", o), a[t.id] = !0, n.memory.geometries++), t;
    },
    update: function (n) {
      const r = n.attributes;
      for (const n in r) t.update(r[n], e.ARRAY_BUFFER);
    },
    getWireframeAttribute: function (e) {
      const t = weakMap.get(e);
      if (t) {
        const n = e.index;
        null !== n && t.version < n.version && c(e);
      } else c(e);
      return weakMap.get(e);
    }
  };
}
function N(e, t, n) {
  let r, i, a;
  this.setMode = function (e) {
    r = e;
  }, this.setIndex = function (e) {
    i = e.type, a = e.bytesPerElement;
  }, this.render = function (t, s) {
    e.drawElements(r, s, i, t * a), n.update(s, r, 1);
  }, this.renderInstances = function (t, s, o) {
    0 !== o && (e.drawElementsInstanced(r, s, i, t * a, o), n.update(s, r, o));
  }, this.renderMultiDraw = function (e, a, s) {
    if (0 === s) return;
    t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r, a, 0, i, e, 0, s);
    let o = 0;
    for (let e = 0; e < s; e++) o += a[e];
    n.update(o, r, 1);
  };
}
function I(e) {
  const t = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  return {
    memory: {
      geometries: 0,
      textures: 0
    },
    render: t,
    programs: null,
    autoReset: !0,
    reset: function () {
      t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0;
    },
    update: function (n, i, a) {
      switch (t.calls++, i) {
        case e.TRIANGLES:
          t.triangles += a * (n / 3);
          break;
        case e.LINES:
          t.lines += a * (n / 2);
          break;
        case e.LINE_STRIP:
          t.lines += a * (n - 1);
          break;
        case e.LINE_LOOP:
          t.lines += a * n;
          break;
        case e.POINTS:
          t.points += a * n;
          break;
        default:
          (0, ThreeCore.error)("WebGLInfo: Unknown draw mode:", i);
      }
    }
  };
}
function R(e, t, n) {
  const weakMap = new WeakMap(),
    vector4 = new ThreeCore.Vector4();
  return {
    update: function (s, o, c) {
      const l = s.morphTargetInfluences,
        u = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color,
        d = void 0 !== u ? u.length : 0;
      let h = weakMap.get(o);
      if (void 0 === h || h.count !== d) {
        void 0 !== h && h.texture.dispose();
        const p = void 0 !== o.morphAttributes.position,
          f = void 0 !== o.morphAttributes.normal,
          m = void 0 !== o.morphAttributes.color,
          M = o.morphAttributes.position || [],
          _ = o.morphAttributes.normal || [],
          A = o.morphAttributes.color || [];
        let g = 0;
        !0 === p && (g = 1), !0 === f && (g = 2), !0 === m && (g = 3);
        let b = o.attributes.position.count * g,
          y = 1;
        b > t.maxTextureSize && (y = Math.ceil(b / t.maxTextureSize), b = t.maxTextureSize);
        const float32Array = new Float32Array(b * y * 4 * d),
          dataArrayTexture = new ThreeCore.DataArrayTexture(float32Array, b, y, d);
        dataArrayTexture.type = ThreeCore.FloatType, dataArrayTexture.needsUpdate = !0;
        const T = 4 * g;
        for (let w = 0; w < d; w++) {
          const E = M[w],
            x = _[w],
            C = A[w],
            z = b * y * 4 * w;
          for (let O = 0; O < E.count; O++) {
            const B = O * T;
            !0 === p && (vector4.fromBufferAttribute(E, O), float32Array[z + B + 0] = vector4.x, float32Array[z + B + 1] = vector4.y, float32Array[z + B + 2] = vector4.z, float32Array[z + B + 3] = 0), !0 === f && (vector4.fromBufferAttribute(x, O), float32Array[z + B + 4] = vector4.x, float32Array[z + B + 5] = vector4.y, float32Array[z + B + 6] = vector4.z, float32Array[z + B + 7] = 0), !0 === m && (vector4.fromBufferAttribute(C, O), float32Array[z + B + 8] = vector4.x, float32Array[z + B + 9] = vector4.y, float32Array[z + B + 10] = vector4.z, float32Array[z + B + 11] = 4 === C.itemSize ? vector4.w : 1);
          }
        }
        function S() {
          dataArrayTexture.dispose(), weakMap.delete(o), o.removeEventListener("dispose", S);
        }
        h = {
          count: d,
          texture: dataArrayTexture,
          size: new ThreeCore.Vector2(b, y)
        }, weakMap.set(o, h), o.addEventListener("dispose", S);
      }
      if (!0 === s.isInstancedMesh && null !== s.morphTexture) c.getUniforms().setValue(e, "morphTexture", s.morphTexture, n);else {
        let D = 0;
        for (let I = 0; I < l.length; I++) D += l[I];
        const N = o.morphTargetsRelative ? 1 : 1 - D;
        c.getUniforms().setValue(e, "morphTargetBaseInfluence", N), c.getUniforms().setValue(e, "morphTargetInfluences", l);
      }
      c.getUniforms().setValue(e, "morphTargetsTexture", h.texture, n), c.getUniforms().setValue(e, "morphTargetsTextureSize", h.size);
    }
  };
}
function k(e, t, n, r, i) {
  let weakMap = new WeakMap();
  function s(e) {
    const t = e.target;
    t.removeEventListener("dispose", s), r.releaseStatesOfObject(t), n.remove(t.instanceMatrix), null !== t.instanceColor && n.remove(t.instanceColor);
  }
  return {
    update: function (r) {
      const o = i.render.frame,
        c = r.geometry,
        l = t.get(r, c);
      if (weakMap.get(l) !== o && (t.update(l), weakMap.set(l, o)), r.isInstancedMesh && (!1 === r.hasEventListener("dispose", s) && r.addEventListener("dispose", s), weakMap.get(r) !== o && (n.update(r.instanceMatrix, e.ARRAY_BUFFER), null !== r.instanceColor && n.update(r.instanceColor, e.ARRAY_BUFFER), weakMap.set(r, o))), r.isSkinnedMesh) {
        const e = r.skeleton;
        weakMap.get(e) !== o && (e.update(), weakMap.set(e, o));
      }
      return l;
    },
    dispose: function () {
      weakMap = new WeakMap();
    }
  };
}
const P = {
  [ThreeCore.LinearToneMapping]: "LINEAR_TONE_MAPPING",
  [ThreeCore.ReinhardToneMapping]: "REINHARD_TONE_MAPPING",
  [ThreeCore.CineonToneMapping]: "CINEON_TONE_MAPPING",
  [ThreeCore.ACESFilmicToneMapping]: "ACES_FILMIC_TONE_MAPPING",
  [ThreeCore.AgXToneMapping]: "AGX_TONE_MAPPING",
  [ThreeCore.NeutralToneMapping]: "NEUTRAL_TONE_MAPPING",
  [ThreeCore.CustomToneMapping]: "CUSTOM_TONE_MAPPING"
};
function Y(e, t, n, i, a, s) {
  const webGLRenderTarget = new ThreeCore.WebGLRenderTarget(t, n, {
      type: e,
      depthBuffer: a,
      stencilBuffer: s,
      samples: i ? 4 : 0,
      depthTexture: a ? new ThreeCore.DepthTexture(t, n) : void 0
    }),
    c = new ThreeCore.WebGLRenderTarget(t, n, {
      type: ThreeCore.HalfFloatType,
      depthBuffer: !1,
      stencilBuffer: !1
    }),
    bufferGeometry = new ThreeCore.BufferGeometry();
  bufferGeometry.setAttribute("position", new ThreeCore.Float32BufferAttribute([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), bufferGeometry.setAttribute("uv", new ThreeCore.Float32BufferAttribute([0, 2, 0, 0, 2, 0], 2));
  const rawShaderMaterial = new ThreeCore.RawShaderMaterial({
      uniforms: {
        tDiffuse: {
          value: null
        }
      },
      vertexShader: "\n\t\t\tprecision highp float;\n\n\t\t\tuniform mat4 modelViewMatrix;\n\t\t\tuniform mat4 projectionMatrix;\n\n\t\t\tattribute vec3 position;\n\t\t\tattribute vec2 uv;\n\n\t\t\tvarying vec2 vUv;\n\n\t\t\tvoid main() {\n\t\t\t\tvUv = uv;\n\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t}",
      fragmentShader: "\n\t\t\tprecision highp float;\n\n\t\t\tuniform sampler2D tDiffuse;\n\n\t\t\tvarying vec2 vUv;\n\n\t\t\t#include <tonemapping_pars_fragment>\n\t\t\t#include <colorspace_pars_fragment>\n\n\t\t\tvoid main() {\n\t\t\t\tgl_FragColor = texture2D( tDiffuse, vUv );\n\n\t\t\t\t#ifdef LINEAR_TONE_MAPPING\n\t\t\t\t\tgl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );\n\t\t\t\t#elif defined( REINHARD_TONE_MAPPING )\n\t\t\t\t\tgl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );\n\t\t\t\t#elif defined( CINEON_TONE_MAPPING )\n\t\t\t\t\tgl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );\n\t\t\t\t#elif defined( ACES_FILMIC_TONE_MAPPING )\n\t\t\t\t\tgl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );\n\t\t\t\t#elif defined( AGX_TONE_MAPPING )\n\t\t\t\t\tgl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );\n\t\t\t\t#elif defined( NEUTRAL_TONE_MAPPING )\n\t\t\t\t\tgl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );\n\t\t\t\t#elif defined( CUSTOM_TONE_MAPPING )\n\t\t\t\t\tgl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );\n\t\t\t\t#endif\n\n\t\t\t\t#ifdef SRGB_TRANSFER\n\t\t\t\t\tgl_FragColor = sRGBTransferOETF( gl_FragColor );\n\t\t\t\t#endif\n\t\t\t}",
      depthTest: !1,
      depthWrite: !1
    }),
    mesh = new ThreeCore.Mesh(bufferGeometry, rawShaderMaterial),
    h = new ThreeCore.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  let p,
    f = null,
    m = null,
    M = !1,
    _ = null,
    A = [],
    g = !1;
  this.setSize = function (e, t) {
    webGLRenderTarget.setSize(e, t), c.setSize(e, t);
    for (let n = 0; n < A.length; n++) {
      const r = A[n];
      r.setSize && r.setSize(e, t);
    }
  }, this.setEffects = function (e) {
    A = e, g = A.length > 0 && !0 === A[0].isRenderPass;
    const t = webGLRenderTarget.width,
      n = webGLRenderTarget.height;
    for (let e = 0; e < A.length; e++) {
      const r = A[e];
      r.setSize && r.setSize(t, n);
    }
  }, this.begin = function (e, t) {
    if (M) return !1;
    if (e.toneMapping === ThreeCore.NoToneMapping && 0 === A.length) return !1;
    if (_ = t, null !== t) {
      const e = t.width,
        n = t.height;
      webGLRenderTarget.width === e && webGLRenderTarget.height === n || this.setSize(e, n);
    }
    return !1 === g && e.setRenderTarget(webGLRenderTarget), p = e.toneMapping, e.toneMapping = ThreeCore.NoToneMapping, !0;
  }, this.hasRenderPass = function () {
    return g;
  }, this.end = function (e, t) {
    e.toneMapping = p, M = !0;
    let n = webGLRenderTarget,
      i = c;
    for (let r = 0; r < A.length; r++) {
      const a = A[r];
      if (!1 !== a.enabled && (a.render(e, i, n, t), !1 !== a.needsSwap)) {
        const e = n;
        n = i, i = e;
      }
    }
    if (f !== e.outputColorSpace || m !== e.toneMapping) {
      f = e.outputColorSpace, m = e.toneMapping, rawShaderMaterial.defines = {}, ThreeCore.ColorManagement.getTransfer(f) === ThreeCore.SRGBTransfer && (rawShaderMaterial.defines.SRGB_TRANSFER = "");
      const t = P[m];
      t && (rawShaderMaterial.defines[t] = ""), rawShaderMaterial.needsUpdate = !0;
    }
    rawShaderMaterial.uniforms.tDiffuse.value = n.texture, e.setRenderTarget(_), e.render(mesh, h), _ = null, M = !1;
  }, this.isCompositing = function () {
    return M;
  }, this.dispose = function () {
    webGLRenderTarget.depthTexture && webGLRenderTarget.depthTexture.dispose(), webGLRenderTarget.dispose(), c.dispose(), bufferGeometry.dispose(), rawShaderMaterial.dispose();
  };
}
const texture = new ThreeCore.Texture(),
  depthTexture = new ThreeCore.DepthTexture(1, 1),
  dataArrayTexture = new ThreeCore.DataArrayTexture(),
  data3DTexture = new ThreeCore.Data3DTexture(),
  cubeTexture = new ThreeCore.CubeTexture(),
  G = [],
  X = [],
  float32Array = new Float32Array(16),
  V = new Float32Array(9),
  K = new Float32Array(4);
function J(e, t, n) {
  const r = e[0];
  if (r <= 0 || r > 0) return e;
  const i = t * n;
  let a = G[i];
  if (void 0 === a && (a = new Float32Array(i), G[i] = a), 0 !== t) {
    r.toArray(a, 0);
    for (let r = 1, i = 0; r !== t; ++r) i += n, e[r].toArray(a, i);
  }
  return a;
}
function $(e, t) {
  if (e.length !== t.length) return !1;
  for (let n = 0, r = e.length; n < r; n++) if (e[n] !== t[n]) return !1;
  return !0;
}
function Z(e, t) {
  for (let n = 0, r = t.length; n < r; n++) e[n] = t[n];
}
function ee(e, t) {
  let n = X[t];
  void 0 === n && (n = new Int32Array(t), X[t] = n);
  for (let r = 0; r !== t; ++r) n[r] = e.allocateTextureUnit();
  return n;
}
function te(e, t) {
  const cache = this.cache;
  cache[0] !== t && (e.uniform1f(this.addr, t), cache[0] = t);
}
function ne(e, t) {
  const cache = this.cache;
  if (void 0 !== t.x) cache[0] === t.x && cache[1] === t.y || (e.uniform2f(this.addr, t.x, t.y), cache[0] = t.x, cache[1] = t.y);else {
    if ($(cache, t)) return;
    e.uniform2fv(this.addr, t), Z(cache, t);
  }
}
function re(e, t) {
  const cache = this.cache;
  if (void 0 !== t.x) cache[0] === t.x && cache[1] === t.y && cache[2] === t.z || (e.uniform3f(this.addr, t.x, t.y, t.z), cache[0] = t.x, cache[1] = t.y, cache[2] = t.z);else if (void 0 !== t.r) cache[0] === t.r && cache[1] === t.g && cache[2] === t.b || (e.uniform3f(this.addr, t.r, t.g, t.b), cache[0] = t.r, cache[1] = t.g, cache[2] = t.b);else {
    if ($(cache, t)) return;
    e.uniform3fv(this.addr, t), Z(cache, t);
  }
}
function ie(e, t) {
  const cache = this.cache;
  if (void 0 !== t.x) cache[0] === t.x && cache[1] === t.y && cache[2] === t.z && cache[3] === t.w || (e.uniform4f(this.addr, t.x, t.y, t.z, t.w), cache[0] = t.x, cache[1] = t.y, cache[2] = t.z, cache[3] = t.w);else {
    if ($(cache, t)) return;
    e.uniform4fv(this.addr, t), Z(cache, t);
  }
}
function ae(e, t) {
  const cache = this.cache,
    r = t.elements;
  if (void 0 === r) {
    if ($(cache, t)) return;
    e.uniformMatrix2fv(this.addr, !1, t), Z(cache, t);
  } else {
    if ($(cache, r)) return;
    K.set(r), e.uniformMatrix2fv(this.addr, !1, K), Z(cache, r);
  }
}
function se(e, t) {
  const cache = this.cache,
    r = t.elements;
  if (void 0 === r) {
    if ($(cache, t)) return;
    e.uniformMatrix3fv(this.addr, !1, t), Z(cache, t);
  } else {
    if ($(cache, r)) return;
    V.set(r), e.uniformMatrix3fv(this.addr, !1, V), Z(cache, r);
  }
}
function oe(e, t) {
  const cache = this.cache,
    r = t.elements;
  if (void 0 === r) {
    if ($(cache, t)) return;
    e.uniformMatrix4fv(this.addr, !1, t), Z(cache, t);
  } else {
    if ($(cache, r)) return;
    float32Array.set(r), e.uniformMatrix4fv(this.addr, !1, float32Array), Z(cache, r);
  }
}
function ce(e, t) {
  const cache = this.cache;
  cache[0] !== t && (e.uniform1i(this.addr, t), cache[0] = t);
}
function le(e, t) {
  const cache = this.cache;
  if (void 0 !== t.x) cache[0] === t.x && cache[1] === t.y || (e.uniform2i(this.addr, t.x, t.y), cache[0] = t.x, cache[1] = t.y);else {
    if ($(cache, t)) return;
    e.uniform2iv(this.addr, t), Z(cache, t);
  }
}
function ue(e, t) {
  const cache = this.cache;
  if (void 0 !== t.x) cache[0] === t.x && cache[1] === t.y && cache[2] === t.z || (e.uniform3i(this.addr, t.x, t.y, t.z), cache[0] = t.x, cache[1] = t.y, cache[2] = t.z);else {
    if ($(cache, t)) return;
    e.uniform3iv(this.addr, t), Z(cache, t);
  }
}
function de(e, t) {
  const cache = this.cache;
  if (void 0 !== t.x) cache[0] === t.x && cache[1] === t.y && cache[2] === t.z && cache[3] === t.w || (e.uniform4i(this.addr, t.x, t.y, t.z, t.w), cache[0] = t.x, cache[1] = t.y, cache[2] = t.z, cache[3] = t.w);else {
    if ($(cache, t)) return;
    e.uniform4iv(this.addr, t), Z(cache, t);
  }
}
function he(e, t) {
  const cache = this.cache;
  cache[0] !== t && (e.uniform1ui(this.addr, t), cache[0] = t);
}
function pe(e, t) {
  const cache = this.cache;
  if (void 0 !== t.x) cache[0] === t.x && cache[1] === t.y || (e.uniform2ui(this.addr, t.x, t.y), cache[0] = t.x, cache[1] = t.y);else {
    if ($(cache, t)) return;
    e.uniform2uiv(this.addr, t), Z(cache, t);
  }
}
function fe(e, t) {
  const cache = this.cache;
  if (void 0 !== t.x) cache[0] === t.x && cache[1] === t.y && cache[2] === t.z || (e.uniform3ui(this.addr, t.x, t.y, t.z), cache[0] = t.x, cache[1] = t.y, cache[2] = t.z);else {
    if ($(cache, t)) return;
    e.uniform3uiv(this.addr, t), Z(cache, t);
  }
}
function me(e, t) {
  const cache = this.cache;
  if (void 0 !== t.x) cache[0] === t.x && cache[1] === t.y && cache[2] === t.z && cache[3] === t.w || (e.uniform4ui(this.addr, t.x, t.y, t.z, t.w), cache[0] = t.x, cache[1] = t.y, cache[2] = t.z, cache[3] = t.w);else {
    if ($(cache, t)) return;
    e.uniform4uiv(this.addr, t), Z(cache, t);
  }
}
function Me(e, t, n) {
  const cache = this.cache,
    a = n.allocateTextureUnit();
  let s;
  cache[0] !== a && (e.uniform1i(this.addr, a), cache[0] = a), this.type === e.SAMPLER_2D_SHADOW ? (depthTexture.compareFunction = n.isReversedDepthBuffer() ? ThreeCore.GreaterEqualCompare : ThreeCore.LessEqualCompare, s = depthTexture) : s = texture, n.setTexture2D(t || s, a);
}
function _e(e, t, n) {
  const cache = this.cache,
    i = n.allocateTextureUnit();
  cache[0] !== i && (e.uniform1i(this.addr, i), cache[0] = i), n.setTexture3D(t || data3DTexture, i);
}
function Ae(e, t, n) {
  const cache = this.cache,
    i = n.allocateTextureUnit();
  cache[0] !== i && (e.uniform1i(this.addr, i), cache[0] = i), n.setTextureCube(t || cubeTexture, i);
}
function ge(e, t, n) {
  const cache = this.cache,
    i = n.allocateTextureUnit();
  cache[0] !== i && (e.uniform1i(this.addr, i), cache[0] = i), n.setTexture2DArray(t || dataArrayTexture, i);
}
function be(e, t) {
  e.uniform1fv(this.addr, t);
}
function ye(e, t) {
  const n = J(t, this.size, 2);
  e.uniform2fv(this.addr, n);
}
function Le(e, t) {
  const n = J(t, this.size, 3);
  e.uniform3fv(this.addr, n);
}
function ve(e, t) {
  const n = J(t, this.size, 4);
  e.uniform4fv(this.addr, n);
}
function Te(e, t) {
  const n = J(t, this.size, 4);
  e.uniformMatrix2fv(this.addr, !1, n);
}
function Se(e, t) {
  const n = J(t, this.size, 9);
  e.uniformMatrix3fv(this.addr, !1, n);
}
function we(e, t) {
  const n = J(t, this.size, 16);
  e.uniformMatrix4fv(this.addr, !1, n);
}
function Ee(e, t) {
  e.uniform1iv(this.addr, t);
}
function xe(e, t) {
  e.uniform2iv(this.addr, t);
}
function Ce(e, t) {
  e.uniform3iv(this.addr, t);
}
function ze(e, t) {
  e.uniform4iv(this.addr, t);
}
function Oe(e, t) {
  e.uniform1uiv(this.addr, t);
}
function Be(e, t) {
  e.uniform2uiv(this.addr, t);
}
function De(e, t) {
  e.uniform3uiv(this.addr, t);
}
function Ne(e, t) {
  e.uniform4uiv(this.addr, t);
}
function Ie(e, t, n) {
  const cache = this.cache,
    i = t.length,
    a = ee(n, i);
  let s;
  $(cache, a) || (e.uniform1iv(this.addr, a), Z(cache, a)), s = this.type === e.SAMPLER_2D_SHADOW ? depthTexture : texture;
  for (let e = 0; e !== i; ++e) n.setTexture2D(t[e] || s, a[e]);
}
function Re(e, t, n) {
  const cache = this.cache,
    i = t.length,
    a = ee(n, i);
  $(cache, a) || (e.uniform1iv(this.addr, a), Z(cache, a));
  for (let e = 0; e !== i; ++e) n.setTexture3D(t[e] || data3DTexture, a[e]);
}
function ke(e, t, n) {
  const cache = this.cache,
    i = t.length,
    a = ee(n, i);
  $(cache, a) || (e.uniform1iv(this.addr, a), Z(cache, a));
  for (let e = 0; e !== i; ++e) n.setTextureCube(t[e] || cubeTexture, a[e]);
}
function Pe(e, t, n) {
  const cache = this.cache,
    i = t.length,
    a = ee(n, i);
  $(cache, a) || (e.uniform1iv(this.addr, a), Z(cache, a));
  for (let e = 0; e !== i; ++e) n.setTexture2DArray(t[e] || dataArrayTexture, a[e]);
}
class SingleUniform {
  constructor(id, t, addr) {
    this.id = id, this.addr = addr, this.cache = [], this.type = t.type, this.setValue = function (e) {
      switch (e) {
        case 5126:
          return te;
        case 35664:
          return ne;
        case 35665:
          return re;
        case 35666:
          return ie;
        case 35674:
          return ae;
        case 35675:
          return se;
        case 35676:
          return oe;
        case 5124:
        case 35670:
          return ce;
        case 35667:
        case 35671:
          return le;
        case 35668:
        case 35672:
          return ue;
        case 35669:
        case 35673:
          return de;
        case 5125:
          return he;
        case 36294:
          return pe;
        case 36295:
          return fe;
        case 36296:
          return me;
        case 35678:
        case 36198:
        case 36298:
        case 36306:
        case 35682:
          return Me;
        case 35679:
        case 36299:
        case 36307:
          return _e;
        case 35680:
        case 36300:
        case 36308:
        case 36293:
          return Ae;
        case 36289:
        case 36303:
        case 36311:
        case 36292:
          return ge;
      }
    }(t.type);
  }
}
class PureArrayUniform {
  constructor(id, t, addr) {
    this.id = id, this.addr = addr, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = function (e) {
      switch (e) {
        case 5126:
          return be;
        case 35664:
          return ye;
        case 35665:
          return Le;
        case 35666:
          return ve;
        case 35674:
          return Te;
        case 35675:
          return Se;
        case 35676:
          return we;
        case 5124:
        case 35670:
          return Ee;
        case 35667:
        case 35671:
          return xe;
        case 35668:
        case 35672:
          return Ce;
        case 35669:
        case 35673:
          return ze;
        case 5125:
          return Oe;
        case 36294:
          return Be;
        case 36295:
          return De;
        case 36296:
          return Ne;
        case 35678:
        case 36198:
        case 36298:
        case 36306:
        case 35682:
          return Ie;
        case 35679:
        case 36299:
        case 36307:
          return Re;
        case 35680:
        case 36300:
        case 36308:
        case 36293:
          return ke;
        case 36289:
        case 36303:
        case 36311:
        case 36292:
          return Pe;
      }
    }(t.type);
  }
}
class StructuredUniform {
  constructor(id) {
    this.id = id, this.seq = [], this.map = {};
  }
  setValue(e, t, n) {
    const seq = this.seq;
    for (let i = 0, a = seq.length; i !== a; ++i) {
      const a = seq[i];
      a.setValue(e, t[a.id], n);
    }
  }
}
const Ye = /(\w+)(\])?(\[|\.)?/g;
function We(e, t) {
  e.seq.push(t), e.map[t.id] = t;
}
function Fe(e, t, n) {
  const r = e.name,
    i = r.length;
  for (Ye.lastIndex = 0;;) {
    const a = Ye.exec(r),
      s = Ye.lastIndex;
    let o = a[1];
    const c = "]" === a[2],
      l = a[3];
    if (c && (o |= 0), void 0 === l || "[" === l && s + 2 === i) {
      We(n, void 0 === l ? new SingleUniform(o, e, t) : new PureArrayUniform(o, e, t));
      break;
    }
    {
      let e = n.map[o];
      void 0 === e && (e = new StructuredUniform(o), We(n, e)), n = e;
    }
  }
}
class WebGLUniforms {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let r = 0; r < n; ++r) {
      const n = e.getActiveUniform(t, r);
      Fe(n, e.getUniformLocation(t, n.name), this);
    }
    const r = [],
      i = [];
    for (const t of this.seq) t.type === e.SAMPLER_2D_SHADOW || t.type === e.SAMPLER_CUBE_SHADOW || t.type === e.SAMPLER_2D_ARRAY_SHADOW ? r.push(t) : i.push(t);
    r.length > 0 && (this.seq = r.concat(i));
  }
  setValue(e, t, n, r) {
    const i = this.map[t];
    void 0 !== i && i.setValue(e, n, r);
  }
  setOptional(e, t, n) {
    const r = t[n];
    void 0 !== r && this.setValue(e, n, r);
  }
  static upload(e, t, n, r) {
    for (let i = 0, a = t.length; i !== a; ++i) {
      const a = t[i],
        s = n[a.id];
      !1 !== s.needsUpdate && a.setValue(e, s.value, r);
    }
  }
  static seqWithValue(e, t) {
    const n = [];
    for (let r = 0, i = e.length; r !== i; ++r) {
      const i = e[r];
      i.id in t && n.push(i);
    }
    return n;
  }
}
function qe(e, t, n) {
  const r = e.createShader(t);
  return e.shaderSource(r, n), e.compileShader(r), r;
}
let He = 0;
const Ue = new ThreeCore.Matrix3();
function Ge(e, t, n) {
  const r = e.getShaderParameter(t, e.COMPILE_STATUS),
    i = (e.getShaderInfoLog(t) || "").trim();
  if (r && "" === i) return "";
  const a = /ERROR: 0:(\d+)/.exec(i);
  if (a) {
    const r = parseInt(a[1]);
    return n.toUpperCase() + "\n\n" + i + "\n\n" + function (e, t) {
      const n = e.split("\n"),
        r = [],
        i = Math.max(t - 6, 0),
        a = Math.min(t + 6, n.length);
      for (let e = i; e < a; e++) {
        const i = e + 1;
        r.push(`${i === t ? ">" : " "} ${i}: ${n[e]}`);
      }
      return r.join("\n");
    }(e.getShaderSource(t), r);
  }
  return i;
}
function Xe(e, t) {
  const n = function (e) {
    ThreeCore.ColorManagement._getMatrix(Ue, ThreeCore.ColorManagement.workingColorSpace, e);
    const t = `mat3( ${Ue.elements.map(e => e.toFixed(4))} )`;
    switch (ThreeCore.ColorManagement.getTransfer(e)) {
      case ThreeCore.LinearTransfer:
        return [t, "LinearTransferOETF"];
      case ThreeCore.SRGBTransfer:
        return [t, "sRGBTransferOETF"];
      default:
        return (0, ThreeCore.warn)("WebGLProgram: Unsupported color space: ", e), [t, "LinearTransferOETF"];
    }
  }(t);
  return [`vec4 ${e}( vec4 value ) {`, `\treturn ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`, "}"].join("\n");
}
const je = {
  [ThreeCore.LinearToneMapping]: "Linear",
  [ThreeCore.ReinhardToneMapping]: "Reinhard",
  [ThreeCore.CineonToneMapping]: "Cineon",
  [ThreeCore.ACESFilmicToneMapping]: "ACESFilmic",
  [ThreeCore.AgXToneMapping]: "AgX",
  [ThreeCore.NeutralToneMapping]: "Neutral",
  [ThreeCore.CustomToneMapping]: "Custom"
};
function Ve(e, t) {
  const n = je[t];
  return void 0 === n ? ((0, ThreeCore.warn)("WebGLProgram: Unsupported toneMapping:", t), "vec3 " + e + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + e + "( vec3 color ) { return " + n + "ToneMapping( color ); }";
}
const Qe = new ThreeCore.Vector3();
function Ke() {
  ThreeCore.ColorManagement.getLuminanceCoefficients(Qe);
  return ["float luminance( const in vec3 rgb ) {", `\tconst vec3 weights = vec3( ${Qe.x.toFixed(4)}, ${Qe.y.toFixed(4)}, ${Qe.z.toFixed(4)} );`, "\treturn dot( weights, rgb );", "}"].join("\n");
}
function Je(e) {
  return "" !== e;
}
function $e(e, t) {
  const n = t.numSpotLightShadows + t.numSpotLightMaps - t.numSpotLightShadowsWithMaps;
  return e.replace(/NUM_DIR_LIGHTS/g, t.numDirLights).replace(/NUM_SPOT_LIGHTS/g, t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, n).replace(/NUM_RECT_AREA_LIGHTS/g, t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, t.numPointLights).replace(/NUM_HEMI_LIGHTS/g, t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, t.numPointLightShadows);
}
function Ze(e, t) {
  return e.replace(/NUM_CLIPPING_PLANES/g, t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, t.numClippingPlanes - t.numClipIntersection);
}
const et = /^[ \t]*#include +<([\w\d./]+)>/gm;
function tt(e) {
  return e.replace(et, rt);
}
const map = new Map();
function rt(e, t) {
  let n = ShaderChunk[t];
  if (void 0 === n) {
    const e = map.get(t);
    if (void 0 === e) throw new Error("THREE.WebGLProgram: Can not resolve #include <" + t + ">");
    n = ShaderChunk[e], (0, ThreeCore.warn)('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', t, e);
  }
  return tt(n);
}
const it = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function at(e) {
  return e.replace(it, st);
}
function st(e, t, n, r) {
  let i = "";
  for (let e = parseInt(t); e < parseInt(n); e++) i += r.replace(/\[\s*i\s*\]/g, "[ " + e + " ]").replace(/UNROLLED_LOOP_INDEX/g, e);
  return i;
}
function ot(e) {
  let t = `precision ${e.precision} float;\n\tprecision ${e.precision} int;\n\tprecision ${e.precision} sampler2D;\n\tprecision ${e.precision} samplerCube;\n\tprecision ${e.precision} sampler3D;\n\tprecision ${e.precision} sampler2DArray;\n\tprecision ${e.precision} sampler2DShadow;\n\tprecision ${e.precision} samplerCubeShadow;\n\tprecision ${e.precision} sampler2DArrayShadow;\n\tprecision ${e.precision} isampler2D;\n\tprecision ${e.precision} isampler3D;\n\tprecision ${e.precision} isamplerCube;\n\tprecision ${e.precision} isampler2DArray;\n\tprecision ${e.precision} usampler2D;\n\tprecision ${e.precision} usampler3D;\n\tprecision ${e.precision} usamplerCube;\n\tprecision ${e.precision} usampler2DArray;\n\t`;
  return "highp" === e.precision ? t += "\n#define HIGH_PRECISION" : "mediump" === e.precision ? t += "\n#define MEDIUM_PRECISION" : "lowp" === e.precision && (t += "\n#define LOW_PRECISION"), t;
}
const ct = {
  [ThreeCore.PCFShadowMap]: "SHADOWMAP_TYPE_PCF",
  [ThreeCore.VSMShadowMap]: "SHADOWMAP_TYPE_VSM"
};
const lt = {
  [ThreeCore.CubeReflectionMapping]: "ENVMAP_TYPE_CUBE",
  [ThreeCore.CubeRefractionMapping]: "ENVMAP_TYPE_CUBE",
  [ThreeCore.CubeUVReflectionMapping]: "ENVMAP_TYPE_CUBE_UV"
};
const ut = {
  [ThreeCore.CubeRefractionMapping]: "ENVMAP_MODE_REFRACTION"
};
const dt = {
  [ThreeCore.MultiplyOperation]: "ENVMAP_BLENDING_MULTIPLY",
  [ThreeCore.MixOperation]: "ENVMAP_BLENDING_MIX",
  [ThreeCore.AddOperation]: "ENVMAP_BLENDING_ADD"
};
function ht(e, cacheKey, n, i) {
  const a = e.getContext(),
    o = n.defines;
  let c = n.vertexShader,
    l = n.fragmentShader;
  const u = function (e) {
      return ct[e.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
    }(n),
    d = function (e) {
      return !1 === e.envMap ? "ENVMAP_TYPE_CUBE" : lt[e.envMapMode] || "ENVMAP_TYPE_CUBE";
    }(n),
    h = function (e) {
      return !1 === e.envMap ? "ENVMAP_MODE_REFLECTION" : ut[e.envMapMode] || "ENVMAP_MODE_REFLECTION";
    }(n),
    p = function (e) {
      return !1 === e.envMap ? "ENVMAP_BLENDING_NONE" : dt[e.combine] || "ENVMAP_BLENDING_NONE";
    }(n),
    f = function (e) {
      const t = e.envMapCubeUVHeight;
      if (null === t) return null;
      const n = Math.log2(t) - 2,
        r = 1 / t;
      return {
        texelWidth: 1 / (3 * Math.max(Math.pow(2, n), 112)),
        texelHeight: r,
        maxMip: n
      };
    }(n),
    m = function (e) {
      return [e.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", e.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(Je).join("\n");
    }(n),
    M = function (e) {
      const t = [];
      for (const n in e) {
        const r = e[n];
        !1 !== r && t.push("#define " + n + " " + r);
      }
      return t.join("\n");
    }(o),
    program = a.createProgram();
  let A,
    g,
    b = n.glslVersion ? "#version " + n.glslVersion + "\n" : "";
  n.isRawShaderMaterial ? (A = ["#define SHADER_TYPE " + n.shaderType, "#define SHADER_NAME " + n.shaderName, M].filter(Je).join("\n"), A.length > 0 && (A += "\n"), g = ["#define SHADER_TYPE " + n.shaderType, "#define SHADER_NAME " + n.shaderName, M].filter(Je).join("\n"), g.length > 0 && (g += "\n")) : (A = [ot(n), "#define SHADER_TYPE " + n.shaderType, "#define SHADER_NAME " + n.shaderName, M, n.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "", n.batching ? "#define USE_BATCHING" : "", n.batchingColor ? "#define USE_BATCHING_COLOR" : "", n.instancing ? "#define USE_INSTANCING" : "", n.instancingColor ? "#define USE_INSTANCING_COLOR" : "", n.instancingMorph ? "#define USE_INSTANCING_MORPH" : "", n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + h : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", n.displacementMap ? "#define USE_DISPLACEMENTMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.anisotropy ? "#define USE_ANISOTROPY" : "", n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.alphaHash ? "#define USE_ALPHAHASH" : "", n.transmission ? "#define USE_TRANSMISSION" : "", n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", n.thicknessMap ? "#define USE_THICKNESSMAP" : "", n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", n.mapUv ? "#define MAP_UV " + n.mapUv : "", n.alphaMapUv ? "#define ALPHAMAP_UV " + n.alphaMapUv : "", n.lightMapUv ? "#define LIGHTMAP_UV " + n.lightMapUv : "", n.aoMapUv ? "#define AOMAP_UV " + n.aoMapUv : "", n.emissiveMapUv ? "#define EMISSIVEMAP_UV " + n.emissiveMapUv : "", n.bumpMapUv ? "#define BUMPMAP_UV " + n.bumpMapUv : "", n.normalMapUv ? "#define NORMALMAP_UV " + n.normalMapUv : "", n.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + n.displacementMapUv : "", n.metalnessMapUv ? "#define METALNESSMAP_UV " + n.metalnessMapUv : "", n.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + n.roughnessMapUv : "", n.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + n.anisotropyMapUv : "", n.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + n.clearcoatMapUv : "", n.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + n.clearcoatNormalMapUv : "", n.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + n.clearcoatRoughnessMapUv : "", n.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + n.iridescenceMapUv : "", n.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + n.iridescenceThicknessMapUv : "", n.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + n.sheenColorMapUv : "", n.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + n.sheenRoughnessMapUv : "", n.specularMapUv ? "#define SPECULARMAP_UV " + n.specularMapUv : "", n.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + n.specularColorMapUv : "", n.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + n.specularIntensityMapUv : "", n.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + n.transmissionMapUv : "", n.thicknessMapUv ? "#define THICKNESSMAP_UV " + n.thicknessMapUv : "", n.vertexTangents && !1 === n.flatShading ? "#define USE_TANGENT" : "", n.vertexNormals ? "#define HAS_NORMAL" : "", n.vertexColors ? "#define USE_COLOR" : "", n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", n.vertexUv1s ? "#define USE_UV1" : "", n.vertexUv2s ? "#define USE_UV2" : "", n.vertexUv3s ? "#define USE_UV3" : "", n.pointsUvs ? "#define USE_POINTS_UV" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.skinning ? "#define USE_SKINNING" : "", n.morphTargets ? "#define USE_MORPHTARGETS" : "", n.morphNormals && !1 === n.flatShading ? "#define USE_MORPHNORMALS" : "", n.morphColors ? "#define USE_MORPHCOLORS" : "", n.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + n.morphTextureStride : "", n.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + n.morphTargetsCount : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + u : "", n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "", n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "\tattribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "\tattribute vec3 instanceColor;", "#endif", "#ifdef USE_INSTANCING_MORPH", "\tuniform sampler2D morphTexture;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_UV1", "\tattribute vec2 uv1;", "#endif", "#ifdef USE_UV2", "\tattribute vec2 uv2;", "#endif", "#ifdef USE_UV3", "\tattribute vec2 uv3;", "#endif", "#ifdef USE_TANGENT", "\tattribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "\tattribute vec4 color;", "#elif defined( USE_COLOR )", "\tattribute vec3 color;", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n"].filter(Je).join("\n"), g = [ot(n), "#define SHADER_TYPE " + n.shaderType, "#define SHADER_NAME " + n.shaderName, M, n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "", n.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "", n.map ? "#define USE_MAP" : "", n.matcap ? "#define USE_MATCAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + d : "", n.envMap ? "#define " + h : "", n.envMap ? "#define " + p : "", f ? "#define CUBEUV_TEXEL_WIDTH " + f.texelWidth : "", f ? "#define CUBEUV_TEXEL_HEIGHT " + f.texelHeight : "", f ? "#define CUBEUV_MAX_MIP " + f.maxMip + ".0" : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", n.packedNormalMap ? "#define USE_PACKED_NORMALMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.anisotropy ? "#define USE_ANISOTROPY" : "", n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", n.clearcoat ? "#define USE_CLEARCOAT" : "", n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", n.dispersion ? "#define USE_DISPERSION" : "", n.iridescence ? "#define USE_IRIDESCENCE" : "", n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.alphaTest ? "#define USE_ALPHATEST" : "", n.alphaHash ? "#define USE_ALPHAHASH" : "", n.sheen ? "#define USE_SHEEN" : "", n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", n.transmission ? "#define USE_TRANSMISSION" : "", n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", n.thicknessMap ? "#define USE_THICKNESSMAP" : "", n.vertexTangents && !1 === n.flatShading ? "#define USE_TANGENT" : "", n.vertexColors || n.instancingColor ? "#define USE_COLOR" : "", n.vertexAlphas || n.batchingColor ? "#define USE_COLOR_ALPHA" : "", n.vertexUv1s ? "#define USE_UV1" : "", n.vertexUv2s ? "#define USE_UV2" : "", n.vertexUv3s ? "#define USE_UV3" : "", n.pointsUvs ? "#define USE_POINTS_UV" : "", n.gradientMap ? "#define USE_GRADIENTMAP" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + u : "", n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", n.numLightProbeGrids > 0 ? "#define USE_LIGHT_PROBES_GRID" : "", n.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", n.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "", n.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "", n.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", n.toneMapping !== ThreeCore.NoToneMapping ? "#define TONE_MAPPING" : "", n.toneMapping !== ThreeCore.NoToneMapping ? ShaderChunk.tonemapping_pars_fragment : "", n.toneMapping !== ThreeCore.NoToneMapping ? Ve("toneMapping", n.toneMapping) : "", n.dithering ? "#define DITHERING" : "", n.opaque ? "#define OPAQUE" : "", ShaderChunk.colorspace_pars_fragment, Xe("linearToOutputTexel", n.outputColorSpace), Ke(), n.useDepthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "", "\n"].filter(Je).join("\n")), c = tt(c), c = $e(c, n), c = Ze(c, n), l = tt(l), l = $e(l, n), l = Ze(l, n), c = at(c), l = at(l), !0 !== n.isRawShaderMaterial && (b = "#version 300 es\n", A = [m, "#define attribute in", "#define varying out", "#define texture2D texture"].join("\n") + "\n" + A, g = ["#define varying in", n.glslVersion === ThreeCore.GLSL3 ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", n.glslVersion === ThreeCore.GLSL3 ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join("\n") + "\n" + g);
  const y = b + A + c,
    L = b + g + l,
    vertexShader = qe(a, a.VERTEX_SHADER, y),
    fragmentShader = qe(a, a.FRAGMENT_SHADER, L);
  function S(t) {
    if (e.debug.checkShaderErrors) {
      const n = a.getProgramInfoLog(program) || "",
        i = a.getShaderInfoLog(vertexShader) || "",
        s = a.getShaderInfoLog(fragmentShader) || "",
        o = n.trim(),
        c = i.trim(),
        l = s.trim();
      let u = !0,
        d = !0;
      if (!1 === a.getProgramParameter(program, a.LINK_STATUS)) {
        if (u = !1, "function" == typeof e.debug.onShaderError) e.debug.onShaderError(a, program, vertexShader, fragmentShader);else {
          const e = Ge(a, vertexShader, "vertex"),
            n = Ge(a, fragmentShader, "fragment");
          (0, ThreeCore.error)("WebGLProgram: Shader Error " + a.getError() + " - VALIDATE_STATUS " + a.getProgramParameter(program, a.VALIDATE_STATUS) + "\n\nMaterial Name: " + t.name + "\nMaterial Type: " + t.type + "\n\nProgram Info Log: " + o + "\n" + e + "\n" + n);
        }
      } else "" !== o ? (0, ThreeCore.warn)("WebGLProgram: Program Info Log:", o) : "" !== c && "" !== l || (d = !1);
      d && (t.diagnostics = {
        runnable: u,
        programLog: o,
        vertexShader: {
          log: c,
          prefix: A
        },
        fragmentShader: {
          log: l,
          prefix: g
        }
      });
    }
    a.deleteShader(vertexShader), a.deleteShader(fragmentShader), w = new WebGLUniforms(a, program), E = function (e, t) {
      const n = {},
        r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES);
      for (let i = 0; i < r; i++) {
        const r = e.getActiveAttrib(t, i),
          a = r.name;
        let s = 1;
        r.type === e.FLOAT_MAT2 && (s = 2), r.type === e.FLOAT_MAT3 && (s = 3), r.type === e.FLOAT_MAT4 && (s = 4), n[a] = {
          type: r.type,
          location: e.getAttribLocation(t, a),
          locationSize: s
        };
      }
      return n;
    }(a, program);
  }
  let w, E;
  a.attachShader(program, vertexShader), a.attachShader(program, fragmentShader), void 0 !== n.index0AttributeName ? a.bindAttribLocation(program, 0, n.index0AttributeName) : !0 === n.hasPositionAttribute && a.bindAttribLocation(program, 0, "position"), a.linkProgram(program), this.getUniforms = function () {
    return void 0 === w && S(this), w;
  }, this.getAttributes = function () {
    return void 0 === E && S(this), E;
  };
  let x = !1 === n.rendererExtensionParallelShaderCompile;
  return this.isReady = function () {
    return !1 === x && (x = a.getProgramParameter(program, 37297)), x;
  }, this.destroy = function () {
    i.releaseStatesOfProgram(this), a.deleteProgram(program), this.program = void 0;
  }, this.type = n.shaderType, this.name = n.shaderName, this.id = He++, this.cacheKey = cacheKey, this.usedTimes = 1, this.program = program, this.vertexShader = vertexShader, this.fragmentShader = fragmentShader, this;
}
let pt = 0;
class WebGLShaderCache {
  constructor() {
    this.shaderCache = new Map(), this.materialCache = new Map();
  }
  update(e, t, n) {
    const r = this._getShaderCacheForMaterial(e);
    return !1 === r.has(t) && (r.add(t), t.usedTimes++), !1 === r.has(n) && (r.add(n), n.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const e of t) e.usedTimes--, 0 === e.usedTimes && this.shaderCache.delete(e.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderStage(e) {
    return this._getShaderStage(e.vertexShader);
  }
  getFragmentShaderStage(e) {
    return this._getShaderStage(e.fragmentShader);
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const materialCache = this.materialCache;
    let n = materialCache.get(e);
    return void 0 === n && (n = new Set(), materialCache.set(e, n)), n;
  }
  _getShaderStage(e) {
    const shaderCache = this.shaderCache;
    let n = shaderCache.get(e);
    return void 0 === n && (n = new WebGLShaderStage(e), shaderCache.set(e, n)), n;
  }
}
class WebGLShaderStage {
  constructor(code) {
    this.id = pt++, this.code = code, this.usedTimes = 0;
  }
}
function ft(e, t, n, i, a, s) {
  const layers = new ThreeCore.Layers(),
    webGLShaderCache = new WebGLShaderCache(),
    set = new Set(),
    d = [],
    h = new Map(),
    p = i.logarithmicDepthBuffer;
  let f = i.precision;
  const m = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distance",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function M(e) {
    return set.add(e), 0 === e ? "uv" : `uv${e}`;
  }
  return {
    getParameters: function (a, o, d, h, _, A) {
      const g = h.fog,
        b = _.geometry,
        y = a.isMeshStandardMaterial || a.isMeshLambertMaterial || a.isMeshPhongMaterial ? h.environment : null,
        L = a.isMeshStandardMaterial || a.isMeshLambertMaterial && !a.envMap || a.isMeshPhongMaterial && !a.envMap,
        v = t.get(a.envMap || y, L),
        T = v && v.mapping === ThreeCore.CubeUVReflectionMapping ? v.image.height : null,
        S = m[a.type];
      null !== a.precision && (f = i.getMaxPrecision(a.precision), f !== a.precision && (0, ThreeCore.warn)("WebGLProgram.getParameters:", a.precision, "not supported, using", f, "instead."));
      const w = b.morphAttributes.position || b.morphAttributes.normal || b.morphAttributes.color,
        E = void 0 !== w ? w.length : 0;
      let x,
        C,
        z,
        O,
        B = 0;
      if (void 0 !== b.morphAttributes.position && (B = 1), void 0 !== b.morphAttributes.normal && (B = 2), void 0 !== b.morphAttributes.color && (B = 3), S) {
        const e = ShaderLib[S];
        x = e.vertexShader, C = e.fragmentShader;
      } else {
        x = a.vertexShader, C = a.fragmentShader;
        const e = webGLShaderCache.getVertexShaderStage(a),
          t = webGLShaderCache.getFragmentShaderStage(a);
        webGLShaderCache.update(a, e, t), z = e.id, O = t.id;
      }
      const D = e.getRenderTarget(),
        N = e.state.buffers.depth.getReversed(),
        I = !0 === _.isInstancedMesh,
        R = !0 === _.isBatchedMesh,
        k = !!a.map,
        P = !!a.matcap,
        Y = !!v,
        W = !!a.aoMap,
        F = !!a.lightMap,
        q = !!a.bumpMap && !1 === a.wireframe,
        H = !!a.normalMap,
        U = !!a.displacementMap,
        G = !!a.emissiveMap,
        X = !!a.metalnessMap,
        j = !!a.roughnessMap,
        V = a.anisotropy > 0,
        K = a.clearcoat > 0,
        J = a.dispersion > 0,
        $ = a.iridescence > 0,
        Z = a.sheen > 0,
        ee = a.transmission > 0,
        te = V && !!a.anisotropyMap,
        ne = K && !!a.clearcoatMap,
        re = K && !!a.clearcoatNormalMap,
        ie = K && !!a.clearcoatRoughnessMap,
        ae = $ && !!a.iridescenceMap,
        se = $ && !!a.iridescenceThicknessMap,
        oe = Z && !!a.sheenColorMap,
        ce = Z && !!a.sheenRoughnessMap,
        le = !!a.specularMap,
        ue = !!a.specularColorMap,
        de = !!a.specularIntensityMap,
        he = ee && !!a.transmissionMap,
        pe = ee && !!a.thicknessMap,
        fe = !!a.gradientMap,
        me = !!a.alphaMap,
        Me = a.alphaTest > 0,
        _e = !!a.alphaHash,
        Ae = !!a.extensions;
      let ge = ThreeCore.NoToneMapping;
      a.toneMapped && (null !== D && !0 !== D.isXRRenderTarget || (ge = e.toneMapping));
      const be = {
        shaderID: S,
        shaderType: a.type,
        shaderName: a.name,
        vertexShader: x,
        fragmentShader: C,
        defines: a.defines,
        customVertexShaderID: z,
        customFragmentShaderID: O,
        isRawShaderMaterial: !0 === a.isRawShaderMaterial,
        glslVersion: a.glslVersion,
        precision: f,
        batching: R,
        batchingColor: R && null !== _._colorsTexture,
        instancing: I,
        instancingColor: I && null !== _.instanceColor,
        instancingMorph: I && null !== _.morphTexture,
        outputColorSpace: null === D ? e.outputColorSpace : !0 === D.isXRRenderTarget ? D.texture.colorSpace : ThreeCore.ColorManagement.workingColorSpace,
        alphaToCoverage: !!a.alphaToCoverage,
        map: k,
        matcap: P,
        envMap: Y,
        envMapMode: Y && v.mapping,
        envMapCubeUVHeight: T,
        aoMap: W,
        lightMap: F,
        bumpMap: q,
        normalMap: H,
        displacementMap: U,
        emissiveMap: G,
        normalMapObjectSpace: H && a.normalMapType === ThreeCore.ObjectSpaceNormalMap,
        normalMapTangentSpace: H && a.normalMapType === ThreeCore.TangentSpaceNormalMap,
        packedNormalMap: H && a.normalMapType === ThreeCore.TangentSpaceNormalMap && (ye = a.normalMap.format, ye === ThreeCore.RGFormat || ye === ThreeCore.RG11_EAC_Format || ye === ThreeCore.RED_GREEN_RGTC2_Format),
        metalnessMap: X,
        roughnessMap: j,
        anisotropy: V,
        anisotropyMap: te,
        clearcoat: K,
        clearcoatMap: ne,
        clearcoatNormalMap: re,
        clearcoatRoughnessMap: ie,
        dispersion: J,
        iridescence: $,
        iridescenceMap: ae,
        iridescenceThicknessMap: se,
        sheen: Z,
        sheenColorMap: oe,
        sheenRoughnessMap: ce,
        specularMap: le,
        specularColorMap: ue,
        specularIntensityMap: de,
        transmission: ee,
        transmissionMap: he,
        thicknessMap: pe,
        gradientMap: fe,
        opaque: !1 === a.transparent && a.blending === ThreeCore.NormalBlending && !1 === a.alphaToCoverage,
        alphaMap: me,
        alphaTest: Me,
        alphaHash: _e,
        combine: a.combine,
        mapUv: k && M(a.map.channel),
        aoMapUv: W && M(a.aoMap.channel),
        lightMapUv: F && M(a.lightMap.channel),
        bumpMapUv: q && M(a.bumpMap.channel),
        normalMapUv: H && M(a.normalMap.channel),
        displacementMapUv: U && M(a.displacementMap.channel),
        emissiveMapUv: G && M(a.emissiveMap.channel),
        metalnessMapUv: X && M(a.metalnessMap.channel),
        roughnessMapUv: j && M(a.roughnessMap.channel),
        anisotropyMapUv: te && M(a.anisotropyMap.channel),
        clearcoatMapUv: ne && M(a.clearcoatMap.channel),
        clearcoatNormalMapUv: re && M(a.clearcoatNormalMap.channel),
        clearcoatRoughnessMapUv: ie && M(a.clearcoatRoughnessMap.channel),
        iridescenceMapUv: ae && M(a.iridescenceMap.channel),
        iridescenceThicknessMapUv: se && M(a.iridescenceThicknessMap.channel),
        sheenColorMapUv: oe && M(a.sheenColorMap.channel),
        sheenRoughnessMapUv: ce && M(a.sheenRoughnessMap.channel),
        specularMapUv: le && M(a.specularMap.channel),
        specularColorMapUv: ue && M(a.specularColorMap.channel),
        specularIntensityMapUv: de && M(a.specularIntensityMap.channel),
        transmissionMapUv: he && M(a.transmissionMap.channel),
        thicknessMapUv: pe && M(a.thicknessMap.channel),
        alphaMapUv: me && M(a.alphaMap.channel),
        vertexTangents: !!b.attributes.tangent && (H || V),
        vertexNormals: !!b.attributes.normal,
        vertexColors: a.vertexColors,
        vertexAlphas: !0 === a.vertexColors && !!b.attributes.color && 4 === b.attributes.color.itemSize,
        pointsUvs: !0 === _.isPoints && !!b.attributes.uv && (k || me),
        fog: !!g,
        useFog: !0 === a.fog,
        fogExp2: !!g && g.isFogExp2,
        flatShading: !1 === a.wireframe && (!0 === a.flatShading || void 0 === b.attributes.normal && !1 === H && (a.isMeshLambertMaterial || a.isMeshPhongMaterial || a.isMeshStandardMaterial || a.isMeshPhysicalMaterial)),
        sizeAttenuation: !0 === a.sizeAttenuation,
        logarithmicDepthBuffer: p,
        reversedDepthBuffer: N,
        skinning: !0 === _.isSkinnedMesh,
        hasPositionAttribute: void 0 !== b.attributes.position,
        morphTargets: void 0 !== b.morphAttributes.position,
        morphNormals: void 0 !== b.morphAttributes.normal,
        morphColors: void 0 !== b.morphAttributes.color,
        morphTargetsCount: E,
        morphTextureStride: B,
        numDirLights: o.directional.length,
        numPointLights: o.point.length,
        numSpotLights: o.spot.length,
        numSpotLightMaps: o.spotLightMap.length,
        numRectAreaLights: o.rectArea.length,
        numHemiLights: o.hemi.length,
        numDirLightShadows: o.directionalShadowMap.length,
        numPointLightShadows: o.pointShadowMap.length,
        numSpotLightShadows: o.spotShadowMap.length,
        numSpotLightShadowsWithMaps: o.numSpotLightShadowsWithMaps,
        numLightProbes: o.numLightProbes,
        numLightProbeGrids: A.length,
        numClippingPlanes: s.numPlanes,
        numClipIntersection: s.numIntersection,
        dithering: a.dithering,
        shadowMapEnabled: e.shadowMap.enabled && d.length > 0,
        shadowMapType: e.shadowMap.type,
        toneMapping: ge,
        decodeVideoTexture: k && !0 === a.map.isVideoTexture && ThreeCore.ColorManagement.getTransfer(a.map.colorSpace) === ThreeCore.SRGBTransfer,
        decodeVideoTextureEmissive: G && !0 === a.emissiveMap.isVideoTexture && ThreeCore.ColorManagement.getTransfer(a.emissiveMap.colorSpace) === ThreeCore.SRGBTransfer,
        premultipliedAlpha: a.premultipliedAlpha,
        doubleSided: a.side === ThreeCore.DoubleSide,
        flipSided: a.side === ThreeCore.BackSide,
        useDepthPacking: a.depthPacking >= 0,
        depthPacking: a.depthPacking || 0,
        index0AttributeName: a.index0AttributeName,
        extensionClipCullDistance: Ae && !0 === a.extensions.clipCullDistance && n.has("WEBGL_clip_cull_distance"),
        extensionMultiDraw: (Ae && !0 === a.extensions.multiDraw || R) && n.has("WEBGL_multi_draw"),
        rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
        customProgramCacheKey: a.customProgramCacheKey()
      };
      var ye;
      return be.vertexUv1s = set.has(1), be.vertexUv2s = set.has(2), be.vertexUv3s = set.has(3), set.clear(), be;
    },
    getProgramCacheKey: function (t) {
      const n = [];
      if (t.shaderID ? n.push(t.shaderID) : (n.push(t.customVertexShaderID), n.push(t.customFragmentShaderID)), void 0 !== t.defines) for (const e in t.defines) n.push(e), n.push(t.defines[e]);
      return !1 === t.isRawShaderMaterial && (!function (e, t) {
        e.push(t.precision), e.push(t.outputColorSpace), e.push(t.envMapMode), e.push(t.envMapCubeUVHeight), e.push(t.mapUv), e.push(t.alphaMapUv), e.push(t.lightMapUv), e.push(t.aoMapUv), e.push(t.bumpMapUv), e.push(t.normalMapUv), e.push(t.displacementMapUv), e.push(t.emissiveMapUv), e.push(t.metalnessMapUv), e.push(t.roughnessMapUv), e.push(t.anisotropyMapUv), e.push(t.clearcoatMapUv), e.push(t.clearcoatNormalMapUv), e.push(t.clearcoatRoughnessMapUv), e.push(t.iridescenceMapUv), e.push(t.iridescenceThicknessMapUv), e.push(t.sheenColorMapUv), e.push(t.sheenRoughnessMapUv), e.push(t.specularMapUv), e.push(t.specularColorMapUv), e.push(t.specularIntensityMapUv), e.push(t.transmissionMapUv), e.push(t.thicknessMapUv), e.push(t.combine), e.push(t.fogExp2), e.push(t.sizeAttenuation), e.push(t.morphTargetsCount), e.push(t.morphAttributeCount), e.push(t.numDirLights), e.push(t.numPointLights), e.push(t.numSpotLights), e.push(t.numSpotLightMaps), e.push(t.numHemiLights), e.push(t.numRectAreaLights), e.push(t.numDirLightShadows), e.push(t.numPointLightShadows), e.push(t.numSpotLightShadows), e.push(t.numSpotLightShadowsWithMaps), e.push(t.numLightProbes), e.push(t.shadowMapType), e.push(t.toneMapping), e.push(t.numClippingPlanes), e.push(t.numClipIntersection), e.push(t.depthPacking);
      }(n, t), function (e, t) {
        layers.disableAll(), t.instancing && layers.enable(0);
        t.instancingColor && layers.enable(1);
        t.instancingMorph && layers.enable(2);
        t.matcap && layers.enable(3);
        t.envMap && layers.enable(4);
        t.normalMapObjectSpace && layers.enable(5);
        t.normalMapTangentSpace && layers.enable(6);
        t.clearcoat && layers.enable(7);
        t.iridescence && layers.enable(8);
        t.alphaTest && layers.enable(9);
        t.vertexColors && layers.enable(10);
        t.vertexAlphas && layers.enable(11);
        t.vertexUv1s && layers.enable(12);
        t.vertexUv2s && layers.enable(13);
        t.vertexUv3s && layers.enable(14);
        t.vertexTangents && layers.enable(15);
        t.anisotropy && layers.enable(16);
        t.alphaHash && layers.enable(17);
        t.batching && layers.enable(18);
        t.dispersion && layers.enable(19);
        t.batchingColor && layers.enable(20);
        t.gradientMap && layers.enable(21);
        t.packedNormalMap && layers.enable(22);
        t.vertexNormals && layers.enable(23);
        e.push(layers.mask), layers.disableAll(), t.fog && layers.enable(0);
        t.useFog && layers.enable(1);
        t.flatShading && layers.enable(2);
        t.logarithmicDepthBuffer && layers.enable(3);
        t.reversedDepthBuffer && layers.enable(4);
        t.skinning && layers.enable(5);
        t.morphTargets && layers.enable(6);
        t.morphNormals && layers.enable(7);
        t.morphColors && layers.enable(8);
        t.premultipliedAlpha && layers.enable(9);
        t.shadowMapEnabled && layers.enable(10);
        t.doubleSided && layers.enable(11);
        t.flipSided && layers.enable(12);
        t.useDepthPacking && layers.enable(13);
        t.dithering && layers.enable(14);
        t.transmission && layers.enable(15);
        t.sheen && layers.enable(16);
        t.opaque && layers.enable(17);
        t.pointsUvs && layers.enable(18);
        t.decodeVideoTexture && layers.enable(19);
        t.decodeVideoTextureEmissive && layers.enable(20);
        t.alphaToCoverage && layers.enable(21);
        t.numLightProbeGrids > 0 && layers.enable(22);
        t.hasPositionAttribute && layers.enable(23);
        e.push(layers.mask);
      }(n, t), n.push(e.outputColorSpace)), n.push(t.customProgramCacheKey), n.join();
    },
    getUniforms: function (e) {
      const t = m[e.type];
      let n;
      if (t) {
        const e = ShaderLib[t];
        n = ThreeCore.UniformsUtils.clone(e.uniforms);
      } else n = e.uniforms;
      return n;
    },
    acquireProgram: function (t, n) {
      let r = h.get(n);
      return void 0 !== r ? ++r.usedTimes : (r = new ht(e, n, t, a), d.push(r), h.set(n, r)), r;
    },
    releaseProgram: function (e) {
      if (0 === --e.usedTimes) {
        const t = d.indexOf(e);
        d[t] = d[d.length - 1], d.pop(), h.delete(e.cacheKey), e.destroy();
      }
    },
    releaseShaderCache: function (e) {
      webGLShaderCache.remove(e);
    },
    programs: d,
    dispose: function () {
      webGLShaderCache.dispose();
    }
  };
}
function mt() {
  let weakMap = new WeakMap();
  return {
    has: function (t) {
      return weakMap.has(t);
    },
    get: function (t) {
      let n = weakMap.get(t);
      return void 0 === n && (n = {}, weakMap.set(t, n)), n;
    },
    remove: function (t) {
      weakMap.delete(t);
    },
    update: function (t, n, r) {
      weakMap.get(t)[n] = r;
    },
    dispose: function () {
      weakMap = new WeakMap();
    }
  };
}
function Mt(e, t) {
  return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.material.id !== t.material.id ? e.material.id - t.material.id : e.materialVariant !== t.materialVariant ? e.materialVariant - t.materialVariant : e.z !== t.z ? e.z - t.z : e.id - t.id;
}
function _t(e, t) {
  return e.groupOrder !== t.groupOrder ? e.groupOrder - t.groupOrder : e.renderOrder !== t.renderOrder ? e.renderOrder - t.renderOrder : e.z !== t.z ? t.z - e.z : e.id - t.id;
}
function At() {
  const e = [];
  let t = 0;
  const n = [],
    r = [],
    i = [];
  function a(e) {
    let t = 0;
    return e.isInstancedMesh && (t += 2), e.isSkinnedMesh && (t += 1), t;
  }
  function s(n, r, i, s, o, c) {
    let l = e[t];
    return void 0 === l ? (l = {
      id: n.id,
      object: n,
      geometry: r,
      material: i,
      materialVariant: a(n),
      groupOrder: s,
      renderOrder: n.renderOrder,
      z: o,
      group: c
    }, e[t] = l) : (l.id = n.id, l.object = n, l.geometry = r, l.material = i, l.materialVariant = a(n), l.groupOrder = s, l.renderOrder = n.renderOrder, l.z = o, l.group = c), t++, l;
  }
  return {
    opaque: n,
    transmissive: r,
    transparent: i,
    init: function () {
      t = 0, n.length = 0, r.length = 0, i.length = 0;
    },
    push: function (e, t, a, o, c, l) {
      const u = s(e, t, a, o, c, l);
      a.transmission > 0 ? r.push(u) : !0 === a.transparent ? i.push(u) : n.push(u);
    },
    unshift: function (e, t, a, o, c, l) {
      const u = s(e, t, a, o, c, l);
      a.transmission > 0 ? r.unshift(u) : !0 === a.transparent ? i.unshift(u) : n.unshift(u);
    },
    finish: function () {
      for (let n = t, r = e.length; n < r; n++) {
        const t = e[n];
        if (null === t.id) break;
        t.id = null, t.object = null, t.geometry = null, t.material = null, t.group = null;
      }
    },
    sort: function (e, t, a) {
      n.length > 1 && n.sort(e || Mt), r.length > 1 && r.sort(t || _t), i.length > 1 && i.sort(t || _t), a && (n.reverse(), r.reverse(), i.reverse());
    }
  };
}
function gt() {
  let weakMap = new WeakMap();
  return {
    get: function (t, n) {
      const r = weakMap.get(t);
      let i;
      return void 0 === r ? (i = new At(), weakMap.set(t, [i])) : n >= r.length ? (i = new At(), r.push(i)) : i = r[n], i;
    },
    dispose: function () {
      weakMap = new WeakMap();
    }
  };
}
function bt() {
  const e = {};
  return {
    get: function (t) {
      if (void 0 !== e[t.id]) return e[t.id];
      let n;
      switch (t.type) {
        case "DirectionalLight":
          n = {
            direction: new ThreeCore.Vector3(),
            color: new ThreeCore.Color()
          };
          break;
        case "SpotLight":
          n = {
            position: new ThreeCore.Vector3(),
            direction: new ThreeCore.Vector3(),
            color: new ThreeCore.Color(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          n = {
            position: new ThreeCore.Vector3(),
            color: new ThreeCore.Color(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          n = {
            direction: new ThreeCore.Vector3(),
            skyColor: new ThreeCore.Color(),
            groundColor: new ThreeCore.Color()
          };
          break;
        case "RectAreaLight":
          n = {
            color: new ThreeCore.Color(),
            position: new ThreeCore.Vector3(),
            halfWidth: new ThreeCore.Vector3(),
            halfHeight: new ThreeCore.Vector3()
          };
      }
      return e[t.id] = n, n;
    }
  };
}
let yt = 0;
function Lt(e, t) {
  return (t.castShadow ? 2 : 0) - (e.castShadow ? 2 : 0) + (t.map ? 1 : 0) - (e.map ? 1 : 0);
}
function vt(e) {
  const t = new bt(),
    n = function () {
      const e = {};
      return {
        get: function (t) {
          if (void 0 !== e[t.id]) return e[t.id];
          let n;
          switch (t.type) {
            case "DirectionalLight":
            case "SpotLight":
              n = {
                shadowIntensity: 1,
                shadowBias: 0,
                shadowNormalBias: 0,
                shadowRadius: 1,
                shadowMapSize: new ThreeCore.Vector2()
              };
              break;
            case "PointLight":
              n = {
                shadowIntensity: 1,
                shadowBias: 0,
                shadowNormalBias: 0,
                shadowRadius: 1,
                shadowMapSize: new ThreeCore.Vector2(),
                shadowCameraNear: 1,
                shadowCameraFar: 1e3
              };
          }
          return e[t.id] = n, n;
        }
      };
    }(),
    i = {
      version: 0,
      hash: {
        directionalLength: -1,
        pointLength: -1,
        spotLength: -1,
        rectAreaLength: -1,
        hemiLength: -1,
        numDirectionalShadows: -1,
        numPointShadows: -1,
        numSpotShadows: -1,
        numSpotMaps: -1,
        numLightProbes: -1
      },
      ambient: [0, 0, 0],
      probe: [],
      directional: [],
      directionalShadow: [],
      directionalShadowMap: [],
      directionalShadowMatrix: [],
      spot: [],
      spotLightMap: [],
      spotShadow: [],
      spotShadowMap: [],
      spotLightMatrix: [],
      rectArea: [],
      rectAreaLTC1: null,
      rectAreaLTC2: null,
      point: [],
      pointShadow: [],
      pointShadowMap: [],
      pointShadowMatrix: [],
      hemi: [],
      numSpotLightShadowsWithMaps: 0,
      numLightProbes: 0
    };
  for (let e = 0; e < 9; e++) i.probe.push(new ThreeCore.Vector3());
  const a = new ThreeCore.Vector3(),
    s = new ThreeCore.Matrix4(),
    c = new ThreeCore.Matrix4();
  return {
    setup: function (a) {
      let s = 0,
        c = 0,
        l = 0;
      for (let e = 0; e < 9; e++) i.probe[e].set(0, 0, 0);
      let u = 0,
        d = 0,
        h = 0,
        p = 0,
        f = 0,
        m = 0,
        M = 0,
        _ = 0,
        A = 0,
        g = 0,
        b = 0;
      a.sort(Lt);
      for (let e = 0, o = a.length; e < o; e++) {
        const o = a[e],
          y = o.color,
          L = o.intensity,
          v = o.distance;
        let T = null;
        if (o.shadow && o.shadow.map && (T = o.shadow.map.texture.format === ThreeCore.RGFormat ? o.shadow.map.texture : o.shadow.map.depthTexture || o.shadow.map.texture), o.isAmbientLight) s += y.r * L, c += y.g * L, l += y.b * L;else if (o.isLightProbe) {
          for (let e = 0; e < 9; e++) i.probe[e].addScaledVector(o.sh.coefficients[e], L);
          b++;
        } else if (o.isDirectionalLight) {
          const e = t.get(o);
          if (e.color.copy(o.color).multiplyScalar(o.intensity), o.castShadow) {
            const e = o.shadow,
              t = n.get(o);
            t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize = e.mapSize, i.directionalShadow[u] = t, i.directionalShadowMap[u] = T, i.directionalShadowMatrix[u] = o.shadow.matrix, m++;
          }
          i.directional[u] = e, u++;
        } else if (o.isSpotLight) {
          const e = t.get(o);
          e.position.setFromMatrixPosition(o.matrixWorld), e.color.copy(y).multiplyScalar(L), e.distance = v, e.coneCos = Math.cos(o.angle), e.penumbraCos = Math.cos(o.angle * (1 - o.penumbra)), e.decay = o.decay, i.spot[h] = e;
          const r = o.shadow;
          if (o.map && (i.spotLightMap[A] = o.map, A++, r.updateMatrices(o), o.castShadow && g++), i.spotLightMatrix[h] = r.matrix, o.castShadow) {
            const e = n.get(o);
            e.shadowIntensity = r.intensity, e.shadowBias = r.bias, e.shadowNormalBias = r.normalBias, e.shadowRadius = r.radius, e.shadowMapSize = r.mapSize, i.spotShadow[h] = e, i.spotShadowMap[h] = T, _++;
          }
          h++;
        } else if (o.isRectAreaLight) {
          const e = t.get(o);
          e.color.copy(y).multiplyScalar(L), e.halfWidth.set(.5 * o.width, 0, 0), e.halfHeight.set(0, .5 * o.height, 0), i.rectArea[p] = e, p++;
        } else if (o.isPointLight) {
          const e = t.get(o);
          if (e.color.copy(o.color).multiplyScalar(o.intensity), e.distance = o.distance, e.decay = o.decay, o.castShadow) {
            const e = o.shadow,
              t = n.get(o);
            t.shadowIntensity = e.intensity, t.shadowBias = e.bias, t.shadowNormalBias = e.normalBias, t.shadowRadius = e.radius, t.shadowMapSize = e.mapSize, t.shadowCameraNear = e.camera.near, t.shadowCameraFar = e.camera.far, i.pointShadow[d] = t, i.pointShadowMap[d] = T, i.pointShadowMatrix[d] = o.shadow.matrix, M++;
          }
          i.point[d] = e, d++;
        } else if (o.isHemisphereLight) {
          const e = t.get(o);
          e.skyColor.copy(o.color).multiplyScalar(L), e.groundColor.copy(o.groundColor).multiplyScalar(L), i.hemi[f] = e, f++;
        }
      }
      p > 0 && (!0 === e.has("OES_texture_float_linear") ? (i.rectAreaLTC1 = UniformsLib.LTC_FLOAT_1, i.rectAreaLTC2 = UniformsLib.LTC_FLOAT_2) : (i.rectAreaLTC1 = UniformsLib.LTC_HALF_1, i.rectAreaLTC2 = UniformsLib.LTC_HALF_2)), i.ambient[0] = s, i.ambient[1] = c, i.ambient[2] = l;
      const y = i.hash;
      y.directionalLength === u && y.pointLength === d && y.spotLength === h && y.rectAreaLength === p && y.hemiLength === f && y.numDirectionalShadows === m && y.numPointShadows === M && y.numSpotShadows === _ && y.numSpotMaps === A && y.numLightProbes === b || (i.directional.length = u, i.spot.length = h, i.rectArea.length = p, i.point.length = d, i.hemi.length = f, i.directionalShadow.length = m, i.directionalShadowMap.length = m, i.pointShadow.length = M, i.pointShadowMap.length = M, i.spotShadow.length = _, i.spotShadowMap.length = _, i.directionalShadowMatrix.length = m, i.pointShadowMatrix.length = M, i.spotLightMatrix.length = _ + A - g, i.spotLightMap.length = A, i.numSpotLightShadowsWithMaps = g, i.numLightProbes = b, y.directionalLength = u, y.pointLength = d, y.spotLength = h, y.rectAreaLength = p, y.hemiLength = f, y.numDirectionalShadows = m, y.numPointShadows = M, y.numSpotShadows = _, y.numSpotMaps = A, y.numLightProbes = b, i.version = yt++);
    },
    setupView: function (e, t) {
      let n = 0,
        r = 0,
        o = 0,
        l = 0,
        u = 0;
      const d = t.matrixWorldInverse;
      for (let t = 0, h = e.length; t < h; t++) {
        const h = e[t];
        if (h.isDirectionalLight) {
          const e = i.directional[n];
          e.direction.setFromMatrixPosition(h.matrixWorld), a.setFromMatrixPosition(h.target.matrixWorld), e.direction.sub(a), e.direction.transformDirection(d), n++;
        } else if (h.isSpotLight) {
          const e = i.spot[o];
          e.position.setFromMatrixPosition(h.matrixWorld), e.position.applyMatrix4(d), e.direction.setFromMatrixPosition(h.matrixWorld), a.setFromMatrixPosition(h.target.matrixWorld), e.direction.sub(a), e.direction.transformDirection(d), o++;
        } else if (h.isRectAreaLight) {
          const e = i.rectArea[l];
          e.position.setFromMatrixPosition(h.matrixWorld), e.position.applyMatrix4(d), c.identity(), s.copy(h.matrixWorld), s.premultiply(d), c.extractRotation(s), e.halfWidth.set(.5 * h.width, 0, 0), e.halfHeight.set(0, .5 * h.height, 0), e.halfWidth.applyMatrix4(c), e.halfHeight.applyMatrix4(c), l++;
        } else if (h.isPointLight) {
          const e = i.point[r];
          e.position.setFromMatrixPosition(h.matrixWorld), e.position.applyMatrix4(d), r++;
        } else if (h.isHemisphereLight) {
          const e = i.hemi[u];
          e.direction.setFromMatrixPosition(h.matrixWorld), e.direction.transformDirection(d), u++;
        }
      }
    },
    state: i
  };
}
function Tt(e) {
  const t = new vt(e),
    n = [],
    r = [],
    i = [];
  const a = {
    lightsArray: n,
    shadowsArray: r,
    lightProbeGridArray: i,
    camera: null,
    lights: t,
    transmissionRenderTarget: {},
    textureUnits: 0
  };
  return {
    init: function (e) {
      a.camera = e, n.length = 0, r.length = 0, i.length = 0;
    },
    state: a,
    setupLights: function () {
      t.setup(n);
    },
    setupLightsView: function (e) {
      t.setupView(n, e);
    },
    pushLight: function (e) {
      n.push(e);
    },
    pushShadow: function (e) {
      r.push(e);
    },
    pushLightProbeGrid: function (e) {
      i.push(e);
    }
  };
}
function St(e) {
  let weakMap = new WeakMap();
  return {
    get: function (n, r = 0) {
      const i = weakMap.get(n);
      let a;
      return void 0 === i ? (a = new Tt(e), weakMap.set(n, [a])) : r >= i.length ? (a = new Tt(e), i.push(a)) : a = i[r], a;
    },
    dispose: function () {
      weakMap = new WeakMap();
    }
  };
}
const wt = [new ThreeCore.Vector3(1, 0, 0), new ThreeCore.Vector3(-1, 0, 0), new ThreeCore.Vector3(0, 1, 0), new ThreeCore.Vector3(0, -1, 0), new ThreeCore.Vector3(0, 0, 1), new ThreeCore.Vector3(0, 0, -1)],
  Et = [new ThreeCore.Vector3(0, -1, 0), new ThreeCore.Vector3(0, -1, 0), new ThreeCore.Vector3(0, 0, 1), new ThreeCore.Vector3(0, 0, -1), new ThreeCore.Vector3(0, -1, 0), new ThreeCore.Vector3(0, -1, 0)],
  xt = new ThreeCore.Matrix4(),
  Ct = new ThreeCore.Vector3(),
  zt = new ThreeCore.Vector3();
function Ot(e, t, n) {
  let frustum = new ThreeCore.Frustum();
  const vector2 = new ThreeCore.Vector2(),
    s = new ThreeCore.Vector2(),
    vector4 = new ThreeCore.Vector4(),
    meshDepthMaterial = new ThreeCore.MeshDepthMaterial(),
    meshDistanceMaterial = new ThreeCore.MeshDistanceMaterial(),
    u = {},
    d = n.maxTextureSize,
    h = {
      [ThreeCore.FrontSide]: ThreeCore.BackSide,
      [ThreeCore.BackSide]: ThreeCore.FrontSide,
      [ThreeCore.DoubleSide]: ThreeCore.DoubleSide
    },
    shaderMaterial = new ThreeCore.ShaderMaterial({
      defines: {
        VSM_SAMPLES: 8
      },
      uniforms: {
        shadow_pass: {
          value: null
        },
        resolution: {
          value: new ThreeCore.Vector2()
        },
        radius: {
          value: 4
        }
      },
      vertexShader: "void main() {\n\tgl_Position = vec4( position, 1.0 );\n}",
      fragmentShader: "uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\nvoid main() {\n\tconst float samples = float( VSM_SAMPLES );\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\tfloat uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n\tfloat uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n\tfor ( float i = 0.0; i < samples; i ++ ) {\n\t\tfloat uvOffset = uvStart + i * uvStride;\n\t\t#ifdef HORIZONTAL_PASS\n\t\t\tvec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\t\t#else\n\t\t\tfloat depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\t\t#endif\n\t}\n\tmean = mean / samples;\n\tsquared_mean = squared_mean / samples;\n\tfloat std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );\n\tgl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );\n}"
    }),
    f = shaderMaterial.clone();
  f.defines.HORIZONTAL_PASS = 1;
  const bufferGeometry = new ThreeCore.BufferGeometry();
  bufferGeometry.setAttribute("position", new ThreeCore.BufferAttribute(new Float32Array([-1, -1, .5, 3, -1, .5, -1, 3, .5]), 3));
  const mesh = new ThreeCore.Mesh(bufferGeometry, shaderMaterial),
    _ = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = ThreeCore.PCFShadowMap;
  let type = this.type;
  function g(n, i) {
    const s = t.update(mesh);
    shaderMaterial.defines.VSM_SAMPLES !== n.blurSamples && (shaderMaterial.defines.VSM_SAMPLES = n.blurSamples, f.defines.VSM_SAMPLES = n.blurSamples, shaderMaterial.needsUpdate = !0, f.needsUpdate = !0), null === n.mapPass && (n.mapPass = new ThreeCore.WebGLRenderTarget(vector2.x, vector2.y, {
      format: ThreeCore.RGFormat,
      type: ThreeCore.HalfFloatType
    })), shaderMaterial.uniforms.shadow_pass.value = n.map.depthTexture, shaderMaterial.uniforms.resolution.value = n.mapSize, shaderMaterial.uniforms.radius.value = n.radius, e.setRenderTarget(n.mapPass), e.clear(), e.renderBufferDirect(i, null, s, shaderMaterial, mesh, null), f.uniforms.shadow_pass.value = n.mapPass.texture, f.uniforms.resolution.value = n.mapSize, f.uniforms.radius.value = n.radius, e.setRenderTarget(n.map), e.clear(), e.renderBufferDirect(i, null, s, f, mesh, null);
  }
  function b(t, n, i, a) {
    let s = null;
    const o = !0 === i.isPointLight ? t.customDistanceMaterial : t.customDepthMaterial;
    if (void 0 !== o) s = o;else if (s = !0 === i.isPointLight ? meshDistanceMaterial : meshDepthMaterial, e.localClippingEnabled && !0 === n.clipShadows && Array.isArray(n.clippingPlanes) && 0 !== n.clippingPlanes.length || n.displacementMap && 0 !== n.displacementScale || n.alphaMap && n.alphaTest > 0 || n.map && n.alphaTest > 0 || !0 === n.alphaToCoverage) {
      const e = s.uuid,
        t = n.uuid;
      let r = u[e];
      void 0 === r && (r = {}, u[e] = r);
      let i = r[t];
      void 0 === i && (i = s.clone(), r[t] = i, n.addEventListener("dispose", L)), s = i;
    }
    if (s.visible = n.visible, s.wireframe = n.wireframe, a === ThreeCore.VSMShadowMap ? s.side = null !== n.shadowSide ? n.shadowSide : n.side : s.side = null !== n.shadowSide ? n.shadowSide : h[n.side], s.alphaMap = n.alphaMap, s.alphaTest = !0 === n.alphaToCoverage ? .5 : n.alphaTest, s.map = n.map, s.clipShadows = n.clipShadows, s.clippingPlanes = n.clippingPlanes, s.clipIntersection = n.clipIntersection, s.displacementMap = n.displacementMap, s.displacementScale = n.displacementScale, s.displacementBias = n.displacementBias, s.wireframeLinewidth = n.wireframeLinewidth, s.linewidth = n.linewidth, !0 === i.isPointLight && !0 === s.isMeshDistanceMaterial) {
      e.properties.get(s).light = i;
    }
    return s;
  }
  function y(n, a, s, o, c) {
    if (!1 === n.visible) return;
    if (n.layers.test(a.layers) && (n.isMesh || n.isLine || n.isPoints) && (n.castShadow || n.receiveShadow && c === ThreeCore.VSMShadowMap) && (!n.frustumCulled || frustum.intersectsObject(n))) {
      n.modelViewMatrix.multiplyMatrices(s.matrixWorldInverse, n.matrixWorld);
      const r = t.update(n),
        i = n.material;
      if (Array.isArray(i)) {
        const t = r.groups;
        for (let l = 0, u = t.length; l < u; l++) {
          const u = t[l],
            d = i[u.materialIndex];
          if (d && d.visible) {
            const t = b(n, d, o, c);
            n.onBeforeShadow(e, n, a, s, r, t, u), e.renderBufferDirect(s, null, r, t, n, u), n.onAfterShadow(e, n, a, s, r, t, u);
          }
        }
      } else if (i.visible) {
        const t = b(n, i, o, c);
        n.onBeforeShadow(e, n, a, s, r, t, null), e.renderBufferDirect(s, null, r, t, n, null), n.onAfterShadow(e, n, a, s, r, t, null);
      }
    }
    const l = n.children;
    for (let e = 0, t = l.length; e < t; e++) y(l[e], a, s, o, c);
  }
  function L(e) {
    e.target.removeEventListener("dispose", L);
    for (const t in u) {
      const n = u[t],
        r = e.target.uuid;
      if (r in n) {
        n[r].dispose(), delete n[r];
      }
    }
  }
  this.render = function (t, n, c) {
    if (!1 === _.enabled) return;
    if (!1 === _.autoUpdate && !1 === _.needsUpdate) return;
    if (0 === t.length) return;
    this.type === ThreeCore.PCFSoftShadowMap && ((0, ThreeCore.warn)("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."), this.type = ThreeCore.PCFShadowMap);
    const l = e.getRenderTarget(),
      u = e.getActiveCubeFace(),
      h = e.getActiveMipmapLevel(),
      p = e.state;
    p.setBlending(ThreeCore.NoBlending), !0 === p.buffers.depth.getReversed() ? p.buffers.color.setClear(0, 0, 0, 0) : p.buffers.color.setClear(1, 1, 1, 1), p.buffers.depth.setTest(!0), p.setScissorTest(!1);
    const f = type !== this.type;
    f && n.traverse(function (e) {
      e.material && (Array.isArray(e.material) ? e.material.forEach(e => e.needsUpdate = !0) : e.material.needsUpdate = !0);
    });
    for (let l = 0, u = t.length; l < u; l++) {
      const u = t[l],
        h = u.shadow;
      if (void 0 === h) {
        (0, ThreeCore.warn)("WebGLShadowMap:", u, "has no shadow.");
        continue;
      }
      if (!1 === h.autoUpdate && !1 === h.needsUpdate) continue;
      vector2.copy(h.mapSize);
      const m = h.getFrameExtents();
      vector2.multiply(m), s.copy(h.mapSize), (vector2.x > d || vector2.y > d) && (vector2.x > d && (s.x = Math.floor(d / m.x), vector2.x = s.x * m.x, h.mapSize.x = s.x), vector2.y > d && (s.y = Math.floor(d / m.y), vector2.y = s.y * m.y, h.mapSize.y = s.y));
      const M = e.state.buffers.depth.getReversed();
      if (h.camera._reversedDepth = M, null === h.map || !0 === f) {
        if (null !== h.map && (null !== h.map.depthTexture && (h.map.depthTexture.dispose(), h.map.depthTexture = null), h.map.dispose()), this.type === ThreeCore.VSMShadowMap) {
          if (u.isPointLight) {
            (0, ThreeCore.warn)("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
            continue;
          }
          h.map = new ThreeCore.WebGLRenderTarget(vector2.x, vector2.y, {
            format: ThreeCore.RGFormat,
            type: ThreeCore.HalfFloatType,
            minFilter: ThreeCore.LinearFilter,
            magFilter: ThreeCore.LinearFilter,
            generateMipmaps: !1
          }), h.map.texture.name = u.name + ".shadowMap", h.map.depthTexture = new ThreeCore.DepthTexture(vector2.x, vector2.y, ThreeCore.FloatType), h.map.depthTexture.name = u.name + ".shadowMapDepth", h.map.depthTexture.format = ThreeCore.DepthFormat, h.map.depthTexture.compareFunction = null, h.map.depthTexture.minFilter = ThreeCore.NearestFilter, h.map.depthTexture.magFilter = ThreeCore.NearestFilter;
        } else u.isPointLight ? (h.map = new WebGLCubeRenderTarget(vector2.x), h.map.depthTexture = new ThreeCore.CubeDepthTexture(vector2.x, ThreeCore.UnsignedIntType)) : (h.map = new ThreeCore.WebGLRenderTarget(vector2.x, vector2.y), h.map.depthTexture = new ThreeCore.DepthTexture(vector2.x, vector2.y, ThreeCore.UnsignedIntType)), h.map.depthTexture.name = u.name + ".shadowMap", h.map.depthTexture.format = ThreeCore.DepthFormat, this.type === ThreeCore.PCFShadowMap ? (h.map.depthTexture.compareFunction = M ? ThreeCore.GreaterEqualCompare : ThreeCore.LessEqualCompare, h.map.depthTexture.minFilter = ThreeCore.LinearFilter, h.map.depthTexture.magFilter = ThreeCore.LinearFilter) : (h.map.depthTexture.compareFunction = null, h.map.depthTexture.minFilter = ThreeCore.NearestFilter, h.map.depthTexture.magFilter = ThreeCore.NearestFilter);
        h.camera.updateProjectionMatrix();
      }
      const _ = h.map.isWebGLCubeRenderTarget ? 6 : 1;
      for (let t = 0; t < _; t++) {
        if (h.map.isWebGLCubeRenderTarget) e.setRenderTarget(h.map, t), e.clear();else {
          0 === t && (e.setRenderTarget(h.map), e.clear());
          const n = h.getViewport(t);
          vector4.set(s.x * n.x, s.y * n.y, s.x * n.z, s.y * n.w), p.viewport(vector4);
        }
        if (u.isPointLight) {
          const e = h.camera,
            n = h.matrix,
            r = u.distance || e.far;
          r !== e.far && (e.far = r, e.updateProjectionMatrix()), Ct.setFromMatrixPosition(u.matrixWorld), e.position.copy(Ct), zt.copy(e.position), zt.add(wt[t]), e.up.copy(Et[t]), e.lookAt(zt), e.updateMatrixWorld(), n.makeTranslation(-Ct.x, -Ct.y, -Ct.z), xt.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), h._frustum.setFromProjectionMatrix(xt, e.coordinateSystem, e.reversedDepth);
        } else h.updateMatrices(u);
        frustum = h.getFrustum(), y(n, c, h.camera, u, this.type);
      }
      !0 !== h.isPointLightShadow && this.type === ThreeCore.VSMShadowMap && g(h, c), h.needsUpdate = !1;
    }
    type = this.type, _.needsUpdate = !1, e.setRenderTarget(l, u, h);
  };
}
function Bt(e, t) {
  const n = new function () {
      let t = !1;
      const vector4 = new ThreeCore.Vector4();
      let i = null;
      const a = new ThreeCore.Vector4(0, 0, 0, 0);
      return {
        setMask: function (n) {
          i === n || t || (e.colorMask(n, n, n, n), i = n);
        },
        setLocked: function (e) {
          t = e;
        },
        setClear: function (t, r, i, s, o) {
          !0 === o && (t *= s, r *= s, i *= s), vector4.set(t, r, i, s), !1 === a.equals(vector4) && (e.clearColor(t, r, i, s), a.copy(vector4));
        },
        reset: function () {
          t = !1, i = null, a.set(-1, 0, 0, 0);
        }
      };
    }(),
    i = new function () {
      let n = !1,
        i = !1,
        a = null,
        s = null,
        o = null;
      return {
        setReversed: function (e) {
          if (i !== e) {
            const n = t.get("EXT_clip_control");
            e ? n.clipControlEXT(n.LOWER_LEFT_EXT, n.ZERO_TO_ONE_EXT) : n.clipControlEXT(n.LOWER_LEFT_EXT, n.NEGATIVE_ONE_TO_ONE_EXT), i = e;
            const r = o;
            o = null, this.setClear(r);
          }
        },
        getReversed: function () {
          return i;
        },
        setTest: function (t) {
          t ? q(e.DEPTH_TEST) : H(e.DEPTH_TEST);
        },
        setMask: function (t) {
          a === t || n || (e.depthMask(t), a = t);
        },
        setFunc: function (t) {
          if (i && (t = ThreeCore.ReversedDepthFuncs[t]), s !== t) {
            switch (t) {
              case ThreeCore.NeverDepth:
                e.depthFunc(e.NEVER);
                break;
              case ThreeCore.AlwaysDepth:
                e.depthFunc(e.ALWAYS);
                break;
              case ThreeCore.LessDepth:
                e.depthFunc(e.LESS);
                break;
              case ThreeCore.LessEqualDepth:
                e.depthFunc(e.LEQUAL);
                break;
              case ThreeCore.EqualDepth:
                e.depthFunc(e.EQUAL);
                break;
              case ThreeCore.GreaterEqualDepth:
                e.depthFunc(e.GEQUAL);
                break;
              case ThreeCore.GreaterDepth:
                e.depthFunc(e.GREATER);
                break;
              case ThreeCore.NotEqualDepth:
                e.depthFunc(e.NOTEQUAL);
                break;
              default:
                e.depthFunc(e.LEQUAL);
            }
            s = t;
          }
        },
        setLocked: function (e) {
          n = e;
        },
        setClear: function (t) {
          o !== t && (o = t, i && (t = 1 - t), e.clearDepth(t));
        },
        reset: function () {
          n = !1, a = null, s = null, o = null, i = !1;
        }
      };
    }(),
    a = new function () {
      let t = !1,
        n = null,
        r = null,
        i = null,
        a = null,
        s = null,
        o = null,
        c = null,
        l = null;
      return {
        setTest: function (n) {
          t || (n ? q(e.STENCIL_TEST) : H(e.STENCIL_TEST));
        },
        setMask: function (r) {
          n === r || t || (e.stencilMask(r), n = r);
        },
        setFunc: function (t, n, s) {
          r === t && i === n && a === s || (e.stencilFunc(t, n, s), r = t, i = n, a = s);
        },
        setOp: function (t, n, r) {
          s === t && o === n && c === r || (e.stencilOp(t, n, r), s = t, o = n, c = r);
        },
        setLocked: function (e) {
          t = e;
        },
        setClear: function (t) {
          l !== t && (e.clearStencil(t), l = t);
        },
        reset: function () {
          t = !1, n = null, r = null, i = null, a = null, s = null, o = null, c = null, l = null;
        }
      };
    }(),
    weakMap = new WeakMap(),
    o = new WeakMap();
  let c = {},
    l = {},
    u = {},
    d = new WeakMap(),
    h = [],
    p = null,
    f = !1,
    m = null,
    M = null,
    _ = null,
    A = null,
    g = null,
    b = null,
    y = null,
    L = new ThreeCore.Color(0, 0, 0),
    v = 0,
    T = !1,
    S = null,
    w = null,
    E = null,
    x = null,
    C = null;
  const z = e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let O = !1,
    B = 0;
  const D = e.getParameter(e.VERSION);
  -1 !== D.indexOf("WebGL") ? (B = parseFloat(/^WebGL (\d)/.exec(D)[1]), O = B >= 1) : -1 !== D.indexOf("OpenGL ES") && (B = parseFloat(/^OpenGL ES (\d)/.exec(D)[1]), O = B >= 2);
  let N = null,
    I = {};
  const R = e.getParameter(e.SCISSOR_BOX),
    k = e.getParameter(e.VIEWPORT),
    P = new ThreeCore.Vector4().fromArray(R),
    Y = new ThreeCore.Vector4().fromArray(k);
  function W(t, n, r, i) {
    const uint8Array = new Uint8Array(4),
      s = e.createTexture();
    e.bindTexture(t, s), e.texParameteri(t, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(t, e.TEXTURE_MAG_FILTER, e.NEAREST);
    for (let s = 0; s < r; s++) t === e.TEXTURE_3D || t === e.TEXTURE_2D_ARRAY ? e.texImage3D(n, 0, e.RGBA, 1, 1, i, 0, e.RGBA, e.UNSIGNED_BYTE, uint8Array) : e.texImage2D(n + s, 0, e.RGBA, 1, 1, 0, e.RGBA, e.UNSIGNED_BYTE, uint8Array);
    return s;
  }
  const F = {};
  function q(t) {
    !0 !== c[t] && (e.enable(t), c[t] = !0);
  }
  function H(t) {
    !1 !== c[t] && (e.disable(t), c[t] = !1);
  }
  F[e.TEXTURE_2D] = W(e.TEXTURE_2D, e.TEXTURE_2D, 1), F[e.TEXTURE_CUBE_MAP] = W(e.TEXTURE_CUBE_MAP, e.TEXTURE_CUBE_MAP_POSITIVE_X, 6), F[e.TEXTURE_2D_ARRAY] = W(e.TEXTURE_2D_ARRAY, e.TEXTURE_2D_ARRAY, 1, 1), F[e.TEXTURE_3D] = W(e.TEXTURE_3D, e.TEXTURE_3D, 1, 1), n.setClear(0, 0, 0, 1), i.setClear(1), a.setClear(0), q(e.DEPTH_TEST), i.setFunc(ThreeCore.LessEqualDepth), j(!1), V(ThreeCore.CullFaceBack), q(e.CULL_FACE), X(ThreeCore.NoBlending);
  const U = {
    [ThreeCore.AddEquation]: e.FUNC_ADD,
    [ThreeCore.SubtractEquation]: e.FUNC_SUBTRACT,
    [ThreeCore.ReverseSubtractEquation]: e.FUNC_REVERSE_SUBTRACT
  };
  U[ThreeCore.MinEquation] = e.MIN, U[ThreeCore.MaxEquation] = e.MAX;
  const G = {
    [ThreeCore.ZeroFactor]: e.ZERO,
    [ThreeCore.OneFactor]: e.ONE,
    [ThreeCore.SrcColorFactor]: e.SRC_COLOR,
    [ThreeCore.SrcAlphaFactor]: e.SRC_ALPHA,
    [ThreeCore.SrcAlphaSaturateFactor]: e.SRC_ALPHA_SATURATE,
    [ThreeCore.DstColorFactor]: e.DST_COLOR,
    [ThreeCore.DstAlphaFactor]: e.DST_ALPHA,
    [ThreeCore.OneMinusSrcColorFactor]: e.ONE_MINUS_SRC_COLOR,
    [ThreeCore.OneMinusSrcAlphaFactor]: e.ONE_MINUS_SRC_ALPHA,
    [ThreeCore.OneMinusDstColorFactor]: e.ONE_MINUS_DST_COLOR,
    [ThreeCore.OneMinusDstAlphaFactor]: e.ONE_MINUS_DST_ALPHA,
    [ThreeCore.ConstantColorFactor]: e.CONSTANT_COLOR,
    [ThreeCore.OneMinusConstantColorFactor]: e.ONE_MINUS_CONSTANT_COLOR,
    [ThreeCore.ConstantAlphaFactor]: e.CONSTANT_ALPHA,
    [ThreeCore.OneMinusConstantAlphaFactor]: e.ONE_MINUS_CONSTANT_ALPHA
  };
  function X(t, n, i, a, s, o, c, l, u, d) {
    if (t !== ThreeCore.NoBlending) {
      if (!1 === f && (q(e.BLEND), f = !0), t === ThreeCore.CustomBlending) s = s || n, o = o || i, c = c || a, n === M && s === g || (e.blendEquationSeparate(U[n], U[s]), M = n, g = s), i === _ && a === A && o === b && c === y || (e.blendFuncSeparate(G[i], G[a], G[o], G[c]), _ = i, A = a, b = o, y = c), !1 !== l.equals(L) && u === v || (e.blendColor(l.r, l.g, l.b, u), L.copy(l), v = u), m = t, T = !1;else if (t !== m || d !== T) {
        if (M === ThreeCore.AddEquation && g === ThreeCore.AddEquation || (e.blendEquation(e.FUNC_ADD), M = ThreeCore.AddEquation, g = ThreeCore.AddEquation), d) switch (t) {
          case ThreeCore.NormalBlending:
            e.blendFuncSeparate(e.ONE, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
            break;
          case ThreeCore.AdditiveBlending:
            e.blendFunc(e.ONE, e.ONE);
            break;
          case ThreeCore.SubtractiveBlending:
            e.blendFuncSeparate(e.ZERO, e.ONE_MINUS_SRC_COLOR, e.ZERO, e.ONE);
            break;
          case ThreeCore.MultiplyBlending:
            e.blendFuncSeparate(e.DST_COLOR, e.ONE_MINUS_SRC_ALPHA, e.ZERO, e.ONE);
            break;
          default:
            (0, ThreeCore.error)("WebGLState: Invalid blending: ", t);
        } else switch (t) {
          case ThreeCore.NormalBlending:
            e.blendFuncSeparate(e.SRC_ALPHA, e.ONE_MINUS_SRC_ALPHA, e.ONE, e.ONE_MINUS_SRC_ALPHA);
            break;
          case ThreeCore.AdditiveBlending:
            e.blendFuncSeparate(e.SRC_ALPHA, e.ONE, e.ONE, e.ONE);
            break;
          case ThreeCore.SubtractiveBlending:
            (0, ThreeCore.error)("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
            break;
          case ThreeCore.MultiplyBlending:
            (0, ThreeCore.error)("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
            break;
          default:
            (0, ThreeCore.error)("WebGLState: Invalid blending: ", t);
        }
        _ = null, A = null, b = null, y = null, L.set(0, 0, 0), v = 0, m = t, T = d;
      }
    } else !0 === f && (H(e.BLEND), f = !1);
  }
  function j(t) {
    S !== t && (t ? e.frontFace(e.CW) : e.frontFace(e.CCW), S = t);
  }
  function V(t) {
    t !== ThreeCore.CullFaceNone ? (q(e.CULL_FACE), t !== w && (t === ThreeCore.CullFaceBack ? e.cullFace(e.BACK) : t === ThreeCore.CullFaceFront ? e.cullFace(e.FRONT) : e.cullFace(e.FRONT_AND_BACK))) : H(e.CULL_FACE), w = t;
  }
  function K(t, n, r) {
    t ? (q(e.POLYGON_OFFSET_FILL), x === n && C === r || (x = n, C = r, i.getReversed() && (n = -n), e.polygonOffset(n, r))) : H(e.POLYGON_OFFSET_FILL);
  }
  return {
    buffers: {
      color: n,
      depth: i,
      stencil: a
    },
    enable: q,
    disable: H,
    bindFramebuffer: function (t, n) {
      return u[t] !== n && (e.bindFramebuffer(t, n), u[t] = n, t === e.DRAW_FRAMEBUFFER && (u[e.FRAMEBUFFER] = n), t === e.FRAMEBUFFER && (u[e.DRAW_FRAMEBUFFER] = n), !0);
    },
    drawBuffers: function (t, n) {
      let r = h,
        i = !1;
      if (t) {
        r = d.get(n), void 0 === r && (r = [], d.set(n, r));
        const a = t.textures;
        if (r.length !== a.length || r[0] !== e.COLOR_ATTACHMENT0) {
          for (let t = 0, n = a.length; t < n; t++) r[t] = e.COLOR_ATTACHMENT0 + t;
          r.length = a.length, i = !0;
        }
      } else r[0] !== e.BACK && (r[0] = e.BACK, i = !0);
      i && e.drawBuffers(r);
    },
    useProgram: function (t) {
      return p !== t && (e.useProgram(t), p = t, !0);
    },
    setBlending: X,
    setMaterial: function (t, s) {
      t.side === ThreeCore.DoubleSide ? H(e.CULL_FACE) : q(e.CULL_FACE);
      let o = t.side === ThreeCore.BackSide;
      s && (o = !o), j(o), t.blending === ThreeCore.NormalBlending && !1 === t.transparent ? X(ThreeCore.NoBlending) : X(t.blending, t.blendEquation, t.blendSrc, t.blendDst, t.blendEquationAlpha, t.blendSrcAlpha, t.blendDstAlpha, t.blendColor, t.blendAlpha, t.premultipliedAlpha), i.setFunc(t.depthFunc), i.setTest(t.depthTest), i.setMask(t.depthWrite), n.setMask(t.colorWrite);
      const c = t.stencilWrite;
      a.setTest(c), c && (a.setMask(t.stencilWriteMask), a.setFunc(t.stencilFunc, t.stencilRef, t.stencilFuncMask), a.setOp(t.stencilFail, t.stencilZFail, t.stencilZPass)), K(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits), !0 === t.alphaToCoverage ? q(e.SAMPLE_ALPHA_TO_COVERAGE) : H(e.SAMPLE_ALPHA_TO_COVERAGE);
    },
    setFlipSided: j,
    setCullFace: V,
    setLineWidth: function (t) {
      t !== E && (O && e.lineWidth(t), E = t);
    },
    setPolygonOffset: K,
    setScissorTest: function (t) {
      t ? q(e.SCISSOR_TEST) : H(e.SCISSOR_TEST);
    },
    activeTexture: function (t) {
      void 0 === t && (t = e.TEXTURE0 + z - 1), N !== t && (e.activeTexture(t), N = t);
    },
    bindTexture: function (t, n, r) {
      void 0 === r && (r = null === N ? e.TEXTURE0 + z - 1 : N);
      let i = I[r];
      void 0 === i && (i = {
        type: void 0,
        texture: void 0
      }, I[r] = i), i.type === t && i.texture === n || (N !== r && (e.activeTexture(r), N = r), e.bindTexture(t, n || F[t]), i.type = t, i.texture = n);
    },
    unbindTexture: function () {
      const t = I[N];
      void 0 !== t && void 0 !== t.type && (e.bindTexture(t.type, null), t.type = void 0, t.texture = void 0);
    },
    compressedTexImage2D: function () {
      try {
        e.compressedTexImage2D(...arguments);
      } catch (e) {
        (0, ThreeCore.error)("WebGLState:", e);
      }
    },
    compressedTexImage3D: function () {
      try {
        e.compressedTexImage3D(...arguments);
      } catch (e) {
        (0, ThreeCore.error)("WebGLState:", e);
      }
    },
    texImage2D: function () {
      try {
        e.texImage2D(...arguments);
      } catch (e) {
        (0, ThreeCore.error)("WebGLState:", e);
      }
    },
    texImage3D: function () {
      try {
        e.texImage3D(...arguments);
      } catch (e) {
        (0, ThreeCore.error)("WebGLState:", e);
      }
    },
    pixelStorei: function (t, n) {
      l[t] !== n && (e.pixelStorei(t, n), l[t] = n);
    },
    getParameter: function (t) {
      return void 0 !== l[t] ? l[t] : e.getParameter(t);
    },
    updateUBOMapping: function (t, n) {
      let r = o.get(n);
      void 0 === r && (r = new WeakMap(), o.set(n, r));
      let i = r.get(t);
      void 0 === i && (i = e.getUniformBlockIndex(n, t.name), r.set(t, i));
    },
    uniformBlockBinding: function (t, n) {
      const r = o.get(n).get(t);
      weakMap.get(n) !== r && (e.uniformBlockBinding(n, r, t.__bindingPointIndex), weakMap.set(n, r));
    },
    texStorage2D: function () {
      try {
        e.texStorage2D(...arguments);
      } catch (e) {
        (0, ThreeCore.error)("WebGLState:", e);
      }
    },
    texStorage3D: function () {
      try {
        e.texStorage3D(...arguments);
      } catch (e) {
        (0, ThreeCore.error)("WebGLState:", e);
      }
    },
    texSubImage2D: function () {
      try {
        e.texSubImage2D(...arguments);
      } catch (e) {
        (0, ThreeCore.error)("WebGLState:", e);
      }
    },
    texSubImage3D: function () {
      try {
        e.texSubImage3D(...arguments);
      } catch (e) {
        (0, ThreeCore.error)("WebGLState:", e);
      }
    },
    compressedTexSubImage2D: function () {
      try {
        e.compressedTexSubImage2D(...arguments);
      } catch (e) {
        (0, ThreeCore.error)("WebGLState:", e);
      }
    },
    compressedTexSubImage3D: function () {
      try {
        e.compressedTexSubImage3D(...arguments);
      } catch (e) {
        (0, ThreeCore.error)("WebGLState:", e);
      }
    },
    scissor: function (t) {
      !1 === P.equals(t) && (e.scissor(t.x, t.y, t.z, t.w), P.copy(t));
    },
    viewport: function (t) {
      !1 === Y.equals(t) && (e.viewport(t.x, t.y, t.z, t.w), Y.copy(t));
    },
    reset: function () {
      e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.POLYGON_OFFSET_FILL), e.disable(e.SCISSOR_TEST), e.disable(e.STENCIL_TEST), e.disable(e.SAMPLE_ALPHA_TO_COVERAGE), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.blendFuncSeparate(e.ONE, e.ZERO, e.ONE, e.ZERO), e.blendColor(0, 0, 0, 0), e.colorMask(!0, !0, !0, !0), e.clearColor(0, 0, 0, 0), e.depthMask(!0), e.depthFunc(e.LESS), i.setReversed(!1), e.clearDepth(1), e.stencilMask(4294967295), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.clearStencil(0), e.cullFace(e.BACK), e.frontFace(e.CCW), e.polygonOffset(0, 0), e.activeTexture(e.TEXTURE0), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), e.bindFramebuffer(e.READ_FRAMEBUFFER, null), e.useProgram(null), e.lineWidth(1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.viewport(0, 0, e.canvas.width, e.canvas.height), e.pixelStorei(e.PACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, e.BROWSER_DEFAULT_WEBGL), e.pixelStorei(e.PACK_ROW_LENGTH, 0), e.pixelStorei(e.PACK_SKIP_PIXELS, 0), e.pixelStorei(e.PACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_ROW_LENGTH, 0), e.pixelStorei(e.UNPACK_IMAGE_HEIGHT, 0), e.pixelStorei(e.UNPACK_SKIP_PIXELS, 0), e.pixelStorei(e.UNPACK_SKIP_ROWS, 0), e.pixelStorei(e.UNPACK_SKIP_IMAGES, 0), c = {}, l = {}, N = null, I = {}, u = {}, d = new WeakMap(), h = [], p = null, f = !1, m = null, M = null, _ = null, A = null, g = null, b = null, y = null, L = new ThreeCore.Color(0, 0, 0), v = 0, T = !1, S = null, w = null, E = null, x = null, C = null, P.set(0, 0, e.canvas.width, e.canvas.height), Y.set(0, 0, e.canvas.width, e.canvas.height), n.reset(), i.reset(), a.reset();
    }
  };
}
function Dt(e, t, n, i, a, s, o) {
  const c = t.has("WEBGL_multisampled_render_to_texture") ? t.get("WEBGL_multisampled_render_to_texture") : null,
    l = "undefined" != typeof navigator && /OculusBrowser/g.test(navigator.userAgent),
    vector2 = new ThreeCore.Vector2(),
    weakMap = new WeakMap(),
    set = new Set();
  let p;
  const f = new WeakMap();
  let m = !1;
  try {
    m = "undefined" != typeof OffscreenCanvas && null !== new OffscreenCanvas(1, 1).getContext("2d");
  } catch (e) {}
  function M(e, t) {
    return m ? new OffscreenCanvas(e, t) : (0, ThreeCore.createElementNS)("canvas");
  }
  function _(e, t, n) {
    let i = 1;
    const a = G(e);
    if ((a.width > n || a.height > n) && (i = n / Math.max(a.width, a.height)), i < 1) {
      if ("undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && e instanceof ImageBitmap || "undefined" != typeof VideoFrame && e instanceof VideoFrame) {
        const n = Math.floor(i * a.width),
          s = Math.floor(i * a.height);
        void 0 === p && (p = M(n, s));
        const o = t ? M(n, s) : p;
        o.width = n, o.height = s;
        return o.getContext("2d").drawImage(e, 0, 0, n, s), (0, ThreeCore.warn)("WebGLRenderer: Texture has been resized from (" + a.width + "x" + a.height + ") to (" + n + "x" + s + ")."), o;
      }
      return "data" in e && (0, ThreeCore.warn)("WebGLRenderer: Image in DataTexture is too big (" + a.width + "x" + a.height + ")."), e;
    }
    return e;
  }
  function A(e) {
    return e.generateMipmaps;
  }
  function g(t) {
    e.generateMipmap(t);
  }
  function b(t) {
    return t.isWebGLCubeRenderTarget ? e.TEXTURE_CUBE_MAP : t.isWebGL3DRenderTarget ? e.TEXTURE_3D : t.isWebGLArrayRenderTarget || t.isCompressedArrayTexture ? e.TEXTURE_2D_ARRAY : e.TEXTURE_2D;
  }
  function y(n, i, a, s, o, c = !1) {
    if (null !== n) {
      if (void 0 !== e[n]) return e[n];
      (0, ThreeCore.warn)("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + n + "'");
    }
    let l;
    s && (l = t.get("EXT_texture_norm16"), l || (0, ThreeCore.warn)("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));
    let u = i;
    if (i === e.RED && (a === e.FLOAT && (u = e.R32F), a === e.HALF_FLOAT && (u = e.R16F), a === e.UNSIGNED_BYTE && (u = e.R8), a === e.UNSIGNED_SHORT && l && (u = l.R16_EXT), a === e.SHORT && l && (u = l.R16_SNORM_EXT)), i === e.RED_INTEGER && (a === e.UNSIGNED_BYTE && (u = e.R8UI), a === e.UNSIGNED_SHORT && (u = e.R16UI), a === e.UNSIGNED_INT && (u = e.R32UI), a === e.BYTE && (u = e.R8I), a === e.SHORT && (u = e.R16I), a === e.INT && (u = e.R32I)), i === e.RG && (a === e.FLOAT && (u = e.RG32F), a === e.HALF_FLOAT && (u = e.RG16F), a === e.UNSIGNED_BYTE && (u = e.RG8), a === e.UNSIGNED_SHORT && l && (u = l.RG16_EXT), a === e.SHORT && l && (u = l.RG16_SNORM_EXT)), i === e.RG_INTEGER && (a === e.UNSIGNED_BYTE && (u = e.RG8UI), a === e.UNSIGNED_SHORT && (u = e.RG16UI), a === e.UNSIGNED_INT && (u = e.RG32UI), a === e.BYTE && (u = e.RG8I), a === e.SHORT && (u = e.RG16I), a === e.INT && (u = e.RG32I)), i === e.RGB_INTEGER && (a === e.UNSIGNED_BYTE && (u = e.RGB8UI), a === e.UNSIGNED_SHORT && (u = e.RGB16UI), a === e.UNSIGNED_INT && (u = e.RGB32UI), a === e.BYTE && (u = e.RGB8I), a === e.SHORT && (u = e.RGB16I), a === e.INT && (u = e.RGB32I)), i === e.RGBA_INTEGER && (a === e.UNSIGNED_BYTE && (u = e.RGBA8UI), a === e.UNSIGNED_SHORT && (u = e.RGBA16UI), a === e.UNSIGNED_INT && (u = e.RGBA32UI), a === e.BYTE && (u = e.RGBA8I), a === e.SHORT && (u = e.RGBA16I), a === e.INT && (u = e.RGBA32I)), i === e.RGB && (a === e.UNSIGNED_SHORT && l && (u = l.RGB16_EXT), a === e.SHORT && l && (u = l.RGB16_SNORM_EXT), a === e.UNSIGNED_INT_5_9_9_9_REV && (u = e.RGB9_E5), a === e.UNSIGNED_INT_10F_11F_11F_REV && (u = e.R11F_G11F_B10F)), i === e.RGBA) {
      const t = c ? ThreeCore.LinearTransfer : ThreeCore.ColorManagement.getTransfer(o);
      a === e.FLOAT && (u = e.RGBA32F), a === e.HALF_FLOAT && (u = e.RGBA16F), a === e.UNSIGNED_BYTE && (u = t === ThreeCore.SRGBTransfer ? e.SRGB8_ALPHA8 : e.RGBA8), a === e.UNSIGNED_SHORT && l && (u = l.RGBA16_EXT), a === e.SHORT && l && (u = l.RGBA16_SNORM_EXT), a === e.UNSIGNED_SHORT_4_4_4_4 && (u = e.RGBA4), a === e.UNSIGNED_SHORT_5_5_5_1 && (u = e.RGB5_A1);
    }
    return u !== e.R16F && u !== e.R32F && u !== e.RG16F && u !== e.RG32F && u !== e.RGBA16F && u !== e.RGBA32F || t.get("EXT_color_buffer_float"), u;
  }
  function L(t, n) {
    let i;
    return t ? null === n || n === ThreeCore.UnsignedIntType || n === ThreeCore.UnsignedInt248Type ? i = e.DEPTH24_STENCIL8 : n === ThreeCore.FloatType ? i = e.DEPTH32F_STENCIL8 : n === ThreeCore.UnsignedShortType && (i = e.DEPTH24_STENCIL8, (0, ThreeCore.warn)("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : null === n || n === ThreeCore.UnsignedIntType || n === ThreeCore.UnsignedInt248Type ? i = e.DEPTH_COMPONENT24 : n === ThreeCore.FloatType ? i = e.DEPTH_COMPONENT32F : n === ThreeCore.UnsignedShortType && (i = e.DEPTH_COMPONENT16), i;
  }
  function v(e, t) {
    return !0 === A(e) || e.isFramebufferTexture && e.minFilter !== ThreeCore.NearestFilter && e.minFilter !== ThreeCore.LinearFilter ? Math.log2(Math.max(t.width, t.height)) + 1 : void 0 !== e.mipmaps && e.mipmaps.length > 0 ? e.mipmaps.length : e.isCompressedTexture && Array.isArray(e.image) ? t.mipmaps.length : 1;
  }
  function T(e) {
    const t = e.target;
    t.removeEventListener("dispose", T), function (e) {
      const t = i.get(e);
      if (void 0 === t.__webglInit) return;
      const n = e.source,
        r = f.get(n);
      if (r) {
        const i = r[t.__cacheKey];
        i.usedTimes--, 0 === i.usedTimes && w(e), 0 === Object.keys(r).length && f.delete(n);
      }
      i.remove(e);
    }(t), t.isVideoTexture && weakMap.delete(t), t.isHTMLTexture && set.delete(t);
  }
  function S(t) {
    const n = t.target;
    n.removeEventListener("dispose", S), function (t) {
      const n = i.get(t);
      t.depthTexture && (t.depthTexture.dispose(), i.remove(t.depthTexture));
      if (t.isWebGLCubeRenderTarget) for (let t = 0; t < 6; t++) {
        if (Array.isArray(n.__webglFramebuffer[t])) for (let r = 0; r < n.__webglFramebuffer[t].length; r++) e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);
        n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer[t]);
      } else {
        if (Array.isArray(n.__webglFramebuffer)) for (let t = 0; t < n.__webglFramebuffer.length; t++) e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);
        if (n.__webglDepthbuffer && e.deleteRenderbuffer(n.__webglDepthbuffer), n.__webglMultisampledFramebuffer && e.deleteFramebuffer(n.__webglMultisampledFramebuffer), n.__webglColorRenderbuffer) for (let t = 0; t < n.__webglColorRenderbuffer.length; t++) n.__webglColorRenderbuffer[t] && e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);
        n.__webglDepthRenderbuffer && e.deleteRenderbuffer(n.__webglDepthRenderbuffer);
      }
      const r = t.textures;
      for (let t = 0, n = r.length; t < n; t++) {
        const n = i.get(r[t]);
        n.__webglTexture && (e.deleteTexture(n.__webglTexture), o.memory.textures--), i.remove(r[t]);
      }
      i.remove(t);
    }(n);
  }
  function w(t) {
    const n = i.get(t);
    e.deleteTexture(n.__webglTexture);
    const r = t.source;
    delete f.get(r)[n.__cacheKey], o.memory.textures--;
  }
  let E = 0;
  function setTexture2D(t, a) {
    const s = i.get(t);
    if (t.isVideoTexture && function (e) {
      const t = o.render.frame;
      weakMap.get(e) !== t && (weakMap.set(e, t), e.update());
    }(t), !1 === t.isRenderTargetTexture && !0 !== t.isExternalTexture && t.version > 0 && s.__version !== t.version) {
      const e = t.image;
      if (null === e) (0, ThreeCore.warn)("WebGLRenderer: Texture marked for update but no image data found.");else {
        if (!1 !== e.complete) return void I(s, t, a);
        (0, ThreeCore.warn)("WebGLRenderer: Texture marked for update but image is incomplete");
      }
    } else t.isExternalTexture && (s.__webglTexture = t.sourceTexture ? t.sourceTexture : null);
    n.bindTexture(e.TEXTURE_2D, s.__webglTexture, e.TEXTURE0 + a);
  }
  const C = {
      [ThreeCore.RepeatWrapping]: e.REPEAT,
      [ThreeCore.ClampToEdgeWrapping]: e.CLAMP_TO_EDGE,
      [ThreeCore.MirroredRepeatWrapping]: e.MIRRORED_REPEAT
    },
    z = {
      [ThreeCore.NearestFilter]: e.NEAREST,
      [ThreeCore.NearestMipmapNearestFilter]: e.NEAREST_MIPMAP_NEAREST,
      [ThreeCore.NearestMipmapLinearFilter]: e.NEAREST_MIPMAP_LINEAR,
      [ThreeCore.LinearFilter]: e.LINEAR,
      [ThreeCore.LinearMipmapNearestFilter]: e.LINEAR_MIPMAP_NEAREST,
      [ThreeCore.LinearMipmapLinearFilter]: e.LINEAR_MIPMAP_LINEAR
    },
    O = {
      [ThreeCore.NeverCompare]: e.NEVER,
      [ThreeCore.AlwaysCompare]: e.ALWAYS,
      [ThreeCore.LessCompare]: e.LESS,
      [ThreeCore.LessEqualCompare]: e.LEQUAL,
      [ThreeCore.EqualCompare]: e.EQUAL,
      [ThreeCore.GreaterEqualCompare]: e.GEQUAL,
      [ThreeCore.GreaterCompare]: e.GREATER,
      [ThreeCore.NotEqualCompare]: e.NOTEQUAL
    };
  function B(n, s) {
    if (s.type !== ThreeCore.FloatType || !1 !== t.has("OES_texture_float_linear") || s.magFilter !== ThreeCore.LinearFilter && s.magFilter !== ThreeCore.LinearMipmapNearestFilter && s.magFilter !== ThreeCore.NearestMipmapLinearFilter && s.magFilter !== ThreeCore.LinearMipmapLinearFilter && s.minFilter !== ThreeCore.LinearFilter && s.minFilter !== ThreeCore.LinearMipmapNearestFilter && s.minFilter !== ThreeCore.NearestMipmapLinearFilter && s.minFilter !== ThreeCore.LinearMipmapLinearFilter || (0, ThreeCore.warn)("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), e.texParameteri(n, e.TEXTURE_WRAP_S, C[s.wrapS]), e.texParameteri(n, e.TEXTURE_WRAP_T, C[s.wrapT]), n !== e.TEXTURE_3D && n !== e.TEXTURE_2D_ARRAY || e.texParameteri(n, e.TEXTURE_WRAP_R, C[s.wrapR]), e.texParameteri(n, e.TEXTURE_MAG_FILTER, z[s.magFilter]), e.texParameteri(n, e.TEXTURE_MIN_FILTER, z[s.minFilter]), s.compareFunction && (e.texParameteri(n, e.TEXTURE_COMPARE_MODE, e.COMPARE_REF_TO_TEXTURE), e.texParameteri(n, e.TEXTURE_COMPARE_FUNC, O[s.compareFunction])), !0 === t.has("EXT_texture_filter_anisotropic")) {
      if (s.magFilter === ThreeCore.NearestFilter) return;
      if (s.minFilter !== ThreeCore.NearestMipmapLinearFilter && s.minFilter !== ThreeCore.LinearMipmapLinearFilter) return;
      if (s.type === ThreeCore.FloatType && !1 === t.has("OES_texture_float_linear")) return;
      if (s.anisotropy > 1 || i.get(s).__currentAnisotropy) {
        const r = t.get("EXT_texture_filter_anisotropic");
        e.texParameterf(n, r.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(s.anisotropy, a.getMaxAnisotropy())), i.get(s).__currentAnisotropy = s.anisotropy;
      }
    }
  }
  function D(t, n) {
    let r = !1;
    void 0 === t.__webglInit && (t.__webglInit = !0, n.addEventListener("dispose", T));
    const i = n.source;
    let a = f.get(i);
    void 0 === a && (a = {}, f.set(i, a));
    const s = function (e) {
      const t = [];
      return t.push(e.wrapS), t.push(e.wrapT), t.push(e.wrapR || 0), t.push(e.magFilter), t.push(e.minFilter), t.push(e.anisotropy), t.push(e.internalFormat), t.push(e.format), t.push(e.type), t.push(e.generateMipmaps), t.push(e.premultiplyAlpha), t.push(e.flipY), t.push(e.unpackAlignment), t.push(e.colorSpace), t.join();
    }(n);
    if (s !== t.__cacheKey) {
      void 0 === a[s] && (a[s] = {
        texture: e.createTexture(),
        usedTimes: 0
      }, o.memory.textures++, r = !0), a[s].usedTimes++;
      const i = a[t.__cacheKey];
      void 0 !== i && (a[t.__cacheKey].usedTimes--, 0 === i.usedTimes && w(n)), t.__cacheKey = s, t.__webglTexture = a[s].texture;
    }
    return r;
  }
  function N(e, t, n) {
    return Math.floor(Math.floor(e / n) / t);
  }
  function I(t, o, c) {
    let l = e.TEXTURE_2D;
    (o.isDataArrayTexture || o.isCompressedArrayTexture) && (l = e.TEXTURE_2D_ARRAY), o.isData3DTexture && (l = e.TEXTURE_3D);
    const u = D(t, o),
      d = o.source;
    n.bindTexture(l, t.__webglTexture, e.TEXTURE0 + c);
    const p = i.get(d);
    if (d.version !== p.__version || !0 === u) {
      n.activeTexture(e.TEXTURE0 + c);
      if (!1 === ("undefined" != typeof ImageBitmap && o.image instanceof ImageBitmap)) {
        const t = ThreeCore.ColorManagement.getPrimaries(ThreeCore.ColorManagement.workingColorSpace),
          i = o.colorSpace === ThreeCore.NoColorSpace ? null : ThreeCore.ColorManagement.getPrimaries(o.colorSpace),
          a = o.colorSpace === ThreeCore.NoColorSpace || t === i ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
        n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, o.flipY), n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, o.premultiplyAlpha), n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, a);
      }
      n.pixelStorei(e.UNPACK_ALIGNMENT, o.unpackAlignment);
      let t = _(o.image, !1, a.maxTextureSize);
      t = U(o, t);
      const i = s.convert(o.format, o.colorSpace),
        f = s.convert(o.type);
      let m,
        M = y(o.internalFormat, i, f, o.normalized, o.colorSpace, o.isVideoTexture);
      B(l, o);
      const b = o.mipmaps,
        T = !0 !== o.isVideoTexture,
        S = void 0 === p.__version || !0 === u,
        w = d.dataReady,
        E = v(o, t);
      if (o.isDepthTexture) M = L(o.format === ThreeCore.DepthStencilFormat, o.type), S && (T ? n.texStorage2D(e.TEXTURE_2D, 1, M, t.width, t.height) : n.texImage2D(e.TEXTURE_2D, 0, M, t.width, t.height, 0, i, f, null));else if (o.isDataTexture) {
        if (b.length > 0) {
          T && S && n.texStorage2D(e.TEXTURE_2D, E, M, b[0].width, b[0].height);
          for (let t = 0, r = b.length; t < r; t++) m = b[t], T ? w && n.texSubImage2D(e.TEXTURE_2D, t, 0, 0, m.width, m.height, i, f, m.data) : n.texImage2D(e.TEXTURE_2D, t, M, m.width, m.height, 0, i, f, m.data);
          o.generateMipmaps = !1;
        } else T ? (S && n.texStorage2D(e.TEXTURE_2D, E, M, t.width, t.height), w && function (t, r, i, a) {
          const s = t.updateRanges;
          if (0 === s.length) n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, r.width, r.height, i, a, r.data);else {
            s.sort((e, t) => e.start - t.start);
            let o = 0;
            for (let e = 1; e < s.length; e++) {
              const t = s[o],
                n = s[e],
                i = t.start + t.count,
                a = N(n.start, r.width, 4),
                c = N(t.start, r.width, 4);
              n.start <= i + 1 && a === c && N(n.start + n.count - 1, r.width, 4) === a ? t.count = Math.max(t.count, n.start + n.count - t.start) : (++o, s[o] = n);
            }
            s.length = o + 1;
            const c = n.getParameter(e.UNPACK_ROW_LENGTH),
              l = n.getParameter(e.UNPACK_SKIP_PIXELS),
              u = n.getParameter(e.UNPACK_SKIP_ROWS);
            n.pixelStorei(e.UNPACK_ROW_LENGTH, r.width);
            for (let t = 0, o = s.length; t < o; t++) {
              const o = s[t],
                c = Math.floor(o.start / 4),
                l = Math.ceil(o.count / 4),
                u = c % r.width,
                d = Math.floor(c / r.width),
                h = l,
                p = 1;
              n.pixelStorei(e.UNPACK_SKIP_PIXELS, u), n.pixelStorei(e.UNPACK_SKIP_ROWS, d), n.texSubImage2D(e.TEXTURE_2D, 0, u, d, h, p, i, a, r.data);
            }
            t.clearUpdateRanges(), n.pixelStorei(e.UNPACK_ROW_LENGTH, c), n.pixelStorei(e.UNPACK_SKIP_PIXELS, l), n.pixelStorei(e.UNPACK_SKIP_ROWS, u);
          }
        }(o, t, i, f)) : n.texImage2D(e.TEXTURE_2D, 0, M, t.width, t.height, 0, i, f, t.data);
      } else if (o.isCompressedTexture) {
        if (o.isCompressedArrayTexture) {
          T && S && n.texStorage3D(e.TEXTURE_2D_ARRAY, E, M, b[0].width, b[0].height, t.depth);
          for (let a = 0, s = b.length; a < s; a++) if (m = b[a], o.format !== ThreeCore.RGBAFormat) {
            if (null !== i) {
              if (T) {
                if (w) if (o.layerUpdates.size > 0) {
                  const t = (0, ThreeCore.getByteLength)(m.width, m.height, o.format, o.type);
                  for (const r of o.layerUpdates) {
                    const s = m.data.subarray(r * t / m.data.BYTES_PER_ELEMENT, (r + 1) * t / m.data.BYTES_PER_ELEMENT);
                    n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, a, 0, 0, r, m.width, m.height, 1, i, s);
                  }
                  o.clearLayerUpdates();
                } else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY, a, 0, 0, 0, m.width, m.height, t.depth, i, m.data);
              } else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY, a, M, m.width, m.height, t.depth, 0, m.data, 0, 0);
            } else (0, ThreeCore.warn)("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
          } else T ? w && n.texSubImage3D(e.TEXTURE_2D_ARRAY, a, 0, 0, 0, m.width, m.height, t.depth, i, f, m.data) : n.texImage3D(e.TEXTURE_2D_ARRAY, a, M, m.width, m.height, t.depth, 0, i, f, m.data);
        } else {
          T && S && n.texStorage2D(e.TEXTURE_2D, E, M, b[0].width, b[0].height);
          for (let t = 0, a = b.length; t < a; t++) m = b[t], o.format !== ThreeCore.RGBAFormat ? null !== i ? T ? w && n.compressedTexSubImage2D(e.TEXTURE_2D, t, 0, 0, m.width, m.height, i, m.data) : n.compressedTexImage2D(e.TEXTURE_2D, t, M, m.width, m.height, 0, m.data) : (0, ThreeCore.warn)("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : T ? w && n.texSubImage2D(e.TEXTURE_2D, t, 0, 0, m.width, m.height, i, f, m.data) : n.texImage2D(e.TEXTURE_2D, t, M, m.width, m.height, 0, i, f, m.data);
        }
      } else if (o.isDataArrayTexture) {
        if (T) {
          if (S && n.texStorage3D(e.TEXTURE_2D_ARRAY, E, M, t.width, t.height, t.depth), w) if (o.layerUpdates.size > 0) {
            const a = (0, ThreeCore.getByteLength)(t.width, t.height, o.format, o.type);
            for (const r of o.layerUpdates) {
              const s = t.data.subarray(r * a / t.data.BYTES_PER_ELEMENT, (r + 1) * a / t.data.BYTES_PER_ELEMENT);
              n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, r, t.width, t.height, 1, i, f, s);
            }
            o.clearLayerUpdates();
          } else n.texSubImage3D(e.TEXTURE_2D_ARRAY, 0, 0, 0, 0, t.width, t.height, t.depth, i, f, t.data);
        } else n.texImage3D(e.TEXTURE_2D_ARRAY, 0, M, t.width, t.height, t.depth, 0, i, f, t.data);
      } else if (o.isData3DTexture) T ? (S && n.texStorage3D(e.TEXTURE_3D, E, M, t.width, t.height, t.depth), w && n.texSubImage3D(e.TEXTURE_3D, 0, 0, 0, 0, t.width, t.height, t.depth, i, f, t.data)) : n.texImage3D(e.TEXTURE_3D, 0, M, t.width, t.height, t.depth, 0, i, f, t.data);else if (o.isFramebufferTexture) {
        if (S) if (T) n.texStorage2D(e.TEXTURE_2D, E, M, t.width, t.height);else {
          let r = t.width,
            a = t.height;
          for (let t = 0; t < E; t++) n.texImage2D(e.TEXTURE_2D, t, M, r, a, 0, i, f, null), r >>= 1, a >>= 1;
        }
      } else if (o.isHTMLTexture) {
        if ("texElementImage2D" in e) {
          const n = e.canvas;
          if (n.hasAttribute("layoutsubtree") || n.setAttribute("layoutsubtree", "true"), t.parentNode !== n) return n.appendChild(t), set.add(o), n.onpaint = e => {
            const t = e.changedElements;
            for (const e of set) t.includes(e.image) && (e.needsUpdate = !0);
          }, void n.requestPaint();
          if (3 === e.texElementImage2D.length) e.texElementImage2D(e.TEXTURE_2D, e.RGBA8, t);else {
            const n = 0,
              r = e.RGBA,
              i = e.RGBA,
              a = e.UNSIGNED_BYTE;
            e.texElementImage2D(e.TEXTURE_2D, n, r, i, a, t);
          }
          e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
        }
      } else if (b.length > 0) {
        if (T && S) {
          const t = G(b[0]);
          n.texStorage2D(e.TEXTURE_2D, E, M, t.width, t.height);
        }
        for (let t = 0, r = b.length; t < r; t++) m = b[t], T ? w && n.texSubImage2D(e.TEXTURE_2D, t, 0, 0, i, f, m) : n.texImage2D(e.TEXTURE_2D, t, M, i, f, m);
        o.generateMipmaps = !1;
      } else if (T) {
        if (S) {
          const r = G(t);
          n.texStorage2D(e.TEXTURE_2D, E, M, r.width, r.height);
        }
        w && n.texSubImage2D(e.TEXTURE_2D, 0, 0, 0, i, f, t);
      } else n.texImage2D(e.TEXTURE_2D, 0, M, i, f, t);
      A(o) && g(l), p.__version = d.version, o.onUpdate && o.onUpdate(o);
    }
    t.__version = o.version;
  }
  function setupFrameBufferTexture(t, r, a, o, l, u) {
    const d = s.convert(a.format, a.colorSpace),
      h = s.convert(a.type),
      p = y(a.internalFormat, d, h, a.normalized, a.colorSpace),
      f = i.get(r),
      m = i.get(a);
    if (m.__renderTarget = r, !f.__hasExternalTextures) {
      const t = Math.max(1, r.width >> u),
        i = Math.max(1, r.height >> u);
      l === e.TEXTURE_3D || l === e.TEXTURE_2D_ARRAY ? n.texImage3D(l, u, p, t, i, r.depth, 0, d, h, null) : n.texImage2D(l, u, p, t, i, 0, d, h, null);
    }
    n.bindFramebuffer(e.FRAMEBUFFER, t), useMultisampledRTT(r) ? c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, o, l, m.__webglTexture, 0, q(r)) : (l === e.TEXTURE_2D || l >= e.TEXTURE_CUBE_MAP_POSITIVE_X && l <= e.TEXTURE_CUBE_MAP_NEGATIVE_Z) && e.framebufferTexture2D(e.FRAMEBUFFER, o, l, m.__webglTexture, u), n.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  function k(t, n, r) {
    if (e.bindRenderbuffer(e.RENDERBUFFER, t), n.depthBuffer) {
      const i = n.depthTexture,
        a = i && i.isDepthTexture ? i.type : null,
        s = L(n.stencilBuffer, a),
        o = n.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
      useMultisampledRTT(n) ? c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, q(n), s, n.width, n.height) : r ? e.renderbufferStorageMultisample(e.RENDERBUFFER, q(n), s, n.width, n.height) : e.renderbufferStorage(e.RENDERBUFFER, s, n.width, n.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, o, e.RENDERBUFFER, t);
    } else {
      const t = n.textures;
      for (let i = 0; i < t.length; i++) {
        const a = t[i],
          o = s.convert(a.format, a.colorSpace),
          l = s.convert(a.type),
          u = y(a.internalFormat, o, l, a.normalized, a.colorSpace);
        useMultisampledRTT(n) ? c.renderbufferStorageMultisampleEXT(e.RENDERBUFFER, q(n), u, n.width, n.height) : r ? e.renderbufferStorageMultisample(e.RENDERBUFFER, q(n), u, n.width, n.height) : e.renderbufferStorage(e.RENDERBUFFER, u, n.width, n.height);
      }
    }
    e.bindRenderbuffer(e.RENDERBUFFER, null);
  }
  function P(t, a, o) {
    const l = !0 === a.isWebGLCubeRenderTarget;
    if (n.bindFramebuffer(e.FRAMEBUFFER, t), !a.depthTexture || !a.depthTexture.isDepthTexture) throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");
    const u = i.get(a.depthTexture);
    if (u.__renderTarget = a, u.__webglTexture && a.depthTexture.image.width === a.width && a.depthTexture.image.height === a.height || (a.depthTexture.image.width = a.width, a.depthTexture.image.height = a.height, a.depthTexture.needsUpdate = !0), l) {
      if (void 0 === u.__webglInit && (u.__webglInit = !0, a.depthTexture.addEventListener("dispose", T)), void 0 === u.__webglTexture) {
        u.__webglTexture = e.createTexture(), n.bindTexture(e.TEXTURE_CUBE_MAP, u.__webglTexture), B(e.TEXTURE_CUBE_MAP, a.depthTexture);
        const t = s.convert(a.depthTexture.format),
          i = s.convert(a.depthTexture.type);
        let o;
        a.depthTexture.format === ThreeCore.DepthFormat ? o = e.DEPTH_COMPONENT24 : a.depthTexture.format === ThreeCore.DepthStencilFormat && (o = e.DEPTH24_STENCIL8);
        for (let n = 0; n < 6; n++) e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + n, 0, o, a.width, a.height, 0, t, i, null);
      }
    } else setTexture2D(a.depthTexture, 0);
    const d = u.__webglTexture,
      h = q(a),
      p = l ? e.TEXTURE_CUBE_MAP_POSITIVE_X + o : e.TEXTURE_2D,
      f = a.depthTexture.format === ThreeCore.DepthStencilFormat ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
    if (a.depthTexture.format === ThreeCore.DepthFormat) useMultisampledRTT(a) ? c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, f, p, d, 0, h) : e.framebufferTexture2D(e.FRAMEBUFFER, f, p, d, 0);else {
      if (a.depthTexture.format !== ThreeCore.DepthStencilFormat) throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");
      useMultisampledRTT(a) ? c.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER, f, p, d, 0, h) : e.framebufferTexture2D(e.FRAMEBUFFER, f, p, d, 0);
    }
  }
  function setupDepthRenderbuffer(t) {
    const r = i.get(t),
      a = !0 === t.isWebGLCubeRenderTarget;
    if (r.__boundDepthTexture !== t.depthTexture) {
      const e = t.depthTexture;
      if (r.__depthDisposeCallback && r.__depthDisposeCallback(), e) {
        const t = () => {
          delete r.__boundDepthTexture, delete r.__depthDisposeCallback, e.removeEventListener("dispose", t);
        };
        e.addEventListener("dispose", t), r.__depthDisposeCallback = t;
      }
      r.__boundDepthTexture = e;
    }
    if (t.depthTexture && !r.__autoAllocateDepthBuffer) {
      if (a) for (let e = 0; e < 6; e++) P(r.__webglFramebuffer[e], t, e);else {
        const e = t.texture.mipmaps;
        e && e.length > 0 ? P(r.__webglFramebuffer[0], t, 0) : P(r.__webglFramebuffer, t, 0);
      }
    } else if (a) {
      r.__webglDepthbuffer = [];
      for (let i = 0; i < 6; i++) if (n.bindFramebuffer(e.FRAMEBUFFER, r.__webglFramebuffer[i]), void 0 === r.__webglDepthbuffer[i]) r.__webglDepthbuffer[i] = e.createRenderbuffer(), k(r.__webglDepthbuffer[i], t, !1);else {
        const n = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT,
          a = r.__webglDepthbuffer[i];
        e.bindRenderbuffer(e.RENDERBUFFER, a), e.framebufferRenderbuffer(e.FRAMEBUFFER, n, e.RENDERBUFFER, a);
      }
    } else {
      const i = t.texture.mipmaps;
      if (i && i.length > 0 ? n.bindFramebuffer(e.FRAMEBUFFER, r.__webglFramebuffer[0]) : n.bindFramebuffer(e.FRAMEBUFFER, r.__webglFramebuffer), void 0 === r.__webglDepthbuffer) r.__webglDepthbuffer = e.createRenderbuffer(), k(r.__webglDepthbuffer, t, !1);else {
        const n = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT,
          i = r.__webglDepthbuffer;
        e.bindRenderbuffer(e.RENDERBUFFER, i), e.framebufferRenderbuffer(e.FRAMEBUFFER, n, e.RENDERBUFFER, i);
      }
    }
    n.bindFramebuffer(e.FRAMEBUFFER, null);
  }
  const W = [],
    F = [];
  function q(e) {
    return Math.min(a.maxSamples, e.samples);
  }
  function useMultisampledRTT(e) {
    const n = i.get(e);
    return e.samples > 0 && !0 === t.has("WEBGL_multisampled_render_to_texture") && !1 !== n.__useRenderToTexture;
  }
  function U(e, t) {
    const n = e.colorSpace,
      i = e.format,
      a = e.type;
    return !0 === e.isCompressedTexture || !0 === e.isVideoTexture || n !== ThreeCore.LinearSRGBColorSpace && n !== ThreeCore.NoColorSpace && (ThreeCore.ColorManagement.getTransfer(n) === ThreeCore.SRGBTransfer ? i === ThreeCore.RGBAFormat && a === ThreeCore.UnsignedByteType || (0, ThreeCore.warn)("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : (0, ThreeCore.error)("WebGLTextures: Unsupported texture color space:", n)), t;
  }
  function G(e) {
    return "undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement ? (vector2.width = e.naturalWidth || e.width, vector2.height = e.naturalHeight || e.height) : "undefined" != typeof VideoFrame && e instanceof VideoFrame ? (vector2.width = e.displayWidth, vector2.height = e.displayHeight) : (vector2.width = e.width, vector2.height = e.height), vector2;
  }
  this.allocateTextureUnit = function () {
    const e = E;
    return e >= a.maxTextures && (0, ThreeCore.warn)("WebGLTextures: Trying to use " + e + " texture units while this GPU supports only " + a.maxTextures), E += 1, e;
  }, this.resetTextureUnits = function () {
    E = 0;
  }, this.getTextureUnits = function () {
    return E;
  }, this.setTextureUnits = function (e) {
    E = e;
  }, this.setTexture2D = setTexture2D, this.setTexture2DArray = function (t, r) {
    const a = i.get(t);
    !1 === t.isRenderTargetTexture && t.version > 0 && a.__version !== t.version ? I(a, t, r) : (t.isExternalTexture && (a.__webglTexture = t.sourceTexture ? t.sourceTexture : null), n.bindTexture(e.TEXTURE_2D_ARRAY, a.__webglTexture, e.TEXTURE0 + r));
  }, this.setTexture3D = function (t, r) {
    const a = i.get(t);
    !1 === t.isRenderTargetTexture && t.version > 0 && a.__version !== t.version ? I(a, t, r) : n.bindTexture(e.TEXTURE_3D, a.__webglTexture, e.TEXTURE0 + r);
  }, this.setTextureCube = function (t, o) {
    const c = i.get(t);
    !0 !== t.isCubeDepthTexture && t.version > 0 && c.__version !== t.version ? function (t, o, c) {
      if (6 !== o.image.length) return;
      const l = D(t, o),
        u = o.source;
      n.bindTexture(e.TEXTURE_CUBE_MAP, t.__webglTexture, e.TEXTURE0 + c);
      const d = i.get(u);
      if (u.version !== d.__version || !0 === l) {
        n.activeTexture(e.TEXTURE0 + c);
        const t = ThreeCore.ColorManagement.getPrimaries(ThreeCore.ColorManagement.workingColorSpace),
          i = o.colorSpace === ThreeCore.NoColorSpace ? null : ThreeCore.ColorManagement.getPrimaries(o.colorSpace),
          h = o.colorSpace === ThreeCore.NoColorSpace || t === i ? e.NONE : e.BROWSER_DEFAULT_WEBGL;
        n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, o.flipY), n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, o.premultiplyAlpha), n.pixelStorei(e.UNPACK_ALIGNMENT, o.unpackAlignment), n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL, h);
        const p = o.isCompressedTexture || o.image[0].isCompressedTexture,
          f = o.image[0] && o.image[0].isDataTexture,
          m = [];
        for (let e = 0; e < 6; e++) m[e] = p || f ? f ? o.image[e].image : o.image[e] : _(o.image[e], !0, a.maxCubemapSize), m[e] = U(o, m[e]);
        const M = m[0],
          b = s.convert(o.format, o.colorSpace),
          L = s.convert(o.type),
          T = y(o.internalFormat, b, L, o.normalized, o.colorSpace),
          S = !0 !== o.isVideoTexture,
          w = void 0 === d.__version || !0 === l,
          E = u.dataReady;
        let x,
          C = v(o, M);
        if (B(e.TEXTURE_CUBE_MAP, o), p) {
          S && w && n.texStorage2D(e.TEXTURE_CUBE_MAP, C, T, M.width, M.height);
          for (let t = 0; t < 6; t++) {
            x = m[t].mipmaps;
            for (let i = 0; i < x.length; i++) {
              const a = x[i];
              o.format !== ThreeCore.RGBAFormat ? null !== b ? S ? E && n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, i, 0, 0, a.width, a.height, b, a.data) : n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, i, T, a.width, a.height, 0, a.data) : (0, ThreeCore.warn)("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : S ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, i, 0, 0, a.width, a.height, b, L, a.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, i, T, a.width, a.height, 0, b, L, a.data);
            }
          }
        } else {
          if (x = o.mipmaps, S && w) {
            x.length > 0 && C++;
            const t = G(m[0]);
            n.texStorage2D(e.TEXTURE_CUBE_MAP, C, T, t.width, t.height);
          }
          for (let t = 0; t < 6; t++) if (f) {
            S ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, 0, 0, m[t].width, m[t].height, b, L, m[t].data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, T, m[t].width, m[t].height, 0, b, L, m[t].data);
            for (let r = 0; r < x.length; r++) {
              const i = x[r].image[t].image;
              S ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, 0, 0, i.width, i.height, b, L, i.data) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, T, i.width, i.height, 0, b, L, i.data);
            }
          } else {
            S ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, 0, 0, b, L, m[t]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, 0, T, b, L, m[t]);
            for (let r = 0; r < x.length; r++) {
              const i = x[r];
              S ? E && n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, 0, 0, b, L, i.image[t]) : n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X + t, r + 1, T, b, L, i.image[t]);
            }
          }
        }
        A(o) && g(e.TEXTURE_CUBE_MAP), d.__version = u.version, o.onUpdate && o.onUpdate(o);
      }
      t.__version = o.version;
    }(c, t, o) : n.bindTexture(e.TEXTURE_CUBE_MAP, c.__webglTexture, e.TEXTURE0 + o);
  }, this.rebindTextures = function (t, n, r) {
    const a = i.get(t);
    void 0 !== n && setupFrameBufferTexture(a.__webglFramebuffer, t, t.texture, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, 0), void 0 !== r && setupDepthRenderbuffer(t);
  }, this.setupRenderTarget = function (t) {
    const r = t.texture,
      a = i.get(t),
      c = i.get(r);
    t.addEventListener("dispose", S);
    const l = t.textures,
      u = !0 === t.isWebGLCubeRenderTarget,
      d = l.length > 1;
    if (d || (void 0 === c.__webglTexture && (c.__webglTexture = e.createTexture()), c.__version = r.version, o.memory.textures++), u) {
      a.__webglFramebuffer = [];
      for (let t = 0; t < 6; t++) if (r.mipmaps && r.mipmaps.length > 0) {
        a.__webglFramebuffer[t] = [];
        for (let n = 0; n < r.mipmaps.length; n++) a.__webglFramebuffer[t][n] = e.createFramebuffer();
      } else a.__webglFramebuffer[t] = e.createFramebuffer();
    } else {
      if (r.mipmaps && r.mipmaps.length > 0) {
        a.__webglFramebuffer = [];
        for (let t = 0; t < r.mipmaps.length; t++) a.__webglFramebuffer[t] = e.createFramebuffer();
      } else a.__webglFramebuffer = e.createFramebuffer();
      if (d) for (let t = 0, n = l.length; t < n; t++) {
        const n = i.get(l[t]);
        void 0 === n.__webglTexture && (n.__webglTexture = e.createTexture(), o.memory.textures++);
      }
      if (t.samples > 0 && !1 === useMultisampledRTT(t)) {
        a.__webglMultisampledFramebuffer = e.createFramebuffer(), a.__webglColorRenderbuffer = [], n.bindFramebuffer(e.FRAMEBUFFER, a.__webglMultisampledFramebuffer);
        for (let n = 0; n < l.length; n++) {
          const r = l[n];
          a.__webglColorRenderbuffer[n] = e.createRenderbuffer(), e.bindRenderbuffer(e.RENDERBUFFER, a.__webglColorRenderbuffer[n]);
          const i = s.convert(r.format, r.colorSpace),
            o = s.convert(r.type),
            c = y(r.internalFormat, i, o, r.normalized, r.colorSpace, !0 === t.isXRRenderTarget),
            u = q(t);
          e.renderbufferStorageMultisample(e.RENDERBUFFER, u, c, t.width, t.height), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + n, e.RENDERBUFFER, a.__webglColorRenderbuffer[n]);
        }
        e.bindRenderbuffer(e.RENDERBUFFER, null), t.depthBuffer && (a.__webglDepthRenderbuffer = e.createRenderbuffer(), k(a.__webglDepthRenderbuffer, t, !0)), n.bindFramebuffer(e.FRAMEBUFFER, null);
      }
    }
    if (u) {
      n.bindTexture(e.TEXTURE_CUBE_MAP, c.__webglTexture), B(e.TEXTURE_CUBE_MAP, r);
      for (let n = 0; n < 6; n++) if (r.mipmaps && r.mipmaps.length > 0) for (let i = 0; i < r.mipmaps.length; i++) setupFrameBufferTexture(a.__webglFramebuffer[n][i], t, r, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + n, i);else setupFrameBufferTexture(a.__webglFramebuffer[n], t, r, e.COLOR_ATTACHMENT0, e.TEXTURE_CUBE_MAP_POSITIVE_X + n, 0);
      A(r) && g(e.TEXTURE_CUBE_MAP), n.unbindTexture();
    } else if (d) {
      for (let r = 0, s = l.length; r < s; r++) {
        const s = l[r],
          o = i.get(s);
        let c = e.TEXTURE_2D;
        (t.isWebGL3DRenderTarget || t.isWebGLArrayRenderTarget) && (c = t.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(c, o.__webglTexture), B(c, s), setupFrameBufferTexture(a.__webglFramebuffer, t, s, e.COLOR_ATTACHMENT0 + r, c, 0), A(s) && g(c);
      }
      n.unbindTexture();
    } else {
      let i = e.TEXTURE_2D;
      if ((t.isWebGL3DRenderTarget || t.isWebGLArrayRenderTarget) && (i = t.isWebGL3DRenderTarget ? e.TEXTURE_3D : e.TEXTURE_2D_ARRAY), n.bindTexture(i, c.__webglTexture), B(i, r), r.mipmaps && r.mipmaps.length > 0) for (let n = 0; n < r.mipmaps.length; n++) setupFrameBufferTexture(a.__webglFramebuffer[n], t, r, e.COLOR_ATTACHMENT0, i, n);else setupFrameBufferTexture(a.__webglFramebuffer, t, r, e.COLOR_ATTACHMENT0, i, 0);
      A(r) && g(i), n.unbindTexture();
    }
    t.depthBuffer && setupDepthRenderbuffer(t);
  }, this.updateRenderTargetMipmap = function (e) {
    const t = e.textures;
    for (let r = 0, a = t.length; r < a; r++) {
      const a = t[r];
      if (A(a)) {
        const t = b(e),
          r = i.get(a).__webglTexture;
        n.bindTexture(t, r), g(t), n.unbindTexture();
      }
    }
  }, this.updateMultisampleRenderTarget = function (t) {
    if (t.samples > 0) if (!1 === useMultisampledRTT(t)) {
      const r = t.textures,
        a = t.width,
        s = t.height;
      let o = e.COLOR_BUFFER_BIT;
      const c = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT,
        u = i.get(t),
        d = r.length > 1;
      if (d) for (let t = 0; t < r.length; t++) n.bindFramebuffer(e.FRAMEBUFFER, u.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.RENDERBUFFER, null), n.bindFramebuffer(e.FRAMEBUFFER, u.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.TEXTURE_2D, null, 0);
      n.bindFramebuffer(e.READ_FRAMEBUFFER, u.__webglMultisampledFramebuffer);
      const h = t.texture.mipmaps;
      h && h.length > 0 ? n.bindFramebuffer(e.DRAW_FRAMEBUFFER, u.__webglFramebuffer[0]) : n.bindFramebuffer(e.DRAW_FRAMEBUFFER, u.__webglFramebuffer);
      for (let n = 0; n < r.length; n++) {
        if (t.resolveDepthBuffer && (t.depthBuffer && (o |= e.DEPTH_BUFFER_BIT), t.stencilBuffer && t.resolveStencilBuffer && (o |= e.STENCIL_BUFFER_BIT)), d) {
          e.framebufferRenderbuffer(e.READ_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.RENDERBUFFER, u.__webglColorRenderbuffer[n]);
          const t = i.get(r[n]).__webglTexture;
          e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t, 0);
        }
        e.blitFramebuffer(0, 0, a, s, 0, 0, a, s, o, e.NEAREST), !0 === l && (W.length = 0, F.length = 0, W.push(e.COLOR_ATTACHMENT0 + n), t.depthBuffer && !1 === t.resolveDepthBuffer && (W.push(c), F.push(c), e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, F)), e.invalidateFramebuffer(e.READ_FRAMEBUFFER, W));
      }
      if (n.bindFramebuffer(e.READ_FRAMEBUFFER, null), n.bindFramebuffer(e.DRAW_FRAMEBUFFER, null), d) for (let t = 0; t < r.length; t++) {
        n.bindFramebuffer(e.FRAMEBUFFER, u.__webglMultisampledFramebuffer), e.framebufferRenderbuffer(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.RENDERBUFFER, u.__webglColorRenderbuffer[t]);
        const a = i.get(r[t]).__webglTexture;
        n.bindFramebuffer(e.FRAMEBUFFER, u.__webglFramebuffer), e.framebufferTexture2D(e.DRAW_FRAMEBUFFER, e.COLOR_ATTACHMENT0 + t, e.TEXTURE_2D, a, 0);
      }
      n.bindFramebuffer(e.DRAW_FRAMEBUFFER, u.__webglMultisampledFramebuffer);
    } else if (t.depthBuffer && !1 === t.resolveDepthBuffer && l) {
      const n = t.stencilBuffer ? e.DEPTH_STENCIL_ATTACHMENT : e.DEPTH_ATTACHMENT;
      e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER, [n]);
    }
  }, this.setupDepthRenderbuffer = setupDepthRenderbuffer, this.setupFrameBufferTexture = setupFrameBufferTexture, this.useMultisampledRTT = useMultisampledRTT, this.isReversedDepthBuffer = function () {
    return n.buffers.depth.getReversed();
  };
}
function WebGLUtils(e, t) {
  return {
    convert: function (n, i = ThreeCore.NoColorSpace) {
      let a;
      const s = ThreeCore.ColorManagement.getTransfer(i);
      if (n === ThreeCore.UnsignedByteType) return e.UNSIGNED_BYTE;
      if (n === ThreeCore.UnsignedShort4444Type) return e.UNSIGNED_SHORT_4_4_4_4;
      if (n === ThreeCore.UnsignedShort5551Type) return e.UNSIGNED_SHORT_5_5_5_1;
      if (n === ThreeCore.UnsignedInt5999Type) return e.UNSIGNED_INT_5_9_9_9_REV;
      if (n === ThreeCore.UnsignedInt101111Type) return e.UNSIGNED_INT_10F_11F_11F_REV;
      if (n === ThreeCore.ByteType) return e.BYTE;
      if (n === ThreeCore.ShortType) return e.SHORT;
      if (n === ThreeCore.UnsignedShortType) return e.UNSIGNED_SHORT;
      if (n === ThreeCore.IntType) return e.INT;
      if (n === ThreeCore.UnsignedIntType) return e.UNSIGNED_INT;
      if (n === ThreeCore.FloatType) return e.FLOAT;
      if (n === ThreeCore.HalfFloatType) return e.HALF_FLOAT;
      if (n === ThreeCore.AlphaFormat) return e.ALPHA;
      if (n === ThreeCore.RGBFormat) return e.RGB;
      if (n === ThreeCore.RGBAFormat) return e.RGBA;
      if (n === ThreeCore.DepthFormat) return e.DEPTH_COMPONENT;
      if (n === ThreeCore.DepthStencilFormat) return e.DEPTH_STENCIL;
      if (n === ThreeCore.RedFormat) return e.RED;
      if (n === ThreeCore.RedIntegerFormat) return e.RED_INTEGER;
      if (n === ThreeCore.RGFormat) return e.RG;
      if (n === ThreeCore.RGIntegerFormat) return e.RG_INTEGER;
      if (n === ThreeCore.RGBAIntegerFormat) return e.RGBA_INTEGER;
      if (n === ThreeCore.RGB_S3TC_DXT1_Format || n === ThreeCore.RGBA_S3TC_DXT1_Format || n === ThreeCore.RGBA_S3TC_DXT3_Format || n === ThreeCore.RGBA_S3TC_DXT5_Format) if (s === ThreeCore.SRGBTransfer) {
        if (a = t.get("WEBGL_compressed_texture_s3tc_srgb"), null === a) return null;
        if (n === ThreeCore.RGB_S3TC_DXT1_Format) return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;
        if (n === ThreeCore.RGBA_S3TC_DXT1_Format) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
        if (n === ThreeCore.RGBA_S3TC_DXT3_Format) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
        if (n === ThreeCore.RGBA_S3TC_DXT5_Format) return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
      } else {
        if (a = t.get("WEBGL_compressed_texture_s3tc"), null === a) return null;
        if (n === ThreeCore.RGB_S3TC_DXT1_Format) return a.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === ThreeCore.RGBA_S3TC_DXT1_Format) return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === ThreeCore.RGBA_S3TC_DXT3_Format) return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === ThreeCore.RGBA_S3TC_DXT5_Format) return a.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      }
      if (n === ThreeCore.RGB_PVRTC_4BPPV1_Format || n === ThreeCore.RGB_PVRTC_2BPPV1_Format || n === ThreeCore.RGBA_PVRTC_4BPPV1_Format || n === ThreeCore.RGBA_PVRTC_2BPPV1_Format) {
        if (a = t.get("WEBGL_compressed_texture_pvrtc"), null === a) return null;
        if (n === ThreeCore.RGB_PVRTC_4BPPV1_Format) return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === ThreeCore.RGB_PVRTC_2BPPV1_Format) return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === ThreeCore.RGBA_PVRTC_4BPPV1_Format) return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === ThreeCore.RGBA_PVRTC_2BPPV1_Format) return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      }
      if (n === ThreeCore.RGB_ETC1_Format || n === ThreeCore.RGB_ETC2_Format || n === ThreeCore.RGBA_ETC2_EAC_Format || n === ThreeCore.R11_EAC_Format || n === ThreeCore.SIGNED_R11_EAC_Format || n === ThreeCore.RG11_EAC_Format || n === ThreeCore.SIGNED_RG11_EAC_Format) {
        if (a = t.get("WEBGL_compressed_texture_etc"), null === a) return null;
        if (n === ThreeCore.RGB_ETC1_Format || n === ThreeCore.RGB_ETC2_Format) return s === ThreeCore.SRGBTransfer ? a.COMPRESSED_SRGB8_ETC2 : a.COMPRESSED_RGB8_ETC2;
        if (n === ThreeCore.RGBA_ETC2_EAC_Format) return s === ThreeCore.SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : a.COMPRESSED_RGBA8_ETC2_EAC;
        if (n === ThreeCore.R11_EAC_Format) return a.COMPRESSED_R11_EAC;
        if (n === ThreeCore.SIGNED_R11_EAC_Format) return a.COMPRESSED_SIGNED_R11_EAC;
        if (n === ThreeCore.RG11_EAC_Format) return a.COMPRESSED_RG11_EAC;
        if (n === ThreeCore.SIGNED_RG11_EAC_Format) return a.COMPRESSED_SIGNED_RG11_EAC;
      }
      if (n === ThreeCore.RGBA_ASTC_4x4_Format || n === ThreeCore.RGBA_ASTC_5x4_Format || n === ThreeCore.RGBA_ASTC_5x5_Format || n === ThreeCore.RGBA_ASTC_6x5_Format || n === ThreeCore.RGBA_ASTC_6x6_Format || n === ThreeCore.RGBA_ASTC_8x5_Format || n === ThreeCore.RGBA_ASTC_8x6_Format || n === ThreeCore.RGBA_ASTC_8x8_Format || n === ThreeCore.RGBA_ASTC_10x5_Format || n === ThreeCore.RGBA_ASTC_10x6_Format || n === ThreeCore.RGBA_ASTC_10x8_Format || n === ThreeCore.RGBA_ASTC_10x10_Format || n === ThreeCore.RGBA_ASTC_12x10_Format || n === ThreeCore.RGBA_ASTC_12x12_Format) {
        if (a = t.get("WEBGL_compressed_texture_astc"), null === a) return null;
        if (n === ThreeCore.RGBA_ASTC_4x4_Format) return s === ThreeCore.SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : a.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === ThreeCore.RGBA_ASTC_5x4_Format) return s === ThreeCore.SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : a.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === ThreeCore.RGBA_ASTC_5x5_Format) return s === ThreeCore.SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : a.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === ThreeCore.RGBA_ASTC_6x5_Format) return s === ThreeCore.SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : a.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === ThreeCore.RGBA_ASTC_6x6_Format) return s === ThreeCore.SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : a.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === ThreeCore.RGBA_ASTC_8x5_Format) return s === ThreeCore.SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : a.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === ThreeCore.RGBA_ASTC_8x6_Format) return s === ThreeCore.SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : a.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === ThreeCore.RGBA_ASTC_8x8_Format) return s === ThreeCore.SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : a.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === ThreeCore.RGBA_ASTC_10x5_Format) return s === ThreeCore.SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : a.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === ThreeCore.RGBA_ASTC_10x6_Format) return s === ThreeCore.SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : a.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === ThreeCore.RGBA_ASTC_10x8_Format) return s === ThreeCore.SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : a.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === ThreeCore.RGBA_ASTC_10x10_Format) return s === ThreeCore.SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : a.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === ThreeCore.RGBA_ASTC_12x10_Format) return s === ThreeCore.SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : a.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === ThreeCore.RGBA_ASTC_12x12_Format) return s === ThreeCore.SRGBTransfer ? a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : a.COMPRESSED_RGBA_ASTC_12x12_KHR;
      }
      if (n === ThreeCore.RGBA_BPTC_Format || n === ThreeCore.RGB_BPTC_SIGNED_Format || n === ThreeCore.RGB_BPTC_UNSIGNED_Format) {
        if (a = t.get("EXT_texture_compression_bptc"), null === a) return null;
        if (n === ThreeCore.RGBA_BPTC_Format) return s === ThreeCore.SRGBTransfer ? a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : a.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === ThreeCore.RGB_BPTC_SIGNED_Format) return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === ThreeCore.RGB_BPTC_UNSIGNED_Format) return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      }
      if (n === ThreeCore.RED_RGTC1_Format || n === ThreeCore.SIGNED_RED_RGTC1_Format || n === ThreeCore.RED_GREEN_RGTC2_Format || n === ThreeCore.SIGNED_RED_GREEN_RGTC2_Format) {
        if (a = t.get("EXT_texture_compression_rgtc"), null === a) return null;
        if (n === ThreeCore.RED_RGTC1_Format) return a.COMPRESSED_RED_RGTC1_EXT;
        if (n === ThreeCore.SIGNED_RED_RGTC1_Format) return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === ThreeCore.RED_GREEN_RGTC2_Format) return a.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === ThreeCore.SIGNED_RED_GREEN_RGTC2_Format) return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      }
      return n === ThreeCore.UnsignedInt248Type ? e.UNSIGNED_INT_24_8 : void 0 !== e[n] ? e[n] : null;
    }
  };
}
class WebXRDepthSensing {
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  init(e, t) {
    if (null === this.texture) {
      const n = new ThreeCore.ExternalTexture(e.texture);
      e.depthNear === t.depthNear && e.depthFar === t.depthFar || (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = n;
    }
  }
  getMesh(e) {
    if (null !== this.texture && null === this.mesh) {
      const t = e.cameras[0].viewport,
        shaderMaterial = new ThreeCore.ShaderMaterial({
          vertexShader: "\nvoid main() {\n\n\tgl_Position = vec4( position, 1.0 );\n\n}",
          fragmentShader: "\nuniform sampler2DArray depthColor;\nuniform float depthWidth;\nuniform float depthHeight;\n\nvoid main() {\n\n\tvec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );\n\n\tif ( coord.x >= 1.0 ) {\n\n\t\tgl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;\n\n\t} else {\n\n\t\tgl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;\n\n\t}\n\n}",
          uniforms: {
            depthColor: {
              value: this.texture
            },
            depthWidth: {
              value: t.z
            },
            depthHeight: {
              value: t.w
            }
          }
        });
      this.mesh = new ThreeCore.Mesh(new ThreeCore.PlaneGeometry(20, 20), shaderMaterial);
    }
    return this.mesh;
  }
  reset() {
    this.texture = null, this.mesh = null;
  }
  getDepthTexture() {
    return this.texture;
  }
}
class WebXRManager extends ThreeCore.EventDispatcher {
  constructor(e, t) {
    super();
    const n = this;
    let a = null,
      s = 1,
      o = null,
      c = "local-floor",
      l = 1,
      u = null,
      d = null,
      h = null,
      p = null,
      f = null,
      m = null;
    const M = "undefined" != typeof XRWebGLBinding,
      webXRDepthSensing = new WebXRDepthSensing(),
      A = {},
      g = t.getContextAttributes();
    let b = null,
      y = null;
    const L = [],
      v = [],
      vector2 = new ThreeCore.Vector2();
    let S = null;
    const perspectiveCamera = new ThreeCore.PerspectiveCamera();
    perspectiveCamera.viewport = new ThreeCore.Vector4();
    const E = new ThreeCore.PerspectiveCamera();
    E.viewport = new ThreeCore.Vector4();
    const x = [perspectiveCamera, E],
      arrayCamera = new ThreeCore.ArrayCamera();
    let z = null,
      O = null;
    function B(e) {
      const t = v.indexOf(e.inputSource);
      if (-1 === t) return;
      const n = L[t];
      void 0 !== n && (n.update(e.inputSource, e.frame, u || o), n.dispatchEvent({
        type: e.type,
        data: e.inputSource
      }));
    }
    function D() {
      a.removeEventListener("select", B), a.removeEventListener("selectstart", B), a.removeEventListener("selectend", B), a.removeEventListener("squeeze", B), a.removeEventListener("squeezestart", B), a.removeEventListener("squeezeend", B), a.removeEventListener("end", D), a.removeEventListener("inputsourceschange", N);
      for (let e = 0; e < L.length; e++) {
        const t = v[e];
        null !== t && (v[e] = null, L[e].disconnect(t));
      }
      z = null, O = null, webXRDepthSensing.reset();
      for (const e in A) delete A[e];
      e.setRenderTarget(b), f = null, p = null, h = null, a = null, y = null, Y.stop(), n.isPresenting = !1, e.setPixelRatio(S), e.setSize(vector2.width, vector2.height, !1), n.dispatchEvent({
        type: "sessionend"
      });
    }
    function N(e) {
      for (let t = 0; t < e.removed.length; t++) {
        const n = e.removed[t],
          r = v.indexOf(n);
        r >= 0 && (v[r] = null, L[r].disconnect(n));
      }
      for (let t = 0; t < e.added.length; t++) {
        const n = e.added[t];
        let r = v.indexOf(n);
        if (-1 === r) {
          for (let e = 0; e < L.length; e++) {
            if (e >= v.length) {
              v.push(n), r = e;
              break;
            }
            if (null === v[e]) {
              v[e] = n, r = e;
              break;
            }
          }
          if (-1 === r) break;
        }
        const i = L[r];
        i && i.connect(n);
      }
    }
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function (e) {
      let t = L[e];
      return void 0 === t && (t = new ThreeCore.WebXRController(), L[e] = t), t.getTargetRaySpace();
    }, this.getControllerGrip = function (e) {
      let t = L[e];
      return void 0 === t && (t = new ThreeCore.WebXRController(), L[e] = t), t.getGripSpace();
    }, this.getHand = function (e) {
      let t = L[e];
      return void 0 === t && (t = new ThreeCore.WebXRController(), L[e] = t), t.getHandSpace();
    }, this.setFramebufferScaleFactor = function (e) {
      s = e, !0 === n.isPresenting && (0, ThreeCore.warn)("WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function (e) {
      c = e, !0 === n.isPresenting && (0, ThreeCore.warn)("WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function () {
      return u || o;
    }, this.setReferenceSpace = function (e) {
      u = e;
    }, this.getBaseLayer = function () {
      return null !== p ? p : f;
    }, this.getBinding = function () {
      return null === h && M && (h = new XRWebGLBinding(a, t)), h;
    }, this.getFrame = function () {
      return m;
    }, this.getSession = function () {
      return a;
    }, this.setSession = async function (i) {
      if (a = i, null !== a) {
        b = e.getRenderTarget(), a.addEventListener("select", B), a.addEventListener("selectstart", B), a.addEventListener("selectend", B), a.addEventListener("squeeze", B), a.addEventListener("squeezestart", B), a.addEventListener("squeezeend", B), a.addEventListener("end", D), a.addEventListener("inputsourceschange", N), !0 !== g.xrCompatible && (await t.makeXRCompatible()), S = e.getPixelRatio(), e.getSize(vector2);
        if (M && "createProjectionLayer" in XRWebGLBinding.prototype) {
          let n = null,
            i = null,
            o = null;
          g.depth && (o = g.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, n = g.stencil ? ThreeCore.DepthStencilFormat : ThreeCore.DepthFormat, i = g.stencil ? ThreeCore.UnsignedInt248Type : ThreeCore.UnsignedIntType);
          const c = {
            colorFormat: t.RGBA8,
            depthFormat: o,
            scaleFactor: s
          };
          h = this.getBinding(), p = h.createProjectionLayer(c), a.updateRenderState({
            layers: [p]
          }), e.setPixelRatio(1), e.setSize(p.textureWidth, p.textureHeight, !1), y = new ThreeCore.WebGLRenderTarget(p.textureWidth, p.textureHeight, {
            format: ThreeCore.RGBAFormat,
            type: ThreeCore.UnsignedByteType,
            depthTexture: new ThreeCore.DepthTexture(p.textureWidth, p.textureHeight, i, void 0, void 0, void 0, void 0, void 0, void 0, n),
            stencilBuffer: g.stencil,
            colorSpace: e.outputColorSpace,
            samples: g.antialias ? 4 : 0,
            resolveDepthBuffer: !1 === p.ignoreDepthValues,
            resolveStencilBuffer: !1 === p.ignoreDepthValues
          });
        } else {
          const n = {
            antialias: g.antialias,
            alpha: !0,
            depth: g.depth,
            stencil: g.stencil,
            framebufferScaleFactor: s
          };
          f = new XRWebGLLayer(a, t, n), a.updateRenderState({
            baseLayer: f
          }), e.setPixelRatio(1), e.setSize(f.framebufferWidth, f.framebufferHeight, !1), y = new ThreeCore.WebGLRenderTarget(f.framebufferWidth, f.framebufferHeight, {
            format: ThreeCore.RGBAFormat,
            type: ThreeCore.UnsignedByteType,
            colorSpace: e.outputColorSpace,
            stencilBuffer: g.stencil,
            resolveDepthBuffer: !1 === f.ignoreDepthValues,
            resolveStencilBuffer: !1 === f.ignoreDepthValues
          });
        }
        y.isXRRenderTarget = !0, this.setFoveation(l), u = null, o = await a.requestReferenceSpace(c), Y.setContext(a), Y.start(), n.isPresenting = !0, n.dispatchEvent({
          type: "sessionstart"
        });
      }
    }, this.getEnvironmentBlendMode = function () {
      if (null !== a) return a.environmentBlendMode;
    }, this.getDepthTexture = function () {
      return webXRDepthSensing.getDepthTexture();
    };
    const I = new ThreeCore.Vector3(),
      R = new ThreeCore.Vector3();
    function k(e, t) {
      null === t ? e.matrixWorld.copy(e.matrix) : e.matrixWorld.multiplyMatrices(t.matrixWorld, e.matrix), e.matrixWorldInverse.copy(e.matrixWorld).invert();
    }
    this.updateCamera = function (e) {
      if (null === a) return;
      let t = e.near,
        n = e.far;
      null !== webXRDepthSensing.texture && (webXRDepthSensing.depthNear > 0 && (t = webXRDepthSensing.depthNear), webXRDepthSensing.depthFar > 0 && (n = webXRDepthSensing.depthFar)), arrayCamera.near = E.near = perspectiveCamera.near = t, arrayCamera.far = E.far = perspectiveCamera.far = n, z === arrayCamera.near && O === arrayCamera.far || (a.updateRenderState({
        depthNear: arrayCamera.near,
        depthFar: arrayCamera.far
      }), z = arrayCamera.near, O = arrayCamera.far), arrayCamera.layers.mask = 6 | e.layers.mask, perspectiveCamera.layers.mask = -5 & arrayCamera.layers.mask, E.layers.mask = -3 & arrayCamera.layers.mask;
      const i = e.parent,
        s = arrayCamera.cameras;
      k(arrayCamera, i);
      for (let e = 0; e < s.length; e++) k(s[e], i);
      2 === s.length ? function (e, t, n) {
        I.setFromMatrixPosition(t.matrixWorld), R.setFromMatrixPosition(n.matrixWorld);
        const r = I.distanceTo(R),
          i = t.projectionMatrix.elements,
          a = n.projectionMatrix.elements,
          s = i[14] / (i[10] - 1),
          o = i[14] / (i[10] + 1),
          c = (i[9] + 1) / i[5],
          l = (i[9] - 1) / i[5],
          u = (i[8] - 1) / i[0],
          d = (a[8] + 1) / a[0],
          h = s * u,
          p = s * d,
          f = r / (-u + d),
          m = f * -u;
        if (t.matrixWorld.decompose(e.position, e.quaternion, e.scale), e.translateX(m), e.translateZ(f), e.matrixWorld.compose(e.position, e.quaternion, e.scale), e.matrixWorldInverse.copy(e.matrixWorld).invert(), -1 === i[10]) e.projectionMatrix.copy(t.projectionMatrix), e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else {
          const t = s + f,
            n = o + f,
            i = h - m,
            a = p + (r - m),
            u = c * o / n * t,
            d = l * o / n * t;
          e.projectionMatrix.makePerspective(i, a, u, d, t, n), e.projectionMatrixInverse.copy(e.projectionMatrix).invert();
        }
      }(arrayCamera, perspectiveCamera, E) : arrayCamera.projectionMatrix.copy(perspectiveCamera.projectionMatrix), function (e, t, n) {
        null === n ? e.matrix.copy(t.matrixWorld) : (e.matrix.copy(n.matrixWorld), e.matrix.invert(), e.matrix.multiply(t.matrixWorld));
        e.matrix.decompose(e.position, e.quaternion, e.scale), e.updateMatrixWorld(!0), e.projectionMatrix.copy(t.projectionMatrix), e.projectionMatrixInverse.copy(t.projectionMatrixInverse), e.isPerspectiveCamera && (e.fov = 2 * ThreeCore.RAD2DEG * Math.atan(1 / e.projectionMatrix.elements[5]), e.zoom = 1);
      }(e, arrayCamera, i);
    }, this.getCamera = function () {
      return arrayCamera;
    }, this.getFoveation = function () {
      if (null !== p || null !== f) return l;
    }, this.setFoveation = function (e) {
      l = e, null !== p && (p.fixedFoveation = e), null !== f && void 0 !== f.fixedFoveation && (f.fixedFoveation = e);
    }, this.hasDepthSensing = function () {
      return null !== webXRDepthSensing.texture;
    }, this.getDepthSensingMesh = function () {
      return webXRDepthSensing.getMesh(arrayCamera);
    }, this.getCameraTexture = function (e) {
      return A[e];
    };
    let P = null;
    const Y = new i();
    Y.setAnimationLoop(function (t, i) {
      if (d = i.getViewerPose(u || o), m = i, null !== d) {
        const t = d.views;
        null !== f && (e.setRenderTargetFramebuffer(y, f.framebuffer), e.setRenderTarget(y));
        let i = !1;
        t.length !== arrayCamera.cameras.length && (arrayCamera.cameras.length = 0, i = !0);
        for (let n = 0; n < t.length; n++) {
          const a = t[n];
          let s = null;
          if (null !== f) s = f.getViewport(a);else {
            const t = h.getViewSubImage(p, a);
            s = t.viewport, 0 === n && (e.setRenderTargetTextures(y, t.colorTexture, t.depthStencilTexture), e.setRenderTarget(y));
          }
          let o = x[n];
          void 0 === o && (o = new ThreeCore.PerspectiveCamera(), o.layers.enable(n), o.viewport = new ThreeCore.Vector4(), x[n] = o), o.matrix.fromArray(a.transform.matrix), o.matrix.decompose(o.position, o.quaternion, o.scale), o.projectionMatrix.fromArray(a.projectionMatrix), o.projectionMatrixInverse.copy(o.projectionMatrix).invert(), o.viewport.set(s.x, s.y, s.width, s.height), 0 === n && (arrayCamera.matrix.copy(o.matrix), arrayCamera.matrix.decompose(arrayCamera.position, arrayCamera.quaternion, arrayCamera.scale)), !0 === i && arrayCamera.cameras.push(o);
        }
        const s = a.enabledFeatures;
        if (s && s.includes("depth-sensing") && "gpu-optimized" == a.depthUsage && M) {
          h = n.getBinding();
          const e = h.getDepthInformation(t[0]);
          e && e.isValid && e.texture && webXRDepthSensing.init(e, a.renderState);
        }
        if (s && s.includes("camera-access") && M) {
          e.state.unbindTexture(), h = n.getBinding();
          for (let e = 0; e < t.length; e++) {
            const n = t[e].camera;
            if (n) {
              let e = A[n];
              e || (e = new ThreeCore.ExternalTexture(), A[n] = e);
              const t = h.getCameraImage(n);
              e.sourceTexture = t;
            }
          }
        }
      }
      for (let e = 0; e < L.length; e++) {
        const t = v[e],
          n = L[e];
        null !== t && void 0 !== n && n.update(t, i, u || o);
      }
      P && P(t, i), i.detectedPlanes && n.dispatchEvent({
        type: "planesdetected",
        data: i
      }), m = null;
    }), this.setAnimationLoop = function (e) {
      P = e;
    }, this.dispose = function () {};
  }
}
const It = new ThreeCore.Matrix4(),
  Rt = new ThreeCore.Matrix3();
function kt(e, t) {
  function n(e, t) {
    !0 === e.matrixAutoUpdate && e.updateMatrix(), t.value.copy(e.matrix);
  }
  function i(e, i) {
    e.opacity.value = i.opacity, i.color && e.diffuse.value.copy(i.color), i.emissive && e.emissive.value.copy(i.emissive).multiplyScalar(i.emissiveIntensity), i.map && (e.map.value = i.map, n(i.map, e.mapTransform)), i.alphaMap && (e.alphaMap.value = i.alphaMap, n(i.alphaMap, e.alphaMapTransform)), i.bumpMap && (e.bumpMap.value = i.bumpMap, n(i.bumpMap, e.bumpMapTransform), e.bumpScale.value = i.bumpScale, i.side === ThreeCore.BackSide && (e.bumpScale.value *= -1)), i.normalMap && (e.normalMap.value = i.normalMap, n(i.normalMap, e.normalMapTransform), e.normalScale.value.copy(i.normalScale), i.side === ThreeCore.BackSide && e.normalScale.value.negate()), i.displacementMap && (e.displacementMap.value = i.displacementMap, n(i.displacementMap, e.displacementMapTransform), e.displacementScale.value = i.displacementScale, e.displacementBias.value = i.displacementBias), i.emissiveMap && (e.emissiveMap.value = i.emissiveMap, n(i.emissiveMap, e.emissiveMapTransform)), i.specularMap && (e.specularMap.value = i.specularMap, n(i.specularMap, e.specularMapTransform)), i.alphaTest > 0 && (e.alphaTest.value = i.alphaTest);
    const a = t.get(i),
      s = a.envMap,
      o = a.envMapRotation;
    s && (e.envMap.value = s, e.envMapRotation.value.setFromMatrix4(It.makeRotationFromEuler(o)).transpose(), s.isCubeTexture && !1 === s.isRenderTargetTexture && e.envMapRotation.value.premultiply(Rt), e.reflectivity.value = i.reflectivity, e.ior.value = i.ior, e.refractionRatio.value = i.refractionRatio), i.lightMap && (e.lightMap.value = i.lightMap, e.lightMapIntensity.value = i.lightMapIntensity, n(i.lightMap, e.lightMapTransform)), i.aoMap && (e.aoMap.value = i.aoMap, e.aoMapIntensity.value = i.aoMapIntensity, n(i.aoMap, e.aoMapTransform));
  }
  return {
    refreshFogUniforms: function (t, n) {
      n.color.getRGB(t.fogColor.value, (0, ThreeCore.getUnlitUniformColorSpace)(e)), n.isFog ? (t.fogNear.value = n.near, t.fogFar.value = n.far) : n.isFogExp2 && (t.fogDensity.value = n.density);
    },
    refreshMaterialUniforms: function (e, a, s, o, c) {
      a.isNodeMaterial ? a.uniformsNeedUpdate = !1 : a.isMeshBasicMaterial ? i(e, a) : a.isMeshLambertMaterial ? (i(e, a), a.envMap && (e.envMapIntensity.value = a.envMapIntensity)) : a.isMeshToonMaterial ? (i(e, a), function (e, t) {
        t.gradientMap && (e.gradientMap.value = t.gradientMap);
      }(e, a)) : a.isMeshPhongMaterial ? (i(e, a), function (e, t) {
        e.specular.value.copy(t.specular), e.shininess.value = Math.max(t.shininess, 1e-4);
      }(e, a), a.envMap && (e.envMapIntensity.value = a.envMapIntensity)) : a.isMeshStandardMaterial ? (i(e, a), function (e, t) {
        e.metalness.value = t.metalness, t.metalnessMap && (e.metalnessMap.value = t.metalnessMap, n(t.metalnessMap, e.metalnessMapTransform));
        e.roughness.value = t.roughness, t.roughnessMap && (e.roughnessMap.value = t.roughnessMap, n(t.roughnessMap, e.roughnessMapTransform));
        t.envMap && (e.envMapIntensity.value = t.envMapIntensity);
      }(e, a), a.isMeshPhysicalMaterial && function (e, t, i) {
        e.ior.value = t.ior, t.sheen > 0 && (e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen), e.sheenRoughness.value = t.sheenRoughness, t.sheenColorMap && (e.sheenColorMap.value = t.sheenColorMap, n(t.sheenColorMap, e.sheenColorMapTransform)), t.sheenRoughnessMap && (e.sheenRoughnessMap.value = t.sheenRoughnessMap, n(t.sheenRoughnessMap, e.sheenRoughnessMapTransform)));
        t.clearcoat > 0 && (e.clearcoat.value = t.clearcoat, e.clearcoatRoughness.value = t.clearcoatRoughness, t.clearcoatMap && (e.clearcoatMap.value = t.clearcoatMap, n(t.clearcoatMap, e.clearcoatMapTransform)), t.clearcoatRoughnessMap && (e.clearcoatRoughnessMap.value = t.clearcoatRoughnessMap, n(t.clearcoatRoughnessMap, e.clearcoatRoughnessMapTransform)), t.clearcoatNormalMap && (e.clearcoatNormalMap.value = t.clearcoatNormalMap, n(t.clearcoatNormalMap, e.clearcoatNormalMapTransform), e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale), t.side === ThreeCore.BackSide && e.clearcoatNormalScale.value.negate()));
        t.dispersion > 0 && (e.dispersion.value = t.dispersion);
        t.iridescence > 0 && (e.iridescence.value = t.iridescence, e.iridescenceIOR.value = t.iridescenceIOR, e.iridescenceThicknessMinimum.value = t.iridescenceThicknessRange[0], e.iridescenceThicknessMaximum.value = t.iridescenceThicknessRange[1], t.iridescenceMap && (e.iridescenceMap.value = t.iridescenceMap, n(t.iridescenceMap, e.iridescenceMapTransform)), t.iridescenceThicknessMap && (e.iridescenceThicknessMap.value = t.iridescenceThicknessMap, n(t.iridescenceThicknessMap, e.iridescenceThicknessMapTransform)));
        t.transmission > 0 && (e.transmission.value = t.transmission, e.transmissionSamplerMap.value = i.texture, e.transmissionSamplerSize.value.set(i.width, i.height), t.transmissionMap && (e.transmissionMap.value = t.transmissionMap, n(t.transmissionMap, e.transmissionMapTransform)), e.thickness.value = t.thickness, t.thicknessMap && (e.thicknessMap.value = t.thicknessMap, n(t.thicknessMap, e.thicknessMapTransform)), e.attenuationDistance.value = t.attenuationDistance, e.attenuationColor.value.copy(t.attenuationColor));
        t.anisotropy > 0 && (e.anisotropyVector.value.set(t.anisotropy * Math.cos(t.anisotropyRotation), t.anisotropy * Math.sin(t.anisotropyRotation)), t.anisotropyMap && (e.anisotropyMap.value = t.anisotropyMap, n(t.anisotropyMap, e.anisotropyMapTransform)));
        e.specularIntensity.value = t.specularIntensity, e.specularColor.value.copy(t.specularColor), t.specularColorMap && (e.specularColorMap.value = t.specularColorMap, n(t.specularColorMap, e.specularColorMapTransform));
        t.specularIntensityMap && (e.specularIntensityMap.value = t.specularIntensityMap, n(t.specularIntensityMap, e.specularIntensityMapTransform));
      }(e, a, c)) : a.isMeshMatcapMaterial ? (i(e, a), function (e, t) {
        t.matcap && (e.matcap.value = t.matcap);
      }(e, a)) : a.isMeshDepthMaterial ? i(e, a) : a.isMeshDistanceMaterial ? (i(e, a), function (e, n) {
        const r = t.get(n).light;
        e.referencePosition.value.setFromMatrixPosition(r.matrixWorld), e.nearDistance.value = r.shadow.camera.near, e.farDistance.value = r.shadow.camera.far;
      }(e, a)) : a.isMeshNormalMaterial ? i(e, a) : a.isLineBasicMaterial ? (function (e, t) {
        e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, t.map && (e.map.value = t.map, n(t.map, e.mapTransform));
      }(e, a), a.isLineDashedMaterial && function (e, t) {
        e.dashSize.value = t.dashSize, e.totalSize.value = t.dashSize + t.gapSize, e.scale.value = t.scale;
      }(e, a)) : a.isPointsMaterial ? function (e, t, r, i) {
        e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.size.value = t.size * r, e.scale.value = .5 * i, t.map && (e.map.value = t.map, n(t.map, e.uvTransform));
        t.alphaMap && (e.alphaMap.value = t.alphaMap, n(t.alphaMap, e.alphaMapTransform));
        t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
      }(e, a, s, o) : a.isSpriteMaterial ? function (e, t) {
        e.diffuse.value.copy(t.color), e.opacity.value = t.opacity, e.rotation.value = t.rotation, t.map && (e.map.value = t.map, n(t.map, e.mapTransform));
        t.alphaMap && (e.alphaMap.value = t.alphaMap, n(t.alphaMap, e.alphaMapTransform));
        t.alphaTest > 0 && (e.alphaTest.value = t.alphaTest);
      }(e, a) : a.isShadowMaterial ? (e.color.value.copy(a.color), e.opacity.value = a.opacity) : a.isShaderMaterial && (a.uniformsNeedUpdate = !1);
    }
  };
}
function Pt(e, t, n, i) {
  let a = {},
    s = {},
    o = [];
  const c = e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);
  function l(t, n, r, i) {
    if (!0 === function (e, t, n, r) {
      const i = e.value,
        a = t + "_" + n;
      if (void 0 === r[a]) return "number" == typeof i || "boolean" == typeof i ? r[a] = i : ArrayBuffer.isView(i) ? r[a] = i.slice() : r[a] = i.clone(), !0;
      {
        const e = r[a];
        if ("number" == typeof i || "boolean" == typeof i) {
          if (e !== i) return r[a] = i, !0;
        } else {
          if (ArrayBuffer.isView(i)) return !0;
          if (!1 === e.equals(i)) return e.copy(i), !0;
        }
      }
      return !1;
    }(t, n, r, i)) {
      const n = t.__offset,
        r = t.value;
      if (Array.isArray(r)) {
        let e = 0;
        for (let n = 0; n < r.length; n++) {
          const i = r[n],
            a = d(i);
          u(i, t.__data, e), "number" == typeof i || "boolean" == typeof i || i.isMatrix3 || ArrayBuffer.isView(i) || (e += a.storage / Float32Array.BYTES_PER_ELEMENT);
        }
      } else u(r, t.__data, 0);
      e.bufferSubData(e.UNIFORM_BUFFER, n, t.__data);
    }
  }
  function u(e, t, n) {
    "number" == typeof e || "boolean" == typeof e ? t[0] = e : e.isMatrix3 ? (t[0] = e.elements[0], t[1] = e.elements[1], t[2] = e.elements[2], t[3] = 0, t[4] = e.elements[3], t[5] = e.elements[4], t[6] = e.elements[5], t[7] = 0, t[8] = e.elements[6], t[9] = e.elements[7], t[10] = e.elements[8], t[11] = 0) : ArrayBuffer.isView(e) ? t.set(new e.constructor(e.buffer, e.byteOffset, t.length)) : e.toArray(t, n);
  }
  function d(e) {
    const t = {
      boundary: 0,
      storage: 0
    };
    return "number" == typeof e || "boolean" == typeof e ? (t.boundary = 4, t.storage = 4) : e.isVector2 ? (t.boundary = 8, t.storage = 8) : e.isVector3 || e.isColor ? (t.boundary = 16, t.storage = 12) : e.isVector4 ? (t.boundary = 16, t.storage = 16) : e.isMatrix3 ? (t.boundary = 48, t.storage = 48) : e.isMatrix4 ? (t.boundary = 64, t.storage = 64) : e.isTexture ? (0, ThreeCore.warn)("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : ArrayBuffer.isView(e) ? (t.boundary = 16, t.storage = e.byteLength) : (0, ThreeCore.warn)("WebGLRenderer: Unsupported uniform value type.", e), t;
  }
  function h(t) {
    const n = t.target;
    n.removeEventListener("dispose", h);
    const r = o.indexOf(n.__bindingPointIndex);
    o.splice(r, 1), e.deleteBuffer(a[n.id]), delete a[n.id], delete s[n.id];
  }
  return {
    bind: function (e, t) {
      const n = t.program;
      i.uniformBlockBinding(e, n);
    },
    update: function (n, u) {
      let p = a[n.id];
      void 0 === p && (!function (e) {
        const t = e.uniforms;
        let n = 0;
        const r = 16;
        for (let e = 0, i = t.length; e < i; e++) {
          const i = Array.isArray(t[e]) ? t[e] : [t[e]];
          for (let e = 0, t = i.length; e < t; e++) {
            const t = i[e],
              a = Array.isArray(t.value) ? t.value : [t.value];
            for (let e = 0, i = a.length; e < i; e++) {
              const i = d(a[e]),
                s = n % r,
                o = s % i.boundary,
                c = s + o;
              n += o, 0 !== c && r - c < i.storage && (n += r - c), t.__data = new Float32Array(i.storage / Float32Array.BYTES_PER_ELEMENT), t.__offset = n, n += i.storage;
            }
          }
        }
        const i = n % r;
        i > 0 && (n += r - i);
        e.__size = n, e.__cache = {};
      }(n), p = function (t) {
        const n = function () {
          for (let e = 0; e < c; e++) if (-1 === o.indexOf(e)) return o.push(e), e;
          return (0, ThreeCore.error)("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
        }();
        t.__bindingPointIndex = n;
        const i = e.createBuffer(),
          a = t.__size,
          s = t.usage;
        return e.bindBuffer(e.UNIFORM_BUFFER, i), e.bufferData(e.UNIFORM_BUFFER, a, s), e.bindBuffer(e.UNIFORM_BUFFER, null), e.bindBufferBase(e.UNIFORM_BUFFER, n, i), i;
      }(n), a[n.id] = p, n.addEventListener("dispose", h));
      const f = u.program;
      i.updateUBOMapping(n, f);
      const m = t.render.frame;
      s[n.id] !== m && (!function (t) {
        const n = a[t.id],
          r = t.uniforms,
          i = t.__cache;
        e.bindBuffer(e.UNIFORM_BUFFER, n);
        for (let e = 0, t = r.length; e < t; e++) {
          const t = r[e];
          if (Array.isArray(t)) for (let n = 0, r = t.length; n < r; n++) l(t[n], e, n, i);else l(t, e, 0, i);
        }
        e.bindBuffer(e.UNIFORM_BUFFER, null);
      }(n), s[n.id] = m);
    },
    dispose: function () {
      for (const t in a) e.deleteBuffer(a[t]);
      o = [], a = {}, s = {};
    }
  };
}
Rt.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
const uint16Array = new Uint16Array([12469, 15057, 12620, 14925, 13266, 14620, 13807, 14376, 14323, 13990, 14545, 13625, 14713, 13328, 14840, 12882, 14931, 12528, 14996, 12233, 15039, 11829, 15066, 11525, 15080, 11295, 15085, 10976, 15082, 10705, 15073, 10495, 13880, 14564, 13898, 14542, 13977, 14430, 14158, 14124, 14393, 13732, 14556, 13410, 14702, 12996, 14814, 12596, 14891, 12291, 14937, 11834, 14957, 11489, 14958, 11194, 14943, 10803, 14921, 10506, 14893, 10278, 14858, 9960, 14484, 14039, 14487, 14025, 14499, 13941, 14524, 13740, 14574, 13468, 14654, 13106, 14743, 12678, 14818, 12344, 14867, 11893, 14889, 11509, 14893, 11180, 14881, 10751, 14852, 10428, 14812, 10128, 14765, 9754, 14712, 9466, 14764, 13480, 14764, 13475, 14766, 13440, 14766, 13347, 14769, 13070, 14786, 12713, 14816, 12387, 14844, 11957, 14860, 11549, 14868, 11215, 14855, 10751, 14825, 10403, 14782, 10044, 14729, 9651, 14666, 9352, 14599, 9029, 14967, 12835, 14966, 12831, 14963, 12804, 14954, 12723, 14936, 12564, 14917, 12347, 14900, 11958, 14886, 11569, 14878, 11247, 14859, 10765, 14828, 10401, 14784, 10011, 14727, 9600, 14660, 9289, 14586, 8893, 14508, 8533, 15111, 12234, 15110, 12234, 15104, 12216, 15092, 12156, 15067, 12010, 15028, 11776, 14981, 11500, 14942, 11205, 14902, 10752, 14861, 10393, 14812, 9991, 14752, 9570, 14682, 9252, 14603, 8808, 14519, 8445, 14431, 8145, 15209, 11449, 15208, 11451, 15202, 11451, 15190, 11438, 15163, 11384, 15117, 11274, 15055, 10979, 14994, 10648, 14932, 10343, 14871, 9936, 14803, 9532, 14729, 9218, 14645, 8742, 14556, 8381, 14461, 8020, 14365, 7603, 15273, 10603, 15272, 10607, 15267, 10619, 15256, 10631, 15231, 10614, 15182, 10535, 15118, 10389, 15042, 10167, 14963, 9787, 14883, 9447, 14800, 9115, 14710, 8665, 14615, 8318, 14514, 7911, 14411, 7507, 14279, 7198, 15314, 9675, 15313, 9683, 15309, 9712, 15298, 9759, 15277, 9797, 15229, 9773, 15166, 9668, 15084, 9487, 14995, 9274, 14898, 8910, 14800, 8539, 14697, 8234, 14590, 7790, 14479, 7409, 14367, 7067, 14178, 6621, 15337, 8619, 15337, 8631, 15333, 8677, 15325, 8769, 15305, 8871, 15264, 8940, 15202, 8909, 15119, 8775, 15022, 8565, 14916, 8328, 14804, 8009, 14688, 7614, 14569, 7287, 14448, 6888, 14321, 6483, 14088, 6171, 15350, 7402, 15350, 7419, 15347, 7480, 15340, 7613, 15322, 7804, 15287, 7973, 15229, 8057, 15148, 8012, 15046, 7846, 14933, 7611, 14810, 7357, 14682, 7069, 14552, 6656, 14421, 6316, 14251, 5948, 14007, 5528, 15356, 5942, 15356, 5977, 15353, 6119, 15348, 6294, 15332, 6551, 15302, 6824, 15249, 7044, 15171, 7122, 15070, 7050, 14949, 6861, 14818, 6611, 14679, 6349, 14538, 6067, 14398, 5651, 14189, 5311, 13935, 4958, 15359, 4123, 15359, 4153, 15356, 4296, 15353, 4646, 15338, 5160, 15311, 5508, 15263, 5829, 15188, 6042, 15088, 6094, 14966, 6001, 14826, 5796, 14678, 5543, 14527, 5287, 14377, 4985, 14133, 4586, 13869, 4257, 15360, 1563, 15360, 1642, 15358, 2076, 15354, 2636, 15341, 3350, 15317, 4019, 15273, 4429, 15203, 4732, 15105, 4911, 14981, 4932, 14836, 4818, 14679, 4621, 14517, 4386, 14359, 4156, 14083, 3795, 13808, 3437, 15360, 122, 15360, 137, 15358, 285, 15355, 636, 15344, 1274, 15322, 2177, 15281, 2765, 15215, 3223, 15120, 3451, 14995, 3569, 14846, 3567, 14681, 3466, 14511, 3305, 14344, 3121, 14037, 2800, 13753, 2467, 15360, 0, 15360, 1, 15359, 21, 15355, 89, 15346, 253, 15325, 479, 15287, 796, 15225, 1148, 15133, 1492, 15008, 1749, 14856, 1882, 14685, 1886, 14506, 1783, 14324, 1608, 13996, 1398, 13702, 1183]);
let Wt = null;
class WebGLRenderer {
  constructor(e = {}) {
    const {
      canvas: domElement = (0, ThreeCore.createCanvasElement)(),
      context: n = null,
      depth: s = !0,
      stencil: o = !1,
      alpha: c = !1,
      antialias: l = !1,
      premultipliedAlpha: u = !0,
      preserveDrawingBuffer: d = !1,
      powerPreference: _ = "default",
      failIfMajorPerformanceCaveat: A = !1,
      reversedDepthBuffer: g = !1,
      outputBufferType: b = ThreeCore.UnsignedByteType
    } = e;
    let y;
    if (this.isWebGLRenderer = !0, null !== n) {
      if ("undefined" != typeof WebGLRenderingContext && n instanceof WebGLRenderingContext) throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      y = n.getContextAttributes().alpha;
    } else y = c;
    const L = b,
      set = new Set([ThreeCore.RGBAIntegerFormat, ThreeCore.RGIntegerFormat, ThreeCore.RedIntegerFormat]),
      T = new Set([ThreeCore.UnsignedByteType, ThreeCore.UnsignedIntType, ThreeCore.UnsignedShortType, ThreeCore.UnsignedInt248Type, ThreeCore.UnsignedShort4444Type, ThreeCore.UnsignedShort5551Type]),
      uint32Array = new Uint32Array(4),
      int32Array = new Int32Array(4),
      E = new ThreeCore.Vector3();
    let x = null,
      C = null;
    const z = [],
      P = [];
    let W = null;
    this.domElement = domElement, this.debug = {
      checkShaderErrors: !0,
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = ThreeCore.NoToneMapping, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
    const F = this;
    let q = !1,
      H = null,
      U = null,
      G = null,
      X = null;
    this._outputColorSpace = ThreeCore.SRGBColorSpace;
    let j = 0,
      V = 0,
      K = null,
      J = -1,
      $ = null;
    const vector4 = new ThreeCore.Vector4(),
      ee = new ThreeCore.Vector4();
    let te = null;
    const ne = new ThreeCore.Color(0);
    let re = 0,
      ie = domElement.width,
      ae = domElement.height,
      se = 1,
      oe = null,
      ce = null;
    const le = new ThreeCore.Vector4(0, 0, ie, ae),
      ue = new ThreeCore.Vector4(0, 0, ie, ae);
    let de = !1;
    const frustum = new ThreeCore.Frustum();
    let pe = !1,
      fe = !1;
    const me = new ThreeCore.Matrix4(),
      Me = new ThreeCore.Vector3(),
      _e = new ThreeCore.Vector4(),
      Ae = {
        background: null,
        fog: null,
        environment: null,
        overrideMaterial: null,
        isScene: !0
      };
    let ge = !1;
    function be() {
      return null === K ? se : 1;
    }
    let ye,
      Le,
      ve,
      Te,
      Se,
      we,
      Ee,
      xe,
      Ce,
      ze,
      Oe,
      Be,
      De,
      Ne,
      Ie,
      Re,
      ke,
      Pe,
      Ye,
      We,
      Fe,
      qe,
      He,
      Ue = n;
    function Ge(e, n) {
      return domElement.getContext(e, n);
    }
    try {
      const e = {
        alpha: !0,
        depth: s,
        stencil: o,
        antialias: l,
        premultipliedAlpha: u,
        preserveDrawingBuffer: d,
        powerPreference: _,
        failIfMajorPerformanceCaveat: A
      };
      if ("setAttribute" in domElement && domElement.setAttribute("data-engine", `three.js r${ThreeCore.REVISION}`), domElement.addEventListener("webglcontextlost", Ve, !1), domElement.addEventListener("webglcontextrestored", Qe, !1), domElement.addEventListener("webglcontextcreationerror", Ke, !1), null === Ue) {
        const t = "webgl2";
        if (Ue = Ge(t, e), null === Ue) throw Ge(t) ? new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.") : new Error("THREE.WebGLRenderer: Error creating WebGL context.");
      }
    } catch (e) {
      throw (0, ThreeCore.error)("WebGLRenderer: " + e.message), e;
    }
    function Xe() {
      ye = new B(Ue), ye.init(), Fe = new WebGLUtils(Ue, ye), Le = new m(Ue, ye, e, Fe), ve = new Bt(Ue, ye), Le.reversedDepthBuffer && g && ve.buffers.depth.setReversed(!0), U = Ue.createFramebuffer(), G = Ue.createFramebuffer(), X = Ue.createFramebuffer(), Te = new I(Ue), Se = new mt(), we = new Dt(Ue, ye, ve, Se, Le, Fe, Te), Ee = new O(F), xe = new a(Ue), qe = new p(Ue, xe), Ce = new D(Ue, xe, Te, qe), ze = new k(Ue, Ce, xe, qe, Te), Pe = new R(Ue, Le, we), Ie = new M(Se), Oe = new ft(F, Ee, ye, Le, qe, Ie), Be = new kt(F, Se), De = new gt(), Ne = new St(ye), ke = new h(F, Ee, ve, ze, y, u), Re = new Ot(F, ze, Le), He = new Pt(Ue, Te, Le, ve), Ye = new f(Ue, ye, Te), We = new N(Ue, ye, Te), Te.programs = Oe.programs, F.capabilities = Le, F.extensions = ye, F.properties = Se, F.renderLists = De, F.shadowMap = Re, F.state = ve, F.info = Te;
    }
    Xe(), L !== ThreeCore.UnsignedByteType && (W = new Y(L, domElement.width, domElement.height, l, s, o));
    const je = new WebXRManager(F, Ue);
    function Ve(e) {
      e.preventDefault(), (0, ThreeCore.log)("WebGLRenderer: Context Lost."), q = !0;
    }
    function Qe() {
      (0, ThreeCore.log)("WebGLRenderer: Context Restored."), q = !1;
      const e = Te.autoReset,
        t = Re.enabled,
        n = Re.autoUpdate,
        i = Re.needsUpdate,
        a = Re.type;
      Xe(), Te.autoReset = e, Re.enabled = t, Re.autoUpdate = n, Re.needsUpdate = i, Re.type = a;
    }
    function Ke(e) {
      (0, ThreeCore.error)("WebGLRenderer: A WebGL context could not be created. Reason: ", e.statusMessage);
    }
    function Je(e) {
      const t = e.target;
      t.removeEventListener("dispose", Je), function (e) {
        (function (e) {
          const t = Se.get(e).programs;
          void 0 !== t && (t.forEach(function (e) {
            Oe.releaseProgram(e);
          }), e.isShaderMaterial && Oe.releaseShaderCache(e));
        })(e), Se.remove(e);
      }(t);
    }
    function $e(e, t, n) {
      !0 === e.transparent && e.side === ThreeCore.DoubleSide && !1 === e.forceSinglePass ? (e.side = ThreeCore.BackSide, e.needsUpdate = !0, ct(e, t, n), e.side = ThreeCore.FrontSide, e.needsUpdate = !0, ct(e, t, n), e.side = ThreeCore.DoubleSide) : ct(e, t, n);
    }
    this.xr = je, this.getContext = function () {
      return Ue;
    }, this.getContextAttributes = function () {
      return Ue.getContextAttributes();
    }, this.forceContextLoss = function () {
      const e = ye.get("WEBGL_lose_context");
      e && e.loseContext();
    }, this.forceContextRestore = function () {
      const e = ye.get("WEBGL_lose_context");
      e && e.restoreContext();
    }, this.getPixelRatio = function () {
      return se;
    }, this.setPixelRatio = function (e) {
      void 0 !== e && (se = e, this.setSize(ie, ae, !1));
    }, this.getSize = function (e) {
      return e.set(ie, ae);
    }, this.setSize = function (e, n, i = !0) {
      je.isPresenting ? (0, ThreeCore.warn)("WebGLRenderer: Can't change size while VR device is presenting.") : (ie = e, ae = n, domElement.width = Math.floor(e * se), domElement.height = Math.floor(n * se), !0 === i && (domElement.style.width = e + "px", domElement.style.height = n + "px"), null !== W && W.setSize(domElement.width, domElement.height), this.setViewport(0, 0, e, n));
    }, this.getDrawingBufferSize = function (e) {
      return e.set(ie * se, ae * se).floor();
    }, this.setDrawingBufferSize = function (e, n, r) {
      ie = e, ae = n, se = r, domElement.width = Math.floor(e * r), domElement.height = Math.floor(n * r), this.setViewport(0, 0, e, n);
    }, this.setEffects = function (e) {
      if (L !== ThreeCore.UnsignedByteType) {
        if (e) for (let t = 0; t < e.length; t++) if (!0 === e[t].isOutputPass) {
          (0, ThreeCore.warn)("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
          break;
        }
        W.setEffects(e || []);
      } else (0, ThreeCore.error)("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
    }, this.getCurrentViewport = function (e) {
      return e.copy(vector4);
    }, this.getViewport = function (e) {
      return e.copy(le);
    }, this.setViewport = function (e, t, n, r) {
      e.isVector4 ? le.set(e.x, e.y, e.z, e.w) : le.set(e, t, n, r), ve.viewport(vector4.copy(le).multiplyScalar(se).round());
    }, this.getScissor = function (e) {
      return e.copy(ue);
    }, this.setScissor = function (e, t, n, r) {
      e.isVector4 ? ue.set(e.x, e.y, e.z, e.w) : ue.set(e, t, n, r), ve.scissor(ee.copy(ue).multiplyScalar(se).round());
    }, this.getScissorTest = function () {
      return de;
    }, this.setScissorTest = function (e) {
      ve.setScissorTest(de = e);
    }, this.setOpaqueSort = function (e) {
      oe = e;
    }, this.setTransparentSort = function (e) {
      ce = e;
    }, this.getClearColor = function (e) {
      return e.copy(ke.getClearColor());
    }, this.setClearColor = function () {
      ke.setClearColor(...arguments);
    }, this.getClearAlpha = function () {
      return ke.getClearAlpha();
    }, this.setClearAlpha = function () {
      ke.setClearAlpha(...arguments);
    }, this.clear = function (e = !0, t = !0, n = !0) {
      let r = 0;
      if (e) {
        let e = !1;
        if (null !== K) {
          const t = K.texture.format;
          e = set.has(t);
        }
        if (e) {
          const e = K.texture.type,
            t = T.has(e),
            n = ke.getClearColor(),
            r = ke.getClearAlpha(),
            i = n.r,
            a = n.g,
            s = n.b;
          t ? (uint32Array[0] = i, uint32Array[1] = a, uint32Array[2] = s, uint32Array[3] = r, Ue.clearBufferuiv(Ue.COLOR, 0, uint32Array)) : (int32Array[0] = i, int32Array[1] = a, int32Array[2] = s, int32Array[3] = r, Ue.clearBufferiv(Ue.COLOR, 0, int32Array));
        } else r |= Ue.COLOR_BUFFER_BIT;
      }
      t && (r |= Ue.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(!0)), n && (r |= Ue.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), 0 !== r && Ue.clear(r);
    }, this.clearColor = function () {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function () {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function () {
      this.clear(!1, !1, !0);
    }, this.setNodesHandler = function (e) {
      e.setRenderer(this), H = e;
    }, this.dispose = function () {
      domElement.removeEventListener("webglcontextlost", Ve, !1), domElement.removeEventListener("webglcontextrestored", Qe, !1), domElement.removeEventListener("webglcontextcreationerror", Ke, !1), ke.dispose(), De.dispose(), Ne.dispose(), Se.dispose(), Ee.dispose(), ze.dispose(), qe.dispose(), He.dispose(), Oe.dispose(), je.dispose(), je.removeEventListener("sessionstart", et), je.removeEventListener("sessionend", tt), nt.stop();
    }, this.renderBufferDirect = function (e, t, n, i, a, s) {
      null === t && (t = Ae);
      const o = a.isMesh && a.matrixWorld.determinantAffine() < 0,
        c = function (e, t, n, i, a) {
          !0 !== t.isScene && (t = Ae);
          we.resetTextureUnits();
          const s = t.fog,
            o = i.isMeshStandardMaterial || i.isMeshLambertMaterial || i.isMeshPhongMaterial ? t.environment : null,
            c = null === K ? F.outputColorSpace : !0 === K.isXRRenderTarget ? K.texture.colorSpace : ThreeCore.ColorManagement.workingColorSpace,
            l = i.isMeshStandardMaterial || i.isMeshLambertMaterial && !i.envMap || i.isMeshPhongMaterial && !i.envMap,
            u = Ee.get(i.envMap || o, l),
            d = !0 === i.vertexColors && !!n.attributes.color && 4 === n.attributes.color.itemSize,
            h = !!n.attributes.tangent && (!!i.normalMap || i.anisotropy > 0),
            p = !!n.morphAttributes.position,
            f = !!n.morphAttributes.normal,
            m = !!n.morphAttributes.color;
          let M = ThreeCore.NoToneMapping;
          i.toneMapped && (null !== K && !0 !== K.isXRRenderTarget || (M = F.toneMapping));
          const _ = n.morphAttributes.position || n.morphAttributes.normal || n.morphAttributes.color,
            A = void 0 !== _ ? _.length : 0,
            g = Se.get(i),
            b = C.state.lights;
          if (!0 === pe && (!0 === fe || e !== $)) {
            const t = e === $ && i.id === J;
            Ie.setState(i, e, t);
          }
          let y = !1;
          i.version === g.__version ? g.needsLights && g.lightsStateVersion !== b.state.version || g.outputColorSpace !== c || a.isBatchedMesh && !1 === g.batching ? y = !0 : a.isBatchedMesh || !0 !== g.batching ? a.isBatchedMesh && !0 === g.batchingColor && null === a.colorTexture || a.isBatchedMesh && !1 === g.batchingColor && null !== a.colorTexture || a.isInstancedMesh && !1 === g.instancing ? y = !0 : a.isInstancedMesh || !0 !== g.instancing ? a.isSkinnedMesh && !1 === g.skinning ? y = !0 : a.isSkinnedMesh || !0 !== g.skinning ? a.isInstancedMesh && !0 === g.instancingColor && null === a.instanceColor || a.isInstancedMesh && !1 === g.instancingColor && null !== a.instanceColor || a.isInstancedMesh && !0 === g.instancingMorph && null === a.morphTexture || a.isInstancedMesh && !1 === g.instancingMorph && null !== a.morphTexture || g.envMap !== u || !0 === i.fog && g.fog !== s ? y = !0 : void 0 === g.numClippingPlanes || g.numClippingPlanes === Ie.numPlanes && g.numIntersection === Ie.numIntersection ? (g.vertexAlphas !== d || g.vertexTangents !== h || g.morphTargets !== p || g.morphNormals !== f || g.morphColors !== m || g.toneMapping !== M || g.morphTargetsCount !== A || !!g.lightProbeGrid != C.state.lightProbeGridArray.length > 0) && (y = !0) : y = !0 : y = !0 : y = !0 : y = !0 : (y = !0, g.__version = i.version);
          let L = g.currentProgram;
          !0 === y && (L = ct(i, t, a), H && i.isNodeMaterial && H.onUpdateProgram(i, L, g));
          let v = !1,
            T = !1,
            S = !1;
          const w = L.getUniforms(),
            x = g.uniforms;
          ve.useProgram(L.program) && (v = !0, T = !0, S = !0);
          i.id !== J && (J = i.id, T = !0);
          if (g.needsLights) {
            const e = function (e, t) {
              if (0 === e.length) return null;
              if (1 === e.length) return null !== e[0].texture ? e[0] : null;
              E.setFromMatrixPosition(t.matrixWorld);
              for (let t = 0, n = e.length; t < n; t++) {
                const n = e[t];
                if (null !== n.texture && n.boundingBox.containsPoint(E)) return n;
              }
              return null;
            }(C.state.lightProbeGridArray, a);
            g.lightProbeGrid !== e && (g.lightProbeGrid = e, T = !0);
          }
          if (v || $ !== e) {
            ve.buffers.depth.getReversed() && !0 !== e.reversedDepth && (e._reversedDepth = !0, e.updateProjectionMatrix()), w.setValue(Ue, "projectionMatrix", e.projectionMatrix), w.setValue(Ue, "viewMatrix", e.matrixWorldInverse);
            const t = w.map.cameraPosition;
            void 0 !== t && t.setValue(Ue, Me.setFromMatrixPosition(e.matrixWorld)), Le.logarithmicDepthBuffer && w.setValue(Ue, "logDepthBufFC", 2 / (Math.log(e.far + 1) / Math.LN2)), (i.isMeshPhongMaterial || i.isMeshToonMaterial || i.isMeshLambertMaterial || i.isMeshBasicMaterial || i.isMeshStandardMaterial || i.isShaderMaterial) && w.setValue(Ue, "isOrthographic", !0 === e.isOrthographicCamera), $ !== e && ($ = e, T = !0, S = !0);
          }
          g.needsLights && (b.state.directionalShadowMap.length > 0 && w.setValue(Ue, "directionalShadowMap", b.state.directionalShadowMap, we), b.state.spotShadowMap.length > 0 && w.setValue(Ue, "spotShadowMap", b.state.spotShadowMap, we), b.state.pointShadowMap.length > 0 && w.setValue(Ue, "pointShadowMap", b.state.pointShadowMap, we));
          if (a.isSkinnedMesh) {
            w.setOptional(Ue, a, "bindMatrix"), w.setOptional(Ue, a, "bindMatrixInverse");
            const e = a.skeleton;
            e && (null === e.boneTexture && e.computeBoneTexture(), w.setValue(Ue, "boneTexture", e.boneTexture, we));
          }
          a.isBatchedMesh && (w.setOptional(Ue, a, "batchingTexture"), w.setValue(Ue, "batchingTexture", a._matricesTexture, we), w.setOptional(Ue, a, "batchingIdTexture"), w.setValue(Ue, "batchingIdTexture", a._indirectTexture, we), w.setOptional(Ue, a, "batchingColorTexture"), null !== a._colorsTexture && w.setValue(Ue, "batchingColorTexture", a._colorsTexture, we));
          const z = n.morphAttributes;
          void 0 === z.position && void 0 === z.normal && void 0 === z.color || Pe.update(a, n, L);
          (T || g.receiveShadow !== a.receiveShadow) && (g.receiveShadow = a.receiveShadow, w.setValue(Ue, "receiveShadow", a.receiveShadow));
          (i.isMeshStandardMaterial || i.isMeshLambertMaterial || i.isMeshPhongMaterial) && null === i.envMap && null !== t.environment && (x.envMapIntensity.value = t.environmentIntensity);
          void 0 !== x.dfgLUT && (x.dfgLUT.value = (null === Wt && (Wt = new ThreeCore.DataTexture(uint16Array, 16, 16, ThreeCore.RGFormat, ThreeCore.HalfFloatType), Wt.name = "DFG_LUT", Wt.minFilter = ThreeCore.LinearFilter, Wt.magFilter = ThreeCore.LinearFilter, Wt.wrapS = ThreeCore.ClampToEdgeWrapping, Wt.wrapT = ThreeCore.ClampToEdgeWrapping, Wt.generateMipmaps = !1, Wt.needsUpdate = !0), Wt));
          if (T) {
            if (w.setValue(Ue, "toneMappingExposure", F.toneMappingExposure), g.needsLights && (B = S, (O = x).ambientLightColor.needsUpdate = B, O.lightProbe.needsUpdate = B, O.directionalLights.needsUpdate = B, O.directionalLightShadows.needsUpdate = B, O.pointLights.needsUpdate = B, O.pointLightShadows.needsUpdate = B, O.spotLights.needsUpdate = B, O.spotLightShadows.needsUpdate = B, O.rectAreaLights.needsUpdate = B, O.hemisphereLights.needsUpdate = B), s && !0 === i.fog && Be.refreshFogUniforms(x, s), Be.refreshMaterialUniforms(x, i, se, ae, C.state.transmissionRenderTarget[e.id]), g.needsLights && g.lightProbeGrid) {
              const e = g.lightProbeGrid;
              x.probesSH.value = e.texture, x.probesMin.value.copy(e.boundingBox.min), x.probesMax.value.copy(e.boundingBox.max), x.probesResolution.value.copy(e.resolution);
            }
            WebGLUniforms.upload(Ue, lt(g), x, we);
          }
          var O, B;
          i.isShaderMaterial && !0 === i.uniformsNeedUpdate && (WebGLUniforms.upload(Ue, lt(g), x, we), i.uniformsNeedUpdate = !1);
          i.isSpriteMaterial && w.setValue(Ue, "center", a.center);
          if (w.setValue(Ue, "modelViewMatrix", a.modelViewMatrix), w.setValue(Ue, "normalMatrix", a.normalMatrix), w.setValue(Ue, "modelMatrix", a.matrixWorld), void 0 !== i.uniformsGroups) {
            const e = i.uniformsGroups;
            for (let t = 0, n = e.length; t < n; t++) {
              const n = e[t];
              He.update(n, L), He.bind(n, L);
            }
          }
          return L;
        }(e, t, n, i, a);
      ve.setMaterial(i, o);
      let l = n.index,
        u = 1;
      if (!0 === i.wireframe) {
        if (l = Ce.getWireframeAttribute(n), void 0 === l) return;
        u = 2;
      }
      const d = n.drawRange,
        h = n.attributes.position;
      let p = d.start * u,
        f = (d.start + d.count) * u;
      null !== s && (p = Math.max(p, s.start * u), f = Math.min(f, (s.start + s.count) * u)), null !== l ? (p = Math.max(p, 0), f = Math.min(f, l.count)) : null != h && (p = Math.max(p, 0), f = Math.min(f, h.count));
      const m = f - p;
      if (m < 0 || m === 1 / 0) return;
      let M;
      qe.setup(a, i, c, n, l);
      let _ = Ye;
      if (null !== l && (M = xe.get(l), _ = We, _.setIndex(M)), a.isMesh) !0 === i.wireframe ? (ve.setLineWidth(i.wireframeLinewidth * be()), _.setMode(Ue.LINES)) : _.setMode(Ue.TRIANGLES);else if (a.isLine) {
        let e = i.linewidth;
        void 0 === e && (e = 1), ve.setLineWidth(e * be()), a.isLineSegments ? _.setMode(Ue.LINES) : a.isLineLoop ? _.setMode(Ue.LINE_LOOP) : _.setMode(Ue.LINE_STRIP);
      } else a.isPoints ? _.setMode(Ue.POINTS) : a.isSprite && _.setMode(Ue.TRIANGLES);
      if (a.isBatchedMesh) {
        if (ye.get("WEBGL_multi_draw")) _.renderMultiDraw(a._multiDrawStarts, a._multiDrawCounts, a._multiDrawCount);else {
          const e = a._multiDrawStarts,
            t = a._multiDrawCounts,
            n = a._multiDrawCount,
            r = l ? xe.get(l).bytesPerElement : 1,
            s = Se.get(i).currentProgram.getUniforms();
          for (let i = 0; i < n; i++) s.setValue(Ue, "_gl_DrawID", i), _.render(e[i] / r, t[i]);
        }
      } else if (a.isInstancedMesh) _.renderInstances(p, m, a.count);else if (n.isInstancedBufferGeometry) {
        const e = void 0 !== n._maxInstanceCount ? n._maxInstanceCount : 1 / 0,
          t = Math.min(n.instanceCount, e);
        _.renderInstances(p, m, t);
      } else _.render(p, m);
    }, this.compile = function (e, t, n = null) {
      null === n && (n = e), C = Ne.get(n), C.init(t), P.push(C), n.traverseVisible(function (e) {
        e.isLight && e.layers.test(t.layers) && (C.pushLight(e), e.castShadow && C.pushShadow(e));
      }), e !== n && e.traverseVisible(function (e) {
        e.isLight && e.layers.test(t.layers) && (C.pushLight(e), e.castShadow && C.pushShadow(e));
      }), C.setupLights();
      const r = new Set();
      return e.traverse(function (e) {
        if (!(e.isMesh || e.isPoints || e.isLine || e.isSprite)) return;
        const t = e.material;
        if (t) if (Array.isArray(t)) for (let i = 0; i < t.length; i++) {
          const a = t[i];
          $e(a, n, e), r.add(a);
        } else $e(t, n, e), r.add(t);
      }), C = P.pop(), r;
    }, this.compileAsync = function (e, t, n = null) {
      const r = this.compile(e, t, n);
      return new Promise(t => {
        function n() {
          r.forEach(function (e) {
            Se.get(e).currentProgram.isReady() && r.delete(e);
          }), 0 !== r.size ? setTimeout(n, 10) : t(e);
        }
        null !== ye.get("KHR_parallel_shader_compile") ? n() : setTimeout(n, 10);
      });
    };
    let Ze = null;
    function et() {
      nt.stop();
    }
    function tt() {
      nt.start();
    }
    const nt = new i();
    function rt(e, t, n, r) {
      if (!1 === e.visible) return;
      if (e.layers.test(t.layers)) if (e.isGroup) n = e.renderOrder;else if (e.isLOD) !0 === e.autoUpdate && e.update(t);else if (e.isLightProbeGrid) C.pushLightProbeGrid(e);else if (e.isLight) C.pushLight(e), e.castShadow && C.pushShadow(e);else if (e.isSprite) {
        if (!e.frustumCulled || frustum.intersectsSprite(e)) {
          r && _e.setFromMatrixPosition(e.matrixWorld).applyMatrix4(me);
          const t = ze.update(e),
            i = e.material;
          i.visible && x.push(e, t, i, n, _e.z, null);
        }
      } else if ((e.isMesh || e.isLine || e.isPoints) && (!e.frustumCulled || frustum.intersectsObject(e))) {
        const t = ze.update(e),
          i = e.material;
        if (r && (void 0 !== e.boundingSphere ? (null === e.boundingSphere && e.computeBoundingSphere(), _e.copy(e.boundingSphere.center)) : (null === t.boundingSphere && t.computeBoundingSphere(), _e.copy(t.boundingSphere.center)), _e.applyMatrix4(e.matrixWorld).applyMatrix4(me)), Array.isArray(i)) {
          const r = t.groups;
          for (let a = 0, s = r.length; a < s; a++) {
            const s = r[a],
              o = i[s.materialIndex];
            o && o.visible && x.push(e, t, o, n, _e.z, s);
          }
        } else i.visible && x.push(e, t, i, n, _e.z, null);
      }
      const i = e.children;
      for (let e = 0, a = i.length; e < a; e++) rt(i[e], t, n, r);
    }
    function it(e, t, n, r) {
      const {
        opaque: opaque,
        transmissive: transmissive,
        transparent: transparent
      } = e;
      C.setupLightsView(n), !0 === pe && Ie.setGlobalState(F.clippingPlanes, n), r && ve.viewport(vector4.copy(r)), opaque.length > 0 && st(opaque, t, n), transmissive.length > 0 && st(transmissive, t, n), transparent.length > 0 && st(transparent, t, n), ve.buffers.depth.setTest(!0), ve.buffers.depth.setMask(!0), ve.buffers.color.setMask(!0), ve.setPolygonOffset(!1);
    }
    function at(e, t, n, i) {
      if (null !== (!0 === n.isScene ? n.overrideMaterial : null)) return;
      if (void 0 === C.state.transmissionRenderTarget[i.id]) {
        const e = ye.has("EXT_color_buffer_half_float") || ye.has("EXT_color_buffer_float");
        C.state.transmissionRenderTarget[i.id] = new ThreeCore.WebGLRenderTarget(1, 1, {
          generateMipmaps: !0,
          type: e ? ThreeCore.HalfFloatType : ThreeCore.UnsignedByteType,
          minFilter: ThreeCore.LinearMipmapLinearFilter,
          samples: Math.max(4, Le.samples),
          stencilBuffer: o,
          resolveDepthBuffer: !1,
          resolveStencilBuffer: !1,
          colorSpace: ThreeCore.ColorManagement.workingColorSpace
        });
      }
      const a = C.state.transmissionRenderTarget[i.id],
        s = i.viewport || vector4;
      a.setSize(s.z * F.transmissionResolutionScale, s.w * F.transmissionResolutionScale);
      const c = F.getRenderTarget(),
        l = F.getActiveCubeFace(),
        u = F.getActiveMipmapLevel();
      F.setRenderTarget(a), F.getClearColor(ne), re = F.getClearAlpha(), re < 1 && F.setClearColor(16777215, .5), F.clear(), ge && ke.render(n);
      const d = F.toneMapping;
      F.toneMapping = ThreeCore.NoToneMapping;
      const h = i.viewport;
      if (void 0 !== i.viewport && (i.viewport = void 0), C.setupLightsView(i), !0 === pe && Ie.setGlobalState(F.clippingPlanes, i), st(e, n, i), we.updateMultisampleRenderTarget(a), we.updateRenderTargetMipmap(a), !1 === ye.has("WEBGL_multisampled_render_to_texture")) {
        let e = !1;
        for (let a = 0, s = t.length; a < s; a++) {
          const s = t[a],
            {
              object: object,
              geometry: geometry,
              material: material,
              group: group
            } = s;
          if (material.side === ThreeCore.DoubleSide && object.layers.test(i.layers)) {
            const t = material.side;
            material.side = ThreeCore.BackSide, material.needsUpdate = !0, ot(object, n, i, geometry, material, group), material.side = t, material.needsUpdate = !0, e = !0;
          }
        }
        !0 === e && (we.updateMultisampleRenderTarget(a), we.updateRenderTargetMipmap(a));
      }
      F.setRenderTarget(c, l, u), F.setClearColor(ne, re), void 0 !== h && (i.viewport = h), F.toneMapping = d;
    }
    function st(e, t, n) {
      const r = !0 === t.isScene ? t.overrideMaterial : null;
      for (let i = 0, a = e.length; i < a; i++) {
        const a = e[i],
          {
            object: object,
            geometry: geometry,
            group: group
          } = a;
        let l = a.material;
        !0 === l.allowOverride && null !== r && (l = r), object.layers.test(n.layers) && ot(object, t, n, geometry, l, group);
      }
    }
    function ot(e, t, n, i, a, s) {
      e.onBeforeRender(F, t, n, i, a, s), e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, e.matrixWorld), e.normalMatrix.getNormalMatrix(e.modelViewMatrix), a.onBeforeRender(F, t, n, i, e, s), !0 === a.transparent && a.side === ThreeCore.DoubleSide && !1 === a.forceSinglePass ? (a.side = ThreeCore.BackSide, a.needsUpdate = !0, F.renderBufferDirect(n, t, i, a, e, s), a.side = ThreeCore.FrontSide, a.needsUpdate = !0, F.renderBufferDirect(n, t, i, a, e, s), a.side = ThreeCore.DoubleSide) : F.renderBufferDirect(n, t, i, a, e, s), e.onAfterRender(F, t, n, i, a, s);
    }
    function ct(e, t, n) {
      !0 !== t.isScene && (t = Ae);
      const r = Se.get(e),
        i = C.state.lights,
        a = C.state.shadowsArray,
        s = i.state.version,
        o = Oe.getParameters(e, i.state, a, t, n, C.state.lightProbeGridArray),
        c = Oe.getProgramCacheKey(o);
      let l = r.programs;
      r.environment = e.isMeshStandardMaterial || e.isMeshLambertMaterial || e.isMeshPhongMaterial ? t.environment : null, r.fog = t.fog;
      const u = e.isMeshStandardMaterial || e.isMeshLambertMaterial && !e.envMap || e.isMeshPhongMaterial && !e.envMap;
      r.envMap = Ee.get(e.envMap || r.environment, u), r.envMapRotation = null !== r.environment && null === e.envMap ? t.environmentRotation : e.envMapRotation, void 0 === l && (e.addEventListener("dispose", Je), l = new Map(), r.programs = l);
      let d = l.get(c);
      if (void 0 !== d) {
        if (r.currentProgram === d && r.lightsStateVersion === s) return ut(e, o), d;
      } else o.uniforms = Oe.getUniforms(e), null !== H && e.isNodeMaterial && H.build(e, n, o), e.onBeforeCompile(o, F), d = Oe.acquireProgram(o, c), l.set(c, d), r.uniforms = o.uniforms;
      const h = r.uniforms;
      return (e.isShaderMaterial || e.isRawShaderMaterial) && !0 !== e.clipping || (h.clippingPlanes = Ie.uniform), ut(e, o), r.needsLights = function (e) {
        return e.isMeshLambertMaterial || e.isMeshToonMaterial || e.isMeshPhongMaterial || e.isMeshStandardMaterial || e.isShadowMaterial || e.isShaderMaterial && !0 === e.lights;
      }(e), r.lightsStateVersion = s, r.needsLights && (h.ambientLightColor.value = i.state.ambient, h.lightProbe.value = i.state.probe, h.directionalLights.value = i.state.directional, h.directionalLightShadows.value = i.state.directionalShadow, h.spotLights.value = i.state.spot, h.spotLightShadows.value = i.state.spotShadow, h.rectAreaLights.value = i.state.rectArea, h.ltc_1.value = i.state.rectAreaLTC1, h.ltc_2.value = i.state.rectAreaLTC2, h.pointLights.value = i.state.point, h.pointLightShadows.value = i.state.pointShadow, h.hemisphereLights.value = i.state.hemi, h.directionalShadowMatrix.value = i.state.directionalShadowMatrix, h.spotLightMatrix.value = i.state.spotLightMatrix, h.spotLightMap.value = i.state.spotLightMap, h.pointShadowMatrix.value = i.state.pointShadowMatrix), r.lightProbeGrid = C.state.lightProbeGridArray.length > 0, r.currentProgram = d, r.uniformsList = null, d;
    }
    function lt(e) {
      if (null === e.uniformsList) {
        const t = e.currentProgram.getUniforms();
        e.uniformsList = WebGLUniforms.seqWithValue(t.seq, e.uniforms);
      }
      return e.uniformsList;
    }
    function ut(e, t) {
      const n = Se.get(e);
      n.outputColorSpace = t.outputColorSpace, n.batching = t.batching, n.batchingColor = t.batchingColor, n.instancing = t.instancing, n.instancingColor = t.instancingColor, n.instancingMorph = t.instancingMorph, n.skinning = t.skinning, n.morphTargets = t.morphTargets, n.morphNormals = t.morphNormals, n.morphColors = t.morphColors, n.morphTargetsCount = t.morphTargetsCount, n.numClippingPlanes = t.numClippingPlanes, n.numIntersection = t.numClipIntersection, n.vertexAlphas = t.vertexAlphas, n.vertexTangents = t.vertexTangents, n.toneMapping = t.toneMapping;
    }
    nt.setAnimationLoop(function (e) {
      Ze && Ze(e);
    }), "undefined" != typeof self && nt.setContext(self), this.setAnimationLoop = function (e) {
      Ze = e, je.setAnimationLoop(e), null === e ? nt.stop() : nt.start();
    }, je.addEventListener("sessionstart", et), je.addEventListener("sessionend", tt), this.render = function (e, t) {
      if (void 0 !== t && !0 !== t.isCamera) return void (0, ThreeCore.error)("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
      if (!0 === q) return;
      null !== H && H.renderStart(e, t);
      const n = !0 === je.enabled && !0 === je.isPresenting,
        i = null !== W && (null === K || n) && W.begin(F, K);
      if (!0 === e.matrixWorldAutoUpdate && e.updateMatrixWorld(), null === t.parent && !0 === t.matrixWorldAutoUpdate && t.updateMatrixWorld(), !0 !== je.enabled || !0 !== je.isPresenting || null !== W && !1 !== W.isCompositing() || (!0 === je.cameraAutoUpdate && je.updateCamera(t), t = je.getCamera()), !0 === e.isScene && e.onBeforeRender(F, e, t, K), C = Ne.get(e, P.length), C.init(t), C.state.textureUnits = we.getTextureUnits(), P.push(C), me.multiplyMatrices(t.projectionMatrix, t.matrixWorldInverse), frustum.setFromProjectionMatrix(me, ThreeCore.WebGLCoordinateSystem, t.reversedDepth), fe = this.localClippingEnabled, pe = Ie.init(this.clippingPlanes, fe), x = De.get(e, z.length), x.init(), z.push(x), !0 === je.enabled && !0 === je.isPresenting) {
        const e = F.xr.getDepthSensingMesh();
        null !== e && rt(e, t, -1 / 0, F.sortObjects);
      }
      rt(e, t, 0, F.sortObjects), x.finish(), !0 === F.sortObjects && x.sort(oe, ce, t.reversedDepth), ge = !1 === je.enabled || !1 === je.isPresenting || !1 === je.hasDepthSensing(), ge && ke.addToRenderList(x, e), this.info.render.frame++, !0 === this.info.autoReset && this.info.reset(), !0 === pe && Ie.beginShadows();
      const a = C.state.shadowsArray;
      Re.render(a, e, t), !0 === pe && Ie.endShadows();
      if (!1 === (i && W.hasRenderPass())) {
        const n = x.opaque,
          r = x.transmissive;
        if (C.setupLights(), t.isArrayCamera) {
          const i = t.cameras;
          if (r.length > 0) for (let t = 0, a = i.length; t < a; t++) {
            at(n, r, e, i[t]);
          }
          ge && ke.render(e);
          for (let t = 0, n = i.length; t < n; t++) {
            const n = i[t];
            it(x, e, n, n.viewport);
          }
        } else r.length > 0 && at(n, r, e, t), ge && ke.render(e), it(x, e, t);
      }
      null !== K && 0 === V && (we.updateMultisampleRenderTarget(K), we.updateRenderTargetMipmap(K)), i && W.end(F), !0 === e.isScene && e.onAfterRender(F, e, t), qe.resetDefaultState(), J = -1, $ = null, P.pop(), P.length > 0 ? (C = P[P.length - 1], we.setTextureUnits(C.state.textureUnits), !0 === pe && Ie.setGlobalState(F.clippingPlanes, C.state.camera)) : C = null, z.pop(), x = z.length > 0 ? z[z.length - 1] : null, null !== H && H.renderEnd();
    }, this.getActiveCubeFace = function () {
      return j;
    }, this.getActiveMipmapLevel = function () {
      return V;
    }, this.getRenderTarget = function () {
      return K;
    }, this.setRenderTargetTextures = function (e, t, n) {
      const r = Se.get(e);
      r.__autoAllocateDepthBuffer = !1 === e.resolveDepthBuffer, !1 === r.__autoAllocateDepthBuffer && (r.__useRenderToTexture = !1), Se.get(e.texture).__webglTexture = t, Se.get(e.depthTexture).__webglTexture = r.__autoAllocateDepthBuffer ? void 0 : n, r.__hasExternalTextures = !0;
    }, this.setRenderTargetFramebuffer = function (e, t) {
      const n = Se.get(e);
      n.__webglFramebuffer = t, n.__useDefaultFramebuffer = void 0 === t;
    }, this.setRenderTarget = function (e, t = 0, n = 0) {
      K = e, j = t, V = n;
      let r = null,
        i = !1,
        a = !1;
      if (e) {
        const s = Se.get(e);
        if (void 0 !== s.__useDefaultFramebuffer) return ve.bindFramebuffer(Ue.FRAMEBUFFER, s.__webglFramebuffer), vector4.copy(e.viewport), ee.copy(e.scissor), te = e.scissorTest, ve.viewport(vector4), ve.scissor(ee), ve.setScissorTest(te), void (J = -1);
        if (void 0 === s.__webglFramebuffer) we.setupRenderTarget(e);else if (s.__hasExternalTextures) we.rebindTextures(e, Se.get(e.texture).__webglTexture, Se.get(e.depthTexture).__webglTexture);else if (e.depthBuffer) {
          const t = e.depthTexture;
          if (s.__boundDepthTexture !== t) {
            if (null !== t && Se.has(t) && (e.width !== t.image.width || e.height !== t.image.height)) throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");
            we.setupDepthRenderbuffer(e);
          }
        }
        const o = e.texture;
        (o.isData3DTexture || o.isDataArrayTexture || o.isCompressedArrayTexture) && (a = !0);
        const c = Se.get(e).__webglFramebuffer;
        e.isWebGLCubeRenderTarget ? (r = Array.isArray(c[t]) ? c[t][n] : c[t], i = !0) : r = e.samples > 0 && !1 === we.useMultisampledRTT(e) ? Se.get(e).__webglMultisampledFramebuffer : Array.isArray(c) ? c[n] : c, vector4.copy(e.viewport), ee.copy(e.scissor), te = e.scissorTest;
      } else vector4.copy(le).multiplyScalar(se).floor(), ee.copy(ue).multiplyScalar(se).floor(), te = de;
      0 !== n && (r = U);
      if (ve.bindFramebuffer(Ue.FRAMEBUFFER, r) && ve.drawBuffers(e, r), ve.viewport(vector4), ve.scissor(ee), ve.setScissorTest(te), i) {
        const r = Se.get(e.texture);
        Ue.framebufferTexture2D(Ue.FRAMEBUFFER, Ue.COLOR_ATTACHMENT0, Ue.TEXTURE_CUBE_MAP_POSITIVE_X + t, r.__webglTexture, n);
      } else if (a) {
        const r = t;
        for (let t = 0; t < e.textures.length; t++) {
          const i = Se.get(e.textures[t]);
          Ue.framebufferTextureLayer(Ue.FRAMEBUFFER, Ue.COLOR_ATTACHMENT0 + t, i.__webglTexture, n, r);
        }
      } else if (null !== e && 0 !== n) {
        const t = Se.get(e.texture);
        Ue.framebufferTexture2D(Ue.FRAMEBUFFER, Ue.COLOR_ATTACHMENT0, Ue.TEXTURE_2D, t.__webglTexture, n);
      }
      J = -1;
    }, this.readRenderTargetPixels = function (e, t, n, i, a, s, o, c = 0) {
      if (!e || !e.isWebGLRenderTarget) return void (0, ThreeCore.error)("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let l = Se.get(e).__webglFramebuffer;
      if (e.isWebGLCubeRenderTarget && void 0 !== o && (l = l[o]), l) {
        ve.bindFramebuffer(Ue.FRAMEBUFFER, l);
        try {
          const o = e.textures[c],
            l = o.format,
            u = o.type;
          if (e.textures.length > 1 && Ue.readBuffer(Ue.COLOR_ATTACHMENT0 + c), !Le.textureFormatReadable(l)) return void (0, ThreeCore.error)("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
          if (!Le.textureTypeReadable(u)) return void (0, ThreeCore.error)("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
          t >= 0 && t <= e.width - i && n >= 0 && n <= e.height - a && Ue.readPixels(t, n, i, a, Fe.convert(l), Fe.convert(u), s);
        } finally {
          const e = null !== K ? Se.get(K).__webglFramebuffer : null;
          ve.bindFramebuffer(Ue.FRAMEBUFFER, e);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function (e, t, n, i, a, s, o, c = 0) {
      if (!e || !e.isWebGLRenderTarget) throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let l = Se.get(e).__webglFramebuffer;
      if (e.isWebGLCubeRenderTarget && void 0 !== o && (l = l[o]), l) {
        if (t >= 0 && t <= e.width - i && n >= 0 && n <= e.height - a) {
          ve.bindFramebuffer(Ue.FRAMEBUFFER, l);
          const o = e.textures[c],
            u = o.format,
            d = o.type;
          if (e.textures.length > 1 && Ue.readBuffer(Ue.COLOR_ATTACHMENT0 + c), !Le.textureFormatReadable(u)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
          if (!Le.textureTypeReadable(d)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
          const h = Ue.createBuffer();
          Ue.bindBuffer(Ue.PIXEL_PACK_BUFFER, h), Ue.bufferData(Ue.PIXEL_PACK_BUFFER, s.byteLength, Ue.STREAM_READ), Ue.readPixels(t, n, i, a, Fe.convert(u), Fe.convert(d), 0);
          const p = null !== K ? Se.get(K).__webglFramebuffer : null;
          ve.bindFramebuffer(Ue.FRAMEBUFFER, p);
          const f = Ue.fenceSync(Ue.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return Ue.flush(), await (0, ThreeCore.probeAsync)(Ue, f, 4), Ue.bindBuffer(Ue.PIXEL_PACK_BUFFER, h), Ue.getBufferSubData(Ue.PIXEL_PACK_BUFFER, 0, s), Ue.deleteBuffer(h), Ue.deleteSync(f), s;
        }
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
      }
    }, this.copyFramebufferToTexture = function (e, t = null, n = 0) {
      const r = Math.pow(2, -n),
        i = Math.floor(e.image.width * r),
        a = Math.floor(e.image.height * r),
        s = null !== t ? t.x : 0,
        o = null !== t ? t.y : 0;
      we.setTexture2D(e, 0), Ue.copyTexSubImage2D(Ue.TEXTURE_2D, n, 0, 0, s, o, i, a), ve.unbindTexture();
    }, this.copyTextureToTexture = function (e, t, n = null, r = null, i = 0, a = 0) {
      let s, o, c, l, u, d, h, p, f;
      const m = e.isCompressedTexture ? e.mipmaps[a] : e.image;
      if (null !== n) s = n.max.x - n.min.x, o = n.max.y - n.min.y, c = n.isBox3 ? n.max.z - n.min.z : 1, l = n.min.x, u = n.min.y, d = n.isBox3 ? n.min.z : 0;else {
        const t = Math.pow(2, -i);
        s = Math.floor(m.width * t), o = Math.floor(m.height * t), c = e.isDataArrayTexture ? m.depth : e.isData3DTexture ? Math.floor(m.depth * t) : 1, l = 0, u = 0, d = 0;
      }
      null !== r ? (h = r.x, p = r.y, f = r.z) : (h = 0, p = 0, f = 0);
      const M = Fe.convert(t.format),
        _ = Fe.convert(t.type);
      let A;
      t.isData3DTexture ? (we.setTexture3D(t, 0), A = Ue.TEXTURE_3D) : t.isDataArrayTexture || t.isCompressedArrayTexture ? (we.setTexture2DArray(t, 0), A = Ue.TEXTURE_2D_ARRAY) : (we.setTexture2D(t, 0), A = Ue.TEXTURE_2D), ve.activeTexture(Ue.TEXTURE0), ve.pixelStorei(Ue.UNPACK_FLIP_Y_WEBGL, t.flipY), ve.pixelStorei(Ue.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultiplyAlpha), ve.pixelStorei(Ue.UNPACK_ALIGNMENT, t.unpackAlignment);
      const g = ve.getParameter(Ue.UNPACK_ROW_LENGTH),
        b = ve.getParameter(Ue.UNPACK_IMAGE_HEIGHT),
        y = ve.getParameter(Ue.UNPACK_SKIP_PIXELS),
        L = ve.getParameter(Ue.UNPACK_SKIP_ROWS),
        v = ve.getParameter(Ue.UNPACK_SKIP_IMAGES);
      ve.pixelStorei(Ue.UNPACK_ROW_LENGTH, m.width), ve.pixelStorei(Ue.UNPACK_IMAGE_HEIGHT, m.height), ve.pixelStorei(Ue.UNPACK_SKIP_PIXELS, l), ve.pixelStorei(Ue.UNPACK_SKIP_ROWS, u), ve.pixelStorei(Ue.UNPACK_SKIP_IMAGES, d);
      const T = e.isDataArrayTexture || e.isData3DTexture,
        S = t.isDataArrayTexture || t.isData3DTexture;
      if (e.isDepthTexture) {
        const n = Se.get(e),
          r = Se.get(t),
          m = Se.get(n.__renderTarget),
          M = Se.get(r.__renderTarget);
        ve.bindFramebuffer(Ue.READ_FRAMEBUFFER, m.__webglFramebuffer), ve.bindFramebuffer(Ue.DRAW_FRAMEBUFFER, M.__webglFramebuffer);
        for (let n = 0; n < c; n++) T && (Ue.framebufferTextureLayer(Ue.READ_FRAMEBUFFER, Ue.COLOR_ATTACHMENT0, Se.get(e).__webglTexture, i, d + n), Ue.framebufferTextureLayer(Ue.DRAW_FRAMEBUFFER, Ue.COLOR_ATTACHMENT0, Se.get(t).__webglTexture, a, f + n)), Ue.blitFramebuffer(l, u, s, o, h, p, s, o, Ue.DEPTH_BUFFER_BIT, Ue.NEAREST);
        ve.bindFramebuffer(Ue.READ_FRAMEBUFFER, null), ve.bindFramebuffer(Ue.DRAW_FRAMEBUFFER, null);
      } else if (0 !== i || e.isRenderTargetTexture || Se.has(e)) {
        const n = Se.get(e),
          r = Se.get(t);
        ve.bindFramebuffer(Ue.READ_FRAMEBUFFER, G), ve.bindFramebuffer(Ue.DRAW_FRAMEBUFFER, X);
        for (let e = 0; e < c; e++) T ? Ue.framebufferTextureLayer(Ue.READ_FRAMEBUFFER, Ue.COLOR_ATTACHMENT0, n.__webglTexture, i, d + e) : Ue.framebufferTexture2D(Ue.READ_FRAMEBUFFER, Ue.COLOR_ATTACHMENT0, Ue.TEXTURE_2D, n.__webglTexture, i), S ? Ue.framebufferTextureLayer(Ue.DRAW_FRAMEBUFFER, Ue.COLOR_ATTACHMENT0, r.__webglTexture, a, f + e) : Ue.framebufferTexture2D(Ue.DRAW_FRAMEBUFFER, Ue.COLOR_ATTACHMENT0, Ue.TEXTURE_2D, r.__webglTexture, a), 0 !== i ? Ue.blitFramebuffer(l, u, s, o, h, p, s, o, Ue.COLOR_BUFFER_BIT, Ue.NEAREST) : S ? Ue.copyTexSubImage3D(A, a, h, p, f + e, l, u, s, o) : Ue.copyTexSubImage2D(A, a, h, p, l, u, s, o);
        ve.bindFramebuffer(Ue.READ_FRAMEBUFFER, null), ve.bindFramebuffer(Ue.DRAW_FRAMEBUFFER, null);
      } else S ? e.isDataTexture || e.isData3DTexture ? Ue.texSubImage3D(A, a, h, p, f, s, o, c, M, _, m.data) : t.isCompressedArrayTexture ? Ue.compressedTexSubImage3D(A, a, h, p, f, s, o, c, M, m.data) : Ue.texSubImage3D(A, a, h, p, f, s, o, c, M, _, m) : e.isDataTexture ? Ue.texSubImage2D(Ue.TEXTURE_2D, a, h, p, s, o, M, _, m.data) : e.isCompressedTexture ? Ue.compressedTexSubImage2D(Ue.TEXTURE_2D, a, h, p, m.width, m.height, M, m.data) : Ue.texSubImage2D(Ue.TEXTURE_2D, a, h, p, s, o, M, _, m);
      ve.pixelStorei(Ue.UNPACK_ROW_LENGTH, g), ve.pixelStorei(Ue.UNPACK_IMAGE_HEIGHT, b), ve.pixelStorei(Ue.UNPACK_SKIP_PIXELS, y), ve.pixelStorei(Ue.UNPACK_SKIP_ROWS, L), ve.pixelStorei(Ue.UNPACK_SKIP_IMAGES, v), 0 === a && t.generateMipmaps && Ue.generateMipmap(A), ve.unbindTexture();
    }, this.initRenderTarget = function (e) {
      void 0 === Se.get(e).__webglFramebuffer && we.setupRenderTarget(e);
    }, this.initTexture = function (e) {
      e.isCubeTexture ? we.setTextureCube(e, 0) : e.isData3DTexture ? we.setTexture3D(e, 0) : e.isDataArrayTexture || e.isCompressedArrayTexture ? we.setTexture2DArray(e, 0) : we.setTexture2D(e, 0), ve.unbindTexture();
    }, this.resetState = function () {
      j = 0, V = 0, K = null, ve.reset(), qe.reset();
    }, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
      detail: this
    }));
  }
  get coordinateSystem() {
    return ThreeCore.WebGLCoordinateSystem;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(outputColorSpace) {
    this._outputColorSpace = outputColorSpace;
    const t = this.getContext();
    t.drawingBufferColorSpace = ThreeCore.ColorManagement._getDrawingBufferColorSpace(outputColorSpace), t.unpackColorSpace = ThreeCore.ColorManagement._getUnpackColorSpace();
  }
}
export { ACESFilmicToneMapping } from "./core.js";
export { AddEquation } from "./core.js";
export { AddOperation } from "./core.js";
export { AdditiveAnimationBlendMode } from "./core.js";
export { AdditiveBlending } from "./core.js";
export { AgXToneMapping } from "./core.js";
export { AlphaFormat } from "./core.js";
export { AlwaysCompare } from "./core.js";
export { AlwaysDepth } from "./core.js";
export { AlwaysStencilFunc } from "./core.js";
export { AmbientLight } from "./core.js";
export { AnimationAction } from "./core.js";
export { AnimationClip } from "./core.js";
export { AnimationLoader } from "./core.js";
export { AnimationMixer } from "./core.js";
export { AnimationObjectGroup } from "./core.js";
export { AnimationUtils } from "./core.js";
export { ArcCurve } from "./core.js";
export { ArrayCamera } from "./core.js";
export { ArrowHelper } from "./core.js";
export { AttachedBindMode } from "./core.js";
export { Audio } from "./core.js";
export { AudioAnalyser } from "./core.js";
export { AudioContext } from "./core.js";
export { AudioListener } from "./core.js";
export { AudioLoader } from "./core.js";
export { AxesHelper } from "./core.js";
export { BackSide } from "./core.js";
export { BasicDepthPacking } from "./core.js";
export { BasicShadowMap } from "./core.js";
export { BatchedMesh } from "./core.js";
export { BezierInterpolant } from "./core.js";
export { Bone } from "./core.js";
export { BooleanKeyframeTrack } from "./core.js";
export { Box2 } from "./core.js";
export { Box3 } from "./core.js";
export { Box3Helper } from "./core.js";
export { BoxGeometry } from "./core.js";
export { BoxHelper } from "./core.js";
export { BufferAttribute } from "./core.js";
export { BufferGeometry } from "./core.js";
export { BufferGeometryLoader } from "./core.js";
export { ByteType } from "./core.js";
export { Cache } from "./core.js";
export { Camera } from "./core.js";
export { CameraHelper } from "./core.js";
export { CanvasTexture } from "./core.js";
export { CapsuleGeometry } from "./core.js";
export { CatmullRomCurve3 } from "./core.js";
export { CineonToneMapping } from "./core.js";
export { CircleGeometry } from "./core.js";
export { ClampToEdgeWrapping } from "./core.js";
export { Clock } from "./core.js";
export { Color } from "./core.js";
export { ColorKeyframeTrack } from "./core.js";
export { ColorManagement } from "./core.js";
export { Compatibility } from "./core.js";
export { CompressedArrayTexture } from "./core.js";
export { CompressedCubeTexture } from "./core.js";
export { CompressedTexture } from "./core.js";
export { CompressedTextureLoader } from "./core.js";
export { ConeGeometry } from "./core.js";
export { ConstantAlphaFactor } from "./core.js";
export { ConstantColorFactor } from "./core.js";
export { Controls } from "./core.js";
export { CubeCamera } from "./core.js";
export { CubeDepthTexture } from "./core.js";
export { CubeReflectionMapping } from "./core.js";
export { CubeRefractionMapping } from "./core.js";
export { CubeTexture } from "./core.js";
export { CubeTextureLoader } from "./core.js";
export { CubeUVReflectionMapping } from "./core.js";
export { CubicBezierCurve } from "./core.js";
export { CubicBezierCurve3 } from "./core.js";
export { CubicInterpolant } from "./core.js";
export { CullFaceBack } from "./core.js";
export { CullFaceFront } from "./core.js";
export { CullFaceFrontBack } from "./core.js";
export { CullFaceNone } from "./core.js";
export { Curve } from "./core.js";
export { CurvePath } from "./core.js";
export { CustomBlending } from "./core.js";
export { CustomToneMapping } from "./core.js";
export { CylinderGeometry } from "./core.js";
export { Cylindrical } from "./core.js";
export { Data3DTexture } from "./core.js";
export { DataArrayTexture } from "./core.js";
export { DataTexture } from "./core.js";
export { DataTextureLoader } from "./core.js";
export { DataUtils } from "./core.js";
export { DecrementStencilOp } from "./core.js";
export { DecrementWrapStencilOp } from "./core.js";
export { DefaultLoadingManager } from "./core.js";
export { DepthFormat } from "./core.js";
export { DepthStencilFormat } from "./core.js";
export { DepthTexture } from "./core.js";
export { DetachedBindMode } from "./core.js";
export { DirectionalLight } from "./core.js";
export { DirectionalLightHelper } from "./core.js";
export { DiscreteInterpolant } from "./core.js";
export { DodecahedronGeometry } from "./core.js";
export { DoubleSide } from "./core.js";
export { DstAlphaFactor } from "./core.js";
export { DstColorFactor } from "./core.js";
export { DynamicCopyUsage } from "./core.js";
export { DynamicDrawUsage } from "./core.js";
export { DynamicReadUsage } from "./core.js";
export { EdgesGeometry } from "./core.js";
export { EllipseCurve } from "./core.js";
export { EqualCompare } from "./core.js";
export { EqualDepth } from "./core.js";
export { EqualStencilFunc } from "./core.js";
export { EquirectangularReflectionMapping } from "./core.js";
export { EquirectangularRefractionMapping } from "./core.js";
export { Euler } from "./core.js";
export { EventDispatcher } from "./core.js";
export { ExternalTexture } from "./core.js";
export { ExtrudeGeometry } from "./core.js";
export { FileLoader } from "./core.js";
export { Float16BufferAttribute } from "./core.js";
export { Float32BufferAttribute } from "./core.js";
export { FloatType } from "./core.js";
export { Fog } from "./core.js";
export { FogExp2 } from "./core.js";
export { FramebufferTexture } from "./core.js";
export { FrontSide } from "./core.js";
export { Frustum } from "./core.js";
export { FrustumArray } from "./core.js";
export { GLBufferAttribute } from "./core.js";
export { GLSL1 } from "./core.js";
export { GLSL3 } from "./core.js";
export { GreaterCompare } from "./core.js";
export { GreaterDepth } from "./core.js";
export { GreaterEqualCompare } from "./core.js";
export { GreaterEqualDepth } from "./core.js";
export { GreaterEqualStencilFunc } from "./core.js";
export { GreaterStencilFunc } from "./core.js";
export { GridHelper } from "./core.js";
export { Group } from "./core.js";
export { HTMLTexture } from "./core.js";
export { HalfFloatType } from "./core.js";
export { HemisphereLight } from "./core.js";
export { HemisphereLightHelper } from "./core.js";
export { IcosahedronGeometry } from "./core.js";
export { ImageBitmapLoader } from "./core.js";
export { ImageLoader } from "./core.js";
export { ImageUtils } from "./core.js";
export { IncrementStencilOp } from "./core.js";
export { IncrementWrapStencilOp } from "./core.js";
export { InstancedBufferAttribute } from "./core.js";
export { InstancedBufferGeometry } from "./core.js";
export { InstancedInterleavedBuffer } from "./core.js";
export { InstancedMesh } from "./core.js";
export { Int16BufferAttribute } from "./core.js";
export { Int32BufferAttribute } from "./core.js";
export { Int8BufferAttribute } from "./core.js";
export { IntType } from "./core.js";
export { InterleavedBuffer } from "./core.js";
export { InterleavedBufferAttribute } from "./core.js";
export { Interpolant } from "./core.js";
export { InterpolateBezier } from "./core.js";
export { InterpolateDiscrete } from "./core.js";
export { InterpolateLinear } from "./core.js";
export { InterpolateSmooth } from "./core.js";
export { InterpolationSamplingMode } from "./core.js";
export { InterpolationSamplingType } from "./core.js";
export { InvertStencilOp } from "./core.js";
export { KeepStencilOp } from "./core.js";
export { KeyframeTrack } from "./core.js";
export { LOD } from "./core.js";
export { LatheGeometry } from "./core.js";
export { Layers } from "./core.js";
export { LessCompare } from "./core.js";
export { LessDepth } from "./core.js";
export { LessEqualCompare } from "./core.js";
export { LessEqualDepth } from "./core.js";
export { LessEqualStencilFunc } from "./core.js";
export { LessStencilFunc } from "./core.js";
export { Light } from "./core.js";
export { LightProbe } from "./core.js";
export { Line } from "./core.js";
export { Line3 } from "./core.js";
export { LineBasicMaterial } from "./core.js";
export { LineCurve } from "./core.js";
export { LineCurve3 } from "./core.js";
export { LineDashedMaterial } from "./core.js";
export { LineLoop } from "./core.js";
export { LineSegments } from "./core.js";
export { LinearFilter } from "./core.js";
export { LinearInterpolant } from "./core.js";
export { LinearMipMapLinearFilter } from "./core.js";
export { LinearMipMapNearestFilter } from "./core.js";
export { LinearMipmapLinearFilter } from "./core.js";
export { LinearMipmapNearestFilter } from "./core.js";
export { LinearSRGBColorSpace } from "./core.js";
export { LinearToneMapping } from "./core.js";
export { LinearTransfer } from "./core.js";
export { Loader } from "./core.js";
export { LoaderUtils } from "./core.js";
export { LoadingManager } from "./core.js";
export { LoopOnce } from "./core.js";
export { LoopPingPong } from "./core.js";
export { LoopRepeat } from "./core.js";
export { MOUSE } from "./core.js";
export { Material } from "./core.js";
export { MaterialBlending } from "./core.js";
export { MaterialLoader } from "./core.js";
export { MathUtils } from "./core.js";
export { Matrix2 } from "./core.js";
export { Matrix3 } from "./core.js";
export { Matrix4 } from "./core.js";
export { MaxEquation } from "./core.js";
export { Mesh } from "./core.js";
export { MeshBasicMaterial } from "./core.js";
export { MeshDepthMaterial } from "./core.js";
export { MeshDistanceMaterial } from "./core.js";
export { MeshLambertMaterial } from "./core.js";
export { MeshMatcapMaterial } from "./core.js";
export { MeshNormalMaterial } from "./core.js";
export { MeshPhongMaterial } from "./core.js";
export { MeshPhysicalMaterial } from "./core.js";
export { MeshStandardMaterial } from "./core.js";
export { MeshToonMaterial } from "./core.js";
export { MinEquation } from "./core.js";
export { MirroredRepeatWrapping } from "./core.js";
export { MixOperation } from "./core.js";
export { MultiplyBlending } from "./core.js";
export { MultiplyOperation } from "./core.js";
export { NearestFilter } from "./core.js";
export { NearestMipMapLinearFilter } from "./core.js";
export { NearestMipMapNearestFilter } from "./core.js";
export { NearestMipmapLinearFilter } from "./core.js";
export { NearestMipmapNearestFilter } from "./core.js";
export { NeutralToneMapping } from "./core.js";
export { NeverCompare } from "./core.js";
export { NeverDepth } from "./core.js";
export { NeverStencilFunc } from "./core.js";
export { NoBlending } from "./core.js";
export { NoColorSpace } from "./core.js";
export { NoNormalPacking } from "./core.js";
export { NoToneMapping } from "./core.js";
export { NormalAnimationBlendMode } from "./core.js";
export { NormalBlending } from "./core.js";
export { NormalGAPacking } from "./core.js";
export { NormalRGPacking } from "./core.js";
export { NotEqualCompare } from "./core.js";
export { NotEqualDepth } from "./core.js";
export { NotEqualStencilFunc } from "./core.js";
export { NumberKeyframeTrack } from "./core.js";
export { Object3D } from "./core.js";
export { ObjectLoader } from "./core.js";
export { ObjectSpaceNormalMap } from "./core.js";
export { OctahedronGeometry } from "./core.js";
export { OneFactor } from "./core.js";
export { OneMinusConstantAlphaFactor } from "./core.js";
export { OneMinusConstantColorFactor } from "./core.js";
export { OneMinusDstAlphaFactor } from "./core.js";
export { OneMinusDstColorFactor } from "./core.js";
export { OneMinusSrcAlphaFactor } from "./core.js";
export { OneMinusSrcColorFactor } from "./core.js";
export { OrthographicCamera } from "./core.js";
export { PCFShadowMap } from "./core.js";
export { PCFSoftShadowMap } from "./core.js";
export { PMREMGenerator };
export { Path } from "./core.js";
export { PerspectiveCamera } from "./core.js";
export { Plane } from "./core.js";
export { PlaneGeometry } from "./core.js";
export { PlaneHelper } from "./core.js";
export { PointLight } from "./core.js";
export { PointLightHelper } from "./core.js";
export { Points } from "./core.js";
export { PointsMaterial } from "./core.js";
export { PolarGridHelper } from "./core.js";
export { PolyhedronGeometry } from "./core.js";
export { PositionalAudio } from "./core.js";
export { PropertyBinding } from "./core.js";
export { PropertyMixer } from "./core.js";
export { QuadraticBezierCurve } from "./core.js";
export { QuadraticBezierCurve3 } from "./core.js";
export { Quaternion } from "./core.js";
export { QuaternionKeyframeTrack } from "./core.js";
export { QuaternionLinearInterpolant } from "./core.js";
export { R11_EAC_Format } from "./core.js";
export { RED_GREEN_RGTC2_Format } from "./core.js";
export { RED_RGTC1_Format } from "./core.js";
export { REVISION } from "./core.js";
export { RG11_EAC_Format } from "./core.js";
export { RGBADepthPacking } from "./core.js";
export { RGBAFormat } from "./core.js";
export { RGBAIntegerFormat } from "./core.js";
export { RGBA_ASTC_10x10_Format } from "./core.js";
export { RGBA_ASTC_10x5_Format } from "./core.js";
export { RGBA_ASTC_10x6_Format } from "./core.js";
export { RGBA_ASTC_10x8_Format } from "./core.js";
export { RGBA_ASTC_12x10_Format } from "./core.js";
export { RGBA_ASTC_12x12_Format } from "./core.js";
export { RGBA_ASTC_4x4_Format } from "./core.js";
export { RGBA_ASTC_5x4_Format } from "./core.js";
export { RGBA_ASTC_5x5_Format } from "./core.js";
export { RGBA_ASTC_6x5_Format } from "./core.js";
export { RGBA_ASTC_6x6_Format } from "./core.js";
export { RGBA_ASTC_8x5_Format } from "./core.js";
export { RGBA_ASTC_8x6_Format } from "./core.js";
export { RGBA_ASTC_8x8_Format } from "./core.js";
export { RGBA_BPTC_Format } from "./core.js";
export { RGBA_ETC2_EAC_Format } from "./core.js";
export { RGBA_PVRTC_2BPPV1_Format } from "./core.js";
export { RGBA_PVRTC_4BPPV1_Format } from "./core.js";
export { RGBA_S3TC_DXT1_Format } from "./core.js";
export { RGBA_S3TC_DXT3_Format } from "./core.js";
export { RGBA_S3TC_DXT5_Format } from "./core.js";
export { RGBDepthPacking } from "./core.js";
export { RGBFormat } from "./core.js";
export { RGBIntegerFormat } from "./core.js";
export { RGB_BPTC_SIGNED_Format } from "./core.js";
export { RGB_BPTC_UNSIGNED_Format } from "./core.js";
export { RGB_ETC1_Format } from "./core.js";
export { RGB_ETC2_Format } from "./core.js";
export { RGB_PVRTC_2BPPV1_Format } from "./core.js";
export { RGB_PVRTC_4BPPV1_Format } from "./core.js";
export { RGB_S3TC_DXT1_Format } from "./core.js";
export { RGDepthPacking } from "./core.js";
export { RGFormat } from "./core.js";
export { RGIntegerFormat } from "./core.js";
export { RawShaderMaterial } from "./core.js";
export { Ray } from "./core.js";
export { Raycaster } from "./core.js";
export { RectAreaLight } from "./core.js";
export { RedFormat } from "./core.js";
export { RedIntegerFormat } from "./core.js";
export { ReinhardToneMapping } from "./core.js";
export { RenderTarget } from "./core.js";
export { RenderTarget3D } from "./core.js";
export { RepeatWrapping } from "./core.js";
export { ReplaceStencilOp } from "./core.js";
export { ReverseSubtractEquation } from "./core.js";
export { RingGeometry } from "./core.js";
export { SIGNED_R11_EAC_Format } from "./core.js";
export { SIGNED_RED_GREEN_RGTC2_Format } from "./core.js";
export { SIGNED_RED_RGTC1_Format } from "./core.js";
export { SIGNED_RG11_EAC_Format } from "./core.js";
export { SRGBColorSpace } from "./core.js";
export { SRGBTransfer } from "./core.js";
export { Scene } from "./core.js";
export { ShaderChunk };
export { ShaderLib };
export { ShaderMaterial } from "./core.js";
export { ShadowMaterial } from "./core.js";
export { Shape } from "./core.js";
export { ShapeGeometry } from "./core.js";
export { ShapePath } from "./core.js";
export { ShapeUtils } from "./core.js";
export { ShortType } from "./core.js";
export { Skeleton } from "./core.js";
export { SkeletonHelper } from "./core.js";
export { SkinnedMesh } from "./core.js";
export { Source } from "./core.js";
export { Sphere } from "./core.js";
export { SphereGeometry } from "./core.js";
export { Spherical } from "./core.js";
export { SphericalHarmonics3 } from "./core.js";
export { SplineCurve } from "./core.js";
export { SpotLight } from "./core.js";
export { SpotLightHelper } from "./core.js";
export { Sprite } from "./core.js";
export { SpriteMaterial } from "./core.js";
export { SrcAlphaFactor } from "./core.js";
export { SrcAlphaSaturateFactor } from "./core.js";
export { SrcColorFactor } from "./core.js";
export { StaticCopyUsage } from "./core.js";
export { StaticDrawUsage } from "./core.js";
export { StaticReadUsage } from "./core.js";
export { StereoCamera } from "./core.js";
export { StreamCopyUsage } from "./core.js";
export { StreamDrawUsage } from "./core.js";
export { StreamReadUsage } from "./core.js";
export { StringKeyframeTrack } from "./core.js";
export { SubtractEquation } from "./core.js";
export { SubtractiveBlending } from "./core.js";
export { TOUCH } from "./core.js";
export { TangentSpaceNormalMap } from "./core.js";
export { TetrahedronGeometry } from "./core.js";
export { Texture } from "./core.js";
export { TextureLoader } from "./core.js";
export { TextureUtils } from "./core.js";
export { Timer } from "./core.js";
export { TimestampQuery } from "./core.js";
export { TorusGeometry } from "./core.js";
export { TorusKnotGeometry } from "./core.js";
export { Triangle } from "./core.js";
export { TriangleFanDrawMode } from "./core.js";
export { TriangleStripDrawMode } from "./core.js";
export { TrianglesDrawMode } from "./core.js";
export { TubeGeometry } from "./core.js";
export { UVMapping } from "./core.js";
export { Uint16BufferAttribute } from "./core.js";
export { Uint32BufferAttribute } from "./core.js";
export { Uint8BufferAttribute } from "./core.js";
export { Uint8ClampedBufferAttribute } from "./core.js";
export { Uniform } from "./core.js";
export { UniformsGroup } from "./core.js";
export { UniformsLib };
export { UniformsUtils } from "./core.js";
export { UnsignedByteType } from "./core.js";
export { UnsignedInt101111Type } from "./core.js";
export { UnsignedInt248Type } from "./core.js";
export { UnsignedInt5999Type } from "./core.js";
export { UnsignedIntType } from "./core.js";
export { UnsignedShort4444Type } from "./core.js";
export { UnsignedShort5551Type } from "./core.js";
export { UnsignedShortType } from "./core.js";
export { VSMShadowMap } from "./core.js";
export { Vector2 } from "./core.js";
export { Vector3 } from "./core.js";
export { Vector4 } from "./core.js";
export { VectorKeyframeTrack } from "./core.js";
export { VideoFrameTexture } from "./core.js";
export { VideoTexture } from "./core.js";
export { WebGL3DRenderTarget } from "./core.js";
export { WebGLArrayRenderTarget } from "./core.js";
export { WebGLCoordinateSystem } from "./core.js";
export { WebGLCubeRenderTarget };
export { WebGLRenderTarget } from "./core.js";
export { WebGLRenderer };
export { WebGLUtils };
export { WebGPUCoordinateSystem } from "./core.js";
export { WebXRController } from "./core.js";
export { WireframeGeometry } from "./core.js";
export { WrapAroundEnding } from "./core.js";
export { ZeroCurvatureEnding } from "./core.js";
export { ZeroFactor } from "./core.js";
export { ZeroSlopeEnding } from "./core.js";
export { ZeroStencilOp } from "./core.js";
export { createCanvasElement } from "./core.js";
export { error } from "./core.js";
export { getConsoleFunction } from "./core.js";
export { log } from "./core.js";
export { setConsoleFunction } from "./core.js";
export { warn } from "./core.js";
export { warnOnce } from "./core.js";
