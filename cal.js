import { timBaoDong } from "./shared/timBaoDong.js";
import { XiGenerate } from "./timKhoa/XiGenerate.js";
import { timTNVaTG } from "./timKhoa/timTNVaTG.js";
import { timKhoaVaHienThi } from "./timKhoa/timKhoaVaHienThi.js";
var F = [];
var VP = [];
var VT = [];
var TN = [];
var TG = [];

//test
var F = [{L : 'B', R: 'HE'}, {L: 'H', R: 'C'}, {L: 'C', R: 'A'}, {L: 'A', R: 'DG'}, {L: 'I', R: 'B'}, {L: 'D', R:'I'}]
document.getElementById("properties").value = 'ABCDGHI'
document.getElementById('btnTimKhoa').addEventListener('click',(e)=>{
  document.getElementById('timKhoa').removeAttribute('hidden')
})

document.getElementById('btnTimPTT').addEventListener('click',(e)=>{
  document.getElementById('timPTT').removeAttribute('hidden')
})

const tachChuoi = () => {
  var str = document.getElementById("copy").value.toUpperCase();
  console.log(str);
  var newArr = str.split(/[^A-Za-z]/);
  newArr = newArr.filter((el) => el !== "");
  var ul = document.getElementById("ul");
  for (let i = 0; i < newArr.length; i += 2) {
    var obj = new Object();
    obj["L"] = newArr[i];
    obj["R"] = newArr[i + 1];
    F.push(obj);
    var li = document.createElement("li");
    li.textContent = `${newArr[i]} -> ${newArr[i + 1]}`;
    ul.appendChild(li);
  }
  document.getElementById("copy").value = "";
};

const addingF = () => {
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
  document.getElementById("left").focus();
};

document.getElementById("add").addEventListener("click", () => {
    let left = document.getElementById("left");
    let right = document.getElementById("right");
    if (left.value !== "" && right.value !== "") {
      console.log("Nhập từng thành phần");
      addingF();
    } else tachChuoi();
});
document.getElementsByTagName("body")[0].addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let left = document.getElementById("left");
    let right = document.getElementById("right");
    if (left.value !== "" && right.value !== "") {
      console.log("Nhập từng thành phần");
      addingF();
    } else tachChuoi();
  }
});

document.getElementById("reset").addEventListener("click", () => {
  location.reload();
});

document.getElementById("calBtn").addEventListener("click", () => {
  var qCong = document
    .getElementById("properties")
    .value.toUpperCase()
    .split("");
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
});
