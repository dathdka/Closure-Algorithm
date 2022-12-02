export const chuan2 = (F = [] , khongKhoa = [], tapKhoa = []) => {
  for (let i = 0; i < F.length; i++) {
    var flag = null;
    const tempL = F[i].L.split("");
    const tempR = F[i].R.split('')
    for (const khoa of tapKhoa) {
      // Vế trái là khoá và vế phải là không khoá
      if (khoa.split("").filter((el) => !tempL.includes(el)).length === 0 
      && tempR.filter(el => !khongKhoa.includes(el)).length === 0
      ) {
        khongKhoa = khongKhoa.filter(el => !tempR.includes(el))
        console.log(khongKhoa)
        flag = F[i];
        console.log(flag)
        break;
      }
      //Cả vế trái và phải đều là khoá/thuộc tính khoá
      else if( khoa.split("").filter((el) => !tempL.includes(el)).length === 0
      && tempR.filter(el => khoa.split('').includes(el)).length === 0)
        flag = 1
    }
    if (!flag){
      return F[i];
    } 
  }
  return null;
};
