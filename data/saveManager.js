// data/saveManager.js

// Keep the existing localStorage functions as fallbacks
const saveToLocalStorage = (gameState) => {
  try {
    // Create a clean copy of the state without any circular references
    const gameStateCopy = JSON.parse(JSON.stringify(gameState));
    // Save to localStorage
    localStorage.setItem(
      "jonesInTheFactLane_saveGame",
      JSON.stringify(gameStateCopy)
    );
    return true;
  } catch (error) {
    console.error("Error saving game to localStorage:", error);
    return false;
  }
};

const loadFromLocalStorage = () => {
  try {
    const savedGameString = localStorage.getItem("jonesInTheFactLane_saveGame");
    if (!savedGameString) return null;
    return JSON.parse(savedGameString);
  } catch (error) {
    console.error("Error loading game from localStorage:", error);
    return null;
  }
};

// New functions using File System Access API
export const saveGameToFile = async (gameState) => {
  try {
    // Create a clean copy of the state without any circular references
    const gameStateCopy = JSON.parse(JSON.stringify(gameState));
    const content = JSON.stringify(gameStateCopy, null, 2); // Pretty print with 2 spaces

    // Create a file handle
    const fileHandle = await window.showSaveFilePicker({
      suggestedName: "jones-in-the-fact-lane-save.json",
      types: [
        {
          description: "JSON Files",
          accept: { "application/json": [".json"] },
        },
      ],
    });

    // Create a writable stream to the file
    const writable = await fileHandle.createWritable();

    // Write the file content
    await writable.write(content);

    // Close the file and write to disk
    await writable.close();

    // Also save to localStorage as backup
    saveToLocalStorage(gameState);

    // Store the file handle in sessionStorage for quick access
    // (Note: can't store the handle directly, so we just mark that we have a file)
    sessionStorage.setItem("jonesInTheFactLane_hasFileHandle", "true");

    return true;
  } catch (error) {
    console.error("Error saving game to file:", error);
    // Try fallback to localStorage
    return saveToLocalStorage(gameState);
  }
};

export const loadGameFromFile = async () => {
  try {
    // Open file picker
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: "JSON Files",
          accept: { "application/json": [".json"] },
        },
      ],
    });

    // Get the file
    const file = await fileHandle.getFile();

    // Read the file contents
    const contents = await file.text();

    // Parse JSON
    const savedGame = JSON.parse(contents);

    // Store the file handle in sessionStorage for quick access
    sessionStorage.setItem("jonesInTheFactLane_hasFileHandle", "true");

    // Also update localStorage as backup
    localStorage.setItem("jonesInTheFactLane_saveGame", contents);

    return savedGame;
  } catch (error) {
    console.error("Error loading game from file:", error);
    // Try fallback to localStorage
    return loadFromLocalStorage();
  }
};

// Original API functions, updated to use both options
export const saveGame = async (gameState) => {
  // Try to save to file
  return await saveGameToFile(gameState);
};

export const loadGame = async () => {
  // Try to load from file
  return await loadGameFromFile();
};

export const hasSavedGame = () => {
  // Check both localStorage and if we've used a file handle in this session
  return (
    !!localStorage.getItem("jonesInTheFactLane_saveGame") ||
    sessionStorage.getItem("jonesInTheFactLane_hasFileHandle") === "true"
  );
};

export const deleteSavedGame = () => {
  try {
    localStorage.removeItem("jonesInTheFactLane_saveGame");
    sessionStorage.removeItem("jonesInTheFactLane_hasFileHandle");
    return true;
  } catch (error) {
    console.error("Error deleting saved game:", error);
    return false;
  }
};
