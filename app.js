// ==================== WORD LIST (450 words) ====================
const WORDLIST = [
  "Alaska","Alien","Ally","Amsterdam","Anchor","Angel","Arctic","Armor","Arrow","Valhalla",
  "Athens","Axe","Baby","Backpack","Bacon","Balloon","Band","Bandit","Bank","Bar",
  "Barrel","Basket","Bat","Bath","Bathtub","Bee","Beef","Beer","Bench","Bet",
  "Bicycle","Bird","Blanket","Blast","Block","Bluff","Board","Bomb","Bond","Bone",
  "Brain","Brazil","Bread","Bridge","Broccoli","Bronze","Bubble","Bucket","Bug","Bull",
  "Bullet","Bus","Butter","Cabinet","Cage","Cake","Camel","Camp","Candle","Cannon",
  "Canyon","Captain","Car","Card","Cave","Center","Chain","Charm","Chase","Cheese",
  "Cherry","Chess","Chest","Chicago","Chin","Church","Circle","Clash","Clock","Cloud",
  "Club","Coach","Coast","Cobra","Cocoa","Code","Coffee","Coin","Cold","Comic",
  "Compass","Computer","Concert","Cookie","Copper","Coral","Corn","Corner","Court","Creep",
  "Cow","Cowboy","Craft","Cream","Coup","Crow","Crown","Cuba","Cup","Curse",
  "Darwin","Dawn","Debt","Deer","Deport","Desk","Diamond","Dolphin","Door","Dragon",
  "Dress","Drift","Drink","Drum","Dublin","Duel","Duke","Dust","Ear","Earth",
  "Echo","Edge","Egg","Elbow","Engine","Envelope","Turtle","Family","Farmer","Fate",
  "Feast","Film","Fire","Flag","Flame","Flash","Floor","Flower","Fog","Fold",
  "Food","Football","Fox","Fraud","Fridge","Frost","Galileo","Garage","Garden","Garlic",
  "Gas","Gear","Ghost","Giant","Gift","Glacier","Globe","Glove","Goat","Gold",
  "Golf","Gorilla","Gossip","Guard","Hammer","Hammock","Hat","Hawaii","Heaven","Helicopter",
  "Hell","Helmet","High","Hill","Hip","Home","Hook","Horn","Hunter","Ireland",
  "Iron","Island","Istanbul","Jacket","Jaguar","Jail","Jamaica","Jaw","Jeans","Jester",
  "Jet","Judge","Jungle","Key","Keyboard","King","Kitchen","Kite","Knee","Knife",
  "Lab","Ladder","Lake","Lamp","Lantern","Laser","Lasso","Leaf","Letter","Library",
  "Life","Light","Lime","Limo","Lip","Lock","Love","Lunch","Lung","Mail",
  "Market","Mask","Meat","Medal","Microscope","Mine","Miner","Miracle","Mirror","Money",
  "Monk","Monkey","Mountain","Mouse","Nail","Napoleon","Neck","Needle","Neighbor","Nepal",
  "Net","Newspaper","Night","Nightmare","Nose","Note","Office","Onion","Opera","Orchard",
  "Penguin","Owl","Pacific","Paint","Pan","Paper","Paris","Parrot","Party","Path",
  "Peace","Peach","Peasant","Pencil","Phone","Photo","Piano","Pillow","Pin","Pirate",
  "Pizza","Plane","Plastic","Plate","Pluto","Pocket","Poison","Police","Pond","Pool",
  "Post","Poster","Potato","Press","Pride","Quiet","Quest","Rabbit","Race","Racket",
  "Rain","Rebel","Revenge","Rib","Ring","River","Road","Robot","Roof","Room",
  "Root","Rope","Round","Ruler","Sahara","Salt","Samurai","Sand","Satellite","Scissors",
  "Scorpion","Screen","Shadow","Shark","Sheep","Shield","Ship","Shirt","Shoe","Shop",
  "Shower","Sign","Signal","Sink","Skate","Skeleton","Sky","Slap","Sleep","Smoke",
  "Soap","Sock","Sofa","Sound","Soup","Space","Speed","Spell","Spider","Spike",
  "Spine","Spoon","Spot","Square","Star","Stick","Store","Street","Stress","Sugar",
  "Suit","Sun","Sword","Switch","Table","Tank","Taxi","Teacher","Teeth","Telescope",
  "Temple","Tent","Theater","Ticket","Tide","Time","Toilet","Tomato","Tool","Torch",
  "Tower","Towel","Toy","Train","Tree","Triangle","Trip","Trophy","Truck","Tube",
  "Turkey","Umbrella","Unicorn","Uniform","Vacuum","Valley","Van","Vegetable","Venice","Vet",
  "Viking","Village","Visor","Wall","Watch","Water","Wave","Web","Well","Wheel",
  "Wife","Window","Winter","Wire","Witch","Wolf","Wood","Wrist","Yellow","Yogurt",
  "Zebra","Zoo","Italy","Cargo","Rocket",
  "Spider-Man","Batman","Rihanna","Messi","Ronaldo","Titanic","Matrix","Yoda","Minecraft","Fortnite",
  "Pokemon","Rocky","Lost","Mario","Joker","GTA","Zombie","Oscar","Apple","Thor",
  "Sherlock","Shakira","Amazon","Sonic","Pitbull",
];
const WORDS = [...new Set(WORDLIST.map(w => w.toUpperCase()))];

const CARD_TYPE = { RED: "red", BLUE: "blue", BYSTANDER: "bystander", DEATH_RED: "death_red", DEATH_BLUE: "death_blue" };
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ==================== GAME STATE ====================
let gameState = {
  board: [], currentTeam: "red", phase: "clue", redRemaining: 0, blueRemaining: 0,
  firstTeam: "red", currentClue: null, guessesRemaining: 0, clueHistory: [],
  gameOver: false, winner: null, winReason: "", guiderView: false,
};

// Mode: "local" or "online"
let gameMode = "local";
// Game variant: "classic" or "sudden"
let gameVariant = "classic";
// Online player info
let myTeam = null;   // "red" or "blue"
let myRole = null;   // "guider" or "guesser"
let currentRoomCode = null;
let roomUnsubscribe = null;
let playersUnsubscribe = null;
let isHost = false;
let roomPlayers = []; // [{uid, username, team, role}]

// ==================== DOM REFERENCES ====================
const setupScreen = $("#setupScreen");
const localSetupScreen = $("#localSetupScreen");
const lobbyScreen = $("#lobbyScreen");
const gameScreen = $("#gameScreen");
const gameBoard = $("#gameBoard");
const firstTeamSelect = $("#firstTeamSelect");

const createGameBtn = $("#createGameBtn");
const joinGameBtn = $("#joinGameBtn");
const joinCodeInput = $("#joinCodeInput");
const playLocalBtn = $("#playLocalBtn");
const startLocalBtn = $("#startLocalBtn");
const backToMainBtn = $("#backToMainBtn");

// Lobby
const lobbyCode = $("#lobbyCode");
const lobbyBackBtn = $("#lobbyBackBtn");
const lobbyStatus = $("#lobbyStatus");
const startOnlineGameBtn = $("#startOnlineGameBtn");
const redSpymasterSlot = $("#redSpymasterSlot");
const blueSpymasterSlot = $("#blueSpymasterSlot");
const redAgentsList = $("#redAgentsList");
const blueAgentsList = $("#blueAgentsList");

// Header
const redScoreEl = $("#redScore");
const blueScoreEl = $("#blueScore");
const spymasterToggle = $("#spymasterToggle");
const spymasterLabel = $("#spymasterLabel");
const roleBadge = $("#roleBadge");
const roleBadgeText = $("#roleBadgeText");
const menuBtn = $("#menuBtn");

// Countdown
const countdownOverlay = $("#countdownOverlay");
const countdownMessage = $("#countdownMessage");
const countdownNumber = $("#countdownNumber");

// Turn Bar
const turnBar = $("#turnBar");
const turnDot = $("#turnDot");
const turnText = $("#turnText");
const clueDisplay = $("#clueDisplay");
const clueWord = $("#clueWord");
const clueNumber = $("#clueNumber");
const guessesLeft = $("#guessesLeft");
const clueInputArea = $("#clueInputArea");
const clueInput = $("#clueInput");
const clueCountInput = $("#clueCountInput");
const giveClueBtn = $("#giveClueBtn");
const endTurnBtn = $("#endTurnBtn");

// Game Over
const gameOverOverlay = $("#gameOverOverlay");
const gameOverIcon = $("#gameOverIcon");
const gameOverTitle = $("#gameOverTitle");
const gameOverMessage = $("#gameOverMessage");
const playAgainBtn = $("#playAgainBtn");
const backToMenuBtn = $("#backToMenuBtn");

// Side Menu
const sideMenuOverlay = $("#sideMenuOverlay");
const closeSideMenu = $("#closeSideMenu");
const sideNewGame = $("#sideNewGame");
const sideMainMenu = $("#sideMainMenu");
const clueLog = $("#clueLog");

// Auth
const profileBtn = $("#profileBtn");
const profileIcon = $("#profileIcon");
const authModal = $("#authModal");
const authModalClose = $("#authModalClose");
const loginForm = $("#loginForm");
const signupForm = $("#signupForm");
const loginError = $("#loginError");
const signupError = $("#signupError");
const friendsPopup = $("#friendsPopup");
const friendsUsername = $("#friendsUsername");
const signOutBtn = $("#signOutBtn");
const friendSearchInput = $("#friendSearchInput");
const friendSearchBtn = $("#friendSearchBtn");
const friendSearchResult = $("#friendSearchResult");
const friendsList = $("#friendsList");
const requestsList = $("#requestsList");
const requestCount = $("#requestCount");
const inviteNotification = $("#inviteNotification");
const inviteFromUser = $("#inviteFromUser");
const inviteAcceptBtn = $("#inviteAcceptBtn");
const inviteDeclineBtn = $("#inviteDeclineBtn");

// Nickname (guest) modal
const nicknameModal = $("#nicknameModal");
const nicknameModalClose = $("#nicknameModalClose");
const nicknameForm = $("#nicknameForm");
const nicknameInput = $("#nicknameInput");
const nicknameError = $("#nicknameError");
const nicknameSignInBtn = $("#nicknameSignInBtn");

// ==================== UTILITY FUNCTIONS ====================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

function generateBoard(firstTeam, variant) {
  const words = shuffle(WORDS).slice(0, 30);
  const secondTeam = firstTeam === "red" ? "blue" : "red";
  let types;
  if (variant === "sudden") {
    // Sudden Death: 10 first, 9 second, 5 bystanders, 3 red death, 3 blue death
    types = shuffle([
      ...Array(10).fill(firstTeam), ...Array(9).fill(secondTeam),
      ...Array(5).fill(CARD_TYPE.BYSTANDER),
      ...Array(3).fill(CARD_TYPE.DEATH_RED), ...Array(3).fill(CARD_TYPE.DEATH_BLUE),
    ]);
  } else {
    // Classic: 10 first, 9 second, 9 bystanders, 1 red death, 1 blue death
    types = shuffle([
      ...Array(10).fill(firstTeam), ...Array(9).fill(secondTeam),
      ...Array(9).fill(CARD_TYPE.BYSTANDER),
      CARD_TYPE.DEATH_RED, CARD_TYPE.DEATH_BLUE,
    ]);
  }
  return words.map((word, i) => ({ word, type: types[i], revealed: false }));
}

function countRemaining(board) {
  let r = 0, b = 0;
  board.forEach(c => { if (!c.revealed && c.type === "red") r++; if (!c.revealed && c.type === "blue") b++; });
  return { red: r, blue: b };
}

// ==================== SCREEN MANAGEMENT ====================
function showScreen(name) {
  [setupScreen, localSetupScreen, lobbyScreen, gameScreen].forEach(s => s.classList.remove("active"));
  gameOverOverlay.classList.remove("active");
  sideMenuOverlay.classList.remove("active");
  if (name === "setup") setupScreen.classList.add("active");
  else if (name === "localSetup") localSetupScreen.classList.add("active");
  else if (name === "lobby") lobbyScreen.classList.add("active");
  else if (name === "game") gameScreen.classList.add("active");
  // Hide profile button on game screen to avoid overlap with header
  profileBtn.style.display = (name === "game") ? "none" : "";
  // Refresh invite button states when screen changes
  refreshInviteButtons();
}

function refreshInviteButtons() {
  const inLobby = currentRoomCode && lobbyScreen.classList.contains("active");
  document.querySelectorAll(".friend-invite-btn").forEach(btn => {
    btn.disabled = !inLobby;
  });
}

// ==================== COUNTDOWN ====================
function showCountdown(team, callback) {
  const teamLabel = team === "red"
    ? '<span class="team-name-red">Red</span>'
    : '<span class="team-name-blue">Blue</span>';
  countdownMessage.innerHTML = `The cards will be revealed.<br>Pass the phone to the ${teamLabel} Guider.`;
  let seconds = 5;
  countdownNumber.textContent = seconds;
  countdownOverlay.classList.add("active");

  const interval = setInterval(() => {
    seconds--;
    if (seconds > 0) {
      countdownNumber.textContent = seconds;
    } else {
      clearInterval(interval);
      countdownOverlay.classList.remove("active");
      callback();
    }
  }, 1000);
}

// ==================== LOCAL GAME ====================
function startLocalGame() {
  gameMode = "local";
  myTeam = null; myRole = null;
  let firstTeam = firstTeamSelect.value;
  if (firstTeam === "random") firstTeam = Math.random() < 0.5 ? "red" : "blue";
  const board = generateBoard(firstTeam, gameVariant);
  const rem = countRemaining(board);
  gameState = {
    board, currentTeam: firstTeam, phase: "clue", redRemaining: rem.red,
    blueRemaining: rem.blue, firstTeam, currentClue: null, guessesRemaining: 0,
    clueHistory: [], gameOver: false, winner: null, winReason: "", spymasterView: false,
  };
  spymasterToggle.style.display = "flex";
  roleBadge.style.display = "none";
  showScreen("game");
  showCountdown(firstTeam, () => renderAll());
}

function startQuickLocalGame() {
  const firstTeam = Math.random() < 0.5 ? "red" : "blue";
  const board = generateBoard(firstTeam, gameVariant);
  const rem = countRemaining(board);
  gameState = {
    board, currentTeam: firstTeam, phase: "clue", redRemaining: rem.red,
    blueRemaining: rem.blue, firstTeam, currentClue: null, guessesRemaining: 0,
    clueHistory: [], gameOver: false, winner: null, winReason: "", spymasterView: false,
  };
  showCountdown(firstTeam, () => renderAll());
}

// ==================== GUEST (ANONYMOUS) AUTH ====================
let pendingGuestAction = null; // "create" or "join"
let pendingJoinCode = null;
let isGuest = false;

function promptGuestNickname(action, joinCode) {
  pendingGuestAction = action;
  pendingJoinCode = joinCode || null;
  nicknameError.textContent = "";
  nicknameInput.value = "";
  nicknameModal.classList.add("active");
}

nicknameModalClose.addEventListener("click", () => {
  nicknameModal.classList.remove("active");
  pendingGuestAction = null;
  pendingJoinCode = null;
});

nicknameSignInBtn.addEventListener("click", () => {
  nicknameModal.classList.remove("active");
  authModal.classList.add("active");
});

nicknameForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nickname = nicknameInput.value.trim();
  if (nickname.length < 2 || nickname.length > 15) {
    nicknameError.textContent = "Nickname must be 2-15 characters";
    return;
  }
  nicknameError.textContent = "";
  try {
    await window.auth.signInAnonymously();
    // Set guest profile (onAuthStateChanged will pick up isAnonymous)
    isGuest = true;
    currentUserProfile = { username: nickname, uid: window.auth.currentUser.uid };
    profileBtn.classList.add("logged-in");
    profileIcon.textContent = nickname.charAt(0).toUpperCase();
    nicknameModal.classList.remove("active");
    // Execute the pending action
    if (pendingGuestAction === "create") {
      createRoom();
    } else if (pendingGuestAction === "join" && pendingJoinCode) {
      joinRoom(pendingJoinCode);
    }
    pendingGuestAction = null;
    pendingJoinCode = null;
  } catch (err) {
    nicknameError.textContent = "Could not connect. Try again.";
  }
});

// ==================== ONLINE ROOM MANAGEMENT ====================
async function createRoom() {
  if (!currentUser || !currentUserProfile) { promptGuestNickname("create"); return; }
  const code = generateRoomCode();
  const firstTeam = Math.random() < 0.5 ? "red" : "blue";
  const board = generateBoard(firstTeam, gameVariant);

  const rem = countRemaining(board);
  await window.db.collection("wordHunterRooms").doc(code).set({
    hostId: currentUser.uid,
    phase: "lobby",
    firstTeam,
    gameVariant,
    board: board.map(c => ({ word: c.word, type: c.type, revealed: false })),
    currentTeam: firstTeam,
    redRemaining: rem.red,
    blueRemaining: rem.blue,
    currentClue: null,
    guessesRemaining: 0,
    clueHistory: [],
    gameOver: false,
    winner: null,
    winReason: "",
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  // Add self as player
  await window.db.collection("wordHunterRooms").doc(code).collection("players").doc(currentUser.uid).set({
    uid: currentUser.uid,
    username: currentUserProfile.username,
    team: null,
    role: null,
    joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  currentRoomCode = code;
  isHost = true;
  myTeam = null;
  myRole = null;
  showScreen("lobby");
  lobbyCode.textContent = code;
  listenToRoom(code);
  listenToPlayers(code);
}

async function joinRoom(code) {
  code = (code || "").toUpperCase().trim();
  if (!currentUser) { promptGuestNickname("join", code); return; }
  if (!currentUserProfile) { promptGuestNickname("join", code); return; }
  if (code.length !== 6) { alert("Enter a valid 6-character room code."); return; }

  const roomDoc = await window.db.collection("wordHunterRooms").doc(code).get();
  if (!roomDoc.exists) { alert("Room not found."); return; }

  const roomData = roomDoc.data();
  if (roomData.phase !== "lobby") { alert("Game already in progress."); return; }

  // Add self as player
  await window.db.collection("wordHunterRooms").doc(code).collection("players").doc(currentUser.uid).set({
    uid: currentUser.uid,
    username: currentUserProfile.username,
    team: null,
    role: null,
    joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  currentRoomCode = code;
  isHost = roomData.hostId === currentUser.uid;
  myTeam = null;
  myRole = null;
  showScreen("lobby");
  lobbyCode.textContent = code;
  listenToRoom(code);
  listenToPlayers(code);
}

async function leaveRoom() {
  if (roomUnsubscribe) { roomUnsubscribe(); roomUnsubscribe = null; }
  if (playersUnsubscribe) { playersUnsubscribe(); playersUnsubscribe = null; }
  if (currentRoomCode && currentUser) {
    try {
      await window.db.collection("wordHunterRooms").doc(currentRoomCode).collection("players").doc(currentUser.uid).delete();
    } catch (e) {}
  }
  currentRoomCode = null;
  isHost = false;
  myTeam = null;
  myRole = null;
  roomPlayers = [];
  showScreen("setup");
}

function listenToRoom(code) {
  if (roomUnsubscribe) roomUnsubscribe();
  roomUnsubscribe = window.db.collection("wordHunterRooms").doc(code).onSnapshot((doc) => {
    if (!doc.exists) { leaveRoom(); return; }
    const data = doc.data();

    if (data.phase === "playing" || data.phase === "clue" || data.phase === "guess") {
      // Game started or in progress - sync state
      gameState = {
        board: data.board,
        currentTeam: data.currentTeam,
        phase: data.phase === "playing" ? "clue" : data.phase,
        redRemaining: data.redRemaining,
        blueRemaining: data.blueRemaining,
        firstTeam: data.firstTeam,
        currentClue: data.currentClue,
        guessesRemaining: data.guessesRemaining || 0,
        clueHistory: data.clueHistory || [],
        gameOver: data.gameOver || false,
        winner: data.winner || null,
        winReason: data.winReason || "",
        spymasterView: false,
      };
      gameMode = "online";
      // Set spymaster view based on role
      if (myRole === "spymaster") {
        gameState.spymasterView = true;
      }
      if (gameScreen.classList.contains("active")) {
        renderAll();
      } else {
        // Transition from lobby to game
        spymasterToggle.style.display = "none";
        roleBadge.style.display = "flex";
        const teamLabel = myTeam === "red" ? "Red" : "Blue";
        const roleLabel = myRole === "spymaster" ? "Guider" : "Guesser";
        roleBadgeText.textContent = `${teamLabel} ${roleLabel}`;
        roleBadge.className = `role-badge role-badge-${myTeam}`;
        showScreen("game");
        renderAll();
      }
    }

    if (data.gameOver && data.phase === "gameOver") {
      gameState.gameOver = true;
      gameState.winner = data.winner;
      gameState.winReason = data.winReason;
      if (myRole === "spymaster") gameState.spymasterView = true;
      renderAll();
    }
  });
}

function listenToPlayers(code) {
  if (playersUnsubscribe) playersUnsubscribe();
  playersUnsubscribe = window.db.collection("wordHunterRooms").doc(code).collection("players")
    .onSnapshot((snapshot) => {
      roomPlayers = [];
      snapshot.forEach((doc) => {
        roomPlayers.push(doc.data());
      });
      // Update my team/role from server
      if (currentUser) {
        const me = roomPlayers.find(p => p.uid === currentUser.uid);
        if (me) { myTeam = me.team; myRole = me.role; }
      }
      renderLobby();
    });
}

async function pickTeamRole(team, role) {
  if (!currentUser || !currentRoomCode) return;

  // If picking spymaster, check if slot is taken
  if (role === "spymaster") {
    const existing = roomPlayers.find(p => p.team === team && p.role === "spymaster" && p.uid !== currentUser.uid);
    if (existing) return; // slot taken
  }

  await window.db.collection("wordHunterRooms").doc(currentRoomCode).collection("players").doc(currentUser.uid).update({
    team, role,
  });
}

async function startOnlineGame() {
  if (!currentRoomCode || !isHost) return;
  // Validate: both teams need a spymaster and at least one agent
  const redSpy = roomPlayers.find(p => p.team === "red" && p.role === "spymaster");
  const blueSpy = roomPlayers.find(p => p.team === "blue" && p.role === "spymaster");
  const redAgents = roomPlayers.filter(p => p.team === "red" && p.role === "agent");
  const blueAgents = roomPlayers.filter(p => p.team === "blue" && p.role === "agent");

  if (!redSpy || !blueSpy) { alert("Each team needs a Guider."); return; }
  if (redAgents.length === 0 || blueAgents.length === 0) { alert("Each team needs at least one Agent."); return; }

  // Regenerate board with selected variant
  const firstTeam = Math.random() < 0.5 ? "red" : "blue";
  const board = generateBoard(firstTeam, gameVariant);
  const rem = countRemaining(board);

  await window.db.collection("wordHunterRooms").doc(currentRoomCode).update({
    phase: "clue",
    firstTeam,
    board: board.map(c => ({ word: c.word, type: c.type, revealed: false })),
    currentTeam: firstTeam,
    redRemaining: rem.red,
    blueRemaining: rem.blue,
    gameVariant,
    currentClue: null,
    guessesRemaining: 0,
    clueHistory: [],
    gameOver: false,
    winner: null,
    winReason: "",
  });
}

// ==================== ONLINE GAME ACTIONS ====================
async function onlineGiveClue(word, count) {
  if (!currentRoomCode) return;
  const newHistory = [...(gameState.clueHistory || []), { team: gameState.currentTeam, word, count }];
  const guessesRemaining = count === 0 ? 999 : count + 1; // 999 = unlimited

  await window.db.collection("wordHunterRooms").doc(currentRoomCode).update({
    phase: "guess",
    currentClue: { word, count },
    guessesRemaining,
    clueHistory: newHistory,
  });
}

async function onlineRevealCard(index) {
  if (!currentRoomCode) return;
  const board = [...gameState.board];
  const card = board[index];
  if (card.revealed) return;
  board[index] = { ...card, revealed: true };

  const rem = countRemaining(board);
  const updates = { board, redRemaining: rem.red, blueRemaining: rem.blue };

  // Check death cards
  const currentTeam = gameState.currentTeam;
  if (card.type === CARD_TYPE.DEATH_RED || card.type === CARD_TYPE.DEATH_BLUE) {
    const deathBelongsTo = card.type === CARD_TYPE.DEATH_RED ? "red" : "blue";
    if (currentTeam === deathBelongsTo) {
      // Team picked their own death card — they lose!
      const winner = currentTeam === "red" ? "blue" : "red";
      updates.gameOver = true;
      updates.winner = winner;
      updates.winReason = `${currentTeam === "red" ? "Red" : "Blue"} Team hit their own Death Card!`;
      updates.phase = "gameOver";
      await window.db.collection("wordHunterRooms").doc(currentRoomCode).update(updates);
      return;
    } else {
      // Opposing team picked this death card — neutralize it, end turn
      updates.currentTeam = currentTeam === "red" ? "blue" : "red";
      updates.phase = "clue";
      updates.currentClue = null;
      updates.guessesRemaining = 0;
      await window.db.collection("wordHunterRooms").doc(currentRoomCode).update(updates);
      return;
    }
  }

  // Check win
  if (rem.red === 0) {
    updates.gameOver = true; updates.winner = "red";
    updates.winReason = "Red Team found all their agents!"; updates.phase = "gameOver";
    await window.db.collection("wordHunterRooms").doc(currentRoomCode).update(updates);
    return;
  }
  if (rem.blue === 0) {
    updates.gameOver = true; updates.winner = "blue";
    updates.winReason = "Blue Team found all their agents!"; updates.phase = "gameOver";
    await window.db.collection("wordHunterRooms").doc(currentRoomCode).update(updates);
    return;
  }

  // Correct guess?
  if (card.type === currentTeam) {
    let gr = gameState.guessesRemaining;
    if (gr !== 999) gr--;
    if (gr === 0) {
      // Used all guesses - end turn
      updates.currentTeam = currentTeam === "red" ? "blue" : "red";
      updates.phase = "clue";
      updates.currentClue = null;
      updates.guessesRemaining = 0;
    } else {
      updates.guessesRemaining = gr;
    }
  } else {
    // Wrong - end turn
    updates.currentTeam = currentTeam === "red" ? "blue" : "red";
    updates.phase = "clue";
    updates.currentClue = null;
    updates.guessesRemaining = 0;
  }

  await window.db.collection("wordHunterRooms").doc(currentRoomCode).update(updates);
}

async function onlineEndTurn() {
  if (!currentRoomCode) return;
  await window.db.collection("wordHunterRooms").doc(currentRoomCode).update({
    currentTeam: gameState.currentTeam === "red" ? "blue" : "red",
    phase: "clue",
    currentClue: null,
    guessesRemaining: 0,
  });
}

// ==================== RENDERING ====================
function renderAll() {
  // In local mode, sync guider view to phase before rendering board
  if (gameMode === "local" && !gameState.gameOver) {
    gameState.spymasterView = (gameState.phase === "clue");
  }
  renderBoard();
  renderScores();
  renderTurnBar();
  renderClueLog();
  renderGameOver();
}

function renderBoard() {
  gameBoard.innerHTML = "";
  const isSpymaster = (gameMode === "online" && myRole === "spymaster") || (gameMode === "local" && gameState.spymasterView);
  const isMyTurnToGuess = gameMode === "local" ||
    (gameMode === "online" && myRole === "agent" && myTeam === gameState.currentTeam && gameState.phase === "guess");

  gameState.board.forEach((card, index) => {
    const cardEl = document.createElement("div");
    cardEl.className = "card";
    cardEl.dataset.index = index;

    if (card.revealed) {
      cardEl.classList.add("revealed", `revealed-${card.type}`);
    } else if (isSpymaster) {
      cardEl.classList.add(`spy-${card.type}`);
    }

    if (gameState.gameOver && !card.revealed) {
      cardEl.classList.add(`spy-${card.type}`, "game-ended");
    }

    const wordEl = document.createElement("span");
    wordEl.className = "card-word";
    if (card.word.length > 8) wordEl.classList.add("card-word-long");
    if (card.word.length > 10) wordEl.classList.add("card-word-xlong");
    wordEl.textContent = card.word;
    cardEl.appendChild(wordEl);

    if (card.revealed) {
      const iconEl = document.createElement("div");
      iconEl.className = "card-reveal-icon";
      const isDeath = card.type === CARD_TYPE.DEATH_RED || card.type === CARD_TYPE.DEATH_BLUE;
      iconEl.innerHTML = isDeath
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`;
      cardEl.appendChild(iconEl);
    }

    // Click handler: only for agents during guess phase (or local mode during guess)
    if (!card.revealed && !gameState.gameOver) {
      if (gameMode === "local" && gameState.phase === "guess") {
        cardEl.addEventListener("click", () => handleCardClick(index));
      } else if (isMyTurnToGuess) {
        cardEl.addEventListener("click", () => handleCardClick(index));
      } else {
        cardEl.classList.add("no-click");
      }
    }

    gameBoard.appendChild(cardEl);
  });
}

function renderScores() {
  redScoreEl.textContent = gameState.redRemaining;
  blueScoreEl.textContent = gameState.blueRemaining;
  redScoreEl.parentElement.classList.toggle("active-team", gameState.currentTeam === "red" && !gameState.gameOver);
  blueScoreEl.parentElement.classList.toggle("active-team", gameState.currentTeam === "blue" && !gameState.gameOver);
}

function renderTurnBar() {
  if (gameState.gameOver) {
    turnBar.className = "turn-bar game-over-bar";
    turnDot.className = "turn-dot";
    turnText.textContent = "Game Over";
    clueInputArea.style.display = "none";
    clueDisplay.style.display = "none";
    endTurnBtn.style.display = "none";
    return;
  }

  turnBar.className = `turn-bar turn-${gameState.currentTeam}`;
  turnDot.className = `turn-dot dot-${gameState.currentTeam}`;
  const teamName = gameState.currentTeam === "red" ? "Red" : "Blue";

  const canGiveClue = gameMode === "local" ||
    (gameMode === "online" && myRole === "spymaster" && myTeam === gameState.currentTeam);
  const canGuess = gameMode === "local" ||
    (gameMode === "online" && myRole === "agent" && myTeam === gameState.currentTeam);

  if (gameState.phase === "clue") {
    if (canGiveClue) {
      turnText.textContent = `${teamName} Guider — Give a Clue`;
      clueInputArea.style.display = "flex";
      clueDisplay.style.display = "none";
      endTurnBtn.style.display = "none";
      clueInput.value = "";
      clueCountInput.value = "";
    } else {
      turnText.textContent = `Waiting for ${teamName} Guider...`;
      clueInputArea.style.display = "none";
      clueDisplay.style.display = "none";
      endTurnBtn.style.display = "none";
    }
  } else {
    clueInputArea.style.display = "none";
    clueDisplay.style.display = "flex";
    if (gameState.currentClue) {
      clueWord.textContent = gameState.currentClue.word;
      clueNumber.textContent = gameState.currentClue.count === 0 ? "\u221E" : gameState.currentClue.count;
      const gr = gameState.guessesRemaining;
      guessesLeft.textContent = (gr === 999 || gr === Infinity) ? "\u221E left" : `${gr} left`;
    }
    if (canGuess) {
      turnText.textContent = `${teamName} Team — Guess!`;
      endTurnBtn.style.display = "inline-flex";
    } else if (gameMode === "local") {
      turnText.textContent = `${teamName} Team — Guess`;
      endTurnBtn.style.display = "inline-flex";
    } else {
      turnText.textContent = `${teamName} Team is guessing...`;
      endTurnBtn.style.display = "none";
    }
  }

  // Spymaster toggle for local mode
  if (gameMode === "local") {
    spymasterToggle.style.display = "flex";
    if (gameState.phase === "clue") {
      // Clue phase: guider view available
      spymasterToggle.classList.toggle("active", gameState.spymasterView);
      spymasterToggle.disabled = false;
      spymasterToggle.style.opacity = "1";
      spymasterLabel.textContent = gameState.spymasterView ? "Hide Key" : "Guider";
    } else {
      // Guess phase: guider view locked
      spymasterToggle.classList.remove("active");
      spymasterToggle.disabled = true;
      spymasterToggle.style.opacity = "0.4";
      spymasterLabel.textContent = "Locked";
    }
  }
}

function renderClueLog() {
  if (!gameState.clueHistory || gameState.clueHistory.length === 0) {
    clueLog.innerHTML = '<p class="clue-log-empty">No clues yet</p>';
    return;
  }
  clueLog.innerHTML = gameState.clueHistory.map(e => `
    <div class="clue-log-entry clue-log-${e.team}">
      <span class="clue-log-team">${e.team === "red" ? "R" : "B"}</span>
      <span class="clue-log-word">${e.word}</span>
      <span class="clue-log-count">${e.count === 0 ? "\u221E" : e.count}</span>
    </div>`).reverse().join("");
}

function renderGameOver() {
  if (!gameState.gameOver) { gameOverOverlay.classList.remove("active"); return; }
  gameOverOverlay.classList.add("active");
  const isRed = gameState.winner === "red";
  const teamName = isRed ? "Red Team" : "Blue Team";
  const color = isRed ? "#e74c3c" : "#3498db";
  gameOverTitle.textContent = `${teamName} Wins!`;
  gameOverTitle.style.color = color;
  gameOverMessage.textContent = gameState.winReason;
  const isDeathCard = gameState.winReason.includes("Death Card");
  gameOverIcon.innerHTML = `<svg width="64" height="64" viewBox="0 0 24 24" fill="${color}"><path d="${isDeathCard
    ? "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
    : "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
  }"/></svg>`;

  // In online mode, hide play again if not host
  if (gameMode === "online" && !isHost) {
    playAgainBtn.style.display = "none";
  } else {
    playAgainBtn.style.display = "block";
  }
}

function renderLobby() {
  // Red Spymaster
  const redSpy = roomPlayers.find(p => p.team === "red" && p.role === "spymaster");
  renderSlot(redSpymasterSlot, redSpy, "red", "spymaster");

  // Blue Spymaster
  const blueSpy = roomPlayers.find(p => p.team === "blue" && p.role === "spymaster");
  renderSlot(blueSpymasterSlot, blueSpy, "blue", "spymaster");

  // Red Agents
  const redAgents = roomPlayers.filter(p => p.team === "red" && p.role === "agent");
  renderAgentList(redAgentsList, redAgents, "red");

  // Blue Agents
  const blueAgents = roomPlayers.filter(p => p.team === "blue" && p.role === "agent");
  renderAgentList(blueAgentsList, blueAgents, "blue");

  // Unassigned players
  const unassigned = roomPlayers.filter(p => !p.team || !p.role);
  if (unassigned.length > 0) {
    lobbyStatus.textContent = `${unassigned.length} player(s) haven't picked a team yet`;
  } else {
    lobbyStatus.textContent = "All players assigned!";
  }

  // Start button (host only)
  const canStart = isHost && redSpy && blueSpy && redAgents.length > 0 && blueAgents.length > 0;
  startOnlineGameBtn.disabled = !canStart;
  startOnlineGameBtn.textContent = isHost ? "START GAME" : "Waiting for host...";
  startOnlineGameBtn.style.opacity = isHost ? "1" : "0.5";
}

function renderSlot(slotEl, player, team, role) {
  const isMe = player && currentUser && player.uid === currentUser.uid;
  if (player) {
    slotEl.innerHTML = `<span class="slot-player ${isMe ? "slot-me" : ""}">${player.username}${isMe ? " (you)" : ""}</span>`;
    slotEl.classList.add("slot-filled");
    // Allow clicking to leave if it's me
    slotEl.onclick = isMe ? () => pickTeamRole(null, null) : null;
  } else {
    slotEl.innerHTML = `<span class="slot-empty">Join</span>`;
    slotEl.classList.remove("slot-filled");
    slotEl.onclick = () => pickTeamRole(team, role);
  }
}

function renderAgentList(listEl, agents, team) {
  listEl.innerHTML = "";
  if (agents.length > 0) {
    // Show the single guesser
    const p = agents[0];
    const isMe = currentUser && p.uid === currentUser.uid;
    const div = document.createElement("div");
    div.className = `lobby-slot lobby-slot-agent slot-filled`;
    div.innerHTML = `<span class="slot-player ${isMe ? "slot-me" : ""}">${p.username}${isMe ? " (you)" : ""}</span>`;
    if (isMe) div.onclick = () => pickTeamRole(null, null);
    listEl.appendChild(div);
  } else {
    // Show "join" slot only if no guesser yet
    const joinSlot = document.createElement("div");
    joinSlot.className = "lobby-slot lobby-slot-agent";
    joinSlot.innerHTML = `<span class="slot-empty">+ Join</span>`;
    joinSlot.onclick = () => pickTeamRole(team, "agent");
    listEl.appendChild(joinSlot);
  }
}

// ==================== GAME LOGIC ====================
function handleCardClick(index) {
  if (gameState.gameOver) return;
  if (gameState.phase !== "guess") return;
  const card = gameState.board[index];
  if (card.revealed) return;

  if (gameMode === "online") {
    onlineRevealCard(index);
    return;
  }

  // Local mode
  card.revealed = true;

  // Check death cards
  if (card.type === CARD_TYPE.DEATH_RED || card.type === CARD_TYPE.DEATH_BLUE) {
    const deathBelongsTo = card.type === CARD_TYPE.DEATH_RED ? "red" : "blue";
    if (gameState.currentTeam === deathBelongsTo) {
      // Team picked their own death card — they lose!
      const winner = gameState.currentTeam === "red" ? "blue" : "red";
      endGame(winner, `${gameState.currentTeam === "red" ? "Red" : "Blue"} Team hit their own Death Card!`);
      return;
    } else {
      // Opposing team picked this death card — neutralize it, end turn
      endTurn();
      return;
    }
  }

  if (card.type === CARD_TYPE.RED) gameState.redRemaining--;
  if (card.type === CARD_TYPE.BLUE) gameState.blueRemaining--;
  if (gameState.redRemaining === 0) { endGame("red", "Red Team found all their agents!"); return; }
  if (gameState.blueRemaining === 0) { endGame("blue", "Blue Team found all their agents!"); return; }
  if (card.type === gameState.currentTeam) {
    if (gameState.guessesRemaining !== Infinity) gameState.guessesRemaining--;
    if (gameState.guessesRemaining === 0) { endTurn(); return; }
    renderAll(); return;
  }
  endTurn();
}

function giveClue() {
  const word = clueInput.value.trim().toUpperCase();
  const countStr = clueCountInput.value.trim();
  if (!word) { shakeElement(clueInput); return; }
  if (countStr === "" || isNaN(parseInt(countStr))) { shakeElement(clueCountInput); return; }
  const count = parseInt(countStr);
  if (count < 0 || count > 9) { shakeElement(clueCountInput); return; }
  const boardWords = gameState.board.filter(c => !c.revealed).map(c => c.word);
  if (boardWords.includes(word)) {
    shakeElement(clueInput); clueInput.value = "";
    clueInput.placeholder = "Can't use a board word!";
    setTimeout(() => { clueInput.placeholder = "Enter clue word..."; }, 2000);
    return;
  }

  if (gameMode === "online") {
    onlineGiveClue(word, count);
    return;
  }

  // Local
  gameState.currentClue = { word, count };
  gameState.phase = "guess";
  gameState.guessesRemaining = count === 0 ? Infinity : count + 1;
  gameState.clueHistory.push({ team: gameState.currentTeam, word, count });
  renderAll();
}

function endTurn() {
  if (gameMode === "online") { onlineEndTurn(); return; }
  gameState.currentTeam = gameState.currentTeam === "red" ? "blue" : "red";
  gameState.phase = "clue";
  gameState.currentClue = null;
  gameState.guessesRemaining = 0;
  gameState.spymasterView = false;
  // Show countdown so phone can be passed to the next guider
  showCountdown(gameState.currentTeam, () => renderAll());
}

function endGame(winner, reason) {
  gameState.gameOver = true;
  gameState.winner = winner;
  gameState.winReason = reason;
  gameState.spymasterView = false;
  renderAll();
}

function shakeElement(el) {
  el.classList.add("shake");
  setTimeout(() => el.classList.remove("shake"), 500);
}

// ==================== AUTH SYSTEM ====================
let currentUser = null;
let currentUserProfile = null;
let friendsListUnsubscribe = null;
let requestsUnsubscribe = null;
let invitesUnsubscribe = null;
let presenceInterval = null;
let pendingInvite = null;

// Auth tab switching
$$(".auth-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    $$(".auth-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    loginForm.style.display = tab.dataset.tab === "login" ? "flex" : "none";
    signupForm.style.display = tab.dataset.tab === "signup" ? "flex" : "none";
  });
});

// Friends tab switching
$$(".friends-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    $$(".friends-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    friendsList.style.display = tab.dataset.tab === "friends" ? "block" : "none";
    requestsList.style.display = tab.dataset.tab === "requests" ? "block" : "none";
  });
});

profileBtn.addEventListener("click", () => {
  if (currentUser && !isGuest) {
    // Full account — show friends popup
    friendsPopup.classList.toggle("active"); authModal.classList.remove("active");
  } else if (currentUser && isGuest) {
    // Guest — offer to sign in for full features
    authModal.classList.add("active"); friendsPopup.classList.remove("active");
  } else {
    // Not signed in — show auth modal
    authModal.classList.add("active"); friendsPopup.classList.remove("active");
  }
});
authModalClose.addEventListener("click", () => authModal.classList.remove("active"));
document.addEventListener("click", (e) => {
  if (friendsPopup && profileBtn && !friendsPopup.contains(e.target) && !profileBtn.contains(e.target))
    friendsPopup.classList.remove("active");
});

// Email Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); loginError.textContent = "";
  try { await window.auth.signInWithEmailAndPassword($("#loginEmail").value, $("#loginPassword").value); authModal.classList.remove("active"); loginForm.reset(); }
  catch (err) { loginError.textContent = err.message; }
});

// Email Signup
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault(); signupError.textContent = "";
  const username = $("#signupUsername").value.trim().toLowerCase();
  if (!/^[a-z0-9_]{3,15}$/.test(username)) { signupError.textContent = "Username: 3-15 chars, letters, numbers, underscores only"; return; }
  const snap = await window.db.collection("users").where("username", "==", username).limit(1).get();
  if (!snap.empty) { signupError.textContent = "Username already taken"; return; }
  try {
    const cred = await window.auth.createUserWithEmailAndPassword($("#signupEmail").value, $("#signupPassword").value);
    await window.db.collection("users").doc(cred.user.uid).set({
      username, email: $("#signupEmail").value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(), online: true,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
    });
    authModal.classList.remove("active"); signupForm.reset();
  } catch (err) { signupError.textContent = err.message; }
});

// Google Auth
const handleGoogleAuth = async () => {
  try {
    const result = await window.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const profileDoc = await window.db.collection("users").doc(result.user.uid).get();
    if (!profileDoc.exists) {
      const username = prompt("Choose a username (3-15 characters):");
      if (!username) { await window.auth.signOut(); return; }
      const clean = username.trim().toLowerCase();
      if (!/^[a-z0-9_]{3,15}$/.test(clean)) { alert("Invalid username."); await window.auth.signOut(); return; }
      const exists = await window.db.collection("users").where("username", "==", clean).limit(1).get();
      if (!exists.empty) { alert("Username taken."); await window.auth.signOut(); return; }
      await window.db.collection("users").doc(result.user.uid).set({
        username: clean, email: result.user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(), online: true,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    authModal.classList.remove("active");
  } catch (err) { loginError.textContent = err.message; }
};
$("#googleSignInBtn").addEventListener("click", handleGoogleAuth);
$("#googleSignUpBtn").addEventListener("click", handleGoogleAuth);

signOutBtn.addEventListener("click", async () => {
  if (currentUser && !isGuest) {
    try { await window.db.collection("users").doc(currentUser.uid).update({ online: false, lastSeen: firebase.firestore.FieldValue.serverTimestamp() }); } catch (e) {}
  }
  isGuest = false;
  if (presenceInterval) { clearInterval(presenceInterval); presenceInterval = null; }
  await window.auth.signOut();
  friendsPopup.classList.remove("active");
});

// Auth state listener
window.auth.onAuthStateChanged(async (user) => {
  currentUser = user;
  if (user && user.isAnonymous) {
    // Guest user — profile was already set by the nickname form
    isGuest = true;
    profileBtn.classList.add("logged-in");
    if (currentUserProfile) {
      profileIcon.textContent = currentUserProfile.username.charAt(0).toUpperCase();
    }
    // No Firestore profile, no friends, no invites for guests
  } else if (user) {
    // Full account user
    isGuest = false;
    profileBtn.classList.add("logged-in");
    const doc = await window.db.collection("users").doc(user.uid).get();
    currentUserProfile = doc.exists ? { uid: user.uid, ...doc.data() } : null;
    if (currentUserProfile) {
      profileIcon.textContent = currentUserProfile.username.charAt(0).toUpperCase();
      friendsUsername.textContent = currentUserProfile.username;
      // Presence
      await window.db.collection("users").doc(user.uid).update({ online: true, lastSeen: firebase.firestore.FieldValue.serverTimestamp() });
      if (presenceInterval) clearInterval(presenceInterval);
      presenceInterval = setInterval(async () => {
        if (currentUser) try { await window.db.collection("users").doc(currentUser.uid).update({ lastSeen: firebase.firestore.FieldValue.serverTimestamp() }); } catch (e) {}
      }, 30000);
      listenToFriends();
      listenToFriendRequests();
      listenToInvites();
    }
  } else {
    // Signed out
    isGuest = false;
    profileBtn.classList.remove("logged-in");
    profileIcon.textContent = "Sign in";
    currentUserProfile = null;
    [friendsListUnsubscribe, requestsUnsubscribe, invitesUnsubscribe].forEach(u => { if (u) u(); });
    friendsListUnsubscribe = requestsUnsubscribe = invitesUnsubscribe = null;
    if (presenceInterval) { clearInterval(presenceInterval); presenceInterval = null; }
    friendsList.innerHTML = '<div class="empty-list">Sign in to see friends</div>';
    requestsList.innerHTML = '<div class="empty-list">Sign in to see requests</div>';
  }
});

// ==================== FRIENDS SYSTEM ====================
function listenToFriends() {
  if (!currentUser) return;
  if (friendsListUnsubscribe) friendsListUnsubscribe();
  friendsListUnsubscribe = window.db.collection("friends").doc(currentUser.uid).collection("list")
    .onSnapshot(async (snapshot) => {
      friendsList.innerHTML = "";
      if (snapshot.empty) { friendsList.innerHTML = '<div class="empty-list">No friends yet</div>'; return; }
      for (const doc of snapshot.docs) {
        const data = doc.data();
        const profileDoc = await window.db.collection("users").doc(doc.id).get();
        const isOnline = profileDoc.exists && profileDoc.data().lastSeen &&
          (new Date() - (profileDoc.data().lastSeen.toDate ? profileDoc.data().lastSeen.toDate() : new Date(profileDoc.data().lastSeen))) / 1000 < 60;
        const el = document.createElement("div");
        el.className = "friend-item";
        const inLobby = currentRoomCode && lobbyScreen.classList.contains("active");
        el.innerHTML = `
          <div class="friend-info"><span class="${isOnline ? "online-dot" : "offline-dot"}"></span><span class="friend-name">${data.friendUsername}</span></div>
          <button class="friend-invite-btn" data-uid="${doc.id}" ${!inLobby ? "disabled" : ""}>Invite</button>`;
        el.querySelector(".friend-invite-btn").addEventListener("click", () => {
          if (!currentRoomCode || !lobbyScreen.classList.contains("active")) {
            alert("Create a game room first, then invite friends from the lobby!");
            return;
          }
          sendGameInvite(doc.id, data.friendUsername);
        });
        friendsList.appendChild(el);
      }
    });
}

function listenToFriendRequests() {
  if (!currentUser) return;
  if (requestsUnsubscribe) requestsUnsubscribe();
  requestsUnsubscribe = window.db.collection("friendRequests").where("to", "==", currentUser.uid).where("status", "==", "pending")
    .onSnapshot((snapshot) => {
      requestsList.innerHTML = "";
      requestCount.textContent = snapshot.size > 0 ? `(${snapshot.size})` : "";
      if (snapshot.empty) { requestsList.innerHTML = '<div class="empty-list">No pending requests</div>'; return; }
      snapshot.forEach((doc) => {
        const req = doc.data();
        const el = document.createElement("div");
        el.className = "request-item";
        el.innerHTML = `<div class="friend-info"><span class="friend-name">${req.fromUsername}</span></div>
          <div class="request-actions"><button class="request-accept">Accept</button><button class="request-decline">Decline</button></div>`;
        el.querySelector(".request-accept").addEventListener("click", async () => {
          const batch = window.db.batch();
          batch.set(window.db.collection("friends").doc(currentUser.uid).collection("list").doc(req.from), { since: firebase.firestore.FieldValue.serverTimestamp(), friendUsername: req.fromUsername });
          batch.set(window.db.collection("friends").doc(req.from).collection("list").doc(currentUser.uid), { since: firebase.firestore.FieldValue.serverTimestamp(), friendUsername: currentUserProfile.username });
          batch.update(window.db.collection("friendRequests").doc(doc.id), { status: "accepted" });
          await batch.commit();
        });
        el.querySelector(".request-decline").addEventListener("click", () => {
          window.db.collection("friendRequests").doc(doc.id).update({ status: "declined" });
        });
        requestsList.appendChild(el);
      });
    });
}

friendSearchBtn.addEventListener("click", searchUsers);
friendSearchInput.addEventListener("keypress", (e) => { if (e.key === "Enter") searchUsers(); });

async function searchUsers() {
  const q = friendSearchInput.value.trim().toLowerCase();
  friendSearchResult.innerHTML = "";
  if (!q || q.length < 2 || !currentUser) return;
  const snap = await window.db.collection("users").where("username", ">=", q).where("username", "<=", q + "\uf8ff").limit(5).get();
  if (snap.empty) { friendSearchResult.innerHTML = '<div class="empty-list">No users found</div>'; return; }
  snap.forEach((doc) => {
    if (doc.id === currentUser.uid) return;
    const el = document.createElement("div");
    el.className = "search-result-item";
    el.innerHTML = `<span>${doc.data().username}</span><button>Add Friend</button>`;
    el.querySelector("button").addEventListener("click", async () => {
      const existing = await window.db.collection("friendRequests").where("from", "==", currentUser.uid).where("to", "==", doc.id).where("status", "==", "pending").limit(1).get();
      if (!existing.empty) { alert("Already sent!"); return; }
      await window.db.collection("friendRequests").add({
        from: currentUser.uid, fromUsername: currentUserProfile.username, to: doc.id, toUsername: doc.data().username,
        status: "pending", createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      alert("Request sent!");
      friendSearchResult.innerHTML = ""; friendSearchInput.value = "";
    });
    friendSearchResult.appendChild(el);
  });
}

// ==================== GAME INVITES ====================
async function sendGameInvite(toUid, toUsername) {
  if (!currentUser || !currentUserProfile || !currentRoomCode || !lobbyScreen.classList.contains("active")) { alert("Create a game room first, then invite friends from the lobby!"); return; }
  const existing = await window.db.collection("gameInvites").where("from", "==", currentUser.uid).where("to", "==", toUid).get();
  for (const doc of existing.docs) await doc.ref.delete();
  await window.db.collection("gameInvites").add({
    from: currentUser.uid, fromUsername: currentUserProfile.username, to: toUid,
    roomCode: currentRoomCode, createdAt: firebase.firestore.FieldValue.serverTimestamp(), status: "pending",
  });
  alert(`Invite sent to ${toUsername}!`);
}

function listenToInvites() {
  if (!currentUser) return;
  if (invitesUnsubscribe) invitesUnsubscribe();
  invitesUnsubscribe = window.db.collection("gameInvites").where("to", "==", currentUser.uid).where("status", "==", "pending")
    .onSnapshot((snapshot) => {
      if (snapshot.empty) { inviteNotification.classList.remove("active"); pendingInvite = null; return; }
      const latestDoc = snapshot.docs[snapshot.docs.length - 1];
      const invite = latestDoc.data();
      pendingInvite = { id: latestDoc.id, ...invite };
      inviteFromUser.textContent = invite.fromUsername;
      inviteNotification.classList.add("active");
      setTimeout(() => { if (pendingInvite && pendingInvite.id === latestDoc.id) inviteNotification.classList.remove("active"); }, 30000);
    });
}

inviteAcceptBtn.addEventListener("click", async () => {
  if (!pendingInvite) return;
  const code = pendingInvite.roomCode;
  await window.db.collection("gameInvites").doc(pendingInvite.id).delete();
  inviteNotification.classList.remove("active");
  pendingInvite = null;
  joinRoom(code);
});
inviteDeclineBtn.addEventListener("click", async () => {
  if (!pendingInvite) return;
  await window.db.collection("gameInvites").doc(pendingInvite.id).update({ status: "declined" });
  inviteNotification.classList.remove("active");
  pendingInvite = null;
});

// ==================== EVENT LISTENERS ====================
// Setup
createGameBtn.addEventListener("click", createRoom);
joinGameBtn.addEventListener("click", () => joinRoom(joinCodeInput.value));
joinCodeInput.addEventListener("keypress", (e) => { if (e.key === "Enter") joinRoom(joinCodeInput.value); });
// Local mode popup
const localModePopup = $("#localModePopup");
const localClassicBtn = $("#localClassicBtn");
const localSuddenBtn = $("#localSuddenBtn");

playLocalBtn.addEventListener("click", () => {
  localModePopup.classList.toggle("active");
});
localClassicBtn.addEventListener("click", () => {
  gameVariant = "classic";
  localModePopup.classList.remove("active");
  showScreen("localSetup");
});
localSuddenBtn.addEventListener("click", () => {
  gameVariant = "sudden";
  localModePopup.classList.remove("active");
  showScreen("localSetup");
});

// Lobby mode selector
const lobbyModeSelector = $("#lobbyModeSelector");
if (lobbyModeSelector) {
  lobbyModeSelector.querySelectorAll(".mode-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      lobbyModeSelector.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      gameVariant = btn.dataset.mode;
    });
  });
}
startLocalBtn.addEventListener("click", startLocalGame);
backToMainBtn.addEventListener("click", () => showScreen("setup"));

// Lobby
lobbyBackBtn.addEventListener("click", leaveRoom);
startOnlineGameBtn.addEventListener("click", startOnlineGame);

// Game
giveClueBtn.addEventListener("click", giveClue);
clueInput.addEventListener("keypress", (e) => { if (e.key === "Enter") giveClue(); });
clueCountInput.addEventListener("keypress", (e) => { if (e.key === "Enter") giveClue(); });
endTurnBtn.addEventListener("click", endTurn);

spymasterToggle.addEventListener("click", () => {
  if (gameState.gameOver || gameMode !== "local") return;
  if (gameState.phase === "guess") return; // Locked during guess phase
  gameState.spymasterView = !gameState.spymasterView;
  renderBoard();
  spymasterToggle.classList.toggle("active", gameState.spymasterView);
  spymasterLabel.textContent = gameState.spymasterView ? "Hide Key" : "Guider";
});

// Side Menu
menuBtn.addEventListener("click", () => sideMenuOverlay.classList.add("active"));
closeSideMenu.addEventListener("click", () => sideMenuOverlay.classList.remove("active"));
sideMenuOverlay.addEventListener("click", (e) => { if (e.target === sideMenuOverlay) sideMenuOverlay.classList.remove("active"); });
sideNewGame.addEventListener("click", () => {
  sideMenuOverlay.classList.remove("active"); gameOverOverlay.classList.remove("active");
  if (gameMode === "local") startQuickLocalGame();
  else showScreen("setup");
});
sideMainMenu.addEventListener("click", () => {
  sideMenuOverlay.classList.remove("active"); gameOverOverlay.classList.remove("active");
  if (currentRoomCode) leaveRoom(); else showScreen("setup");
});

// Game Over
playAgainBtn.addEventListener("click", () => {
  gameOverOverlay.classList.remove("active");
  if (gameMode === "local") startQuickLocalGame();
  else showScreen("setup");
});
backToMenuBtn.addEventListener("click", () => {
  gameOverOverlay.classList.remove("active");
  if (currentRoomCode) leaveRoom(); else showScreen("setup");
});

// How to Play
const howToPlayToggle = $("#howToPlayToggle");
const howToPlayContent = $("#howToPlayContent");
if (howToPlayToggle && howToPlayContent) {
  howToPlayToggle.addEventListener("click", () => {
    howToPlayContent.classList.toggle("open");
    howToPlayToggle.textContent = howToPlayContent.classList.contains("open") ? "Hide Rules" : "How to Play";
  });
}

// Cleanup on leave
window.addEventListener("beforeunload", () => {
  if (currentRoomCode && currentUser) {
    try { window.db.collection("wordHunterRooms").doc(currentRoomCode).collection("players").doc(currentUser.uid).delete(); } catch (e) {}
  }
});

// ==================== INITIALIZATION ====================
showScreen("setup");
