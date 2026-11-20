/* CHATAX — interactions */
(function () {
  "use strict";

  /* ------------------------------------------------------------
     CONFIG FORMULAIRE
     Laisser vide => le formulaire ouvre l'app mail du visiteur
     avec la demande pré-remplie (fonctionne sans serveur).
     Pour recevoir les messages directement : créer un formulaire
     gratuit sur https://formspree.io et coller son URL ici, ex :
     const FORM_ENDPOINT = "https://formspree.io/f/abcdwxyz";
     ------------------------------------------------------------ */
  const FORM_ENDPOINT = "https://formspree.io/f/xppdjzyp";
  const CONTACT_EMAIL = "chatax.off@gmail.com";

  const PROJECTS = window.CHATAX_PROJECTS || [];
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const pad = (n) => String(n).padStart(3, "0");
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- Images : placeholder propre si une image manque ---------- */
  const wire = (root = document) => {
    $$(".media img:not([data-w])", root).forEach((img) => {
      img.dataset.w = "1";
      const mark = () => img.closest(".media").classList.add("is-broken");
      if (img.complete && img.naturalWidth === 0 && img.getAttribute("loading") !== "lazy") mark();
      img.addEventListener("error", mark, { once: true });
    });
  };
  wire();

  /* ---------- Nav ---------- */
  const nav = $("#nav"), burger = $("#burger"), fab = $("#fab"), contact = $("#contact");
  const lockScroll = () => { document.body.style.overflow = (nav.classList.contains("is-open") || !albumEl.hidden || !lb.hidden) ? "hidden" : ""; };
  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    lockScroll();
  };
  burger.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  $$("#menu a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

  let contactVisible = false;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 40);
    fab.classList.toggle("is-visible", y > window.innerHeight * 0.8 && !contactVisible);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([en]) => { contactVisible = en.isIntersecting; onScroll(); }).observe(contact);
  }

  /* ---------- Reveal au scroll ---------- */
  const reveals = $$(".reveal");
  reveals.forEach((el) => {
    const sibs = Array.from(el.parentElement.children).filter((c) => c.classList.contains("reveal"));
    const i = sibs.indexOf(el);
    if (i > 0) el.style.setProperty("--d", Math.min(i * 0.08, 0.4) + "s");
  });
  requestAnimationFrame(() => $$(".hero .reveal").forEach((el) => el.classList.add("is-in")));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  /* =========================================================
     PORTFOLIO — cartes de projets, en deux sections
     ========================================================= */
  const TYPES = [
    { id: "photos", label: "Photos", one: "photo", many: "photos" },
    { id: "visuels", label: "Visuels", one: "visuel", many: "visuels" },
    { id: "videos", label: "Vidéos", one: "vidéo", many: "vidéos" },
  ];
  const plural = (t, n) => `${n} ${n > 1 ? t.many : t.one}`;
  const base = (p) => `assets/projets/${p.key}`;
  // version des couvertures : à augmenter dans projets.js après avoir remplacé une cover.jpg
  const CV = "?v=" + (window.CHATAX_COVERS_VERSION || 1);
  const hasParts = (p) => !!(p.parts && p.parts.length);
  const groupsOf = (p) => hasParts(p)
    ? p.parts.map((g) => ({ ...g, dir: `${base(p)}/${g.key}` }))
    : [{ ...p, key: null, title: null, dir: base(p) }];
  const count = (g, t) => g[t.id] || 0;
  const total = (p, t) => groupsOf(p).reduce((s, g) => s + count(g, t), 0);
  const typesOf = (p) => TYPES.filter((t) => total(p, t) > 0);
  const typesOfGroup = (g) => TYPES.filter((t) => count(g, t) > 0);
  // un projet sans contenu (dossier prêt mais fichiers pas encore ajoutés) n'est pas affiché
  const VISIBLE = PROJECTS.filter((p) => typesOf(p).length > 0);

  // chiffres du hero calculés à partir des projets
  $$("[data-stat]").forEach((el) => {
    const t = TYPES.find((x) => x.id === el.dataset.stat);
    if (t) el.textContent = VISIBLE.reduce((s, p) => s + total(p, t), 0);
  });

  const badges = (p) => {
    const parts = hasParts(p) ? `<span class="badge badge--parts">${p.parts.filter((g) => typesOfGroup(g).length).length} ${esc(p.partsLabel || "dossiers")}</span>` : "";
    return parts + typesOf(p).map((t) => `<span class="badge badge--${t.id}">${plural(t, total(p, t))}</span>`).join("");
  };
  const card = (opts, i) => `<button class="pcard" style="--i:${i}" ${opts.attrs}>
      <span class="pcard__media media"><img src="${opts.cover}" alt="" loading="lazy"></span>
      <span class="pcard__body">
        <span class="pcard__kind">${esc(opts.kind || "")}</span>
        <span class="pcard__title">${esc(opts.title)}</span>
        <span class="pcard__badges">${opts.badges}</span>
      </span>
      <span class="pcard__arrow" aria-hidden="true">→</span>
    </button>`;

  /* Cartes « à révéler » (projets, bande de photos, vidéos) : image seule ; au survol (ordinateur)
     ou au premier toucher (mobile), l'image s'assombrit et se floute, le titre et la description
     apparaissent. Deuxième toucher = ouverture. */
  const revealCard = (c, i) => `<button class="rcard ${c.cls || ""}" style="--i:${i}" ${c.attrs || ""} aria-label="${esc(c.title)} : ${esc(c.desc || c.kind || "")}">
      <span class="rcard__media media"><img src="${c.src}" alt="" loading="lazy"></span>
      <span class="rcard__shade" aria-hidden="true"></span>
      ${c.play ? '<span class="play rcard__play" aria-hidden="true"></span>' : ""}
      <span class="rcard__info" aria-hidden="true">
        <span class="rcard__kind">${esc(c.kind || "")}</span>
        <span class="rcard__title">${esc(c.title)}</span>
        <span class="rcard__desc">${esc(c.desc || "")}</span>
        <span class="rcard__cta">${esc(c.cta || "Voir le projet")} <span>→</span></span>
      </span>
    </button>`;
  const noHover = window.matchMedia("(hover: none)");
  const closeCards = (except) => $$(".rcard.is-on").forEach((x) => { if (x !== except) x.classList.toggle("is-on", false); });
  const bindReveal = (root, action) => $$(".rcard", root).forEach((c) => c.addEventListener("click", () => {
    if (noHover.matches && !c.classList.contains("is-on")) {
      closeCards(c);
      c.classList.add("is-on");
      return;
    }
    action(c);
  }));
  // toucher ailleurs referme la carte ouverte
  document.addEventListener("click", (e) => { if (!e.target.closest(".rcard")) closeCards(null); });

  /* Portfolio : Événements / Projets au long cours */
  $$(".projects[data-category]").forEach((grid) => {
    const list = VISIBLE.filter((p) => (p.category || "long") === grid.dataset.category);
    grid.innerHTML = list.map((p, i) => revealCard({
      attrs: `data-key="${p.key}"`, src: `${base(p)}/cover.jpg${CV}`, kind: p.kind, title: p.title, desc: p.desc,
    }, i)).join("");
    wire(grid);
    bindReveal(grid, (c) => openProject(c.dataset.key));
    if (!list.length) grid.closest(".pgroup").hidden = true;
  });

  /* Bande de photos défilante (section Photo) : un reportage par carte */
  const strip = $("#strip");
  if (strip) {
    const items = [];
    VISIBLE.filter((p) => total(p, TYPES[0]) > 0).forEach((p) => {
      if (p.folders && hasParts(p)) {
        groupsOf(p).filter((g) => count(g, TYPES[0]) > 0).forEach((g) => items.push({
          key: p.key, part: g.key, src: `${g.dir}/cover.jpg${CV}`, kind: g.kind || p.kind, title: g.title,
          desc: `${plural(TYPES[0], count(g, TYPES[0]))} · ${p.short || p.title}`,
        }));
      } else {
        items.push({ key: p.key, part: "", src: `${base(p)}/${p.photoCover || "cover.jpg"}${CV}`, kind: p.kind, title: p.title,
          desc: `${plural(TYPES[0], total(p, TYPES[0]))}${p.desc ? " · " + p.desc : ""}` });
      }
    });
    strip.innerHTML = items.map((it, i) => revealCard({
      cls: "rcard--strip", attrs: `data-key="${it.key}" data-part="${it.part}"`,
      src: it.src, kind: it.kind, title: it.title, desc: it.desc, cta: "Voir les photos",
    }, i)).join("");
    wire(strip);
    bindReveal(strip, (c) => {
      openProject(c.dataset.key);
      if (c.dataset.part) openProject(c.dataset.key, c.dataset.part);
    });
    const step = () => ($(".rcard", strip) || { offsetWidth: 300 }).offsetWidth + 16;
    $("#strip-prev").addEventListener("click", () => strip.scrollBy({ left: -step() * 2, behavior: "smooth" }));
    $("#strip-next").addEventListener("click", () => strip.scrollBy({ left: step() * 2, behavior: "smooth" }));
  }

  /* Vidéos (section Vidéo) : une vidéo par projet, lue dans la visionneuse */
  const REELS = [];
  const reelsEl = $("#reels");
  if (reelsEl) {
    VISIBLE.filter((p) => total(p, TYPES[2]) > 0 && !hasParts(p)).forEach((p) => {
      const pick = (p.covers && p.covers.videos) ? p.covers.videos.replace(/^videos\/|-poster\.jpg$/g, "") : "001";
      const dir = `${base(p)}/videos`;
      REELS.push({ kind: "video", src: `${dir}/${pick}.mp4`, poster: `${dir}/${pick}-poster.jpg`, cap: p.title,
        card: { kind: `Vidéo · ${p.kind || ""}`, title: p.title, desc: p.desc, key: p.key } });
    });
    reelsEl.innerHTML = REELS.map((r, i) => revealCard({
      cls: "rcard--reel", attrs: `data-i="${i}"`, src: r.poster, kind: r.card.kind, title: r.card.title,
      desc: r.card.desc, cta: "Lire la vidéo", play: true,
    }, i)).join("");
    reelsEl.style.setProperty("--n", REELS.length);
    wire(reelsEl);
    bindReveal(reelsEl, (c) => openLightbox("reels", Number(c.dataset.i)));
  }

  /* =========================================================
     PROJET OUVERT
     - projet à dossiers (LMTT) : grille des dossiers, puis un dossier
     - projet avec texte : présentation + illustrations + « Voir tout »
     - sinon : galerie directe
     ========================================================= */
  const albumEl = $("#album"), sectionsEl = $("#album-sections"), jump = $("#album-jump");
  let openState = null; // { project, part }
  let lastFocus = null;

  const itemsFor = (label, g, t) => Array.from({ length: count(g, t) }, (_, i) => {
    const n = pad(i + 1), dir = `${g.dir}/${t.id}`;
    const cap = `${label} · ${t.label}`;
    return t.id === "videos"
      ? { kind: "video", cap, src: `${dir}/${n}.mp4`, poster: `${dir}/${n}-poster.jpg` }
      : { kind: "image", cap, src: `${dir}/${n}.jpg`, alt: `${label} — ${t.one} ${i + 1}` };
  });

  const tilesHTML = (list, set, startIdx) => list.map((it, j) => {
    const idx = startIdx + j, d = Math.min(j, 20);
    return it.kind === "video"
      ? `<button class="tile tile--video media" style="--i:${d}" data-set="${set}" data-i="${idx}" aria-label="Lire la vidéo ${j + 1}"><img src="${it.poster}" alt="" loading="lazy"><span class="play" aria-hidden="true"></span></button>`
      : `<button class="tile media" style="--i:${d}" data-set="${set}" data-i="${idx}" aria-label="Agrandir : ${esc(it.alt)}"><img src="${it.src}" alt="${esc(it.alt)}" loading="lazy" decoding="async"></button>`;
  }).join("");

  // galerie d'un groupe (projet simple ou dossier) : un bloc par type de contenu
  const galleryHTML = (label, g, sets, withIds) => {
    const gts = typesOfGroup(g), items = [];
    const html = gts.map((t) => {
      const list = itemsFor(label, g, t);
      const start = items.length;
      items.push(...list);
      const head = gts.length > 1 ? `<h3 class="psec__title">${t.label} <span>${list.length}</span></h3>` : "";
      const id = withIds ? ` id="sec-${t.id}"` : "";
      return `<div class="psec__block"${id}>${head}<div class="masonry${t.id === "videos" ? " is-videos" : ""}">${tilesHTML(list, "gallery", start)}</div></div>`;
    }).join("");
    sets.gallery = items;
    return { html, types: gts };
  };

  const setJump = (types, g) => {
    jump.hidden = types.length < 2;
    jump.innerHTML = types.map((t) => `<a href="#sec-${t.id}" data-jump="${t.id}">${t.label} <sup>${count(g, t)}</sup></a>`).join("");
  };

  let sets = {}; // listes d'éléments pour la visionneuse (gallery, story)

  function render(p, partKey) {
    sets = {};
    const ext = $("#album-link");
    if (p.link) { ext.hidden = false; ext.href = p.link.href; ext.textContent = p.link.label + " ↗"; } else { ext.hidden = true; }
    // partKey : un match (projet à dossiers comme LMTT) ou un type de contenu / "tout"
    $("#album-back-label").textContent = partKey ? (p.short || p.title) : "Projets";

    // 1. Projet à dossiers : liste des dossiers
    if (p.folders && hasParts(p) && !partKey) {
      const groups = groupsOf(p).filter((g) => typesOfGroup(g).length);
      $("#album-title").textContent = p.title;
      $("#album-meta").textContent = [p.kind, `${groups.length} ${p.partsLabel || "dossiers"}`, ...typesOf(p).map((t) => plural(t, total(p, t)))].join(" · ");
      jump.hidden = true; jump.innerHTML = "";
      sectionsEl.innerHTML = `<div class="projects projects--folders">${groups.map((g, i) => card({
        attrs: `data-part="${g.key}" aria-label="Ouvrir le dossier ${esc(g.title)}"`,
        cover: `${g.dir}/cover.jpg${CV}`, kind: g.kind, title: g.title,
        badges: typesOfGroup(g).map((t) => `<span class="badge badge--${t.id}">${plural(t, count(g, t))}</span>`).join(""),
      }, i)).join("")}</div>`;
      wire(sectionsEl);
      $$(".pcard", sectionsEl).forEach((c) => c.addEventListener("click", () => openProject(p.key, c.dataset.part)));
      return;
    }

    // 2. Un dossier d'un projet à dossiers
    if (partKey && p.folders) {
      const g = groupsOf(p).find((x) => x.key === partKey);
      if (!g) return render(p);
      $("#album-title").textContent = g.title;
      $("#album-meta").textContent = [g.kind, ...typesOfGroup(g).map((t) => plural(t, count(g, t)))].filter(Boolean).join(" · ");
      const gal = galleryHTML(g.title, g, sets, true);
      setJump(gal.types, g);
      sectionsEl.innerHTML = `<section class="psec">${gal.html}</section>`;
      return;
    }

    const g = groupsOf(p)[0];

    // 2 bis. Un dossier de contenu (Photos, Visuels, Vidéos) ou « Tout voir »
    if (partKey && !p.folders) {
      const t = TYPES.find((x) => x.id === partKey);
      const only = t ? { ...g, ...Object.fromEntries(TYPES.map((x) => [x.id, x === t ? count(g, x) : 0])) } : g;
      $("#album-title").textContent = t ? `${p.short || p.title} · ${t.label}` : p.title;
      $("#album-meta").textContent = t ? plural(t, count(g, t)) : ["Tout le projet", ...typesOf(p).map((x) => plural(x, total(p, x)))].join(" · ");
      const gal = galleryHTML(p.title, only, sets, true);
      setJump(gal.types, only);
      sectionsEl.innerHTML = `<section class="psec">${gal.html}</section>`;
      return;
    }

    $("#album-title").textContent = p.title;
    $("#album-meta").textContent = [p.kind, ...typesOf(p).map((t) => plural(t, total(p, t)))].filter(Boolean).join(" · ");

    // dossiers Visuels / Photos / Vidéos (seulement ceux qui existent) + bouton « Tout voir »
    const ORDER = ["visuels", "photos", "videos"];
    const typeFolders = () => {
      const ts = ORDER.map((id) => TYPES.find((t) => t.id === id)).filter((t) => count(g, t) > 0);
      // couverture d'un dossier : choisie dans projets.js (covers), sinon une illustration du même type, sinon le premier fichier
      const coverOf = (t) => {
        if (p.covers && p.covers[t.id]) return `${g.dir}/${p.covers[t.id]}`;
        const ill = p.story && (p.story.illustrations || []).find((x) => x.src.startsWith(t.id + "/"));
        if (ill) return `${g.dir}/${ill.src}`;
        return t.id === "videos" ? `${g.dir}/videos/001-poster.jpg` : `${g.dir}/${t.id}/001.jpg`;
      };
      return `<section class="psec typefolders">
        <h3 class="psec__title">Les contenus</h3>
        <div class="projects projects--types">${ts.map((t, i) => card({
          attrs: `data-type="${t.id}" aria-label="Ouvrir le dossier ${t.label} (${count(g, t)})"`,
          cover: coverOf(t), kind: "Dossier", title: t.label,
          badges: `<span class="badge badge--${t.id}">${plural(t, count(g, t))}</span>`,
        }, i)).join("")}</div>
        <div class="typefolders__all">
          <button class="btn btn--accent" id="see-all">Tout voir <span aria-hidden="true">→</span></button>
          <p>${typesOf(p).map((t) => plural(t, total(p, t))).join(" · ")}</p>
        </div>
      </section>`;
    };
    const wireTypeFolders = () => {
      $$(".projects--types .pcard", sectionsEl).forEach((c) => c.addEventListener("click", () => openProject(p.key, c.dataset.type)));
      $("#see-all").addEventListener("click", () => openProject(p.key, "tout"));
    };

    // 3. Projet avec présentation
    if (p.story) {
      const s = p.story;
      const illus = (s.illustrations || []).map((x) => ({ kind: "image", src: `${base(p)}/${x.src}`, alt: x.cap || p.title, cap: x.cap || p.title }));
      sets.story = illus;
      // pas de dossiers si les illustrations montrent déjà tout le contenu
      const showMore = TYPES.reduce((n, t) => n + count(g, t), 0) > illus.length;
      jump.hidden = true; jump.innerHTML = "";
      sectionsEl.innerHTML = `
        <article class="story">
          <div class="story__intro">
            <p class="story__lead">${esc(s.lead || "")}</p>
            ${s.facts ? `<dl class="story__facts">${s.facts.map((f) => `<div><dt>${esc(f.k)}</dt><dd>${esc(f.v)}</dd></div>`).join("")}</dl>` : ""}
          </div>
          ${p.youtubeUploads ? `<div class="yt">
            <div class="yt__frame"><iframe src="https://www.youtube-nocookie.com/embed/videoseries?list=${p.youtubeUploads}" title="Dernière vidéo de ${esc(p.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            <div class="yt__side"><p class="kicker">Dernière vidéo</p><p>La vidéo la plus récente de la chaîne, mise à jour automatiquement.</p>
            ${p.link ? `<a class="btn btn--accent" href="${p.link.href}" target="_blank" rel="noopener">${esc(p.link.label)} ↗</a>` : ""}</div>
          </div>` : ""}
          <div class="story__body">
            <div class="story__text">${(s.text || []).map((t) => `<p>${esc(t)}</p>`).join("")}</div>
            ${s.missions ? `<aside class="story__missions"><h3>Ce que j'ai fait</h3><ul>${s.missions.map((m) => `<li>${esc(m)}</li>`).join("")}</ul></aside>` : ""}
          </div>
          ${illus.length && !showMore ? `<div class="story__illus">${illus.map((it, i) => `
            <figure class="story__fig">
              <button class="tile media" data-set="story" data-i="${i}" aria-label="Agrandir : ${esc(it.cap)}"><img src="${it.src}" alt="${esc(it.alt)}" loading="lazy"></button>
              <figcaption>${esc(it.cap)}</figcaption>
            </figure>`).join("")}</div>` : ""}
        </article>
        ${showMore ? typeFolders() : ""}`;
      if (showMore) wireTypeFolders();
      return;
    }

    // 4. Sans présentation : plusieurs types → dossiers ; un seul type → galerie directe
    if (typesOfGroup(g).length > 1) {
      jump.hidden = true; jump.innerHTML = "";
      sectionsEl.innerHTML = typeFolders();
      wireTypeFolders();
      return;
    }
    const gal = galleryHTML(p.title, g, sets, true);
    setJump(gal.types, g);
    sectionsEl.innerHTML = `<section class="psec">${gal.html}</section>`;
  }

  function openProject(key, partKey, fromHistory) {
    const p = VISIBLE.find((x) => x.key === key); if (!p) return;
    if (albumEl.hidden) lastFocus = document.activeElement;
    openState = { project: p, part: partKey || null };
    render(p, partKey);
    wire(sectionsEl);
    $$(".tile[data-set]", sectionsEl).forEach((el) => el.addEventListener("click", () => openLightbox(el.dataset.set, Number(el.dataset.i))));
    albumEl.hidden = false;
    albumEl.scrollTop = 0;
    lockScroll();
    $("#album-back").focus();
    if (!fromHistory) history.pushState({ project: key, part: partKey || null }, "", `#projet/${key}${partKey ? "/" + partKey : ""}`);
  }

  jump.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-jump]"); if (!a) return;
    e.preventDefault();
    const sec = $("#sec-" + a.dataset.jump);
    const go = (behavior) => albumEl.scrollTo({ top: sec.getBoundingClientRect().top + albumEl.scrollTop - $(".album__bar").offsetHeight - 12, behavior });
    // les images au-dessus doivent être chargées, sinon la page se décale pendant le défilement
    const before = $$("img", sectionsEl).filter((img) => img.compareDocumentPosition(sec) & Node.DOCUMENT_POSITION_FOLLOWING);
    const pending = before.filter((img) => !img.complete).map((img) => {
      img.loading = "eager";
      return new Promise((res) => { img.addEventListener("load", res, { once: true }); img.addEventListener("error", res, { once: true }); });
    });
    if (!pending.length) { go("smooth"); return; }
    Promise.race([Promise.all(pending), new Promise((r) => setTimeout(r, 2500))]).then(() => { go("smooth"); setTimeout(() => go("auto"), 700); });
  });

  function closeAlbum() {
    if (albumEl.hidden) return;
    closeLightbox();
    albumEl.hidden = true;
    sectionsEl.innerHTML = "";
    openState = null;
    lockScroll();
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }

  const goBack = () => {
    if (history.state && history.state.project) { history.back(); return; }
    // ouvert par un lien direct : on remonte d'un niveau sans historique
    if (openState && openState.part) { openProject(openState.project.key, null, true); history.replaceState({ project: openState.project.key }, "", `#projet/${openState.project.key}`); return; }
    closeAlbum(); history.replaceState(null, "", "#portfolio");
  };
  $("#album-back").addEventListener("click", goBack);
  $("#album-cta").addEventListener("click", (e) => {
    e.preventDefault();
    closeAlbum();
    history.pushState(null, "", "#contact");
    setTimeout(() => contact.scrollIntoView({ behavior: "smooth" }), 60);
  });
  window.addEventListener("popstate", (e) => {
    const st = e.state;
    if (st && st.project) openProject(st.project, st.part, true); else closeAlbum();
  });

  // lien direct : site.fr/#projet/lmtt ou site.fr/#projet/lmtt/vs-amiens
  const fromHash = () => {
    const m = location.hash.match(/^#projet\/([\w-]+)(?:\/([\w-]+))?$/);
    if (!m) return;
    history.replaceState(null, "", "#portfolio");
    if (m[2]) { openProject(m[1]); openProject(m[1], m[2]); } else openProject(m[1]);
  };

  /* =========================================================
     LIGHTBOX (images + vidéos)
     ========================================================= */
  const lb = $("#lightbox"), stage = $("#lb-stage"), cap = $("#lb-cap");
  let cur = 0, lbList = [], lbSet = "";

  const preload = (i) => {
    const n = lbList.length; if (!n) return;
    const it = lbList[(i + n) % n];
    if (it && it.kind === "image") { const im = new Image(); im.src = it.src; }
  };
  const show = (i) => {
    const n = lbList.length; if (!n) return;
    cur = (i + n) % n;
    const it = lbList[cur];
    stage.innerHTML = it.kind === "video"
      ? `<video src="${it.src}" poster="${it.poster}" controls autoplay playsinline preload="metadata"></video>`
      : `<img src="${it.src}" alt="${esc(it.alt)}">`;
    const same = lbList.filter((x) => x.cap === it.cap);
    cap.textContent = same.length > 1 ? `${it.cap} ${same.indexOf(it) + 1} / ${same.length}` : it.cap;
    preload(cur + 1); preload(cur - 1);
  };
  function openLightbox(set, i) {
    lbSet = set; lbList = set === "reels" ? REELS : (sets[set] || []);
    show(i);
    lb.hidden = false;
    lockScroll();
    $("#lb-close").focus();
  }
  function closeLightbox() {
    if (lb.hidden) return;
    const v = $("video", stage); if (v) v.pause();
    stage.innerHTML = "";
    lb.hidden = true;
    lockScroll();
    const t = lbSet === "reels" ? $(`#reels .rcard[data-i="${cur}"]`) : $(`.tile[data-set="${lbSet}"][data-i="${cur}"]`, sectionsEl);
    if (t) t.focus();
  }
  $("#lb-close").addEventListener("click", closeLightbox);
  $("#lb-prev").addEventListener("click", () => show(cur - 1));
  $("#lb-next").addEventListener("click", () => show(cur + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.tagName === "FIGURE") closeLightbox(); });

  let sx = null;
  lb.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
    sx = null;
  });

  document.addEventListener("keydown", (e) => {
    if (!lb.hidden) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
      return;
    }
    if (!albumEl.hidden && e.key === "Escape") { goBack(); return; }
    if (e.key === "Escape" && nav.classList.contains("is-open")) setMenu(false);
  });

  /* ---------- Pré-sélection du besoin depuis les cartes ---------- */
  $$(".card__link[data-need]").forEach((a) => {
    a.addEventListener("click", () => {
      const r = $(`.chip input[data-need="${a.dataset.need}"]`);
      if (r) r.checked = true;
      setTimeout(() => $("#f-name").focus({ preventScroll: true }), 600);
    });
  });

  /* =========================================================
     FORMULAIRE
     ========================================================= */
  const form = $("#contact-form");
  const status = $("#form-status");
  const setStatus = (msg, type) => { status.textContent = msg; status.className = "form__status" + (type ? " is-" + type : ""); };
  const field = (n) => form.elements[n];

  const validate = () => {
    let ok = true;
    [
      [field("name"), (v) => v.trim().length >= 2],
      [field("contact"), (v) => /\S+@\S+\.\S+/.test(v) || v.replace(/\D/g, "").length >= 9],
      [field("message"), (v) => v.trim().length >= 10],
    ].forEach(([el, fn]) => {
      const good = fn(el.value);
      el.closest(".field").classList.toggle("has-error", !good);
      el.setAttribute("aria-invalid", String(!good));
      if (!good) ok = false;
    });
    const needOk = !!$("input[name='need']:checked", form);
    $(".chips", form).closest(".field").classList.toggle("has-error", !needOk);
    return ok && needOk;
  };
  form.addEventListener("input", (e) => {
    const f = e.target.closest(".field");
    if (f) f.classList.remove("has-error");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (field("_gotcha").value) return;
    if (!validate()) {
      setStatus("Merci de compléter les champs en surbrillance.", "error");
      const first = $(".has-error input, .has-error textarea", form);
      if (first) first.focus();
      return;
    }
    const data = {
      name: field("name").value.trim(),
      contact: field("contact").value.trim(),
      need: $("input[name='need']:checked", form).value,
      message: field("message").value.trim(),
    };

    if (FORM_ENDPOINT) {
      const btn = $("button[type='submit']", form);
      btn.disabled = true; setStatus("Envoi en cours…");
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...data, _subject: `[Site] ${data.need} — ${data.name}` }),
        });
        if (!res.ok) throw new Error(res.status);
        form.reset();
        setStatus("Merci ! Votre demande est bien partie, je reviens vers vous rapidement.", "ok");
      } catch (err) {
        setStatus(`L'envoi a échoué. Écrivez-moi directement à ${CONTACT_EMAIL}.`, "error");
      } finally { btn.disabled = false; }
      return;
    }

    const subject = `[Site] ${data.need} — ${data.name}`;
    const body = `Bonjour,\n\n${data.message}\n\n—\nNom / structure : ${data.name}\nContact : ${data.contact}\nBesoin : ${data.need}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Votre messagerie s'ouvre avec la demande pré-remplie. Il ne reste qu'à l'envoyer.", "ok");
  });

  const y = $("#year"); if (y) y.textContent = new Date().getFullYear();

  fromHash();
  window.addEventListener("hashchange", fromHash);
})();
