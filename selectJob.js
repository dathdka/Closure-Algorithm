if(document.getElementById('btnTimKhoa').classList.contains('btn-primary')){
    document.getElementById('timKhoa').removeAttribute('hidden')
  }
  
  document.getElementById('btnTimKhoa').addEventListener('click',(e)=>{
    document.getElementById('timKhoa').removeAttribute('hidden')
    document.getElementById('timPTT').setAttribute('hidden','')
    var btnTimPTT = document.getElementById('btnTimPTT')
    btnTimPTT.classList.remove('btn-primary')
    btnTimPTT.classList.add('btn-secondary')
    var btnTimKhoa = document.getElementById('btnTimKhoa')
    btnTimKhoa.removeAttribute('hidden')
    btnTimKhoa.classList.remove('btn-secondary')
    btnTimKhoa.classList.add('btn-primary')
  })
  
  document.getElementById('btnTimPTT').addEventListener('click',(e)=>{
    document.getElementById('timKhoa').setAttribute('hidden', '')  
    document.getElementById('timPTT').removeAttribute('hidden')
    var btnTimKhoa = document.getElementById('btnTimKhoa')
    btnTimKhoa.classList.remove('btn-primary')
    btnTimKhoa.classList.add('btn-secondary')
    var btnTimPTT = document.getElementById('btnTimPTT')
    btnTimPTT.removeAttribute('hidden')
    btnTimPTT.classList.remove('btn-secondary')
    btnTimPTT.classList.add('btn-primary')
  })