const cover = document.getElementById("cover");
const disc = document.getElementById("disc");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const timer = document.getElementById("timer");
const duration = document.getElementById("duration");
const prev = document.getElementById("prev");
const play = document.getElementById("play");
const next = document.getElementById("next");
let songIndex = 0;

const songs = [
  {
    title: "Pink Venom",
    artist: "Blackpink",
    coverPath: "Images/PinkVenom Cover.jpg",
    discPath: "Musics/Pink Venom blackpink.mp3",
    duration: "3:07",
  },
  {
    title: "Money",
    artist: "Lisa",
    coverPath: "Images/money cover.jfif",
    discPath: "Musics/LISA  MONEY.mp3",
    duration: "2:51",
  },
  {
    title: "Solo",
    artist: "Jennie",
    coverPath: "Images/solo cover.png",
    discPath: "Musics/Jennie  Solo.mp3",
    duration: "3:09",
  },
];

loadSong(songs[songIndex]);

function loadSong(song) {
  cover.src = song.coverPath;
  disc.src = song.discPath;
  title.textContent = song.title;
  artist.textContent = song.artist;
  duration.textContent = song.duration;
}

function playPauseMedia() {
  if (disc.paused) {
    disc.play();
  } else {
    disc.pause();
  }
}

function updatePlayPauseIcon() {
  if (disc.paused) {
    play.classList.remove("fa-pause");
    play.classList.add("fa-play");
  } else {
    play.classList.remove("fa-play");
    play.classList.add("fa-pause");
  }
}

function updateProgress() {
  progress.style.width = (disc.currentTime / disc.duration) * 100 + "%";

  let minutes = Math.floor(disc.currentTime / 60);
  let seconds = Math.floor(disc.currentTime % 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
}

function resetProgress() {
  progress.style.width = 0 + "%";
  timer.textContent = "0:00";
}

function gotoPreviousSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow) {
    playPauseMedia();
  }
}

function gotoNextSong(playImmediately) {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow || playImmediately) {
    playPauseMedia();
  }
}

function setProgress(ev) {
  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  const clickWidthRatio = clickWidth / totalWidth;
  disc.currentTime = clickWidthRatio * disc.duration;
}

play.addEventListener("click", playPauseMedia);

disc.addEventListener("play", updatePlayPauseIcon);
disc.addEventListener("pause", updatePlayPauseIcon);
disc.addEventListener("timeupdate", updateProgress);
disc.addEventListener("ended", gotoNextSong.bind(null, true));

prev.addEventListener("click", gotoPreviousSong);

next.addEventListener("click", gotoNextSong.bind(null, false));

progressContainer.addEventListener("click", setProgress);
