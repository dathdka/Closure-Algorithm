import { timBaoDong } from "../shared/timBaoDong.js";
import { XiGenerate } from "../timKhoa/XiGenerate.js";
var FPhayB2 = [];

export const luocVT = (FPhay) => {
    var count = 0
  for (let item of FPhay) {
    if (item.L.length > 1) {
      var XiL = XiGenerate(item.L.split(""));
      XiL.pop();
      XiL.shift();
      var isPush = false;
      for (let i = 0; i < XiL.length; i++) {
        count +=1;
        var baoDong = timBaoDong(XiL[i].split(""), FPhay);
        if (
          item.R.split("").filter((el) => !baoDong.includes(el)).length === 0
        ) {
            var b2 = document.getElementById('b2')
            var h4 = document.createElement('h4')
            const du = item.L.split('').filter(el => !XiL[i].split('').includes(el))
            h4.innerHTML = `Xét ${item.L} -> ${item.R}: <br/> Bao đóng ${XiL[i]} = ${baoDong.join('')} => Dư ${du} `
            b2.appendChild(h4)
          var newObj = { L: XiL[i], R: item.R };
          isPush = true;
          FPhayB2.push(newObj);
          break;
        }
      }
      if (!isPush) FPhayB2.push(item);
    } else {
        count +=1
      FPhayB2.push(item);
    }
  }
  return FPhayB2;
};
