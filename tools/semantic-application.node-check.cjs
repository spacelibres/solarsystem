const fs=require('node:fs'),assert=require('node:assert/strict'),test=require('node:test'),p=require('@babel/parser'),tr=require('@babel/traverse').default,g=require('@babel/generator').default,crypto=require('node:crypto');
function canonical(source){const ast=p.parse(source,{sourceType:'module'});let index=0;const bindings=[];tr(ast,{Scope(path){for(const binding of Object.values(path.scope.bindings))if(!bindings.includes(binding))bindings.push(binding);}});for(const b of bindings)b.scope.rename(b.identifier.name,'semanticBinding'+index++);return crypto.createHash('sha256').update(g(ast,{comments:false,compact:true}).code).digest('hex');}
const baseline={
  "eyes/src/app/SolarSystemApp.js": "4d102028d1b679d4305a392f422c3d3db8f20d98a7c303f51440711145a70a8c",
  "eyes/src/ui/components/BaseComponent.js": "d517494c78928e4365a715f195e7ac185b03ea94e26d3d29b14b20889de37c51",
  "eyes/src/ui/views/BaseView.js": "308d11bb656bb5460dbc2579ee3cc94dc394b8f814e0964edeb2dccaf7fde939",
  "eyes/src/ui/views/CompareView.js": "a59752b5168e74a7d48532d33229fec099e748ac7ef190819645f2f7378f0f5d",
  "eyes/src/ui/views/DistanceView.js": "f61ead034d1c77ffe8ab10fd67e0e21c74bccd79b49ab3fd94c3c94edcefcb63",
  "eyes/src/ui/views/EventView.js": "c1cab5e740cc5c80ff4eb08e669ef09026505057eea6006de3f2c6a1f95dd18b",
  "eyes/src/ui/views/ExtendedBaseView.js": "40da0fa1464fe9944dc99e7b75897529f575f76d4311f070e502be449294751f",
  "eyes/src/ui/views/FeatureView.js": "e9c76e1fc854ac889cea5905d039374a7e157f572a16acaa21788d8fac72320c",
  "eyes/src/ui/views/HomeView.js": "19a013e6175bffe1f405e25e469989fcd15ee4945eba3bf0e5c8f13e67a8272c",
  "eyes/src/ui/views/ObjectView.js": "2ce48382d5dcaf6aa85420d8078bfca1144c807ea6e8ef26e27fd9de234a2a45",
  "eyes/src/ui/views/StoryView.js": "2ea4663daa4f6bc9189787f22473ff3faaec66fe689a934ba3406a24946b5ca7",
  "eyes/src/ui/views/TelescopeView.js": "7f98ecd148b5bd472bdcdb9535659aef3730ea229537b094578e9b4719716450"
};
Object.assign(baseline,{
  "eyes/src/ui/components/Breadcrumb.js": "346e4503f32893bbfdca97f220095fe725334f28843d824cf0b9b90702a3ef83",
  "eyes/src/ui/components/ButtonsBlock.js": "ea0f064f729ecb38962c2ed78a9a32b6efde4e2cdf9d08b2ca42f0eec66e2cf9",
  "eyes/src/ui/components/CameraViewBlock.js": "2040d506d9a217d37940d9e1dfe4adc8f42e9165dc29095c31713803bcb8ca98",
  "eyes/src/ui/components/Carousel.js": "81d982bc7edeb53ce3b5d545d96f833fcbd89158031027f33bdc03ee6e9841a0",
  "eyes/src/ui/components/CarouselPanel.js": "0a148b2ff1b80b8c3601636a0022055af87ce6d453d66c85f9b55e15751f33e6",
  "eyes/src/ui/components/Checkbox.js": "fe5f0c8fc657074cc08549c01add193b10d09d0cdd2492ea59a76fbcbd4c4ee5",
  "eyes/src/ui/components/CheckboxBlock.js": "db8b7c2f895c4b45932df2ff84209b8129c0cbf7f14b0c218da3136fa97a68d7",
  "eyes/src/ui/components/CheckboxMultistate.js": "c2018569fbcbf7b1e8ce0b33a541b822fd370670db3364444a5a5b0d35bbe485",
  "eyes/src/ui/components/Clock.js": "4121b06255690f8d2160e7623134ea3cab5bd4c4c24ba5cd0a85ad5338350227",
  "eyes/src/ui/components/ClockShortcut.js": "67aac3660a26fb6ef99ab1d64de5a4cdac28f4892d999c4b3801caf80d35c4ec",
  "eyes/src/ui/components/CollapsibleMenu.js": "05cd15940d0b826a977825f6599e1bdbec1109912f7e074038b05312730101ed",
  "eyes/src/ui/components/CollapsibleMenuItem.js": "857a494e0bbd98c5601bb798ee6161895f80369c5fe7e383f928aaf00dbd390b",
  "eyes/src/ui/components/Comparison.js": "68ec8db98fa11fe0749adc85316319ab81eee3f81a4293c09931685fd419c131",
  "eyes/src/ui/components/ContentPanel.js": "1d0b81081b55d1eae59716332e3c4ee69ee53d62b4918d3f04a9f9469b6da8b1",
  "eyes/src/ui/components/DescriptionBlock-1005.js": "5b1601de291c9e9dbe2a3bba00ea4da475e6efcd6fa83eed28e796895522f8d8",
  "eyes/src/ui/components/DescriptionBlock-541.js": "83ea874608452c560bcbabf9756a12f640ccbd407b6d1c34748540af1e1bb199",
  "eyes/src/ui/components/DistancePanel.js": "1b68f9699aa2afa7edfa55447b2970491eebbd9e00a932e16be36152af5f8eb0",
  "eyes/src/ui/components/EventsBlock.js": "fabdf0eda470f97ed275994b58cc605c8382b9bea0661a5bc31c86e4c14a5373",
  "eyes/src/ui/components/EventsTimeline.js": "2ae9eec1e097c781fe7017e7e180aa641a44785248ba8f09cab7209aa93ec62f",
  "eyes/src/ui/components/ExplorationBlock.js": "bac5ae150fb6688a15a06ffb7d99ca2720927bb2985f39d3a4b0cfb74159565c",
  "eyes/src/ui/components/FeaturedEventsBlock.js": "542340de26e6038effddfbba4bafbfb20342eb90ac0c16b0b71785d27a72c2d8",
  "eyes/src/ui/components/FeaturedMoonsBlock.js": "115bcbb25cb0b8ca1a9a61b2244cbdd23d97bc74783f0efd864a4c265c00f05f",
  "eyes/src/ui/components/FeaturedStoriesPanel.js": "358ad9e3b9b236ff3ce4da616c5c97106641a2777ba60c1dcec3e5d2d0aceee2",
  "eyes/src/ui/components/FeaturedStoryBlock.js": "d23f1d6771fd94cffffaffe75a2cd856516844d80cc29c52ff5b54474aada69e",
  "eyes/src/ui/components/FeaturesBlock.js": "6c5f8333a17ee0e9ae7c04d1498ae6cc8cffddc445b291b4d5a57d5f6959337f",
  "eyes/src/ui/components/HintBlock.js": "ed472c075a81c2853669b05d219af4e4df98f9cfae10e60d82e5bf0407ed7d5c",
  "eyes/src/ui/components/ImageBlock.js": "092352aff2c1defc48be8ddd3a35eb0b9fe3cee9b7eb7ccf70e8c5b1f296bd7e",
  "eyes/src/ui/components/InfoPanel.js": "3717367a9c28b81b192f198a849fcf9bef460be655eed6c1d863773b02404187",
  "eyes/src/ui/components/InstrumentFOVBlock.js": "a9a2b0ab2fc6a32d7c07cf141584f51bb9732c0ec1dad5b37f5d60263b90b8f7",
  "eyes/src/ui/components/KioskBase.js": "0672196b5404a89881c13c44bfbb84bc81241293e163aebd3f14defb1c2acc85",
  "eyes/src/ui/components/LayerPanel.js": "de765145c0d34ecf5325f2b3dab035a16da560689d612c5ff0c336f296519fb6",
  "eyes/src/ui/components/LayersBlock.js": "ce5bb8924cc8f16809645dae826d88b1d05fc8be89c406e06b0a35e4c481d9cb",
  "eyes/src/ui/components/LoadIcon.js": "348258bc752117611bb67298e719d5e87764fb6f16f037f61f23fabbe8d532bb",
  "eyes/src/ui/components/Menu.js": "16c4042cffa61483fe83cf97cb4171abdcd11a14d9d59f41be52762226b4c749",
  "eyes/src/ui/components/MobileExpandButton.js": "9b2f38d08d2e64e677c72485216e940220772fe06baa4503fbbfcd057c837a03",
  "eyes/src/ui/components/Overlay.js": "91e39de21e60660a0f95089cbb6012080ff74cccc831c2d40fa7712c2eb19a2d",
  "eyes/src/ui/components/OverviewBlock.js": "ce143bb40af3798d853a13669f91c8621e02a21a161a275f4d09d8ebf68123f9",
  "eyes/src/ui/components/RelatedBlock.js": "9a8b347324b841be451aa47b7147808166678dbed4aeaa9379a30038fe590270",
  "eyes/src/ui/components/ReplayBlock.js": "61bf15d1c4b39ef4168c4dee72d557d8129e1360c2f52f32be47c2372716af7b",
  "eyes/src/ui/components/ReplayButtonBlock.js": "93ce2e89b75b01034fa0b5257f9c71aa7c766ad11ce1b8cee73bb90799526b01",
  "eyes/src/ui/components/Search.js": "0977b33b07663537d814810bbee03a068692d0b7331b6411985a908bd73b6e94",
  "eyes/src/ui/components/Settings.js": "1b07117ac664e159f1e39ac30c24904f88581aa35a4007fee943868a05212dd3",
  "eyes/src/ui/components/ShareModal.js": "29603adabaa4762127bbe3be8263d6b5ed584126b1ed959f9c05ec62ed12ce08",
  "eyes/src/ui/components/SpecialFeaturesBlock.js": "c633bededb7d97b0a0a7d5fb3b9e13386d4139493fa725d6735ba0851bccdccb",
  "eyes/src/ui/components/SurfaceMapBlock.js": "5af0be0969c40f11d529205eda1b801da03da943671e89d289f9747404e68c3f",
  "eyes/src/ui/components/Telescope.js": "1359ea6fe02255e81fcc43228f6fca6cf07dfe65221012fba95ac82c7783d8d3",
  "eyes/src/ui/components/TextureQualityBlock.js": "eaba6e012f19788e773b2b4065fd4390d00bc5aceafd78b4621ebadf7073425f",
  "eyes/src/ui/components/TimeControls.js": "5699c74bee069cbf96c4c0f98177d01bac915e4e00874b41ad1276d251b9301f",
  "eyes/src/ui/components/TitleBlock.js": "308e424a87a4b9d95f9202d2202633fabf82bd38ebd0640dacf90b93446dfd0e",
  "eyes/src/ui/components/Toast.js": "08dcb299c706bfea93a8b6a914d7f8d773f3b8d096fd816cc22cbaa2106e6cfd",
  "eyes/src/ui/components/ToggleBlock.js": "607a58b5797664b0e471938328f8d7a15187522a5e8f677d83fbf8780e587524",
  "eyes/src/ui/components/ToolboxBlock.js": "978afed23f78120aad8a2e36e3b84d192ae8120b2e2d43637040baa76fba6281",
  "eyes/src/ui/components/TutorialOverlay.js": "68ae1dcdc4e703ae7e31c16a4801e802f04b962820088b2f6fd6de3da92c968f"
});
Object.assign(baseline,{
  "eyes/src/engine/core/BaseApp.js": "b77d482f2977ab03c8694c716c32423f073cf20e10658ad4bdd31c7645d26c93",
  "eyes/src/engine/core/BaseContentBlock.js": "130ec6c000f3760ff9b5626439486a9966acc2613e191f1802af973672c78725",
  "eyes/src/engine/core/StoryBaseContentBlock.js": "b5196cc4e14fc03d1c1efc6ff357cea1034b4b4b17471b4b4ba83e90af735a32",
  "eyes/src/engine/core/Story.js": "f45ab435c80b63dc8ad8cdb2d9a5bcf2735df52b3e39ed32e6adf39cc48d783c",
  "eyes/src/engine/core/AppUtils.js": "de40d89d84c18ae90b888dc63b5dcfa2545709aaa04e3777011efb95a5c25d0d",
  "eyes/src/engine/core/CameraScripts.js": "5f8e6d8cb820114d37b9ab748a32e3a17d9e2a42cfa11ff35b1a95fc89d27947",
  "eyes/src/engine/core/Cameras.js": "9fe7804a78208eff956a164e69070ea121d6b50cb2ecd9d847edbf2c524aeb0e",
  "eyes/src/engine/core/CarouselEntry.js": "cded3d1a95fde2816dc2e92a66afa176a8f78ca228e782d1500b5227e5ee896b",
  "eyes/src/engine/core/CarouselPanelEntry.js": "13da7bcad7b18e66a7cf4cc59aae0d76c997b84e974cbc8ac744e5fbe0e7a3bf",
  "eyes/src/engine/core/CheckboxMultistate.js": "887ceec46ae401402a2c96bc2cd2b86b301c3e6fd565a8f6bccbe55dcd2878f5",
  "eyes/src/engine/core/ClockEntry.js": "c74f5a0e788dc13de416b6697e00bd6999360ec3aa5ebcca67b9dbd66021c702",
  "eyes/src/engine/core/ClockShortcutEntry.js": "bd72209020df51719fe8940c13eaa6376bbe320b8b197436aed11c013d097862",
  "eyes/src/engine/core/Entity-567.js": "f069dc5ef07d7c629a3e34a8304e3f765b7f6778a220083e06e25dfda9c8e060",
  "eyes/src/engine/core/EntityEntry-699.js": "2d42ee696f75a3d703a983366cc61d406b041dbddda4f26ba5a130520b982949",
  "eyes/src/engine/core/EntityEntry-700.js": "f3d0d9ace8f842f12f0d7f8a813940e49cb7c0a8c075621a5d7731c8aff17b61",
  "eyes/src/engine/core/EntityEntry-702.js": "ff8b361bdb8484e0c4e0b6cb4d79d620c653ad193ee6692e08dad52880800973",
  "eyes/src/engine/core/EntityEntry-706.js": "294d6463cca7887b11a14393adc32eb6487560e154f28cc49aaf1c890ebdf6a3",
  "eyes/src/engine/core/EntityItem.js": "c41f27bd026633b1443bc7801afad7b4627bd03a23aaf704b2bacfe8a79bfcfb",
  "eyes/src/engine/core/Features.js": "9331ac5c08247d1ad6f51114f32dc69dd823ce0da9d7248872333b417b74b9f2",
  "eyes/src/engine/core/KioskMode.js": "e4b5433a3c550653353a17334c20ccb3e1debce2d89fb1837270e71172ca3666",
  "eyes/src/engine/core/LabelQuadtree.js": "a9557bd23787bca9bb90331e8947ef2c9c8708e762549be5a855a25c408046cd",
  "eyes/src/engine/core/LoadIconEntry.js": "ab700099fd2cfc8cbfc9cd21c390a45eaa77148ec8d8a2cad9d3cb3c16f19286",
  "eyes/src/engine/core/OptionsBlock.js": "d31d766f714becbbf46b9b6119e6a6aaf68d5a56fd5c492687f32db1ee05a5c2",
  "eyes/src/engine/core/OverlayEntry.js": "596220e2bb4a81ef3afa560b2e08449813ce4fc4d69134d4ee8208a4b08ca94e",
  "eyes/src/engine/core/Parenting.js": "bac0d03ce4405143fb841eaffa318511fcd805726542d99eaa87aa81a789a60d",
  "eyes/src/engine/core/Placemarks.js": "0e8987ba8ff74c3f481f272ecf7197ecca4ce06c791e5c97a5b1eb378704776d",
  "eyes/src/engine/core/Search.js": "d967a2981d417064643e38f263c92e42f041c2777011d3e2e12edab8a77d2c8c",
  "eyes/src/engine/core/SearchEntry.js": "537c0036c6bbc5461713edfee604ee3b73a7f8c5d1c731d4becfe3d8865da5a9",
  "eyes/src/engine/core/Settings.js": "61937280b5fc0310a6d44a3d0eced67bc3e19cf66955640db5cee21999478cab",
  "eyes/src/engine/core/SettingsEntry.js": "e92f608b1f1efdb120068e02478b5a3550ef1d6ae674cfd21d98de64d8b200ae",
  "eyes/src/engine/core/ShareModalEntry.js": "6be54d769f854331dd0d256fbcf83c44d17f072c912c3f1ae3bad3a2140b5015",
  "eyes/src/engine/core/TimeControllerEntry.js": "f7442bdecfa912f38bcba5574eeab0974bf6dce61c2e5adceaf29b9c422a6482",
  "eyes/src/engine/core/TutorialOverlayEntry.js": "e91c499e8028c9802038c2036b0f9a3a062aac159250d56cf8d417e72df5f68d",
  "eyes/src/engine/core/Unidentified1069.js": "3c5c8106d460c5bb3e4c7d1b52ce1f4ace32d532fec9978dbbdb4f17605557f4"
});
Object.assign(baseline,{
  "eyes/src/engine/managers/AutoplayManager.js": "13fbcd660b46888848d903c87f251195f15f9539a86c1604eb6187f4badd7db4",
  "eyes/src/engine/managers/BaseManager.js": "318318ac36a444641565447944058cfae97155e97aecc428e307627f211176df",
  "eyes/src/engine/managers/CameraFollowManager.js": "e44badc30ac4d7091eeeddd42b6f87d07574bfba0b59629c3af8815feaba6c81",
  "eyes/src/engine/managers/CameraManager.js": "ebef712c28900ece4e4aa295f8ba99bc95a800051b15a69cbafafbefee26583d",
  "eyes/src/engine/managers/ComparisonManager.js": "f7a33cb7329c128ecfc8c3df97d3336e1bf3ca654e55418783c7c8de822a1b71",
  "eyes/src/engine/managers/ContentManager.js": "ce4781047a495e1ea55dba57acfc83532a652b54291ae0a149c2667ce123b89e",
  "eyes/src/engine/managers/DistanceManager.js": "91bb83b2edfb28f9090e8fb8494f57815530436bfee8939d9ada8a254dfe7133",
  "eyes/src/engine/managers/ERTManager.js": "582384c3daffefe0dfb803b70d8abc6d99651d364f68c74f8127849c943b7f2d",
  "eyes/src/engine/managers/LabelManager-563.js": "280fcffa22cb39e2067806b7097c4c0cd3aaf270fff28439fc1168386949e1ab",
  "eyes/src/engine/managers/LabelManager-924.js": "0fbee7c91f89ba3874aa0450d914aea147362f341a1ddc49ba61ab9101ab0b21",
  "eyes/src/engine/managers/LayerManager.js": "d28ca45516df3e215187f820a820e2f76892282d843a77b6b9654d02ab82fb44",
  "eyes/src/engine/managers/LinkManager.js": "7467039df6da2a617fdc5d25b0406d6cfc5e3692fb3c976405b79bcc210e549b",
  "eyes/src/engine/managers/MaterialManager.js": "505a14ae4b9adc561e9b63410897ebafb12342c8226dc1d9d5293b0f1d125656",
  "eyes/src/engine/managers/RouteManager.js": "30862159ccaca837bd9638ce6acf2717aa08d566a954933bcb2af2407dbfb39b",
  "eyes/src/engine/managers/SceneManager.js": "f41da29bc28442fb9388f0d17cc19c1d4260b3bd7a43052d90f83ce1414a0870",
  "eyes/src/engine/managers/SearchManager.js": "75815f3ca5883ebf3bf7d6a549a6b08a6b0357d63eaa70622f8e89208fc78a3d",
  "eyes/src/engine/managers/SelectionManager-562.js": "8e83d973b40f0c4e80ad6c92950f510bf449410ce192ebfa74e62ac1b3bece34",
  "eyes/src/engine/managers/SelectionManager-925.js": "9e1139fabd7abecc61218293f550d83cdb86108972b497db0d8d3390fd6cce8d",
  "eyes/src/engine/managers/SpoutManager.js": "26f2d1a428bef38527d6298a4a8be08adf2049094714707b841a879c774e65e0",
  "eyes/src/engine/managers/TimeManager-728.js": "4f2f6733cb80cc8cf54bbbe9887dd9a91cbaeb8a9df2300990eb2c9d2b04d1a7",
  "eyes/src/engine/managers/TimeManager-922.js": "e329de769e54a3f4cded7342293259a5205c1d3a95b09c29b8c55e89a72017a2",
  "eyes/src/engine/managers/TitleManager.js": "02e7c9c33740dc6302875d73b856e9ef8810800b790d43b3ee511129f753c7d4",
  "eyes/src/engine/managers/TrailManager.js": "65e4ae837f3956abc34685870e458158cc07f01c4b404ab05f20c35b0f68f306",
  "eyes/src/engine/managers/TrajectoryManager.js": "662a09d824431159b091ec9879884afe8082fcd59a03984d796eb06500d47d5e",
  "eyes/src/engine/managers/WMTSManager.js": "dfffec808f85ed010c49d4f73387a3971a9b9eadf510fa3bfbf0692a46f8941d"
});
for(const [file,hash] of Object.entries(baseline))test(file+' preserves binding-normalized executable AST and has readable bindings',()=>{const source=fs.readFileSync(file,'utf8');assert.equal(canonical(source),hash);const ast=p.parse(source,{sourceType:'module'});const short=[];tr(ast,{Scope(path){for(const b of Object.values(path.scope.bindings))if((b.identifier.name.length<=2&&!['id','to'].includes(b.identifier.name))||/^[A-Za-z_$]\d+$/.test(b.identifier.name))short.push(b.identifier.name+':'+b.identifier.loc.start.line)}});assert.deepEqual(short,[]);assert.ok(!source.includes('@eyes-analysis'));});

function loadClass(file, className, dependencies) {
  const ast = p.parse(fs.readFileSync(file, 'utf8'), { sourceType: 'module' });
  ast.program.body = ast.program.body.filter(node => node.type !== 'ImportDeclaration' && node.type !== 'ExportNamedDeclaration');
  return require('node:vm').runInNewContext(g(ast, { comments: false }).code + '\n' + className, dependencies);
}
test('BaseComponent batches changed state and skips unchanged render callbacks', () => {
  const BaseComponent = loadClass('eyes/src/ui/components/BaseComponent.js', 'BaseComponent', { EyesPublicApi: { AppUtils: { isEmptyObject: state => Object.keys(state).length === 0 } } });
  const component = new BaseComponent({}, null, { params: {}, config: {}, count: 1 });
  const renders = [];
  let callbacks = 0;
  component._render = updates => renders.push({ ...updates });
  component.setState({ count: 1 }, () => callbacks++);
  assert.equal(renders.length, 0);
  component.setState({ count: 2, label: 'Earth' }, () => callbacks++);
  assert.deepEqual(renders, [{ count: 2, label: 'Earth' }]);
  assert.equal(component._oldState.count, 1);
  assert.equal(component.getState('count'), 2);
  assert.equal(callbacks, 1);
  component.setState({}, () => callbacks++);
  assert.equal(callbacks, 1);
});
test('BaseComponent callback registration is deduplicated and removal preserves other subscribers', () => {
  const BaseComponent = loadClass('eyes/src/ui/components/BaseComponent.js', 'BaseComponent', { EyesPublicApi: {} });
  const component = new BaseComponent({}, null);
  const calls = [];
  const first = state => calls.push('first:' + state);
  const second = state => calls.push('second:' + state);
  component.registerCallback('statuschange', first);
  component.registerCallback('statuschange', first);
  component.registerCallback('statuschange', second);
  component.triggerCallbacks('statuschange', [true]);
  assert.deepEqual(calls, ['second:true', 'first:true']);
  component.removeCallback('statuschange', first);
  component.triggerCallbacks('statuschange', [false]);
  assert.equal(calls.at(-1), 'second:false');
});
test('BaseView canceled resource phase does not start time, UI or camera work', async () => {
  const BaseView = loadClass('eyes/src/ui/views/BaseView.js', 'BaseView', { EyesPublicApi: { BaseComponent: class { bindFunctions() {} } } });
  const view = new BaseView({}, null);
  const calls = [];
  const routeParams = { cancelToken: { isCanceled: false } };
  view.before = async () => calls.push('before');
  view._reset = () => calls.push('reset');
  view._updateResources = async params => { calls.push('resources'); params.cancelToken.isCanceled = true; };
  view.processQuery = async () => calls.push('time');
  view._updateComponentsVisibility = async () => calls.push('ui');
  view._updateCamera = async () => calls.push('camera');
  await view.onRouteChange(routeParams);
  assert.deepEqual(calls, ['before', 'reset', 'resources']);
});
test('BaseView always runs after when camera preparation rejects', async () => {
  const BaseView = loadClass('eyes/src/ui/views/BaseView.js', 'BaseView', { EyesPublicApi: { BaseComponent: class { bindFunctions() {} } } });
  const view = new BaseView({}, null);
  const calls = [];
  for (const method of ['before', '_updateResources', 'processQuery', '_updateComponentsVisibility', '_checkReady']) view[method] = async () => {};
  view._reset = () => {};
  view._updateCamera = async () => { throw new Error('camera unavailable'); };
  view.after = async () => calls.push('after');
  await assert.rejects(view.onRouteChange({ cancelToken: { isCanceled: false } }), /camera unavailable/);
  assert.deepEqual(calls, ['after']);
});

test('AppUtils deepClone isolates nested state while preserving callable story hooks', () => {
  const AppUtils = loadClass('eyes/src/engine/core/AppUtils.js', 'AppUtils', {});
  const onEnter = () => 'entered';
  const source = { slides: [{ id: 'slide_1', values: [1, 2], onEnter }] };
  const copy = AppUtils.deepClone(source);
  copy.slides[0].values.push(3);
  assert.deepEqual(source.slides[0].values, [1, 2]);
  assert.equal(copy.slides[0].onEnter, onEnter);
  assert.equal(copy.slides[0].onEnter(), 'entered');
  assert.equal(AppUtils.msToTime(3661007).hour, 1);
  assert.equal(AppUtils.msToTime(3661007).millisecond, 7);
  assert.equal(AppUtils.formatCountdownTime(3600000, 61000), '00:01:01');
});
test('CameraScripts easing retains interpolation factors and returns pooled temporaries', () => {
  const interpolationFactors = [];
  const released = [];
  const position = { lerp: (start, end, factor) => interpolationFactors.push(['position', start, end, factor]) };
  const orientation = { slerp: (start, end, factor) => interpolationFactors.push(['orientation', start, end, factor]) };
  const CameraScripts = loadClass('eyes/src/engine/core/CameraScripts.js', 'CameraScripts', {
    EyesPublicApi: { BaseManager: class {} },
    Pioneer: { Vector3: { pool: { get: () => position, release: value => released.push(value) } }, Quaternion: { pool: { get: () => orientation, release: value => released.push(value) } } }
  });
  const scripts = new CameraScripts({});
  const camera = { setPosition: value => assert.equal(value, position), setOrientation: value => assert.equal(value, orientation) };
  const callbacks = [];
  scripts._onCameraTransition = factor => callbacks.push(factor);
  scripts._easeOutExpoTransition(camera, 'start-position', 'end-position', 'start-orientation', 'end-orientation', 0.5);
  scripts._easeInOutExpoTransition(camera, 'start-position', 'end-position', 'start-orientation', 'end-orientation', 0.25);
  assert.equal(interpolationFactors[0][3], 0.9375);
  assert.equal(interpolationFactors[2][3], 0.03125);
  assert.deepEqual(callbacks, [0.9375, 0.03125]);
  assert.deepEqual(released, [position, orientation, position, orientation]);
});
test('Entity construction removes partial entity and enriches original error', () => {
  const failure = new Error('invalid post creation hook');
  const entity = {};
  const removed = [];
  const scene = { getEntity: () => null, addEntity: name => { assert.equal(name, 'prefix-earth'); return entity; }, removeEntity: value => removed.push(value) };
  const Entity = loadClass('eyes/src/engine/core/Entity-567.js', 'Entity', { Error });
  assert.throws(() => Entity.createFromOptions('earth', { parents: [], postCreateFunction: () => { throw failure; } }, scene, { namePrefix: 'prefix-' }), error => error === failure);
  assert.deepEqual(removed, [entity]);
  assert.equal(failure.message, 'While creating "prefix-earth": invalid post creation hook');
});
test('Parenting ancestor traversal shares a visited set across duplicate parent histories', () => {
  const options = { moon: { parents: [[0, 'earth'], [10, 'earth']] }, earth: { parents: [[0, 'sun']] }, sun: { parents: [[0, 'earth']] } };
  const Parenting = loadClass('eyes/src/engine/core/Parenting.js', 'Parenting', { Entity: { Entity: { getEntityOptions: name => options[name] } } });
  assert.deepEqual([...Parenting.getAllAncestorsOfEntity('moon')], ['earth', 'sun']);
});

test('DistanceManager surface bounds follow the current parent while graphic interpolation remains source-oriented', () => {
  const DistanceManager = loadClass('eyes/src/engine/managers/DistanceManager.js', 'DistanceManager', {
    Eyes: { BaseManager: class {}, AppUtils: { conversionTable: { kmToMi: 0.621371, miToFt: 5280, kmToM: 1000 } } }
  });
  const manager = Object.create(DistanceManager.prototype);
  manager._sourceDistanceEntity = { measurePoint: { radius: 10, position: 'surface' } };
  manager._targetDistanceEntities = [{ measurePoint: { radius: 20, position: 'surface' } }];
  manager.distanceInfo = { centerValue: 100 };
  manager._bpParentIsSource = true;
  assert.equal(manager.getLimitedU(0).limitedU, 0.1);
  assert.equal(manager.getLimitedU(1).limitedU, 0.8);
  assert.equal(manager.getInterpolationU(0.1), 0);
  assert.equal(manager.getInterpolationU(0.8), 1);
  manager._bpParentIsSource = false;
  assert.equal(manager.getLimitedU(0).limitedU, 0.2);
  assert.equal(manager.getLimitedU(1).limitedU, 0.9);
  assert.equal(manager.getInterpolationU(0.2), 1);
  assert.equal(manager.getInterpolationU(0.9), 0);
  const lightTime = manager.calculateLightTime(299792.458 * 3661);
  assert.equal(lightTime.timeHours, 1);
  assert.equal(lightTime.timeMin, 1);
  assert.ok(Math.abs(lightTime.timeSec + lightTime.timeMillisec / 1000 - 1) < 1e-8);
});

test('SceneManager loading keys deduplicate work and complete only after the last owner releases', () => {
  const SceneManager = loadClass('eyes/src/engine/managers/SceneManager.js', 'SceneManager', { EyesPublicApi: { BaseManager: class {} } });
  const manager = Object.create(SceneManager.prototype);
  manager._loadingItems = [];
  const notifications = [];
  manager.triggerCallbacks = (event, args) => notifications.push([event, args]);
  manager.addLoading('earth', 'wmts');
  manager.addLoading('earth', 'wmts');
  manager.addLoading('earth', 'spheroidLOD');
  assert.equal(manager._loadingItems.length, 2);
  manager.removeLoading('earth', 'wmts');
  assert.equal(manager.isLoading, true);
  assert.equal(notifications.filter(([event]) => event === 'loaded').length, 0);
  manager.removeLoading('earth', 'spheroidLOD');
  assert.equal(manager.isLoading, false);
  assert.equal(notifications.at(-1)[0], 'loaded');
});
