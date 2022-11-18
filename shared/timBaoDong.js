export function timBaoDong (baoDongTN = [], F = []) {
    for (let thuocTinh of F) {
      if (
        thuocTinh.L.split('').filter((el) => !baoDongTN.includes(el)).length === 0 &&
        thuocTinh.R.split('').filter((el) => !baoDongTN.includes(el)).length > 0
      ){
          baoDongTN = [ ...baoDongTN, ...thuocTinh.R.split('').filter((el) => !baoDongTN.includes(el))] 
          baoDongTN = timBaoDong(baoDongTN,F)
          break
        }
      }
      return baoDongTN
  };