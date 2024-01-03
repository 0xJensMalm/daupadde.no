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

  function displayProjectsTable() {
    const projects = [
      {
        name: "Rampenissen iOS app",
        description:
          "Rampestrek generator for småbarnsforeldre som egentlig ikke har kreativt overskudd til rampenissen.",
        language: "Swift",
        githubUrl: "https://github.com/your-username/project1",
      },
      {
        name: "Children of Singularity",
        description:
          "Sosialt eksperiment på Ethereum. En sekt styrt etter medlemenes evne til å løse krypteringsoppgaver i økende vanskelighetsgrad. 6666 unike identiteter døpt på blokkjeden.",
        language: "Solidity, React, Python",
        githubUrl: "https://github.com/your-username/project2",
      },
      {
        name: "Alchemist Wheel",
        description: "Description 3",
        language: "HTML, CSS, JavaScript",
        githubUrl: "https://github.com/your-username/project3",
      },
      {
        name: "WikiNuggets",
        description: "Description 4",
        language: "Python, Flask, HTML, CSS, JavaScript",
        githubUrl: "https://github.com/your-username/project4",
      },
    ];

    let tableHTML = `<h2>Prosjekter</h2>
                     <table>
                       <tr>
                         <th>Navn</th>
                         <th>Beskrivelse</th>
                         <th>Kodespråk</th>
                       </tr>`;

    projects.forEach((project) => {
      tableHTML += `<tr>
                      <td>${project.name} <a href="${project.githubUrl}" target="_blank" class="github-link"><i class="fab fa-github"></i></a></td>
                      <td>${project.description}</td>
                      <td>${project.language}</td>
                    </tr>`;
    });

    tableHTML += `</table>`;

    const mainContent = document.getElementById("mainContent");
    mainContent.innerHTML = tableHTML;
  }

  // Updated Event listeners for main menu items
  document.querySelectorAll("#defaultMenu .menu-item").forEach((item) => {
    item.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");

      // Display projects table for 'Prosjekter'
      if (targetId === "prosjekter-content") {
        displayProjectsTable();
      } else {
        const mainContent = document.getElementById("mainContent");
        mainContent.innerHTML = `<div>Content for ${targetId}</div>`;
      }
    });
  });

  // Toggle Terminal Input Field
  document
    .getElementById("terminalTrigger")
    .addEventListener("click", function () {
      var commandInput = document.getElementById("commandInput");
      commandInput.style.display =
        commandInput.style.display === "none" ? "inline-block" : "none";
      if (commandInput.style.display === "inline-block") {
        commandInput.focus();
      }
    });

  // Event listener for command input
  document
    .getElementById("commandInput")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        processCommand(this.value); // Call processCommand with the entered value
        this.style.display = "none"; // Optionally hide the input field after command is entered
        this.value = ""; // Clear the input field
      }
    });

  // Define the processCommand function
  function processCommand(command) {
    var terminalOutput = document.getElementById("mainContent");

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
        break;
      case "art":
        if (asciiArts && colorPalette) {
          displayRandomAsciiArt(asciiArts, colorPalette);
        }
        break;
      case "clear":
        terminalOutput.innerHTML = "";
        break;
      default:
        terminalOutput.innerHTML = `<p>Unrecognized command: ${command}</p>`;
    }
  }

  // Ensure displayRandomAsciiArt function is defined and works correctly
  // This function should fetch and display ASCII art
  // Make sure asciiArts and colorPalette variables are available and populated
  function displayRandomAsciiArt(asciiArts, colorPalette) {
    // Your logic to display ASCII art here
    // For demonstration purposes, let's assume asciiArts is an array of strings
    const randomIndex = Math.floor(Math.random() * asciiArts.length);
    const asciiArt = asciiArts[randomIndex];
    const randomColorIndex = Math.floor(Math.random() * colorPalette.length);
    const color = colorPalette[randomColorIndex];
    var terminalOutput = document.getElementById("mainContent");
    terminalOutput.innerHTML = `<pre style="color: ${color};">${asciiArt}</pre>`;
  }

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
