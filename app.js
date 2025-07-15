
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

const lawSections = [
  {
    keywords: ["blackmail", "extortion"],
    section: "IPC Section 384",
    summary: "Punishment for extortion and blackmail."
  },
  {
    keywords: ["hack", "account", "identity theft"],
    section: "IT Act Section 66C",
    summary: "Covers identity theft and misuse of digital identity."
  },
  {
    keywords: ["stalking", "harass", "follow"],
    section: "IPC Section 354D",
    summary: "Deals with stalking, especially of women."
  },
  {
    keywords: ["abuse", "threat", "violence"],
    section: "IPC Section 506",
    summary: "Punishment for criminal intimidation."
  }
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/check", (req, res) => {
  const input = req.body.query.toLowerCase();
  let matches = [];

  lawSections.forEach(entry => {
    for (const keyword of entry.keywords) {
      if (input.includes(keyword)) {
        matches.push(entry);
        break;
      }
    }
  });

  if (matches.length === 0) {
    res.send(`<h2>No specific IPC/IT section identified.</h2><a href='/'>Back</a>`);
  } else {
    let resultHTML = "<h2>Relevant Law Sections:</h2><ul>";
    matches.forEach(m => {
      resultHTML += `<li><strong>${m.section}:</strong> ${m.summary}</li>`;
    });
    resultHTML += "</ul><a href='/'>Back</a>";
    res.send(resultHTML);
  }
});

app.listen(PORT, () => {
  console.log(`LawBot running on http://localhost:${PORT}`);
});
