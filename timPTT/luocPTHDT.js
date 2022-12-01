import { timBaoDong } from "../shared/timBaoDong.js"
var luocPTH = []

const layPTTrung = (FPhay) =>{
    for(let i =0 ;i< FPhay.length; i++){
        if(FPhay.filter(el => FPhay[i].R === el.R).length>1){
            luocPTH = [...luocPTH, ...FPhay.filter(el => FPhay[i].R === el.R)]
            FPhay = FPhay.filter(el => FPhay[i].R !== el.R)
            FPhay = layPTTrung(FPhay)
            break;
        }
    }
    return FPhay
}

const timBDvaLB = (thuocTinh = {}, arr = []) => {
    // console.log(thuocTinh)
    var baoDong = timBaoDong(thuocTinh.L.split(''),arr)
    // console.log(baoDong)
    if(thuocTinh.R.split('').filter(el => !baoDong.includes(el)).length ===0)
        return { baoDong: baoDong, isDuplicate: true}
    return { baoDong: baoDong, isDuplicate: false}
}

export const luocPTHDT = (FPhay = []) => {
    layPTTrung(FPhay)
    var b3 = document.getElementById('b3')
    for(let i =0 ;i< luocPTH.length; i++){
        var tempArr = [...FPhay]
        //Bỏ PTH hàm đang xét tạm thời ra khỏi arr
        tempArr.splice(FPhay.indexOf(luocPTH[i]),1)
        //Tìm bao đóng sau khi bỏ
        var baoDong = timBDvaLB(luocPTH[i],tempArr)
        var h4 = document.createElement('h4')
        h4.innerHTML = `Xét thuộc tính F\' - {${luocPTH[i].L} -> ${luocPTH[i].R}}:<br/>`
        if(baoDong.isDuplicate){
            if( luocPTH.filter(el => luocPTH[i].R.includes(el.R)).length === 2)
                i+=1;
            FPhay.splice(FPhay.indexOf(luocPTH[i]),1)
            h4.innerHTML += `${luocPTH[i].L}+ = ${baoDong.baoDong.join('')} => Chứa ${luocPTH[i].R} => Dư thừa`
        }else{
            h4.innerHTML += `${luocPTH[i].L}+ = ${baoDong.baoDong.join('')} => Không chứa ${luocPTH[i].R} => không thừa`
        }
        b3.appendChild(h4)
    }
    return FPhay;
}