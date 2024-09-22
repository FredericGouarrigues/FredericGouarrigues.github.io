const JSON_PATH = "data/projects.json";
let projectsJSON, projectsContainer, allProjects;
let tags = ["programmation", "audiovisuel", "web", "design"];

function getProjects(func) {
  fetch(JSON_PATH)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      projectsJSON = json.projects;
      //sort by date
      let ordered = projectsJSON;

      ordered.sort((a, b) => b.date - a.date);
      func();
    });
}

function initProjects() {
  projectsContainer = document.querySelector(".shuffle-container");
  projectsContainer.addEventListener("wheel", (e) => {
    scrollOffset = 0;
  });
  getProjects(showProjects);
}

function showProjects() {
  projectsContainer.innerHTML = "";

  projectsJSON.forEach((p) => {
    projectsContainer.appendChild(getProjectThumbnail(p));
  });

  initShuffle();
}

function getProjectThumbnail(p) {
  JSON.stringify(p.tags);

  let div = document.createElement("div");
  div.classList.add("project-item");
  div.setAttribute("data-groups", JSON.stringify(p.tags));
  div.setAttribute("data-date-created", p.date);

  div.addEventListener("click", () => {
    openProject(p);
  });

  let img = document.createElement("div");
  img.classList.add("project-thumbnail");
  img.style.backgroundImage = "url(img/" + p.img + ")";
  img.ariaLabel = "Image du projet " + p.title;

  let seeMore = document.createElement("div");
  seeMore.classList.add("project-see-more");
  seeMore.textContent = /*"Voir plus"*/ p.title;
  seeMore.style.position = "absolute";

  div.appendChild(seeMore);
  div.appendChild(img);

  return div;
}

let showcaseContainer,
  titleContainer,
  tagsContainer,
  roleContainer,
  contextContainer,
  descriptionContainer,
  backBtn,
  titlesContainer,
  linkContainer;

function initProjectWindow() {
  showcaseContainer = document.querySelector(".project-showcase");
  titlesContainer = document.querySelector(".project-titles");
  titleContainer = titlesContainer.querySelector("h1");
  tagsContainer = titlesContainer.querySelector("h2");
  roleContainer = document.querySelector(".project-content h3");
  contextContainer = document.querySelector(".project-content h4");
  descriptionContainer = document.querySelector(".project-content p");
  linkContainer = document.querySelector(".linkContainer");
  backBtn = document.querySelector(".back-btn");
  backBtn.addEventListener("click", OnProjectClose);
}

function openProject(infos) {
  //remove showcase
  showcaseContainer.removeChild(showcaseContainer.querySelector(".showcase"));
  //create new based on tag
  let showcase;
  if (infos.tags.includes("audiovisuel")) {
    showcase = getMediaVideo(infos.link);
  } else if (
    infos.tags.includes("programmation") ||
    infos.tags.includes("web")
  ) {
    showcase = getMediaLink(infos.link, infos.img, infos.title);
    let seeMore = document.createElement("div");
    seeMore.classList.add("project-see-more");
    seeMore.textContent = "Visiter";
    seeMore.style.position = "absolute";
    showcase.appendChild(seeMore);
    //set 2nd link
    linkContainer.textContent = "Voir plus";
    linkContainer.href = infos.link;
    linkContainer.target = "_blank";
  } else {
    showcase = getMediaImg(infos.img, infos.title);
  }

  showcaseContainer.appendChild(showcase);

  //set variables
  titleContainer.textContent = infos.title;
  titlesContainer.setAttribute("data-date-created", infos.date);
  let tagsText = "";
  infos.tags.forEach((tag) => {
    tagsText += tag + ", ";
  });

  tagsText = tagsText.slice(0, -2);

  tagsContainer.textContent = tagsText;
  roleContainer.textContent = infos.role;
  contextContainer.textContent = infos.context;
  descriptionContainer.textContent = infos.description;
  OnProjectOpen();
}

function getMediaVideo(link) {
  let videoContainer = document.createElement("div");
  videoContainer.classList.add("project-img-container", "showcase");

  let video = document.createElement("iframe");

  video.src = "https://www.youtube.com/embed/" + link.split("=")[1];
  video.classList.add("project-video");
  video.allowFullscreen = true;

  videoContainer.appendChild(video);

  return videoContainer;
}

function getMediaImg(img, title) {
  let div = document.createElement("div");
  div.classList.add("project-img-container", "showcase");

  let imgContainer = document.createElement("div");
  imgContainer.classList.add("project-thumbnail");
  imgContainer.style.backgroundImage = "url(img/full/" + img + ")";
  imgContainer.ariaLabel = "Image du projet " + title;

  div.appendChild(imgContainer);

  return div;
}

function getMediaLink(link, img, title) {
  let linkContainer = document.createElement("a");
  linkContainer.classList.add("project-img-container", "showcase");
  linkContainer.href = link;
  linkContainer.target = "_blank";

  let imgContainer = document.createElement("div");
  imgContainer.classList.add("project-thumbnail");
  imgContainer.style.backgroundImage = "url(img/full/" + img + ")";
  imgContainer.ariaLabel = "Image du projet " + title;

  linkContainer.appendChild(imgContainer);

  return linkContainer;
}

/*
 */
