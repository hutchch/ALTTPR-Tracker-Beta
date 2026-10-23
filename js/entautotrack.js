// ── Entrance autotracking (v1.1.21) ──────────────────────────────────────────
// Watches the game for Link going through a door and marks it on the
// entrance-shuffle map: the door he walked into, what it leads to (label), and
// for a connector the door he came out of (connection line).
//
// Not race legal: off unless the launcher's Entrance Autotrack switch is on,
// and always off in Race Mode. Uses its own usb2snes connection so the map's
// room polling is untouched.
//
// What it reads, one 0x120-byte block from WRAM $7E0000:
//   $10 game mode (07 indoors, 09/0B overworld, < 06 title/file select)
//   $11 submode, $1B indoors flag, $20/$22 Link Y/X, $8A overworld area,
//   $A0 room, $10E entrance id (which interior the game just loaded).
// The door is found from where Link stood on the overworld; the destination
// from $10E. Both were checked against two real probe logs (entranceprobe.html).
(function () {
  if (typeof window === 'undefined') return;
  // Generated from ALttPEntranceRandomizer (EntranceShuffle.py door_addresses / exit_ids).
  // DOORS: tracker name -> [overworld area $8A, Link X, Link Y] where Link stands on leaving that door.
  var DOORS = {"Links House":[44,2232,2792],"Desert Palace Entrance (South)":[48,296,3240],"Desert Palace Entrance (West)":[48,136,3224],"Desert Palace Entrance (North)":[48,296,3112],"Desert Palace Entrance (East)":[48,456,3224],"Eastern Palace":[30,3920,1560],"Tower of Hera":[3,2288,104],"Hyrule Castle Entrance (South)":[27,2040,1740],"Hyrule Castle Entrance (West)":[27,1832,1540],"Hyrule Castle Entrance (East)":[27,2248,1540],"Agahnims Tower":[27,2040,1588],"Thieves Town":[88,504,1960],"Skull Woods First Section Door":[64,744,584],"Skull Woods Second Section Door (East)":[64,584,568],"Skull Woods Second Section Door (West)":[64,232,504],"Skull Woods Final Section":[64,152,184],"Ice Palace":[117,3256,3512],"Misery Mire":[112,296,3271],"Palace of Darkness":[94,3920,1576],"Swamp Palace":[123,1912,3800],"Turtle Rock":[71,3848,296],"Dark Death Mountain Ledge (West)":[69,3256,343],"Dark Death Mountain Ledge (East)":[69,3448,343],"Turtle Rock Isolated Ledge Entrance":[69,3352,440],"Hyrule Castle Secret Entrance Stairs":[27,2248,1736],"Kakariko Well Cave":[24,184,1719],"Bat Cave Cave":[34,1288,2248],"Elder House (East)":[24,680,1688],"Elder House (West)":[24,616,1688],"North Fairy Cave":[21,2728,1096],"Lost Woods Hideout Stump":[0,744,584],"Lumberjack Tree Cave":[2,1352,103],"Two Brothers House (East)":[41,568,2904],"Two Brothers House (West)":[40,440,2904],"Sanctuary":[19,1880,1044],"Old Man Cave (West)":[10,1448,696],"Old Man Cave (East)":[3,1656,744],"Old Man House (Bottom)":[3,1832,935],"Old Man House (Top)":[3,2184,632],"Death Mountain Return Cave (East)":[3,1608,536],"Death Mountain Return Cave (West)":[10,1464,599],"Spectacle Rock Cave Peak":[3,1992,391],"Spectacle Rock Cave":[3,1992,567],"Spectacle Rock Cave (Bottom)":[3,1864,535],"Paradox Cave (Bottom)":[5,3496,567],"Paradox Cave (Middle)":[5,3528,856],"Paradox Cave (Top)":[5,3512,231],"Fairy Ascension Cave (Bottom)":[5,3352,536],"Fairy Ascension Cave (Top)":[5,3352,439],"Spiral Cave":[5,3256,344],"Spiral Cave (Bottom)":[5,3272,503],"Bumper Cave (Bottom)":[74,1448,695],"Bumper Cave (Top)":[74,1464,600],"Superbunny Cave (Top)":[69,3512,231],"Superbunny Cave (Bottom)":[69,3448,568],"Hookshot Cave":[69,3400,263],"Hookshot Cave Back Entrance":[69,3272,56],"Ganons Tower":[67,2296,40],"Pyramid Exit":[91,1768,1960],"Waterfall of Wishing":[15,3680,519],"Dam":[59,1912,3800],"Blinds Hideout":[24,520,1687],"Bonk Fairy (Light)":[43,1928,2663],"Lake Hylia Fairy":[46,3368,2615],"Light Hype Fairy":[52,2440,3160],"Desert Fairy":[58,1128,3622],"Kings Grave":[20,2456,1190],"Tavern North":[24,648,2297],"Chicken House":[24,392,2184],"Aginahs Cave":[48,808,3352],"Sahasrahlas Hut":[30,3312,1831],"Lake Hylia Shop":[53,2968,3110],"Capacity Upgrade":[53,3240,3464],"Blacksmiths Hut":[34,1240,2152],"Sick Kids House":[24,632,2167],"Lost Woods Gamble":[0,752,8],"Fortune Teller (Light)":[17,760,1288],"Snitch Lady (East)":[24,840,1944],"Snitch Lady (West)":[24,200,1880],"Bush Covered House":[24,824,2152],"Tavern (Front)":[24,648,2407],"Light World Bomb Hut":[24,104,2407],"Kakariko Shop":[24,440,2359],"Cave 45":[50,1080,3350],"Graveyard Cave":[20,2328,1094],"Checkerboard Cave":[48,712,3175],"Mini Moldorm Cave":[53,2664,3816],"Long Fairy Cave":[47,4008,2840],"Good Bee Cave":[55,3736,3126],"20 Rupee Cave":[55,3688,3206],"50 Rupee Cave":[58,1272,3911],"Ice Rod Cave":[55,3656,3127],"Bonk Rock Cave":[19,1592,1191],"Library":[41,632,2663],"Potion Shop":[22,3272,1336],"Hookshot Fairy":[5,3448,566],"Pyramid Fairy":[91,1912,1959],"East Dark World Hint":[111,4008,2840],"Palace of Darkness Hint":[94,3472,2024],"Dark Lake Hylia Fairy":[110,3368,2614],"Dark Lake Hylia Ledge Fairy":[119,3656,3127],"Dark Lake Hylia Ledge Spike Cave":[119,3688,3206],"Dark Lake Hylia Ledge Hint":[119,3736,3126],"Hype Cave":[116,2440,3160],"Bonk Fairy (Dark)":[107,1928,2662],"Brewery":[88,440,2360],"C-Shaped House":[88,840,1943],"Chest Game":[88,200,1880],"Hammer Peg Cave":[98,1288,2470],"Red Shield Shop":[90,1352,1848],"Dark Sanctuary Hint":[83,1880,1094],"Fortune Teller (Dark)":[81,760,1287],"Dark World Shop":[88,824,2152],"Dark Lumberjack Shop":[66,1368,199],"Dark Potion Shop":[86,3288,1352],"Archery Game":[105,872,2840],"Mire Shed":[112,152,3254],"Mire Hint":[112,808,3350],"Mire Fairy":[112,440,3255],"Spike Cave":[67,2344,566],"Dark Death Mountain Shop":[69,3498,566],"Dark Death Mountain Fairy":[67,1656,744],"Mimic Cave":[5,3448,342],"Big Bomb Shop":[108,2232,2791],"Dark Lake Hylia Shop":[117,2648,3256],"Lumberjack House":[2,1368,216],"Lake Hylia Fortune Teller":[53,2648,3256],"Kakariko Gamble Game":[41,872,2840]};
  // HOLES: tracker name -> [world, left%, top%] (js/entrances_data.js; holes have no exit spot).
  var HOLES = {"Bat Cave Drop":["lw",36.1,56.5],"Hyrule Castle Secret Entrance Drop":["lw",61.0,42.5],"Kakariko Well Drop":["lw",4.0,43.0],"Lost Woods Hideout Drop":["lw",20.6,13.2],"Lumberjack Tree Tree":["lw",31.4,9.0],"North Fairy Cave Drop":["lw",66.0,32.0],"Pyramid Hole":["dw",51.4,42.0],"Sanctuary Grave":["lw",54.9,31.5],"Skull Woods First Section Hole (East)":["dw",21.6,18.0],"Skull Woods First Section Hole (North)":["dw",20.4,13.5],"Skull Woods First Section Hole (West)":["dw",17.0,19.0],"Skull Woods Second Section Hole":["dw",13.4,10.0]};
  // DEST: $7E010E entrance id -> [label code, flags]. flags: 1 clear on entry, 2 hole, 4 dungeon.
  var DEST = {1:["Link",0],2:["Sanc",0],3:["HC W",4],4:["HC M",4],5:["HC E",4],6:["",0],7:["",0],8:["EP",4],9:["DP M",4],10:["DP E",4],11:["DP W",4],12:["DP",4],13:["",1],14:["",1],15:["",1],16:["",1],17:["Bat",0],18:["",1],19:["",0],20:["",0],21:["TR W",4],22:["Bumper",0],23:["",0],24:["TR",4],25:["TR E",4],26:["",1],27:["",1],28:["",0],29:["",0],30:["",0],31:["",0],32:["",0],33:["",0],34:["",0],35:["",0],36:["CT",4],37:["SP",4],38:["PoD",4],39:["MM",4],40:["SW W",4],41:["SW E",4],42:["SW M",4],43:["SW",4],44:["",1],45:["IP",4],46:["",1],47:["",1],48:["Mount",1],49:["Mount",1],50:["",0],51:["ToH",4],52:["TT",4],53:["TR M",4],54:["",1],55:["GT",4],56:["",1],57:["",1],58:["Hook",0],59:["Hook",0],60:["",1],61:["Item",0],62:["",1],63:["",1],64:["Kid",0],65:["Spike",0],66:["",1],67:["Item",0],68:["",1],69:["Sahas",0],70:["Shop $",1],71:["Item",0],72:["Item",0],73:["Library",0],74:["",1],75:["Item",0],76:["Magic",0],77:["Item",0],78:["Dam",0],79:["Mimic",0],80:["",1],81:["Item",0],82:["Item",0],83:["Bomb",0],84:["Item",0],85:["Fairy 🧚",1],86:["",1],87:["Shop $",1],88:["Shop $",1],89:["",1],90:["",1],91:["Item",0],92:["Item",0],93:["Shop $",1],94:["Fairy 🧚",1],95:["Item",0],96:["Shop $",1],97:["Item",0],98:["",1],99:["Item",0],100:["Smith",0],101:["",1],102:["",1],103:["",1],104:["",1],105:["",1],106:["",1],107:["",1],108:["Item",0],109:["Rupee 💰",1],110:["Item",0],111:["Rupee 💰",1],112:["",1],113:["Fairy 🧚",1],114:["Item",0],118:["",6],119:["",6],120:["",6],121:["",6],122:["Item",2],123:["Ganon",6],124:["",3],125:["Item",2],126:["Bat",2],127:["Item",2],128:["Item",2],129:["",6],131:["Item",0],132:["Item",0]};

  // Item interiors -> the map's check id (CHECKS in map.html). When SRAM marks
  // that check done, the door that leads there is cleared too.
  var ITEM_CHECK = { 0x3d:16, 0x43:5, 0x47:64, 0x48:7, 0x4b:6, 0x4d:9, 0x51:80, 0x52:81, 0x54:8, 0x5b:0,
    0x5c:105, 0x5f:10, 0x61:15, 0x63:102, 0x6c:19, 0x6e:18, 0x72:82, 0x7a:77, 0x7f:78, 0x80:14,
    0x7d:97, 0x83:83, 0x84:20 };

  var DUNGEON_DOOR_MAX = 64;   // px: walk-in matches were 11-48 px, next door >= 56 px away
  var EXIT_DOOR_MAX    = 40;   // px: Link lands 3-32 px from the door's exit spot
  var HOLE_MAX         = 5;    // %: map coordinates of the hole marker
  var POLL_MS          = 100;

  // Race Mode and OnlyADKD rule it out whatever the switch says.
  function allowed() {
    try {
      if (localStorage.getItem('alttp-race-mode') === 'yes') return false;
    } catch (e) { return false; }
    return !(typeof onlyAdkd === 'function' && onlyAdkd());
  }
  function enabled() {
    if (!allowed()) return false;
    try {
      return localStorage.getItem('alttp-ent-autotrack') === 'yes';
    } catch (e) { return false; }
  }
  function entMapOn() { return !!(window.trackerSettings && window.trackerSettings.entranceShuffle); }

  // ── Matching ──
  function matchDoor(area, x, y, max) {
    var best = null, bd = Infinity;
    for (var n in DOORS) {
      var d = DOORS[n];
      if (d[0] !== area) continue;
      var dist = Math.abs(d[1] - x) + Math.abs(d[2] - y);
      if (dist < bd) { bd = dist; best = n; }
    }
    return bd <= max ? best : null;
  }
  function matchHole(area, x, y) {
    var world = area >= 0x40 ? 'dw' : 'lw', l = x / 40.96, t = y / 40.96, best = null, bd = Infinity;
    for (var n in HOLES) {
      var h = HOLES[n];
      if (h[0] !== world) continue;
      var dist = Math.max(Math.abs(h[1] - l), Math.abs(h[2] - t));
      if (dist < bd) { bd = dist; best = n; }
    }
    return bd <= HOLE_MAX ? best : null;
  }

  // ── What a door event does on the map ──
  var inside = null;   // { door, id } while Link is in an interior he walked into
  // The dark caves outside the dungeons (the randomizer's lamp rules): Old Man
  // Cave, Death Mountain Return Cave, Old Man House. Gone into without the
  // lamp, the door is labelled Dark and left uncleared instead of being cleared
  // as an empty connector (Chris, Oct 2026). Old Man House keeps its Mount label.
  var DARK_CAVES = { 0x06: 1, 0x07: 1, 0x2e: 1, 0x2f: 1, 0x30: 1, 0x31: 1 };
  function darkNoLamp(id) { return !!DARK_CAVES[id] && !(window.trackerItems || {}).lamp; }

  function onEnter(from, s) {
    inside = null;
    if (!from || !entMapOn()) return;
    var dest = DEST[s.entrance];
    if (!dest) return;
    var door = (dest[1] & 2) ? matchHole(from.area, from.x, from.y)
                             : matchDoor(from.area, from.x, from.y, DUNGEON_DOOR_MAX);
    if (!door) return;
    inside = { door: door, id: s.entrance };
    var dark = darkNoLamp(s.entrance);
    var code = dest[0] || (dark ? 'Dark' : '');
    if (code && window._entAutoLabel) window._entAutoLabel(door, code);
    if ((dest[1] & 1) && !dark && window.markEntranceClearedByName) window.markEntranceClearedByName(door);
    if (ITEM_CHECK[s.entrance] != null && window._entLinkItemCheck) window._entLinkItemCheck(door, ITEM_CHECK[s.entrance]);
  }
  // A start location (Link's House, Sanctuary, the Mountain) has no way in:
  // Link appears inside after a reset or save & quit. So when he walks out
  // without having been seen going in, the door he comes out of is the start's
  // door — label it from the entrance id the game still holds (Chris, Oct 2026).
  // $10E is 0 for Link's House. Only the start labels, so a cave whose entry
  // was missed (autotrack turned on mid-cave) isn't guessed at.
  var START_CODES = { Link: 1, Sanc: 1, Mount: 1 };
  function onSpawnExit(s) {
    var dest = s.entrance === 0 ? ['Link', 0] : DEST[s.entrance];
    if (!dest || !START_CODES[dest[0]]) return;
    var door = matchDoor(s.area, s.x, s.y, EXIT_DOOR_MAX);
    if (!door) return;
    if (window._entAutoLabel) window._entAutoLabel(door, dest[0]);
    if ((dest[1] & 1) && window.markEntranceClearedByName) window.markEntranceClearedByName(door);
  }

  // Each dungeon door opens into its own room, and Link walks out of a dungeon
  // from that room — so the last room before he steps outside says which of the
  // dungeon's doors he came out of, whichever door he went in by (Chris, Oct
  // 2026: walking through Desert and out another door marked nothing).
  // Rooms from the randomizer's door table (checked: DP W 0x83, HC E 0x62,
  // PoD 0x4A and TR W 0x23 all match the probe logs).
  var DUNGEON_EXIT_ROOM = {
    0x84: 'DP M', 0x83: 'DP W', 0x85: 'DP E', 0x63: 'DP', 0xc9: 'EP', 0x77: 'ToH',
    0x61: 'HC M', 0x60: 'HC W', 0x62: 'HC E', 0xe0: 'CT', 0xdb: 'TT',
    0x58: 'SW M', 0x57: 'SW E', 0x56: 'SW W', 0x59: 'SW', 0x0e: 'IP', 0x98: 'MM',
    0x4a: 'PoD', 0x28: 'SP', 0xd6: 'TR M', 0x23: 'TR W', 0x24: 'TR E', 0xd5: 'TR', 0x0c: 'GT'
  };
  var lastInRoom = null;
  function onExit(s) {
    var was = inside; inside = null;
    if (!entMapOn()) return;
    var dCode = lastInRoom != null ? DUNGEON_EXIT_ROOM[lastInRoom] : null;
    if (dCode) {
      var dOut = matchDoor(s.area, s.x, s.y, EXIT_DOOR_MAX);
      if (dOut && window._entAutoLabel) window._entAutoLabel(dOut, dCode);
      return;
    }
    if (!was) { onSpawnExit(s); return; }
    var dest = DEST[was.id];
    if (!dest || (dest[1] & 4)) return;          // dungeons: their labels already group the doors
    var out = matchDoor(s.area, s.x, s.y, EXIT_DOOR_MAX);
    if (!out || out === was.door) return;
    if (window._entAutoConnect) window._entAutoConnect(was.door, out);
    if ((dest[1] & 1) && !darkNoLamp(was.id) && window.markEntranceClearedByName) window.markEntranceClearedByName(out);
  }

  // ── Transition watcher (same rules as entranceprobe.html) ──
  // A state counts once two reads in a row agree, so a frame caught mid-load
  // is never used.
  var prev = null, lastOutside = null, pending = null;
  function watch(s) {
    if (prev && prev.mode >= 0x06 && s.mode < 0x06) { pending = null; inside = null; lastOutside = null; lastInRoom = null; }
    var ok = prev && prev.mode === s.mode && prev.indoors === s.indoors && prev.room === s.room && prev.area === s.area;
    if (s.mode === 0x09 || s.mode === 0x0B) {
      if (pending && pending.kind === 'exit' && ok) { pending = null; onExit(s); }
      if (!s.indoors && ok) lastOutside = s;
    }
    if (s.mode === 0x07 && s.indoors && ok) lastInRoom = s.room;
    if (s.mode === 0x07 && pending && pending.kind === 'enter' && ok) { var f = pending.from; pending = null; onEnter(f, s); }
    if (prev && !prev.indoors && s.indoors && s.mode >= 0x06) pending = { kind: 'enter', from: lastOutside };
    if (prev && prev.indoors && !s.indoors && s.mode >= 0x06) pending = { kind: 'exit' };
    prev = s;
  }
  function parse(a) {
    var w = function (i) { return a[i] | (a[i + 1] << 8); };
    return { mode: a[0x10], sub: a[0x11], indoors: a[0x1B], y: w(0x20), x: w(0x22),
             area: a[0x8A], room: w(0xA0), entrance: w(0x10E) };
  }

  // ── usb2snes connection: replies can arrive split over several frames ──
  var ws = null, want = 0, buf = null, timer = null;
  function poll() {
    if (!ws || ws.readyState !== 1 || want) return;
    want = 0x120; buf = new Uint8Array(0);
    ws.send(JSON.stringify({ Opcode: 'GetAddress', Space: 'SNES', Operands: ['F50000', '120'] }));
  }
  function onBinary(data) {
    if (!want) return;
    var add = new Uint8Array(data), m = new Uint8Array(buf.length + add.length);
    m.set(buf); m.set(add, buf.length); buf = m;
    if (buf.length < want) return;
    want = 0;
    try { watch(parse(buf)); } catch (e) { console.warn('[EntAutotrack]', e); }
  }
  var on = false;   // switched by the launcher at load, or live from the map's Map Style
  function connect() {
    clearInterval(timer); timer = null; want = 0;
    if (!on) return;
    var host = localStorage.getItem('alttp-ws-host') || 'localhost';
    var port = localStorage.getItem('alttp-ws-port') || '23074';
    try { ws = new WebSocket('ws://' + host + ':' + port); } catch (e) { ws = null; setTimeout(connect, 3000); return; }
    ws.binaryType = 'arraybuffer';
    var attached = false;
    ws.onopen = function () { ws.send(JSON.stringify({ Opcode: 'DeviceList', Space: 'SNES' })); };
    ws.onmessage = function (ev) {
      if (typeof ev.data !== 'string') { onBinary(ev.data); return; }
      var r; try { r = JSON.parse(ev.data); } catch (e) { return; }
      if (attached || !r.Results) return;
      if (!r.Results.length) { ws.close(); return; }
      attached = true;
      ws.send(JSON.stringify({ Opcode: 'Attach', Space: 'SNES', Operands: [r.Results[0]] }));
      ws.send(JSON.stringify({ Opcode: 'Name', Space: 'SNES', Operands: ['ALTTP Entrance Autotrack'] }));
      timer = setInterval(poll, POLL_MS);
    };
    ws.onclose = function () { ws = null; clearInterval(timer); timer = null; want = 0; prev = null; pending = null; setTimeout(connect, 3000); };
  }
  function setEnabled(v) {
    on = !!v;
    if (on && !ws) connect();
    if (!on && ws) { ws.onclose = null; try { ws.close(); } catch (e) {} ws = null; clearInterval(timer); timer = null; want = 0; prev = null; pending = null; inside = null; }
  }

  window._entAutotrack = { watch: watch, parse: parse, matchDoor: matchDoor, matchHole: matchHole, DEST: DEST,
                           setEnabled: setEnabled, isOn: function () { return on; }, allowed: allowed,
                           insideDoor: function () { return inside ? inside.door : null; } };
  setEnabled(enabled());
})();
