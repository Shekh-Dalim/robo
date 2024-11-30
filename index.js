document.getElementById('micButton').addEventListener('click', () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false; // Stop after each result for immediate action
        recognition.interimResults = false;

        recognition.onstart = () => {
            console.log('Voice recognition started. Speak into the microphone.');
        };

        recognition.onresult = (event) => {
            let finalTranscript = event.results[0][0].transcript.trim().toLowerCase();
            console.log('Final speech:', finalTranscript);

            // Populate the input field (optional)
            const inputField = document.getElementById('searchInput');
            if (inputField) {
                inputField.value = finalTranscript; // Display the recognized text in an input field
            }

            // Function to speak the recognized text back to the user
            const speak = (message) => {
                const utterance = new SpeechSynthesisUtterance(message);
                const voices = window.speechSynthesis.getVoices();
                const femaleVoice = voices.find(voice => 
                    voice.lang.startsWith('en') && 
                    voice.name.toLowerCase().includes('female')
                ) || voices[0];
                
                if (femaleVoice) {
                    utterance.voice = femaleVoice;
                }

                // Speak the message
                window.speechSynthesis.speak(utterance);
            };

            // Determine which link to open based on the recognized speech
            switch (finalTranscript) {
                case 'linkedin':
                    speak('Opening your LinkedIn profile.');
                    window.open('https://leetcode.com/u/Shekh_Dalim/', "_blank");
                    break;
                case 'resume':
                    speak('Opening your resume.');
                    window.open('file:///C:/Users/Shekh%20Dalim/Downloads/RenderCV_sb2nov_Theme%20(1).pdf', "_blank");
                    break;
                case 'github':
                    speak('Opening your GitHub profile.');
                    window.open('https://github.com/Shekh-Dalim', "_blank");
                    break;
                case 'codeforces':
                    speak('Opening your Codeforces profile.');
                    window.open('https://codeforces.com/profile/Dalim', "_blank");
                    break;
                default:
                    // Speak the recognized text back to the user for unrecognized commands
                    speak(`You said: ${finalTranscript}. Redirecting to Google...`);

                    // Construct the Google search URL using the recognized text
                    const url = `https://www.google.com/search?q=${encodeURIComponent(finalTranscript)}`;

                    // Open the Google search URL
                    window.open(url, "_blank");
                    break;
            }

            recognition.stop(); // Stop recognition immediately after handling the result
        };

        recognition.onerror = (error) => {
            console.error("Speech recognition error detected:", error);
            alert("Speech recognition error. Please try again.");
        };

        recognition.start();
    } else {
        alert("Speech recognition not supported in this browser.");
    }
});
