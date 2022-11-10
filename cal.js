var F = [];
var VP = [];
var VT = [];
var TN = [];
var TG = [];

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
});

const timTNVaTG = () => {
  var propFromInput = document.getElementById("properties").value.split("");
  for (let item of F) {
    const vePhai = item.R.split("");
    const veTrai = item.L.split("");
    VP = VP.concat(vePhai);
    VT = VT.concat(veTrai);
  }
  TN = propFromInput.filter((el) => !VP.includes(el));
//   console.log(TN);
  var tempTG = VP.filter((el) => VT.includes(el));
  TG = [...new Set(tempTG)];
//   console.log(TG);
};

const timBaoDong = (baoDongTN) => {
  console.log("Tim bao dong");
  for (let thuocTinh of F) {
    if (
      thuocTinh.L.split('').filter((el) => baoDongTN.includes(el)).length === thuocTinh.L.split('').length &&
      thuocTinh.R.split('').filter((el) => !baoDongTN.includes(el)).length > 0
    ){
        baoDongTN = [ ...baoDongTN, ...thuocTinh.R.split('').filter((el) => !baoDongTN.includes(el))] 
        timBaoDong(baoDongTN)
    }
  }
  return baoDongTN
};

document.getElementById("calBtn").addEventListener("click", () => {
  if (F.length === 0) {
    var err = document.getElementById("err");
    err.removeAttribute("hidden");
    err.textContent = `vui lòng nhập F `;
  }
  timTNVaTG();
  if (TG.length > 0) {
    var tempTN = TN;
    console.log(timBaoDong(tempTN));
  }
});
