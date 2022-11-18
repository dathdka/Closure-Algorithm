var F = [];

export const tachChuoi = () =>{
    var str = document.getElementById("copy").value.toUpperCase();
    console.log(str);
    var newArr = str.split(/[^A-Za-z]/);
    newArr = newArr.filter((el) => el !== "");
    var ul = document.getElementById("ul");
    for (let i = 0; i < newArr.length; i += 2) {
      var obj = new Object();
      obj["L"] = newArr[i];
      obj["R"] = newArr[i + 1];
      F.push(obj);
      var li = document.createElement("li");
      li.textContent = `${newArr[i]} -> ${newArr[i + 1]}`;
      ul.appendChild(li);
    }
    document.getElementById("copy").value = "";
    return F;
}