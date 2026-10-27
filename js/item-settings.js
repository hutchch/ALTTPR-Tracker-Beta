// Item Tracker settings: shared by itemtracker.html (applies them) and
// itemtracker-settings.html (the Settings window's Item Tracker tab, edits them).
// ════════════════════════════════════════════════════════════════════════════
// Settings customization — Main Background / Item Background / Dungeon
// Background. Ported from the Broadcast View's settings popup.
// ════════════════════════════════════════════════════════════════════════════
var ITEM_SETTINGS = {
  bg:            'black',     // black | grey | white | transparent | image
  bgImage:       '',          // data: URL of an uploaded background image
  fillEnabled:   false,
  fillColor:     'green',     // green | blue | purple | custom (top-right of diagonal)
  fillCustom:    '#00aa00',
  fillColor2:    'purple',    // green | blue | purple | custom (bottom-left of diagonal)
  fillCustom2:   '#b675ff',
  fillEffect:    'none',      // none | falling | starburst | pulse
  chestsColor:   'blue',      // blue | green | purple | yellow | custom
  chestsCustom:  '#5a8eff',
  completeColor: 'green',     // blue | green | purple | yellow | custom
  completeCustom:'#4dff88',
  dungeonFillEnabled: true,   // completion tints shown when true
  dungeonBoxEnabled:  true,   // dark slot container shown when true
  showBoss:           true,   // false = hide all boss circles (vanilla bosses)
  dungeonChests:      false,  // hover card's per-chest list; off by default
  defaultPrize:  'crystal',   // crystal | unknown — starting dungeon prize
  checksColor:   'white',     // white | black | grey | custom (CHECKS number)
  checksCustom:  '#ffffff',
  worldBox:      false,      // View-2: box the Light / Dark World dungeons
  lwColor:       '#e67e22',
  dwColor:       '#b39ddb'
};
var ITEM_FILL_COLORS      = { green:'#2ecc71', blue:'#3498db', purple:'#b675ff' };
var ITEM_FILL_COLORS_DARK = { green:'#176b3b', blue:'#1c5478', purple:'#5e3d99' };
var ITEM_DUNGEON_PRESETS = { blue:'#5a8eff', green:'#4dff88', purple:'#b675ff', yellow:'#ffcc44' };
var CHECKS_COLOR_PRESETS = { white:'#ffffff', black:'#000000', grey:'#888888' };

function loadItemSettings() {
  try {
    // bg reuses the launcher's key so the two stay in sync
    ITEM_SETTINGS.bg             = localStorage.getItem('alttp-tracker-bg') || 'black';
    // Follows the seed's Dungeon Item Shuffle setting. Session-only — never
    // read from or written to storage, so each launch starts fresh.
    ITEM_SETTINGS.defaultPrize   = (window.defaultPrizeSetting ? window.defaultPrizeSetting()
                                   : ITEM_SETTINGS.defaultPrize);
    ITEM_SETTINGS.bgImage        = localStorage.getItem('alttp-itemtracker-bg-image') || '';
    ITEM_SETTINGS.fillEnabled    = localStorage.getItem('alttp-itemtracker-fill-enabled') === 'true';
    ITEM_SETTINGS.fillColor      = localStorage.getItem('alttp-itemtracker-fill-color')   || ITEM_SETTINGS.fillColor;
    ITEM_SETTINGS.fillCustom     = localStorage.getItem('alttp-itemtracker-fill-custom')  || ITEM_SETTINGS.fillCustom;
    ITEM_SETTINGS.fillColor2     = localStorage.getItem('alttp-itemtracker-fill-color-2')  || ITEM_SETTINGS.fillColor2;
    ITEM_SETTINGS.fillCustom2    = localStorage.getItem('alttp-itemtracker-fill-custom-2') || ITEM_SETTINGS.fillCustom2;
    ITEM_SETTINGS.fillEffect     = localStorage.getItem('alttp-itemtracker-fill-effect')  || ITEM_SETTINGS.fillEffect;
    ITEM_SETTINGS.chestsColor    = localStorage.getItem('alttp-itemtracker-chests-color') || ITEM_SETTINGS.chestsColor;
    ITEM_SETTINGS.chestsCustom   = localStorage.getItem('alttp-itemtracker-chests-custom')|| ITEM_SETTINGS.chestsCustom;
    ITEM_SETTINGS.completeColor  = localStorage.getItem('alttp-itemtracker-complete-color') || ITEM_SETTINGS.completeColor;
    ITEM_SETTINGS.completeCustom = localStorage.getItem('alttp-itemtracker-complete-custom')|| ITEM_SETTINGS.completeCustom;
    ITEM_SETTINGS.checksColor    = localStorage.getItem('alttp-itemtracker-checks-color')  || ITEM_SETTINGS.checksColor;
    ITEM_SETTINGS.checksCustom   = localStorage.getItem('alttp-itemtracker-checks-custom') || ITEM_SETTINGS.checksCustom;
    ITEM_SETTINGS.dungeonFillEnabled = localStorage.getItem('alttp-itemtracker-dungeon-fill') !== 'false';
    ITEM_SETTINGS.dungeonBoxEnabled  = localStorage.getItem('alttp-itemtracker-dungeon-box')  !== 'false';
    ITEM_SETTINGS.dungeonChests      = localStorage.getItem('alttp-itemtracker-dungeon-chests') === 'true';
    ITEM_SETTINGS.worldBox = localStorage.getItem('alttp-itemtracker-world-box') === 'true';
    ITEM_SETTINGS.lwColor  = localStorage.getItem('alttp-itemtracker-lw-color') || ITEM_SETTINGS.lwColor;
    ITEM_SETTINGS.dwColor  = localStorage.getItem('alttp-itemtracker-dw-color') || ITEM_SETTINGS.dwColor;
    // Show Boss: on unless the user turned it off here. It is deliberately NOT
    // tied to the bossshuffle URL param any more — with boss shuffle off the
    // circles still show the vanilla bosses, which is worth seeing, and the
    // launcher passing bossshuffle=no was switching this off on every launch.
    // One-time repair: a build that briefly defaulted this off wrote 'false'
    // into the key, so the old value is discarded once.
    // (v3: the same stale 'false' turned up again on profiles that had already
    // been through the v2 repair, so it is discarded once more.)
    if (localStorage.getItem('alttp-itemtracker-show-boss-v3') !== '1') {
      localStorage.removeItem('alttp-itemtracker-show-boss');
      localStorage.setItem('alttp-itemtracker-show-boss-v3', '1');
    }
    var _stored = localStorage.getItem('alttp-itemtracker-show-boss');
    if (_stored !== null) ITEM_SETTINGS.showBoss = _stored !== 'false';
  } catch (e) {}
  // URL bg (from the launcher / a transparent-toggle recreate) wins
  var urlBg = new URLSearchParams(window.location.search).get('bg');
  if (urlBg) ITEM_SETTINGS.bg = urlBg;
  if (ITEM_SETTINGS.bg === 'image' && !ITEM_SETTINGS.bgImage) ITEM_SETTINGS.bg = 'black';
}

function saveItemSettings() {
  try {
    localStorage.setItem('alttp-tracker-bg', ITEM_SETTINGS.bg);
    localStorage.setItem('alttp-itemtracker-fill-enabled',   ITEM_SETTINGS.fillEnabled ? 'true' : 'false');
    localStorage.setItem('alttp-itemtracker-fill-color',     ITEM_SETTINGS.fillColor);
    localStorage.setItem('alttp-itemtracker-fill-custom',    ITEM_SETTINGS.fillCustom);
    localStorage.setItem('alttp-itemtracker-fill-color-2',   ITEM_SETTINGS.fillColor2);
    localStorage.setItem('alttp-itemtracker-fill-custom-2',  ITEM_SETTINGS.fillCustom2);
    localStorage.setItem('alttp-itemtracker-fill-effect',    ITEM_SETTINGS.fillEffect);
    localStorage.setItem('alttp-itemtracker-chests-color',   ITEM_SETTINGS.chestsColor);
    localStorage.setItem('alttp-itemtracker-chests-custom',  ITEM_SETTINGS.chestsCustom);
    localStorage.setItem('alttp-itemtracker-complete-color', ITEM_SETTINGS.completeColor);
    localStorage.setItem('alttp-itemtracker-complete-custom',ITEM_SETTINGS.completeCustom);
    localStorage.setItem('alttp-itemtracker-checks-color',   ITEM_SETTINGS.checksColor);
    localStorage.setItem('alttp-itemtracker-checks-custom',  ITEM_SETTINGS.checksCustom);
    localStorage.setItem('alttp-itemtracker-dungeon-fill',   ITEM_SETTINGS.dungeonFillEnabled ? 'true' : 'false');
    localStorage.setItem('alttp-itemtracker-dungeon-box',    ITEM_SETTINGS.dungeonBoxEnabled  ? 'true' : 'false');
    localStorage.setItem('alttp-itemtracker-show-boss',      ITEM_SETTINGS.showBoss            ? 'true' : 'false');
    localStorage.setItem('alttp-itemtracker-dungeon-chests', ITEM_SETTINGS.dungeonChests     ? 'true' : 'false');
    localStorage.setItem('alttp-itemtracker-world-box', ITEM_SETTINGS.worldBox ? 'true' : 'false');
    localStorage.setItem('alttp-itemtracker-lw-color',  ITEM_SETTINGS.lwColor);
    localStorage.setItem('alttp-itemtracker-dw-color',  ITEM_SETTINGS.dwColor);
  } catch (e) {}
  if (window._itsChanged) window._itsChanged();   // Settings window: tell the tracker
}

// Show / hide every boss circle. Driven by html.no-boss-shuffle, same class
// the launcher's "Boss Shuffle = No" early IIFE sets, so both paths share CSS.
function applyShowBoss() {
  // hide-boss, NOT no-boss-shuffle: that class belongs to the boss-shuffle
  // setting and only locks the circles (pointer-events: none), so toggling it
  // here left the circles on screen and the checkbox looked dead.
  document.documentElement.classList.toggle('hide-boss', !ITEM_SETTINGS.showBoss);
}

// View-2's Light / Dark World dungeon boxes (js/mobile.js draws them).
function applyWorldBox() {
  var r = document.documentElement;
  r.classList.toggle('world-box-on', !!ITEM_SETTINGS.worldBox);
  r.style.setProperty('--stk-lw', ITEM_SETTINGS.lwColor);
  r.style.setProperty('--stk-dw', ITEM_SETTINGS.dwColor);
}

function saveItemBgImage(dataUrl) {
  ITEM_SETTINGS.bgImage = dataUrl || '';
  try {
    if (dataUrl) localStorage.setItem('alttp-itemtracker-bg-image', dataUrl);
    else         localStorage.removeItem('alttp-itemtracker-bg-image');
    if (window._itsChanged) window._itsChanged();
    return true;
  } catch (e) {
    alert('Could not store background image — it may be too large. Try a smaller file.');
    ITEM_SETTINGS.bgImage = '';
    return false;
  }
}

function applyItemFillVariable() {
  var c = ITEM_SETTINGS.fillColor === 'custom'
    ? ITEM_SETTINGS.fillCustom
    : (ITEM_FILL_COLORS[ITEM_SETTINGS.fillColor] || ITEM_FILL_COLORS.green);
  var c2 = ITEM_SETTINGS.fillColor2 === 'custom'
    ? ITEM_SETTINGS.fillCustom2
    : (ITEM_FILL_COLORS_DARK[ITEM_SETTINGS.fillColor2] || ITEM_FILL_COLORS_DARK.purple);
  document.documentElement.style.setProperty('--item-fill-color', c);
  document.documentElement.style.setProperty('--item-fill-color2', c2);
}

function applyChecksColor() {
  var col = ITEM_SETTINGS.checksColor === 'custom'
    ? ITEM_SETTINGS.checksCustom
    : (CHECKS_COLOR_PRESETS[ITEM_SETTINGS.checksColor] || CHECKS_COLOR_PRESETS.white);
  document.documentElement.style.setProperty('--check-num-color', col);
}

function applyItemDungeonColors() {
  var chests = ITEM_SETTINGS.chestsColor === 'custom'
    ? ITEM_SETTINGS.chestsCustom
    : (ITEM_DUNGEON_PRESETS[ITEM_SETTINGS.chestsColor] || ITEM_DUNGEON_PRESETS.blue);
  var complete = ITEM_SETTINGS.completeColor === 'custom'
    ? ITEM_SETTINGS.completeCustom
    : (ITEM_DUNGEON_PRESETS[ITEM_SETTINGS.completeColor] || ITEM_DUNGEON_PRESETS.green);
  document.documentElement.style.setProperty('--chests-color',   chests);
  document.documentElement.style.setProperty('--complete-color', complete);
}

// Completion tints only apply while <html> carries .dfill-on.
function applyItemDungeonFill() {
  document.documentElement.classList.toggle('dfill-on', !!ITEM_SETTINGS.dungeonFillEnabled);
}

// Toggle the default dark container on every dungeon slot.
function applyItemDungeonBox() {
  document.querySelectorAll('.dungeon-slot').forEach(function(slot) {
    slot.classList.toggle('no-box', !ITEM_SETTINGS.dungeonBoxEnabled);
  });
}

function applyItemBg(bg) {
  // "image" with nothing stored — prompt for a file instead of switching.
  if (bg === 'image' && !ITEM_SETTINGS.bgImage) {
    var picker = document.getElementById('item-bg-image-file');
    if (picker) picker.click();
    document.querySelectorAll('input[name="its-bg"]').forEach(function(r){ r.checked = (r.value === ITEM_SETTINGS.bg); });
    return;
  }
  ITEM_SETTINGS.bg = bg;
  saveItemSettings();
  if (window.IS_ITEM_SETTINGS_PAGE) return;   // the tracker applies it when pinged
  if (bg === 'black') document.documentElement.removeAttribute('data-bg');
  else                document.documentElement.setAttribute('data-bg', bg);
  if (bg === 'image') {
    document.documentElement.style.setProperty('--bg-image', ITEM_SETTINGS.bgImage ? 'url("' + ITEM_SETTINGS.bgImage + '")' : 'none');
  }
  // Transparent <-> opaque needs a window recreate (Electron limitation) —
  // main.js handles that in the set-itemtracker-bg IPC handler.
  if (window.electronAPI && window.electronAPI.setItemTrackerBg) window.electronAPI.setItemTrackerBg(bg);
}

function updateItemBgImageStatus() {
  var lbl = document.getElementById('item-bg-image-status');
  if (lbl) lbl.textContent = ITEM_SETTINGS.bgImage ? 'Image loaded' : 'No image';
}

// Add/remove .filled (+ the chosen effect class) on one slot. Only acts on a
// ── Settings form (Item Tracker tab of the Settings window) ──────────────────
function fillItemSettingsForm() {
  document.querySelectorAll('input[name="its-bg"]').forEach(function(r){ r.checked = (r.value === ITEM_SETTINGS.bg); });
  document.getElementById('item-opt-fill-enabled').checked = ITEM_SETTINGS.fillEnabled;
  document.querySelectorAll('input[name="its-fill-color"]').forEach(function(r){ r.checked = (r.value === ITEM_SETTINGS.fillColor); });
  document.querySelectorAll('input[name="its-fill-color-2"]').forEach(function(r){ r.checked = (r.value === ITEM_SETTINGS.fillColor2); });
  document.querySelectorAll('input[name="its-fill-effect"]').forEach(function(r){ r.checked = (r.value === ITEM_SETTINGS.fillEffect); });
  document.getElementById('item-opt-fill-custom').value = ITEM_SETTINGS.fillCustom;
  document.getElementById('item-opt-fill-custom-2').value = ITEM_SETTINGS.fillCustom2;
  document.querySelectorAll('input[name="its-chests-color"]').forEach(function(r){ r.checked = (r.value === ITEM_SETTINGS.chestsColor); });
  document.getElementById('item-opt-chests-custom').value = ITEM_SETTINGS.chestsCustom;
  document.querySelectorAll('input[name="its-complete-color"]').forEach(function(r){ r.checked = (r.value === ITEM_SETTINGS.completeColor); });
  document.getElementById('item-opt-complete-custom').value = ITEM_SETTINGS.completeCustom;
  var _dpNow = (window.defaultPrizeSetting ? window.defaultPrizeSetting() : ITEM_SETTINGS.defaultPrize);
  ITEM_SETTINGS.defaultPrize = _dpNow;
  document.querySelectorAll('input[name="its-default-prize"]').forEach(function(r){ r.checked = (r.value === _dpNow); });
  document.querySelectorAll('input[name="its-checks-color"]').forEach(function(r){ r.checked = (r.value === ITEM_SETTINGS.checksColor); });
  document.getElementById('item-opt-checks-custom').value = ITEM_SETTINGS.checksCustom;
  document.getElementById('item-opt-dungeon-fill').checked = ITEM_SETTINGS.dungeonFillEnabled;
  document.getElementById('item-opt-dungeon-box').checked  = ITEM_SETTINGS.dungeonBoxEnabled;
  document.getElementById('item-opt-show-boss').checked    = ITEM_SETTINGS.showBoss;
  document.getElementById('item-opt-dungeon-chests').checked = ITEM_SETTINGS.dungeonChests;
  document.getElementById('item-opt-world-box').checked = ITEM_SETTINGS.worldBox;
  document.getElementById('item-opt-lw-color').value = ITEM_SETTINGS.lwColor;
  document.getElementById('item-opt-dw-color').value = ITEM_SETTINGS.dwColor;
  document.getElementById('item-world-box-sub').classList.toggle('disabled', !ITEM_SETTINGS.worldBox);
  syncItemFillSub();
  updateItemBgImageStatus();
}
function syncItemFillSub() {
  var sub = document.getElementById('item-fill-sub');
  if (!sub) return;
  if (ITEM_SETTINGS.fillEnabled) sub.classList.remove('disabled');
  else                          sub.classList.add('disabled');
}

function wireItemSettingsHandlers() {
  document.querySelectorAll('input[name="its-bg"]').forEach(function(r) {
    r.addEventListener('change', function() { if (r.checked) applyItemBg(r.value); });
  });
  document.getElementById('item-opt-fill-enabled').addEventListener('change', function(e) {
    ITEM_SETTINGS.fillEnabled = e.target.checked;
    saveItemSettings(); syncItemFillSub(); refreshItemFills();
  });
  document.querySelectorAll('input[name="its-fill-color"]').forEach(function(r) {
    r.addEventListener('change', function() {
      if (!r.checked) return;
      ITEM_SETTINGS.fillColor = r.value;
      saveItemSettings(); applyItemFillVariable();
    });
  });
  document.getElementById('item-opt-fill-custom').addEventListener('input', function(e) {
    ITEM_SETTINGS.fillCustom = e.target.value;
    if (ITEM_SETTINGS.fillColor === 'custom') applyItemFillVariable();
    saveItemSettings();
  });
  document.querySelectorAll('input[name="its-fill-color-2"]').forEach(function(r) {
    r.addEventListener('change', function() {
      if (!r.checked) return;
      ITEM_SETTINGS.fillColor2 = r.value;
      saveItemSettings(); applyItemFillVariable();
    });
  });
  document.getElementById('item-opt-fill-custom-2').addEventListener('input', function(e) {
    ITEM_SETTINGS.fillCustom2 = e.target.value;
    if (ITEM_SETTINGS.fillColor2 === 'custom') applyItemFillVariable();
    saveItemSettings();
  });
  document.querySelectorAll('input[name="its-fill-effect"]').forEach(function(r) {
    r.addEventListener('change', function() {
      if (!r.checked) return;
      ITEM_SETTINGS.fillEffect = r.value;
      saveItemSettings();
    });
  });
  document.querySelectorAll('input[name="its-chests-color"]').forEach(function(r) {
    r.addEventListener('change', function() {
      if (!r.checked) return;
      ITEM_SETTINGS.chestsColor = r.value;
      saveItemSettings(); applyItemDungeonColors();
    });
  });
  document.getElementById('item-opt-chests-custom').addEventListener('input', function(e) {
    ITEM_SETTINGS.chestsCustom = e.target.value;
    if (ITEM_SETTINGS.chestsColor === 'custom') applyItemDungeonColors();
    saveItemSettings();
  });
  document.querySelectorAll('input[name="its-default-prize"]').forEach(function(r) {
    r.addEventListener('change', function() {
      if (!r.checked) return;
      ITEM_SETTINGS.defaultPrize = r.value;
      // Session-only, on purpose: the next launch goes back to the default for
      // the seed's dungeon item shuffle setting.
      window._prizeOverride = r.value;
      saveItemSettings();
      if (window.applyDefaultPrizeToAll) window.applyDefaultPrizeToAll();
    });
  });
  document.querySelectorAll('input[name="its-complete-color"]').forEach(function(r) {
    r.addEventListener('change', function() {
      if (!r.checked) return;
      ITEM_SETTINGS.completeColor = r.value;
      saveItemSettings(); applyItemDungeonColors();
    });
  });
  document.getElementById('item-opt-complete-custom').addEventListener('input', function(e) {
    ITEM_SETTINGS.completeCustom = e.target.value;
    if (ITEM_SETTINGS.completeColor === 'custom') applyItemDungeonColors();
    saveItemSettings();
  });
  document.querySelectorAll('input[name="its-checks-color"]').forEach(function(r) {
    r.addEventListener('change', function() {
      if (!r.checked) return;
      ITEM_SETTINGS.checksColor = r.value;
      saveItemSettings(); applyChecksColor();
    });
  });
  document.getElementById('item-opt-checks-custom').addEventListener('input', function(e) {
    ITEM_SETTINGS.checksCustom = e.target.value;
    if (ITEM_SETTINGS.checksColor === 'custom') applyChecksColor();
    saveItemSettings();
  });
  document.getElementById('item-opt-dungeon-fill').addEventListener('change', function(e) {
    ITEM_SETTINGS.dungeonFillEnabled = e.target.checked;
    saveItemSettings(); applyItemDungeonFill();
  });
  document.getElementById('item-opt-dungeon-box').addEventListener('change', function(e) {
    ITEM_SETTINGS.dungeonBoxEnabled = e.target.checked;
    saveItemSettings(); applyItemDungeonBox();
  });
  document.getElementById('item-opt-world-box').addEventListener('change', function(e) {
    ITEM_SETTINGS.worldBox = e.target.checked;
    document.getElementById('item-world-box-sub').classList.toggle('disabled', !ITEM_SETTINGS.worldBox);
    saveItemSettings(); applyWorldBox();
  });
  ['lw', 'dw'].forEach(function (w) {
    document.getElementById('item-opt-' + w + '-color').addEventListener('input', function(e) {
      ITEM_SETTINGS[w + 'Color'] = e.target.value;
      saveItemSettings(); applyWorldBox();
    });
  });
  document.getElementById('item-opt-show-boss').addEventListener('change', function(e) {
    ITEM_SETTINGS.showBoss = e.target.checked;
    saveItemSettings(); applyShowBoss();
  });
  document.getElementById('item-opt-dungeon-chests').addEventListener('change', function(e) {
    ITEM_SETTINGS.dungeonChests = e.target.checked;
    saveItemSettings();
    // Turning it off takes the card away immediately, rather than leaving a
    // stale one on screen until the pointer moves.
    if (!ITEM_SETTINGS.dungeonChests) {
      window._dngHoverSlot = null;
      if (window.hideDungeonPanel) window.hideDungeonPanel();
    } else if (window.refreshDungeonPanel) {
      window.refreshDungeonPanel();
    }
  });

  // Background image picker
  var fileInput = document.getElementById('item-bg-image-file');
  if (fileInput) {
    fileInput.addEventListener('change', function(e) {
      var file = e.target.files && e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function() {
        if (!saveItemBgImage(reader.result)) return;
        updateItemBgImageStatus();
        applyItemBg('image');
        document.querySelectorAll('input[name="its-bg"]').forEach(function(r){ r.checked = (r.value === 'image'); });
      };
      reader.onerror = function() { alert('Could not read that file.'); };
      reader.readAsDataURL(file);
      fileInput.value = '';
    });
  }
  var clearBtn = document.getElementById('item-bg-image-clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      saveItemBgImage('');
      updateItemBgImageStatus();
      document.documentElement.style.removeProperty('--bg-image');
      if (ITEM_SETTINGS.bg === 'image') {
        applyItemBg('black');
        document.querySelectorAll('input[name="its-bg"]').forEach(function(r){ r.checked = (r.value === 'black'); });
      }
    });
  }
}
