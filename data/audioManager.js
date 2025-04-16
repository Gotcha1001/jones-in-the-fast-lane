// WALKING SOUND ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let audioContext = null;
let walkingSound = null;

export const initAudio = () => {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return true;
  } catch (error) {
    console.error("Web Audio API not supported:", error);
    return false;
  }
};

export const loadWalkingSound = async (url) => {
  if (!audioContext) {
    if (!initAudio()) return;
  }

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    walkingSound = audioBuffer;
    return true;
  } catch (error) {
    console.error("Error loading audio:", error);
    return false;
  }
};

let currentSound = null;

export const playWalkingSound = () => {
  if (!audioContext || !walkingSound) return;

  // Stop previous sound if playing
  if (currentSound) {
    currentSound.stop();
  }

  // Create new source
  const soundSource = audioContext.createBufferSource();
  soundSource.buffer = walkingSound;
  soundSource.loop = true;
  soundSource.connect(audioContext.destination);
  soundSource.start();

  currentSound = soundSource;
  return soundSource;
};

export const stopWalkingSound = () => {
  if (currentSound) {
    currentSound.stop();
    currentSound = null;
  }
};

//BANK MUSIC ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let bankMusic = null;
let bankMusicSource = null;

export const loadBankMusic = async (url) => {
  if (!audioContext) {
    if (!initAudio()) return;
  }

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    bankMusic = audioBuffer;
    return true;
  } catch (error) {
    console.error("Error loading bank music:", error);
    return false;
  }
};

export const playBankMusic = () => {
  if (!audioContext || !bankMusic) return;

  // Stop previous music if playing
  if (bankMusicSource) {
    bankMusicSource.stop();
  }

  // Create new source
  const musicSource = audioContext.createBufferSource();
  musicSource.buffer = bankMusic;
  musicSource.loop = true;
  musicSource.connect(audioContext.destination);
  musicSource.start();

  bankMusicSource = musicSource;
  return musicSource;
};

export const stopBankMusic = () => {
  if (bankMusicSource) {
    bankMusicSource.stop();
    bankMusicSource = null;
  }
};

// EMPLOYMENT MUSIC +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// data/audioManager.js
// Add these new functions to the existing file:

let employmentMusic = null;
let employmentMusicSource = null;

export const loadEmploymentMusic = async (url) => {
  if (!audioContext) {
    if (!initAudio()) return;
  }

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    employmentMusic = audioBuffer;
    return true;
  } catch (error) {
    console.error("Error loading employment office music:", error);
    return false;
  }
};

export const playEmploymentMusic = () => {
  if (!audioContext || !employmentMusic) return;

  // Stop previous music if playing
  if (employmentMusicSource) {
    employmentMusicSource.stop();
  }

  // Create new source
  const musicSource = audioContext.createBufferSource();
  musicSource.buffer = employmentMusic;
  musicSource.loop = true;
  musicSource.connect(audioContext.destination);
  musicSource.start();

  employmentMusicSource = musicSource;
  return musicSource;
};

export const stopEmploymentMusic = () => {
  if (employmentMusicSource) {
    employmentMusicSource.stop();
    employmentMusicSource = null;
  }
};

// Mall Music ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let mallMusic = null;
let mallMusicSource = null;

export const loadMallMusic = async (url) => {
  if (!audioContext) {
    if (!initAudio()) return;
  }

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    mallMusic = audioBuffer;
    return true;
  } catch (error) {
    console.error("Error loading mall music:", error);
    return false;
  }
};

export const playMallMusic = () => {
  if (!audioContext || !mallMusic) return;

  // Stop previous music if playing
  if (mallMusicSource) {
    mallMusicSource.stop();
  }

  // Create new source
  const musicSource = audioContext.createBufferSource();
  musicSource.buffer = mallMusic;
  musicSource.loop = true;
  musicSource.connect(audioContext.destination);
  musicSource.start();

  mallMusicSource = musicSource;
  return musicSource;
};

export const stopMallMusic = () => {
  if (mallMusicSource) {
    mallMusicSource.stop();
    mallMusicSource = null;
  }
};

//LEISURE MUSIC
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let leisureMusic = null;
let leisureMusicSource = null;

export const loadLeisureMusic = async (url) => {
  if (!audioContext) {
    if (!initAudio()) return;
  }

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    leisureMusic = audioBuffer;
    return true;
  } catch (error) {
    console.error("Error loading leisure music:", error);
    return false;
  }
};

export const playLeisureMusic = () => {
  if (!audioContext || !leisureMusic) return;

  // Stop previous music if playing
  if (leisureMusicSource) {
    leisureMusicSource.stop();
  }

  // Create new source
  const musicSource = audioContext.createBufferSource();
  musicSource.buffer = leisureMusic;
  musicSource.loop = true;
  musicSource.connect(audioContext.destination);
  musicSource.start();

  leisureMusicSource = musicSource;
  return musicSource;
};

export const stopLeisureMusic = () => {
  if (leisureMusicSource) {
    leisureMusicSource.stop();
    leisureMusicSource = null;
  }
};

// Add this to your audioManager.js file below the bankMusic section
//WORK MUSIC
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let workMusic = null;
let workMusicSource = null;

export const loadWorkMusic = async (url) => {
  if (!audioContext) {
    if (!initAudio()) return;
  }

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    workMusic = audioBuffer;
    return true;
  } catch (error) {
    console.error("Error loading work music:", error);
    return false;
  }
};

export const playWorkMusic = () => {
  if (!audioContext || !workMusic) return;

  // Stop previous music if playing
  if (workMusicSource) {
    workMusicSource.stop();
  }

  // Create new source
  const musicSource = audioContext.createBufferSource();
  musicSource.buffer = workMusic;
  musicSource.loop = true;
  musicSource.connect(audioContext.destination);
  musicSource.start();

  workMusicSource = musicSource;
  return musicSource;
};

export const stopWorkMusic = () => {
  if (workMusicSource) {
    workMusicSource.stop();
    workMusicSource = null;
  }
};

// UNIVERSITY MUSIC
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let universityMusic = null;
let universityMusicSource = null;

export const loadUniversityMusic = async (url) => {
  if (!audioContext) {
    if (!initAudio()) return;
  }

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    universityMusic = audioBuffer;
    return true;
  } catch (error) {
    console.error("Error loading university music:", error);
    return false;
  }
};

export const playUniversityMusic = () => {
  if (!audioContext || !universityMusic) return;

  // Stop previous music if playing
  if (universityMusicSource) {
    universityMusicSource.stop();
  }

  // Create new source
  const musicSource = audioContext.createBufferSource();
  musicSource.buffer = universityMusic;
  musicSource.loop = true;
  musicSource.connect(audioContext.destination);
  musicSource.start();

  universityMusicSource = musicSource;
  return musicSource;
};

export const stopUniversityMusic = () => {
  if (universityMusicSource) {
    universityMusicSource.stop();
    universityMusicSource = null;
  }
};

// HOME MUSIC
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let homeMusic = null;
let homeMusicSource = null;

export const loadHomeMusic = async (url) => {
  if (!audioContext) {
    if (!initAudio()) return;
  }

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    homeMusic = audioBuffer;
    return true;
  } catch (error) {
    console.error("Error loading home music:", error);
    return false;
  }
};

export const playHomeMusic = () => {
  if (!audioContext || !homeMusic) return;

  // Stop previous music if playing
  if (homeMusicSource) {
    homeMusicSource.stop();
  }

  // Create new source
  const musicSource = audioContext.createBufferSource();
  musicSource.buffer = homeMusic;
  musicSource.loop = true;
  musicSource.connect(audioContext.destination);
  musicSource.start();

  homeMusicSource = musicSource;
  return musicSource;
};

export const stopHomeMusic = () => {
  if (homeMusicSource) {
    homeMusicSource.stop();
    homeMusicSource = null;
  }
};

// FAST FOOD MUSIC
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let fastFoodMusic = null;
let fastFoodMusicSource = null;

export const loadFastFoodMusic = async (url) => {
  if (!audioContext) {
    if (!initAudio()) return;
  }

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    fastFoodMusic = audioBuffer;
    return true;
  } catch (error) {
    console.error("Error loading fast food music:", error);
    return false;
  }
};

export const playFastFoodMusic = () => {
  if (!audioContext || !fastFoodMusic) return;

  // Stop previous music if playing
  if (fastFoodMusicSource) {
    fastFoodMusicSource.stop();
  }

  // Create new source
  const musicSource = audioContext.createBufferSource();
  musicSource.buffer = fastFoodMusic;
  musicSource.loop = true;
  musicSource.connect(audioContext.destination);
  musicSource.start();

  fastFoodMusicSource = musicSource;
  return musicSource;
};

export const stopFastFoodMusic = () => {
  if (fastFoodMusicSource) {
    fastFoodMusicSource.stop();
    fastFoodMusicSource = null;
  }
};
