let reactiveTitles,
  reactiveLetters,
  currentSection,
  waves,
  mousePos,
  mouseSensitiveElems,
  burgerMenu,
  menu,
  menuBtns,
  view,
  projectContainer,
  waveContainer,
  mainBtn,
  head,
  headClient,
  headAngle,
  mouseCircle;

//Colors map
const sections = ["home", "projects", "about", "contact"];
const colors = ["#66fcf0", "#66fc8e", "#fc6b66", "#fcbb66"];
const colorsName = ["blue", "green", "red", "orange"];
const colorsMap = new Map();
sections.forEach((section, id) => {
  colorsMap.set(section, colors[id]);
});

let scrollOffset = 0;
let scrollTimeout;
let inTransition = false;
let scrollBtn;

window.mobileCheck = function () {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

let currentView;

let navbtns, navText, navContainer;

function init() {
  mouseCircle = document.querySelector(".cursor-circle");
  view = document.querySelector(".view");
  projectContainer = document.querySelector(".project-single");
  projectContainer.addEventListener("wheel", (e) => {
    scrollOffset = 0;
  });
  burgerMenu = document.querySelector(".menu-burger");
  burgerMenu.addEventListener("click", toggleMenu);
  menu = document.querySelector(".menu");
  menu.addEventListener("wheel", (e) => {
    scrollOffset = 0;
  });

  menuBtns = menu.querySelectorAll("a");

  menuBtns.forEach((btn) => {
    let href = btn.href;
    href = href.split("/");
    href = href[href.length - 1];

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      changeView(href);
      toggleMenu();
    });
  });

  navContainer = document.querySelector(".nav-menu");
  navText = navContainer.querySelector(".nav-text");
  navbtns = navContainer.querySelectorAll(".nav-box");
  navbtns.forEach((btn, id) => {
    btn.addEventListener("click", () => {
      changeView(sections[id], 0, true);
      OnProjectClose();
    });
  });

  waveContainer = document.querySelector("#webgl");
  mainBtn = document.querySelector(".main-button");
  mainBtn.addEventListener("click", (e) => {
    e.preventDefault();
    changeView("home", 0, true);
    OnProjectClose();
  });

  currentSection = "home";

  initProjectWindow();

  //no mobile only
  //if (window.mobileCheck) {
  waves = new Waves({
    dom: document.getElementById("webgl"),
  });
  waves.changeColor(colorsMap.get(currentSection));

  window.addEventListener("mousemove", onMouseMove);
  //}

  onNewContent();

  changeView("home");

  scrollBtn = document.querySelector(".scroll-indicator");
  scrollBtn.addEventListener("click", () => {
    changeView("projects", 1);
  });
  if (!window.matchMedia("(min-width: 768px)").matches) {
    scrollBtn.classList.add("hidden");
  }

  document.addEventListener("wheel", (e) => {
    if (inTransition) {
      return;
    }
    scrollOffset += e.deltaY;
    scrollTimeout = setTimeout(() => {
      scrollOffset = 0;
      console.log(scrollOffset);
    }, 500);

    if (scrollOffset >= 500 || scrollOffset <= -500) {
      onViewScroll(scrollOffset);
      scrollOffset = 0;
      inTransition = true;
      scrollBtn.classList.add("indicator-hidden");
      setTimeout(() => {
        scrollBtn.classList.add("hidden");
        navContainer.classList.remove("hidden");
      }, 500);
    }
  });

  cursorEdit();
}

function toggleMenu(evt) {
  burgerMenu.classList.toggle("burger-opened");
  menu.classList.toggle("menu-opened");
  view.classList.toggle("view-hidden-top");
  waveContainer.classList.toggle("wave-burger");
  projectContainer.classList.toggle("project-hidden-top");
}

function onMouseMove(evt) {
  if (mousePos == null) {
    mousePos = new Mouse(evt.pageX, evt.pageY);
  } else {
    mousePos.setPosition(evt.pageX, evt.pageY);
  }

  //reactive elems
  mouseSensitiveElems.forEach((element) => {
    let move = getMouseOffset(element, 0.002, 0.008, false);

    element.style.transform = "translate(" + move.x + "%," + move.y + "%)";
  });

  //reactive Titles
  reactiveLetters.forEach((letter) => {
    let move = getMouseOffset(
      letter.parentElement.parentElement,
      0.002,
      0.008,
      false
    );
  });

  //head
  if (head != null) {
    let angle = getMouseAngle(head);

    angle = -angle;

    if (angle > 40) {
      angle = 40;
    }

    if (angle < -40) {
      angle = -40;
    }

    headAngle = angle;

    head.style.transform = "translate(-50%, -50%) rotate(" + angle + "deg)";
  }
}

function getMouseAngle(elem) {
  let client = elem.getBoundingClientRect();
  let x = (client.left + client.right) / 2;
  let y = (client.top + client.bottom) / 2;

  let diffX = x - mousePos.x;
  let diffY = y - mousePos.y;

  let rad = Math.atan2(diffX, diffY);

  return rad * (180 / Math.PI);
}

function getMouseOffset(elem, factorX, factorY, reverse) {
  let client = elem.getBoundingClientRect();
  let x = client.left;
  let y = client.top;

  let diffX = x - mousePos.x;
  let diffY = y - mousePos.y;

  let moveX = reverse ? -diffX * factorX : diffX * factorX;
  let moveY = reverse ? -diffY * factorY : diffY * factorY;

  return { x: moveX, y: moveY };
}

function onNewContent() {
  //setup links and titles
  reactiveTitles = document.querySelectorAll(".reactive-title");

  applyTitlesEffect();

  mouseSensitiveElems = document.querySelectorAll(".mouse-sensitive");

  //reset head
  let coolternion = document.querySelector(".coolternion");
  if (coolternion != null) {
    head = coolternion.querySelector(".coolternion-front");
  } else {
    head = null;
  }

  navText.textContent = currentSection;

  colorsName.forEach((c) => {
    mainBtn.classList.remove("main-button-" + c);
    mouseCircle.classList.remove("circle-" + c);
  });
  mainBtn.classList.add(
    "main-button-" + colorsName[sections.indexOf(currentSection)]
  );
  mouseCircle.classList.add(
    "circle-" + colorsName[sections.indexOf(currentSection)]
  );
}

function applyTitlesEffect() {
  reactiveTitles.forEach((title) => {
    let words = title.textContent.split(" ");
    title.ariaLabel = title.textContent;
    title.textContent = "";

    reactiveLetters = [];

    words.forEach(word=>{
      let wordElem = document.createElement("span");
      wordElem.classList.add("reactive-word");

      let chars = word.split("");
      chars.push(" ");
  
      chars.forEach((char) => {
        let span = document.createElement("span");
        if (char === " ") {
          span.classList.add("reactive-space");
        } else {
          span.classList.add("reactive-letter");
        }
        span.textContent = char;
        span.ariaHidden = true;
        span.addEventListener("mouseover", playEffect);
        wordElem.appendChild(span);
  
        reactiveLetters.push(span);
      });

      title.appendChild(wordElem);

    });
  });
}

function playEffect(e) {
  if (!e.target.classList.contains("bouncing")) {
    e.target.classList.add("bouncing");

    setTimeout(() => {
      e.target.classList.remove("bouncing");
    }, 1000);
  }
}

function OnProjectOpen() {
  onNewContent();
  view.classList.add("view-hidden-bot");
  waveContainer.classList.add("wave-project");
  menu.classList.add("menu-hidden");
  projectContainer.classList.add("project-opened");
}

function OnProjectClose() {
  if (projectContainer.querySelector("iframe") != null) {
    projectContainer.querySelector("iframe").src = "";
  }
  view.classList.remove("view-hidden-bot");
  waveContainer.classList.remove("wave-project");
  menu.classList.remove("menu-hidden");
  projectContainer.classList.remove("project-opened");
}

//Nav
function onViewScroll(scroll) {
  let id = sections.indexOf(currentSection);
  let change = 0;

  if (scroll > 0) {
    id += 1;
    change += 1;
  } else {
    id -= 1;
    change -= 1;
  }

  if (id < 0) {
    id = sections.length - 1;
  }
  if (id >= sections.length) {
    id = 0;
  }

  changeView(sections[id], change);
}

function changeView(page, change = 0, calculateClosest = false) {
  if (calculateClosest) {
    //find shortest path to next page
    let path = sections.indexOf(currentSection) - sections.indexOf(page);

    if (Math.abs(path) > 2) {
      if (path > 0) {
        change = 1;
      } else {
        change = -1;
      }
    } else if (path > 0) {
      change = -1;
    } else {
      change = 1;
    }
  }

  getTemplate(page, change, showPage);

  currentSection = page;

  navbtns.forEach((btn) => {
    btn.classList.remove("nav-current");
  });
  navbtns[sections.indexOf(page)].classList.add("nav-current");
}

function showPage(p, section, change) {
  let color = colorsMap.get(section);

  let hideClass, showClass;

  //remove view
  if (change == 0) {
    view.innerHTML = p;
    onNewContent();
    setColor(color);
    OnProjectClose();

    if (view.querySelector(".shuffle-container") != null) {
      initProjects();
    }
    if (view.querySelector(".slogan") != null) {
      initHome();
    }
    return;
  }
  if (change > 0) {
    //hide left
    hideClass = "view-hidden-left";
    showClass = "view-hidden-right";
  } else if (change < 0) {
    //hide right
    hideClass = "view-hidden-right";
    showClass = "view-hidden-left";
  }

  //hide
  view.classList.add(hideClass);

  //show
  setTimeout(() => {
    view.classList.add("no-transition");
    view.classList.remove(hideClass);
    view.classList.add(showClass);

    view.innerHTML = p;

    onNewContent();
    setColor(color);

    if (view.querySelector(".shuffle-container") != null) {
      initProjects();
    }

    if (view.querySelector(".slogan") != null) {
      initHome();
    }

    setTimeout(() => {
      view.classList.remove("no-transition");
      view.classList.remove(showClass);
    }, 20);
  }, 500);

  setTimeout(() => {
    inTransition = false;
  }, 1500);
}

function setColor(hex) {
  waves.changeColor(hex);
}

function getTemplate(fileName, change, func) {
  let html;

  fetch("views/" + fileName + ".html")
    .then((response) => response.text())
    .then((html) => {
      func(html, fileName, change);
    });
}

//home random slogan
let slogans = [
  "La ziguezon enjoyer",
  "Stackoverflow enjoyer",
  "Giga crack patati patata",
  "John Funambule peaker",
  "Random caption abuser",
  "Refresh la page pour voir",
  "Jeteur de croutes",
  "Slogan aléatoire 8",
  "WWJMD",
  "Demande à Jean-Michel",
  "Développeur sérieux et présentable",
  "Mangeur de croutes",
];

let previousNumber = localStorage.getItem("previousRdm");

function initHome() {
  let caption = view.querySelector(".slogan");
  let randomNumber = Math.floor(Math.random() * slogans.length);

  if (previousNumber != null && randomNumber == previousNumber) {
    while (randomNumber == previousNumber) {
      randomNumber = Math.floor(Math.random() * slogans.length);
    }
  }

  caption.textContent = slogans[randomNumber];
  localStorage.setItem("previousRdm", randomNumber);
}

document.addEventListener("DOMContentLoaded", init);
