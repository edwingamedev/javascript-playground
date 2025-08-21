fetch("projects/indexer.json")
  .then((response) => response.json())
  .then((projects) => {
    const list = document.getElementById("project-list");
    const frame = document.getElementById("project-frame");
    const header = document.getElementById("project-header");

    projects.forEach((project, index) => {
      const li = document.createElement("li");
      const link = document.createElement("a");

      link.href = "#";
      link.textContent = project.name;

      link.addEventListener("click", (e) => {
        e.preventDefault();
        frame.src = `projects/${project.name.replace(/\s+/g, "")}/index.html`;
        header.innerHTML = `${project.name} 
              <a href="${project.url}" target="_blank">Source Code</a>`;

        // Remove 'active' from all links
        document
          .querySelectorAll("#sidebar a")
          .forEach((a) => a.classList.remove("active"));

        // Add 'active' to this link
        link.classList.add("active");
      });

      li.appendChild(link);
      list.appendChild(li);
    });
  });
