# Changelog — v1.1.20

Everything below is relative to v1.1.19. Work in progress.

---

## Dungeon logic (hover card)

**Turtle Rock — Eye Bridge.**
The four laser bridge checks are now available one key short of all of TR's
keys: the only key door past the bridge is the pair before the boss.

- Key Sanity: 2 keys → possible, 3+ → available (was 4).
- Key Drop: 3 keys → possible, 5+ → available (was 6).
- The big key is still required, and the **lamp** is now required from the
  front — without it the bridge reads out of logic. Entering from the back
  door (inverted) is unchanged: no key, big key or lamp needed.

**Eastern Palace — Key Drop.**
- Big Key Chest: 1 key → possible, 2+ → available (was available on 1). The
  lamp is still needed; without it the chest reads out of logic.

**Thieves' Town — Key Drop.**
- Blind's Cell: available with the big key and 1 key (was possible on 1,
  available on 2).
- Attic and Boss: possible with 2 keys, available with 3 (were available on
  2).
- Big Chest: one small key, the big key and the hammer, key drop or not (under
  key drop it wanted three keys, possible on two).
  With small keys unshuffled the card now waits for TT's one key to actually
  be picked up — it sits in a chest, so it isn't free the way other unshuffled
  keys are. The map marker is unchanged.
  With Boss Shuffle on, the Boss needs only the big key (and the boss's own
  item), no key count.

**Ice Palace and Thieves' Town — map markers under Key Drop.** The markers
went green on the vanilla key counts (IP on 2, TT on 1) while the boss and the
deep lines wanted more. Under key drop they now stay yellow until every small
key the seed has for that dungeon is held, like Desert Palace, Eastern Palace
and Skull Woods.

**Skull Woods — Key Drop.**
- Spike Corner Key Drop: 1 key → possible, 3+ → available (was available on 1).
- Boss: 2 keys → possible, 4+ → available (was available on 2). The map
  marker stays yellow until all four keys are held.

**Ice Palace — Big Chest and Boss.**
With every small key and the big key in hand, neither the hookshot nor the
Cane of Somaria is needed any more; the key doors take you round the gap.

- Key Sanity: Kholdstare is available with just **1 small key when you have
  the Cane of Somaria** (2 keys otherwise).
- The Big Chest one small key short of all of them, with no hookshot or cane,
  now reads possible instead of out of logic.
- The Ice Palace map marker agrees: it goes green with the hammer, the big key
  and all the small keys, where it used to stay yellow without the hookshot or
  cane.

**Palace of Darkness — earlier possibles.**

- Compass Chest and both Dark Basement chests: possible from **1 key plus the
  bow** (or enemizer), as well as from 2 keys. Available at 4, as before.
- Harmless Hellway, Big Key Chest, both Dark Maze chests and the Big Chest
  (with the big key): possible from **2 keys**, available at 6.
- Dark rooms still read out of logic without a light source.

**Key thresholds in the full drop modes.** A dungeon-wide Pottery Shuffle
(Dungeon, Lottery, Reduced, Clustered, Non-empty) puts every dungeon pot in the
pool, key pots included, and Enemy Drop "Underworld" does the same for enemy
key drops. The card read those seeds as vanilla, so every key count stayed at
its no-key-drop value — Desert Palace's boss was available on one key. They
now use the Key Drop thresholds. (The key pots and enemies still count in the
card's Pots / Enemies rows rather than getting lines of their own.)

**Desert Palace — the map marker.** With Desert's pot keys shuffled the marker
now stays yellow until all four keys are held, matching the card's Boss line
(possible at 3, available at 4); it went green from the first key. The map's
key-drop test asked a function that only the item tracker loads, so it never
passed; Eastern Palace's Dark Square pot check had the same blind spot and is
fixed with it.

**Eastern Palace with its key drops shuffled.** The Boss line is possible on
one small key and available on two (it was unavailable until two), and the
map marker stays yellow until both are held (it went green with none).

**Ice Palace with its keys shuffled.**

- Compass Chest: the first chest in has no key door in front of it; it read
  unavailable without a key.
- Map Chest: with the Cane of Somaria and no hammer it now reads out of logic,
  like the Big Key Chest, instead of unavailable.
- Spike Room: possible from one small key (it wanted three and the hammer);
  available at three with the hookshot, as before.
- Big Key Chest (Key Drop): with the hammer and the hookshot, possible on two
  keys and available on three (it wanted four). With the cane and one key it reads out of logic;
  with no key at all, unavailable.
- Boss (Key Drop): possible with three keys, the hammer and the cane (it
  wanted four).

**Misery Mire — Key Drop.** Nothing needs the sixth key — the last key door,
at the back, leads nowhere that matters.
- Main Lobby: available on 1 key (was possible on 1, available on 5).
- Conveyor Crystal Key Drop: available on 3 (was 5).
- Fishbone Pot Key: available on 4 (was 5).
- Compass Chest and Big Key Chest: possible from 2 keys (was 1), available on
  5 (was 6).
- Map Chest: unchanged — possible from 1, available on 5.
- Compass Chest: needs the lamp or the fire rod under key drop too (it
  skipped the check there).
- Map marker: stays yellow until all but one of the keys are held (5 of 6),
  like Ice Palace and Thieves' Town.

**Swamp Palace — Key Drop.**
One key short now reads out of logic instead of unavailable, and the Compass
Chest moved up a key:
- Compass Chest: 2 keys → out of logic, 3 → available (was available on 2).
  Listed after the Trench 1 Pot Key now.
- Hookshot Pot Key, Trench 2 Pot Key, Big Chest: 2 → out of logic, 3 →
  available.
- West Chest, Big Key Chest: 3 → out of logic, 4 → available.
- Flooded Rooms, Waterfall Room, Waterway Pot Key: 3 → out of logic, 4 →
  possible, 5 → available.
- Boss: 4 → out of logic, 5 → possible, 6 → available.

**Swamp Palace — label.** The Compass Chest is now shown as "Compass Chest
(Reach-around)" on the card.

**Eastern Palace — marker without the lamp.** With no lamp and no fire rod the
card's Boss line is out of logic (the torch room before Armos), but the marker
could still go green once the Big Key Chest was done. It now stays yellow
until the lamp or the fire rod is found, or Armos is beaten.

**Boss line follows the boss stripe.** Every dungeon's Boss line now answers
the same question as the stripe on the map marker:

- boss known and its item missing → "need boss item" (red stripe). Some
  dungeons' Boss rules, Eastern Palace's among them, never asked and read
  available;
- boss unknown under Boss Shuffle → possible instead of available (yellow
  stripe), unless the fire rod, ice rod, hookshot and hammer are all held.

The item tracker's card also stopped treating a known boss with no item
requirement as unknown.

**Mimic Cave needs Turtle Rock's keys.** Reaching it means walking through
Turtle Rock to the ledge you mirror from, past two small key doors. With small
keys shuffled it now stays unavailable until two TR keys are held (three under
Key Drop, which adds a door before Chain Chomps); it showed possible on one. Once
those keys are held it no longer wants the fire rod: that only stood in for
the keys, which unshuffled sit in the Roller Room chests behind it.

## Dungeon prizes

**macOS: marking a prize collected also changed it.** On a Mac, Ctrl+click is
the right-click, and Chromium delivers it as a right-click *and* an ordinary
click. So Ctrl+clicking a prize to mark it collected also cycled it one step —
crystal → red crystal, red crystal → pendant, pendant → green pendant. Both
the item tracker and the map now ignore the click half of a Ctrl+click and let
the right-click action stand alone. (The map's prize-cleared icon on a
dungeon entrance, which handled Ctrl+click itself as well, toggled twice and
so did nothing; it now toggles once.)

**ROM prize table kept from a previous seed.** On a boss kill the tracker sets
the prize from the ROM's own prize tables, which were only forgotten on New
Game. They are now re-read on every connection and whenever the ROM's title
changes (checked every ten seconds), and the two tables are told apart by
their contents rather than by the order they arrive in.

## Entrance shuffle

**Out-of-logic entrances.** Two entrances now show purple instead of red when
they can be reached out of logic (open world):

- **Capacity Upgrade** — fake flippers.
- **Waterfall of Wishing** — boots or moon pearl, without flippers.

The entrance hover card says "out of logic" for them too.

**Inverted: Eastern Palace, Hyrule Castle and Ganon's Tower.** With the
dungeon's label on a found entrance, these no longer go red for want of the
vanilla Light World route (moon pearl and a portal) — the entrance you found is
the way in. EP's chests showed unavailable with the big key in hand.

**Inverted: CT and GT labels no longer swap.** An entrance labelled CT showed
Ganon's Tower's card (and GT showed Agahnim's Tower) — the swap inverted makes
to the two vanilla markers was being applied to the labels too. Each label now
shows and colours its own dungeon, and a CT label is no longer red for want of
the vanilla route to Agahnim's Tower.

**Desert Palace Entrance (West) follows North.** The Mire + mirror route
(South West Dark World, or the flute and Titan's Mitts, plus the mirror) lit
up North but left West red, though the mirror lands on the ledge both doors
share. West now takes it too, and so does the Desert Ledge check that follows
West.

**Inverted (1.0 and 2.0): flute + Titan's Mitts reach the Light World as a
bunny.** Flute to the Mire and through its portal — no moon pearl. The Light
World entrances a bunny can walk into (Link's House, Sanctuary, Kakariko,
Lake Hylia, Eastern Palace and the rest the reference logic marks as
bunny-reachable) now light up with those two items.

**Skull Woods on a found entrance.** The marker goes green with a sword (hammer
if swordless), one small key where keys are shuffled, and the fire rod **or the
lamp and bombs**. It used to accept only the fire rod. The card's Boss line
takes one small key, the sword, and the fire rod or the lamp and bombs —
swordless, the key and the fire.

The card's Skull Woods lines also follow the entrance labels you've placed:
**SW M** opens Map Chest, Pot Prison, Compass Chest, Pinball Room and (with the
big key) the Big Chest; **SW E** or **SW W** opens the Big Key Chest; **SW**
opens the Bridge Room (nothing else needed) and the boss. A section with no
label yet reads unavailable.

## Map window

- **No scrollbar on launch.** The map area was 4px taller than the window in
  the side-by-side layout, and the stacked layout measured its bars before
  they had wrapped. The window now re-fits whenever either bar changes height.
- **Two-row top bar on the entrance shuffle map.** Layout, zoom and Settings
  (top right) on the first row; Connectors, Notes & Connectors and Checks
  centered on the second. Nothing is squashed or pushed off the edge any more.
  Maps without entrance shuffle keep their single row.

## Launcher

- **Apply Patch…** (App Settings, beside Check for Updates). Pick a
  `.trkpatch` file and the tracker replaces the changed files in its own app
  folder — only files that differ from what is installed — backs up what it
  replaces to `_patch_backup/<time>/` inside the app (the three newest
  backups are kept), rolls back if anything fails part-way, and offers to
  restart. A patch whose files all match says "Already up to date". A
  patch made for a different version asks before applying. Build one with
  `node tools/make-patch.js <old-folder> <new-folder> [out.trkpatch]`, which
  takes every new or changed file and lists the removed ones.

- **Favorite presets.** A star button beside the preset list. Starred presets
  (built-in or your own) move to the top of the list, marked ★, in the order
  you starred them. Click again to unstar.

## You-are-here dot

The tracker now reads which dungeon the player is in (`$7E040C`, once a
second with the rest of the autotracking):

- **Item tracker and broadcast view:** a small green dot beside the label of
  the dungeon the player is in right now. It moves as they go and disappears
  on the overworld and in ordinary caves; menus and text boxes keep it where
  it was. Off by default: turn it on with **You Are Here Dot** under Dungeon
  Background in the item tracker's settings and in Broadcast Settings (each
  view has its own switch). Never shown in Race Mode, where the switch is
  greyed out.
- **Items API:** `GET /location` returns `{ dungeon, name }` (`null` outside),
  every `/dungeons/{id}` has an `inside` flag, and the overlay WebSocket gains
  a `tracker:location` channel plus `inside` on each dungeon. In the OpenAPI
  spec and `API_README.md`.

## Item tracker

- **Counts no longer spill out of the dungeon boxes.** The box widths were
  measured once at load, so a count that grew later (HC's `0/12` becoming
  `12/12` with key drop) ran past the edge, most visibly on macOS. The column
  now re-measures whenever a box's contents stop fitting.

## Dungeon map overlay

A new OBS browser source, `overlays/dungeon-map.html`, that shows the map of
the dungeon the player is in and switches with them — dungeon and floor — with
a "Dungeon · Floor" caption. It is self-contained: the page and a `maps/`
folder beside it (`maps/dp/dp-1f.png`, `maps/dp/dp.png`, `maps/ow/ow.png` for
the overworld …), usable as a local file in OBS or served by the Items API at
`/overlay/dungeon-map`. Map images aren't shipped. Black background by
default; a ⚙ in the corner (on hover — in OBS, use Interact) picks black,
white, transparent or any colour. A missing image names the file to add. The
tracker now also reads the floor (`$7E00A4`), and `/location` and
`tracker:location` report it. Outside dungeons it shows
`maps/ow/ow-lw.png` or `ow-dw.png` by world ("Light World" / "Dark World"),
falling back to `ow.png`; the world (`$7E008A`) is reported as `world`
(`lw`/`dw`) too. See API_README.md.

The overlay is a separate product: `overlays/` is left out of `npm run dist:*`
builds and out of patches made with `tools/make-patch.js`. The tracker side
(`/location`, `tracker:location`, `/overlay/config`) ships as normal.

## Broadcast

- **Weighted Random animation.** Each background in the Random Pool now has a
  weight, 0–10, changed with its up/down arrows only (typing is blocked).
  Checking or unchecking a background resets the checked ones to 1 each, an
  even split; raise or lower any of them from there. The grey figure beside
  each is the chance it actually gets (its weight over the checked total).
  A weight of 0 keeps a background checked but never picked.

## Housekeeping

- Removed unused files: `logic/ref_chests.js`, `logic/ref_logic_regions.js`,
  `js/maplogic.js`, `potprobe.html`, and the stray `dist/` folder.
- `DUNGEON-LOGIC-README.md` updated for TR, IP, PoD and SW (several PoD rows were
  out of date before this release).
- Build: `js/dngpanel.js` is `1126v`, `js/items.js` is `1126f`; `logic/ent_logic.js` now loads with
  `?v=1120a` so edits to it aren't served from cache.
