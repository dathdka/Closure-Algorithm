export const XiGenerate = (TG) =>{
    var Xi = [''];
    var chars = 1;
    while(chars < TG.length){
      if(Xi.filter(el => el.length === chars).length === 0){
        var highestCharArray = Xi.filter(el => el.length === chars-1)
        for(let i = 0; i<highestCharArray.length; i++){
          let lastChar = highestCharArray[i].at(-1)
          let indexOfLastChar = TG.indexOf(lastChar) + 1
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