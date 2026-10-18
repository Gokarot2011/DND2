# DND2 — Multiverse Tabletop RPG & Tactical VTT

DND2 is a multiverse tabletop RPG featuring strategic turn-based grid combat and power fantasy roleplaying. Characters from any fictional universe (Goku, SpongeBob, Obama) or original creations adventure together under one consistent, balanced game system. Roleplay and exploration happen over voice chat; when combat begins, the DND2 website handles turns, movement, ranges, 3x3 AoE targeting, breakable environments, and mechanics tracking.

---

## 🎮 Launch the Web Application

The complete, fully functional DND2 Virtual Tabletop runs directly in any modern web browser with **zero installation required**:

1. **Direct Local Play**: Double-click or open `index.html` in your browser.
2. **GitHub Pages**: Go to **Repository Settings → Pages → Deploy from a branch (`main` / root)**. Your game will be live at:
   ```text
   https://gokarot2011.github.io/DND2/
   ```

---

## 🌟 Implemented Features

### 1. ⚔️ Tactical Combat & 5 Battlefield Layouts
- **5 Hand-Crafted Layout Presets** with illustrated top-down battlemaps:
  1. 🌾 **Open Plains (10x10)**: Flat terrain with no obstacles or elevation changes. Pure range kiting.
  2. ⛰️ **Mountainous Region (10x10)**: Craggy plateaus with scalable spires (H1, H2, H3). Climbing spires grants +1 Max Range per height level!
  3. 🏰 **Dungeon Room (10x10)**: 🧱 Breakable stone walls (15 HP, smashable with 1 Main Action to open new passages) and ⚠️ hidden spike traps.
  4. 🗝️ **Small Dungeon / Forest Ruins (6x6)**: Cramped, claustrophobic close-quarters arena with tight maneuvering.
  5. 💀 **Boss Chamber (8x8)**: Features 🏛️ indestructible stone cover pillars. Standing directly in the cover shadow shields players against the Boss's **Unblockable Cosmic Annihilation**!
- **Click-to-Move Pathfinding**:
  - Clicking your character token calculates all reachable tiles using Breadth-First Search (BFS) based on your **Move** stat.
  - Automatically accounts for **Jump** elevation scaling (can only climb height differences $\le$ Jump stat), wall blockades, and obstacles.
- **Range Profiles & 3x3 AoE Targeting**:
  - **Melee (Range 1)**: Adjacent combat.
  - **Range Band (e.g. 5–9)**: Dead-zone calculation (inner tiles $<5$ are dimmed/invalid, outer $>9$ are out of range).
  - **3x3 AoE Template**: Targeting grid highlights center tile for 100% direct damage and 8 surrounding blocks for 50% splash damage!
- **Action Economy & 10 Energy Pips**:
  - 1 Main Action (Strike, Signature Move, Smash Wall, Dash).
  - 1 Minor Action (Defensive Guard stance for +50% DEF, Items).
  - 10 glowing Energy pips with recharges at the start of each round.
  - Initiative & Turn Order timeline sorted dynamically by **Speed**.

### 2. 👤 Multiverse Character Creator
- **Real Portrait Upload**: Upload any PNG, JPG, or WebP image from your computer to generate your circular combat token.
- **10 Core Stats Allocator**:
  - Starts at Level 1 with 5 customizable Skill Points:
    - **HP**: Starts at 20 (+5 Max HP per skill point).
    - **ATK**: Physical damage & strength tasks.
    - **P.DEF**: Flat passive physical damage reduction.
    - **M.DEF**: Flat passive magical damage reduction.
    - **Move**: Movement range on grid (Base 5, Max 10).
    - **Jump**: Vertical elevation climbing & obstacle traversal (Base 0, Max 5).
    - **Intelligence**: Magic attack scaling.
    - **Luck**: Critical hits & secret checks.
    - **Accuracy**: Attack hit bonus (Base 1, Max 5).
    - **Speed**: Determines Initiative turn order.
- **Custom Move Builder**: Create custom attacks with configurable energy costs, single-target or 3x3 AoE shapes, and range bands.

### 3. 👑 DM Encounter & Enemy Spawner
- **Quick Monster Presets**: Goblin Skirmishers, Spire Golem Snipers, and Multiverse World Bosses.
- **Custom Enemy Creator**: Upload custom monster pictures, configure stats, HP, and speed, and place them on the battlefield.
- **Combat Control**: Roll initiative, step through turns, and trigger environmental events.

### 4. 🌐 Real-Time Multiplayer Sync
- Built-in `BroadcastChannel` synchronization allows players and the DM to open the website across multiple browser tabs or windows and instantly see tokens move, walls break, and damage update in real time!

---

## 📁 Repository Structure

| Path | Description |
| --- | --- |
| [`index.html`](index.html) | **Main Production Web Application** (Single-page tactical VTT). |
| [`RULES_SUMMARY.md`](RULES_SUMMARY.md) | **Master Rules Documentation** (Stats, combat, energy, progression). |
| [`assets/maps/`](assets/maps) | High-definition top-down battlemaps (`plains.jpg`, `mountain.jpg`, `dungeon.jpg`, `forest.jpg`, `boss.jpg`). |
| [`src/game/types.ts`](src/game/types.ts) | TypeScript data models for the game engine. |
| [`prototype/`](prototype) | Initial interactive demo prototype. |
| [`docs/concepts/`](docs/concepts) | High-resolution UI concept mockups. |

---

## 🎨 Concept Art

| Tactical Combat | Character Creator | Click-to-Move |
| :---: | :---: | :---: |
| ![Tactical combat](docs/concepts/tactical-combat.jpg) | ![Character creator](docs/concepts/character-creator.jpg) | ![Click to move](docs/concepts/click-to-move.jpg) |
