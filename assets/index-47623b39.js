(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function n(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(r){if(r.ep)return;r.ep=!0;const c=n(r);fetch(r.href,c)}})();const g={tablePlayerPlaceholder:document.getElementById("table-player-placeholder"),tableOpponentPlaceholder:document.getElementById("table-opponent-placeholder"),btnRandomize:document.getElementById("btn-randomize"),btnReset:document.getElementById("btn-reset"),btnRotate:document.getElementById("btn-rotate"),log:document.getElementById("log")},v=(()=>{const u=(t=[],a=!1)=>{let s=document.createElement("tbody");const l=document.createElement("table");return l.appendChild(s),t.forEach((h,m)=>{let A=document.createElement("tr");h.forEach((S,I)=>A.innerHTML+=`<td class="${S.isHit?S.occupant?S.occupant.isSunk()?"sunk":"hit":"mis":""} ${a&&S.occupant?"ship":""}" data-x="${I}" data-y="${m}"></td>`),s.appendChild(A)}),l},e=t=>{t.textContent=""},n=(t,a)=>{e(a),a.appendChild(t)},o=t=>{const a=u(t,!0);n(a,g.tablePlayerPlaceholder)},r=t=>{const a=u(t);n(a,g.tableOpponentPlaceholder)},c=()=>{document.querySelectorAll("td.ship").forEach(a=>{const s=Number(a.dataset.x),l=Number(a.dataset.y);a.classList.add("reserved");for(let h=-1,m=1;h<=1;h++,m--){const A=g.tablePlayerPlaceholder.querySelector(`[data-y="${l}"][data-x="${s+h}"]`),S=g.tablePlayerPlaceholder.querySelector(`[data-y="${l+h}"][data-x="${s}"]`),I=g.tablePlayerPlaceholder.querySelector(`[data-y="${l+h}"][data-x="${s+h}"]`),z=g.tablePlayerPlaceholder.querySelector(`[data-y="${l+m}"][data-x="${s+h}"]`);A&&A.classList.add("reserved"),S&&S.classList.add("reserved"),I&&I.classList.add("reserved"),z&&z.classList.add("reserved")}})},f=()=>{document.querySelectorAll("td.reserved").forEach(t=>t.classList.remove("reserved"))},p=()=>{document.querySelectorAll("td.highlight").forEach(t=>t.classList.remove("highlight"))},y=()=>{document.querySelector(":root").style.setProperty("--clr-highlight","red")},k=()=>{document.querySelector(":root").style.removeProperty("--clr-highlight")},T=(t,a,s,l)=>{p();const h=(m,A)=>{const S=document.querySelector(`[data-x="${A}"][data-y="${m}"]`);S?(S.classList.add("highlight"),k()):y()};if(l==="h")for(let m=0;m<s;m++)h(t,a+m);if(l==="v")for(let m=0;m<s;m++)h(t+m,a)},L=(t,a,s,l)=>{T(t,a,s,l),c()},$=()=>{p(),f()};let P;function b(t,a=0){P&&clearTimeout(P),R();function s(){a<t.length&&(g.log.textContent+=t.charAt(a),a++,P=setTimeout(s,50))}s()}const R=()=>{e(g.log)};function E(){R(),b("Start attacking your opponent 🎯")}return{updateOpponentTable:r,updatePlayerTable:o,logStart:E,logGameOver:(t="")=>{b(`Congrats 🎉. ${t?t.name+" is the winner.":""} click restart button to play again...`)},highlightPlaces:L,removeHighlights:$,logPlace:t=>{b(`There are ${t} ships 🚢 remind. hover on your board to place them.`)},logAttackResult:t=>{if(t.occupant){if(t.occupant.isSunk()){b("Great job. an enemy ship has been sunk ☠️");return}b("You hit a ship tile, keep attacking it 🌊");return}b("missed shot")}}})(),N=u=>{const e=[];return{len:u,hits:e,hit:r=>{e.includes(r)||r>u||r<0||e.push(r)},isSunk:()=>e.length===u}},B=()=>{const e=[5,4,3,3,2];let n=0,o="h",r=Array.from({length:10},i=>Array.from({length:10},t=>({occupant:null,isHit:!1,shipIndex:0})));const c=(i,t,a,s)=>{for(let l=0;l<a;l++)if(s==="v"&&r[i+l][t].occupant||s==="h"&&r[i][t+l].occupant)return!0;return!1},f=(i,t,a,s)=>{if(s==="v"){if(t<0||t>=10||i<0||i+a>10)return!1;for(let l=-1;l<a+1;l++)if(i+l>=0&&i+l<10&&(c(i+l,t,1,"v")||t+1<10&&c(i+l,t+1,1,"v")||t-1>=0&&c(i+l,t-1,1,"v")))return!1}else if(s==="h"){if(t<0||t+a>10||i<0||i>=10)return!1;for(let l=-1;l<a+1;l++)if(t+l>=0&&t+l<10&&(c(i,t+l,1,"h")||i+1<10&&c(i+1,t+l,1,"h")||i-1>=0&&c(i-1,t+l,1,"h")))return!1}return!0},p=(i,t,a,s)=>{if(!f(i,t,a,s))return!1;const l=N(a);if(s==="v")for(let h=0;h<a;h++)r[i+h][t].occupant=l,r[i+h][t].shipIndex=h;else if(s==="h")for(let h=0;h<a;h++)r[i][t+h].occupant=l,r[i][t+h].shipIndex=h;return!0},y=(i,t)=>{const a=r[i][t];return a.isHit===!0?!1:(a.occupant&&a.occupant.hit(a.shipIndex),a.isHit=!0,!0)},k=()=>{o==="h"?o="v":o="h"},T=()=>{e.forEach((i,t)=>{for(;;){const a=["h","v"],s=Math.floor(Math.random()*10),l=Math.floor(Math.random()*10);if(p(l,s,i,a[t%2]))break}})},L=()=>{for(let i=0;i<r.length;i++)for(let t=0;t<r[i].length;t++)if(r[i][t].occupant&&!r[i][t].occupant.isSunk())return!1;return!0},$=()=>{r.forEach((i,t)=>{i.forEach((a,s)=>{r[t][s].occupant=null,r[t][s].isHit=!1,r[t][s].shipIndex=0})})},P=()=>{for(let i=0;i<r.length;i++)for(let t=0;t<r[0].length;t++)if(r[i][t].isHit)return!0;return!1},b=(i,t)=>{n>=E&&(n=0),p(i,t,e[n],o)&&n++},R=()=>{let i=0;for(let t=0;t<r.length;t++)for(let a=0;a<r[0].length;a++)r[t][a].occupant&&r[t][a].shipIndex===0&&i++;return i},E=()=>e.length;return{placeShip:p,board:r,receiveAttack:y,placeShipsRandomly:T,areAllShipsSunk:L,hasReceivedAttack:P,resetBoard:$,toggleDirection:k,placeNextShip:b,isFull:()=>R()===E(),remindShipsCount:()=>e.length-R(),nextShipLength:()=>e[n],nextShipDirection:()=>o}};class x{constructor(e,n){this.name=e,this.gameboard=n,this.shooted=new Set}randomPosition(e=10){return[Math.floor(Math.random()*e),Math.floor(Math.random()*e)]}isAlreadyHit([e,n]){return this.shooted.has(`${e}-${n}`)}randomTarget(e){let n=this.randomPosition(e.length);for(;this.isAlreadyHit(n);)n=this.randomPosition(e.length);return n}attack(e,n){return this.gameboard.receiveAttack(e,n)}randomAttack(){if(this.shooted.size===this.gameboard.board.length*this.gameboard.board.length)return;const e=this.randomTarget(this.gameboard.board);this.gameboard.receiveAttack(...e),this.shooted.add(`${e[0]}-${e[1]}`)}}class H extends x{constructor(e,n){super(e,n),this.ships=[],this.hitStack=[],this.directions=[[0,1],[1,0],[0,-1],[-1,0]],this.directionsIndex=0}toggleDirectionsIndex(e=1){for(this.directionsIndex+=e;this.directionsIndex>=this.directions.length;)this.directionsIndex-=this.directions.length}shootTarget(e,n){const o=this.gameboard.board[e][n];return this.shooted.add(`${e}-${n}`),o.occupant&&!o.isHit&&this.hitStack.push([e,n]),this.gameboard.receiveAttack(e,n)}reservedSet(){const e=[[1,0],[1,1],[1,-1],[0,0],[0,1],[0,-1],[-1,0],[-1,1],[-1,-1]],n=new Set,o=this.gameboard.board.length;return this.ships.forEach(r=>{e.forEach(c=>{r[0]+c[0]<o&&r[0]+c[0]>=0&&r[1]+c[1]<o&&r[1]+c[1]>=0&&n.add(`${r[0]+c[0]}-${r[1]+c[1]}`)})}),new Set([...n,...this.shooted])}attack(){return this.hitStack.length?this.attackNearby(this.hitStack[this.hitStack.length-1]):this.smartRandomAttack()}isValidCoordinates(e,n){const o=this.gameboard.board.length;return n!==null&&e!==null&&n>=0&&n<o&&e>=0&&e<o}neighbors(e=this.hitStack[this.hitStack.length-1]){return this.directions.map(n=>[e[0]+n[0],e[1]+n[1]])}possibleShipPlace(e,n){const o=this.reservedSet().has(`${e}-${n}`);return this.isValidCoordinates(e,n)&&!o}attackNearby(){if(!this.hitStack.length){this.smartRandomAttack();return}const e=this.hitStack[this.hitStack.length-1],n=this.neighbors(e);let[o,r]=n[this.directionsIndex],c=4;for(;!this.possibleShipPlace(o,r)&&c--;)this.toggleDirectionsIndex(),[o,r]=n[this.directionsIndex];if(!this.possibleShipPlace(o,r)){this.smartRandomAttack();return}const f=this.gameboard.board[o][r],p=this.shootTarget(o,r),[y,k]=this.neighbors([o,r])[this.directionsIndex];return f.occupant&&f.occupant.isSunk()&&(this.ships.push(...this.hitStack),this.hitStack=[]),(this.hitStack.length>=2&&!f.occupant||this.hitStack.length>=2&&!this.possibleShipPlace(y,k))&&(this.toggleDirectionsIndex(2),this.hitStack.reverse()),!f.occupant&&this.hitStack.length==1&&this.toggleDirectionsIndex(),p}smartRandomAttack(){let[e,n]=this.randomPosition();for(;!this.possibleShipPlace(e,n);)[e,n]=this.randomPosition();return this.shootTarget(e,n)}}const d=(()=>{let u,e,n,o;const r=()=>{n=B(),o=B(),u=new x("you",o),e=new H("opponent",n)},c=()=>p()&&(n.areAllShipsSunk()||o.areAllShipsSunk()),f=()=>n.areAllShipsSunk()?e:o.areAllShipsSunk()?u:null,p=()=>n.hasReceivedAttack()||o.hasReceivedAttack();return{init:r,isOver:c,winner:f,isStarted:p,isReadyToStart:()=>n.isFull()&&o.isFull()&&!p(),getPlayerBoard:()=>n.board,getOpponentBoard:()=>o.board,getPlayerGameboard:()=>n,getOpponentGameboard:()=>o,player:()=>u,opponent:()=>e}})();function w(){let u,e,n,o,r,c;function f(){u=d.getOpponentGameboard(),e=d.getPlayerGameboard(),n=d.getPlayerBoard(),o=d.getOpponentBoard(),c=d.player(),r=d.opponent()}function p(){v.updatePlayerTable(n)}function y(){v.updateOpponentTable(o)}function k(){y(),p()}function T(i){if(d.isOver()||!d.isReadyToStart()&&!d.isStarted())return;const t=i.target;if(t.localName!=="td")return;const a=Number(t.dataset.x),s=Number(t.dataset.y);c.attack(s,a)&&(L(),$(),k(),O(o[s][a]))}function L(){if(d.isOver()){y(),O();return}}function $(){r.attack(),d.isOver()&&(p(),v.logGameOver(d.winner()))}function P(){d.init(),f(),u.placeShipsRandomly(),k(),O()}function b(){d.isStarted()||(e.resetBoard(),e.placeShipsRandomly(),p(),O())}function R(i){if(e.isFull())return;const t=i.target,a=Number(t.dataset.x),s=Number(t.dataset.y);v.highlightPlaces(s,a,e.nextShipLength(),e.nextShipDirection())}function E(i){if(e.isFull())return;const t=i.target,a=Number(t.dataset.x),s=Number(t.dataset.y);e.placeNextShip(s,a),p(),O()}function O(i=null){d.isReadyToStart()||v.logPlace(e.remindShipsCount()),d.isReadyToStart()&&v.logStart(),d.isStarted()&&i&&v.logAttackResult(i),d.isOver()&&v.logGameOver(d.winner())}function C(){e.toggleDirection()}document.addEventListener("DOMContentLoaded",P),g.tableOpponentPlaceholder.addEventListener("click",T),g.btnReset.addEventListener("click",P),g.btnRandomize.addEventListener("click",b),g.tablePlayerPlaceholder.addEventListener("mouseover",R),g.tablePlayerPlaceholder.addEventListener("mouseleave",v.removeHighlights),g.tablePlayerPlaceholder.addEventListener("click",E),g.btnRotate.addEventListener("click",C)}w();
