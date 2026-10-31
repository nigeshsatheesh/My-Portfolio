const date = document.querySelector(".date");

const updateDate = () => {
    let now = new Date();
    let nowMonth = now.toLocaleString("en-IN", {month: "long"});
    let nowYear = now.toLocaleString("en-IN", {year: "numeric"});
    date.textContent = nowMonth + ", " + nowYear;
};

updateDate();

setInterval(updateDate, 1000*60*60);