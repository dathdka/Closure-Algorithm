import { timBaoDong } from "./shared/timBaoDong.js";
import { XiGenerate } from "./timKhoa/XiGenerate.js";
import { timTNVaTG } from "./timKhoa/timTNVaTG.js";
import { timKhoaVaHienThi } from "./timKhoa/timKhoaVaHienThi.js";
import { nhapF } from "./shared/nhapF.js";
import { tachChuoi } from "./shared/tachChuoi.js";
import { timFPhay } from "./timPTT/timFPhay.js";
import { luocVT } from "./timPTT/luocVT.js";
import { luocPTHDT } from "./timPTT/luocPTHDT.js";
var F = [];
var VP = [];
var VT = [];
var TN = [];
var TG = [];


//test
// var F = [{L : 'BE', R: 'HE'}, {L: 'H', R: 'C'}, {L: 'C', R: 'A'}, {L: 'A', R: 'DG'}, {L: 'I', R: 'B'}, {L: 'D', R:'I'}]
// var F = [{L : '', R: ''},{L : '', R: ''},{L : '', R: ''},{L : '', R: ''},{L : '', R: ''},{L : '', R: ''},{L : '', R: ''},{L : '', R: ''}]
document.getElementById("properties").value = 'ABCDEG'
var qCong = document
.getElementById("properties")
.value.toUpperCase()
.split("");

document.getElementById("add").addEventListener("click", () => {
    let left = document.getElementById("left");
    let right = document.getElementById("right");
    if (left.value !== "" && right.value !== "") {
      F = [...F,...nhapF()];
    } else F = [...F,...tachChuoi()] ;
});
document.getElementsByTagName("body")[0].addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let left = document.getElementById("left");
    let right = document.getElementById("right");
    if (left.value !== "" && right.value !== "") {
      F = [...F,...nhapF()];
    } else F = [...F,...tachChuoi()] ;
  }
});

document.getElementById("reset").addEventListener("click", () => {
  location.reload();
});

const tinhTapKhoa = () => {
  if (F.length === 0) {
    var err = document.getElementById("err");
    err.removeAttribute("hidden");
    err.textContent = `Vui lòng nhập F `;
  }else if(qCong.length === 0){
    var err = document.getElementById("err");
    err.removeAttribute("hidden");
    err.textContent = `Vui lòng nhập Q`;
  }else{
    const tNvaTG = timTNVaTG(F, VT, VP, TN, TG);
    TN = tNvaTG.TN;
    TG = tNvaTG.TG;
    var result = document.getElementById("result");
    const displayTN = document.createElement("h3");
    displayTN.className = "text";
    displayTN.innerHTML = `Tập nguồn: ${TN.join("")}`;
    const displayTG = document.createElement("h3");
    displayTG.className = "text";
    displayTG.innerHTML = `Tập trung gian: ${TG.join("")}`;
    result.appendChild(displayTN);
    result.appendChild(displayTG);
    if (TG.length > 0) {
      var tGKhacRong = document.createElement("h3");
      tGKhacRong.className = "text";
      tGKhacRong.textContent = `Vì tập trung gian không rỗng nên ta xét tập nguồn: `;
      result.appendChild(tGKhacRong);
      var tempTN = TN;
      const baoDongTN = timBaoDong(tempTN, F);
      if (qCong.filter((el) => !baoDongTN.includes(el)).length === 0) {
        let label = document.createElement("h3");
        label.style.color = "red";
        label.textContent = `Bao đóng tập nguồn bằng Q+ nên TN = ${TN.join(
          ""
        )} chính là khoá`;
        result.appendChild(label);
      } else {
        let label = document.createElement("h3");
        label.className = "text";
        label.textContent = `Bao đóng tập nguồn không bằng Q+ nên chúng ta sẽ xét từng thuộc tính qua bảng sau: `;
        result.appendChild(label);
        const Xi = XiGenerate(TG);
        timKhoaVaHienThi(TN, Xi, F, qCong);
      }
    } else {
      var tGRong = document.createElement("h3");
      tGRong.innerHTML = `Tập trung gian rỗng`;
      tGRong.style.color = `red`;
      result.appendChild(tGRong);
    }
  }
}

const tinhPTT = () =>{
  if (F.length === 0) {
    var err = document.getElementById("err");
    err.removeAttribute("hidden");
    err.textContent = `Vui lòng nhập F `;
  }else if(qCong.length === 0){
    var err = document.getElementById("err");
    err.removeAttribute("hidden");
    err.textContent = `Vui lòng nhập Q`;
  }else{
    var FPhay = timFPhay(F);
    var b1 = document.getElementById('b1')
    var h4 = document.createElement('h4')
    h4.innerHTML = `F\' = `;
    for(let item of FPhay)
      h4.innerHTML += `${item.L} -> ${item.R}, `
    b1.appendChild(h4)
    FPhay = luocVT(FPhay)
    var b2 = document.getElementById('b2')
    var h4 = document.createElement('h4')
    h4.innerHTML = `F\' sau khi loại bỏ các thuộc tính dư thừa ở vế trái: <br/>F\' = `;
    for(let item of FPhay)
      h4.innerHTML += `${item.L} -> ${item.R}, `
    b2.appendChild(h4)
    FPhay = luocPTHDT(FPhay)
    var b3 = document.getElementById('b3')
    var h4 = document.createElement('h4')
    h4.innerHTML = `F\' sau khi loại bỏ các phụ thuộc hàm dư thừa: <br/>F\' = `;
    for(let item of FPhay)
      h4.innerHTML += `${item.L} -> ${item.R}, `
    h4.style.color = `red`
    b3.appendChild(h4)
  }
}

document.getElementById("calBtn").addEventListener("click", () => {
  tinhTapKhoa()
  tinhPTT()
});
