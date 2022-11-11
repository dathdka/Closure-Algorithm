export const timTNVaTG = (F, VT, VP, TN, TG) => {
    var propFromInput = document.getElementById("properties").value.split("");
    for (let item of F) {
      const vePhai = item.R.split("");
      const veTrai = item.L.split("");
      VP = VP.concat(vePhai);
      VT = VT.concat(veTrai);
    }
    TN = propFromInput.filter((el) => !VP.includes(el));
    // console.log(TN);
    var tempTG = VP.filter((el) => VT.includes(el));
    TG = [...new Set(tempTG)];
    return {TN : TN, TG : TG}
  };
  