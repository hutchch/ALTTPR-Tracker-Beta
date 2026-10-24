# Changelog — v1.1.21

Everything below is relative to v1.1.20. Work in progress.

---

## Item tracker — View-2 layout

- **Tracker Settings → Layout: View-1 / View-2.** View-1 is the layout as it was, and stays the default. View-2: the items in two rows of fifteen; then a row with Agahnim at the left and GO at the right, and between them CHECKS and BONKS, the prize counts and heart, DEATHS, REVIVALS and FLUTES — each stat a box of its own like CHECKS (Agahnim's and GO's name tooltips open inward so they aren't cut off at the window edge); then the twelve dungeons in a row, in the tablet's tall style, with the CT box directly on top of HC (in the room HC leaves under the taller boxes). Without key drop the chest counts are bigger (14px), since they're short. The window sizes itself to fit. Switching reloads the item tracker, since the rows are built once at load.

## SNI bundled with the tracker

- **The tracker now ships with SNI and starts it for you.** On launch it checks whether something already answers on port 23074 — your own SNI or QUsb2Snes — and leaves that alone; otherwise it starts the built-in SNI, and stops it when the tracker quits. SNI is github.com/alttpo/sni (MIT); its LICENSE and Lua scripts come with it.
- **App Settings → Connection → Start SNI** turns that off (on by default), with a line saying which SNI is in use: built-in, already running, off, or not included in this build. Saved in the app's own settings.
- **Building:** `npm run dist`, `dist:win`, `dist:mac` and `dist:linux` now fetch the matching SNI release first (`tools/fetch-sni.js`, into `sni/win`, `sni/mac`, `sni/linux`) and bundle it into the app's resources/sni. It's fetched once per SNI version; `SNI_VERSION` at the top of the script picks the version (v0.0.103 now). The Mac build gets SNI's universal program, so the Intel and Apple Silicon DMGs both work. `npm run fetch-sni` fetches it on its own — run it once before `npm start` to try the built-in SNI without building.
- macOS: the tracker isn't signed, so Gatekeeper may ask about SNI the first time, as it does for the tracker. SNI shows its own tray / menu-bar icon while it runs.

## Broadcast — dungeon card released

- **The dungeon card can go over the items instead of the dungeons.** Broadcast Settings → Dungeon Card → "Show the dungeon over": the dungeons (as before, the default) or the items — every item row in Modern and Classic, the two item rows in Modern v2. The card fills that area, so over the items it's bigger.

- **Modern v2 plays the dungeon animations again** — prize, map, compass and big key. Those animations come from the Modern view's dungeon boxes, which Modern v2 doesn't build, so it skipped them all. It now keeps a hidden set for that purpose.

- **The dungeon card is out of hiding.** Its section is back in Broadcast Settings: in a dungeon, the last row switches between the items and the dungeon, for the number of seconds set there. Off by default — it saves under a new key, so a setting left over from testing doesn't switch it on.

## Map — the flute counts once it's activated

- **Checks that need the flute open when it's activated (flute11.png), not when it's picked up (flute10.png)** — in every mode: open, standard and inverted. That covers flying anywhere and the flute as Death Mountain's light. Example, open mode with titan's mitts, mirror, pearl and hammer: Mire Shed, Checkerboard Cave, Spectacle Rock and Spiral Cave go from red/purple to green when the flute is activated. Inverted 2.0 is unchanged — its flute arrives activated.

## Item tracker — connection label

- **The label can't stay on "Disconnected" while data is arriving** — any read that comes in sets it back to Connected. When the socket closes, the reason is written to the console (items.js build 1136a).
- QUsb2Snes on RetroArch drops the connection whenever the tracker reads the ROM (seed name and dungeon prizes), so it reconnects every few seconds. A workaround that stopped the ROM reads was tried and reverted — it cost the automatic dungeon prizes. Use SNI.

## Entrance shuffle — label colours

- **Library, Smith, Bat and Hook need the Moon Pearl on a bunny-side door.** On a Dark World entrance (Light World in inverted) without the pearl they now show red; Library was showing green with just the boots. Mimic and Spike already did this. Sahasrahla, Kid and Magic stay as they were — a bunny can get those (the entrance randomizer's bunny rules agree).
- **Item doors need the Moon Pearl on the bunny side too.** An Item label on a Dark World door (Light World in inverted) shows red until you have the pearl. The exceptions are the caves a bunny can still take the item from — Lost Woods Hideout, Lumberjack Tree, Checkerboard Cave and Peg Cave — but only for Item doors Auto Entrance labelled, since a hand-placed Item label doesn't know which cave it is.
- **HC M / HC W / HC E get the quarter fill**, like the DP doors: coloured by what's left in Hyrule Castle, with green quarters for the share of it that's in logic. They all share the castle's whole count.
- **Spectacle Rock's three doors had their names rotated.** The top door is the Peak, the lower right one is Spectacle Rock Cave and the lower left one is the Bottom — that's the randomizer's own door table, and it's how Entrance Autotrack labels them. The map had them the other way round, so autotrack marked the neighbouring marker. Only the names moved; all three are in the same region, so the logic is unchanged (`js/entrances_data.js`).
- **Lines join a dungeon's labelled doors.** Every pair of HC M / HC W / HC E markers gets a blue line, and every pair of DP M / DP W / DP E an orange one. They are drawn only — not connectors, so they don't change the marker shape or any logic (the label groups already handle that) — and they follow the labels as they're placed or cleared. The Connectors checkbox hides them with the rest.
- **The Hyrule Castle hover card shows its item count.** It read 0/6 whatever you'd found, because the item tracker never sent HC's chest count to the map. It does now (items.js build 1134a).

## Entrance shuffle — autotracking (new, not race legal)

- **New launcher switch: Auto Entrance – Not Race Legal**, to the right of Entrance Shuffle. OnlyADKD moved down to the Boss Shuffle row. It only shows while Entrance Shuffle is on. It is off unless you turn it on for this run: the launcher always opens with it off, and reading a seed link, applying a preset or the OnlyADKD button turns it off again. The map also ignores it in OnlyADKD. Race Mode turns the switch off and locks it, and the map ignores it whenever Race Mode is on.
- **Map Style in the map's settings has a third choice: Auto Entrance Shuffle – Not Race Legal.** It turns Auto Entrance on or off live, without relaunching, and shows selected when the map was launched with it on. Greyed out in Race Mode (and in OnlyADKD).
- **The map marks doors as you go through them.** It watches the game for Link entering a door and works out which door from where he stood on the overworld, using the exact door positions from the entrance randomizer's own table. Holes are matched to the nearest hole marker.
- **The door gets labelled with where it leads**, read from the entrance id the game loads (`$7E010E`). Dungeons get their code (PoD, DP W, TR W, HC E …), key locations theirs (Kid, Smith, Sahas, Library, Magic, Mimic, Dam, Bat, Bomb, Spike, Hook, Bumper, Link, Sanc, Mount), and the rest Item, Shop $, Rupee 💰, Fairy 🧚 or Ganon. A label you set by hand is never replaced.
- **Dark caves gone into without the lamp are labelled Dark, not cleared.** Old Man Cave, Death Mountain Return Cave and Old Man House are dark inside; without the lamp their door now gets the Dark label (Old Man House keeps Mount) and neither end is cleared. With the lamp they're handled as before.
- **Dungeon doors are labelled on the way out too.** Walk through a dungeon and out a different door, and that door gets its code (DP W, HC E, SW M, TR E …). Each dungeon door has its own entrance room, so the room Link walks out of says which door it is. A label you set by hand is left alone.
- **Start locations are labelled as you walk out.** Link begins inside Link's House, the Sanctuary or the Mountain, so there's no door to watch him go through. The first door he walks out of without having come in gets Link, Sanc or Mount, from the entrance the game loaded. Checked against the first probe log: the Sanctuary start came out at North Fairy Cave and was labelled Sanc.
- **Doors with nothing left to do are cleared on entry:** shops, rupee caves, fairies, hint caves, empty houses and item-less connectors. Dungeons, key locations and anything with items stay uncleared.
- **Connectors draw their line when you walk through.** Go in one door and come out another and the two are connected, and both ends are cleared if the connector has no items. Dungeons with several doors are left to their labels.
- **An Item door clears itself once its item is collected,** and its item picture goes, as a check dot's does. Autotrack remembers which check the door leads to (Mire Shed, Cave 45, Hype Cave …) and clears the door when SRAM marks that check done. An Item label set by hand works too, as long as the item is collected while Auto Entrance has seen you go in by that door.
- **Right-click an Item entrance to tag the item.** It opens the same item picker as the check dots, and the picture replaces the word "Item" on the map until the item is collected. A Label… button in the picker opens the usual label menu. The tags are kept like labels (`ent-items`), go into the 💾 entrance save file, and are wiped by New Game.
- Checked by replaying two real probe logs through the map: every door, label, clear and connection matched what was walked. Inverted mode and the Skull Woods / sewer holes are untested.
- New file `js/entautotrack.js` (its own usb2snes connection, polling every 100 ms only while the switch is on). `entranceprobe.html` stays in the folder as the diagnostic tool.

## Entrance shuffle — starting location labels

- **Light World start labels now work in inverted.** A start label (Link / Sanc / Mount, or Bomb in Inverted 2.0) on a Light World entrance now grants that region as a bunny start. Before, it granted nothing. Example: Bomb on Paradox Cave (Bottom) now opens Paradox Bottom/Middle, Spiral Cave (Bottom) and Hookshot Fairy instead of leaving everything red. Item gates still apply, and the HC balcony is still excluded.
- **A start label now counts as a found entrance**, the same as a connector. Example: starting at Skull Woods Second Section Door (West) now makes the Second Section Hole reachable (and Final Section with the fire rod).
- Documented in `ENTRANCE_SHUFFLE_LOGIC.md` → *Starting Location Labels*, with a pointer from `INVERTED-2-README.md`.

## Entrance shuffle — out of logic

- **Kern (bomb) jump into the PoD area, in every entrance-shuffle mode.** With bombs and access to the West or South Dark World (plus the moon pearl in open mode), the East Dark World entrances (Palace of Darkness, PoD Hint, East Dark World Hint, Dark Lake Hylia Fairy, Pyramid Fairy) now show purple instead of red. Each entrance's own other requirements still apply, so Pyramid Fairy still needs its crystals. The non-shuffle map has had this since v1.1.19; the entrance-shuffle markers never did.
- **Dark Potion Shop joins the kern jump** with the glove as well, the same as the Catfish check: up from the PoD area into the North East Dark World.

## Inverted entrance shuffle — Light World access

- **Start labels no longer open the Light World from anywhere (Inverted 1.0).** A Sanc, Link or Mount label on any entrance counted as a way out into the Light World, so Sanc on Dark Sanctuary Hint lit up the Light World with nothing placed there. Removed from both the entrance markers (`ent_logic.js`) and the check dots (`kakarikoConnectorFound`). A start label now counts only by where it sits. (2.0 already had this since v1.1.20.)
- **Potion Shop is ringed by bushes.** In Inverted 1.0 and 2.0, a connector or label on the Potion Shop now gives Light World access only with the moon pearl, the same as Bush Covered House.

## Inverted — Ganon's Tower

- **Inverted (1.0 and 2.0), entrances shuffled: each tower door keeps its barrier.** The barrier belongs to the physical door, whatever dungeon is behind it and whatever label is on it. A GT or CT label placed anywhere else carries no barrier.
  - **Ganons Tower** (top of Dark Death Mountain): red until the GT crystal requirement is met (the seed's value from SRAM, else the setting).
  - **Agahnims Tower** (Hyrule Castle): red until the Master Sword or the Cape, plus the pearl and the castle balcony. Crystals don't open it.
- **Inverted: Agahnims Tower with HC W / HC E labelled.** A label on a balcony door now counts as reaching the balcony. Before, only a drawn connector did, so HC W on Hyrule Castle West with the pearl and Master Sword still showed Agahnims Tower red.

## Dungeon card — Desert Palace and Skull Woods by entrance

- **DP (north door) card:** an entrance labelled `DP` now shows only the Boss, the prize, the back's pot keys (Desert Tiles 1, Beamos Hall, Desert Tiles 2, when key drop is on) and the Pots count for the back rooms.
- **DP M / DP W / DP E cards:** show the rest — Map, Compass, Big Key, Torch, Big Chest, the front rooms' Pots and the Enemies row (the enemy count is dungeon-wide and can't be split by room).
- The Desert Palace square itself, and the item tracker, still show the whole dungeon.
- **DP M / DP W / DP E markers show the front's status.** Their colour comes from the front checks only, with the dungeon squares' quarter fill showing how much of the front is in logic (always shown, in every key mode). Green: all of it in logic; quarters: that share; yellow: only possible; then purple / orange / red. Grey once every front check is done.
- **Skull Woods is split three ways:**
  - `SW` (Final Section door): Bridge Room, Spike Corner Key Drop (key drop on), the Boss and prize, the back rooms' Pots (Skull 3 Lobby, Vines, Final Drop) and the Enemies row.
  - `SW E` / `SW W` (Second Section): Big Key Chest and West Lobby Pot Key (key drop on), plus the Pots in the X Room and Big Key room.
  - `SW M`: Map, Pot Prison, Compass, Pinball, Big Chest and the remaining Pots.
  - The SW M and SW E/W markers each get their own section's colour and quarter fill.

## Dungeon card — key logic review (dngpanel 1130a)

Changes from the reviewed key-logic sheet (Dungeon-Key-Logic-Review.xlsx), written possible / available:

- **Ganon's Tower**, keys now counted in Key Sanity too (they were Key Drop only): DMs Room ×4 and Map Chest 1/3 (KD 1/6); Firesnake Room 1/3 (KD 2/6); Randomizer Room ×4, Bob's Chest, Big Key Chest, Big Key Room L/R 2/3 (KD 3/6); Compass Room ×4 2/3 (KD 1/6); Big Chest 2/3 (KD 2/6); Double Switch and Conveyor Star Pits pot keys KD 1/6; Validation Chest KS 1/4.
- **Swamp Palace** West Chest and Big Key Chest, Key Drop: 4/6 (were 4/4).
- **Tower of Hera** Big Key Chest needs its small key found in every mode (dngpanel 1131a). Where small keys aren't shuffled the tracker treated every key as already in hand, so the chest read available before the key was picked up.
- **Ice Palace** Boss, Key Drop: possible from 2 keys (was 4, or 3 with the cane of somaria); still 6 for available.

## Dungeon card — Ganon's Tower keys

- **Pre-Moldorm Chest:** possible from 1 small key, available one short of all of them: 3 in keysanity, 7 under key drop. It read available on 1 key in keysanity (the key count was only checked under key drop).
- **Validation Chest:** possible from 2 keys, available only with every key: 4 in keysanity, 8 under key drop.

## Dungeon card — Skull Woods boss keys

Keys are assumed spent in the worst possible way, so the Boss is green only with every key:
- **Key Sanity:** possible from 1 key, available at all 3. It had no key check outside key drop.
- **Key Drop:** possible from 2 keys, available at all 5 (was 4). The map square waits for all 5 too.

Build numbers: `items.js` 1127a (sends revivals to the broadcast view); `dngpanel.js` 1128a (the counter only goes up: v1.1.20 ended at 1127r; this version briefly used 1121a–f by mistake); `ent_logic.js` `?v=1121b`.

## Race overlay (overlays/race.html)

- **Vertical view:** under the racers, the same racers side by side, each in a tall column: four rows of items and two rows of dungeons. It follows the horizontal view live (names, items, prizes, bosses, counts) and takes no clicks. Both views use the same item size and fit the window together. Its dungeon boxes: name and prize on top; big key, compass, map; keys; chests. No boss picture, to save space. Gear → Vertical view turns it off. In OBS, paste the source as a reference and crop one copy to each view (RACE-OVERLAY-README.md).
- **Vertical view items laid out like the broadcast view's Modern style**: three rows of 11, Agahnim and GO in the right-hand column (Modern's stats spot left blank), and shorter dungeon boxes. A vertical pop-out opens at the broadcast window's width (494 px).
- **Pop-out windows:** gear → Pop out opens any racer's horizontal or vertical view in a window of its own, for Window Capture on a restream. Every window (main and pop-outs) follows the others' marks live; horizontal pop-outs take clicks too. Needs the overlay open in a normal browser (OBS's Interact can't open windows); the browser's thin title bar stays, so crop it in OBS. Each pop-out window snaps to its contents (no space at the bottom or sides): drag the width and the height follows.
- Fixed: with pop-outs open, a dungeon prize (or medallion / boss pick) shared to the other racers could come undone — a window redrawing saved an older copy of the race over the newer one. Windows now only save on a click.
- **Racers: 2 to 5** (six is gone — too narrow for the vertical view). A saved 6 opens as 5.

## Boomerangs — one square, split on the diagonal (items.js 1133a)

- **Item tracker and every broadcast view (Modern, Modern v2, Classic):** the boomerang square shows the blue boomerang upper-left and the red lower-right (`boomerang1.png` / `boomerang2.png`, `boomerang0.png` greyed when that one isn't found), each half with its own item fill, as the shovel / mushroom square in Modern v2. In the item tracker, clicking a half toggles that boomerang (upper-left blue, lower-right red); the autotracker is unchanged. The broadcast animation shows the boomerang just found (`boomerang1.png` / `boomerang2.png`).
- **Race overlay** (`overlays/race.html`): the same boomerang square, with `boomerang0/1/2.png` copied into `overlays/images/`; a click on a half toggles that boomerang (left- or right-click), in both views and the pop-outs.
- **Seed hash** (launcher's seed-link reader): the Boomerang hash icon is now `boomerang1.png`.
- **Map right-click marks:** the item list has both boomerangs, Blue (`boomerang1.png`) and Red (`boomerang2.png`), so a check can be marked with the right one. Blue keeps the old key, so earlier marks still show. Tall pictures keep their shape in the list and on the dot.
- **Classic's combo squares** (Powder / Mushroom, Flute / Shovel) use the same full-triangle fill, so with both found only a thin line runs between them.

## Item tracker — Pulse fill effect

- **New Item Fill Effect: Pulse** (Item Tracker settings → Item Background, beside No Effects / Falling / Starburst). When an item is obtained it flashes and swells twice, its outline sparkles (a white / gold glow round its edges that flickers), and its fill flashes in with it. Works on the boomerang halves and the bottle grid too. Like the other effects it plays only with Item Fill on.
- **Shine on every Item Fill Effect** (No Effects, Falling, Starburst, Pulse): a white streak sweeps across the square as the fill comes in.
- **Starburst fills from the centre out**, then the shine (it was a plain fade-in).
- **The broadcast view has the same effects** (Broadcast Settings → Item Fill → effect): the shine on every effect, Starburst from the centre out, and the new Pulse option. They play whenever an item fills, so a collect still shows on stream with the item animation turned off.

## Broadcast view — Modern style

- **Modern v2's unfound items match Modern's brightness:** both use the same greyed `0.png` pictures, but Modern v2 also dimmed them to 28%, so they read darker. That extra dimming is gone.

- **Dungeon boxes, the same in Modern and Modern v2:** the name; the prize on its own (larger); map, compass and big key on one row; the small keys as a smaller count; then the item (chest) count, bigger and bold. "15/15" still fits each box, and the view still fits the default broadcast window. The Show Map / Compass / Big Key / Small Keys / Chests settings work as before.

## Broadcast view — dungeon card

> **Not released in this build — hidden and switched off.** To release it, set `BCAST_UNRELEASED = true` at the top of `js/bcast-settings-core.js`. Anyone's saved choice comes back then; until then a saved Modern v2 opens as Modern.

- **While Link is in a dungeon, the dungeon row (the last row) switches between the dungeons and a dungeon card**; the items stay on screen. The card has two lines, sized to fit the row: the dungeon name, floor and prize; then chests, small keys, map / compass / big key, and the boss. Card first, then the dungeons for 10 seconds and the card for 5, over and over; back to the dungeons for good on leaving. Works in every View Style (Classic: its last row, PoD to TR and GO).
- **Broadcast Settings → Dungeon Card:** turn it on or off (on by default) and set both times (1–120 seconds).
- An item animation (items, map, compass, big key, dungeon prize) switches back to the dungeons and restarts their 10 seconds.
- **The card's item count is the tracker's own**, the same as the dungeon boxes, so it follows the seed's mode. It used to count chest spots only, leaving out the boss item and, in keysanity, coming up short (Ice Palace showed 7 of 8). The announce overlay's card gets the same count. Agahnim's Tower outside Crossed still counts its two chests. (items.js 1129a)

## Broadcast view — Modern v2 style

- **Fit and bottles** (Oct 15): the fit now measures from the view's own top to the bottom bar, so the dungeons no longer end up under the bar (seen on the Mac); it refits once pictures and fonts have loaded; the gap under the top row is smaller; and the items grow to fill the width, with the same margin both sides. Bottles show as one picture of how many you have (bottle0–4.png); a new bottle still animates and plays its sound.
- **Dungeon boxes as the Modern view's** (Oct 15): prize; map, compass, big key; small keys (smaller); item count (bigger).
- **Items in two rows of 14** (Oct 15): Bow, Boomerang, Hookshot, Powder, Fire Rod, Ice Rod, Bombos, Ether, Quake, Moon Pearl, Flippers, Sword, Shield, Armor / Lamp, Hammer, Shovel + Mushroom, Flute, Net, Book, Bottles, Somaria, Byrna, Cape, Mirror, Half Magic, Boots, Gloves. The shovel and the mushroom share one square, split on the diagonal with an item fill per half, as Classic's combo squares; each half's fill covers its whole triangle, so with both found only a thin line runs between them. Bombs are not shown.
- **New View Style: Modern v2** (Broadcast Settings → View Style, between Modern and Classic). The race overlay's layout, filled in live from the tracker:
  - **Top row:** Agahnim, **CHECKS** and **BONKS** boxes on the left; the crystal, red crystal, pendant and green pendant counts in a box in the middle (each counted on its own — the crystal count leaves out the red ones, the pendant count the green one); **DEATHS**, **REVIVALS** and GO on the right.
  - **Two item rows,** with the MM/TR medallion labels.
  - **Dungeons in one row:** EP through TR. Each box shows the name; the prize and big key; compass, map and the small keys collected (just the number); then the items (chests) as a large count on its own line. GT is left out so the ten boxes are wide enough for big counts. No bosses (too small to read).
- Collect animations, item sounds, Go Mode sparks, the **item fill** and the **dungeon fill** work as in Modern and follow the same settings (dungeon fill: all chests → chests colour, chests and boss → complete colour, boss only → outline). Bottles show what's in each bottle, as Modern does.
- **Sized to the window:** Modern v2 fits the broadcast window (every row, the top row's boxes included) and re-fits when the window is resized. The −/+ buttons shrink or grow it from there (100% = fits); that size is kept apart from Modern's own.
- Hyrule Castle isn't shown: the tracker doesn't send its chest count to the broadcast view (Modern and Classic leave it out too).
