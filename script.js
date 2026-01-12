const input = document.getElementById("userInput");
const button = document.getElementById("submitBtn");
const responseBox = document.getElementById("response");

/* -------------------------
   KEYWORD MAP
-------------------------- */

const crisisKeywords = [
  "kill myself",
  "want to die",
  "suicide",
  "self harm",
  "end my life",
  "burden",
  "no reason to live"
];

const categories = {
  loneliness: ["alone", "lonely", "no one", "isolated"],
  anxiety: ["anxious", "overthinking", "panic", "worried"],
  sadness: ["sad", "hopeless", "empty", "tired of everything"],
  breakup: ["breakup", "lost them", "heartbroken", "miss them"],
  career: ["career", "future", "job", "confused about life"],
  family: ["family pressure", "parents", "expectations"],
  selfWorth: ["worthless", "not good enough", "hate myself"]
};

/* -------------------------
   RESPONSE TEMPLATES
-------------------------- */

const responses = {
  loneliness: {
    empathy: [
      "Feeling lonely can hurt in quiet, heavy ways.",
      "It makes sense to want connection and not feel it right now."
    ],
    explanation:
      "Many people experience loneliness even when surrounded by others. It doesn't mean there's something wrong with you.",
    steps: [
      "Send a simple message to someone you trust, even just saying 'thinking of you'.",
      "Spend a few minutes doing something grounding, like sitting near a window or stepping outside."
    ],
    reflection: "What kind of connection do you miss the most right now?",
    resources: [
      { text: "Loneliness explained (Mind.org)", url: "https://www.mind.org.uk" }
    ]
  },

  anxiety: {
    empathy: [
      "Overthinking can be exhausting.",
      "It can feel like your mind won’t give you any rest."
    ],
    explanation:
      "Anxiety is your brain trying to protect you, even when there's no immediate danger.",
    steps: [
      "Take 5 slow breaths, counting each exhale.",
      "Write down one worry and gently set it aside for later."
    ],
    reflection: "What thought keeps coming back the most?",
    resources: [
      { text: "Understanding anxiety (NHS)", url: "https://www.nhs.uk" }
    ]
  },

  sadness: {
    empathy: [
      "It sounds like things feel heavy right now.",
      "That kind of sadness can drain your energy."
    ],
    explanation:
      "Sadness is a natural response to loss, stress, or feeling overwhelmed.",
    steps: [
      "Drink a glass of water or eat something small.",
      "Lower your expectations for today — doing less is okay."
    ],
    reflection: "What feels hardest about today?",
    resources: [
      { text: "Coping with sadness (Verywell Mind)", url: "https://www.verywellmind.com" }
    ]
  },

  breakup: {
    empathy: [
      "Losing someone emotionally can really hurt.",
      "Breakups often leave a quiet ache behind."
    ],
    explanation:
      "Emotional attachment doesn't disappear quickly, even when separation is necessary.",
    steps: [
      "Allow yourself to miss them without judging it.",
      "Limit checking old messages or social media today."
    ],
    reflection: "What do you miss — the person, or the feeling they gave you?",
    resources: [
      { text: "Healing after breakups (Psychology Today)", url: "https://www.psychologytoday.com" }
    ]
  },

  career: {
    empathy: [
      "Uncertainty about the future can feel scary.",
      "It's okay to not have everything figured out."
    ],
    explanation:
      "Many people feel lost at different stages of life — it's part of growth.",
    steps: [
      "Write down one small question you want answered about your future.",
      "Focus on the next step, not the entire path."
    ],
    reflection: "What feels most unclear right now?",
    resources: [
      { text: "Career confusion guide (Harvard Business Review)", url: "https://hbr.org" }
    ]
  },

  family: {
    empathy: [
      "Family expectations can feel heavy.",
      "It’s hard when love and pressure get mixed together."
    ],
    explanation:
      "Wanting approval while needing autonomy is a common conflict.",
    steps: [
      "Name one boundary you wish you had.",
      "Remind yourself that your worth isn’t defined by meeting expectations."
    ],
    reflection: "What expectation feels the heaviest?",
    resources: [
      { text: "Family pressure explained (Mental Health Foundation)", url: "https://www.mentalhealth.org.uk" }
    ]
  },

  selfWorth: {
    empathy: [
      "Feeling low about yourself can be deeply painful.",
      "That inner voice can be very harsh."
    ],
    explanation:
      "Self-criticism often develops from past experiences, not from truth.",
    steps: [
      "Speak to yourself as you would to a close friend.",
      "Notice one thing you did today, even if it feels small."
    ],
    reflection: "Where did you learn to talk to yourself this way?",
    resources: [
      { text: "Building self-worth (Mind.org)", url: "https://www.mind.org.uk" }
    ]
  }
};

/* -------------------------
   CRISIS RESPONSE
-------------------------- */

function showCrisisResponse() {
  responseBox.innerHTML = `
    <p><strong>I’m really glad you reached out.</strong></p>
    <p>
      It sounds like you're carrying a lot, and you deserve real human support right now.
    </p>
    <p>
      Please consider reaching out to someone you trust or a trained listener immediately.
    </p>
    <ul>
      <li><strong>India:</strong> Kiran (24/7): 1800-599-0019</li>
      <li><strong>India:</strong> AASRA: +91-9820466726</li>
      <li><strong>USA:</strong> Call or text 988</li>
      <li><strong>UK & ROI:</strong> Samaritans: 116 123</li>
      <li><strong>International:</strong> findahelpline.com</li>
    </ul>
    <p>You are not a burden. You matter.</p>
  `;
  responseBox.classList.remove("hidden");
}

/* -------------------------
   MAIN LOGIC
-------------------------- */

button.addEventListener("click", () => {
  const text = input.value.toLowerCase();

  if (!text.trim()) return;

  if (crisisKeywords.some(word => text.includes(word))) {
    showCrisisResponse();
    return;
  }

  const matchedCategories = Object.keys(categories).filter(category =>
    categories[category].some(keyword => text.includes(keyword))
  );

  responseBox.innerHTML = "";

  if (matchedCategories.length === 0) {
    responseBox.innerHTML = `
      <p>
        Thank you for sharing. What you're feeling matters, even if it’s hard to name.
      </p>
    `;
  }

  matchedCategories.forEach(category => {
    const r = responses[category];

    responseBox.innerHTML += `
      <p>${r.empathy.join("<br>")}</p>

      <h3>Why this can happen</h3>
      <p>${r.explanation}</p>

      <h3>Small steps</h3>
      <ul>${r.steps.map(step => `<li>${step}</li>`).join("")}</ul>

      <h3>Reflection</h3>
      <p>${r.reflection}</p>

      <h3>Helpful resources</h3>
      <ul>
        ${r.resources.map(res => `<li>${res.text}</li>`).join("")}
      </ul>
    `;
  });

  responseBox.classList.remove("hidden");
});
