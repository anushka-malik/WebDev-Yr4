const hardcodedBlogs = [
  {
    title: "Tech Trends",
    author: "Alice Johnson",
    category: "Technology",
    description: "Exploring the latest in AI, VR, and blockchain technologies.",
    date: "22/07/2025"
  },
  {
    title: "Healthy Living",
    author: "Dr. Meera Kapoor",
    category: "Health",
    description: "Tips on balanced diet, exercise routines, and stress management.",
    date: "20/07/2025"
  },
  {
    title: "Travel Diaries",
    author: "Raj Patel",
    category: "Travel",
    description: "Adventures from the mountains of Himachal to the beaches of Goa.",
    date: "18/07/2025"
  },
  {
    title: "Physical Fitness",
    author: "Suresh Yadav",
    category: "Health",
    description: "Daily workout plans, fitness goals, and tracking progress effectively.",
    date: "21/07/2025"
  }
];

function getStoredBlogs() {
  const stored = localStorage.getItem("customBlogs");
  return stored ? JSON.parse(stored) : [];
}

function saveBlog(blog) {
  const existing = getStoredBlogs();
  existing.push(blog);
  localStorage.setItem("customBlogs", JSON.stringify(existing));
}

function renderBlogs(blogList) {
  const blogContainer = document.getElementById("blogContainer");
  if (!blogContainer) return;

  blogContainer.innerHTML = "";
  blogList.forEach(blog => {
    const card = document.createElement("div");
    card.className = "blog-card";
    card.innerHTML = `
      <h3>${blog.title}</h3>
      <p><strong>Author:</strong> ${blog.author}</p>
      <p><strong>Date:</strong> ${blog.date}</p>
      <p><strong>Category:</strong> ${blog.category}</p>
      <p>${blog.description}</p>
    `;
    blogContainer.appendChild(card);
  });
}

function loadAndRenderAllBlogs() {
  const combined = [...hardcodedBlogs, ...getStoredBlogs()];
  renderBlogs(combined);
  return combined;
}

function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
}

const searchInput = document.getElementById("searchInput");
const handleSearch = debounce(() => {
  const query = searchInput?.value.trim();
  const allBlogs = [...hardcodedBlogs, ...getStoredBlogs()];
  if (query !== "") {
    const filtered = allBlogs.filter(
      blog => blog.category.toLowerCase() === query.toLowerCase()
    );
    renderBlogs(filtered);
  } else {
    renderBlogs(allBlogs);
  }
}, 500);

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  if (document.getElementById("blogContainer")) {
    loadAndRenderAllBlogs();
    if (searchInput) searchInput.addEventListener("input", handleSearch);
  }

  const blogForm = document.getElementById("blogForm");
  if (blogForm) {
    blogForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const title = document.getElementById("title").value.trim();
      const author = document.getElementById("author").value.trim();
      const category = document.getElementById("category").value.trim();
      const description = document.getElementById("description").value.trim();
      const date = new Date().toLocaleDateString("en-GB");

      if (title && author && category && description) {
        const newBlog = { title, author, category, description, date };
        saveBlog(newBlog);
        alert("Blog added successfully!");

        blogForm.reset();
      } else {
        alert("Please fill in all fields.");
      }
    });
  }
});


