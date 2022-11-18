var FPhay = [];

export const timFPhay = (F) => {
  for (let item of F) {
    if (item.R.length > 1) {
        for(let i = 0 ; i< item.R.length ;i ++){
            var newObj = {'L': item.L, 'R': item.R[i]}
            FPhay.push(newObj)
        }
    } else FPhay.push(item);
  }
  return FPhay;
};
