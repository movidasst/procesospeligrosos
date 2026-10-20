// npm install --no-save jsdom@26.1.0; node tests/save-matrix-dom.cjs
// Integration checks with DOM and mocked RPCs, no production writes.
const {JSDOM,VirtualConsole}=require('jsdom');
const fs=require('fs'),assert=require('node:assert/strict');
const html=fs.readFileSync(process.argv[2]||'index.html','utf8').replace('<script type="module">','<script>');
const errors=[];
const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
function create(cache,session,sessionKey){return new JSDOM(html,{url:'https://pp.test',runScripts:'dangerously',virtualConsole:vc,beforeParse(w){
 w.scrollTo=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.cloud=[];w.failSave=false;w.delaySave=0;w.calls=0;
 if(cache)for(const [k,v] of Object.entries(cache))w.localStorage.setItem(k,v);
 if(session)w.sessionStorage.setItem(sessionKey,session);
 w.supabase={createClient:()=>({rpc:async(name,args)=>{
 if(name==='catalogos_riesgo_publicos')return{data:['elemento','peligro','energia','evento','consecuencia'].map(tipo=>({tipo,codigo:tipo,nombre:tipo}))};
 if(name==='pp_listar_evaluaciones')return{data:{ok:true,records:JSON.parse(JSON.stringify(w.cloud))}};
 if(name==='pp_guardar_evaluacion'){w.calls++;await new Promise(r=>setTimeout(r,w.delaySave));if(w.failSave)return{error:{message:'Offline'}};w.cloud=w.cloud.filter(r=>r.id!==args.p_record.id).concat(args.p_record);return{data:{ok:true}}}
 return{data:{ok:true}};
 }})};
}})}
(async()=>{
let dom=create(),w=dom.window;
const run=code=>w.eval(code),tick=()=>new Promise(r=>setTimeout(r,30));
run("openApp({token:'test',perfil:{integrante_id:'regression',nombre:'Test'}})");await tick();
run("switchView('evaluate');setCourseStep(6,false)");
assert.equal(await run('saveRecord(true)'),false);assert.equal(run('courseStep'),0);
function fill(){run(`for(const el of document.querySelectorAll('#risk-form [required]')){if(el.tagName==='SELECT'){if(!el.value)el.value=el.options[1]?.value||''}else el.value=el.type==='number'?'2':'Caso de prueba'};for(const id of ['element','hazard','event','consequence'])$(id).selectedIndex=1;syncMethodPanels();updateInitial();updateResidual();setCourseStep(6,false);`)}
fill();run("$('filter-text').value='no-match';window.delaySave=50");
await run('Promise.all([saveRecord(true),saveRecord(true)])');
assert.equal(run('records.length'),1);assert.equal(w.calls,1);assert.equal(w.document.getElementById('matrix-count').textContent,'1 / 1');
assert(w.document.getElementById('view-matrix').classList.contains('active'));
run("editRisk(records[0].id);$('area').value='Área editada'");assert.equal(await run('saveRecord(true)'),true);
assert.equal(run('records.length'),1);assert.equal(w.cloud[0].area,'Área editada');
run("switchView('evaluate');window.failSave=true");fill();await run('saveRecord(true)');
assert.equal(run('records.length'),2);await run('syncFromCloud()');assert.equal(run('records.length'),2);assert.equal(run('getPendingIds().size'),1);
run('window.failSave=false');await run('syncFromCloud()');assert.equal(w.cloud.length,2);assert.equal(run('getPendingIds().size'),0);
const cache={};for(let i=0;i<w.localStorage.length;i++){let k=w.localStorage.key(i);cache[k]=w.localStorage.getItem(k)}
const session=run('JSON.stringify(currentSession)'),sessionKey=run('SESSION_KEY');
dom.window.close();
// Insert session through beforeParse using the actual source constant.
dom=create(cache,session,sessionKey);w=dom.window;await tick();
assert(w.document.getElementById('element').options.length>1);
run("switchView('evaluate');window.failSave=true");fill();run("window.oldSetItem=Storage.prototype.setItem;Storage.prototype.setItem=function(){throw Error('Quota exceeded')}");
assert.equal(await run('saveRecord(true)'),false);assert.equal(w.document.getElementById('scenario').value,'Caso de prueba');
run('Storage.prototype.setItem=window.oldSetItem');
assert.deepEqual(errors,[]);
w.close();console.log('PASS: hidden validation, save/view, double click, edit, offline retention, retry, cached catalogs, total storage/network failure.');
})().catch(e=>{console.error(e);process.exit(1)});
