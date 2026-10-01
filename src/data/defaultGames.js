export const DEFAULT_GAMES = [
  {
    id: "tetris",
    title: "Tetris Classic",
    category: "Puzzle",
    description: "The timeless falling block puzzle. Rotate, drop, and clear lines with hold mechanics, ghost projections, and speed scaling.",
    iframeSrc: "/games/tetris/index.html",
    iframeCode: "<iframe src=\"/games/tetris/index.html\" width=\"100%\" height=\"650\" frameborder=\"0\" allowfullscreen sandbox=\"allow-scripts allow-same-origin\"></iframe>",
    controls: [
      "Left / Right Arrow: Move Piece",
      "Up Arrow / X: Rotate Clockwise",
      "Z: Rotate Counter-Clockwise",
      "Down Arrow: Soft Drop",
      "Spacebar: Hard Drop",
      "C / Shift: Hold Piece",
      "P: Pause Game"
    ],
    aspectRatio: "4/3",
    rating: 4.9,
    plays: 34820,
    featured: true,
    badge: "Popular",
    tags: ["Puzzle", "Retro", "Classic", "Arcade"],
    color: "#0284c7"
  },
  {
    id: "snake",
    title: "Snake Retro Deluxe",
    category: "Retro",
    description: "Guide the hungry serpent, gobble delicious apples, avoid running into walls or your own tail, and set high score streaks.",
    iframeSrc: "/games/snake/index.html",
    iframeCode: "<iframe src=\"/games/snake/index.html\" width=\"100%\" height=\"600\" frameborder=\"0\" allowfullscreen sandbox=\"allow-scripts allow-same-origin\"></iframe>",
    controls: [
      "Arrow Keys / WASD: Steer Snake",
      "Spacebar: Pause / Resume",
      "R: Quick Restart"
    ],
    aspectRatio: "1/1",
    rating: 4.8,
    plays: 29150,
    featured: true,
    badge: "Retro",
    tags: ["Retro", "Arcade", "Classic", "Casual"],
    color: "#16a34a"
  },
  {
    id: "2048",
    title: "2048 Sliding Tiles",
    category: "Puzzle",
    description: "Slide matching numbered tiles across the 4x4 grid. Merge 2s into 4s, 4s into 8s, and build all the way up to the legendary 2048 tile!",
    iframeSrc: "/games/2048/index.html",
    iframeCode: "<iframe src=\"/games/2048/index.html\" width=\"100%\" height=\"600\" frameborder=\"0\" allowfullscreen sandbox=\"allow-scripts allow-same-origin\"></iframe>",
    controls: [
      "Arrow Keys / WASD: Slide Tiles",
      "Swipe: Touch gesture support",
      "U: Undo last move",
      "R: Restart grid"
    ],
    aspectRatio: "1/1",
    rating: 4.9,
    plays: 41200,
    featured: true,
    badge: "Trending",
    tags: ["Numbers", "Strategy", "Brain", "Puzzle"],
    color: "#d97706"
  },
  {
    id: "flappy",
    title: "Flappy Bird Arcade",
    category: "Arcade",
    description: "Flap your wings to weave through narrow green pipes. High-stakes retro arcade physics where one tap determines survival.",
    iframeSrc: "/games/flappy/index.html",
    iframeCode: "<iframe src=\"/games/flappy/index.html\" width=\"100%\" height=\"600\" frameborder=\"0\" allowfullscreen sandbox=\"allow-scripts allow-same-origin\"></iframe>",
    controls: [
      "Spacebar / Click / Tap: Flap Wings",
      "Esc / P: Pause Game"
    ],
    aspectRatio: "4/3",
    rating: 4.7,
    plays: 52400,
    featured: true,
    badge: "Popular",
    tags: ["Arcade", "Physics", "Endless", "Skill"],
    color: "#eab308"
  },
  {
    id: "dino",
    title: "T-Rex Chrome Runner",
    category: "Action",
    description: "Sprint endlessly through the prehistoric desert. Leap over thorny cacti, duck under soaring pterodactyls, and watch day turn to night.",
    iframeSrc: "/games/dino/index.html",
    iframeCode: "<iframe src=\"/games/dino/index.html\" width=\"100%\" height=\"500\" frameborder=\"0\" allowfullscreen sandbox=\"allow-scripts allow-same-origin\"></iframe>",
    controls: [
      "Spacebar / Up Arrow: Jump",
      "Down Arrow: Duck",
      "Click / Tap: Jump (Mobile)"
    ],
    aspectRatio: "16/9",
    rating: 4.8,
    plays: 38900,
    featured: false,
    badge: "Classic",
    tags: ["Runner", "Dino", "Pixel", "Offline"],
    color: "#475569"
  },
  {
    id: "space-invaders",
    title: "Space Invaders 1978",
    category: "Action",
    description: "Defend planet Earth from descending alien armadas! Take cover behind destructible defense shields and snipe the red mystery mothership.",
    iframeSrc: "/games/space-invaders/index.html",
    iframeCode: "<iframe src=\"/games/space-invaders/index.html\" width=\"100%\" height=\"600\" frameborder=\"0\" allowfullscreen sandbox=\"allow-scripts allow-same-origin\"></iframe>",
    controls: [
      "Left / Right Arrow / A & D: Move Cannon",
      "Spacebar: Fire Blaster",
      "P: Pause"
    ],
    aspectRatio: "4/3",
    rating: 4.8,
    plays: 21800,
    featured: false,
    badge: "Retro",
    tags: ["Shooter", "Retro", "Space", "Action"],
    color: "#7c3aed"
  },
  {
    id: "breakout",
    title: "Breakout Brick Buster",
    category: "Arcade",
    description: "Bounce the steel sphere off your paddle to smash through vibrant brick barricades. Collect powerups like multiball, laser paddle, and wideners.",
    iframeSrc: "/games/breakout/index.html",
    iframeCode: "<iframe src=\"/games/breakout/index.html\" width=\"100%\" height=\"600\" frameborder=\"0\" allowfullscreen sandbox=\"allow-scripts allow-same-origin\"></iframe>",
    controls: [
      "Left / Right Arrow / Mouse: Move Paddle",
      "Spacebar: Launch Ball / Fire Laser",
      "P: Pause"
    ],
    aspectRatio: "4/3",
    rating: 4.7,
    plays: 19600,
    featured: false,
    badge: "Arcade",
    tags: ["Arkanoid", "Bricks", "Paddle", "Arcade"],
    color: "#ea580c"
  },
  {
    id: "pacman",
    title: "Pac-Maze Dot Eater",
    category: "Arcade",
    description: "Chomp glowing pellets across the labyrinth while outsmarting four mischievous ghosts. Grab the Power Pellet to turn the tables!",
    iframeSrc: "/games/pacman/index.html",
    iframeCode: "<iframe src=\"/games/pacman/index.html\" width=\"100%\" height=\"600\" frameborder=\"0\" allowfullscreen sandbox=\"allow-scripts allow-same-origin\"></iframe>",
    controls: [
      "Arrow Keys / WASD: Change Direction",
      "P: Pause Game"
    ],
    aspectRatio: "1/1",
    rating: 4.9,
    plays: 47300,
    featured: true,
    badge: "Popular",
    tags: ["Maze", "Retro", "Arcade", "Ghosts"],
    color: "#facc15"
  },
  {
    id: "pong",
    title: "Neon Pong Retro Arena",
    category: "Sports",
    description: "The grandfather of video gaming reborn in crisp neon. Play solo against an adaptive AI bot or challenge a friend in 2-Player local mode.",
    iframeSrc: "/games/pong/index.html",
    iframeCode: "<iframe src=\"/games/pong/index.html\" width=\"100%\" height=\"550\" frameborder=\"0\" allowfullscreen sandbox=\"allow-scripts allow-same-origin\"></iframe>",
    controls: [
      "W / S: Player 1 (Left)",
      "Up / Down Arrow: Player 2 (Right)",
      "Spacebar: Serve / Pause"
    ],
    aspectRatio: "16/9",
    rating: 4.6,
    plays: 15800,
    featured: false,
    badge: "Retro",
    tags: ["Sports", "2-Player", "Arcade", "Table Tennis"],
    color: "#06b6d4"
  },
  {
    id: "minesweeper",
    title: "Minesweeper Deluxe",
    category: "Puzzle",
    description: "Exercise tactical deduction to clear the minefield. Uncover safe tiles, plant warning flags, and beat your fastest record time.",
    iframeSrc: "/games/minesweeper/index.html",
    iframeCode: "<iframe src=\"/games/minesweeper/index.html\" width=\"100%\" height=\"600\" frameborder=\"0\" allowfullscreen sandbox=\"allow-scripts allow-same-origin\"></iframe>",
    controls: [
      "Left Click / Tap: Reveal Tile",
      "Right Click / Hold: Flag Mine",
      "Click Smiley: Reset Game"
    ],
    aspectRatio: "1/1",
    rating: 4.8,
    plays: 24900,
    featured: false,
    badge: "Classic",
    tags: ["Logic", "Board", "Puzzle", "Classic"],
    color: "#4f46e5"
  },
  {
    id: "slope",
    title: "Neon Tunnel Speed 3D",
    category: "Action",
    description: "High-velocity pseudo-3D neon tunnel runner! Steer your ship along futuristic track segments while avoiding obstacles at breakneck speeds.",
    iframeSrc: "/games/slope/index.html",
    iframeCode: "<iframe src=\"/games/slope/index.html\" width=\"100%\" height=\"600\" frameborder=\"0\" allowfullscreen sandbox=\"allow-scripts allow-same-origin\"></iframe>",
    controls: [
      "Left / Right Arrow / A & D: Bank Left / Right",
      "Spacebar: Boost / Restart"
    ],
    aspectRatio: "16/9",
    rating: 4.9,
    plays: 68300,
    featured: true,
    badge: "Trending",
    tags: ["3D", "Speed", "Reflexes", "Tunnel"],
    color: "#ec4899"
  },
  {
    id: "cookie-clicker",
    title: "Idle Cookie Empire",
    category: "Casual",
    description: "Bake millions of sweet cookies! Click to generate cookies, recruit Grandma assistants, open automated bakeries, and purchase powerful multipliers.",
    iframeSrc: "/games/cookie-clicker/index.html",
    iframeCode: "<iframe src=\"/games/cookie-clicker/index.html\" width=\"100%\" height=\"600\" frameborder=\"0\" allowfullscreen sandbox=\"allow-scripts allow-same-origin\"></iframe>",
    controls: [
      "Click Giant Cookie: Bake 1 Cookie",
      "Store Panel: Purchase upgrades & buildings"
    ],
    aspectRatio: "16/9",
    rating: 4.7,
    plays: 36100,
    featured: false,
    badge: "Casual",
    tags: ["Idle", "Tycoon", "Clicker", "Casual"],
    color: "#b45309"
  }
];
