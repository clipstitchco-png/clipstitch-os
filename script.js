const body = document.body;
const root = document.documentElement;
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const themeToggle = document.getElementById("themeToggle");
const progressBar = document.getElementById("progressBar");
const backToTop = document.getElementById("backToTop");
const searchInput = document.getElementById("globalSearch");
const emptyState = document.querySelector(".empty-state");

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const storedTheme = localStorage.getItem("clipstitch-theme");

if (storedTheme) {
  root.setAttribute("data-theme", storedTheme);
} else if (prefersDark) {
  root.setAttribute("data-theme", "dark");
}

const updateThemeButton = () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  themeToggle.textContent = isDark ? "☀" : "☾";
};

updateThemeButton();

window.addEventListener("load", () => {
  body.classList.add("loaded");
  document.querySelectorAll(".reveal").forEach((item, index) => {
    setTimeout(() => item.classList.add("is-visible"), 80 * index);
  });
});

document.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxHeight > 0 ? (scrollTop / maxHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
  backToTop.classList.toggle("visible", scrollTop > 420);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

sidebarToggle?.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", nextTheme);
  localStorage.setItem("clipstitch-theme", nextTheme);
  updateThemeButton();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

searchInput?.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase().trim();
  const targets = document.querySelectorAll(".search-target");
  let matches = 0;

  targets.forEach((item) => {
    const text = item.textContent.toLowerCase();
    const shouldShow = text.includes(query);
    item.style.display = shouldShow ? "block" : "none";
    if (shouldShow) matches += 1;
  });

  if (emptyState) {
    emptyState.classList.toggle("active", matches === 0 && query.length > 0);
  }
});

const orgNodes = document.querySelectorAll(".org-node");
const orgDetails = document.getElementById("orgDetails");
const orgTitle = document.getElementById("orgTitle");
const orgCopy = document.getElementById("orgCopy");

const detailMap = {
  founder: {
    title: "Founder & Creative Director",
    copy: "Aditya Sinha shapes the studio’s creative direction, client experience, and long-term brand philosophy."
  },
  coo: {
    title: "Chief Operating Officer",
    copy: "Priyanshu Dutta leads the operational cadence, execution planning, and delivery clarity across teams."
  },
  cco: {
    title: "Chief Commercial Officer",
    copy: "Nishka Atanu Tarafdar leads growth, partnerships, business development, and client-facing commercial strategy."
  },
  strategy: {
    title: "Brand Strategy",
    copy: "The strategy team defines positioning, narrative, and the strategic foundations behind each engagement."
  },
  production: {
    title: "Production",
    copy: "Production ensures project delivery is organized, precise, and aligned with timelines and output quality."
  },
  editing: {
    title: "Editing",
    copy: "Editing brings polish, rhythm, and cohesive execution to final assets and deliverables."
  },
  design: {
    title: "Design",
    copy: "Design translates strategic thinking into visual systems, assets, and client-facing experiences."
  },
  bd: {
    title: "Business Development",
    copy: "Business development initiates opportunity, prepares proposals, and nurtures commercial relationships."
  }
};

orgNodes.forEach((node) => {
  node.addEventListener("click", () => {
    orgNodes.forEach((item) => item.classList.remove("active"));
    node.classList.add("active");
    const entry = detailMap[node.dataset.target];
    if (entry && orgTitle && orgCopy) {
      orgTitle.textContent = entry.title;
      orgCopy.textContent = entry.copy;
    }
  });
});

window.addEventListener("click", (event) => {
  if (window.innerWidth <= 840 && sidebar && !sidebar.contains(event.target) && !sidebarToggle?.contains(event.target)) {
    sidebar.classList.remove("open");
  }
});
