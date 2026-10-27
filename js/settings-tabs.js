// Tab bar for the Settings window: Item Tracker / Broadcast / Item Sounds.
// Each tab is its own page; switching navigates this same window.
(function () {
  var TABS = [
    ['itemtracker-settings.html', 'Item Tracker'],
    ['bcast-settings.html',       'Broadcast'],
    ['bcast-sounds.html',         'Item Sounds'],
  ];
  var here = location.pathname.split('/').pop();
  var race = false;
  try { race = (localStorage.getItem('alttp-race-mode') || 'no') === 'yes'; } catch (e) {}
  var css = '#set-tabs{position:sticky;top:0;z-index:20000;display:flex;gap:2px;padding:6px 8px 0;' +
            'background:#111;border-bottom:1px solid #333;font-family:Arial,sans-serif;}' +
            '#set-tabs a{padding:6px 12px;font-size:12px;color:#aaa;text-decoration:none;border:1px solid #333;' +
            'border-bottom:none;border-radius:4px 4px 0 0;background:#1a1a1a;}' +
            '#set-tabs a:hover{color:#fff;}' +
            '#set-tabs a.on{color:#4dff88;background:#222;border-color:#4dff88;}' +
            '#set-tabs a.off{opacity:.4;pointer-events:none;}';
  var html = '<style>' + css + '</style><nav id="set-tabs">' + TABS.map(function (t) {
    var off = race && t[0] === 'bcast-sounds.html';
    return '<a href="' + t[0] + location.search + '" class="' + (t[0] === here ? 'on' : '') + (off ? ' off' : '') + '"' +
           (off ? ' title="Disabled in Race Mode"' : '') + '>' + t[1] + '</a>';
  }).join('') + '</nav>';
  document.body.insertAdjacentHTML('afterbegin', html);
})();
