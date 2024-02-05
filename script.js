'user strict'


flatpickr('#flatpickr', {
  enableTime: true,
  defaultDate: [new Date()],
  dateFormat: 'Y/m/d H:i',
  allowInput: true,
});

//localStorage.clear();

const inputDate = document.querySelector("#flatpickr");
const inputWpm = document.querySelector("#input-wpm");
const selectTime = document.querySelector("#select-time");
const submitButton = document.querySelector("#submit-button");
const ctx = document.getElementById("chart");
const list = document.querySelector("#record-list");

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
  }else {
    let getDate = localStorage.getItem("submitDate");
    let getWpm = localStorage.getItem("submitWpm");
    let getTime = localStorage.getItem("submitTime");

    getDate = JSON.parse(getDate);
    getWpm = JSON.parse(getWpm);
    getTime = JSON.parse(getTime);

    getDate.push(inputDate.value);
    getWpm.push(inputWpm.value);
    getTime.push(selectTime.value);

    localStorage.setItem("submitDate", JSON.stringify(getDate));
    localStorage.setItem("submitWpm", JSON.stringify(getWpm));
    localStorage.setItem("submitTime", JSON.stringify(getTime));
  }

  inputWpm.value = ""; //ボタン押した後、wpmを空欄にする

})

//リスト表示


let listGetDate = JSON.parse(localStorage.getItem("submitDate"));
let listGetWpm = JSON.parse(localStorage.getItem("submitWpm"));
let listGetTime = JSON.parse(localStorage.getItem("submitTime"));

let i = 0;
listGetDate.forEach((element) => {
  const tr = document.createElement("tr");
  list.appendChild(tr);

  const tdDate = document.createElement("td");
  tdDate.textContent = listGetDate[i];
  const tdWpm = document.createElement("td");
  tdWpm.textContent = listGetWpm[i];
  const tdTime = document.createElement("td");
  tdTime.textContent = listGetTime[i];

  i++;

  tr.appendChild(tdDate);
  tr.appendChild(tdWpm);
  tr.appendChild(tdTime);
});




let config  = new Chart(ctx, {
  type: "line",
  data: {
    labels : JSON.parse(localStorage.getItem("submitDate")),
    datasets : [{
      label: "my first data set",
      backgroundColor: '#e2b714',      
      borderColor: '#e2b714',
      data: JSON.parse(localStorage.getItem("submitWpm")),
    }]
  },
  options:{
    responsive: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        display: false, // 凡例を非表示
      },
      title: {
        display: true,
        text: "wpm",
      },
    }
  }
})


console.log("git_test")


// inputDate.addEventListener("change", change);
// inputWpm.addEventListener("change", change);
// selectTime.addEventListener("change", change);

// function change() {
//   console.log(selectTime.value);
//   console.log(inputDate.value);
//   console.log(inputWpm.value);
// }
