document.addEventListener("DOMContentLoaded", function () {
  let asciiArts;
  const colorPalette = [
    "#FF5733",
    "#33FF57",
    "#DB2D20", // Rustrød
    "#FDED02", // Gul
    "#B5E4F4", // Lyseblå
    "#8308FF", // Lilla
    "#FFB900", // Oransje
  ];

  // Fetch and parse the ASCII art HTML file
  function fetchAsciiArt() {
    return fetch("ascii.html")
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(data, "text/html");
        return Array.from(htmlDoc.querySelectorAll("pre")).map(
          (pre) => pre.innerHTML
        );
      })
      .catch((error) => console.error("Error fetching ASCII art:", error));
  }

  fetchAsciiArt().then((arts) => {
    asciiArts = arts;
  });

  // Event listener for terminal trigger
  document
    .getElementById("terminalTrigger")
    .addEventListener("click", function () {
      var inputArea = document.getElementById("inputArea");
      inputArea.style.display =
        inputArea.style.display === "none" ? "flex" : "none";
      if (inputArea.style.display === "flex") {
        document.getElementById("commandInput").focus();
      }
    });

  // Event listeners for menu items
  const mainContent = document.getElementById("mainContent");
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");

      // If 'Prosjekter' is clicked, show project list, otherwise show/hide content
      if (targetId === "prosjekter-content") {
        mainContent.innerHTML = `
          <ul class="project-list">
            <li class="menu-item" data-target="rampenissen-content">- Rampenissen IOS app</li>
            <li class="menu-item" data-target="singularity-content">- Children of Singularity</li>
            <li class="menu-item" data-target="alchemist-content">- Alchemist Wheel</li>
            <li class="menu-item" data-target="wikinuggets-content">- WikiNuggets</li>
          </ul>
        `;
      } else {
        mainContent.innerHTML = `<div>Content for ${targetId}</div>`;
      }
    });
  });

  // Event listener for command input
  var commandInput = document.getElementById("commandInput");
  commandInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      processCommand(this.value);
      this.value = ""; // Clear the input after command is entered
    }
  });

  // Function to process commands
  function processCommand(command) {
    var terminalOutput = document.getElementById("terminalOutput");

    switch (command.toLowerCase()) {
      case "commands":
        terminalOutput.innerHTML = `
          <p>Commands:</p>
          <ul>
              <li>- commands</li>
              <li>- password</li>
              <li>- theme ls</li>
              <li>- art</li>
              <li>- clear</li>
          </ul>`;
        terminalOutput.style.display = "block";
        break;
      case "art":
        if (asciiArts && colorPalette) {
          displayRandomAsciiArt(asciiArts, colorPalette);
        }
        break;
      case "clear":
        terminalOutput.innerHTML = "";
        terminalOutput.style.display = "none";
        break;
      default:
        terminalOutput.innerHTML = `<p>Ukjent kommando: ${command}</p>`;
        terminalOutput.style.display = "block";
    }
  }

  // Function to display random ASCII art
  function displayRandomAsciiArt(asciiArts, colorPalette) {
    const randomArt = asciiArts[Math.floor(Math.random() * asciiArts.length)];
    const randomColor =
      colorPalette[Math.floor(Math.random() * colorPalette.length)];
    var terminalOutput = document.getElementById("terminalOutput");
    terminalOutput.innerHTML = `<pre style="color: ${randomColor};">${randomArt}</pre>`;
    terminalOutput.style.display = "block";
  }

  // Function to update visit count
  function updateVisitCount() {
    let count = localStorage.getItem("visitCount");
    count = count ? parseInt(count) : 0;
    count++;
    localStorage.setItem("visitCount", count.toString());
    document.getElementById("visitCount").textContent = count;
  }

  // Update visit count on page load
  updateVisitCount();
});
