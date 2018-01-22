export default function splitOnCaps(arry) {
    let newStr = arry.split(/(?=[A-Z])/).join(' ');
    newStr = newStr.charAt(0).toUpperCase() + newStr.slice(1);
    return newStr;
}