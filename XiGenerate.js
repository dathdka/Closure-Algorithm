export const XiGenerate = (TG) =>{
    var Xi = [''];
    var chars = 1;
    while(chars < TG.length){
      if(Xi.filter(el => el.length === chars).length === 0){
        // Lấy chuỗi có nhiều ký tự nhất hiện tại
        var highestCharArray = Xi.filter(el => el.length === chars-1)
        // Thêm ký tự phía sau phần tử cuối cùng
        // example: 'ac' => c là phần tử cuối
        // Thêm ký tự phía sau c như là 'd', 'e', ...
        for(let i = 0; i<highestCharArray.length; i++){
          // Lấy phần tử cuối cùng của thuộc tính ('ab' => 'b')
          let lastChar = highestCharArray[i].at(-1)
          
          // lấy vị trí phần tử đó trên bảng TG 
          let indexOfLastChar = TG.indexOf(lastChar) + 1
  
          // thêm những phần tử đứng sau nó
          while(indexOfLastChar < TG.length){
            var newElement = highestCharArray[i] + TG[indexOfLastChar]
            Xi.push(newElement)
            indexOfLastChar +=1
          }
        } 
      }
      chars ++;
    }
    Xi.push(TG.join(''))
    return Xi
  }