// async function sendMessage() {
//   const input = document.getElementById("user-input");
//   const message = input.value;
//   if (!message.trim()) return;

//   appendMessage("user", message);
//   input.value = "";

//   try {
//     const res = await fetch("http://localhost:8000/chat", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ message })
//     });

//     const data = await res.json();
//     appendMessage("bot", data.response);
//   } catch (err) {
//     appendMessage("bot", "⚠️ Error: Could not reach server.");
//   }
// }

// function appendMessage(sender, text) {
//   const chatBox = document.getElementById("chat-box");
//   const p = document.createElement("p");
//   p.innerHTML = `<strong>${sender}:</strong> ${text}`;
//   chatBox.appendChild(p);
//   chatBox.scrollTop = chatBox.scrollHeight;
// }




// async function sendMessage() {
//   const input = document.getElementById("user-input");
//   const message = input.value;
//   if (!message.trim()) return;

//   appendMessage("user", message);
//   input.value = "";

//   try {
//     const res = await fetch("http://localhost:8000/chat", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ message })
//     });

//     const data = await res.json();
//     appendMessage("bot", data.response);
//   } catch (err) {
//     appendMessage("bot", "⚠️ Error: Could not reach server.");
//   }
// }

// function appendMessage(sender, text) {
//   const chatBox = document.getElementById("chat-box");
//   const msgDiv = document.createElement("div");
//   msgDiv.className = sender === "user" ? "user-message" : "bot-message";
//   msgDiv.textContent = text;
//   chatBox.appendChild(msgDiv);
//   chatBox.scrollTop = chatBox.scrollHeight;
// }





async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  appendMessage("user", message);
  input.value = "";

  // Add typing/loading indicator
  const loadingId = appendMessage("bot", "typing...", true);

  try {
    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    updateMessage(loadingId, data.response);
  } catch (err) {
    updateMessage(loadingId, "⚠️ Error: Could not reach server.");
  }
}

// function appendMessage(sender, text, isLoading = false) {
//   const chatBox = document.getElementById("chat-box");
//   const msgDiv = document.createElement("div");
//   const id = `msg-${Date.now()}`;

//   msgDiv.className = sender === "user" ? "user-message" : "bot-message";
//   msgDiv.id = id;
//   // msgDiv.innerHTML = isLoading ? `<span class="typing-dots"></span>` : text;
//   msgDiv.innerHTML = isLoading ? `<span class="typing-dots"><span></span></span>` : text;

//   chatBox.appendChild(msgDiv);
//   chatBox.scrollTop = chatBox.scrollHeight;

//   return id; // return ID for future update
// }

function appendMessage(sender, text, isLoading = false) {
  const chatBox = document.getElementById("chat-box");
  const msgDiv = document.createElement("div");

  // Create a more unique ID using sender + timestamp + random value
  const id = `msg-${sender}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  msgDiv.className = sender === "user" ? "user-message" : "bot-message";
  msgDiv.id = id;
  msgDiv.innerHTML = isLoading ? `<span class="typing-dots"><span></span></span>` : text;

  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;

  return id;
}


function updateMessage(id, newText) {
  const msg = document.getElementById(id);
  if (msg) {
    msg.textContent = newText;
  }
}

// Listen for Enter key press
document.getElementById("user-input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission
    sendMessage();
  }
});
