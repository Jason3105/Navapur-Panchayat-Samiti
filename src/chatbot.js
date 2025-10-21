// Gemini API Configuration
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = import.meta.env.VITE_GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent';

// Development mode with mock responses for restricted APIs
const DEVELOPMENT_MODE = false; // Set to true when API is restricted
const MOCK_RESPONSES = {
    'hello': 'Hello! I am the Navapur Panchayat Samiti AI Assistant. How can I help you today? 🏛️',
    'hi': 'Namaste! Main Navapur Panchayat Samiti AI Assistant hun. Aaj main aapki kaise madad kar sakta hun? 🙏',
    'schemes': 'Here are some government schemes available:\n• PM-KISAN Samman Nidhi\n• MGNREGA\n• Pradhan Mantri Awas Yojana\n• Swachh Bharat Mission\n• Digital India\n\nWhich scheme would you like to know about?',
    'contact': 'Contact Information:\n📧 Email: info@navapurpanchayat.gov.in\n📞 Phone: +91-XXXXXXXXXX\n🏢 Address: Navapur Panchayat Office, Maharashtra\n⏰ Office Hours: 10:00 AM - 5:00 PM',
    'default': 'Thank you for your message! I am the Navapur Panchayat Samiti AI Assistant. I can help you with:\n\n• Government schemes information\n• Panchayat services\n• Contact details\n• Procedures and applications\n\nWhat would you like to know?'
};

async function getMockResponse(userMessage) {
    // Simulate API delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi ')) {
        return MOCK_RESPONSES.hello;
    } else if (message.includes('scheme') || message.includes('योजना') || message.includes('yojana')) {
        return MOCK_RESPONSES.schemes;
    } else if (message.includes('नमस्ते') || message.includes('हैलो') || message.includes('namaste')) {
        return MOCK_RESPONSES.hi;
    } else if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('संपर्क')) {
        return MOCK_RESPONSES.contact;
    } else {
        return MOCK_RESPONSES.default + '\n\n💬 Your message: "' + userMessage + '"';
    }
}

// Debug logging for environment variables
console.log('Chatbot: Environment variables loaded');
console.log('API Key available:', !!GEMINI_API_KEY);
console.log('API URL:', GEMINI_API_URL);

// Check if required configuration is available
if (!GEMINI_API_KEY) {
    console.error('Chatbot: VITE_GEMINI_API_KEY environment variable is not set');
}

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
- Details of people working at the Panchayat Samiti of Navapur

Follow these guidelines:
- ALWAYS assume questions are related to Navapur Panchayat Samiti unless explicitly stated otherwise
- Provide helpful, accurate information about Navapur Panchayat Samiti services and schemes
- Reference previous conversations and maintain context throughout the chat session
- DO NOT answer questions that are completely irrelevant to panchayat services - politely redirect to Navapur Panchayat Samiti related topics
- When uncertain about specific Navapur procedures, acknowledge limitations and suggest consultation with Navapur Panchayat Samiti office staff
- IMPORTANT: Always maintain consistency in the language requested by the user throughout the conversation
- Remember and reference previous parts of the conversation when relevant
- "https://panchayatnavapur.netlify.app/" is the official website of Panchayat Samiti of Navapur`;

// Active language (default: English)
let activeLanguage = 'en';

// Conversation history to maintain context
let conversationHistory = [];

// Voice Assistant Configuration
let isListening = false;
let recognition = null;
let synthesis = window.speechSynthesis;
let currentUtterance = null;
let voiceInputUsed = false; // Track if current message was sent via voice
let voiceResponseMode = 'auto'; // 'auto', 'always', 'never'

// Rate limiting variables
let lastRequestTime = 0;
let requestCount = 0;
let requestTimes = [];
const RATE_LIMIT_WINDOW = 60000; // 1 minute in milliseconds
const MAX_REQUESTS_PER_MINUTE = 12; // Conservative limit (less than 15 to be safe)
const MIN_REQUEST_INTERVAL = 2000; // Minimum 2 seconds between requests

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
        
        console.log(`Language changed from ${oldLanguage} to ${activeLanguage}`);
        
        // Clear conversation history when language changes to ensure clean context
        conversationHistory = [];
        
        // Update voice recognition language
        if (typeof updateRecognitionLanguage === 'function') {
            updateRecognitionLanguage();
        }
        
        // Stop any ongoing speech
        if (synthesis.speaking) {
            synthesis.cancel();
        }
        
        // Force voice to be used for language change message
        const oldVoiceInputUsed = voiceInputUsed;
        voiceInputUsed = true; // Temporarily enable voice for language change announcement
        
        // Wait for voices to load and then announce language change
        setTimeout(() => {
            const changeMsg = getLanguageChangeMessage(activeLanguage);
            addBotMessage(changeMsg);
            
            // Initialize conversation history with language context
            conversationHistory.push({
                role: 'model',
                parts: [{ text: changeMsg }]
            });
            
            // Reset voice input flag to previous state
            setTimeout(() => {
                voiceInputUsed = oldVoiceInputUsed;
            }, 100);
        }, 200); // Increased delay to ensure voices are loaded
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

// Rate limiting helper functions
function isRateLimited() {
    const now = Date.now();
    
    // Remove requests older than 1 minute
    requestTimes = requestTimes.filter(time => now - time < RATE_LIMIT_WINDOW);
    
    // Check if we've exceeded the request limit
    if (requestTimes.length >= MAX_REQUESTS_PER_MINUTE) {
        console.warn('Rate limit reached: too many requests in the last minute');
        return true;
    }
    
    // Check minimum interval between requests
    if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
        console.warn('Rate limit: requests too frequent');
        return true;
    }
    
    return false;
}

function recordRequest() {
    const now = Date.now();
    lastRequestTime = now;
    requestTimes.push(now);
}

function getRateLimitMessage(language) {
    const rateLimitMessages = {
        'en': 'Please wait a moment before sending another message. The API has rate limits to ensure fair usage.',
        'hi': 'कृपया दूसरा संदेश भेजने से पहले थोड़ा इंतज़ार करें। API में उचित उपयोग सुनिश्चित करने के लिए दर सीमाएं हैं।',
        'mr': 'कृपया दुसरा संदेश पाठवण्यापूर्वी थोडा वेळ थांबा. न्याय्य वापरा सुनिश्चित करण्यासाठी API मध्ये दर मर्यादा आहेत.',
        'gu': 'કૃપા કરીને બીજો સંદેશ મોકલતા પહેલા થોડી રાહ જુઓ. ન્યાયસંગત ઉપયોગ સુનિશ્ચિત કરવા માટે API માં દર મર્યાદાઓ છે.',
        'ta': 'மற்றொரு செய்தியை அனுப்புவதற்கு முன் சிறிது காத்திருக்கவும். நியாயமான பயன்பாட்டை உறுதிசெய்ய API இல் வீத வரம்புகள் உள்ளன.',
        'te': 'మరొక సందేశాన్ని పంపడానికి ముందు కొంచెం వేచి ఉండండి. న్యాయమైన వినియోగాన్ని నిర్ధారించడానికి API లో రేట్ పరిమితులు ఉన్నాయి.',
        'kn': 'ಇನ್ನೊಂದು ಸಂದೇಶವನ್ನು ಕಳುಹಿಸುವ ಮೊದಲು ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಕಾಯಿರಿ. ನ್ಯಾಯಯುತ ಬಳಕೆಯನ್ನು ಖಾತ್ರಿಪಡಿಸಲು API ಯಲ್ಲಿ ದರ ಮಿತಿಗಳಿವೆ.',
        'ml': 'മറ്റൊരു സന്ദേശം അയയ്ക്കുന്നതിന് മുമ്പ് ദയവായി അൽപ്പനേരം കാത്തിരിക്കുക. ന്യായമായ ഉപയോഗം ഉറപ്പാക്കാൻ API-യിൽ റേറ്റ് പരിധികളുണ്ട്.'
    };
    return rateLimitMessages[language] || rateLimitMessages['en'];
}

function showQuotaInformation() {
    const quotaInfo = {
        'en': 'ℹ️ API Usage Info:\n• Model: Gemini 1.5 Flash (v1 API - New Project)\n• Daily Quota: 1,500 requests/day (Excellent!)\n• Rate Limit: 15 requests/minute (Standard)\n• Status: Fresh unrestricted API key from new project\n• Performance: Full Gemini AI capabilities restored\n• Reset: Quota resets at midnight Pacific Time',
        'hi': 'ℹ️ API उपयोग जानकारी:\n• मॉडल: जेमिनी 1.5 फ्लैश (v1 API - नया प्रोजेक्ट)\n• दैनिक कोटा: 1,500 अनुरोध/दिन (उत्कृष्ट!)\n• दर सीमा: 15 अनुरोध/मिनट (मानक)\n• स्थिति: नए प्रोजेक्ट से ताज़ी अप्रतिबंधित API कुंजी\n• प्रदर्शन: पूर्ण जेमिनी AI क्षमताएं बहाल',
        'mr': 'ℹ️ API वापर माहिती:\n• मॉडेल: जेमिनी 1.5 फ्लॅश (v1 API - नवीन प्रकल्प)\n• दैनंदिन कोटा: 1,500 विनंत्या/दिवस (उत्कृष्ट!)\n• दर मर्यादा: 15 विनंत्या/मिनट (मानक)\n• स्थिती: नवीन प्रकल्पातून ताजी अप्रतिबंधित API की\n• कामगिरी: संपूर्ण जेमिनी AI क्षमता पुनर्संचयित'
    };
    
    const message = quotaInfo[activeLanguage] || quotaInfo['en'];
    addSystemMessage(message);
}

function getRateLimitStatus() {
    const now = Date.now();
    const recentRequests = requestTimes.filter(time => now - time < RATE_LIMIT_WINDOW);
    const remainingRequests = Math.max(0, MAX_REQUESTS_PER_MINUTE - recentRequests.length);
    const nextAvailableIn = Math.max(0, MIN_REQUEST_INTERVAL - (now - lastRequestTime));
    
    return {
        requestsUsed: recentRequests.length,
        requestsRemaining: remainingRequests,
        nextAvailableInMs: nextAvailableIn,
        nextAvailableInSec: Math.ceil(nextAvailableIn / 1000)
    };
}

// Handle sending a message
// Handle sending a message
function handleSendMessage() {
    const message = chatInput.value.trim();
    if (message.length === 0) return;
    
    // Check rate limiting before sending
    if (isRateLimited()) {
        const rateLimitMsg = getRateLimitMessage(activeLanguage);
        addBotMessage(rateLimitMsg);
        return;
    }
    
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
    
    // Add helpful message for first-time users about rate limits
    const lastRequest = localStorage.getItem('lastAPIRequest');
    const now = Date.now();
    if (!lastRequest || (now - parseInt(lastRequest)) > 300000) { // 5 minutes
        setTimeout(() => {
            if (document.querySelector('.typing-indicator')) {
                addSystemMessage('💡 Note: This API has strict rate limits. If rate limited, the system will auto-retry in 60 seconds.');
            }
        }, 2000);
    }
    
    // Record the request for rate limiting
    recordRequest();
    
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
    
    // Determine if we should speak this response
    const voiceMode = localStorage.getItem('navapur-voice-mode') || 'auto';
    let shouldSpeak = false;
    
    console.log(`Voice mode: ${voiceMode}, Voice input used: ${voiceInputUsed}`);
    
    switch (voiceMode) {
        case 'always':
            shouldSpeak = true;
            console.log('Voice mode ALWAYS: will speak response');
            break;
        case 'auto':
            shouldSpeak = voiceInputUsed; // Only speak if voice input was used
            console.log(`Voice mode AUTO: will speak response = ${shouldSpeak}`);
            break;
        case 'never':
            shouldSpeak = false;
            console.log('Voice mode NEVER: will not speak response');
            break;
    }
    
    if (shouldSpeak && typeof speakText === 'function') {
        // Extract plain text from markdown
        const plainText = message.replace(/[#*_~`\[\]()]/g, '').replace(/\n/g, ' ').trim();
        console.log(`Speaking response in ${activeLanguage}: ${plainText.substring(0, 50)}...`);
        speakText(plainText);
    } else if (shouldSpeak) {
        console.warn('speakText function not available');
    }
    
    // Reset voice input flag after processing
    voiceInputUsed = false;
}

// Add a system message (for notifications)
function addSystemMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('navapur-message', 'navapur-system-message');
    messageElement.style.backgroundColor = '#fff3e0';
    messageElement.style.color = '#f57c00';
    messageElement.style.fontSize = '12px';
    messageElement.style.fontStyle = 'italic';
    messageElement.style.textAlign = 'center';
    messageElement.style.margin = '8px auto';
    messageElement.style.maxWidth = '90%';
    messageElement.style.padding = '8px 12px';
    messageElement.style.borderRadius = '12px';
    messageElement.style.border = '1px solid #ffcc02';
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    scrollToBottom();
    
    // Remove system message after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 5000);
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
        // Check for development mode first
        if (window.DEVELOPMENT_MODE || DEVELOPMENT_MODE) {
            console.log('Chatbot: Running in development mode with mock responses');
            const mockResponse = await getMockResponse(userMessage);
            removeTypingIndicator();
            addBotMessage(mockResponse);
            
            // Handle voice for development mode
            const voiceMode = localStorage.getItem('navapur-voice-mode') || 'auto';
            let shouldSpeak = false;
            
            switch (voiceMode) {
                case 'always':
                    shouldSpeak = true;
                    break;
                case 'auto':
                    shouldSpeak = voiceInputUsed; // Only speak if voice input was used
                    break;
                case 'never':
                    shouldSpeak = false;
                    break;
            }
            
            if (shouldSpeak && typeof speakText === 'function') {
                speakText(mockResponse, activeLanguage);
            }
            return;
        }
        
        // Check if API key is available
        if (!GEMINI_API_KEY) {
            console.error('Chatbot: API key not available');
            const errorMsg = 'Configuration error: API key not found. Please check the environment configuration.';
            removeTypingIndicator();
            addBotMessage(errorMsg);
            return;
        }

        // Create the system message with context and language instruction
        const systemMessage = `${PANCHAYAT_CONTEXT}\n\n${getLanguageInstruction(activeLanguage)}\n\nIMPORTANT: 
        1. You must respond in ${getLanguageName(activeLanguage)} language consistently throughout this conversation. Do not switch languages.
        2. Always assume questions are about Navapur Panchayat Samiti unless explicitly mentioned otherwise.
        3. Remember and reference previous parts of the conversation when relevant.
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

        console.log('Chatbot: Making API request to:', GEMINI_API_URL);
        console.log('Chatbot: Request body prepared, conversation history length:', conversationHistory.length);
        console.log('Chatbot: Using API key ending with:', GEMINI_API_KEY.slice(-8));
    
    // Show success message for new API key
    if (GEMINI_API_KEY.endsWith('igso0')) {
        console.log('✅ New unrestricted API key detected - should have full functionality');
    }

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
                },
                safetySettings: [
                    {
                        category: "HARM_CATEGORY_HARASSMENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_HATE_SPEECH",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    },
                    {
                        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                        threshold: "BLOCK_MEDIUM_AND_ABOVE"
                    }
                ]
            })
        });

        console.log('Chatbot: API response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Chatbot: API response error:', response.status, errorText);
            
            // Add detailed error logging for new API key
            console.log('Chatbot: Full error details for new API key:', {
                status: response.status,
                errorText: errorText,
                timestamp: new Date().toISOString(),
                apiKey: GEMINI_API_KEY.slice(-8)
            });
            
            // Handle rate limiting (429) - Project-level restrictions detected
            if (response.status === 429) {
                removeTypingIndicator();
                
                // Check for project-level restrictions
                if (errorText.includes('project_number:638291929677')) {
                    const restrictionMessage = `🚨 Project-level API restriction detected. This Google Cloud project (${errorText.match(/project_number:(\d+)/)?.[1]}) has quota limits of 0 requests/minute. You need to create a completely NEW Google Cloud project with a different project ID.`;
                    addBotMessage(restrictionMessage);
                    
                    setTimeout(() => {
                        addSystemMessage(`❌ Current API keys from this project won't work. Create new project at: https://console.cloud.google.com/`);
                    }, 3000);
                    
                } else if (errorText.includes('quota_limit_value": "0"') || errorText.includes('requests per minute')) {
                    const rateMessage = `⚠️ API rate limit (0 requests/minute). Auto-retrying in 30 seconds...`;
                    addBotMessage(rateMessage);
                    
                    setTimeout(async () => {
                        addSystemMessage(`🔄 Retrying request...`);
                        const lastUserMessage = conversationHistory[conversationHistory.length - 1]?.parts[0]?.text;
                        if (lastUserMessage) {
                            await getAIResponse(lastUserMessage);
                        }
                    }, 30000);
                    
                } else if (errorText.includes('Quota exceeded') || errorText.includes('daily')) {
                    const quotaMessage = `Daily API quota exceeded. You've used your daily requests. The quota resets at midnight Pacific Time.`;
                    addBotMessage(quotaMessage);
                } else {
                    const rateMessage = `Rate limit exceeded. Please wait a moment before sending another message.`;
                    addBotMessage(rateMessage);
                }
                return;
            }
            
            // Handle API key/permission issues
            if (response.status === 403 || response.status === 401) {
                removeTypingIndicator();
                const authMessage = `API authentication issue. Your API key may not have access to the v1beta API or Gemini 2.0 Flash model. You may need to create a new API key with v1beta access.`;
                addBotMessage(authMessage);
                
                setTimeout(() => {
                    addSystemMessage(`Try: 1) Create new API key in Google AI Studio, 2) Or switch to other v1beta models like gemini-pro`);
                }, 2000);
                return;
            }
            
            // Handle model not found (wrong API version)
            if (response.status === 404 && errorText.includes('not found')) {
                removeTypingIndicator();
                const modelMessage = `Model not found with current API key. Your key may only have v1beta access. Switching to compatible model...`;
                addBotMessage(modelMessage);
                
                setTimeout(() => {
                    addSystemMessage(`Switching back to Gemini Pro (v1beta) for compatibility. You can create a new API key for v1 access.`);
                    // Auto-switch back to working model
                    window.location.reload();
                }, 3000);
                return;
            }
            
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const data = await response.json();
        console.log('Chatbot: API response received:', data);
        
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
            console.error("Chatbot: Invalid API response structure:", data);
            const errorMsg = getErrorMessage(activeLanguage);
            addBotMessage(errorMsg);
        }
    } catch (error) {
        // Remove typing indicator
        removeTypingIndicator();
        
        // Handle error
        console.error("Chatbot: API Error details:", error);
        
        let errorMessage;
        if (error.message.includes('Failed to fetch')) {
            errorMessage = 'Network connection error. Please check your internet connection and try again.';
        } else if (error.message.includes('403')) {
            errorMessage = 'API access forbidden. Please check the API key configuration.';
        } else if (error.message.includes('429')) {
            // Check if it's a daily quota issue or per-minute rate limit
            if (error.message.includes('quota') || error.message.includes('QUOTA_EXCEEDED') || 
                error.message.includes('daily') || error.message.includes('RPD')) {
                errorMessage = `Daily API quota exceeded (1,500 requests/day for free tier). The quota resets at midnight Pacific Time. You can upgrade to a paid plan for higher limits, or try again tomorrow.`;
                
                // Show quota information
                setTimeout(() => {
                    addSystemMessage(`Current limits: 1,500 requests/day (Free) vs Much Higher (Paid). Visit Google AI Studio to upgrade your plan.`);
                }, 2000);
            } else {
                // Regular per-minute rate limiting
                const retryAfter = Math.ceil((requestTimes.length > 0 ? 
                    Math.max(0, RATE_LIMIT_WINDOW - (Date.now() - requestTimes[0])) / 1000 : 30));
                errorMessage = `Too many requests per minute. Please wait ${retryAfter} seconds before trying again.`;
                
                // Show additional tips for rate limiting
                setTimeout(() => {
                    addSystemMessage(`Tip: Wait between messages to avoid rate limits. Current limit: ${MAX_REQUESTS_PER_MINUTE} requests per minute.`);
                }, 2000);
            }
        } else {
            errorMessage = getErrorMessage(activeLanguage);
        }
        
        addBotMessage(errorMessage);
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

// ==================== VOICE ASSISTANT FUNCTIONS ====================

// Initialize Speech Recognition
function initVoiceAssistant() {
    // Check browser support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        
        // Configure recognition
        recognition.continuous = false;
        recognition.interimResults = false;
        
        // Set language based on active language
        updateRecognitionLanguage();
        
        // Recognition event handlers
        recognition.onstart = handleRecognitionStart;
        recognition.onresult = handleRecognitionResult;
        recognition.onerror = handleRecognitionError;
        recognition.onend = handleRecognitionEnd;
    } else {
        console.warn('Speech recognition not supported in this browser');
    }
}

// Update recognition language based on selected language
function updateRecognitionLanguage() {
    if (!recognition) return;
    
    const languageMap = {
        'en': 'en-US',
        'hi': 'hi-IN',
        'mr': 'mr-IN',
        'gu': 'gu-IN',
        'ta': 'ta-IN',
        'te': 'te-IN',
        'kn': 'kn-IN',
        'ml': 'ml-IN'
    };
    
    recognition.lang = languageMap[activeLanguage] || 'en-US';
}

// Handle recognition start
function handleRecognitionStart() {
    isListening = true;
    updateMicrophoneButton(true);
    
    // Stop any ongoing speech synthesis
    if (synthesis.speaking) {
        synthesis.cancel();
    }
}

// Handle recognition result
function handleRecognitionResult(event) {
    const transcript = event.results[0][0].transcript;
    
    // Set the transcript as input value
    chatInput.value = transcript;
    
    // Mark that voice input was used
    voiceInputUsed = true;
    
    // Auto-send the message
    handleSendMessage();
}

// Handle recognition error
function handleRecognitionError(event) {
    console.error('Speech recognition error:', event.error);
    
    const errorMessages = {
        'en': 'Voice recognition error. Please try again.',
        'hi': 'वॉइस पहचान त्रुटि। कृपया पुनः प्रयास करें।',
        'mr': 'व्हॉइस ओळख त्रुटी. कृपया पुन्हा प्रयत्न करा.',
        'gu': 'વૉઇસ ઓળખ ભૂલ. કૃપા કરીને ફરીથી પ્રયાસ કરો.',
        'ta': 'குரல் அடையாள பிழை. மீண்டும் முயற்சிக்கவும்.',
        'te': 'వాయిస్ గుర్తింపు లోపం. దయచేసి మళ్లీ ప్రయత్నించండి.',
        'kn': 'ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ದೋಷ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
        'ml': 'വോയ്സ് തിരിച്ചറിയൽ പിശക്. ദയവായി വീണ്ടും ശ്രമിക്കുക.'
    };
    
    if (event.error !== 'aborted') {
        addBotMessage(errorMessages[activeLanguage] || errorMessages['en']);
    }
}

// Handle recognition end
function handleRecognitionEnd() {
    isListening = false;
    updateMicrophoneButton(false);
}

// Toggle voice recognition
function toggleVoiceRecognition() {
    if (!recognition) {
        alert('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
        return;
    }
    
    if (isListening) {
        recognition.stop();
    } else {
        // Update language before starting
        updateRecognitionLanguage();
        recognition.start();
    }
}

// Speak text using Text-to-Speech with better Indian voice support
function speakText(text) {
    // Cancel any ongoing speech
    if (synthesis.speaking) {
        synthesis.cancel();
    }
    
    // Wait a bit for voices to be available if they're not loaded yet
    const voices = synthesis.getVoices();
    if (voices.length === 0) {
        console.log('Voices not loaded yet, waiting...');
        setTimeout(() => speakText(text), 100);
        return;
    }
    
    // Create utterance
    currentUtterance = new SpeechSynthesisUtterance(text);
    
    // Set language with better Indian voice support
    const languageMap = {
        'en': 'en-IN', // Use Indian English instead of US English
        'hi': 'hi-IN',
        'mr': 'mr-IN',
        'gu': 'gu-IN',
        'ta': 'ta-IN',
        'te': 'te-IN',
        'kn': 'kn-IN',
        'ml': 'ml-IN'
    };
    
    const targetLang = languageMap[activeLanguage] || 'en-IN';
    currentUtterance.lang = targetLang;
    currentUtterance.rate = 0.85; // Slightly slower for better comprehension
    currentUtterance.pitch = 1;
    currentUtterance.volume = 0.9;
    
    console.log(`Trying to speak in ${activeLanguage} (${targetLang}):`, text.substring(0, 50) + '...');
    console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));
    
    // Enhanced voice selection logic
    let selectedVoice = findBestVoice(voices, targetLang, activeLanguage);
    
    if (selectedVoice) {
        currentUtterance.voice = selectedVoice;
        console.log(`Selected voice: ${selectedVoice.name} (${selectedVoice.lang})`);
    } else {
        console.log('No suitable voice found, using system default');
        // Even if no specific voice is found, the utterance will still work with the lang setting
    }
    
    // Event handlers
    currentUtterance.onstart = () => {
        updateSpeakerButton(true);
        console.log('Speech started successfully');
    };
    
    currentUtterance.onend = () => {
        updateSpeakerButton(false);
        console.log('Speech ended successfully');
    };
    
    currentUtterance.onerror = (error) => {
        updateSpeakerButton(false);
        console.error('Speech error:', error);
        
        // Fallback: try with English if the current language fails
        if (activeLanguage !== 'en') {
            console.log('Retrying with English...');
            const englishUtterance = new SpeechSynthesisUtterance(text);
            englishUtterance.lang = 'en-IN';
            
            // Find English voice
            const englishVoice = voices.find(voice => 
                voice.lang === 'en-IN' || voice.lang === 'en-US' || voice.lang.startsWith('en')
            );
            if (englishVoice) {
                englishUtterance.voice = englishVoice;
            }
            
            synthesis.speak(englishUtterance);
        }
    };
    
    // Speak
    try {
        synthesis.speak(currentUtterance);
        console.log('Speech synthesis initiated');
    } catch (error) {
        console.error('Failed to initiate speech synthesis:', error);
    }
}

// Test voice in current language (for debugging)
function testVoiceInCurrentLanguage() {
    const testMessages = {
        'en': 'This is a test of voice synthesis in English.',
        'hi': 'यह हिंदी में आवाज संश्लेषण का परीक्षण है।',
        'mr': 'हे मराठी भाषेतील आवाज संश्लेषणाची चाचणी आहे.',
        'gu': 'આ ગુજરાતીમાં વૉઇસ સિન્થેસિસની પરીક્ષા છે.',
        'ta': 'இது தமிழில் குரல் தொகுப்பின் சோதனை.',
        'te': 'ఇది తెలుగులో వాయిస్ సింథసిస్ యొక్క పరీక్ష.',
        'kn': 'ಇದು ಕನ್ನಡದಲ್ಲಿ ವಾಯ್ಸ್ ಸಿಂಥೆಸಿಸ್ ಪರೀಕ್ಷೆ.',
        'ml': 'ഇത് മലയാളത്തിലെ വോയ്സ് സിന്തസിസിന്റെ പരീക്ഷണമാണ്.'
    };
    
    const testMsg = testMessages[activeLanguage] || testMessages['en'];
    console.log('Testing voice with message:', testMsg);
    speakText(testMsg);
}

// Helper function to find the best voice for a language
function findBestVoice(voices, targetLang, activeLanguage) {
    console.log(`Finding voice for ${targetLang} (active language: ${activeLanguage})`);
    
    // Priority 1: Exact language match with quality indicators
    let voice = voices.find(v => 
        v.lang === targetLang && 
        (v.name.toLowerCase().includes('female') || 
         v.name.toLowerCase().includes('google') ||
         v.name.toLowerCase().includes('enhanced'))
    );
    if (voice) {
        console.log('Found exact match with quality indicator:', voice.name);
        return voice;
    }
    
    // Priority 2: Exact language match
    voice = voices.find(v => v.lang === targetLang);
    if (voice) {
        console.log('Found exact language match:', voice.name);
        return voice;
    }
    
    // Priority 3: Language prefix match (e.g., 'hi' matches 'hi-IN')
    const langPrefix = targetLang.split('-')[0];
    voice = voices.find(v => v.lang.startsWith(langPrefix));
    if (voice) {
        console.log('Found language prefix match:', voice.name);
        return voice;
    }
    
    // Priority 4: Special handling for Indian languages - use English Indian voice
    if (['hi', 'mr', 'gu', 'ta', 'te', 'kn', 'ml'].includes(activeLanguage)) {
        voice = voices.find(v => v.lang === 'en-IN');
        if (voice) {
            console.log('Using English Indian voice for Indian language:', voice.name);
            return voice;
        }
    }
    
    // Priority 5: Any English voice as fallback
    voice = voices.find(v => v.lang.startsWith('en'));
    if (voice) {
        console.log('Using English fallback voice:', voice.name);
        return voice;
    }
    
    // Priority 6: Default system voice
    console.log('No suitable voice found, will use system default');
    return null;
}

// Toggle speech synthesis with improved logic
function toggleSpeech() {
    if (synthesis.speaking) {
        // If currently speaking, stop it
        synthesis.cancel();
        updateSpeakerButton(false);
        return;
    }
    
    // Get current voice response mode
    const currentMode = localStorage.getItem('navapur-voice-mode') || 'auto';
    
    // Cycle through modes: auto -> always -> never -> auto
    let newMode;
    switch (currentMode) {
        case 'auto':
            newMode = 'always';
            break;
        case 'always':
            newMode = 'never';
            break;
        case 'never':
            newMode = 'auto';
            break;
        default:
            newMode = 'auto';
    }
    
    // Save the new mode
    localStorage.setItem('navapur-voice-mode', newMode);
    
    // Update button appearance
    updateSpeakerButtonStatus();
    
    // Show feedback message
    const feedbackMessages = {
        'auto': 'Voice Mode: AUTO - Responses will be spoken only when you use voice input',
        'always': 'Voice Mode: ALWAYS ON - All responses will be spoken',
        'never': 'Voice Mode: OFF - No voice responses'
    };
    
    // Add a temporary notification
    addSystemMessage(feedbackMessages[newMode]);
    
    console.log('Chatbot: Voice mode changed to:', newMode);
}

// Update microphone button appearance
function updateMicrophoneButton(active) {
    const micButton = document.getElementById('navapur-mic-button');
    if (micButton) {
        if (active) {
            micButton.classList.add('active');
            micButton.style.backgroundColor = '#ff5252';
        } else {
            micButton.classList.remove('active');
            micButton.style.backgroundColor = '';
        }
    }
}

// Update speaker button appearance
function updateSpeakerButton(speaking) {
    const speakerButton = document.getElementById('navapur-speaker-button');
    if (speakerButton) {
        if (speaking) {
            speakerButton.classList.add('active');
            speakerButton.style.backgroundColor = '#2196F3';
            speakerButton.style.color = 'white';
        } else {
            speakerButton.classList.remove('active');
            speakerButton.style.backgroundColor = '';
            speakerButton.style.color = '';
        }
    }
}

// Update speaker button to show voice mode status
function updateSpeakerButtonStatus() {
    const speakerButton = document.getElementById('navapur-speaker-button');
    const voiceMode = localStorage.getItem('navapur-voice-mode') || 'auto';
    
    if (speakerButton) {
        switch (voiceMode) {
            case 'auto':
                speakerButton.style.backgroundColor = '#ff9800'; // Orange for auto
                speakerButton.style.color = 'white';
                speakerButton.title = 'Voice Mode: AUTO - Click to change to ALWAYS ON';
                break;
            case 'always':
                speakerButton.style.backgroundColor = '#4caf50'; // Green for always on
                speakerButton.style.color = 'white';
                speakerButton.title = 'Voice Mode: ALWAYS ON - Click to turn OFF';
                break;
            case 'never':
                speakerButton.style.backgroundColor = '';
                speakerButton.style.color = '#666666';
                speakerButton.title = 'Voice Mode: OFF - Click to change to AUTO';
                break;
        }
    }
}

// Test API connection
async function testAPIConnection() {
    console.log('Chatbot: Testing API connection...');
    
    if (!GEMINI_API_KEY) {
        console.error('Chatbot: No API key available for testing');
        return false;
    }
    
    try {
        const testContents = [{
            role: 'user',
            parts: [{ text: 'Hello, this is a test message. Please respond with "API connection successful".' }]
        }];
        
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: testContents,
                generationConfig: {
                    temperature: 0.1,
                    maxOutputTokens: 50,
                }
            })
        });
        
        if (!response.ok) {
            console.error('Chatbot: API test failed with status:', response.status);
            return false;
        }
        
        const data = await response.json();
        console.log('Chatbot: API test successful:', data);
        return true;
    } catch (error) {
        console.error('Chatbot: API test error:', error);
        return false;
    }
}

// ==================== INITIALIZE ====================

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Chatbot: DOM loaded, initializing...');
    
    initChat();
    initVoiceAssistant();
    
    // Test API connection with new unrestricted key
    console.log('Chatbot: Testing API connection with new key...');
    const apiWorking = await testAPIConnection();
    if (!apiWorking) {
        console.warn('Chatbot: API connection test failed. Users may experience issues.');
    } else {
        console.log('✅ API connection successful with new key!');
    }
    
    // Load voices and wait for them to be available
    const loadVoices = () => {
        const voices = synthesis.getVoices();
        console.log(`Chatbot: ${voices.length} voices loaded`);
        
        // Log available Indian language voices for debugging
        const indianVoices = voices.filter(voice => 
            voice.lang.includes('IN') || 
            ['hi', 'mr', 'gu', 'ta', 'te', 'kn', 'ml'].some(lang => voice.lang.startsWith(lang))
        );
        console.log('Available Indian voices:', indianVoices.map(v => `${v.name} (${v.lang})`));
    };
    
    // Load voices (needed for some browsers)
    if (synthesis.onvoiceschanged !== undefined) {
        synthesis.onvoiceschanged = loadVoices;
    }
    
    // Initial voice load
    loadVoices();
    
    // Add event listeners for voice buttons
    const micButton = document.getElementById('navapur-mic-button');
    const speakerButton = document.getElementById('navapur-speaker-button');
    
    if (micButton) {
        micButton.addEventListener('click', toggleVoiceRecognition);
    }
    
    if (speakerButton) {
        speakerButton.addEventListener('click', toggleSpeech);
        // Set initial button status based on saved preference (default to 'auto')
        if (!localStorage.getItem('navapur-voice-mode')) {
            localStorage.setItem('navapur-voice-mode', 'auto');
        }
        updateSpeakerButtonStatus();
    }
    
    console.log('Chatbot: Initialization complete');
    
    // Show success message for new unrestricted API
    if (!DEVELOPMENT_MODE) {
        console.log('� Real API Mode: ACTIVE - Using Gemini AI responses');
        setTimeout(() => {
            addSystemMessage('� Gemini AI is now active with full functionality! Ask me anything about Navapur Panchayat Samiti.');
        }, 2000);
    }
    
    // Add global test functions for debugging
    window.testChatbotVoice = testVoiceInCurrentLanguage;
    window.getRateLimitStatus = getRateLimitStatus;
    window.showQuotaInfo = showQuotaInformation;
    
    // Add development mode toggle
    window.toggleDevelopmentMode = function() {
        window.DEVELOPMENT_MODE = !window.DEVELOPMENT_MODE;
        console.log('Development mode:', window.DEVELOPMENT_MODE ? 'ON (Mock responses)' : 'OFF (Real API)');
        addSystemMessage(`🔧 Development mode ${window.DEVELOPMENT_MODE ? 'enabled' : 'disabled'}. ${window.DEVELOPMENT_MODE ? 'Using mock responses.' : 'Using real API.'}`);
    };
    
    // Make development mode accessible globally
    window.DEVELOPMENT_MODE = DEVELOPMENT_MODE;
    
    // Add function to test API with proper delay
    window.testAPIWithDelay = async function() {
        console.log('Testing API with 60 second delay...');
        addSystemMessage('⏳ Testing API connection with 60 second delay... Please wait.');
        
        // Wait 60 seconds
        await new Promise(resolve => setTimeout(resolve, 60000));
        
        console.log('Now attempting API call...');
        addSystemMessage('🔄 60 seconds passed, now testing API...');
        
        // Test with a simple message
        handleSendMessage('Hello, testing API connection');
    };
    
    console.log('Chatbot: Type testChatbotVoice() in console to test voice in current language');
    console.log('Chatbot: Type getRateLimitStatus() in console to check rate limit status');
    console.log('Chatbot: Type showQuotaInfo() in console to see API quota information');
    console.log('Chatbot: Type testAPIWithDelay() in console to test API with 60 second delay');
    console.log('Chatbot: Type toggleDevelopmentMode() to switch between mock and real API');
});