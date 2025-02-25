const songs = [
   { title: "Song 1", src: "Song.mp3", image: "icon.png" },
   { title: "Song 2", src: "Song1.mp3", image: "icon1.jpeg" },
   { title: "Song 3", src: "Song2.mp3", image: "icon2.jpeg" }
];

let currentSongIndex = 0;

const audio = new Audio();
const songTitle = document.getElementById("song-title");
const songImage = document.getElementById("song-image");
const playButton = document.getElementById("play-button");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const seekSlider = document.getElementById("seek-slider");
const songList = document.getElementById("song-list");
const menuIcon = document.getElementById("menu-icon");
const dropdownMenu = document.getElementById("dropdown-menu");

let isPlaying = false;

// Load the current song
function loadSong(index) {
   const song = songs[index];
   audio.src = song.src;
   songTitle.textContent = song.title;
   songImage.src = song.image;
}

// Play or pause the music
function toggleAudio() {
   if (isPlaying) {
       audio.pause();
       playButton.textContent = "▶";
       isPlaying = false;
   } else {
       audio.play();
       playButton.textContent = "⏸";
       isPlaying = true;
   }
}

// Load next song
function nextSong() {
   currentSongIndex = (currentSongIndex + 1) % songs.length;
   loadSong(currentSongIndex);
   audio.play();
   playButton.textContent = "⏸";
}

// Load previous song
function prevSong() {
   currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
   loadSong(currentSongIndex);
   audio.play();
   playButton.textContent = "⏸";
}

// Populate the song list
songs.forEach((song, index) => {
   const li = document.createElement("li");
   li.textContent = song.title;
   li.addEventListener("click", () => {
       currentSongIndex = index;
       loadSong(currentSongIndex);
       audio.play();
       playButton.textContent = "⏸";

       // Close the menu after selecting a song
       dropdownMenu.style.display = "none";
   });
   songList.appendChild(li);
});

// Event listeners for buttons
playButton.addEventListener("click", toggleAudio);
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", prevSong);

// Toggle menu visibility on clicking menu icon
menuIcon.addEventListener("click", () => {
   dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
});

// Update seek slider as audio plays
audio.addEventListener('timeupdate', () => {
   seekSlider.value = (audio.currentTime / audio.duration) * 100 || 0;
});

// Seek functionality
seekSlider.addEventListener('input', () => {
   audio.currentTime = (seekSlider.value / 100) * audio.duration || 0;
});

// Initial load of first song
loadSong(currentSongIndex);
