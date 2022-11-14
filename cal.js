import  {timBaoDong}  from "./timBaoDong.js";
import  {XiGenerate}  from "./XiGenerate.js";
import  {timTNVaTG} from "./timTNVaTG.js"
import { timKhoaVaHienThi } from "./timKhoaVaHienThi.js";
var F = [];
var VP = [];
var VT = [];
var TN = [];
var TG = [];

//test
// var F = [{L : 'B', R: 'HE'}, {L: 'H', R: 'C'}, {L: 'C', R: 'A'}, {L: 'A', R: 'DG'}, {L: 'I', R: 'B'}, {L: 'D', R:'I'}]
// document.getElementById("properties").value = 'ABC'
// var F = [{L: 'A', R: 'B'}, {L: 'C', R: 'A'}]

const addingF = () =>{
  let left = document.getElementById("left");
  let right = document.getElementById("right");
  let obj = {};
  obj["L"] = left.value.toUpperCase();
  obj["R"] = right.value.toUpperCase();
  F.push(obj);
  left.value = "";
  right.value = "";
  var ul = document.getElementById("ul");
  var lastItem = F.at(-1);
  var li = document.createElement("li");
  li.textContent = `${lastItem.L} -> ${lastItem.R}`;
  ul.appendChild(li);
  document.getElementById("left").focus()
}

document.getElementById("add").addEventListener("click", () => addingF());
document.getElementsByTagName('body')[0].addEventListener('keydown',(e)=>{
  if(e.key === 'Enter')
    addingF()
})

document.getElementById('reset').addEventListener('click', ()=>{
  F = [];
  document.getElementById('properties').value = ''
  document.getElementById('ul').innerHTML = ''
})


document.getElementById("calBtn").addEventListener("click", () => {
  
  if (F.length === 0) {
    var err = document.getElementById("err");
    err.removeAttribute("hidden");
    err.textContent = `vui lòng nhập F `;
  }
  const tNvaTG = timTNVaTG(F, VT, VP, TN, TG);
  TN = tNvaTG.TN
  TG = tNvaTG.TG
  var result = document.getElementById('result')
  const displayTN = document.createElement('h3')
  displayTN.className = 'text'
  displayTN.innerHTML = `Tập nguồn: ${TN.join('')}`
  const displayTG = document.createElement('h3')
  displayTG.className = 'text'
  displayTG.innerHTML = `Tập trung gian: ${TG.join('')}`
  result.appendChild(displayTN)
  result.appendChild(displayTG)
  if (TG.length > 0) {
    var tGKhacRong = document.createElement('h3')
    tGKhacRong.className = 'text'
    tGKhacRong.textContent = `Vì tập trung gian không rỗng nên ta xét tập nguồn: `
    result.appendChild(tGKhacRong)
    var tempTN = TN;
    var qCong = document.getElementById("properties").value.toUpperCase().split("")
    const baoDongTN = timBaoDong(tempTN,F);
    if(qCong.filter(el => !baoDongTN.includes(el)).length === 0 ){
      let label = document.createElement('h3')
      label.style.color = 'red'
      label.textContent = `Bao đóng tập nguồn bằng Q+ nên TN = ${TN.join('')} chính là khoá`
      result.appendChild(label)
    }else{
      let label = document.createElement('h3')
      label.className = 'text'
      label.textContent = `Bao đóng tập nguồn không bằng Q+ nên chúng ta sẽ xét từng thuộc tính qua bảng sau: `
      result.appendChild(label)
      const Xi = XiGenerate(TG)
      timKhoaVaHienThi(TN, Xi, F, qCong)
    }
  }
});
