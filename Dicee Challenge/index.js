/*document.querySelector()
document.querySelectorAll()
 document.getElementById()
 document.getElementByClassName()
  document.getElementByTagName()
 */
f();
function f () {
var number1 = Math.floor(Math.random() * 6 + 1);

var number2 = Math.floor(Math.random() * 6 + 1);
var src1 = "images/dice" + number1 + ".png";
var src2 = "images/dice" + number2 + ".png";
// var image1 = document.querySelectorAll("img")[0];
// image1.setAttribute("src", src1);
document.getElementsByClassName("img1")[0].src = src1;
document.getElementsByClassName("img2")[0].src = src2;

if (number1 == number2) {
  document.querySelector("h1").innerHTML = "Draw!"
} else if (number1 > number2) {
  document.querySelector("h1").innerHTML = "🎲Player 1 Wins!"
} else {
  document.querySelector("h1").innerHTML = "🎲Player 2 Wins!"
}

}
