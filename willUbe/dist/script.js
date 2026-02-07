// Customize text and “photos” here.
 // Notes reveal on click. Photos are CSS-only placeholders for easy swapping later.

 const SCRAPBOOK = {
   cover: {
     title: "For You ♥",
     subtitle: "To the pinaka maganda, mabait, maalaga sakin, at the sexiest in the whole world.",
     finalCaption: "Forever your favorite person.",
   },
   notes: [
     {
       title: "Hey you",
       message: "I am so obsessed with how you do everything, lahat Dayne. As in.",
     },
     {
       title: "Reminder",
       message: "Na kahit anong mangyari I will always be here for you. Umulan o umaraw.",
     },
     {
       title: "P.S.",
       message: "Daniella Dayne flavor lang ang gusto ng Hotdog ko hehe.",
     },
     {
       title: "Little thing",
       message: "Minsan kinikilig padin pag naaalala ko yung unang pagkita natin, and how I much I kissed you agad.",
     },
     {
       title: "Promise",
       message: "I'll choose you every day and every second of my living and to my eternity.",
     },
     {
       title: "Always",
       message: "Will always look sa pag hawak mo sa mukha ko, sa pag halik mo sa pisnge ko, sa pag yakap mo sakin hehe, hawi ng buhok. grabe and dami",
     },
   ],
   photos: [
    {
      caption: "That one day the world just stopped",
      tint: "warm",
      image: "./1.jpeg",
    },
     {
      caption: "Yung nahiya ako sa resto tas gusto ko kainin lahat ng sushi",
      tint: "blush",
      image: "./2.jpeg",
    },
     {
      caption: "One of the best Photobooths, hindi yung naka tayo sa tren",
      tint: "dark",
      video: "./3.mp4",
    },
     {
      caption: "Our katakawan groceryyy",
      tint: "warm",
      image: "./5.jpeg",
    },
     {
      caption: "Home.",
      tint: "blush",
      image: "./4.jpeg",
    },
     {
      caption: "Your first nap around my arms",
      tint: "dark",
      image: "./6.jpeg",
    },
   ],
   reasons: [
     "Ikaw talaga yung pinaka magandang babaeng nakilala ko.",
     "You are so gentle with me and ang haba ng pasensya mo.",
     "You always put me first bago sarili mo.",
     "You have sacrificed a lot for me, di ko na kailangan iremind.",
     "You respect me.",
     "kili kili mo.",
     "And ang sarap mo grabe ka Daniella Dayne"
   ],
 };

 const rand = (min, max) => Math.random() * (max - min) + min;
 const randInt = (min, max) => Math.floor(rand(min, max + 1));

 function setTilts(){
   document.querySelectorAll('[data-tilt]')?.forEach((el) => {
     const deg = Number(el.getAttribute('data-tilt')) || 0;
     el.style.setProperty('--tilt', `${deg}deg`);
   });
 }

 function renderCover(){
   const title = document.getElementById('coverTitle');
   const subtitle = document.getElementById('coverSubtitle');
   const finalCaption = document.getElementById('finalCaption');
   if (title) title.textContent = SCRAPBOOK.cover.title;
   if (subtitle) subtitle.textContent = SCRAPBOOK.cover.subtitle;
   if (finalCaption) finalCaption.textContent = SCRAPBOOK.cover.finalCaption;
 }

 function renderNotes(){
   const grid = document.getElementById('notesGrid');
   if (!grid) return;

   grid.innerHTML = "";

   SCRAPBOOK.notes.forEach((note, i) => {
     const card = document.createElement('article');
     card.className = 'piece note';
     card.style.setProperty('--tilt', `${rand(-4, 4).toFixed(2)}deg`);
     card.setAttribute('tabindex', '0');
     card.setAttribute('role', 'button');
     card.setAttribute('aria-expanded', 'false');
     card.dataset.index = String(i);

     card.innerHTML = `
       <div class="note__tape" aria-hidden="true"></div>
       <h3 class="note__title">${escapeHtml(note.title)}</h3>
       <p class="note__hint">Tap to open</p>
       <p class="note__msg">${escapeHtml(note.message)}</p>
     `;

     grid.appendChild(card);
   });

   const toggle = (el) => {
     const isOpen = el.classList.toggle('is-open');
     el.setAttribute('aria-expanded', String(isOpen));
   };

   grid.addEventListener('click', (e) => {
     const card = e.target.closest('.note');
     if (!card) return;
     toggle(card);
   });

   grid.addEventListener('keydown', (e) => {
     if (!(e.key === 'Enter' || e.key === ' ')) return;
     const card = e.target.closest('.note');
     if (!card) return;
     e.preventDefault();
     toggle(card);
   });
 }

 function renderPolaroids(){
  const grid = document.getElementById('polaroidGrid');
  if (!grid) return;

  const tintToOverlay = {
     warm: 'radial-gradient(700px 260px at 20% 15%, rgba(193, 22, 44, 0.22), transparent 62%), radial-gradient(600px 240px at 90% 30%, rgba(245, 183, 195, 0.55), transparent 60%)',
     blush: 'radial-gradient(700px 260px at 30% 15%, rgba(245, 183, 195, 0.75), transparent 62%), radial-gradient(600px 240px at 90% 30%, rgba(193, 22, 44, 0.16), transparent 60%)',
     dark: 'radial-gradient(700px 260px at 20% 15%, rgba(0, 0, 0, 0.20), transparent 62%), radial-gradient(600px 240px at 90% 30%, rgba(193, 22, 44, 0.14), transparent 60%)',
   };

   grid.innerHTML = "";

   SCRAPBOOK.photos.forEach((p) => {
    const frame = document.createElement('figure');
    frame.className = 'piece polaroid';
    frame.style.setProperty('--tilt', `${rand(-4, 4).toFixed(2)}deg`);

    const photo = document.createElement('div');
    photo.className = 'polaroid__photo';
    const overlay = tintToOverlay[p.tint] || tintToOverlay.warm;
    if (p.video){
      photo.classList.add('polaroid__photo--video');
      photo.style.setProperty('--video-overlay', overlay);

      const vid = document.createElement('video');
      vid.src = p.video;
      vid.loop = true;
      vid.muted = true;
      vid.autoplay = true;
      vid.playsInline = true;
      vid.setAttribute('aria-label', p.caption);

      photo.appendChild(vid);
    }else if (p.image){
      photo.style.backgroundImage = `${overlay}, linear-gradient(0deg, rgba(0,0,0,0.12), rgba(0,0,0,0.12)), url(${p.image})`;
      photo.style.backgroundSize = 'cover';
      photo.style.backgroundPosition = 'center';
    }else{
      photo.style.backgroundImage = `${overlay}, ${getBasePhotoGradient()}`;
      photo.style.removeProperty('background-size');
      photo.style.removeProperty('background-position');
    }

    const cap = document.createElement('figcaption');
    cap.className = 'polaroid__caption';
    cap.textContent = p.caption;

     frame.appendChild(photo);
     frame.appendChild(cap);
     grid.appendChild(frame);
   });
 }

 function renderReasons(){
  const list = document.getElementById('reasonsList');
  if (!list) return;

  list.innerHTML = "";
  SCRAPBOOK.reasons.forEach((r, idx) => {
    const li = document.createElement('li');
    const isSecret = idx === SCRAPBOOK.reasons.length - 1;

    if (isSecret){
      li.classList.add('reason--secret');
      li.dataset.secret = 'true';
      li.setAttribute('tabindex', '0');
      li.setAttribute('role', 'button');
      li.setAttribute('aria-expanded', 'false');
      li.innerHTML = `
        <span class="reasonSecret__text">${escapeHtml(r)}</span>
        <span class="reasonSecret__hint">Tap to reveal</span>
      `;
    }else{
      li.textContent = r;
    }

    list.appendChild(li);
  });

  const secret = list.querySelector('[data-secret]');
  if (!secret) return;

  const toggleSecret = () => {
    const isOpen = secret.classList.toggle('is-revealed');
    secret.setAttribute('aria-expanded', String(isOpen));
  };

  secret.addEventListener('click', toggleSecret);
  secret.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    toggleSecret();
  });
}

 function startFloatingHearts(){
   const host = document.getElementById('hearts');
   if (!host) return;

   const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   if (prefersReduced) return;

   const spawn = () => {
     const heart = document.createElement('span');
     heart.className = 'heart';

     const left = rand(4, 96);
     const size = rand(10, 22);
     const duration = rand(7.5, 12.5);
     const drift = rand(-70, 70);
     const spin = rand(-40, 40);

     heart.style.left = `${left}vw`;
     heart.style.width = `${size}px`;
     heart.style.height = `${size}px`;
     heart.style.opacity = `${rand(0.10, 0.22)}`;
     heart.style.animationDuration = `${duration}s`;
     heart.style.setProperty('--drift', `${drift}px`);
     heart.style.setProperty('--spin', `${spin}deg`);

     host.appendChild(heart);

     window.setTimeout(() => {
       heart.remove();
     }, (duration + 0.2) * 1000);
   };

   spawn();
   window.setInterval(spawn, 900);
 }

 function escapeHtml(str){
   return String(str)
     .replaceAll('&', '&amp;')
     .replaceAll('<', '&lt;')
     .replaceAll('>', '&gt;')
     .replaceAll('"', '&quot;')
     .replaceAll("'", '&#39;');
 }

 function getBasePhotoGradient(){
   const a = randInt(0, 359);
   const b = (a + randInt(40, 110)) % 360;
   return `linear-gradient(135deg, hsla(${a}, 75%, 84%, 0.75), hsla(${b}, 70%, 78%, 0.68)), linear-gradient(0deg, rgba(255,255,255,0.28), rgba(255,255,255,0.28))`;
 }

 document.addEventListener('DOMContentLoaded', () => {
   setTilts();
   renderCover();
   renderNotes();
   renderPolaroids();
   renderReasons();
   startFloatingHearts();
 });