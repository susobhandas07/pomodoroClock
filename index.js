//audio file
const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/586/586-preview.mp3");

//svg offset value
let anOffset = getComputedStyle(document.querySelector("svg")).strokeDasharray;

const timer = document.getElementById("timer"), currentStateDisplay = document.getElementById("current-state");

//animation
const animationStates = [
    { strokeDashoffset: "0" },
    { strokeDashoffset: `${anOffset}` }
];
let isPlaying = null, animation = null;
const time = document.getElementById("time");
let duration = 0, startTime = null, elapsedTime = 0;
//time display update

function update(timeStamp) {
    if (startTime === null) startTime = timeStamp;
    if (isPlaying) {
        elapsedTime = timeStamp - startTime;
        let currentTime = Math.floor((duration - elapsedTime) / 1000);
        let min = Math.floor(currentTime / 60), sec = currentTime % 60;
        time.innerText = `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
        requestAnimationFrame(update);
    }
    else {
        startTime = null;
    }
}


//timer play/pause
function playPause() {
    if (isPlaying === null) {
        const states = document.getElementsByName("state"), times = document.getElementsByClassName("time-input");
        for (let key in states) {
            let state = states[key];
            if (state.checked === true) {
                duration = parseFloat(times[key].value) * 60000;
                break;
            }
        }
        animation = timer.animate(animationStates, { duration: duration });
        animation.pause();
        animation.onfinish = () => {
            isPlaying = false;
            audio.play();
            currentStateDisplay.innerText = "start";
            openModal.disabled = false;
            isPlaying = null;
            startTime = null;
            // time.innerText = "00:00";
        }
        isPlaying = false;
    }
    if (isPlaying === false) {
        animation.play();
        isPlaying = true;
        requestAnimationFrame(update);
        openModal.disabled = true;
        currentStateDisplay.innerText = "pause";
    } else {
        animation.pause();
        isPlaying = false;
        openModal.disabled = false;
        currentStateDisplay.innerText = "resume";
        duration -= elapsedTime;
        // console.log(elapsedTime, duration);
    }
}

//setting modal
const openModal = document.getElementById("open-modal"), modal = document.querySelector("[data-modal]"), closeModal = document.getElementById("close-modal");

openModal.addEventListener("click", () => {
    modal.showModal();
});
closeModal.addEventListener("click", () => {
    modal.close();
});
