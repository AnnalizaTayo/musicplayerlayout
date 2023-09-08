const audioPlayer = document.getElementById("audio-player");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const seekHandle = document.querySelector(".seek-handle");
const currentTimeLabel = document.getElementById("current-time");
const totalDurationLabel = document.getElementById("total-duration");
const playButton = document.querySelector(".play");
const seekBar = document.querySelector(".seek-bar");

document.addEventListener("DOMContentLoaded", function() {
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const formattedTime = `${minutes}:${seconds < 10? '0' : ''}${seconds}`;
        return formattedTime;
    }

    playButton.addEventListener("click", function() {
        if(audioPlayer.paused) {
            audioPlayer.play();
            playButton.innerHTML = '<i class="fas fa-pause-circle"></i>';
        } else {
            audioPlayer.pause();
            playButton.innerHTML = '<i class="fas fa-play-circle"></i>';
        }
    });

    audioPlayer.addEventListener("timeupdate", function() {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
    
        const progressPercentage = (currentTime / duration) * 100;
    
        progress.style.width = progressPercentage + "%";
        seekHandle.style.left = progressPercentage + "%";
    
        currentTimeLabel.textContent = formatTime(currentTime);
    
        totalDurationLabel.textContent = formatTime(duration);
    });

    audioPlayer.addEventListener("ended", function() {
        
        audioPlayer.currentTime = 0;

        audioPlayer.pause();
        
        playButton.innerHTML = '<i class="fas fa-play-circle"></i>';
    });

    seekBar.addEventListener("click", function(e) {
        const clickX = e.clientX - seekBar.getBoundingClientRect().left;
        const barWidth = seekBar.clientWidth;
    
        const newTime = (clickX / barWidth) * audioPlayer.duration;
    
        audioPlayer.currentTime = newTime;
    });
});