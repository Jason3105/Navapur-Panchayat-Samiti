// Gemini API Configuration
const GEMINI_API_KEY = 'AIzaSyAj9NCp0-9909MPLfds93gsO_gANOITjQQ';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// DOM Elements (updated IDs)
const chatToggleBtn = document.getElementById('navapur-chat-toggle-btn');
const chatWindow = document.getElementById('navapur-chat-window');
const chatInput = document.getElementById('navapur-chat-input');
const sendButton = document.getElementById('navapur-send-button');
const messagesContainer = document.getElementById('navapur-chat-messages');
const languageSelect = document.getElementById('navapur-language-selector');

// Panchayat context prompt to ensure responses stay within domain
const PANCHAYAT_CONTEXT = `You are Panchayat Samiti of Navapur AI, an AI assistant specifically designed for the Panchayat Samiti of Navapur. You provide information about:
- Navapur Panchayat Samiti services, schemes, and programs
- Government schemes available through Navapur Panchayat Samiti
- Local governance matters related to Navapur
- Procedures and processes specific to Navapur Panchayat Samiti
- Contact information and office details for Navapur Panchayat Samiti

Follow these guidelines:
- ALWAYS assume questions are related to Navapur Panchayat Samiti unless explicitly stated otherwise
- Provide helpful, accurate information about Navapur Panchayat Samiti services and schemes
- Reference previous conversations and maintain context throughout the chat session
- DO NOT answer questions that are completely irrelevant to panchayat services - politely redirect to Navapur Panchayat Samiti related topics
- When uncertain about specific Navapur procedures, acknowledge limitations and suggest consultation with Navapur Panchayat Samiti office staff
- IMPORTANT: Always maintain consistency in the language requested by the user throughout the conversation
- Remember and reference previous parts of the conversation when relevant`;

// Active language (default: English)
let activeLanguage = 'en';

// Conversation history to maintain context
let conversationHistory = [];

// Initialize the chat
function initChat() {
    // Toggle chat window visibility
    chatToggleBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            chatInput.focus();
            // If this is first open, show welcome message
            if (messagesContainer.childElementCount === 0) {
                const welcomeMsg = getWelcomeMessage(activeLanguage);
                addBotMessage(welcomeMsg);
                // Add welcome message to conversation history
                conversationHistory.push({
                    role: 'model',
                    parts: [{ text: welcomeMsg }]
                });
            }
        }
    });

    // Language selection event
    languageSelect.addEventListener('change', (e) => {
        const oldLanguage = activeLanguage;
        activeLanguage = e.target.value;
        
        // Clear conversation history when language changes to ensure clean context
        conversationHistory = [];
        
        // Add a system message about language change
        const changeMsg = getLanguageChangeMessage(activeLanguage);
        addBotMessage(changeMsg);
        
        // Initialize conversation history with language context
        conversationHistory.push({
            role: 'model',
            parts: [{ text: changeMsg }]
        });
    });

    // Send message events
    sendButton.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
}

// Get welcome message in selected language
function getWelcomeMessage(language) {
    const welcomeMessages = {
        'en': 'Welcome to Panchayat Samiti of Navapur AI assistant. I can help you with information about Navapur Panchayat Samiti services, schemes, and procedures. How can I assist you today?',
        'hi': 'नवापुर पंचायत समिति AI सहायक में आपका स्वागत है। मैं नवापुर पंचायत समिति की सेवाओं, योजनाओं और प्रक्रियाओं के बारे में जानकारी प्रदान कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?',
        'mr': 'नवापूर पंचायत समिती AI सहाय्यकामध्ये आपले स्वागत आहे. मी नवापूर पंचायत समितीच्या सेवा, योजना आणि प्रक्रियांबद्दल माहिती देऊ शकतो. आज मी तुमची कशी मदत करू शकतो?',
        'gu': 'નવાપુર પંચાયત સમિતિ AI સહાયકમાં આપનું સ્વાગત છે. હું નવાપુર પંચાયત સમિતિની સેવાઓ, યોજનાઓ અને પ્રક્રિયાઓ વિશે માહિતી આપી શકું છું. આજે હું તમારી કેવી રીતે સહાય કરી શકું?',
        'ta': 'நவாபூர் பஞ்சாயத்து சமிதி AI உதவியாளரில் உங்களை வரவேற்கிறோம். நவாபூர் பஞ்சாயத்து சமிதியின் சேவைகள், திட்டங்கள் மற்றும் நடைமுறைகள் பற்றிய தகவல்களை நான் வழங்க முடியும். இன்று நான் உங்களுக்கு எப்படி உதவ முடியும்?',
        'te': 'నవాపూర్ పంచాయతీ సమితి AI సహాయకుడికి స్వాగతం. నేను నవాపూర్ పంచాయతీ సమితి సేవలు, పథకాలు మరియు విధానాల గురించి సమాచారం అందించగలను. ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?',
        'kn': 'ನವಾಪುರ್ ಪಂಚಾಯತ್ ಸಮಿತಿ AI ಸಹಾಯಕಕ್ಕೆ ಸ್ವಾಗತ. ನಾನು ನವಾಪುರ್ ಪಂಚಾಯತ್ ಸಮಿತಿಯ ಸೇವೆಗಳು, ಯೋಜನೆಗಳು ಮತ್ತು ಕಾರ್ಯವಿಧಾನಗಳ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡಬಹುದು. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
        'ml': 'നവാപൂർ പഞ്ചായത്ത് സമിതി AI സഹായകത്തിലേക്ക് സ്വാഗതം. നവാപൂർ പഞ്ചായത്ത് സമിതിയുടെ സേവനങ്ങൾ, പദ്ധതികൾ, നടപടിക്രമങ്ങൾ എന്നിവയെക്കുറിച്ചുള്ള വിവരങ്ങൾ എനിക്ക് നൽകാൻ കഴിയും. ഇന്ന് ഞാൻ എങ്ങനെ നിങ്ങളെ സഹായിക്കാം?'
    };
    return welcomeMessages[language] || welcomeMessages['en'];
}

// Get language change message
function getLanguageChangeMessage(language) {
    const changeMessages = {
        'en': "I've switched to English. I can help you with Navapur Panchayat Samiti services and information. How can I assist you?",
        'hi': 'मैंने हिंदी में बदल दिया है। मैं नवापुर पंचायत समिति की सेवाओं और जानकारी में आपकी सहायता कर सकता हूं। मैं आपकी कैसे सहायता कर सकता हूं?',
        'mr': 'मी मराठीत बदललो आहे. मी नवापूर पंचायत समितीच्या सेवा आणि माहितीसाठी तुमची मदत करू शकतो. मी तुमची कशी मदत करू शकतो?',
        'gu': 'મેં ગુજરાતીમાં બદલાવ કર્યો છે. હું નવાપુર પંચાયત સમિતિની સેવાઓ અને માહિતી માટે તમારી મદદ કરી શકું છું. હું તમારી કેવી રીતે મદદ કરી શકું?',
        'ta': 'நான் தமிழுக்கு மாறிவிட்டேன். நவாபூர் பஞ்சாயத்து சமிதி சேவைகள் மற்றும் தகவலுக்கு நான் உங்களுக்கு உதவ முடியும். நான் உங்களுக்கு எப்படி உதவ முடியும்?',
        'te': 'నేను తెలుగుకు మార్చాను. నవాపూర్ పంచాయతీ సమితి సేవలు మరియు సమాచారానికి నేను మీకు సహాయం చేయగలను. నేను మీకు ఎలా సహాయం చేయగలను?',
        'kn': 'ನಾನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿದ್ದೇನೆ. ನವಾಪುರ್ ಪಂಚಾಯತ್ ಸಮಿತಿಯ ಸೇವೆಗಳು ಮತ್ತು ಮಾಹಿತಿಗಾಗಿ ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಹುದು. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
        'ml': 'ഞാൻ മലയാളത്തിലേക്ക് മാറിയിരിക്കുന്നു. നവാപൂർ പഞ്ചായത്ത് സമിതി സേവനങ്ങൾക്കും വിവരങ്ങൾക്കുമായി എനിക്ക് നിങ്ങളെ സഹായിക്കാം. ഞാൻ എങ്ങനെ നിങ്ങളെ സഹായിക്കാം?'
    };
    return changeMessages[language] || changeMessages['en'];
}

// Maps language codes to full names
function getLanguageName(code) {
    const languages = {
        'en': 'English',
        'hi': 'Hindi (हिंदी)',
        'mr': 'Marathi (मराठी)',
        'gu': 'Gujarati (ગુજરાતી)',
        'ta': 'Tamil (தமிழ்)',
        'te': 'Telugu (తెలుగు)',
        'kn': 'Kannada (ಕನ್ನಡ)',
        'ml': 'Malayalam (മലയാളം)'
    };
    return languages[code] || 'English';
}

// Get language instruction for API
function getLanguageInstruction(language) {
    const instructions = {
        'en': 'Please respond only in English.',
        'hi': 'कृपया केवल हिंदी में उत्तर दें। Please respond only in Hindi language.',
        'mr': 'कृपया फक्त मराठी भाषेत उत्तर द्या। Please respond only in Marathi language.',
        'gu': 'કૃપા કરીને ફક્ત ગુજરાતી ભાષામાં જવાબ આપો। Please respond only in Gujarati language.',
        'ta': 'தயவுசெய்து தமிழில் மட்டுமே பதிலளிக்கவும். Please respond only in Tamil language.',
        'te': 'దయచేసి తెలుగులో మాత్రమే సమాధానం ఇవ్వండి। Please respond only in Telugu language.',
        'kn': 'ದಯವಿಟ್ಟು ಕನ್ನಡದಲ್ಲಿ ಮಾತ್ರ ಉತ್ತರಿಸಿ। Please respond only in Kannada language.',
        'ml': 'ദയവായി മലയാളത്തിൽ മാത്രം ഉത്തരം നൽകുക। Please respond only in Malayalam language.'
    };
    return instructions[language] || instructions['en'];
}

// Handle sending a message
function handleSendMessage() {
    const message = chatInput.value.trim();
    if (message.length === 0) return;
    
    // Add user message to chat
    addUserMessage(message);
    
    // Add user message to conversation history
    conversationHistory.push({
        role: 'user',
        parts: [{ text: message }]
    });
    
    // Clear input field
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get response from AI
    getAIResponse(message);
}

// Add a user message to the chat
function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('navapur-message', 'navapur-user-message');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    scrollToBottom();
}

// Add a bot message to the chat
function addBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('navapur-message', 'navapur-bot-message');
    // Use marked to convert markdown to HTML
    messageElement.innerHTML = marked.parse(message);
    messagesContainer.appendChild(messageElement);
    scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
    const typingElement = document.createElement('div');
    typingElement.classList.add('navapur-message', 'navapur-bot-message', 'navapur-typing-indicator');
    typingElement.innerHTML = '<span></span><span></span><span></span>';
    typingElement.id = 'navapur-typing-indicator';
    messagesContainer.appendChild(typingElement);
    scrollToBottom();
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingElement = document.getElementById('navapur-typing-indicator');
    if (typingElement) {
        typingElement.remove();
    }
}

// Scroll chat to bottom
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Get AI response from Gemini API
async function getAIResponse(userMessage) {
    try {
        // Create the system message with context and language instruction
        const systemMessage = `${PANCHAYAT_CONTEXT}\n\n${getLanguageInstruction(activeLanguage)}\n\nIMPORTANT: 
        1. You must respond in ${getLanguageName(activeLanguage)} language consistently throughout this conversation. Do not switch languages.
        2. Always assume questions are about Navapur Panchayat Samiti unless explicitly mentioned otherwise.
        3. Remember and reference previous parts of our conversation when relevant.
        4. If users ask general questions without mentioning Navapur, interpret them in the context of Navapur Panchayat Samiti services.
        5. Maintain conversation memory and continuity throughout our chat session.`;
        
        // Prepare the conversation contents
        const contents = [
            {
                role: 'user',
                parts: [{ text: systemMessage }]
            },
            ...conversationHistory
        ];

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: contents,
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        const data = await response.json();
        
        // Remove typing indicator
        removeTypingIndicator();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            addBotMessage(aiResponse);
            
            // Add AI response to conversation history
            conversationHistory.push({
                role: 'model',
                parts: [{ text: aiResponse }]
            });
            
            // Limit conversation history to prevent token overflow (keep last 10 exchanges)
            if (conversationHistory.length > 20) {
                conversationHistory = conversationHistory.slice(-20);
            }
        } else {
            // Handle API error
            const errorMsg = getErrorMessage(activeLanguage);
            addBotMessage(errorMsg);
            console.error("API Response Error:", data);
        }
    } catch (error) {
        // Remove typing indicator
        removeTypingIndicator();
        
        // Handle error
        const errorMsg = getErrorMessage(activeLanguage);
        addBotMessage(errorMsg);
        console.error("API Error:", error);
    }
}

// Get error message in selected language
function getErrorMessage(language) {
    const errorMessages = {
        'en': "I'm having trouble connecting right now. Please try again later.",
        'hi': 'मुझे अभी कनेक्ट करने में समस्या हो रही है। कृपया बाद में पुनः प्रयास करें।',
        'mr': 'मला आत्ता कनेक्ट होण्यात समस्या येत आहे. कृपया नंतर पुन्हा प्रयत्न करा.',
        'gu': 'મને અત્યારે કનેક્ટ કરવામાં સમસ્યા આવી રહી છે. કૃપા કરીને પછીથી ફરીથી પ્રયાસ કરો.',
        'ta': 'எனக்கு இப்போது இணைப்பதில் சிக்கல் உள்ளது. தயவுசெய்து பின்னர் மீண்டும் முயற்சிக்கவும்.',
        'te': 'నాకు ఇప్పుడు కనెక్ట్ చేయడంలో సమస్య ఉంది. దయచేసి తర్వాత మళ్లీ ప్రయత్నించండి.',
        'kn': 'ನನಗೆ ಈಗ ಸಂಪರ್ಕಿಸುವಲ್ಲಿ ತೊಂದರೆ ಇದೆ. ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
        'ml': 'എനിക്ക് ഇപ്പോൾ കണക്റ്റ് ചെയ്യുന്നതിൽ പ്രശ്നമുണ്ട്. ദയവായി പിന്നീട് വീണ്ടും ശ്രമിക്കുക.'
    };
    return errorMessages[language] || errorMessages['en'];
}

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', initChat);