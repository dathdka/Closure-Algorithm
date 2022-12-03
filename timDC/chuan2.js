import { timBaoDong } from "../shared/timBaoDong.js";
import { XiGenerate } from "../timKhoa/XiGenerate.js";
export const chuan2 = (F = [{L: '', R: ''}] , khongKhoa = [''], tapKhoa = ['']) => {
  // for (let i = 0; i < F.length; i++) {
  //   var flag = null;
  //   const tempL = F[i].L.split("");
  //   const tempR = F[i].R.split('')
  //   for (const khoa of tapKhoa) {
  //     // Vế trái là khoá và vế phải là không khoá
  //     if (khoa.split("").filter((el) => !tempL.includes(el)).length === 0 
  //     && tempR.filter(el => !khongKhoa.includes(el)).length !== tempR.length
  //     ) {
  //       khongKhoa = khongKhoa.filter(el => !tempR.includes(el))
  //       flag = F[i];
  //       break;
  //     }
  //     //Cả vế trái và phải đều là khoá/thuộc tính khoá
  //     else if( khoa.split("").filter((el) => !tempL.includes(el)).length === 0
  //     && tempR.filter(el => khoa.split('').includes(el)).length === 0)
  //       flag = 1
  //   }
  //   if (!flag){
  //     return F[i];
  //   } 
  // }
  // if(khongKhoa.length > 0)
  //   return khongKhoa
  // return null;
  for(let i = 0; i< tapKhoa.length; i++){
    var XiL = XiGenerate(tapKhoa[i].split(""));
    XiL.shift();
    XiL.pop();
    // console.table(XiL)
      for(let el of XiL){
        const baoDongTT = timBaoDong(el.split(''),F)
        if(baoDongTT.filter(el => !khongKhoa.includes(el)).length !== baoDongTT.length){
          const pTKDD = khongKhoa.filter(el => baoDongTT.includes(el))
          return {xil : el, baoDong: baoDongTT.join(''), pTKDD: pTKDD, tK: tapKhoa[i]}
        }
      }
  }
  return false
};
