//this is test
export const chuanBC = (F = [{L:'',R:''}], tapKhoa = ['']) =>{
    for(let i = 0 ;i< F.length; i++){
        let laKhoa = F[i]
        for(let khoa of tapKhoa)
            if(F[i].L.split('').filter(el => !khoa.split('').includes(el)).length === 0){
                laKhoa = null
                break;
            }
        if(laKhoa)
            return laKhoa
    }
    return false
}