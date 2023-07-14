'user strict'


flatpickr('#flatpickr', {
  enableTime: true,
  defaultDate: [new Date()],
  dateFormat: 'Y/m/d H:i',
  allowInput: true,
});

let inputDate = document.querySelector("#flatpickr");
let inputWpm = document.querySelector("#input-wpm");
let selectTime = document.querySelector("#select-time");
let submitButton = document.querySelector("#submit-button");

let dateArr = [];
let wpmArr = [];
let timeArr = [];

//wpmに入力されていないときはclick出来ないようにする。
inputWpm.addEventListener("input", function() {
  if (inputWpm.value === "") {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
});

//clickされた時の処理
submitButton.addEventListener("click",function() {

  if(localStorage.getItem("submitDate") === null) {
    dateArr.push(inputDate.value);
    wpmArr.push(inputWpm.value);
    timeArr.push(selectTime.value);
    localStorage.setItem("submitDate", JSON.stringify(dateArr));
    localStorage.setItem("submitWpm", JSON.stringify(wpmArr));
    localStorage.setItem("submitTime", JSON.stringify(timeArr));
  }
})
//値がなかったら、null　もしあったら、


// inputDate.addEventListener("change", change);
// inputWpm.addEventListener("change", change);
// selectTime.addEventListener("change", change);

// function change() {
//   console.log(selectTime.value);
//   console.log(inputDate.value);
//   console.log(inputWpm.value);
// }
