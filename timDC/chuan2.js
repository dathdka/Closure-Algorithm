import { timBaoDong } from "../shared/timBaoDong.js";
import { XiGenerate } from "../timKhoa/XiGenerate.js";
//this is test
export const chuan2 = (F = [{L: '', R: ''}] , khongKhoa = [''], tapKhoa = ['']) => {
  for(let i = 0; i< tapKhoa.length; i++){
    var XiL = XiGenerate(tapKhoa[i].split(""));
    // console.log(XiL)
    if(XiL.length !== 2){
      XiL.shift();
      XiL.pop();
    }else
    XiL.shift();
    console.table(XiL)
      for(let el of XiL){
        const baoDongTT = timBaoDong(el.split(''),F)
        console.log(baoDongTT.filter(el => !khongKhoa.includes(el)).length !== baoDongTT.length)
        if(baoDongTT.filter(el => !khongKhoa.includes(el)).length !== baoDongTT.length){
          const pTKDD = khongKhoa.filter(el => baoDongTT.includes(el))
          return {xil : el, baoDong: baoDongTT.join(''), pTKDD: pTKDD, tK: tapKhoa[i]}
        }
      }
  }
  return false
};
