var F = []

export const nhapF = () =>{
    let left = document.getElementById("left");
    let right = document.getElementById("right");
    let obj = {};
    obj["L"] = left.value.toUpperCase();
    obj["R"] = right.value.toUpperCase();
    F.push(obj);
    left.value = "";
    right.value = "";
    var ul = document.getElementById("ul");
    var lastItem = F.at(-1);
    var li = document.createElement("li");
    li.textContent = `${lastItem.L} -> ${lastItem.R}`;
    ul.appendChild(li);
    document.getElementById("left").focus();
    return F;
}