document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");
  
    sendButton.addEventListener("click", function () {
      const userMessage = userInput.value;
      if (userMessage.trim() === "") return;
  
      document.getElementById("description").classList.add("invisible");
      appendUserMessage(userMessage);
      toggleChatBox();
      callAPI(userMessage);
      userInput.value = "";
    });
  
    function appendUserMessage(message) {
      const userDivParent = document.createElement("div");
      userDivParent.classList.add("user-parent-div");
      const userDiv = document.createElement("div");
      userDiv.classList.add("user-message");
      userDiv.innerText = message;
      userDivParent.appendChild(userDiv);
      chatContainer.appendChild(userDivParent);
    }
  
    function appendBotMessage(message) {
      const botDivParent = document.createElement("div");
      botDivParent.classList.add("bot-parent-div");
      const botDiv = document.createElement("div");
      botDiv.classList.add("bot-message");
      botDiv.innerText = message;
      botDivParent.appendChild(botDiv);
      chatContainer.appendChild(botDivParent);
    }
  
    async function callAPI(message) {
      const apiKey = "AIzaSyC8XKRo4UuyZz5ce6BcPPXWsmkHGfaXtmk"; // Replace with your API key
      const url = `https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=${apiKey}`;
  
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: {
              text: message,
            },
            // temperature: 1,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          var generatedText;
          var harmMessage = false;
          try {
            generatedText = data["candidates"][0]["output"];
          } catch (e) {
            try {
              data["candidates"][0]["safetyRatings"][0]["probability"];
            } catch (e) {
              harmMessage = true;
              appendBotMessage(
                "I am sorry, but I cannot answer your question, because it was too violent, extreme, dangerous or had malicious intentions."
              );
              toggleChatBox();
            }
          }
  
          if (generatedText) {
            if(generatedText.includes("PaLM")){
              generatedText = "God made me.";
            }
  
            // if(["who created you","who made you","who invented you"].includes(message.toLowerCase())){
            //   generatedText = "VOILA"
            // }
            appendBotMessage(generatedText);
            toggleChatBox();
            // chatContainer.scrollTop = chatContainer.scrollHeight;
            document.getElementById("scrollToBottom").scrollIntoView();
          } else if (harmMessage) {
            //do nothing
          } else {
            appendBotMessage("Sorry, I couldn't understand that. 🥺");
            toggleChatBox();
          }
        } else {
          throw new Error("Failed to fetch");
        }
      } catch (error) {
        console.error("Error:", error);
        appendBotMessage("Sorry, there was a problem with my servers 🥺.");
        toggleChatBox();
      }
    }
  });
  
  function setTextAreaValue(textAreaValue) {
    const textArea = document.getElementById("user-input");
    textArea.value = textAreaValue;
    document.getElementById("send-btn").click();
  }
  
  function toggleMenu() {
    const menu = document.getElementById("menu");
    const mainF = document.getElementById("main")
    menu.classList.toggle("showmenu");
    mainF.classList.toggle("invisible");
  }
  
  function toggleChatBox() {
    const chatBox = document.getElementById("inputbox");
    const loadingBox = document.getElementById("loadingBox");
  
    chatBox.classList.toggle("invisible");
    loadingBox.classList.toggle("invisible");
  }
  