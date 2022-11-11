import  {timBaoDong}  from "./timBaoDong.js";
import  {XiGenerate}  from "./XiGenerate.js";
import  {timTNVaTG} from "./timTNVaTG.js"
import { timKhoaVaHienThi } from "./timKhoaVaHienThi.js";
var F = [];
var VP = [];
var VT = [];
var TN = [];
var TG = [];

// var F = [{L : 'ag', R: 'dh'}, {L: 'c', R: 'b'}, {L: 'b', R: 'ie'}, {L: 'e', R: 'c'}, {L: 'd', R: 'h'}]
// document.getElementById("properties").value = 'abcdeghi'

document.getElementById("add").addEventListener("click", () => {
  let left = document.getElementById("left");
  let right = document.getElementById("right");
  let obj = {};
  obj["L"] = left.value;
  obj["R"] = right.value;
  F.push(obj);
  left.value = "";
  right.value = "";
  var ul = document.getElementById("ul");
  var lastItem = F.at(-1);
  var li = document.createElement("li");
  li.textContent = `${lastItem.L} -> ${lastItem.R}`;
  ul.appendChild(li);
  // console.log(F)
});



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
  if (TG.length > 0) {
    var tGKhacRong = document.createElement('h3')
    tGKhacRong.textContent = `Vì tập trung gian không rỗng nên ta xét tập nguồn như sau: `
    result.appendChild(tGKhacRong)
    var tempTN = TN;
    var qCong = document.getElementById("properties").value.split("")
    const baoDongTN = timBaoDong(tempTN,F);
    if(qCong.filter(el => !baoDongTN.includes(el)).length === 0 ){
      let label = document.createElement('h3')
      label.textContent = `Bao đóng tập nguồn bằng Q+ nên ${TN.join('')} chính là khoá`
      result.appendChild(label)
    }else{
      let label = document.createElement('h3')
      label.textContent = `Bao đóng tập nguồn không bằng Q+ nên chúng ta sẽ xét từng thuộc tính qua bảng sau: `
      result.appendChild(label)
      const Xi = XiGenerate(TG)
      timKhoaVaHienThi(TN, Xi, F, qCong)
    }
  }
});
