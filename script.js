"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-05-08T14:11:59.604Z",
    "2022-07-25T17:01:17.194Z",
    "2022-07-28T23:36:17.929Z",
    "2022-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};
const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "JPY",
  locale: "ja-JP",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-05-08T14:11:59.604Z",
    "2022-07-25T17:01:17.194Z",
    "2022-07-28T23:36:17.929Z",
    "2022-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "de-DE", // pt-PT
};

const accounts = [account1, account2, account3, account4];

// const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// Functions

const formatMovementDates = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);

  console.log(daysPassed);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const year = date.getFullYear();
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const day = `${date.getDate()}`.padStart(2, 0);
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    currencyDisplay: "narrowSymbol",
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ""; // this is to remove the previously inserted elements from the html

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i]);
    // date format day/month/year
    const displayDates = formatMovementDates(date, acc.locale);

    const formatNumMovements = formatCur(mov, acc.locale, acc.currency); //calling the function formatCur to apply the new formatted balance based on the internationalization
    console.log(formatNumMovements);

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">${displayDates}</div>
          
          <div class="movements__value">${formatNumMovements}</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html); // this is to insert html after the containerMovements
  });
};
// displayMovements(account1.movements)

const calcDisplaySummary = function (acct) {
  const incomes = acct.movements
    .filter((deposits) => deposits > 0)
    .reduce((acc, curr, i, array) => acc + curr, 0);
  // labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  labelSumIn.textContent = `${formatCur(incomes, acct.locale, acct.currency)}`; //calling the function formatCur to apply the new formatted income based on the internationalization

  const outcomes = acct.movements
    .filter((withdrawal) => withdrawal < 0)
    .reduce((acc, curr) => acc + curr, 0);
  // labelSumOut.textContent = `${Math.abs(outcomes)}€`;
  // labelSumOut.textContent = `${Math.abs(outcomes).toFixed(2)}€`;
  labelSumOut.textContent = `${formatCur(
    outcomes,
    acct.locale,
    acct.currency
  )}`;

  const interest = acct.movements
    .filter((deposits) => deposits > 0) //this returns the array of deposits i.e array of numbers greater than 0
    .map((interest) => (interest * acct.interestRate) / 100) // this multiplies the array by the interest rate
    .filter((mov) => mov >= 1) //this filters out interest less than 1
    .reduce((acc, int, i, arr) => acc + int, 0); //this adds the interests and returns the sumTotal
  labelSumInterest.textContent = `${formatCur(
    interest,
    acct.locale,
    acct.currency
  )}`;
};
calcDisplaySummary(accounts[0]);

// const user = account3.owner
// const username = user
//   .toLowerCase()
//   .split(' ')
//   .map(function (letter) {
//     return letter[0];
//   })
//   .join('');
// console.log(username);

const creatingUsernames = function (accts) {
  accts.forEach(function (acct) {
    acct.username = acct.owner
      .toLowerCase()
      .split(" ")
      .map(function (letter) {
        return letter[0];
      })
      .join("");
  });
};
creatingUsernames(accounts);
console.log(accounts);

const balance = account1.movements.reduce(function (acc, mov) {
  return acc + mov;
}, 0);

console.log(balance);

const displayAndPrintBalance = function (accts) {
  accts.balance = accts.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${formatCur(
    accts.balance,
    accts.locale,
    accts.currency
  )}`;
};

displayAndPrintBalance(account1);

const startTimer = function () {
  // setting the timer
  let time = 120;
  const tick = function () {
    const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
    const seconds = `${time % 60}`.padStart(2, 0);
    // console.log(seconds);
    // console.log(min);
    labelTimer.textContent = `${min}:${seconds}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Log in to get started";
      containerApp.style.opacity = 0;
    }
    time--;
  };
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// Event Handlers

let currentAccount, timer;

// implementing login
btnLogin.addEventListener("click", function (e) {
  // this will prevent reloading when a submit button is clicked
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    // one way of formatting dates without using internationalizing API
    // const now = new Date()
    // const year = now.getFullYear();
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const date = `${now.getDate()}`.padStart(2, 0);
    // const hours = `${now.getHours()}`.padStart(2,0);
    // const minutes = `${now.getMinutes()}`.padStart(2, 0);
    // // const seconds = now.getSeconds();

    // // date format day/month/year
    // labelDate.textContent = `${date}/${month}/${year}, ${hours}:${minutes}`;

    // formatting with internationalizing API

    const now = new Date();

    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      // weekday: "long"
    };
    console.log(
      new Intl.DateTimeFormat(currentAccount.locale, options).format(now)
    );
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";

    inputLoginPin.blur();
    if (timer) clearInterval(timer); // if the time exists already, clear it
    timer = startTimer(); // sets the timer to a startTimer function. when you first log in, timer doesn't exist but once logged in, timer will exist and will be cleared once it exists and you log into another another account
    // display balance of current user

    displayAndPrintBalance(currentAccount);

    // display account summary of the current user
    calcDisplaySummary(currentAccount);

    // display account movements

    displayMovements(currentAccount);
  } else if (currentAccount === undefined) {
    labelWelcome.textContent = `Please Enter a valid Username`;
    containerApp.style.opacity = 0;
  } else {
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Incorrect pin`;
  }
});

// implementing transfer

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  console.log(amount);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc !== currentAccount &&
    currentAccount.balance >= amount &&
    receiverAcc
  ) {
    receiverAcc.movements.push(amount);
    currentAccount.movements.push(-amount);

    // add transfer date too
    receiverAcc.movementsDates.push(new Date().toISOString());
    currentAccount.movementsDates.push(new Date().toISOString());

    displayAndPrintBalance(currentAccount);

    // display account summary of the current user
    calcDisplaySummary(currentAccount);

    // display account movements

    displayMovements(currentAccount);

    // resetting timer
    clearInterval(timer);
    timer = startTimer();
  }
});

// implementing Loan request

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount / 10)
  ) {
    setTimeout(function () {
      currentAccount.movements.push(amount);
      // add transfer date too
      currentAccount.movementsDates.push(new Date().toISOString());

      displayAndPrintBalance(currentAccount);

      // display account summary of the current user
      calcDisplaySummary(currentAccount);

      // display account movements

      displayMovements(currentAccount);

      // resetting timer
      clearInterval(timer);
      timer = startTimer();
    }, 2500);
    inputLoanAmount.value = "";
  }
});

// closing of account using the findIndex

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value) &&
    currentAccount
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === inputCloseUsername.value
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
});

// relates to sorting of the movements
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
