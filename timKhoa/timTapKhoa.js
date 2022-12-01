export const timTapKhoa = (sieuKhoa) => {
  for (let i = 0; i < sieuKhoa.length -1; i++) {
    for (let j = i + 1; j < sieuKhoa.length; j++) {
      if (sieuKhoa[i].filter((el) => !sieuKhoa[j].includes(el)).length === 0 && sieuKhoa[i].length > 0) {
        sieuKhoa[j] = [];
      }
    }
  }
  return sieuKhoa;
};
