export const chuanBC = (F = [{L:'',R:''}], tapKhoa = ['']) =>{
    for(let i = 0 ;i< F.length; i++){
        let laKhoa = false
        for(let khoa of tapKhoa)
            if(F[i].L.split('').filter(el => !khoa.split('').includes(el)).length === 0){
                console.log(F[i].L.split('').filter(el => !khoa.split('').includes(el)))
                console.log(khoa)
                return F[i];
            }
    }
    return false
}