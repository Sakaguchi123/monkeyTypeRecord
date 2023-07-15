'user strict'


flatpickr('#flatpickr', {
  enableTime: true,
  defaultDate: [new Date()],
  dateFormat: 'Y/m/d H:i',
  allowInput: true,
});

const inputDate = document.querySelector("#flatpickr");
const inputWpm = document.querySelector("#input-wpm");
const selectTime = document.querySelector("#select-time");
const submitButton = document.querySelector("#submit-button");
const ctx = document.getElementById("chart");

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


let config  = new Chart(ctx, {
  type: "line",
  data: {
    labels : [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
    ],
    datasets : [{
      label: "my first data set",
      backgroundColor: 'rgb(255, 99, 132)',      
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  },
  oputions:{}
})




// inputDate.addEventListener("change", change);
// inputWpm.addEventListener("change", change);
// selectTime.addEventListener("change", change);

// function change() {
//   console.log(selectTime.value);
//   console.log(inputDate.value);
//   console.log(inputWpm.value);
// }
