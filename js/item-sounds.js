// Item collect sounds, played by the Item Tracker (they used to play from the
// broadcast view, which only made noise while that view was open). Sounds and
// their volumes are set in Settings → Item Sounds (bcast-sounds.html).
// Listens to the tracker's own item snapshots and plays on each new pickup.
(function () {
  var DUNGEONS = ['ep','dp','toh','pod','sp','sw','tt','ip','mm','tr','gt'];
  var BOTTLES = ['bottle1','bottle2','bottle3','bottle4'];
  var ITEM_KEYS = ['bow','boomerang','hookshot','mushroom','powder','firerod','icerod',
                   'bombos','ether','quake','lamp','hammer','shovel','flute','net','book',
                   'bottle1','bottle2','bottle3','bottle4','somaria','byrna','cape','mirror',
                   'boots','gloves','flippers','moonpearl','sword','shield','tunic','agahnim','halfmagic'];
  var prev = null;

  function raceMode() {
    if (window._raceMode) return true;
    try { return (localStorage.getItem('alttp-race-mode') || 'no') === 'yes'; } catch (e) { return false; }
  }
  function volume(k) {
    var v = parseInt(localStorage.getItem(k + '-vol'), 10);
    return isNaN(v) ? 1 : Math.max(0, Math.min(1, v / 100));
  }
  // Profiles: 1 = unprefixed keys, 2–4 = 'pN-' prefix, 5 = "No Sounds".
  function play(key, val) {
    try {
      var p = parseInt(localStorage.getItem('alttp-sound-profile') || '1', 10);
      if (p === 5) return;
      var pre = 'alttp-item-sound-' + ((p >= 2 && p <= 4) ? 'p' + p + '-' : '');
      // A level-specific sound (e.g. sword-2) beats the base one.
      var k = (val !== undefined && localStorage.getItem(pre + key + '-' + val)) ? pre + key + '-' + val : pre + key;
      var data = localStorage.getItem(k), vol = volume(k);
      // Older setups kept Go Mode's sound in the broadcast settings.
      if (!data && key === 'gomode' && localStorage.getItem('alttp-broadcast-gomode-sound') === 'true') {
        data = localStorage.getItem('alttp-broadcast-gomode-sound-data'); vol = 1;
      }
      if (!data) return;
      var a = new Audio(data);
      a.volume = vol;
      a.play().catch(function () {});
    } catch (e) {}
  }

  // The sounds owed going from snapshot a to b (same rules the broadcast used).
  function due(a, b) {
    var out = [];
    ITEM_KEYS.forEach(function (k) {
      var was = a[k] || 0, now = b[k] || 0;
      if (!(now > was)) return;
      if ((k === 'flute' || k === 'mushroom') && was > 0) return;   // progression, not a pickup
      if (BOTTLES.indexOf(k) !== -1 && BOTTLES.some(function (o) { return o !== k && (a[o] || 0) > 0; })) return;
      out.push([k, now]);
    });
    if (b.gomode === 1 && a.gomode !== 1) out.push(['gomode']);
    DUNGEONS.forEach(function (d) {
      if (b[d + 'BigKey'] && !a[d + 'BigKey']) out.push(['bigkey']);
      if (d !== 'gt' && b[d + 'Map'] && !a[d + 'Map']) out.push(['map']);
      if (d !== 'gt' && b[d + 'Compass'] && !a[d + 'Compass']) out.push(['compass']);
    });
    return out;
  }

  function onSnap(snap) {
    var last = prev; prev = snap;
    if (!last || raceMode()) return;          // first snap is the starting state
    var list = due(last, snap);
    // A seed load or New Game lands as a big jump all at once, not pickups.
    if (list.length > 4) return;
    list.forEach(function (s) { play(s[0], s[1]); });
  }

  try {
    new BroadcastChannel('alttp-tracker').onmessage = function (e) {
      if (!e.data) return;
      if (e.data.type === 'items' && e.data.data) onSnap(e.data.data);
      else if (e.data.type === 'newgame') prev = null;
    };
  } catch (e) {}

  window._itemSounds = { due: due, onSnap: onSnap };   // for tests
})();
