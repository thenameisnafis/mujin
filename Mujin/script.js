console.log("Welcome to Mujin");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));



let songs = [
    {songName: "Lutt Putt Gaya - Arijit Singh", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "O Maahi Dunki - Arijit Singh", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "CHALEYA - Arijit Singh", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Main Agar Kahoon - Sonu Nigam, Shreya Ghoshal", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Ankhon Mein Teri - KK", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Main Yahaan Hoon - Udit Narayan", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Hawayein - Arijit Singh", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Tujh Mein Rab Dikhta Hai -  Roopkumar Rathod", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Kal Ho Naa Ho - Sonu Nigam", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Kabhi Alvida Naa Kehna - Sonu Nigam", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
    {songName: "Do Pal - Sonu Nigam, Lata Mangeshkar", filePath: "songs/11.mp3", coverPath: "covers/6.jpg"},
    {songName: "Jawan Title Track - Anirudh Ravichander", filePath: "songs/12.mp3", coverPath: "covers/12.jpg"},
    {songName: "Mitwa -  Shafqat Amanat Ali", filePath: "songs/13.mp3", coverPath: "covers/10.jpg"},
    {songName: "Saans -  Shreya Ghoshal, Mohit Chauhan", filePath: "songs/14.mp3", coverPath: "covers/14.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

// Shuffle Functionality
document.getElementById('shuffle').addEventListener('click', () => {
    const shuffledIndices = Array.from({ length: songs.length }, (_, index) => index);
    for (let i = shuffledIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledIndices[i], shuffledIndices[j]] = [shuffledIndices[j], shuffledIndices[i]];
    }
    songItems.forEach((element, i) => {
        const shuffledIndex = shuffledIndices[i];
        element.getElementsByTagName("img")[0].src = songs[shuffledIndex].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[shuffledIndex].songName;
    });
    const currentSongIndex = songs.findIndex(song => song.filePath === audioElement.src);
    songIndex = currentSongIndex !== -1 ? shuffledIndices.indexOf(currentSongIndex) : 0;
    audioElement.src = songs[shuffledIndices[songIndex]].filePath;
    masterSongName.innerText = songs[shuffledIndices[songIndex]].songName;
});


// Next Functionality
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

// Previous Functionality
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

// Loop Functionality
document.getElementById('loop').addEventListener('click', () => {
    const loopIcon = document.getElementById('loop');
    audioElement.loop = !audioElement.loop;
    loopIcon.classList.toggle('active', audioElement.loop);
});

// Function to filter songs based on the search input
const filterSongs = (query) => {
    const filteredSongs = songs.filter((song) => {
        return song.songName.toLowerCase().includes(query.toLowerCase());
    });
    return filteredSongs;
};

// Function to update the song list based on the search results
const updateSongList = (filteredSongs) => {
    songItems.forEach((element, i) => {
        if (filteredSongs.includes(songs[i])) {
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    });
};


// Event listener for search icon click
document.getElementById('searchIcon').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    if (query !== '') {
        const filteredSongs = filterSongs(query);
        updateSongList(filteredSongs);
    } else {
        songItems.forEach((element) => {
            element.style.display = 'flex';
        });
    }
});


// Event listener for search input change
document.getElementById('searchInput').addEventListener('input', () => {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();

    const filteredSongs = filterSongs(query);
    updateSongList(filteredSongs);
});
