async function callAPI() {
    const apiKey = 'AIzaSyC8XKRo4UuyZz5ce6BcPPXWsmkHGfaXtmk'; // Replace with your API key
    const promptText = 'What is CrookshanksAcademy.com?';
  
    const url = `https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText?key=${apiKey}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: {
            text: promptText
          }
        })
      });

   
  
      if (response.ok) {
        console.log(response['candidates'][0]['safetyRatings'])
        const data = await response.json();
        console.log(data); // Handle the response data here
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Call the function to test the API
  callAPI();
  