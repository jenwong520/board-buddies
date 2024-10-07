export const tagCategories = {
    frequencyOfPlay: [
      "Daily",
      "Every Other Day",
      "Biweekly",
      "Weekly",
      "Bimonthly",
      "Monthly",
      "Often",
      "Rarely",
      "Open To Anything"
    ],
    groupSize: [
      "Smaller Groups",
      "Larger Groups",
      "Open To Anything",
      "2-4 Players",
      "5-7 Players",
      "8+ Players"
    ],
    playStyle: [
      "Competitive",              // Wants to compete
      "Cooperative",              // Wants to work together when gaming
      "Casual",                   // Wants to play for fun only
      "Hardcore",                 // Takes things seriously
      "Strategist",               // Focuses on long-term planning and optimizing strategies to win the game
      "Tactician",                // Enjoys short-term decision-making with changing conditions
      "Aggressor",                // Plays aggressively, often favoring direct confrontation
      "Defender",                 // Focuses on building defenses and managing resources
      "Team Player",              // Enjoys collaborating with others to achieve a shared goal
      "Leader",                   // Guides or coordinates the team’s actions
      "Supporter",                // Assists others, providing help and resources
      "Problem Solver",           // Thrives on solving puzzles and challenges in the game
      "Minimaxer",                // Focuses on optimizing every move and resource
      "Socializer",               // Plays for social interaction and enjoys the experience
      "Relaxed Player",           // Enjoys easygoing and light games with low pressure
      "Explorer",                 // Loves discovering new mechanics, themes, or stories
      "Observer",                 // Carefully watches and absorbs the game, making measured decisions
      "Immersive Roleplayer",     // Gets deeply involved in the game's story and theme
      "Narrator",                 // Enjoys storytelling and developing in-game narratives
      "Gambler",                  // Takes risks, enjoying the excitement of chance and uncertainty
      "Opportunist",              // Adapts quickly, capitalizing on unexpected events
      "Planner",                  // Enjoys developing long-term strategies and foreseeing outcomes
      "Calculator",               // Analyzes probabilities and carefully considers all options
      "Collector",                // Loves gathering resources, cards, or collectibles
      "Builder",                  // Enjoys creating or constructing in-game elements, like engines or decks
      "Diplomat",                 // Prefers negotiation and alliances, avoiding conflict
      "Pacifist",                 // Avoids confrontation and focuses on peaceful interactions
      "Speed Demon",              // Enjoys fast-paced gameplay and quick decision-making
      "Efficient Player",         // Seeks to optimize and complete tasks quickly
      "Meta-Gamer",               // Enjoys reading players and predicting their actions
      "Manipulator",              // Uses psychological tactics to influence other players' decisions
      "Juggler",                  // Excels at managing multiple resources or objectives simultaneously
      "Innovator",                // Experiments with creative strategies and tactics
      "Customizer"                // Modifies the game experience through custom rules or elements
    ],
    gameGenres: [
      "Strategy",                  // Focuses on long-term planning and tactical decision-making
      "Cooperative",               // Players work together to achieve a common goal
      "Deck Building",             // Players construct a deck of cards as part of the gameplay
      "Worker Placement",          // Players allocate workers to perform various tasks
      "Area Control",              // Players compete to control specific areas on the board
      "Role-Playing",              // Players assume roles with specific abilities and story elements
      "Party Games",               // Games designed for larger groups and lighthearted fun
      "Eurogame",                  // Focuses on resource management and indirect competition
      "Ameritrash",                // Emphasizes strong themes and direct conflict
      "Tile Placement",            // Players place tiles to build areas or achieve objectives
      "Abstract",                  // Minimal theme with a focus on mechanics and strategy
      "Card Drafting",             // Players choose cards from a shared pool to build a hand or deck
      "Bluffing",                  // Players deceive or mislead others to achieve goals
      "Dice Rolling",              // Games involving heavy use of dice for decision-making
      "Engine Building",           // Players build systems to generate resources or points
      "Legacy",                    // Games with ongoing changes that affect future playthroughs
      "Wargames",                  // Simulations of military conflicts or battles
      "Social Deduction",          // Players try to uncover hidden roles or identities
      "Dexterity",                 // Games that require physical skill or hand-eye coordination
      "Puzzle",                    // Players solve challenges or configurations to win
      "Trivia",                    // Games that test players' knowledge on various topics
      "Real-Time",                 // Games played under time constraints with fast-paced action
      "Storytelling",              // Games that focus on narrative development and creativity
      "Economic",                  // Focus on managing money, resources, and trading
      "Set Collection",            // Players gather specific sets of items to score points
      "Resource Management",       // Managing resources like money, materials, or time to achieve goals
      "Negotiation",               // Players trade, bargain, or form alliances to win
      "Escape Room",               // Players work together to solve puzzles and escape within a time limit
      "Adventure",                 // Focuses on exploration, quests, and progression through a story
      "Hidden Movement",           // Some players move in secret while others try to track them
      "Asymmetric",                // Players have different roles or abilities, leading to varied gameplay experiences
      "Push Your Luck",            // Players take risks with uncertain outcomes, trying to maximize rewards
      "Auction/Bidding",           // Players compete by bidding on resources or actions
      "Survival",                  // Players try to stay alive while managing limited resources
      "Civilization Building",     // Players develop a society or culture over time
      "Hand Management"            // Players manage and play cards from their hand in the most efficient way
],
    playedGames: [
      "Catan",                          // A strategy game focused on resource management and trade
      "Pandemic",                       // A cooperative game where players work together to stop global disease outbreaks
      "Ticket to Ride",                 // A route-building game where players collect train cards to connect cities
      "Carcassonne",                    // A tile-placement game where players build cities, roads, and fields
      "7 Wonders",                      // A card-drafting game where players develop civilizations over three ages
      "Splendor",                       // An engine-building game focused on collecting gems and buying cards
      "Dominion",                       // A deck-building game where players acquire cards to build a more powerful deck
      "Gloomhaven",                     // A legacy-style, campaign-driven dungeon-crawler game
      "Azul",                           // A tile-drafting game where players aim to create beautiful mosaic patterns
      "Wingspan",                       // A card-driven engine-building game about attracting birds to your wildlife reserves
      "Root",                           // An asymmetric wargame with different factions competing for control of a forest
      "Terraforming Mars",              // A strategy game where players work to terraform Mars by managing resources
      "Scythe",                         // An area-control game set in an alternate-history post-WWI world
      "Codenames",                      // A party game where players try to guess words based on clues given by teammates
      "Betrayal at House on the Hill",  // A horror-themed game with exploration, hidden objectives, and traitor mechanics
      "King of Tokyo",                  // A dice-rolling game where players become monsters competing for control of Tokyo
      "Clank!",                         // A deck-building and dungeon-crawling adventure game
      "The Resistance",                 // A social deduction game with hidden traitors and secret missions
      "Mansions of Madness",            // A cooperative horror game with storytelling, puzzles, and combat
      "Twilight Struggle",              // A card-driven strategy game set during the Cold War
      "Agricola",                       // A resource-management game focused on farming and family development
      "Tzolk'in: The Mayan Calendar",   // A worker placement game featuring rotating gears to simulate time
      "Everdell",                       // A worker placement and tableau-building game set in a woodland world
      "Brass: Birmingham",              // An economic strategy game focused on building industries in 18th century England
      "Blood Rage",                     // A Viking-themed area control and battle game with card drafting
      "Puerto Rico",                    // A game where players manage plantations and ship goods to earn points
      "Spirit Island",                  // A cooperative game where players take on the role of spirits defending their island from colonizers
      "Decrypto",                       // A code-breaking game where players communicate in secret to outwit opponents
      "Monopoly",                       // A classic real-estate trading game
      "Risk",                           // A strategy game focused on world domination through battles and alliances
      "Chess",                          // A classic abstract strategy game with checkmate as the goal
      "Clue",                           // A deduction game where players try to solve a murder mystery
      "Dixit",                          // A storytelling game with beautiful, abstract images where players guess the storyteller's card
      "Kingdomino",                     // A tile-laying game where players build kingdoms using domino-like tiles
      "Love Letter",                    // A light card game where players try to get their love letter to the princess
      "Tigris & Euphrates",             // A tile-laying civilization-building game with conflict and territory control
      "Eclipse",                        // A 4X space strategy game where players expand, explore, exploit, and exterminate
      "Mage Knight",                    // A complex, deck-building adventure game set in a fantasy universe
      "Jaipur",                         // A two-player card game where players compete to be the best trader in the city of Jaipur
      "Star Realms",                    // A deck-building game set in space with player-versus-player combat
      "Concordia",                      // A strategy game based on economic development and resource management in ancient Rome
      "Arkham Horror",                  // A cooperative, Lovecraft-themed game with mystery and adventure
      "Zombicide",                      // A cooperative survival game where players fight against zombies
      "Power Grid",                     // A game where players compete to build and supply power to cities using various energy sources
      "Dune",                           // A strategic board game of intrigue, politics, and conflict set in the Dune universe
      "Coup",                           // A bluffing game where players try to eliminate their opponents through deception
      "Santorini",                      // A strategic abstract game where players build structures on a Greek island
      "Patchwork",                      // A two-player game focused on creating a quilt by placing patchwork pieces on a grid
      "Galaxy Trucker",                 // A real-time game where players build spaceships and navigate through dangerous space
      "Sagrada"                         // A dice-drafting game where players create beautiful stained-glass windows
    ]
};
