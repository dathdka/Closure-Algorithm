import  {timBaoDong}  from "./timBaoDong.js";
export const timKhoaVaHienThi = (TN, Xi, F, qCong) =>{
    var table = document.getElementById('table')
    var tapKhoa = []
    for(let thuocTinh of Xi){
        let row = document.createElement('tr')
        let xiCell = document.createElement('td')
        let kCell = document.createElement('td')
        let kCongCell = document.createElement('td')
        let sKCell = document.createElement('td')
        sKCell.style.color = 'purple'
        let k = [...TN, ...thuocTinh.split('')]
        var baoDongK = timBaoDong(k, F)
        xiCell.textContent = thuocTinh
        kCell.textContent = k.join('')
        kCongCell.textContent = baoDongK.join('')
        if(qCong.filter(el => !baoDongK.includes(el)).length === 0){
            sKCell.textContent = k.join('')
            tapKhoa.push(k.join(''))
        }
        else
            sKCell.textContent = ''
        row.appendChild(xiCell)
        row.appendChild(kCell)
        row.appendChild(kCongCell)
        row.appendChild(sKCell)
        table.appendChild(row)
    }
    var ketLuan = document.createElement('h3')
    ketLuan.style.color = 'red'
    if(tapKhoa.length !== 0){
        const khoa = tapKhoa.filter(el => el.length === tapKhoa[0].length)
        ketLuan.innerHTML = `Vậy tập khoá là ${khoa}`
        document.getElementById('key').appendChild(ketLuan)
    }else{
        ketLuan.innerHTML = `Vậy là không có khoá`
        document.getElementById('key').appendChild(ketLuan)
    }

}