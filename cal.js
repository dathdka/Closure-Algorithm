import { timBaoDong } from "./shared/timBaoDong.js";
import { XiGenerate } from "./timKhoa/XiGenerate.js";
import { timTNVaTG } from "./timKhoa/timTNVaTG.js";
import { timKhoaVaHienThi } from "./timKhoa/timKhoaVaHienThi.js";
import { nhapF } from "./shared/nhapF.js";
import { tachChuoi } from "./shared/tachChuoi.js";
import { timFPhay } from "./timPTT/timFPhay.js";
import { luocVT } from "./timPTT/luocVT.js";
import { luocPTHDT } from "./timPTT/luocPTHDT.js";
import { chuan2 } from "./timDC/chuan2.js";
import { chuan3 } from "./timDC/chuan3.js";
var F = [];
var VP = [];
var VT = [];
var TN = [];
var TG = [];
var qCong = [];
var tapKhoa = [];
var chuan = 1;
//test
// var F = [{L : 'BE', R: 'HE'}, {L: 'H', R: 'C'}, {L: 'C', R: 'A'}, {L: 'A', R: 'DG'}, {L: 'I', R: 'B'}, {L: 'D', R:'I'}]
// var F = [{L : '', R: ''},{L : '', R: ''},{L : '', R: ''},{L : '', R: ''},{L : '', R: ''},{L : '', R: ''},{L : '', R: ''},{L : '', R: ''}]
// var F = [{L:'AB',R:'C'},{L:'B',R: 'D'},{L:'C',R:'ABD'}]
// document.getElementById("properties").value = "ABCD";

document.getElementById("add").addEventListener("click", () => {
  let left = document.getElementById("left");
  let right = document.getElementById("right");
  if (left.value !== "" && right.value !== "") {
    F = [...nhapF()];
  } else F = [...F, ...tachChuoi()];
});
document.getElementsByTagName("body")[0].addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let left = document.getElementById("left");
    let right = document.getElementById("right");
    if (left.value !== "" && right.value !== "") {
      F = [...nhapF()];
    } else F = [...F, ...tachChuoi()];
  }
});

document.getElementById("calBtn").addEventListener("click", () => {
  let tempArr = document
    .getElementById("properties")
    .value.toUpperCase()
    .split(/[^A-Za-z]/).filter(el => el !== '');
  for(let item of tempArr){
    qCong = [...qCong, ...item.split('')]
  }
  const timTK = new Promise((resolve, reject) => {
    tinhTapKhoa();
    resolve();
  }) 
  tinhDC();
  timTK.then(()=>{
    tinhPTT();
  })
});


document.getElementById("reset").addEventListener("click", () => {
  location.reload();
});

const tinhTapKhoa = () => {
  if (F.length === 0) {
    var err = document.getElementById("err");
    err.removeAttribute("hidden");
    err.textContent = `Vui lòng nhập F `;
  } else if (qCong.length === 0) {
    var err = document.getElementById("err");
    err.removeAttribute("hidden");
    err.textContent = `Vui lòng nhập Q`;
  } else {
    const tNvaTG = timTNVaTG(F, VT, VP, TN, TG, qCong);
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
        tapKhoa = [...TN]
        result.appendChild(label);
      } else {
        let label = document.createElement("h3");
        label.className = "text";
        label.textContent = `Bao đóng tập nguồn không bằng Q+ nên chúng ta sẽ xét từng thuộc tính qua bảng sau: `;
        result.appendChild(label);
        const Xi = XiGenerate(TG);
        tapKhoa = [...timKhoaVaHienThi(TN, Xi, F, qCong)];
      }
    } else {
      var tGRong = document.createElement("h3");
      tGRong.innerHTML = `Tập trung gian rỗng nên TN: ${TN} là khoá duy nhất`;
      tapKhoa = [...TN]
      console.log(tapKhoa)
      tGRong.style.color = `red`;
      result.appendChild(tGRong);
    }
  }
};

const tinhPTT = () => {
  if (F.length === 0) {
    var err = document.getElementById("err");
    err.removeAttribute("hidden");
    err.textContent = `Vui lòng nhập F `;
  } else if (qCong.length === 0) {
    var err = document.getElementById("err");
    err.removeAttribute("hidden");
    err.textContent = `Vui lòng nhập Q`;
  } else {
    var FPhay = timFPhay(F);
    var b1 = document.getElementById("b1");
    var h4 = document.createElement("h4");
    h4.innerHTML = `F\' = `;
    for (let item of FPhay) h4.innerHTML += `${item.L} -> ${item.R}, `;
    h4.style.color = `yellow`;
    h4.innerHTML = h4.innerHTML.slice(0, h4.innerHTML.length -2 )
    b1.appendChild(h4);
    FPhay = luocVT(FPhay);
    var b2 = document.getElementById("b2");
    var h4 = document.createElement("h4");
    h4.innerHTML = `F\' sau khi loại bỏ các thuộc tính dư thừa ở vế trái: <br/>F\' = `;
    for (let item of FPhay) h4.innerHTML += `${item.L} -> ${item.R}, `;
    h4.style.color = `yellow`;
    h4.innerHTML = h4.innerHTML.slice(0, h4.innerHTML.length -2 )
    b2.appendChild(h4);
    FPhay = luocPTHDT(FPhay);
    var b3 = document.getElementById("b3");
    var h4 = document.createElement("h4");
    h4.innerHTML = `F\' sau khi loại bỏ các phụ thuộc hàm dư thừa: <br/>F\' = `;
    for (let item of FPhay) h4.innerHTML += `${item.L} -> ${item.R}, `;
    h4.innerHTML = h4.innerHTML.slice(0, h4.innerHTML.length -2 )
    h4.style.color = `red`;
    b3.appendChild(h4);
  }
};

const tinhDC = () =>{
  //Chuẩn 2
  const tempTK = tapKhoa.join('').split('')
  var khongKhoa = qCong.filter(el => !tempTK.includes(el))
  var h3 = document.createElement('h3')
  h3.innerHTML = `Tập không khoá = {${khongKhoa.join("")}}`
  document.getElementById('chuan1').appendChild(h3)
  const datChuan2 = chuan2(F,khongKhoa,tapKhoa)
  if(datChuan2){
    var h3 = document.createElement('h3')
    h3.style.color = 'yellow'
    if(! typeof datChuan2.R === 'undefined'){
      h3.innerHTML = `Tập không khoá ${datChuan2.R} ∈ ${datChuan2.L} -> ${datChuan2.R} không phụ thuộc hàm đầy đủ vào tập khoá nên dữ liệu đạt cao nhất chuẩn 1`
      document.getElementById('chuan2').appendChild(h3)
      return
    }
    h3.innerHTML = `Tập không khoá còn lại = ${datChuan2} không phụ thuộc hàm đầy đủ vào tập khoá nên dữ liệu đạt cao nhất chuẩn 1`
    document.getElementById('chuan2').appendChild(h3)
    return
  }
  var h3 = document.createElement('h3')
  h3.style.color = 'yellow'
  h3.innerHTML = `Tập không khoá phụ thuộc hàm đầy đủ vào tập khoá nên dữ liệu đạt ít nhất chuẩn 2`
  document.getElementById('chuan2').appendChild(h3)
  const datChuan3 = chuan3(F, tapKhoa);
  if(datChuan3){
    h3.innerHTML = `Vế trái hoặc vế phải không chứa khoá/thuộc tính khoá nên dữ liệu đạt cao nhất chuẩn 2`
      document.getElementById('chuan3').appendChild(h3)
      return
  }
  var h3 = document.createElement('h3')
  h3.style.color = 'yellow'
  h3.innerHTML = `Vế trái và vế phải đều chứa khoá/thuộc tính khoá nên dữ liệu đạt ít nhất chuẩn 3`
  document.getElementById('chuan3').appendChild(h3)
  
}