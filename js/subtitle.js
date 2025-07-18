function getRandomGreeting() {
  var greetings = [
    "Beep boop! Are you a robot?",
    "Made you look!",
    "Redbull gives you wings...",
    "Since 2025!",
    "Made in the US!",
    "Made by EZ123!",
    "Downloading your passwords...",
    "Running virus.exe",
    "WARNING: You may lose braincells if you proceed!",
    "Aiden this is not malware....",
    "Programmed in 5 days",
    "Proxy powered by Sandstone",
    "Vplaza = Skidplaza",
    "If u skid this shame on you",
    "Nuke incoming in 3.... 2.... 1...",
  ];
  var randomIndex = Math.floor(Math.random() * greetings.length);
  return greetings[randomIndex];
}

const subtitleEl = document.getElementById("subtitle");
subtitleEl.addEventListener("click", () => {
  subtitleEl.innerText = getRandomGreeting();
});
