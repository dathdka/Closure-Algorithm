//this is test
export const chuan3 = (F = [{L: '', R: ''}], tapKhoa = ['']) =>{
    let count = 0;
    let tempArr = []
    for(let i = 0 ; i<F.length; i++){
        const tempL = F[i].L.split("");
        const tempR = F[i].R.split('')
        for(let khoa of tapKhoa){
            if(tempL.filter(el => !khoa.split('').includes(el)).length === 0 || 
            tempR.filter(el => !khoa.split('').includes(el)).length !== tempR.length){
                tempArr.push(F[i])
                count +=1;
                break;
            }
        }
    }
    if(count !== F.length){
        return F.filter(el => !tempArr.includes(el))
    }
    return false
}


