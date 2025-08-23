fetch("projects/indexer.json")
  .then((response) => response.json())
  .then((projects) => {
    const list = document.getElementById("project-list");
    const frame = document.getElementById("project-frame");
    const header = document.getElementById("project-header");
    const baseUrl =
      "https://github.com/edwingamedev/javascript-playground/tree/release/projects";
    projects.forEach((name) => {
      const li = document.createElement("li");
      const link = document.createElement("a");

      link.href = "#";
      link.textContent = name;

      link.addEventListener("click", (e) => {
        e.preventDefault();
        frame.src = `projects/${name}`;
        header.innerHTML = `${name}
              <a href="${baseUrl}/${name}" target="_blank">&ltSource Code&gt</a>`;

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
