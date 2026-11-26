(() => {
  'use strict';
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();

  ready(() => {
    if (document.getElementById('starwalt-chat-launcher')) return;

    const launcher = document.createElement('button');
    launcher.id = 'starwalt-chat-launcher';
    launcher.className = 'starwalt-chat-launcher';
    launcher.type = 'button';
    launcher.setAttribute('aria-label', 'Open Starwalt AI Assistant');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-controls', 'starwalt-chat-panel');
    launcher.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm3 6a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 7 9Zm5 0a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 12 9Zm5 0a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 17 9Z"/></svg><span class="starwalt-chat-badge" hidden>1</span>';

    const panel = document.createElement('section');
    panel.id = 'starwalt-chat-panel';
    panel.className = 'starwalt-chat-panel';
    panel.hidden = true;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Starwalt AI Assistant');
    panel.innerHTML =
      '<header class="starwalt-chat-header">' +
        '<div class="starwalt-chat-avatar" aria-hidden="true">SW</div>' +
        '<div class="starwalt-chat-title"><strong>Starwalt AI Assistant</strong><span>Automated guide · ready to help</span></div>' +
        '<button type="button" data-chat-clear aria-label="Clear conversation" title="Clear conversation">↻</button>' +
        '<button type="button" data-chat-close aria-label="Close assistant" title="Close">×</button>' +
      '</header>' +
      '<div class="starwalt-chat-messages" data-chat-messages aria-live="polite" aria-relevant="additions"></div>' +
      '<div class="starwalt-chat-quick" data-chat-quick aria-label="Suggested questions"></div>' +
      '<form class="starwalt-chat-form" data-chat-form>' +
        '<input data-chat-input type="text" maxlength="300" autocomplete="off" placeholder="Ask about websites, marketing or training…" aria-label="Message Starwalt assistant">' +
        '<button type="submit" aria-label="Send message">➤</button>' +
        '<p class="starwalt-chat-privacy">Automated website assistant. Messages stay on this device and are not sent to Starwalt unless you choose WhatsApp.</p>' +
      '</form>';

    document.body.append(launcher, panel);

    const messages = panel.querySelector('[data-chat-messages]');
    const quick = panel.querySelector('[data-chat-quick]');
    const form = panel.querySelector('[data-chat-form]');
    const input = panel.querySelector('[data-chat-input]');
    const badge = launcher.querySelector('.starwalt-chat-badge');
    let busy = false;
    let greeted = false;

    const quickItems = [
      ['Website design', 'I need a business website'],
      ['Digital marketing', 'Tell me about digital marketing'],
      ['Tech training', 'What training courses are available?'],
      ['Pricing', 'Show website packages and pricing'],
      ['Talk to a person', 'I want to talk to a person']
    ];

    const time = () => new Intl.DateTimeFormat('en-IN', {hour: 'numeric', minute: '2-digit'}).format(new Date());

    const addMessage = (role, text, links) => {
      const row = document.createElement('div');
      row.className = 'starwalt-chat-message ' + role;
      const bubble = document.createElement('div');
      bubble.className = 'starwalt-chat-bubble';
      const copy = document.createElement('span');
      copy.textContent = text;
      bubble.append(copy);

      if (links && links.length) {
        const actions = document.createElement('div');
        actions.className = 'starwalt-chat-links';
        links.forEach((item) => {
          const action = document.createElement('a');
          action.textContent = item.label;
          action.href = item.href;
          if (item.external) {
            action.target = '_blank';
            action.rel = 'noopener';
          }
          action.addEventListener('click', () => {
            if (item.href.startsWith('#')) closeChat();
            track('chat_action', item.label);
          });
          actions.append(action);
        });
        bubble.append(actions);
      }

      const stamp = document.createElement('small');
      stamp.className = 'starwalt-chat-time';
      stamp.textContent = time();
      bubble.append(stamp);
      row.append(bubble);
      messages.append(row);
      messages.scrollTop = messages.scrollHeight;
    };

    const showTyping = () => {
      const row = document.createElement('div');
      row.className = 'starwalt-chat-message';
      row.dataset.typing = 'true';
      row.innerHTML = '<div class="starwalt-chat-typing" aria-label="Assistant is typing"><i></i><i></i><i></i></div>';
      messages.append(row);
      messages.scrollTop = messages.scrollHeight;
      return row;
    };

    const whatsapp = (text) => 'https://wa.me/918668098213?text=' + encodeURIComponent(text);

    const replyFor = (raw) => {
      const q = raw.toLowerCase();
      if (/\b(hello|hi|hey|vanakkam|வணக்கம்)\b/.test(q)) {
        return {text: 'Hello! I can help you choose a Starwalt service, course, business tool, or the best way to contact our team.', links:[{label:'View services',href:'#services'},{label:'WhatsApp',href:whatsapp('Hello STARWALT COMPANY, I would like to know more about your services.'),external:true}]};
      }
      if (/website|web design|web development|ecommerce|e-commerce|online store/.test(q)) {
        return {text: 'Starwalt builds mobile-friendly business websites and e-commerce experiences. A useful next step is to prepare your requirements, then request a consultation or quote.', links:[{label:'Website services',href:'#services'},{label:'Build requirements brief',href:'#tool-requirements-brief'},{label:'Get a quote',href:'#contact'}]};
      }
      if (/digital marketing|social media|instagram|facebook|content/.test(q)) {
        return {text: 'We can help with digital campaigns, social content planning, local visibility and practical growth systems. You can start with the free content planner or discuss your goal with the team.', links:[{label:'7-day content planner',href:'#tool-content-planner'},{label:'Campaign planner',href:'#campaign-builder'},{label:'Discuss on WhatsApp',href:whatsapp('Hello STARWALT COMPANY, I need help with digital marketing.'),external:true}]};
      }
      if (/seo|google|map|local search|ranking/.test(q)) {
        return {text: 'For local search, begin with your Google Business Profile, consistent contact details, service-and-location content, reviews and recent photos. The Local SEO checker will show the next priorities.', links:[{label:'Open Local SEO checker',href:'#tool-local-seo'},{label:'SEO services',href:'#services'}]};
      }
      if (/training|course|learn|java|spring|coding|internship/.test(q)) {
        return {text: 'Starwalt offers practical technology learning paths, including web development, Java and Spring Boot, mobile, digital marketing, and AI automation topics. Build a learning roadmap or ask about the right batch.', links:[{label:'Training programmes',href:'#training'},{label:'Learning roadmap',href:'#roadmap-builder'},{label:'Ask about training',href:whatsapp('Hello STARWALT COMPANY, I want details about tech training.'),external:true}]};
      }
      if (/price|pricing|package|cost|budget|quote/.test(q)) {
        return {text: 'Project cost depends on scope, pages, integrations, content and support. Review the package section or build a requirements brief so the team can provide a clearer estimate.', links:[{label:'View packages',href:'#pricing'},{label:'Requirements brief',href:'#tool-requirements-brief'},{label:'Request quote',href:'#contact'}]};
      }
      if (/ai|automation|chatbot|workflow/.test(q)) {
        return {text: 'Starwalt can help plan practical AI and automation workflows. Start by identifying the current process, inputs, decisions, human review points and expected outcome.', links:[{label:'AI and automation services',href:'#services'},{label:'Start consultation',href:whatsapp('Hello STARWALT COMPANY, I want to discuss AI and automation for my business.'),external:true}]};
      }
      if (/tool|calculator|planner|checklist/.test(q)) {
        return {text: 'The Starwalt toolbox includes website, marketing, sales, operations and support tools. Search the directory or use its smart recommender.', links:[{label:'Open business tools',href:'#business-tools'},{label:'Find the right tool',href:'#business-tools'}]};
      }
      if (/human|person|call|contact|whatsapp|phone|agent/.test(q)) {
        return {text: 'You can speak with the Starwalt team by phone or WhatsApp. Share your goal, preferred timeline and the best time to contact you.', links:[{label:'Call +91 86680 98213',href:'tel:+918668098213'},{label:'Open WhatsApp',href:whatsapp('Hello STARWALT COMPANY, I would like to speak with your team.'),external:true},{label:'Contact section',href:'#contact'}]};
      }
      if (/time|how long|timeline|delivery/.test(q)) {
        return {text: 'A typical small-business website may take around 2–4 weeks after content and approvals are available. Complex integrations or e-commerce can require more planning. Confirm the exact timeline with the team.', links:[{label:'Project timeline tools',href:'#business-tools'},{label:'Ask the team',href:whatsapp('Hello STARWALT COMPANY, I want to discuss a project timeline.'),external:true}]};
      }
      return {text: 'I can help with Starwalt websites, digital marketing, SEO, technology training, AI automation, pricing, business tools, or contacting the team. Try one of those topics, or send your requirement through WhatsApp.', links:[{label:'View all services',href:'#services'},{label:'Business tools',href:'#business-tools'},{label:'WhatsApp requirement',href:whatsapp('Hello STARWALT COMPANY, my requirement is: ' + raw),external:true}]};
    };

    const send = (text) => {
      const clean = text.trim().slice(0, 300);
      if (!clean || busy) return;
      busy = true;
      input.value = '';
      addMessage('user', clean);
      const typing = showTyping();
      const answer = replyFor(clean);
      window.setTimeout(() => {
        typing.remove();
        addMessage('assistant', answer.text, answer.links);
        busy = false;
        input.focus();
      }, 480);
      track('chat_message', 'visitor_message');
    };

    const renderQuick = () => {
      quick.replaceChildren();
      quickItems.forEach(([label, message]) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = label;
        button.addEventListener('click', () => send(message));
        quick.append(button);
      });
    };

    const greet = () => {
      if (greeted) return;
      greeted = true;
      addMessage('assistant', 'Hi! I’m the Starwalt AI Assistant. What would you like help with today?', [
        {label:'Explore services',href:'#services'},
        {label:'Find a free tool',href:'#business-tools'}
      ]);
    };

    const openChat = () => {
      panel.hidden = false;
      panel.classList.remove('is-opening');
      void panel.offsetWidth;
      panel.classList.add('is-opening');
      launcher.setAttribute('aria-expanded', 'true');
      badge.hidden = true;
      greet();
      window.setTimeout(() => input.focus(), 120);
      track('chat_open', 'launcher');
    };

    function closeChat() {
      panel.hidden = true;
      launcher.setAttribute('aria-expanded', 'false');
      launcher.focus();
    }

    const clearChat = () => {
      messages.replaceChildren();
      greeted = false;
      greet();
      input.focus();
      track('chat_clear', 'header');
    };

    const track = (eventName, label) => {
      if (typeof window.gtag === 'function') window.gtag('event', eventName, {event_category:'starwalt_assistant', event_label:label});
    };

    launcher.addEventListener('click', () => panel.hidden ? openChat() : closeChat());
    panel.querySelector('[data-chat-close]').addEventListener('click', closeChat);
    panel.querySelector('[data-chat-clear]').addEventListener('click', clearChat);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      send(input.value);
    });

    panel.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        closeChat();
      }
    }, true);

    renderQuick();
    window.setTimeout(() => {
      if (panel.hidden) badge.hidden = false;
    }, 4500);
  });
})();