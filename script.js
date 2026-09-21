// 15 Daqiqalik Teskari Taymer
function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration; // Vaqt tugasa qayta boshlanadi
        }
    }, 1000);
}

window.onload = function () {
    let fifteenMinutes = 60 * 15,
        display = document.querySelector('#timer');
    startTimer(fifteenMinutes, display);
};

// Paketi tanlash
function setPackage(packageName) {
    document.getElementById('selected-package').value = packageName;
}