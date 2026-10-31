// Y-item highlight: reads the item equipped to Y (WRAM $7E0202 = SNI address F50202)
// and hands the byte to the page. Same SNI connection as the other trackers.
(function () {
  // Settings page toggle; on unless the user turned it off.
  window.yitemEnabled = function () {
    try { return localStorage.getItem('alttp-itemtracker-yitem') !== 'false'; } catch (e) { return true; }
  };
  window.yitemWatch = function (onValue) {
    var ws = null, timer = null, waiting = false;
    function poll() {
      if (!ws || ws.readyState !== 1 || waiting) return;
      waiting = true;
      ws.send(JSON.stringify({ Opcode: 'GetAddress', Space: 'SNES', Operands: ['F50202', '1'] }));
    }
    function connect() {
      clearInterval(timer); waiting = false;
      var host = localStorage.getItem('alttp-ws-host') || 'localhost';
      var port = localStorage.getItem('alttp-ws-port') || '23074';
      try { ws = new WebSocket('ws://' + host + ':' + port); } catch (e) { setTimeout(connect, 3000); return; }
      ws.binaryType = 'arraybuffer';
      var attached = false;
      ws.onopen = function () { ws.send(JSON.stringify({ Opcode: 'DeviceList', Space: 'SNES' })); };
      ws.onmessage = function (ev) {
        if (typeof ev.data !== 'string') {
          waiting = false;
          onValue(new Uint8Array(ev.data)[0]);
          return;
        }
        var r; try { r = JSON.parse(ev.data); } catch (e) { return; }
        if (attached || !r.Results) return;
        if (!r.Results.length) { ws.close(); return; }
        attached = true;
        ws.send(JSON.stringify({ Opcode: 'Attach', Space: 'SNES', Operands: [r.Results[0]] }));
        timer = setInterval(poll, 500);
      };
      ws.onclose = function () { ws = null; clearInterval(timer); waiting = false; setTimeout(connect, 3000); };
    }
    connect();
  };
})();
