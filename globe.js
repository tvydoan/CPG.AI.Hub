/* ══════════════════════════════════════════════════════════════
   HERO 3D GLOBE — decorative wireframe sphere with a travelling
   red → gold arc, built with Three.js. Purely cosmetic (aria-hidden),
   sits behind the hero copy on desktop only.
   ══════════════════════════════════════════════════════════════ */
(function () {
  function initHeroGlobe() {
    var container = document.getElementById('heroGlobeDecor');
    if (!container) return;

    // Bail out quietly if Three.js failed to load (e.g. offline / CDN
    // blocked) or the browser has no WebGL — the hero still looks fine
    // without it, this is a pure decoration.
    if (typeof THREE === 'undefined') return;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var width = container.clientWidth || 600;
    var height = container.clientHeight || 600;
    if (width < 10 || height < 10) return;

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch (e) {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 5.4);

    // ── Brand colours ──
    var RED = 0xff3b3b;
    var GOLD = 0xf4a900;

    // ── Wireframe globe (two layered spheres for a bit of depth) ──
    var globeGroup = new THREE.Group();

    var sphereGeo1 = new THREE.SphereGeometry(1.7, 22, 15);
    var sphereMat1 = new THREE.MeshBasicMaterial({
      color: RED, wireframe: true, transparent: true, opacity: 0.16
    });
    var sphere1 = new THREE.Mesh(sphereGeo1, sphereMat1);
    globeGroup.add(sphere1);

    var sphereGeo2 = new THREE.SphereGeometry(1.73, 14, 9);
    var sphereMat2 = new THREE.MeshBasicMaterial({
      color: GOLD, wireframe: true, transparent: true, opacity: 0.10
    });
    var sphere2 = new THREE.Mesh(sphereGeo2, sphereMat2);
    globeGroup.add(sphere2);

    scene.add(globeGroup);

    // ── Small glowing dots at a handful of grid intersections,
    //    echoing the accent dots in the reference design ──
    var dotPositions = [];
    var dotLat = [-0.6, -0.15, 0.25, 0.55];
    var dotLon = [0.3, 1.1, 2.0, 2.8, 3.7, 4.6, 5.4];
    dotLat.forEach(function (lat) {
      dotLon.forEach(function (lon, i) {
        if ((i + Math.round(lat * 10)) % 2 !== 0) return; // sparse, not every crossing
        var r = 1.72;
        var y = r * Math.sin(lat);
        var rr = r * Math.cos(lat);
        var x = rr * Math.cos(lon);
        var z = rr * Math.sin(lon);
        dotPositions.push(x, y, z);
      });
    });
    var dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    var dotMat = new THREE.PointsMaterial({
      color: RED, size: 0.045, transparent: true, opacity: 0.55, sizeAttenuation: true
    });
    var dots = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(dots);

    // ── Travelling gradient arc: a partial torus banding the globe,
    //    coloured red → gold along its length via vertex colours, and
    //    continuously rotated for the "flow" motion. ──
    var radialSegments = 8;
    var tubularSegments = 120;
    var arcAngle = Math.PI * 1.35;
    var arcGeo = new THREE.TorusGeometry(1.9, 0.017, radialSegments, tubularSegments, arcAngle);
    var posAttr = arcGeo.attributes.position;
    var colorArr = new Float32Array(posAttr.count * 3);
    var cRed = new THREE.Color(RED);
    var cGold = new THREE.Color(GOLD);
    var tmpColor = new THREE.Color();
    for (var idx = 0; idx < posAttr.count; idx++) {
      var ringIndex = Math.floor(idx / (radialSegments + 1));
      var t = ringIndex / tubularSegments;
      tmpColor.copy(cRed).lerp(cGold, t);
      colorArr[idx * 3] = tmpColor.r;
      colorArr[idx * 3 + 1] = tmpColor.g;
      colorArr[idx * 3 + 2] = tmpColor.b;
    }
    arcGeo.setAttribute('color', new THREE.BufferAttribute(colorArr, 3));
    var arcMat = new THREE.MeshBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.85
    });
    var arcMesh = new THREE.Mesh(arcGeo, arcMat);
    arcMesh.rotation.x = Math.PI / 2.5;
    arcMesh.rotation.y = Math.PI / 7;
    scene.add(arcMesh);

    globeGroup.rotation.x = 0.15;
    globeGroup.rotation.y = -0.4;

    // ── Resize handling ──
    function resize() {
      var w = container.clientWidth;
      var h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', resize, { passive: true });
    if ('ResizeObserver' in window) {
      new ResizeObserver(resize).observe(container);
    }

    // ── Animation loop ──
    var clock = new THREE.Clock();
    function tick() {
      var dt = clock.getDelta();
      globeGroup.rotation.y += dt * 0.09;
      arcMesh.rotation.z += dt * 0.28;
      dots.rotation.y = globeGroup.rotation.y * 0.4;
      renderer.render(scene, camera);
      if (!reduceMotion) requestAnimationFrame(tick);
    }

    if (reduceMotion) {
      renderer.render(scene, camera);
    } else {
      requestAnimationFrame(tick);
    }

    // Pause rendering when the hero is scrolled far out of view to save
    // battery/CPU on long sessions.
    if ('IntersectionObserver' in window) {
      var running = true;
      var io = new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;
        if (visible && !running && !reduceMotion) {
          running = true;
          requestAnimationFrame(tick);
        }
        running = visible;
      }, { threshold: 0 });
      io.observe(container);
      var originalTick = tick;
      tick = function () {
        if (!running) return;
        originalTick();
      };
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroGlobe);
  } else {
    initHeroGlobe();
  }
})();
