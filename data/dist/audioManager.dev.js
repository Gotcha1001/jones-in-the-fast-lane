"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.playClickSound = exports.loadClickSound = exports.stopHealingCentreMusic = exports.playHealingCentreMusic = exports.loadHealingCentreMusic = exports.stopDatingOfficeMusic = exports.playDatingOfficeMusic = exports.loadDatingOfficeMusic = exports.stopFastFoodMusic = exports.playFastFoodMusic = exports.loadFastFoodMusic = exports.stopHomeMusic = exports.playHomeMusic = exports.loadHomeMusic = exports.stopUniversityMusic = exports.playUniversityMusic = exports.loadUniversityMusic = exports.stopWorkMusic = exports.playWorkMusic = exports.loadWorkMusic = exports.stopLeisureMusic = exports.playLeisureMusic = exports.loadLeisureMusic = exports.stopMallMusic = exports.playMallMusic = exports.loadMallMusic = exports.stopEmploymentMusic = exports.playEmploymentMusic = exports.loadEmploymentMusic = exports.stopBankMusic = exports.playBankMusic = exports.loadBankMusic = exports.stopWalkingSound = exports.playWalkingSound = exports.loadWalkingSound = exports.initAudio = void 0;
// WALKING SOUND ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var audioContext = null;
var walkingSound = null;

var initAudio = function initAudio() {
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

exports.initAudio = initAudio;

var loadWalkingSound = function loadWalkingSound(url) {
  var response, arrayBuffer, audioBuffer;
  return regeneratorRuntime.async(function loadWalkingSound$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (audioContext) {
            _context.next = 3;
            break;
          }

          if (initAudio()) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return");

        case 3:
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch(url));

        case 6:
          response = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(response.arrayBuffer());

        case 9:
          arrayBuffer = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(audioContext.decodeAudioData(arrayBuffer));

        case 12:
          audioBuffer = _context.sent;
          walkingSound = audioBuffer;
          return _context.abrupt("return", true);

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](3);
          console.error("Error loading audio:", _context.t0);
          return _context.abrupt("return", false);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 17]]);
};

exports.loadWalkingSound = loadWalkingSound;
var currentSound = null;

var playWalkingSound = function playWalkingSound() {
  if (!audioContext || !walkingSound) return; // Stop previous sound if playing

  if (currentSound) {
    currentSound.stop();
  } // Create new source


  var soundSource = audioContext.createBufferSource();
  soundSource.buffer = walkingSound;
  soundSource.loop = true;
  soundSource.connect(audioContext.destination);
  soundSource.start();
  currentSound = soundSource;
  return soundSource;
};

exports.playWalkingSound = playWalkingSound;

var stopWalkingSound = function stopWalkingSound() {
  if (currentSound) {
    currentSound.stop();
    currentSound = null;
  }
}; //BANK MUSIC ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


exports.stopWalkingSound = stopWalkingSound;
var bankMusic = null;
var bankMusicSource = null;

var loadBankMusic = function loadBankMusic(url) {
  var response, arrayBuffer, audioBuffer;
  return regeneratorRuntime.async(function loadBankMusic$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (audioContext) {
            _context2.next = 3;
            break;
          }

          if (initAudio()) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return");

        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return regeneratorRuntime.awrap(fetch(url));

        case 6:
          response = _context2.sent;
          _context2.next = 9;
          return regeneratorRuntime.awrap(response.arrayBuffer());

        case 9:
          arrayBuffer = _context2.sent;
          _context2.next = 12;
          return regeneratorRuntime.awrap(audioContext.decodeAudioData(arrayBuffer));

        case 12:
          audioBuffer = _context2.sent;
          bankMusic = audioBuffer;
          return _context2.abrupt("return", true);

        case 17:
          _context2.prev = 17;
          _context2.t0 = _context2["catch"](3);
          console.error("Error loading bank music:", _context2.t0);
          return _context2.abrupt("return", false);

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[3, 17]]);
};

exports.loadBankMusic = loadBankMusic;

var playBankMusic = function playBankMusic() {
  if (!audioContext || !bankMusic) return; // Stop previous music if playing

  if (bankMusicSource) {
    bankMusicSource.stop();
  } // Create new source


  var musicSource = audioContext.createBufferSource();
  musicSource.buffer = bankMusic;
  musicSource.loop = true;
  musicSource.connect(audioContext.destination);
  musicSource.start();
  bankMusicSource = musicSource;
  return musicSource;
};

exports.playBankMusic = playBankMusic;

var stopBankMusic = function stopBankMusic() {
  if (bankMusicSource) {
    bankMusicSource.stop();
    bankMusicSource = null;
  }
}; // EMPLOYMENT MUSIC +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// data/audioManager.js
// Add these new functions to the existing file:


exports.stopBankMusic = stopBankMusic;
var employmentMusic = null;
var employmentMusicSource = null;

var loadEmploymentMusic = function loadEmploymentMusic(url) {
  var response, arrayBuffer, audioBuffer;
  return regeneratorRuntime.async(function loadEmploymentMusic$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (audioContext) {
            _context3.next = 3;
            break;
          }

          if (initAudio()) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return");

        case 3:
          _context3.prev = 3;
          _context3.next = 6;
          return regeneratorRuntime.awrap(fetch(url));

        case 6:
          response = _context3.sent;
          _context3.next = 9;
          return regeneratorRuntime.awrap(response.arrayBuffer());

        case 9:
          arrayBuffer = _context3.sent;
          _context3.next = 12;
          return regeneratorRuntime.awrap(audioContext.decodeAudioData(arrayBuffer));

        case 12:
          audioBuffer = _context3.sent;
          employmentMusic = audioBuffer;
          return _context3.abrupt("return", true);

        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](3);
          console.error("Error loading employment office music:", _context3.t0);
          return _context3.abrupt("return", false);

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 17]]);
};

exports.loadEmploymentMusic = loadEmploymentMusic;

var playEmploymentMusic = function playEmploymentMusic() {
  if (!audioContext || !employmentMusic) return; // Stop previous music if playing

  if (employmentMusicSource) {
    employmentMusicSource.stop();
  } // Create new source


  var musicSource = audioContext.createBufferSource();
  musicSource.buffer = employmentMusic;
  musicSource.loop = true;
  musicSource.connect(audioContext.destination);
  musicSource.start();
  employmentMusicSource = musicSource;
  return musicSource;
};

exports.playEmploymentMusic = playEmploymentMusic;

var stopEmploymentMusic = function stopEmploymentMusic() {
  if (employmentMusicSource) {
    employmentMusicSource.stop();
    employmentMusicSource = null;
  }
}; // Mall Music ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


exports.stopEmploymentMusic = stopEmploymentMusic;
var mallMusic = null;
var mallMusicSource = null;

var loadMallMusic = function loadMallMusic(url) {
  var response, arrayBuffer, audioBuffer;
  return regeneratorRuntime.async(function loadMallMusic$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (audioContext) {
            _context4.next = 3;
            break;
          }

          if (initAudio()) {
            _context4.next = 3;
            break;
          }

          return _context4.abrupt("return");

        case 3:
          _context4.prev = 3;
          _context4.next = 6;
          return regeneratorRuntime.awrap(fetch(url));

        case 6:
          response = _context4.sent;
          _context4.next = 9;
          return regeneratorRuntime.awrap(response.arrayBuffer());

        case 9:
          arrayBuffer = _context4.sent;
          _context4.next = 12;
          return regeneratorRuntime.awrap(audioContext.decodeAudioData(arrayBuffer));

        case 12:
          audioBuffer = _context4.sent;
          mallMusic = audioBuffer;
          return _context4.abrupt("return", true);

        case 17:
          _context4.prev = 17;
          _context4.t0 = _context4["catch"](3);
          console.error("Error loading mall music:", _context4.t0);
          return _context4.abrupt("return", false);

        case 21:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[3, 17]]);
};

exports.loadMallMusic = loadMallMusic;

var playMallMusic = function playMallMusic() {
  if (!audioContext || !mallMusic) return; // Stop previous music if playing

  if (mallMusicSource) {
    mallMusicSource.stop();
  } // Create new source


  var musicSource = audioContext.createBufferSource();
  musicSource.buffer = mallMusic;
  musicSource.loop = true;
  musicSource.connect(audioContext.destination);
  musicSource.start();
  mallMusicSource = musicSource;
  return musicSource;
};

exports.playMallMusic = playMallMusic;

var stopMallMusic = function stopMallMusic() {
  if (mallMusicSource) {
    mallMusicSource.stop();
    mallMusicSource = null;
  }
}; //LEISURE MUSIC
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


exports.stopMallMusic = stopMallMusic;
var leisureMusic = null;
var leisureMusicSource = null;

var loadLeisureMusic = function loadLeisureMusic(url) {
  var response, arrayBuffer, audioBuffer;
  return regeneratorRuntime.async(function loadLeisureMusic$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (audioContext) {
            _context5.next = 3;
            break;
          }

          if (initAudio()) {
            _context5.next = 3;
            break;
          }

          return _context5.abrupt("return");

        case 3:
          _context5.prev = 3;
          _context5.next = 6;
          return regeneratorRuntime.awrap(fetch(url));

        case 6:
          response = _context5.sent;
          _context5.next = 9;
          return regeneratorRuntime.awrap(response.arrayBuffer());

        case 9:
          arrayBuffer = _context5.sent;
          _context5.next = 12;
          return regeneratorRuntime.awrap(audioContext.decodeAudioData(arrayBuffer));

        case 12:
          audioBuffer = _context5.sent;
          leisureMusic = audioBuffer;
          return _context5.abrupt("return", true);

        case 17:
          _context5.prev = 17;
          _context5.t0 = _context5["catch"](3);
          console.error("Error loading leisure music:", _context5.t0);
          return _context5.abrupt("return", false);

        case 21:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[3, 17]]);
};

exports.loadLeisureMusic = loadLeisureMusic;

var playLeisureMusic = function playLeisureMusic() {
  if (!audioContext || !leisureMusic) return; // Stop previous music if playing

  if (leisureMusicSource) {
    leisureMusicSource.stop();
  } // Create new source


  var musicSource = audioContext.createBufferSource();
  musicSource.buffer = leisureMusic;
  musicSource.loop = true;
  musicSource.connect(audioContext.destination);
  musicSource.start();
  leisureMusicSource = musicSource;
  return musicSource;
};

exports.playLeisureMusic = playLeisureMusic;

var stopLeisureMusic = function stopLeisureMusic() {
  if (leisureMusicSource) {
    leisureMusicSource.stop();
    leisureMusicSource = null;
  }
}; // Add this to your audioManager.js file below the bankMusic section
//WORK MUSIC
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


exports.stopLeisureMusic = stopLeisureMusic;
var workMusic = null;
var workMusicSource = null;

var loadWorkMusic = function loadWorkMusic(url) {
  var response, arrayBuffer, audioBuffer;
  return regeneratorRuntime.async(function loadWorkMusic$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (audioContext) {
            _context6.next = 3;
            break;
          }

          if (initAudio()) {
            _context6.next = 3;
            break;
          }

          return _context6.abrupt("return");

        case 3:
          _context6.prev = 3;
          _context6.next = 6;
          return regeneratorRuntime.awrap(fetch(url));

        case 6:
          response = _context6.sent;
          _context6.next = 9;
          return regeneratorRuntime.awrap(response.arrayBuffer());

        case 9:
          arrayBuffer = _context6.sent;
          _context6.next = 12;
          return regeneratorRuntime.awrap(audioContext.decodeAudioData(arrayBuffer));

        case 12:
          audioBuffer = _context6.sent;
          workMusic = audioBuffer;
          return _context6.abrupt("return", true);

        case 17:
          _context6.prev = 17;
          _context6.t0 = _context6["catch"](3);
          console.error("Error loading work music:", _context6.t0);
          return _context6.abrupt("return", false);

        case 21:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[3, 17]]);
};

exports.loadWorkMusic = loadWorkMusic;

var playWorkMusic = function playWorkMusic() {
  if (!audioContext || !workMusic) return; // Stop previous music if playing

  if (workMusicSource) {
    workMusicSource.stop();
  } // Create new source


  var musicSource = audioContext.createBufferSource();
  musicSource.buffer = workMusic;
  musicSource.loop = true;
  musicSource.connect(audioContext.destination);
  musicSource.start();
  workMusicSource = musicSource;
  return musicSource;
};

exports.playWorkMusic = playWorkMusic;

var stopWorkMusic = function stopWorkMusic() {
  if (workMusicSource) {
    workMusicSource.stop();
    workMusicSource = null;
  }
}; // UNIVERSITY MUSIC
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


exports.stopWorkMusic = stopWorkMusic;
var universityMusic = null;
var universityMusicSource = null;

var loadUniversityMusic = function loadUniversityMusic(url) {
  var response, arrayBuffer, audioBuffer;
  return regeneratorRuntime.async(function loadUniversityMusic$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (audioContext) {
            _context7.next = 3;
            break;
          }

          if (initAudio()) {
            _context7.next = 3;
            break;
          }

          return _context7.abrupt("return");

        case 3:
          _context7.prev = 3;
          _context7.next = 6;
          return regeneratorRuntime.awrap(fetch(url));

        case 6:
          response = _context7.sent;
          _context7.next = 9;
          return regeneratorRuntime.awrap(response.arrayBuffer());

        case 9:
          arrayBuffer = _context7.sent;
          _context7.next = 12;
          return regeneratorRuntime.awrap(audioContext.decodeAudioData(arrayBuffer));

        case 12:
          audioBuffer = _context7.sent;
          universityMusic = audioBuffer;
          return _context7.abrupt("return", true);

        case 17:
          _context7.prev = 17;
          _context7.t0 = _context7["catch"](3);
          console.error("Error loading university music:", _context7.t0);
          return _context7.abrupt("return", false);

        case 21:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[3, 17]]);
};

exports.loadUniversityMusic = loadUniversityMusic;

var playUniversityMusic = function playUniversityMusic() {
  if (!audioContext || !universityMusic) return; // Stop previous music if playing

  if (universityMusicSource) {
    universityMusicSource.stop();
  } // Create new source


  var musicSource = audioContext.createBufferSource();
  musicSource.buffer = universityMusic;
  musicSource.loop = true;
  musicSource.connect(audioContext.destination);
  musicSource.start();
  universityMusicSource = musicSource;
  return musicSource;
};

exports.playUniversityMusic = playUniversityMusic;

var stopUniversityMusic = function stopUniversityMusic() {
  if (universityMusicSource) {
    universityMusicSource.stop();
    universityMusicSource = null;
  }
}; // HOME MUSIC
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


exports.stopUniversityMusic = stopUniversityMusic;
var homeMusic = null;
var homeMusicSource = null;

var loadHomeMusic = function loadHomeMusic(url) {
  var response, arrayBuffer, audioBuffer;
  return regeneratorRuntime.async(function loadHomeMusic$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          if (audioContext) {
            _context8.next = 3;
            break;
          }

          if (initAudio()) {
            _context8.next = 3;
            break;
          }

          return _context8.abrupt("return");

        case 3:
          _context8.prev = 3;
          _context8.next = 6;
          return regeneratorRuntime.awrap(fetch(url));

        case 6:
          response = _context8.sent;
          _context8.next = 9;
          return regeneratorRuntime.awrap(response.arrayBuffer());

        case 9:
          arrayBuffer = _context8.sent;
          _context8.next = 12;
          return regeneratorRuntime.awrap(audioContext.decodeAudioData(arrayBuffer));

        case 12:
          audioBuffer = _context8.sent;
          homeMusic = audioBuffer;
          return _context8.abrupt("return", true);

        case 17:
          _context8.prev = 17;
          _context8.t0 = _context8["catch"](3);
          console.error("Error loading home music:", _context8.t0);
          return _context8.abrupt("return", false);

        case 21:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[3, 17]]);
};

exports.loadHomeMusic = loadHomeMusic;

var playHomeMusic = function playHomeMusic() {
  if (!audioContext || !homeMusic) return; // Stop previous music if playing

  if (homeMusicSource) {
    homeMusicSource.stop();
  } // Create new source


  var musicSource = audioContext.createBufferSource();
  musicSource.buffer = homeMusic;
  musicSource.loop = true;
  musicSource.connect(audioContext.destination);
  musicSource.start();
  homeMusicSource = musicSource;
  return musicSource;
};

exports.playHomeMusic = playHomeMusic;

var stopHomeMusic = function stopHomeMusic() {
  if (homeMusicSource) {
    homeMusicSource.stop();
    homeMusicSource = null;
  }
}; // FAST FOOD MUSIC
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


exports.stopHomeMusic = stopHomeMusic;
var fastFoodMusic = null;
var fastFoodMusicSource = null;

var loadFastFoodMusic = function loadFastFoodMusic(url) {
  var response, arrayBuffer, audioBuffer;
  return regeneratorRuntime.async(function loadFastFoodMusic$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          if (audioContext) {
            _context9.next = 3;
            break;
          }

          if (initAudio()) {
            _context9.next = 3;
            break;
          }

          return _context9.abrupt("return");

        case 3:
          _context9.prev = 3;
          _context9.next = 6;
          return regeneratorRuntime.awrap(fetch(url));

        case 6:
          response = _context9.sent;
          _context9.next = 9;
          return regeneratorRuntime.awrap(response.arrayBuffer());

        case 9:
          arrayBuffer = _context9.sent;
          _context9.next = 12;
          return regeneratorRuntime.awrap(audioContext.decodeAudioData(arrayBuffer));

        case 12:
          audioBuffer = _context9.sent;
          fastFoodMusic = audioBuffer;
          return _context9.abrupt("return", true);

        case 17:
          _context9.prev = 17;
          _context9.t0 = _context9["catch"](3);
          console.error("Error loading fast food music:", _context9.t0);
          return _context9.abrupt("return", false);

        case 21:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[3, 17]]);
};

exports.loadFastFoodMusic = loadFastFoodMusic;

var playFastFoodMusic = function playFastFoodMusic() {
  if (!audioContext || !fastFoodMusic) return; // Stop previous music if playing

  if (fastFoodMusicSource) {
    fastFoodMusicSource.stop();
  } // Create new source


  var musicSource = audioContext.createBufferSource();
  musicSource.buffer = fastFoodMusic;
  musicSource.loop = true;
  musicSource.connect(audioContext.destination);
  musicSource.start();
  fastFoodMusicSource = musicSource;
  return musicSource;
};

exports.playFastFoodMusic = playFastFoodMusic;

var stopFastFoodMusic = function stopFastFoodMusic() {
  if (fastFoodMusicSource) {
    fastFoodMusicSource.stop();
    fastFoodMusicSource = null;
  }
}; // DATING OFFICE MUSIC
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


exports.stopFastFoodMusic = stopFastFoodMusic;
var datingOfficeMusic = null;
var datingOfficeMusicSource = null;

var loadDatingOfficeMusic = function loadDatingOfficeMusic(url) {
  var response, arrayBuffer, audioBuffer;
  return regeneratorRuntime.async(function loadDatingOfficeMusic$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          if (audioContext) {
            _context10.next = 3;
            break;
          }

          if (initAudio()) {
            _context10.next = 3;
            break;
          }

          return _context10.abrupt("return");

        case 3:
          _context10.prev = 3;
          _context10.next = 6;
          return regeneratorRuntime.awrap(fetch(url));

        case 6:
          response = _context10.sent;
          _context10.next = 9;
          return regeneratorRuntime.awrap(response.arrayBuffer());

        case 9:
          arrayBuffer = _context10.sent;
          _context10.next = 12;
          return regeneratorRuntime.awrap(audioContext.decodeAudioData(arrayBuffer));

        case 12:
          audioBuffer = _context10.sent;
          datingOfficeMusic = audioBuffer;
          return _context10.abrupt("return", true);

        case 17:
          _context10.prev = 17;
          _context10.t0 = _context10["catch"](3);
          console.error("Error loading dating office music:", _context10.t0);
          return _context10.abrupt("return", false);

        case 21:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[3, 17]]);
};

exports.loadDatingOfficeMusic = loadDatingOfficeMusic;

var playDatingOfficeMusic = function playDatingOfficeMusic() {
  if (!audioContext || !datingOfficeMusic) return; // Stop previous music if playing

  if (datingOfficeMusicSource) {
    datingOfficeMusicSource.stop();
  } // Create new source


  var musicSource = audioContext.createBufferSource();
  musicSource.buffer = datingOfficeMusic;
  musicSource.loop = true;
  musicSource.connect(audioContext.destination);
  musicSource.start();
  datingOfficeMusicSource = musicSource;
  return musicSource;
};

exports.playDatingOfficeMusic = playDatingOfficeMusic;

var stopDatingOfficeMusic = function stopDatingOfficeMusic() {
  if (datingOfficeMusicSource) {
    datingOfficeMusicSource.stop();
    datingOfficeMusicSource = null;
  }
}; // HEALING CENTRE MUSIC
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


exports.stopDatingOfficeMusic = stopDatingOfficeMusic;
var healingCentreMusic = null;
var healingCentreMusicSource = null;

var loadHealingCentreMusic = function loadHealingCentreMusic(url) {
  var response, arrayBuffer, audioBuffer;
  return regeneratorRuntime.async(function loadHealingCentreMusic$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          if (audioContext) {
            _context11.next = 3;
            break;
          }

          if (initAudio()) {
            _context11.next = 3;
            break;
          }

          return _context11.abrupt("return");

        case 3:
          _context11.prev = 3;
          _context11.next = 6;
          return regeneratorRuntime.awrap(fetch(url));

        case 6:
          response = _context11.sent;
          _context11.next = 9;
          return regeneratorRuntime.awrap(response.arrayBuffer());

        case 9:
          arrayBuffer = _context11.sent;
          _context11.next = 12;
          return regeneratorRuntime.awrap(audioContext.decodeAudioData(arrayBuffer));

        case 12:
          audioBuffer = _context11.sent;
          healingCentreMusic = audioBuffer;
          return _context11.abrupt("return", true);

        case 17:
          _context11.prev = 17;
          _context11.t0 = _context11["catch"](3);
          console.error("Error loading healing centre music:", _context11.t0);
          return _context11.abrupt("return", false);

        case 21:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[3, 17]]);
};

exports.loadHealingCentreMusic = loadHealingCentreMusic;

var playHealingCentreMusic = function playHealingCentreMusic() {
  if (!audioContext || !healingCentreMusic) return; // Stop previous music if playing

  if (healingCentreMusicSource) {
    healingCentreMusicSource.stop();
  } // Create new source


  var musicSource = audioContext.createBufferSource();
  musicSource.buffer = healingCentreMusic;
  musicSource.loop = true;
  musicSource.connect(audioContext.destination);
  musicSource.start();
  healingCentreMusicSource = musicSource;
  return musicSource;
};

exports.playHealingCentreMusic = playHealingCentreMusic;

var stopHealingCentreMusic = function stopHealingCentreMusic() {
  if (healingCentreMusicSource) {
    healingCentreMusicSource.stop();
    healingCentreMusicSource = null;
  }
}; // audioManager.jsx
// audioManager.jsx


exports.stopHealingCentreMusic = stopHealingCentreMusic;
var clickSound = null;

var loadClickSound = function loadClickSound(url) {
  var response, arrayBuffer, audioBuffer;
  return regeneratorRuntime.async(function loadClickSound$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          if (audioContext) {
            _context12.next = 3;
            break;
          }

          if (initAudio()) {
            _context12.next = 3;
            break;
          }

          return _context12.abrupt("return", false);

        case 3:
          _context12.prev = 3;
          _context12.next = 6;
          return regeneratorRuntime.awrap(fetch(url));

        case 6:
          response = _context12.sent;
          _context12.next = 9;
          return regeneratorRuntime.awrap(response.arrayBuffer());

        case 9:
          arrayBuffer = _context12.sent;
          _context12.next = 12;
          return regeneratorRuntime.awrap(audioContext.decodeAudioData(arrayBuffer));

        case 12:
          audioBuffer = _context12.sent;
          clickSound = audioBuffer;
          return _context12.abrupt("return", true);

        case 17:
          _context12.prev = 17;
          _context12.t0 = _context12["catch"](3);
          console.error("Error loading click sound:", _context12.t0);
          return _context12.abrupt("return", false);

        case 21:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[3, 17]]);
};

exports.loadClickSound = loadClickSound;

var playClickSound = function playClickSound() {
  if (!audioContext || !clickSound) return;
  var soundSource = audioContext.createBufferSource();
  soundSource.buffer = clickSound;
  soundSource.connect(audioContext.destination);
  soundSource.start();
};

exports.playClickSound = playClickSound;