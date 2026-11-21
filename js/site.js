const b=document.querySelector('.menu'),n=document.querySelector('nav');if(b&&n)b.addEventListener('click',()=>n.classList.toggle('open'));document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());let ta=false;const lang=document.querySelector('.lang');if(lang)lang.addEventListener('click',()=>{ta=!ta;document.documentElement.lang=ta?'ta':'en';document.querySelectorAll('[data-en][data-ta]').forEach(e=>e.textContent=e.dataset[ta?'ta':'en']);lang.textContent=ta?'English':'தமிழ்';});document.querySelectorAll('[data-track]').forEach(e=>e.addEventListener('click',()=>{const eventName=e.dataset.track;window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'business_action',action:eventName});document.dispatchEvent(new CustomEvent('dimple:action',{detail:{action:eventName}}));}));const estimate=document.querySelector('#estimate-form'),estimateType=document.querySelector('#estimate-type'),estimateOutput=document.querySelector('#estimate-output'),estimateCta=document.querySelector('#estimate-cta');function updateEstimate(){if(!estimate)return;let total=Number(estimateType.value);estimate.querySelectorAll('input:checked').forEach(x=>total+=Number(x.value));const high=Math.ceil((total*1.25)/1000)*1000;estimateOutput.textContent=`Estimated starting range: ₹${total.toLocaleString('en-IN')}–₹${high.toLocaleString('en-IN')}`;estimateCta.dataset.estimate=`₹${total.toLocaleString('en-IN')}–₹${high.toLocaleString('en-IN')}`;}if(estimate){estimate.addEventListener('change',updateEstimate);updateEstimate();}const topButton=document.querySelector('.backtop');if(topButton){addEventListener('scroll',()=>topButton.classList.toggle('show',scrollY>600),{passive:true});topButton.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));}document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>n&&n.classList.remove('open')));if(estimateCta){estimateCta.addEventListener('click',()=>{const message=document.querySelector('textarea[name="message"]');if(message){message.value=`I used the website estimator. My estimated range is ${estimateCta.dataset.estimate||'to be discussed'}. Please contact me to confirm the scope.`;try{sessionStorage.setItem('dimple-estimate',message.value)}catch(e){}}});}const savedEstimate=(()=>{try{return sessionStorage.getItem('dimple-estimate')}catch(e){return null}})(),messageField=document.querySelector('textarea[name="message"]');if(savedEstimate&&messageField&&!messageField.value)messageField.value=savedEstimate;document.querySelectorAll('form').forEach(form=>form.addEventListener('submit',()=>{const source=form.querySelector('[name="source"]')?.value||'contact';window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'lead_submit',source});}));const themeButton=document.querySelector('.theme-toggle');let storedTheme=null;try{storedTheme=localStorage.getItem('dimple-theme')}catch(e){}if(storedTheme)document.documentElement.dataset.theme=storedTheme;if(themeButton)themeButton.addEventListener('click',()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=next;themeButton.setAttribute('aria-label',`Switch to ${next==='dark'?'light':'dark'} theme`);try{localStorage.setItem('dimple-theme',next)}catch(e){}});let storedLanguage=null;try{storedLanguage=localStorage.getItem('dimple-language')}catch(e){}if(storedLanguage==='ta'&&lang)lang.click();if(lang)lang.addEventListener('click',()=>{try{localStorage.setItem('dimple-language',document.documentElement.lang)}catch(e){}});const roiForm=document.querySelector('#roi-form'),roiOutput=document.querySelector('#roi-output');function updateRoi(){if(!roiForm)return;const visits=Math.max(0,Number(document.querySelector('#roi-visits').value)||0),rate=Math.min(100,Math.max(0,Number(document.querySelector('#roi-rate').value)||0)),value=Math.max(0,Number(document.querySelector('#roi-value').value)||0),leads=Math.round(visits*rate/100),opportunity=leads*value;roiOutput.textContent=`Potential opportunity: ${leads.toLocaleString('en-IN')} enquiries · ₹${opportunity.toLocaleString('en-IN')}`;}if(roiForm){roiForm.addEventListener('input',updateRoi);updateRoi();}const readiness=document.querySelector('#readiness-form'),readinessOutput=document.querySelector('#readiness-output');function updateReadiness(){if(!readiness)return;const all=readiness.querySelectorAll('input[type="checkbox"]'),done=readiness.querySelectorAll('input:checked');readinessOutput.textContent=`Readiness: ${done.length} of ${all.length}`;}if(readiness){readiness.addEventListener('change',updateReadiness);updateReadiness();}const estimateShare=document.querySelector('#estimate-share');function updateEstimateShare(){if(!estimateShare||!estimateCta)return;const msg=`Hello Dimple Enterprises, I used your website estimator. My indicative range is ${estimateCta.dataset.estimate||'to be discussed'}. Please help me confirm the scope.`;estimateShare.href=`https://wa.me/919566911041?text=${encodeURIComponent(msg)}`;}if(estimate){estimate.addEventListener('change',updateEstimateShare);updateEstimateShare();}document.querySelectorAll('form[method="POST"]').forEach(form=>form.addEventListener('submit',()=>{const button=form.querySelector('button[type="submit"]');if(button){button.dataset.original=button.textContent;button.textContent='Sending…';button.setAttribute('aria-busy','true');}}));const shareSite=document.querySelector('.share-site'),shareToast=document.querySelector('.share-toast');if(shareSite)shareSite.addEventListener('click',async()=>{const data={title:'Dimple Enterprises',text:'Websites and digital growth solutions for businesses.',url:location.origin+location.pathname};try{if(navigator.share){await navigator.share(data);if(shareToast)shareToast.textContent='Website shared.';}else{await navigator.clipboard.writeText(data.url);if(shareToast)shareToast.textContent='Website link copied.';}}catch(e){if(e.name!=='AbortError'&&shareToast)shareToast.textContent='Copy this link: '+data.url;}});const faqSearch=document.querySelector('#faq-search'),faqItems=[...document.querySelectorAll('#faq details')],faqEmpty=document.querySelector('#faq-empty');if(faqSearch)faqSearch.addEventListener('input',()=>{const query=faqSearch.value.trim().toLowerCase();let visible=0;faqItems.forEach(item=>{const match=!query||item.textContent.toLowerCase().includes(query);item.hidden=!match;if(match)visible++;});if(faqEmpty)faqEmpty.hidden=visible>0;});const contactForm=document.querySelector('#contact form'),draftStatus=document.querySelector('#draft-status'),clearDraft=document.querySelector('#clear-draft'),draftKey='dimple-enquiry-session';if(contactForm){try{const saved=JSON.parse(sessionStorage.getItem(draftKey)||'{}');Object.entries(saved).forEach(([name,value])=>{const field=contactForm.elements.namedItem(name);if(field&&typeof value==='string'&&!field.value)field.value=value;});if(Object.keys(saved).length&&draftStatus)draftStatus.textContent='Draft restored from this browser session.';}catch(e){}let draftTimer;contactForm.addEventListener('input',()=>{clearTimeout(draftTimer);draftTimer=setTimeout(()=>{const data={};new FormData(contactForm).forEach((value,key)=>{if(!key.startsWith('_'))data[key]=String(value)});try{sessionStorage.setItem(draftKey,JSON.stringify(data));if(draftStatus)draftStatus.textContent='Draft saved in this browser session.';}catch(e){}},400)});contactForm.addEventListener('submit',()=>{try{sessionStorage.removeItem(draftKey)}catch(e){}});}if(clearDraft)clearDraft.addEventListener('click',()=>{try{sessionStorage.removeItem(draftKey)}catch(e){}if(contactForm)contactForm.reset();if(draftStatus)draftStatus.textContent='Draft cleared.';});document.querySelectorAll('[data-display]').forEach(button=>button.addEventListener('click',()=>{const mode=button.dataset.display;if(mode==='text')document.documentElement.classList.toggle('large-text');if(mode==='contrast')document.documentElement.classList.toggle('high-contrast');if(mode==='reset')document.documentElement.classList.remove('large-text','high-contrast');}));const copyStatus=document.querySelector('.copy-status');document.querySelectorAll('.copy-contact').forEach(button=>button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(button.dataset.copy);if(copyStatus)copyStatus.textContent='Contact detail copied.';}catch(e){if(copyStatus)copyStatus.textContent='Select the contact detail above to copy it.';}}));const downloadContact=document.querySelector('.download-contact');if(downloadContact)downloadContact.addEventListener('click',()=>{const card='BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Dimple Enterprises\r\nORG:Dimple Enterprises\r\nTEL;TYPE=WORK,VOICE:+918668098213\r\nEMAIL:starwaltcompany@gmail.com\r\nURL:https://darshan-eeshwar.github.io/\r\nADR;TYPE=WORK:;;Vellore;Tamil Nadu;;;India\r\nEND:VCARD\r\n',blob=new Blob([card],{type:'text/vcard'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Dimple-Enterprises.vcf';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);if(copyStatus)copyStatus.textContent='Business contact downloaded.';});const connectionStatus=document.querySelector('.connection-status'),updateStatus=document.querySelector('.update-status'),updateButton=updateStatus?.querySelector('button'),installButton=document.querySelector('#install-app');function showConnection(){if(!connectionStatus)return;connectionStatus.hidden=navigator.onLine;connectionStatus.textContent=navigator.onLine?'Back online.':'You are offline. Previously visited pages may still work.';if(navigator.onLine){connectionStatus.hidden=false;setTimeout(()=>connectionStatus.hidden=true,2500);}}addEventListener('online',showConnection);addEventListener('offline',showConnection);if(!navigator.onLine)showConnection();let installPrompt=null;addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;if(installButton)installButton.hidden=false;});if(installButton)installButton.addEventListener('click',async()=>{if(!installPrompt)return;installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;installButton.hidden=true;});if('serviceWorker'in navigator)addEventListener('load',async()=>{try{const registration=await navigator.serviceWorker.register('./service-worker.js');if(registration.waiting&&updateStatus)updateStatus.hidden=false;registration.addEventListener('updatefound',()=>{const worker=registration.installing;if(worker)worker.addEventListener('statechange',()=>{if(worker.state==='installed'&&navigator.serviceWorker.controller&&updateStatus)updateStatus.hidden=false;});});if(updateButton)updateButton.addEventListener('click',()=>registration.waiting?.postMessage({type:'SKIP_WAITING'}));navigator.serviceWorker.addEventListener('controllerchange',()=>location.reload());}catch(e){console.warn('Offline support unavailable',e);}});const params=new URLSearchParams(location.search),utmKeys=['utm_source','utm_medium','utm_campaign'];let attribution={landing_page:location.pathname};utmKeys.forEach(key=>{const value=params.get(key);if(value)attribution[key]=value.slice(0,120)});try{const old=JSON.parse(sessionStorage.getItem('dimple-attribution')||'{}');attribution={...old,...attribution};sessionStorage.setItem('dimple-attribution',JSON.stringify(attribution));}catch(e){}document.querySelectorAll('form[method="POST"]').forEach(form=>{Object.entries(attribution).forEach(([key,value])=>{let input=form.querySelector(`[name="${key}"]`);if(!input){input=document.createElement('input');input.type='hidden';input.name=key;form.appendChild(input)}input.value=value;});});const consultForm=document.querySelector('#consultation-builder'),consultDate=document.querySelector('#consult-date'),consultLink=document.querySelector('#consult-link'),consultPreview=document.querySelector('#consult-preview');if(consultDate){const tomorrow=new Date();tomorrow.setDate(tomorrow.getDate()+1);consultDate.min=tomorrow.toISOString().slice(0,10);}function updateConsult(){if(!consultForm)return;const data=new FormData(consultForm),date=data.get('date')||'a suitable date',time=data.get('time')||'a suitable time',service=data.get('service')||'digital services',name=data.get('name')||'a prospective customer',message=`Hello Dimple Enterprises, I am ${name}. I would like to request a consultation about ${service} on ${date} at ${time} IST. Please confirm whether this time is available.`;if(consultPreview)consultPreview.textContent=message;if(consultLink)consultLink.href=`https://wa.me/919566911041?text=${encodeURIComponent(message)}`;}if(consultForm){consultForm.addEventListener('input',updateConsult);updateConsult();}const briefForm=document.querySelector('#brief-builder'),briefPreview=document.querySelector('#brief-preview'),briefDownload=document.querySelector('#brief-download');function buildBrief(){if(!briefForm)return'';const data=new FormData(briefForm),features=data.getAll('features'),goals=data.getAll('goals');return `DIMPLE ENTERPRISES - PROJECT BRIEF\n\nBusiness: ${data.get('business')||'Not entered'}\nContact: ${data.get('contact')||'Not entered'}\nProject type: ${data.get('project_type')||'Not selected'}\nPrimary goals: ${goals.length?goals.join(', '):'Not selected'}\nRequested features: ${features.length?features.join(', '):'Not selected'}\nTarget timeline: ${data.get('timeline')||'Not selected'}\nBudget range: ${data.get('budget')||'Not selected'}\n\nNotes:\n${data.get('notes')||'None'}\n\nGenerated at https://darshan-eeshwar.github.io/project-brief.html`; }function updateBrief(){const text=buildBrief();if(briefPreview)briefPreview.textContent=text;}if(briefForm){briefForm.addEventListener('input',updateBrief);updateBrief();}if(briefDownload)briefDownload.addEventListener('click',()=>{const blob=new Blob([buildBrief()],{type:'text/plain'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Dimple-Enterprises-Project-Brief.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});const readingProgress=document.querySelector('.reading-progress');if(readingProgress)addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight,progress=max>0?scrollY/max*100:0;readingProgress.style.width=`${Math.min(100,progress)}%`;},{passive:true});document.addEventListener('keydown',event=>{if(event.key==='/'&&!event.ctrlKey&&!event.metaKey&&!event.altKey&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)){event.preventDefault();const search=document.querySelector('#site-search');if(search)search.focus();else location.href='/search.html';}});const searchForm=document.querySelector('#search-form'),searchInput=document.querySelector('#site-search'),searchResults=document.querySelector('#search-results'),searchSummary=document.querySelector('#search-summary'),recentWrap=document.querySelector('#recent-searches');let searchIndex=[];function addHighlighted(parent,text,terms){let remaining=text,lower=text.toLowerCase(),position=0;const hits=[];terms.forEach(term=>{let start=0,index;while((index=lower.indexOf(term,start))>-1){hits.push([index,index+term.length]);start=index+term.length;}});hits.sort((a,b)=>a[0]-b[0]);const merged=[];hits.forEach(hit=>{const last=merged[merged.length-1];if(last&&hit[0]<=last[1])last[1]=Math.max(last[1],hit[1]);else merged.push(hit);});merged.forEach(([start,end])=>{if(start>position)parent.append(text.slice(position,start));const mark=document.createElement('mark');mark.textContent=text.slice(start,end);parent.append(mark);position=end;});if(position<text.length)parent.append(text.slice(position));}function renderRecent(){if(!recentWrap)return;let recent=[];try{recent=JSON.parse(sessionStorage.getItem('dimple-searches')||'[]')}catch(e){}recentWrap.replaceChildren();recent.forEach(query=>{const button=document.createElement('button');button.type='button';button.textContent=query;button.addEventListener('click',()=>{searchInput.value=query;runSearch(query)});recentWrap.append(button);});}function saveRecent(query){try{let recent=JSON.parse(sessionStorage.getItem('dimple-searches')||'[]');recent=[query,...recent.filter(x=>x!==query)].slice(0,5);sessionStorage.setItem('dimple-searches',JSON.stringify(recent));renderRecent();}catch(e){}}function runSearch(raw){if(!searchResults)return;const query=raw.trim().toLowerCase(),terms=query.split(/\s+/).filter(Boolean);searchResults.replaceChildren();if(!terms.length){searchSummary.textContent='Enter a word or phrase to search.';return;}const found=searchIndex.map(item=>{const title=item.title.toLowerCase(),description=item.description.toLowerCase(),keywords=item.keywords.toLowerCase();let score=0;terms.forEach(term=>{if(title.includes(term))score+=5;if(keywords.includes(term))score+=3;if(description.includes(term))score+=1;});return{item,score};}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);searchSummary.textContent=`${found.length} result${found.length===1?'':'s'} for “${raw.trim()}”`;found.forEach(({item})=>{const link=document.createElement('a');link.className='search-result';link.href=item.url;const title=document.createElement('b'),desc=document.createElement('p'),type=document.createElement('small');addHighlighted(title,item.title,terms);addHighlighted(desc,item.description,terms);type.textContent=item.type;link.append(title,desc,type);searchResults.append(link);});saveRecent(raw.trim());const url=new URL(location.href);url.searchParams.set('q',raw.trim());history.replaceState(null,'',url);}if(searchForm){fetch('search-index.json').then(r=>r.json()).then(data=>{searchIndex=data;const initial=new URLSearchParams(location.search).get('q')||'';searchInput.value=initial;if(initial)runSearch(initial);else searchSummary.textContent='Search services, tools, policies and guides.';}).catch(()=>searchSummary.textContent='Search index is unavailable. Please try again online.');searchForm.addEventListener('submit',event=>{event.preventDefault();runSearch(searchInput.value)});renderRecent();}const assessment=document.querySelector('#readiness-assessment'),assessmentProgress=document.querySelector('#assessment-progress span'),assessmentStatus=document.querySelector('#assessment-status'),assessmentResult=document.querySelector('#assessment-result'),scoreRing=document.querySelector('#score-ring'),scoreLabel=document.querySelector('#score-label'),scoreSummary=document.querySelector('#score-summary'),recommendationList=document.querySelector('#recommendations'),downloadAssessment=document.querySelector('#download-assessment'),resetAssessment=document.querySelector('#reset-assessment');const assessmentAdvice={website:'Create or improve a mobile-friendly website with clear services and contact actions.',speed:'Review image sizes, scripts and hosting to improve mobile loading performance.',contact:'Make phone, WhatsApp and enquiry actions easy to find and test them regularly.',profile:'Complete and maintain an accurate Google Business Profile.',reviews:'Build a consistent process for requesting genuine customer reviews.',content:'Publish clear service information and useful answers to customer questions.',security:'Use HTTPS, strong access controls, backups and multi-factor authentication.',analytics:'Measure qualified enquiries, calls and messages with privacy-conscious analytics.',followup:'Define who responds to new leads and how quickly follow-up happens.',brand:'Use consistent business names, colours, messaging and contact details.',privacy:'Publish appropriate privacy information and collect only necessary form data.',maintenance:'Schedule content, security and dependency reviews after launch.'};let assessmentReport='';function updateAssessmentProgress(){if(!assessment)return;const answered=new Set([...new FormData(assessment).keys()]).size,total=assessment.querySelectorAll('fieldset').length,percent=Math.round(answered/total*100);if(assessmentProgress)assessmentProgress.style.width=`${percent}%`;if(assessmentStatus)assessmentStatus.textContent=`${answered} of ${total} questions answered`;}function calculateAssessment(event){event.preventDefault();const data=new FormData(assessment),questions=[...assessment.querySelectorAll('fieldset')];if(new Set([...data.keys()]).size<questions.length){if(assessmentStatus)assessmentStatus.textContent='Please answer every question before calculating your score.';return;}let points=0,missing=[];questions.forEach(group=>{const value=Number(data.get(group.dataset.key));points+=value;if(value===0)missing.push(group.dataset.key)});const score=Math.round(points/(questions.length*2)*100);let level=score>=80?'Strong foundation':score>=55?'Developing foundation':'Priority improvements needed';const advice=missing.length?missing.slice(0,6).map(key=>assessmentAdvice[key]):['Maintain the current foundation, review performance regularly and keep information accurate.'];scoreRing.style.setProperty('--score',`${score}%`);scoreRing.querySelector('span').textContent=`${score}%`;scoreLabel.textContent=level;scoreSummary.textContent=score>=80?'Your digital basics are well covered. Focus on measurement, testing and continuous improvement.':score>=55?'Several foundations are working, but closing the gaps below can improve credibility and enquiries.':'Start with the recommendations below to create a safer, clearer and more discoverable digital presence.';recommendationList.replaceChildren(...advice.map(text=>{const li=document.createElement('li');li.textContent=text;return li}));assessmentResult.hidden=false;assessmentReport=`DIMPLE ENTERPRISES - DIGITAL READINESS REPORT\n\nScore: ${score}% - ${level}\n\nPriority recommendations:\n${advice.map((text,i)=>`${i+1}. ${text}`).join('\n')}\n\nThis self-assessment is an educational planning aid, not a technical audit or guarantee.\nGenerated at https://darshan-eeshwar.github.io/readiness-assessment.html`;assessmentResult.scrollIntoView({behavior:'smooth',block:'start'});}if(assessment){assessment.addEventListener('change',updateAssessmentProgress);assessment.addEventListener('submit',calculateAssessment);updateAssessmentProgress();}if(downloadAssessment)downloadAssessment.addEventListener('click',()=>{if(!assessmentReport)return;const blob=new Blob([assessmentReport],{type:'text/plain'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Dimple-Enterprises-Digital-Readiness-Report.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});if(resetAssessment)resetAssessment.addEventListener('click',()=>{assessment.reset();assessmentResult.hidden=true;assessmentReport='';updateAssessmentProgress();scrollTo({top:0,behavior:'smooth'});});const quoteCompare=document.querySelector('#quote-comparison'),vendorAResult=document.querySelector('#vendor-a-result'),vendorBResult=document.querySelector('#vendor-b-result'),comparisonSummary=document.querySelector('#comparison-summary'),downloadComparison=document.querySelector('#download-comparison');let comparisonReport='';function scoreVendor(prefix){const boxes=[...quoteCompare.querySelectorAll(`[data-vendor="${prefix}"] input[type="checkbox"]`)],score=boxes.filter(x=>x.checked).length,total=boxes.length,cost=Number(quoteCompare.querySelector(`[name="${prefix}_cost"]`).value)||0,name=quoteCompare.querySelector(`[name="${prefix}_name"]`).value||`Vendor ${prefix.toUpperCase()}`;return{name,cost,score,total,percent:Math.round(score/total*100)}}function updateComparison(){if(!quoteCompare)return;const a=scoreVendor('a'),b=scoreVendor('b');vendorAResult.innerHTML=`<b>${a.percent}% complete</b><span>${a.name} · ₹${a.cost.toLocaleString('en-IN')}</span>`;vendorBResult.innerHTML=`<b>${b.percent}% complete</b><span>${b.name} · ₹${b.cost.toLocaleString('en-IN')}</span>`;const message=a.percent===b.percent?'Both proposals currently cover the same number of comparison points. Review scope detail, exclusions and fit.':`${a.percent>b.percent?a.name:b.name} currently covers more of the comparison points. Price alone should not decide the final choice.`;comparisonSummary.textContent=message;comparisonReport=`DIMPLE ENTERPRISES - WEBSITE QUOTE COMPARISON\n\n${a.name}: ₹${a.cost.toLocaleString('en-IN')} · ${a.score}/${a.total} points (${a.percent}%)\n${b.name}: ₹${b.cost.toLocaleString('en-IN')} · ${b.score}/${b.total} points (${b.percent}%)\n\nSummary: ${message}\n\nThis tool compares declared proposal completeness only. It does not verify quality, capability or legal terms.\nGenerated at https://darshan-eeshwar.github.io/quote-comparison.html`; }if(quoteCompare){quoteCompare.addEventListener('input',updateComparison);updateComparison();}if(downloadComparison)downloadComparison.addEventListener('click',()=>{const blob=new Blob([comparisonReport],{type:'text/plain'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Website-Quote-Comparison.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});const timelinePlanner=document.querySelector('#timeline-planner'),timelineStart=document.querySelector('#timeline-start'),timelineType=document.querySelector('#timeline-type'),milestoneList=document.querySelector('#milestone-list'),timelineSummary=document.querySelector('#timeline-summary'),downloadTimeline=document.querySelector('#download-timeline'),downloadCalendar=document.querySelector('#download-calendar');let plannedMilestones=[];const timelinePlans={starter:[['Discovery and goals',2],['Content and structure',3],['Design and build',6],['Review and revisions',3],['Testing and launch',2]],business:[['Discovery and goals',3],['Content and architecture',5],['Design direction',5],['Development',10],['Review and revisions',5],['Testing and launch',3]],commerce:[['Discovery and catalogue planning',5],['Content and data preparation',7],['Experience design',7],['Development and integration',14],['Review and revisions',7],['Testing and launch',5]]};function addBusinessDays(date,days){const result=new Date(date);let added=0;while(added<days){result.setDate(result.getDate()+1);if(result.getDay()!==0&&result.getDay()!==6)added++;}return result;}function localDate(value){const [y,m,d]=value.split('-').map(Number);return new Date(y,m-1,d,12);}function formatDate(date){return date.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'});}function icsDate(date){return `${date.getFullYear()}${String(date.getMonth()+1).padStart(2,'0')}${String(date.getDate()).padStart(2,'0')}`;}function updateTimeline(){if(!timelinePlanner||!timelineStart.value)return;let cursor=localDate(timelineStart.value);const plan=timelinePlans[timelineType.value],start=new Date(cursor);plannedMilestones=plan.map(([name,days])=>{const phaseStart=new Date(cursor);cursor=addBusinessDays(cursor,days);return{name,days,start:phaseStart,end:new Date(cursor)}});milestoneList.replaceChildren(...plannedMilestones.map(item=>{const li=document.createElement('li'),time=document.createElement('time'),wrap=document.createElement('div'),title=document.createElement('b'),detail=document.createElement('small');time.dateTime=item.end.toISOString().slice(0,10);time.textContent=formatDate(item.end);title.textContent=item.name;detail.textContent=`${item.days} working day${item.days===1?'':'s'} · ${formatDate(item.start)} to ${formatDate(item.end)}`;wrap.append(title,detail);li.append(time,wrap);return li;}));const total=plan.reduce((sum,x)=>sum+x[1],0);timelineSummary.textContent=`Indicative plan: ${total} working days · ${formatDate(start)} to ${formatDate(cursor)}. Weekends are excluded; holidays, content delays and approval time may change the schedule.`;}if(timelineStart){const next=new Date();next.setDate(next.getDate()+1);timelineStart.min=next.toISOString().slice(0,10);timelineStart.value=next.toISOString().slice(0,10);}if(timelinePlanner){timelinePlanner.addEventListener('input',updateTimeline);updateTimeline();}if(downloadTimeline)downloadTimeline.addEventListener('click',()=>{const text=`DIMPLE ENTERPRISES - INDICATIVE PROJECT TIMELINE\n\n${timelineSummary.textContent}\n\n${plannedMilestones.map((m,i)=>`${i+1}. ${m.name}: ${formatDate(m.start)} to ${formatDate(m.end)} (${m.days} working days)`).join('\n')}\n\nPlanning estimate only; final delivery dates are confirmed after scope, content and dependencies are reviewed.`;const blob=new Blob([text],{type:'text/plain'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Dimple-Enterprises-Project-Timeline.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});if(downloadCalendar)downloadCalendar.addEventListener('click',()=>{const events=plannedMilestones.map((m,i)=>`BEGIN:VEVENT\r\nUID:dimple-${i}-${icsDate(m.start)}@darshan-eeshwar.github.io\r\nDTSTART;VALUE=DATE:${icsDate(m.start)}\r\nDTEND;VALUE=DATE:${icsDate(addBusinessDays(m.end,1))}\r\nSUMMARY:Dimple Enterprises - ${m.name}\r\nDESCRIPTION:Indicative project milestone; confirm final dates after scope review.\r\nEND:VEVENT`).join('\r\n');const calendar=`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Dimple Enterprises//Timeline Planner//EN\r\nCALSCALE:GREGORIAN\r\n${events}\r\nEND:VCALENDAR\r\n`,blob=new Blob([calendar],{type:'text/calendar'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Dimple-Enterprises-Project-Timeline.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});const brandForm=document.querySelector('#brand-planner'),brandName=document.querySelector('#brand-name'),brandTagline=document.querySelector('#brand-tagline'),brandPrimary=document.querySelector('#brand-primary'),brandBackground=document.querySelector('#brand-background'),brandText=document.querySelector('#brand-text'),brandPreview=document.querySelector('#brand-preview'),brandPreviewName=document.querySelector('#brand-preview-name'),brandPreviewTagline=document.querySelector('#brand-preview-tagline'),brandButton=document.querySelector('#brand-sample-button'),contrastValue=document.querySelector('#contrast-value'),contrastNormal=document.querySelector('#contrast-normal'),contrastLarge=document.querySelector('#contrast-large'),brandSwatches=document.querySelector('#brand-swatches'),downloadBrandNotes=document.querySelector('#download-brand-notes'),downloadBrandCss=document.querySelector('#download-brand-css');let brandRatio=0;function hexRgb(hex){const clean=hex.replace('#','');return[0,2,4].map(i=>parseInt(clean.slice(i,i+2),16)/255)}function luminance(hex){const rgb=hexRgb(hex).map(v=>v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4));return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2]}function contrast(a,b){const l1=luminance(a),l2=luminance(b);return(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05)}function downloadText(name,text,type='text/plain'){const blob=new Blob([text],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}function updateBrand(){if(!brandForm)return;const primary=brandPrimary.value,background=brandBackground.value,text=brandText.value;brandPreview.style.background=background;brandPreview.style.color=text;brandButton.style.background=primary;brandButton.style.color=contrast(primary,'#ffffff')>=4.5?'#ffffff':'#000000';brandPreviewName.textContent=brandName.value||'Your Business';brandPreviewTagline.textContent=brandTagline.value||'A clear promise for your customers.';brandRatio=contrast(text,background);contrastValue.textContent=`${brandRatio.toFixed(2)}:1`;const normalPass=brandRatio>=4.5,largePass=brandRatio>=3;contrastNormal.textContent=normalPass?'Passes AA for normal text':'Does not pass AA for normal text';contrastLarge.textContent=largePass?'Passes AA for large text':'Does not pass AA for large text';contrastNormal.className=normalPass?'contrast-pass':'contrast-fail';contrastLarge.className=largePass?'contrast-pass':'contrast-fail';const colours=[['Primary',primary],['Background',background],['Text',text]];brandSwatches.replaceChildren(...colours.map(([label,value])=>{const span=document.createElement('span');span.style.background=value;span.style.color=contrast(value,'#ffffff')>=4.5?'#ffffff':'#000000';span.textContent=`${label}\n${value.toUpperCase()}`;return span;}));}if(brandForm){brandForm.addEventListener('input',updateBrand);updateBrand();}if(downloadBrandNotes)downloadBrandNotes.addEventListener('click',()=>downloadText('Brand-Starter-Notes.txt',`BRAND STARTER NOTES\n\nBusiness: ${brandName.value}\nTagline: ${brandTagline.value}\nPrimary: ${brandPrimary.value}\nBackground: ${brandBackground.value}\nText: ${brandText.value}\nText/background contrast: ${brandRatio.toFixed(2)}:1\nNormal text AA: ${brandRatio>=4.5?'Pass':'Fail'}\nLarge text AA: ${brandRatio>=3?'Pass':'Fail'}\n\nThis palette check covers colour contrast only and is not a complete accessibility audit.`));if(downloadBrandCss)downloadBrandCss.addEventListener('click',()=>downloadText('brand-colours.css',`:root {\n  --brand-primary: ${brandPrimary.value};\n  --brand-background: ${brandBackground.value};\n  --brand-text: ${brandText.value};\n}\n`,'text/css'));const snippetForm=document.querySelector('#snippet-planner'),snippetTitle=document.querySelector('#snippet-title'),snippetDescription=document.querySelector('#snippet-description'),snippetDomain=document.querySelector('#snippet-domain'),snippetSlug=document.querySelector('#snippet-slug'),snippetTitleCount=document.querySelector('#snippet-title-count'),snippetDescriptionCount=document.querySelector('#snippet-description-count'),searchPreviewUrl=document.querySelector('#search-preview-url'),searchPreviewTitle=document.querySelector('#search-preview-title'),searchPreviewDescription=document.querySelector('#search-preview-description'),socialPreviewTitle=document.querySelector('#social-preview-title'),socialPreviewDescription=document.querySelector('#social-preview-description'),socialPreviewDomain=document.querySelector('#social-preview-domain'),metadataOutput=document.querySelector('#metadata-output'),downloadMetadata=document.querySelector('#download-metadata'),downloadSeoBrief=document.querySelector('#download-seo-brief');let generatedMetadata='';function safeUrlPart(value){return value.trim().toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'')}function escapeAttr(value){return value.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}function counterState(element,length,good,limit){element.textContent=`${length} / ${limit} characters`;element.className='char-count '+(length<=good?'good':length<=limit?'warn':'over')}function updateSnippet(){if(!snippetForm)return;const title=snippetTitle.value.trim()||'Your page title',description=snippetDescription.value.trim()||'A clear, useful description of this page.',domain=snippetDomain.value.trim().replace(/^https?:\/\//,'').replace(/\/$/,'')||'example.com',slug=safeUrlPart(snippetSlug.value)||'page',url=`https://${domain}/${slug}`;counterState(snippetTitleCount,snippetTitle.value.length,55,60);counterState(snippetDescriptionCount,snippetDescription.value.length,150,160);searchPreviewUrl.textContent=url;searchPreviewTitle.textContent=title;searchPreviewDescription.textContent=description;socialPreviewTitle.textContent=title;socialPreviewDescription.textContent=description;socialPreviewDomain.textContent=domain;generatedMetadata=`<title>${escapeAttr(title)}</title>\n<meta name="description" content="${escapeAttr(description)}">\n<link rel="canonical" href="${escapeAttr(url)}">\n<meta property="og:type" content="website">\n<meta property="og:title" content="${escapeAttr(title)}">\n<meta property="og:description" content="${escapeAttr(description)}">\n<meta property="og:url" content="${escapeAttr(url)}">\n<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="${escapeAttr(title)}">\n<meta name="twitter:description" content="${escapeAttr(description)}">`;metadataOutput.textContent=generatedMetadata;}if(snippetForm){snippetForm.addEventListener('input',updateSnippet);snippetSlug.addEventListener('blur',()=>{snippetSlug.value=safeUrlPart(snippetSlug.value);updateSnippet()});updateSnippet();}if(downloadMetadata)downloadMetadata.addEventListener('click',()=>downloadText('page-metadata.html',generatedMetadata,'text/html'));if(downloadSeoBrief)downloadSeoBrief.addEventListener('click',()=>downloadText('SEO-Snippet-Brief.txt',`SEO SNIPPET BRIEF\n\nTitle: ${snippetTitle.value}\nTitle length: ${snippetTitle.value.length}\nDescription: ${snippetDescription.value}\nDescription length: ${snippetDescription.value.length}\nDomain: ${snippetDomain.value}\nSlug: ${safeUrlPart(snippetSlug.value)}\n\nCharacter counts are planning guidance only. Search engines may rewrite or truncate displayed snippets. Metadata does not guarantee rankings.`));const solutionFinder=document.querySelector('#solution-finder'),finderResult=document.querySelector('#finder-result'),finderPackage=document.querySelector('#finder-package'),finderSummary=document.querySelector('#finder-summary'),finderReasons=document.querySelector('#finder-reasons'),finderCaution=document.querySelector('#finder-caution'),downloadRecommendation=document.querySelector('#download-recommendation'),shareRecommendation=document.querySelector('#share-recommendation');let recommendationText='';function calculateSolution(event){event.preventDefault();const data=new FormData(solutionFinder),required=['goal','pages','commerce','content','growth','budget'];if(required.some(key=>!data.get(key))){finderResult.hidden=false;finderPackage.textContent='Complete all questions';finderSummary.textContent='Choose one answer for every question to receive a recommendation.';finderReasons.replaceChildren();finderCaution.textContent='';return;}let score=0,reasons=[];const commerce=data.get('commerce')==='yes';if(data.get('goal')==='sell'){score+=4;reasons.push('Online selling is a primary goal.')}if(data.get('goal')==='leads'){score+=2;reasons.push('The website needs a stronger enquiry journey.')}if(data.get('pages')==='many'){score+=2;reasons.push('The expected content needs a multi-page structure.')}if(data.get('content')==='help'){score+=1;reasons.push('Content planning support is needed.')}if(data.get('growth')==='yes'){score+=2;reasons.push('SEO and analytics foundations are important.')}if(commerce){score+=5;reasons.push('A product catalogue or commerce workflow is required.')}let packageName=commerce||score>=8?'Commerce solution':score>=4?'Business Growth':'Starter Presence';const descriptions={'Starter Presence':'A focused mobile-friendly presence with clear services, WhatsApp and enquiry actions.','Business Growth':'A multi-page website with richer content, local SEO foundations and analytics-ready actions.','Commerce solution':'A catalogue or commerce-focused experience with order, payment and integration planning.'};const budget=data.get('budget');let caution='Final scope and price require a requirements review.';if(packageName==='Commerce solution'&&budget==='under20')caution='Your selected commerce needs are unlikely to fit the lowest budget range. Consider a phased catalogue-first approach.';else if(packageName==='Business Growth'&&budget==='under20')caution='Your goals suggest a Growth solution, but the selected budget may require a smaller first phase.';else if(packageName==='Starter Presence'&&(budget==='50to100'||budget==='above100'))caution='Your budget may support a broader Growth solution; confirm whether additional content or integrations would add value.';finderPackage.textContent=packageName;finderSummary.textContent=descriptions[packageName];finderReasons.replaceChildren(...reasons.map(reason=>{const li=document.createElement('li');li.textContent=reason;return li}));finderCaution.textContent=caution;finderResult.hidden=false;recommendationText=`DIMPLE ENTERPRISES - SOLUTION FINDER\n\nRecommended starting point: ${packageName}\n${descriptions[packageName]}\n\nWhy:\n${reasons.map((r,i)=>`${i+1}. ${r}`).join('\n')}\n\nBudget note: ${caution}\n\nThis is a rule-based starting recommendation, not a final scope or quote.`;shareRecommendation.href=`https://wa.me/919566911041?text=${encodeURIComponent(`Hello Dimple Enterprises, your solution finder recommended ${packageName}. I would like to discuss the scope. ${caution}`)}`;finderResult.scrollIntoView({behavior:'smooth',block:'start'});}if(solutionFinder)solutionFinder.addEventListener('submit',calculateSolution);if(downloadRecommendation)downloadRecommendation.addEventListener('click',()=>{if(recommendationText)downloadText('Dimple-Enterprises-Solution-Recommendation.txt',recommendationText)});const maintenance=document.querySelector('#maintenance-planner'),maintenanceStart=document.querySelector('#maintenance-start'),maintenanceProgress=document.querySelector('#maintenance-progress span'),maintenanceStatus=document.querySelector('#maintenance-status'),resetMaintenance=document.querySelector('#reset-maintenance'),downloadMaintenance=document.querySelector('#download-maintenance'),maintenanceKey='dimple-maintenance-progress';function addPeriod(date,frequency){const next=new Date(date);if(frequency==='weekly')next.setDate(next.getDate()+7);if(frequency==='monthly')next.setMonth(next.getMonth()+1);if(frequency==='quarterly')next.setMonth(next.getMonth()+3);if(frequency==='annual')next.setFullYear(next.getFullYear()+1);return next;}function nextDue(start,frequency){let due=new Date(start),today=new Date();today.setHours(0,0,0,0);while(due<today)due=addPeriod(due,frequency);return due;}function formatMaintenanceDate(date){return date.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}function updateMaintenance(){if(!maintenance)return;const boxes=[...maintenance.querySelectorAll('input[type="checkbox"]')],done=boxes.filter(x=>x.checked).length,percent=Math.round(done/boxes.length*100);maintenanceProgress.style.width=`${percent}%`;maintenanceStatus.textContent=`${done} of ${boxes.length} tasks marked complete (${percent}%). Completion is stored only in this browser.`;const start=maintenanceStart.value?new Date(`${maintenanceStart.value}T12:00:00`):new Date();document.querySelectorAll('[data-frequency]').forEach(group=>{const due=nextDue(start,group.dataset.frequency),time=group.querySelector('time');time.dateTime=due.toISOString().slice(0,10);time.textContent=`Next: ${formatMaintenanceDate(due)}`;});try{const state={start:maintenanceStart.value,checked:boxes.map(x=>x.checked)};localStorage.setItem(maintenanceKey,JSON.stringify(state));}catch(e){}}if(maintenance){const tomorrow=new Date();tomorrow.setDate(tomorrow.getDate()+1);maintenanceStart.value=tomorrow.toISOString().slice(0,10);try{const saved=JSON.parse(localStorage.getItem(maintenanceKey)||'null');if(saved){maintenanceStart.value=saved.start||maintenanceStart.value;[...maintenance.querySelectorAll('input[type="checkbox"]')].forEach((box,i)=>box.checked=Boolean(saved.checked?.[i]));}}catch(e){}maintenance.addEventListener('change',updateMaintenance);updateMaintenance();}if(resetMaintenance)resetMaintenance.addEventListener('click',()=>{maintenance.querySelectorAll('input[type="checkbox"]').forEach(x=>x.checked=false);try{localStorage.removeItem(maintenanceKey)}catch(e){}updateMaintenance();});if(downloadMaintenance)downloadMaintenance.addEventListener('click',()=>{const start=maintenanceStart.value.replaceAll('-',''),groups=[...document.querySelectorAll('[data-frequency]')],rules={weekly:'FREQ=WEEKLY;COUNT=52',monthly:'FREQ=MONTHLY;COUNT=12',quarterly:'FREQ=MONTHLY;INTERVAL=3;COUNT=4',annual:'FREQ=YEARLY;COUNT=1'},events=groups.flatMap((group,gi)=>[...group.querySelectorAll('.maintenance-tasks label')].map((label,ti)=>`BEGIN:VEVENT\r\nUID:dimple-maintenance-${gi}-${ti}@darshan-eeshwar.github.io\r\nDTSTART;VALUE=DATE:${start}\r\nRRULE:${rules[group.dataset.frequency]}\r\nSUMMARY:Website maintenance - ${label.textContent.trim()}\r\nDESCRIPTION:Planning reminder generated by Dimple Enterprises maintenance planner.\r\nEND:VEVENT`)).join('\r\n'),calendar=`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Dimple Enterprises//Maintenance Planner//EN\r\nCALSCALE:GREGORIAN\r\n${events}\r\nEND:VCALENDAR\r\n`,blob=new Blob([calendar],{type:'text/calendar'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Website-Maintenance-Reminders.ics';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});const toolsSearch=document.querySelector('#tools-search'),toolCards=[...document.querySelectorAll('.hub-tool')],toolFilters=[...document.querySelectorAll('[data-tool-filter]')],toolsSummary=document.querySelector('#tools-summary'),recentTools=document.querySelector('#recent-tools'),toolFavKey='dimple-favourite-tools',toolRecentKey='dimple-recent-tools';let activeToolFilter='all';function savedJson(key,fallback=[]){try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch(e){return fallback}}function renderToolState(){const favourites=savedJson(toolFavKey),query=(toolsSearch?.value||'').trim().toLowerCase();let visible=0;toolCards.forEach(card=>{const matchFilter=activeToolFilter==='all'||activeToolFilter==='favourites'&&favourites.includes(card.dataset.tool)||card.dataset.category===activeToolFilter,matchQuery=!query||card.textContent.toLowerCase().includes(query),show=matchFilter&&matchQuery;card.hidden=!show;if(show)visible++;const button=card.querySelector('.favourite-tool'),saved=favourites.includes(card.dataset.tool);button.classList.toggle('saved',saved);button.textContent=saved?'★':'☆';button.setAttribute('aria-label',saved?'Remove from favourites':'Add to favourites');});if(toolsSummary)toolsSummary.textContent=`Showing ${visible} of ${toolCards.length} tools.`;}toolFilters.forEach(button=>button.addEventListener('click',()=>{activeToolFilter=button.dataset.toolFilter;toolFilters.forEach(x=>x.classList.toggle('active',x===button));renderToolState();}));if(toolsSearch)toolsSearch.addEventListener('input',renderToolState);document.querySelectorAll('.favourite-tool').forEach(button=>button.addEventListener('click',()=>{const id=button.closest('.hub-tool').dataset.tool;let favourites=savedJson(toolFavKey);favourites=favourites.includes(id)?favourites.filter(x=>x!==id):[...favourites,id];try{localStorage.setItem(toolFavKey,JSON.stringify(favourites))}catch(e){}renderToolState();}));document.querySelectorAll('.hub-tool a').forEach(link=>link.addEventListener('click',()=>{const card=link.closest('.hub-tool'),record={id:card.dataset.tool,title:card.querySelector('h2').textContent,url:link.getAttribute('href')};let recent=savedJson(toolRecentKey);recent=[record,...recent.filter(x=>x.id!==record.id)].slice(0,4);try{localStorage.setItem(toolRecentKey,JSON.stringify(recent))}catch(e){}}));function renderRecentTools(){if(!recentTools)return;const recent=savedJson(toolRecentKey);recentTools.replaceChildren();if(!recent.length){recentTools.hidden=true;return;}recentTools.hidden=false;const strong=document.createElement('strong');strong.textContent='Recently used: ';recentTools.append(strong);recent.forEach(item=>{const a=document.createElement('a');a.href=item.url;a.textContent=item.title;recentTools.append(a);});}if(toolCards.length){renderToolState();renderRecentTools();}const copyPlanner=document.querySelector('#homepage-copy-planner'),copyHeadline=document.querySelector('#copy-headline'),copyAudience=document.querySelector('#copy-audience'),copyPromise=document.querySelector('#copy-promise'),copyServices=document.querySelector('#copy-services'),copyProof=document.querySelector('#copy-proof'),copyCta=document.querySelector('#copy-cta'),copyFaq=document.querySelector('#copy-faq'),copyPreviewHeadline=document.querySelector('#copy-preview-headline'),copyPreviewPromise=document.querySelector('#copy-preview-promise'),copyPreviewCta=document.querySelector('#copy-preview-cta'),copyChecklist=document.querySelector('#copy-checklist'),downloadCopy=document.querySelector('#download-copy'),clearCopy=document.querySelector('#clear-copy'),copyKey='dimple-homepage-copy';function copyValues(){return{headline:copyHeadline.value.trim(),audience:copyAudience.value.trim(),promise:copyPromise.value.trim(),services:copyServices.value.trim(),proof:copyProof.value.trim(),cta:copyCta.value.trim(),faq:copyFaq.value.trim()}}function updateCopyPlanner(){if(!copyPlanner)return;const v=copyValues();copyPreviewHeadline.textContent=v.headline||'A clear outcome-focused headline';copyPreviewPromise.textContent=v.promise||'Explain what you deliver, who it helps and why it matters.';copyPreviewCta.textContent=v.cta||'Primary action';const checks=[['Headline is concise and outcome-focused',v.headline.length>=20&&v.headline.length<=70],['Target customer is identified',v.audience.length>=10],['Promise explains a useful outcome',v.promise.length>=30],['Services are specific',v.services.split(/\n|,/).filter(Boolean).length>=2],['Proof is factual and supportable',v.proof.length>=15],['Call to action uses a clear verb',v.cta.length>=5],['At least two customer questions are prepared',v.faq.split('\n').filter(Boolean).length>=2]];copyChecklist.replaceChildren(...checks.map(([text,done])=>{const li=document.createElement('li');li.className=done?'done':'todo';li.textContent=`${done?'✓':'○'} ${text}`;return li}));document.querySelectorAll('[data-copy-count]').forEach(el=>{const field=document.querySelector(el.dataset.copyCount),limit=Number(el.dataset.limit);el.textContent=`${field.value.length} / ${limit}`;});try{localStorage.setItem(copyKey,JSON.stringify(v))}catch(e){}}if(copyPlanner){try{const saved=JSON.parse(localStorage.getItem(copyKey)||'null');if(saved)Object.entries(saved).forEach(([key,value])=>{const field=document.querySelector(`#copy-${key}`);if(field)field.value=value;});}catch(e){}copyPlanner.addEventListener('input',updateCopyPlanner);updateCopyPlanner();}if(downloadCopy)downloadCopy.addEventListener('click',()=>{const v=copyValues(),markdown=`# Homepage Copy Brief\n\n## Hero headline\n${v.headline}\n\n## Target customer\n${v.audience}\n\n## Core promise\n${v.promise}\n\n## Services\n${v.services.split('\n').map(x=>x.trim()).filter(Boolean).map(x=>`- ${x}`).join('\n')}\n\n## Trust and proof\n${v.proof}\n\n## Primary call to action\n${v.cta}\n\n## FAQ ideas\n${v.faq.split('\n').map(x=>x.trim()).filter(Boolean).map(x=>`- ${x}`).join('\n')}\n\n> Review every claim for accuracy before publishing.`,blob=new Blob([markdown],{type:'text/markdown'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Homepage-Copy-Brief.md';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});if(clearCopy)clearCopy.addEventListener('click',()=>{copyPlanner.reset();try{localStorage.removeItem(copyKey)}catch(e){}updateCopyPlanner();});const imageOptimizer=document.querySelector('#image-optimizer'),imageInput=document.querySelector('#image-input'),imageWidth=document.querySelector('#image-width'),imageQuality=document.querySelector('#image-quality'),imageQualityValue=document.querySelector('#image-quality-value'),imageFormat=document.querySelector('#image-format'),optimizeImage=document.querySelector('#optimize-image'),downloadImage=document.querySelector('#download-image'),imagePreview=document.querySelector('#image-preview'),imagePlaceholder=document.querySelector('#image-placeholder'),imageOriginalStat=document.querySelector('#image-original-stat'),imageOutputStat=document.querySelector('#image-output-stat'),imageSavingStat=document.querySelector('#image-saving-stat'),imageStatus=document.querySelector('#image-status');let sourceImage=null,sourceFile=null,optimizedBlob=null,optimizedUrl=null;function formatBytes(bytes){if(!Number.isFinite(bytes))return'—';if(bytes<1024)return`${bytes} B`;if(bytes<1048576)return`${(bytes/1024).toFixed(1)} KB`;return`${(bytes/1048576).toFixed(2)} MB`}if(imageQuality)imageQuality.addEventListener('input',()=>imageQualityValue.textContent=`${imageQuality.value}%`);if(imageInput)imageInput.addEventListener('change',()=>{const file=imageInput.files?.[0];if(!file)return;if(!file.type.startsWith('image/')){imageStatus.textContent='Choose a supported image file.';return;}if(file.size>20*1024*1024){imageStatus.textContent='For reliable browser processing, choose an image under 20 MB.';return;}sourceFile=file;const url=URL.createObjectURL(file),img=new Image();img.onload=()=>{sourceImage=img;imageWidth.value=Math.min(img.naturalWidth,1920);imageWidth.max=img.naturalWidth;imageOriginalStat.textContent=`${formatBytes(file.size)} · ${img.naturalWidth}×${img.naturalHeight}`;imagePreview.src=url;imagePreview.hidden=false;imagePlaceholder.hidden=true;optimizeImage.disabled=false;downloadImage.disabled=true;imageOutputStat.textContent='Not processed';imageSavingStat.textContent='—';imageStatus.textContent='Image loaded locally. Choose settings and optimize.';};img.onerror=()=>{URL.revokeObjectURL(url);imageStatus.textContent='The browser could not read this image.';};img.src=url;});if(optimizeImage)optimizeImage.addEventListener('click',()=>{if(!sourceImage||!sourceFile)return;const maxWidth=Math.max(100,Math.min(Number(imageWidth.value)||sourceImage.naturalWidth,sourceImage.naturalWidth)),scale=maxWidth/sourceImage.naturalWidth,width=Math.round(sourceImage.naturalWidth*scale),height=Math.round(sourceImage.naturalHeight*scale),canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const ctx=canvas.getContext('2d'),type=imageFormat.value;ctx.fillStyle='#ffffff';ctx.fillRect(0,0,width,height);ctx.drawImage(sourceImage,0,0,width,height);imageStatus.textContent='Optimizing locally…';canvas.toBlob(blob=>{if(!blob){imageStatus.textContent='This browser could not create the selected format.';return;}optimizedBlob=blob;if(optimizedUrl)URL.revokeObjectURL(optimizedUrl);optimizedUrl=URL.createObjectURL(blob);imagePreview.src=optimizedUrl;const saving=Math.round((1-blob.size/sourceFile.size)*100);imageOutputStat.textContent=`${formatBytes(blob.size)} · ${width}×${height}`;imageSavingStat.textContent=saving>=0?`${saving}% smaller`:`${Math.abs(saving)}% larger`;imageStatus.textContent=saving>=0?'Optimization complete. Review and download.':'The output is larger than the original. Try a lower quality or smaller width.';downloadImage.disabled=false;},type,Number(imageQuality.value)/100);});if(downloadImage)downloadImage.addEventListener('click',()=>{if(!optimizedBlob)return;const ext=imageFormat.value==='image/webp'?'webp':'jpg',base=(sourceFile.name.replace(/\.[^.]+$/,'')||'website-image').replace(/[^a-z0-9_-]/gi,'-'),a=document.createElement('a');a.href=optimizedUrl;a.download=`${base}-optimized.${ext}`;a.click();});const socialCalendar=document.querySelector('#social-calendar'),socialCards=[...document.querySelectorAll('.social-card')],socialProgress=document.querySelector('#social-progress span'),socialStatus=document.querySelector('#social-status'),exportSocial=document.querySelector('#export-social'),resetSocial=document.querySelector('#reset-social'),socialKey='dimple-social-calendar';function socialData(){return socialCards.map(card=>({date:card.querySelector('[name="date"]').value,platform:card.querySelector('[name="platform"]').value,type:card.querySelector('[name="type"]').value,theme:card.querySelector('[name="theme"]').value.trim(),caption:card.querySelector('[name="caption"]').value.trim(),cta:card.querySelector('[name="cta"]').value.trim(),ready:card.querySelector('[name="ready"]').checked}))}function updateSocialCalendar(){if(!socialCalendar)return;const data=socialData(),ready=data.filter(x=>x.ready).length;socialProgress.style.width=`${Math.round(ready/data.length*100)}%`;socialStatus.textContent=`${ready} of ${data.length} posts marked ready. Drafts are stored only in this browser.`;socialCards.forEach(card=>{const caption=card.querySelector('[name="caption"]'),count=card.querySelector('.social-char');count.textContent=`${caption.value.length} / 500 characters`;});try{localStorage.setItem(socialKey,JSON.stringify(data))}catch(e){}}function seedSocialDates(){const today=new Date();socialCards.forEach((card,i)=>{const date=new Date(today);date.setDate(date.getDate()+i);card.querySelector('[name="date"]').value=date.toISOString().slice(0,10);});}if(socialCalendar){seedSocialDates();try{const saved=JSON.parse(localStorage.getItem(socialKey)||'null');if(saved?.length)socialCards.forEach((card,i)=>{const item=saved[i];if(!item)return;['date','platform','type','theme','caption','cta'].forEach(key=>card.querySelector(`[name="${key}"]`).value=item[key]||'');card.querySelector('[name="ready"]').checked=Boolean(item.ready);});}catch(e){}socialCalendar.addEventListener('input',updateSocialCalendar);socialCalendar.addEventListener('change',updateSocialCalendar);updateSocialCalendar();}function csvCell(value){return`"${String(value).replace(/"/g,'""')}"`}if(exportSocial)exportSocial.addEventListener('click',()=>{const header=['Date','Platform','Content type','Theme','Caption','Call to action','Ready'],rows=socialData().map(x=>[x.date,x.platform,x.type,x.theme,x.caption,x.cta,x.ready?'Yes':'No']),csv=[header,...rows].map(row=>row.map(csvCell).join(',')).join('\r\n'),blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Social-Content-Calendar.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});if(resetSocial)resetSocial.addEventListener('click',()=>{socialCalendar.reset();seedSocialDates();try{localStorage.removeItem(socialKey)}catch(e){}updateSocialCalendar();});const altFiles=document.querySelector('#alt-files'),altList=document.querySelector('#alt-list'),altSummary=document.querySelector('#alt-summary'),exportAlt=document.querySelector('#export-alt'),clearAlt=document.querySelector('#clear-alt');let altItems=[];function validateAlt(item){const alt=item.alt.trim(),context=item.context.trim();if(item.decorative)return{level:'good',text:'Decorative image: use an empty alt attribute (alt="").'};if(!alt)return{level:'warn',text:'Add concise alternative text or mark the image decorative.'};if(/^(image|picture|photo|graphic) of\b/i.test(alt))return{level:'warn',text:'Usually remove “image of” or “picture of” and describe the useful content directly.'};if(alt.length>125)return{level:'warn',text:'This is longer than 125 characters. Length is contextual, but consider making it more concise.'};if(!context)return{level:'warn',text:'Add the page context to confirm what information matters here.'};return{level:'good',text:'Looks like a useful starting point. Confirm it communicates the image purpose in this page context.'};}function renderAltItems(){if(!altList)return;altList.replaceChildren(...altItems.map((item,index)=>{const card=document.createElement('article');card.className='alt-card';const img=document.createElement('img');img.src=item.url;img.alt='';const fields=document.createElement('div');fields.className='alt-fields';const title=document.createElement('b');title.textContent=item.file.name;const contextLabel=document.createElement('label');contextLabel.textContent='Where and why is this image used?';const context=document.createElement('input');context.type='text';context.value=item.context;context.placeholder='Example: Service page hero showing the team at work';context.addEventListener('input',()=>{item.context=context.value;renderAltFeedback(card,item,index)});contextLabel.append(context);const altLabel=document.createElement('label');altLabel.textContent='Alternative text';const alt=document.createElement('textarea');alt.rows=3;alt.maxLength=300;alt.value=item.alt;alt.disabled=item.decorative;alt.placeholder='Describe the useful visual information in context';alt.addEventListener('input',()=>{item.alt=alt.value;renderAltFeedback(card,item,index)});altLabel.append(alt);const decorativeLabel=document.createElement('label');decorativeLabel.className='alt-decorative';const decorative=document.createElement('input');decorative.type='checkbox';decorative.checked=item.decorative;decorative.addEventListener('change',()=>{item.decorative=decorative.checked;if(item.decorative)item.alt='';renderAltItems()});decorativeLabel.append(decorative,document.createTextNode(' Decorative — intentionally use empty alt text'));const feedback=document.createElement('p');feedback.className='alt-feedback';feedback.dataset.feedback=String(index);fields.append(title,contextLabel,altLabel,decorativeLabel,feedback);card.append(img,fields);setTimeout(()=>renderAltFeedback(card,item,index),0);return card;}));const complete=altItems.filter(item=>validateAlt(item).level==='good').length;altSummary.textContent=altItems.length?`${complete} of ${altItems.length} images have a valid starting decision.`:'Choose up to 12 images to begin.';exportAlt.disabled=!altItems.length;}function renderAltFeedback(card,item,index){const feedback=card.querySelector(`[data-feedback="${index}"]`),result=validateAlt(item);feedback.className=`alt-feedback ${result.level}`;feedback.textContent=`${item.decorative?'0':item.alt.length} characters · ${result.text}`;const complete=altItems.filter(x=>validateAlt(x).level==='good').length;altSummary.textContent=`${complete} of ${altItems.length} images have a valid starting decision.`;}if(altFiles)altFiles.addEventListener('change',()=>{altItems.forEach(item=>URL.revokeObjectURL(item.url));const files=[...(altFiles.files||[])].filter(file=>file.type.startsWith('image/')).slice(0,12);altItems=files.map(file=>({file,url:URL.createObjectURL(file),context:'',alt:'',decorative:false}));renderAltItems();});function csvValue(value){return`"${String(value).replace(/"/g,'""')}"`}if(exportAlt)exportAlt.addEventListener('click',()=>{const header=['Filename','Page context','Decorative','Alt text','Validation note'],rows=altItems.map(item=>{const result=validateAlt(item);return[item.file.name,item.context,item.decorative?'Yes':'No',item.decorative?'':item.alt,result.text]}),csv=[header,...rows].map(row=>row.map(csvValue).join(',')).join('\r\n'),blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='Image-Alt-Text-Plan.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});if(clearAlt)clearAlt.addEventListener('click',()=>{altItems.forEach(item=>URL.revokeObjectURL(item.url));altItems=[];altFiles.value='';renderAltItems();});const htmlAuditForm=document.querySelector('#html-audit-form'),htmlAuditSource=document.querySelector('#html-audit-source'),htmlAuditFile=document.querySelector('#html-audit-file'),runHtmlAudit=document.querySelector('#run-html-audit'),clearHtmlAudit=document.querySelector('#clear-html-audit'),downloadHtmlAudit=document.querySelector('#download-html-audit'),htmlAuditOverview=document.querySelector('#html-audit-overview'),htmlAuditFindings=document.querySelector('#html-audit-findings'),htmlAuditStatus=document.querySelector('#html-audit-status');let htmlAuditReport='';function finding(severity,title,detail){return{severity,title,detail}}function accessibleText(el){return(el.getAttribute('aria-label')||el.getAttribute('title')||el.textContent||[...el.querySelectorAll('img[alt]')].map(x=>x.alt).join(' ')).trim()}function auditHtml(source){const doc=new DOMParser().parseFromString(source,'text/html'),findings=[];if(!doc.documentElement.lang)findings.push(finding('error','Document language missing','Add a valid lang attribute to the <html> element.'));else findings.push(finding('pass','Document language present',`lang="${doc.documentElement.lang}"`));if(!doc.title.trim())findings.push(finding('error','Page title missing','Add a concise, unique <title>.'));else findings.push(finding('pass','Page title present',doc.title.trim()));if(!doc.querySelector('meta[name="viewport"]'))findings.push(finding('warning','Viewport metadata missing','Add responsive viewport metadata for mobile users.'));const h1=doc.querySelectorAll('h1');if(h1.length!==1)findings.push(finding(h1.length?'warning':'error','Unexpected H1 count',`Found ${h1.length}; a clear page normally has one primary heading.`));else findings.push(finding('pass','One H1 found',h1[0].textContent.trim()));let previous=0;[...doc.querySelectorAll('h1,h2,h3,h4,h5,h6')].forEach(h=>{const level=Number(h.tagName[1]);if(previous&&level>previous+1)findings.push(finding('warning','Heading level skipped',`${h.tagName} follows H${previous}: ${h.textContent.trim().slice(0,80)}`));previous=level;});const images=[...doc.querySelectorAll('img')],missingAlt=images.filter(img=>!img.hasAttribute('alt'));if(missingAlt.length)findings.push(finding('error','Images missing alt attributes',`${missingAlt.length} of ${images.length} images do not have an alt attribute.`));else findings.push(finding('pass','Image alt attributes present',`${images.length} images checked.`));const controls=[...doc.querySelectorAll('input:not([type="hidden"]),select,textarea')],unlabelled=controls.filter(el=>!(el.labels?.length||el.getAttribute('aria-label')||el.getAttribute('aria-labelledby')));if(unlabelled.length)findings.push(finding('error','Form controls without labels',`${unlabelled.length} of ${controls.length} controls lack a label or accessible-name reference.`));else if(controls.length)findings.push(finding('pass','Form controls have label mechanisms',`${controls.length} controls checked.`));const unnamedButtons=[...doc.querySelectorAll('button,input[type="button"],input[type="submit"]')].filter(el=>el.tagName==='INPUT'?!el.value&&!el.getAttribute('aria-label'):!accessibleText(el));if(unnamedButtons.length)findings.push(finding('error','Buttons without accessible names',`${unnamedButtons.length} buttons need visible text or an accessible name.`));const links=[...doc.querySelectorAll('a[href]')],unnamedLinks=links.filter(link=>!accessibleText(link));if(unnamedLinks.length)findings.push(finding('error','Links without accessible names',`${unnamedLinks.length} links have no useful name.`));const ids=[...doc.querySelectorAll('[id]')].map(el=>el.id),duplicates=[...new Set(ids.filter((id,i)=>ids.indexOf(id)!==i))];if(duplicates.length)findings.push(finding('error','Duplicate IDs found',duplicates.slice(0,10).join(', ')));else findings.push(finding('pass','No duplicate IDs detected',`${ids.length} IDs checked.`));if(!doc.querySelector('main,[role="main"]'))findings.push(finding('warning','Main landmark missing','Add a <main> element or role="main".'));else findings.push(finding('pass','Main landmark present','A primary content landmark was found.'));if(!doc.querySelector('html'))findings.push(finding('error','HTML document not detected','Paste a complete HTML document for the most useful review.'));return findings;}function renderHtmlAudit(){const source=htmlAuditSource.value.trim();if(!source){htmlAuditStatus.textContent='Paste HTML or choose a local file first.';return;}const findings=auditHtml(source),counts={error:0,warning:0,pass:0};findings.forEach(x=>counts[x.severity]++);htmlAuditOverview.innerHTML=`<div class="audit-metric"><span>Checks</span><b>${findings.length}</b></div><div class="audit-metric"><span>Errors</span><b>${counts.error}</b></div><div class="audit-metric"><span>Warnings</span><b>${counts.warning}</b></div><div class="audit-metric"><span>Passes</span><b>${counts.pass}</b></div>`;htmlAuditFindings.replaceChildren(...findings.map(item=>{const article=document.createElement('article');article.className=`audit-finding ${item.severity}`;const title=document.createElement('b'),detail=document.createElement('p');title.textContent=`${item.severity.toUpperCase()}: ${item.title}`;detail.textContent=item.detail;article.append(title,detail);return article;}));htmlAuditStatus.textContent=`Review complete: ${counts.error} errors, ${counts.warning} warnings and ${counts.pass} passes.`;htmlAuditReport=`DIMPLE ENTERPRISES - BASIC HTML ACCESSIBILITY REVIEW\n\n${htmlAuditStatus.textContent}\n\n${findings.map((x,i)=>`${i+1}. [${x.severity.toUpperCase()}] ${x.title}\n   ${x.detail}`).join('\n\n')}\n\nThis automated structural check is not a WCAG audit or certification. Manual keyboard, screen-reader, zoom, colour, motion and usability testing are still required.`;downloadHtmlAudit.disabled=false;}if(runHtmlAudit)runHtmlAudit.addEventListener('click',renderHtmlAudit);if(htmlAuditFile)htmlAuditFile.addEventListener('change',()=>{const file=htmlAuditFile.files?.[0];if(!file)return;if(file.size>2*1024*1024){htmlAuditStatus.textContent='Choose an HTML file under 2 MB.';return;}file.text().then(text=>{htmlAuditSource.value=text;htmlAuditStatus.textContent='Local file loaded. Run the check when ready.';});});if(clearHtmlAudit)clearHtmlAudit.addEventListener('click',()=>{htmlAuditSource.value='';htmlAuditFile.value='';htmlAuditOverview.replaceChildren();htmlAuditFindings.replaceChildren();htmlAuditStatus.textContent='Paste HTML or choose a local file.';downloadHtmlAudit.disabled=true;htmlAuditReport='';});if(downloadHtmlAudit)downloadHtmlAudit.addEventListener('click',()=>{if(htmlAuditReport)downloadText('HTML-Accessibility-Review.txt',htmlAuditReport)});;const seoMetaSource=document.querySelector('#seoMetaSource'),runSeoMeta=document.querySelector('#runSeoMeta'),clearSeoMeta=document.querySelector('#clearSeoMeta'),seoMetaScore=document.querySelector('#seoMetaScore'),seoMetaChecks=document.querySelector('#seoMetaChecks'),seoMetaCode=document.querySelector('#seoMetaCode'),copySeoMeta=document.querySelector('#copySeoMeta'),seoMetaStatus=document.querySelector('#seoMetaStatus');if(runSeoMeta&&seoMetaSource){const esc=s=>String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');const q=(doc,sel,attr)=>{const el=doc.querySelector(sel);return el?(attr?el.getAttribute(attr)||'':el.textContent.trim()):''};const tag=(name,content,property=false)=>content?'<meta '+(property?'property':'name')+'="'+name+'" content="'+String(content).replace(/"/g,'&quot;')+'">':'';runSeoMeta.addEventListener('click',()=>{const source=seoMetaSource.value.trim();if(!source){seoMetaStatus.textContent='Paste a full HTML document or its head section first.';return;}const doc=new DOMParser().parseFromString(source,'text/html');const data={title:q(doc,'title'),description:q(doc,'meta[name="description"]','content'),canonical:q(doc,'link[rel="canonical"]','href'),robots:q(doc,'meta[name="robots"]','content'),ogTitle:q(doc,'meta[property="og:title"]','content'),ogDescription:q(doc,'meta[property="og:description"]','content'),ogImage:q(doc,'meta[property="og:image"]','content'),ogUrl:q(doc,'meta[property="og:url"]','content'),twitterCard:q(doc,'meta[name="twitter:card"]','content'),twitterTitle:q(doc,'meta[name="twitter:title"]','content'),twitterDescription:q(doc,'meta[name="twitter:description"]','content'),twitterImage:q(doc,'meta[name="twitter:image"]','content')};const checks=[];const add=(ok,level,title,detail)=>checks.push({state:ok?'pass':level,title,detail});add(data.title.length>=30&&data.title.length<=60,'warning','Page title',data.title?data.title.length+' characters; aim for 30–60.':'Missing title tag.');add(data.description.length>=120&&data.description.length<=160,'warning','Meta description',data.description?data.description.length+' characters; aim for 120–160.':'Missing meta description.');add(/^https:\/\//i.test(data.canonical),'error','Canonical URL',data.canonical||'Missing canonical link.');add(!!data.robots,'warning','Robots directive',data.robots||'No robots meta tag found; search-engine defaults will apply.');add(!!(data.ogTitle&&data.ogDescription&&data.ogImage),'warning','Open Graph',data.ogTitle&&data.ogDescription&&data.ogImage?'Core Open Graph tags found.':'Add og:title, og:description and og:image.');add(!!data.twitterCard,'warning','Twitter/X card',data.twitterCard||'Add twitter:card for richer shares.');if(data.ogImage)add(/^https:\/\//i.test(data.ogImage),'warning','Social image URL','Use an absolute HTTPS image URL.');const passed=checks.filter(x=>x.state==='pass').length,score=Math.round(passed/checks.length*100);seoMetaScore.innerHTML='<b>'+score+'/100</b><span>'+passed+' of '+checks.length+' checks passed</span>';seoMetaChecks.innerHTML=checks.map(x=>'<div class="meta-check '+x.state+'"><b>'+esc(x.title)+'</b><span>'+esc(x.detail)+'</span></div>').join('');const title=data.title||'Your page title | Brand name',description=data.description||'Write a clear 120–160 character summary explaining the page value and the action a visitor should take.',canonical=data.canonical||'https://example.com/page',image=data.ogImage||'https://example.com/social-image.jpg';const code=['<title>'+title.replace(/</g,'&lt;')+'</title>','<meta name="description" content="'+description.replace(/"/g,'&quot;')+'">','<link rel="canonical" href="'+canonical.replace(/"/g,'&quot;')+'">',tag('robots',data.robots||'index,follow'),tag('og:type','website',true),tag('og:title',data.ogTitle||title,true),tag('og:description',data.ogDescription||description,true),tag('og:url',data.ogUrl||canonical,true),tag('og:image',image,true),tag('twitter:card',data.twitterCard||'summary_large_image'),tag('twitter:title',data.twitterTitle||title),tag('twitter:description',data.twitterDescription||description),tag('twitter:image',data.twitterImage||image)].filter(Boolean).join('\n');seoMetaCode.textContent=code;copySeoMeta.disabled=false;copySeoMeta.dataset.code=code;seoMetaStatus.textContent='Analysis complete. Review recommendations before publishing.';});clearSeoMeta.addEventListener('click',()=>{seoMetaSource.value='';seoMetaScore.innerHTML='';seoMetaChecks.innerHTML='';seoMetaCode.textContent='Recommended tags will appear here.';copySeoMeta.disabled=true;copySeoMeta.dataset.code='';seoMetaStatus.textContent='Your HTML stays in this browser.';});copySeoMeta.addEventListener('click',async()=>{const code=copySeoMeta.dataset.code||'';if(!code)return;try{await navigator.clipboard.writeText(code);seoMetaStatus.textContent='Recommended meta tags copied.';}catch(e){seoMetaStatus.textContent='Copy was blocked. Select the code and copy it manually.';}});};const schemaForm=document.querySelector('#schemaForm'),schemaOutput=document.querySelector('#schemaOutput'),schemaStatus=document.querySelector('#schemaStatus'),copySchema=document.querySelector('#copySchema'),downloadSchema=document.querySelector('#downloadSchema'),resetSchema=document.querySelector('#resetSchema');if(schemaForm&&schemaOutput){let currentSchema='';const val=id=>(document.querySelector('#'+id)?.value||'').trim();const buildSchema=()=>{const errors=[],name=val('schemaName'),url=val('schemaUrl'),phone=val('schemaPhone'),email=val('schemaEmail'),street=val('schemaStreet'),city=val('schemaCity'),region=val('schemaRegion'),postal=val('schemaPostal'),country=val('schemaCountry'),area=val('schemaArea'),price=val('schemaPrice'),opens=val('schemaOpens'),closes=val('schemaCloses'),days=[...document.querySelectorAll('input[name="schemaDays"]:checked')].map(x=>x.value);if(!name)errors.push('Business name is required.');if(!/^https:\/\//i.test(url))errors.push('Website URL must be an absolute HTTPS URL.');if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))errors.push('Enter a valid email address.');if(!street||!city||!region||!postal||!country)errors.push('Complete the full postal address.');const data={'@context':'https://schema.org','@type':val('schemaType')||'LocalBusiness',name,url};if(phone)data.telephone=phone;if(email)data.email=email;if(price)data.priceRange=price;if(area)data.areaServed=area.split(',').map(x=>x.trim()).filter(Boolean);data.address={'@type':'PostalAddress',streetAddress:street,addressLocality:city,addressRegion:region,postalCode:postal,addressCountry:country};if(opens&&closes&&days.length)data.openingHoursSpecification=[{'@type':'OpeningHoursSpecification',dayOfWeek:days,opens,closes}];const sameAs=val('schemaSocial').split('\n').map(x=>x.trim()).filter(Boolean);if(sameAs.length)data.sameAs=sameAs;currentSchema='<script type="application/ld+json">\n'+JSON.stringify(data,null,2)+'\n<\/script>';schemaOutput.textContent=currentSchema;copySchema.disabled=downloadSchema.disabled=errors.length>0;schemaStatus.className=errors.length?'schema-errors':'schema-valid';schemaStatus.textContent=errors.length?errors.join(' '):'Schema is ready. Test it with Google Rich Results Test before publishing.';};schemaForm.addEventListener('submit',e=>{e.preventDefault();buildSchema();});copySchema.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(currentSchema);schemaStatus.textContent='JSON-LD copied.';}catch(e){schemaStatus.textContent='Copy was blocked. Select the code and copy it manually.';}});downloadSchema.addEventListener('click',()=>{if(currentSchema)downloadText('local-business-schema.html',currentSchema);});resetSchema.addEventListener('click',()=>{schemaForm.reset();schemaOutput.textContent='Generated JSON-LD will appear here.';schemaStatus.className='helper-note';schemaStatus.textContent='Your details remain in this browser.';copySchema.disabled=downloadSchema.disabled=true;currentSchema='';});};const robotsForm=document.querySelector('#robotsForm'),robotsOutput=document.querySelector('#robotsOutput'),robotsStatus=document.querySelector('#robotsStatus'),robotsPreset=document.querySelectorAll('.robots-preset'),copyRobots=document.querySelector('#copyRobots'),downloadRobots=document.querySelector('#downloadRobots');if(robotsForm&&robotsOutput){let robotsText='';const applyPreset=mode=>{const rules=document.querySelector('#robotsRules');if(mode==='public')rules.value='Allow: /';if(mode==='protect')rules.value='Allow: /\nDisallow: /admin/\nDisallow: /private/\nDisallow: /checkout/\nDisallow: /*?*';if(mode==='staging')rules.value='Disallow: /';robotsPreset.forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.preset===mode)));};robotsPreset.forEach(x=>x.addEventListener('click',()=>applyPreset(x.dataset.preset)));robotsForm.addEventListener('submit',e=>{e.preventDefault();const agent=(document.querySelector('#robotsAgent').value||'*').trim(),rules=document.querySelector('#robotsRules').value.split('\n').map(x=>x.trim()).filter(Boolean),sitemap=document.querySelector('#robotsSitemap').value.trim(),host=document.querySelector('#robotsHost').value.trim(),warnings=[];if(!rules.length)warnings.push('Add at least one Allow or Disallow rule.');rules.forEach((line,i)=>{if(!/^(Allow|Disallow|Crawl-delay):\s*/i.test(line))warnings.push('Line '+(i+1)+' is not a recognised directive.');});if(rules.some(x=>/^Disallow:\s*\/$/i.test(x)))warnings.push('This blocks the entire site from crawling. Use only for a non-public environment.');if(rules.some(x=>/^Disallow:\s*\/\*?$/i.test(x)))warnings.push('A broad Disallow rule may hide all pages from search engines.');if(sitemap&&!/^https:\/\//i.test(sitemap))warnings.push('Sitemap must be an absolute HTTPS URL.');if(host&&!/^https?:\/\//i.test(host))warnings.push('Host should be an absolute URL or left empty.');robotsText=['User-agent: '+agent,...rules,sitemap?'':''].filter((x,i,a)=>x!==''||i<a.length-1).join('\n');if(sitemap)robotsText+='\n\nSitemap: '+sitemap;if(host)robotsText+='\nHost: '+host;robotsOutput.textContent=robotsText;copyRobots.disabled=downloadRobots.disabled=warnings.length>0;robotsStatus.className=warnings.length?'robots-warning':'robots-safe';robotsStatus.textContent=warnings.length?warnings.join(' '):'No obvious conflicts found. Review the rules before publishing at /robots.txt.';});copyRobots.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(robotsText);robotsStatus.textContent='robots.txt copied.';}catch(e){robotsStatus.textContent='Copy was blocked. Select the text and copy it manually.';}});downloadRobots.addEventListener('click',()=>{if(robotsText)downloadText('robots.txt',robotsText);});applyPreset('protect');};const sitemapBuilder=document.querySelector('#sitemapBuilder'),sitemapEntries=document.querySelector('#sitemapEntries'),sitemapOutput=document.querySelector('#sitemapOutput'),sitemapStatus=document.querySelector('#sitemapStatus'),sitemapSummary=document.querySelector('#sitemapSummary'),sitemapIssues=document.querySelector('#sitemapIssues'),copySitemap=document.querySelector('#copySitemap'),downloadSitemap=document.querySelector('#downloadSitemap'),sampleSitemap=document.querySelector('#sampleSitemap');if(sitemapBuilder&&sitemapEntries){let xml='';const x=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');sampleSitemap.addEventListener('click',()=>{const today=new Date().toISOString().slice(0,10);sitemapEntries.value='https://example.com/ | weekly | 1.0 | '+today+'\nhttps://example.com/services | monthly | 0.8 | '+today+'\nhttps://example.com/contact | yearly | 0.6 | '+today;});sitemapBuilder.addEventListener('submit',e=>{e.preventDefault();const lines=sitemapEntries.value.split('\n').map(x=>x.trim()).filter(Boolean),items=[],issues=[],seen=new Set(),freqs=new Set(['always','hourly','daily','weekly','monthly','yearly','never']);let origin='';lines.forEach((line,i)=>{const [loc='',freq='monthly',priority='0.5',lastmod='']=line.split('|').map(x=>x.trim());let url;try{url=new URL(loc);if(url.protocol!=='https:')issues.push('Line '+(i+1)+': use an HTTPS URL.');if(!origin)origin=url.origin;else if(url.origin!==origin)issues.push('Line '+(i+1)+': URL uses a different domain.');}catch(err){issues.push('Line '+(i+1)+': invalid absolute URL.');return;}const clean=url.href;if(seen.has(clean)){issues.push('Line '+(i+1)+': duplicate URL.');return;}seen.add(clean);if(!freqs.has(freq.toLowerCase()))issues.push('Line '+(i+1)+': invalid change frequency.');const p=Number(priority);if(!Number.isFinite(p)||p<0||p>1)issues.push('Line '+(i+1)+': priority must be between 0.0 and 1.0.');if(lastmod&&!/^\d{4}-\d{2}-\d{2}$/.test(lastmod))issues.push('Line '+(i+1)+': last modified date must be YYYY-MM-DD.');items.push({loc:clean,freq:freq.toLowerCase(),priority,lastmod});});xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+items.map(o=>'  <url>\n    <loc>'+x(o.loc)+'</loc>\n    <changefreq>'+x(o.freq)+'</changefreq>\n    <priority>'+x(o.priority)+'</priority>'+(o.lastmod?'\n    <lastmod>'+x(o.lastmod)+'</lastmod>':'')+'\n  </url>').join('\n')+'\n</urlset>';sitemapOutput.textContent=xml;sitemapSummary.innerHTML='<div class="sitemap-stat"><b>'+items.length+'</b><span>valid URLs</span></div><div class="sitemap-stat"><b>'+issues.length+'</b><span>warnings</span></div><div class="sitemap-stat"><b>'+new Blob([xml]).size+'</b><span>bytes</span></div>';sitemapIssues.innerHTML=issues.map(i=>'<div class="sitemap-issue">'+x(i)+'</div>').join('');copySitemap.disabled=downloadSitemap.disabled=!items.length||issues.length>0;sitemapStatus.className=issues.length?'robots-warning':'robots-safe';sitemapStatus.textContent=issues.length?'Fix all warnings before downloading.':'Sitemap is ready. Upload it at your site root and submit its URL to search engines.';});copySitemap.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(xml);sitemapStatus.textContent='XML sitemap copied.';}catch(e){sitemapStatus.textContent='Copy was blocked. Select the XML and copy it manually.';}});downloadSitemap.addEventListener('click',()=>{if(xml)downloadText('sitemap.xml',xml);});};const faqSchemaForm=document.querySelector('#faqSchemaForm'),faqSchemaList=document.querySelector('#faqSchemaList'),addFaqSchema=document.querySelector('#addFaqSchema'),faqSchemaOutput=document.querySelector('#faqSchemaOutput'),faqSchemaStatus=document.querySelector('#faqSchemaStatus'),faqSchemaCount=document.querySelector('#faqSchemaCount'),copyFaqSchema=document.querySelector('#copyFaqSchema'),downloadFaqSchema=document.querySelector('#downloadFaqSchema');if(faqSchemaForm&&faqSchemaList){let faqJson='';const makeRow=(q='',a='')=>{const row=document.createElement('div');row.className='faq-schema-row';row.innerHTML='<div class="faq-row-head"><b>FAQ item</b><button class="faq-remove" type="button">Remove</button></div><label>Question<input class="faq-q" maxlength="250"></label><label>Answer<textarea class="faq-a" maxlength="2000"></textarea></label>';row.querySelector('.faq-q').value=q;row.querySelector('.faq-a').value=a;row.querySelector('.faq-remove').addEventListener('click',()=>{if(faqSchemaList.children.length>1)row.remove();faqSchemaCount.textContent=faqSchemaList.children.length+' items';});faqSchemaList.appendChild(row);faqSchemaCount.textContent=faqSchemaList.children.length+' items';};addFaqSchema.addEventListener('click',()=>makeRow());faqSchemaForm.addEventListener('submit',e=>{e.preventDefault();const rows=[...faqSchemaList.querySelectorAll('.faq-schema-row')],entries=[],issues=[],seen=new Set();rows.forEach((row,i)=>{const q=row.querySelector('.faq-q').value.trim(),a=row.querySelector('.faq-a').value.trim();if(!q||!a){issues.push('Item '+(i+1)+': both question and answer are required.');return;}const key=q.toLowerCase().replace(/\s+/g,' ');if(seen.has(key)){issues.push('Item '+(i+1)+': duplicate question.');return;}seen.add(key);if(q.length<10)issues.push('Item '+(i+1)+': question is unusually short.');if(a.length<20)issues.push('Item '+(i+1)+': answer should be more complete.');entries.push({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}});});const data={'@context':'https://schema.org','@type':'FAQPage',mainEntity:entries};faqJson='<script type="application/ld+json">\n'+JSON.stringify(data,null,2)+'\n<\/script>';faqSchemaOutput.textContent=faqJson;copyFaqSchema.disabled=downloadFaqSchema.disabled=!entries.length||issues.length>0;faqSchemaStatus.className=issues.length?'robots-warning':'robots-safe';faqSchemaStatus.textContent=issues.length?issues.join(' '):entries.length+' FAQ items validated. Ensure every answer is visible on the page before publishing.';});copyFaqSchema.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(faqJson);faqSchemaStatus.textContent='FAQ JSON-LD copied.';}catch(e){faqSchemaStatus.textContent='Copy was blocked. Select the code and copy it manually.';}});downloadFaqSchema.addEventListener('click',()=>{if(faqJson)downloadText('faq-schema.html',faqJson);});if(!faqSchemaList.children.length){makeRow('How long does a business website take?','A typical small-business website takes about 2–4 weeks after content and approvals are available.');makeRow('Will the website work well on mobile?','Yes. Every new website is designed and tested for mobile, tablet and desktop use.');}};const utmForm=document.querySelector('#utmForm'),utmPreset=document.querySelector('#utmPreset'),utmOutput=document.querySelector('#utmOutput'),utmStatus=document.querySelector('#utmStatus'),utmParams=document.querySelector('#utmParams'),copyUtm=document.querySelector('#copyUtm'),downloadUtm=document.querySelector('#downloadUtm');if(utmForm&&utmOutput){let builtUtm='',utmRecord={};const field=id=>document.querySelector('#'+id);const clean=s=>s.trim().toLowerCase().replace(/\s+/g,'_').replace(/[^a-z0-9_\-\.]/g,'');const presets={google:['google','cpc'],facebook:['facebook','paid_social'],instagram:['instagram','paid_social'],linkedin:['linkedin','paid_social'],email:['newsletter','email'],whatsapp:['whatsapp','messaging']};utmPreset.addEventListener('change',()=>{const p=presets[utmPreset.value];if(p){field('utmSource').value=p[0];field('utmMedium').value=p[1];}});utmForm.addEventListener('submit',e=>{e.preventDefault();const issues=[];let url;try{url=new URL(field('utmUrl').value.trim());if(!/^https?:$/.test(url.protocol))issues.push('Use an HTTP or HTTPS landing-page URL.');}catch(err){issues.push('Enter a valid absolute landing-page URL.');}const source=clean(field('utmSource').value),medium=clean(field('utmMedium').value),campaign=clean(field('utmCampaign').value),term=clean(field('utmTerm').value),content=clean(field('utmContent').value);if(!source)issues.push('Campaign source is required.');if(!medium)issues.push('Campaign medium is required.');if(!campaign)issues.push('Campaign name is required.');if(issues.length){utmStatus.className='robots-warning';utmStatus.textContent=issues.join(' ');copyUtm.disabled=downloadUtm.disabled=true;return;}url.searchParams.set('utm_source',source);url.searchParams.set('utm_medium',medium);url.searchParams.set('utm_campaign',campaign);if(term)url.searchParams.set('utm_term',term);else url.searchParams.delete('utm_term');if(content)url.searchParams.set('utm_content',content);else url.searchParams.delete('utm_content');builtUtm=url.toString();utmRecord={landing_page:field('utmUrl').value.trim(),source,medium,campaign,term,content,tracking_url:builtUtm};utmOutput.href=builtUtm;utmOutput.textContent=builtUtm;utmParams.innerHTML=Object.entries({Source:source,Medium:medium,Campaign:campaign,Term:term||'—',Content:content||'—'}).map(([k,v])=>'<div class="utm-param"><b>'+k+'</b><span>'+v+'</span></div>').join('');utmStatus.className='robots-safe';utmStatus.textContent='Tracking URL is ready. Test the destination before using it in a live campaign.';copyUtm.disabled=downloadUtm.disabled=false;});copyUtm.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(builtUtm);utmStatus.textContent='Tracking URL copied.';}catch(e){utmStatus.textContent='Copy was blocked. Select the URL and copy it manually.';}});downloadUtm.addEventListener('click',()=>{if(!builtUtm)return;const esc=s=>'"'+String(s).replace(/"/g,'""')+'"',keys=Object.keys(utmRecord),csv=keys.join(',')+'\n'+keys.map(k=>esc(utmRecord[k])).join(',');downloadText('utm-campaign-link.csv',csv);});};const waForm=document.querySelector('#waForm'),waTemplate=document.querySelector('#waTemplate'),waMessage=document.querySelector('#waMessage'),waPreview=document.querySelector('#waPreview'),waLink=document.querySelector('#waLink'),waStatus=document.querySelector('#waStatus'),waLength=document.querySelector('#waLength'),copyWa=document.querySelector('#copyWa'),downloadWa=document.querySelector('#downloadWa');if(waForm&&waMessage){let builtWa='',waData={};const templates={quote:'Hello Dimple Enterprises, I would like a quote for {{service}}. My name is {{name}} and my preferred timeline is {{timeline}}. Please share the next steps.',consultation:'Hello Dimple Enterprises, I would like to schedule a consultation about {{service}}. My name is {{name}}. Please let me know the available times.',support:'Hello Dimple Enterprises, I need help with {{service}}. My name is {{name}}. The issue is: {{details}}'};const fill=()=>{const vals={name:document.querySelector('#waName').value.trim()||'[your name]',service:document.querySelector('#waService').value.trim()||'[service]',timeline:document.querySelector('#waTimeline').value.trim()||'[timeline]',details:document.querySelector('#waDetails').value.trim()||'[describe the issue]'};let text=waMessage.value;Object.entries(vals).forEach(([k,v])=>text=text.replaceAll('{{'+k+'}}',v));waPreview.textContent=text;waLength.textContent=text.length+' characters';return text;};waTemplate.addEventListener('change',()=>{waMessage.value=templates[waTemplate.value]||'';fill();});['waName','waService','waTimeline','waDetails','waMessage'].forEach(id=>document.querySelector('#'+id).addEventListener('input',fill));waForm.addEventListener('submit',e=>{e.preventDefault();const phone=document.querySelector('#waPhone').value.replace(/\D/g,''),text=fill(),issues=[];if(phone.length<8||phone.length>15)issues.push('Enter a valid international phone number with country code.');if(!text.trim())issues.push('Message cannot be empty.');if(text.length>1000)issues.push('Keep the prefilled message under 1,000 characters.');if(/\{\{[^}]+\}\}/.test(text))issues.push('Replace all unresolved placeholders.');if(issues.length){waStatus.className='robots-warning';waStatus.textContent=issues.join(' ');copyWa.disabled=downloadWa.disabled=true;waLink.removeAttribute('href');return;}builtWa='https://wa.me/'+phone+'?text='+encodeURIComponent(text);waLink.href=builtWa;waLink.textContent='Open generated WhatsApp link';copyWa.disabled=downloadWa.disabled=false;waStatus.className='robots-safe';waStatus.textContent='Link is ready. Test it before placing it on your website or campaign.';waData={phone,message:text,url:builtWa};});copyWa.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(builtWa);waStatus.textContent='WhatsApp link copied.';}catch(e){waStatus.textContent='Copy was blocked. Open the generated link and copy it manually.';}});downloadWa.addEventListener('click',()=>{if(!builtWa)return;const q=s=>'"'+String(s).replace(/"/g,'""')+'"';downloadText('whatsapp-enquiry-link.csv','phone,message,url\n'+[waData.phone,waData.message,waData.url].map(q).join(','));});waMessage.value=templates.quote;fill();};const vcardForm=document.querySelector('#vcardForm'),vcardPreview=document.querySelector('#vcardPreview'),vcardStatus=document.querySelector('#vcardStatus'),downloadVcard=document.querySelector('#downloadVcard'),copyVcard=document.querySelector('#copyVcard'),vcardCall=document.querySelector('#vcardCall'),vcardEmailLink=document.querySelector('#vcardEmailLink');if(vcardForm&&vcardPreview){let vcf='';const gv=id=>document.querySelector('#'+id).value.trim(),safe=s=>s.replace(/[\\;,\n]/g,m=>({'\\':'\\\\',';':'\\;',',':'\\,','\n':'\\n'}[m]));const renderVcard=()=>{const d={first:gv('vcardFirst'),last:gv('vcardLast'),role:gv('vcardRole'),org:gv('vcardOrg'),phone:gv('vcardPhone'),email:gv('vcardEmail'),url:gv('vcardUrl'),address:gv('vcardAddress'),note:gv('vcardNote')},issues=[];if(!d.first&&!d.org)issues.push('Enter a contact or business name.');const digits=d.phone.replace(/\D/g,'');if(d.phone&&(digits.length<8||digits.length>15))issues.push('Phone number must contain 8–15 digits.');if(d.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))issues.push('Enter a valid email address.');if(d.url&&!/^https:\/\//i.test(d.url))issues.push('Website should use an absolute HTTPS URL.');const full=[d.first,d.last].filter(Boolean).join(' ')||d.org;document.querySelector('#vcardPreviewName').textContent=full;document.querySelector('#vcardPreviewRole').textContent=[d.role,d.org].filter(Boolean).join(' · ');document.querySelector('#vcardPreviewPhone').textContent=d.phone||'Phone not provided';document.querySelector('#vcardPreviewEmail').textContent=d.email||'Email not provided';document.querySelector('#vcardPreviewUrl').textContent=d.url||'Website not provided';document.querySelector('#vcardPreviewAddress').textContent=d.address||'Address not provided';vcardCall.href=d.phone?'tel:'+digits:'#';vcardEmailLink.href=d.email?'mailto:'+d.email:'#';const lines=['BEGIN:VCARD','VERSION:3.0','N:'+safe(d.last)+';'+safe(d.first)+';;;','FN:'+safe(full),d.org?'ORG:'+safe(d.org):'',d.role?'TITLE:'+safe(d.role):'',d.phone?'TEL;TYPE=WORK,VOICE:+'+digits:'',d.email?'EMAIL;TYPE=INTERNET,WORK:'+safe(d.email):'',d.url?'URL:'+safe(d.url):'',d.address?'ADR;TYPE=WORK:;;'+safe(d.address)+';;;;':'',d.note?'NOTE:'+safe(d.note):'','END:VCARD'].filter(Boolean);vcf=lines.join('\r\n');downloadVcard.disabled=copyVcard.disabled=issues.length>0;vcardStatus.className=issues.length?'robots-warning':'robots-safe';vcardStatus.textContent=issues.length?issues.join(' '):'Contact card is ready to copy or download.';};vcardForm.addEventListener('submit',e=>{e.preventDefault();renderVcard();});vcardForm.addEventListener('input',renderVcard);downloadVcard.addEventListener('click',()=>{if(vcf)downloadText('dimple-enterprises.vcf',vcf);});copyVcard.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(vcf);vcardStatus.textContent='vCard data copied.';}catch(e){vcardStatus.textContent='Copy was blocked. Download the contact file instead.';}});renderVcard();};const meetingForm=document.querySelector('#meetingForm'),meetingPreview=document.querySelector('#meetingPreview'),meetingStatus=document.querySelector('#meetingStatus'),meetingGoogle=document.querySelector('#meetingGoogle'),downloadMeeting=document.querySelector('#downloadMeeting'),copyMeeting=document.querySelector('#copyMeeting');if(meetingForm&&meetingPreview){let ics='',summary='';const mv=id=>document.querySelector('#'+id).value.trim(),escIcs=s=>String(s).replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;'),utc=d=>d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');const seed=()=>{const d=new Date(Date.now()+24*60*60*1000);d.setMinutes(Math.ceil(d.getMinutes()/15)*15,0,0);document.querySelector('#meetingStart').value=[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')+'T'+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');};meetingForm.addEventListener('submit',e=>{e.preventDefault();const title=mv('meetingTitle'),client=mv('meetingClient'),email=mv('meetingEmail'),start=new Date(mv('meetingStart')),duration=Number(mv('meetingDuration')),location=mv('meetingLocation'),notes=mv('meetingNotes'),issues=[];if(!title)issues.push('Meeting title is required.');if(!client)issues.push('Customer name is required.');if(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))issues.push('Enter a valid customer email.');if(Number.isNaN(start.getTime()))issues.push('Choose a valid start date and time.');else if(start.getTime()<=Date.now())issues.push('Choose a future date and time.');if(!Number.isFinite(duration)||duration<15||duration>180)issues.push('Duration must be between 15 and 180 minutes.');if(issues.length){meetingStatus.className='robots-warning';meetingStatus.textContent=issues.join(' ');downloadMeeting.disabled=copyMeeting.disabled=true;meetingGoogle.removeAttribute('href');return;}const end=new Date(start.getTime()+duration*60000),description=['Customer: '+client,email?'Email: '+email:'',notes].filter(Boolean).join('\n');summary=title+'\nCustomer: '+client+(email?'\nEmail: '+email:'')+'\nWhen: '+start.toLocaleString()+' – '+end.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})+'\nTimezone: '+Intl.DateTimeFormat().resolvedOptions().timeZone+'\nDuration: '+duration+' minutes'+(location?'\nLocation: '+location:'')+(notes?'\nNotes: '+notes:'');const uid=Date.now()+'-'+Math.random().toString(36).slice(2)+'@dimple-enterprises';ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Dimple Enterprises//Consultation Scheduler//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VEVENT','UID:'+uid,'DTSTAMP:'+utc(new Date()),'DTSTART:'+utc(start),'DTEND:'+utc(end),'SUMMARY:'+escIcs(title),'DESCRIPTION:'+escIcs(description),location?'LOCATION:'+escIcs(location):'','END:VEVENT','END:VCALENDAR'].filter(Boolean).join('\r\n');const dates=utc(start)+'/'+utc(end),g=new URL('https://calendar.google.com/calendar/render');g.searchParams.set('action','TEMPLATE');g.searchParams.set('text',title);g.searchParams.set('dates',dates);g.searchParams.set('details',description);if(location)g.searchParams.set('location',location);meetingGoogle.href=g.toString();meetingPreview.innerHTML='<h2>'+title.replace(/[<>&]/g,'')+'</h2><p>Consultation with '+client.replace(/[<>&]/g,'')+'</p><div class="meeting-details"><div class="meeting-detail"><b>Date and time</b><span>'+start.toLocaleString()+'</span></div><div class="meeting-detail"><b>Duration</b><span>'+duration+' minutes</span></div><div class="meeting-detail"><b>Timezone</b><span>'+Intl.DateTimeFormat().resolvedOptions().timeZone+'</span></div><div class="meeting-detail"><b>Location</b><span>'+(location.replace(/[<>&]/g,'')||'Not specified')+'</span></div></div>';downloadMeeting.disabled=copyMeeting.disabled=false;meetingStatus.className='robots-safe';meetingStatus.textContent='Appointment is ready. Confirm availability with the customer before sending.';});downloadMeeting.addEventListener('click',()=>{if(ics)downloadText('dimple-enterprises-consultation.ics',ics);});copyMeeting.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(summary);meetingStatus.textContent='Meeting summary copied.';}catch(e){meetingStatus.textContent='Copy was blocked. Download the calendar invitation instead.';}});seed();};const reviewForm=document.querySelector('#reviewRequestForm'),reviewMessage=document.querySelector('#reviewMessage'),reviewStatus=document.querySelector('#reviewStatus'),reviewButtons=document.querySelectorAll('.review-channel button'),copyReview=document.querySelector('#copyReview'),copyReviewLink=document.querySelector('#copyReviewLink'),downloadReview=document.querySelector('#downloadReview'),reviewDirect=document.querySelector('#reviewDirect');if(reviewForm&&reviewMessage){let platform='Google',message='',reviewUrl='';reviewButtons.forEach(btn=>btn.addEventListener('click',()=>{platform=btn.dataset.platform;reviewButtons.forEach(x=>x.setAttribute('aria-pressed',String(x===btn)));document.querySelector('#reviewPlatform').value=platform;}));reviewForm.addEventListener('submit',e=>{e.preventDefault();const name=document.querySelector('#reviewCustomer').value.trim(),business=document.querySelector('#reviewBusiness').value.trim(),service=document.querySelector('#reviewService').value.trim(),tone=document.querySelector('#reviewTone').value,phone=document.querySelector('#reviewPhone').value.replace(/\D/g,''),issues=[];reviewUrl=document.querySelector('#reviewUrl').value.trim();if(!name)issues.push('Customer name is required.');if(!business)issues.push('Business name is required.');if(!service)issues.push('Service is required.');try{const u=new URL(reviewUrl);if(u.protocol!=='https:')issues.push('Review page must use HTTPS.');}catch(err){issues.push('Enter a valid absolute review-page URL.');}if(phone&&(phone.length<8||phone.length>15))issues.push('Customer phone must contain 8–15 digits.');const texts={warm:'Hi '+name+', thank you for choosing '+business+' for '+service+'. We hope you are happy with the experience. If you have a moment, would you please share an honest review on '+platform+'? Your feedback helps us improve and helps other customers make an informed choice.\n\n'+reviewUrl,short:'Hi '+name+', thank you for choosing '+business+'. Could you please share an honest '+platform+' review about your '+service+' experience?\n\n'+reviewUrl,formal:'Dear '+name+', thank you for engaging '+business+' for '+service+'. We would appreciate your honest feedback on '+platform+'. Your review will help us improve our service.\n\n'+reviewUrl};message=texts[tone]||texts.warm;reviewMessage.textContent=message;reviewDirect.href=phone?'https://wa.me/'+phone+'?text='+encodeURIComponent(message):'#';reviewDirect.textContent=phone?'Open WhatsApp message':'Add a customer phone to open WhatsApp';copyReview.disabled=copyReviewLink.disabled=downloadReview.disabled=issues.length>0;reviewStatus.className=issues.length?'robots-warning':'robots-safe';reviewStatus.textContent=issues.length?issues.join(' '):'Review request is ready. Send it only to a genuine customer and do not influence the rating.';});copyReview.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(message);reviewStatus.textContent='Review request copied.';}catch(e){reviewStatus.textContent='Copy was blocked. Select the message and copy it manually.';}});copyReviewLink.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(reviewUrl);reviewStatus.textContent='Review link copied.';}catch(e){reviewStatus.textContent='Copy was blocked.';}});downloadReview.addEventListener('click',()=>{if(!message)return;const q=s=>'"'+String(s).replace(/"/g,'""')+'"';downloadText('customer-review-request.csv','platform,review_url,message\n'+[platform,reviewUrl,message].map(q).join(','));});};const signatureForm=document.querySelector('#signatureForm'),signaturePreview=document.querySelector('#signaturePreview'),signatureCode=document.querySelector('#signatureCode'),signaturePlain=document.querySelector('#signaturePlain'),signatureStatus=document.querySelector('#signatureStatus'),copySignatureHtml=document.querySelector('#copySignatureHtml'),copySignatureText=document.querySelector('#copySignatureText'),downloadSignature=document.querySelector('#downloadSignature');if(signatureForm&&signaturePreview){let sigHtml='',sigText='';const sv=id=>document.querySelector('#'+id).value.trim(),eh=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');const buildSignature=()=>{const d={name:sv('signatureName'),role:sv('signatureRole'),company:sv('signatureCompany'),phone:sv('signaturePhone'),email:sv('signatureEmail'),website:sv('signatureWebsite'),address:sv('signatureAddress'),linkedin:sv('signatureLinkedin'),logo:sv('signatureLogo'),tagline:sv('signatureTagline'),colour:sv('signatureColour')},issues=[];if(!d.name)issues.push('Name is required.');if(!d.company)issues.push('Company is required.');if(d.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))issues.push('Enter a valid email address.');[d.website,d.linkedin,d.logo].filter(Boolean).forEach(u=>{try{if(new URL(u).protocol!=='https:')issues.push('Website, social and logo URLs must use HTTPS.');}catch(e){issues.push('Enter valid absolute URLs.');}});const digits=d.phone.replace(/\D/g,'');if(d.phone&&(digits.length<8||digits.length>15))issues.push('Phone number must contain 8–15 digits.');const logo=d.logo?'<td style="padding-right:16px;vertical-align:top"><img src="'+eh(d.logo)+'" width="72" height="72" alt="'+eh(d.company)+' logo" style="display:block;border:0;border-radius:10px;object-fit:contain"></td>':'';const links=[d.phone?'<a href="tel:+'+digits+'" style="color:'+eh(d.colour)+';text-decoration:none">'+eh(d.phone)+'</a>':'',d.email?'<a href="mailto:'+eh(d.email)+'" style="color:'+eh(d.colour)+';text-decoration:none">'+eh(d.email)+'</a>':'',d.website?'<a href="'+eh(d.website)+'" style="color:'+eh(d.colour)+';text-decoration:none">'+eh(d.website.replace(/^https?:\/\//,''))+'</a>':'',d.linkedin?'<a href="'+eh(d.linkedin)+'" style="color:'+eh(d.colour)+';text-decoration:none">LinkedIn</a>':''].filter(Boolean).join(' &nbsp;|&nbsp; ');sigHtml='<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;color:#15203b;line-height:1.45"><tr>'+logo+'<td style="vertical-align:top;border-left:3px solid '+eh(d.colour)+';padding-left:16px"><div style="font-size:18px;font-weight:700;color:#0b1739">'+eh(d.name)+'</div><div style="font-size:14px;color:#526079">'+eh([d.role,d.company].filter(Boolean).join(' · '))+'</div>'+(d.tagline?'<div style="font-size:13px;margin-top:5px">'+eh(d.tagline)+'</div>':'')+'<div style="font-size:13px;margin-top:9px">'+links+'</div>'+(d.address?'<div style="font-size:12px;color:#64708a;margin-top:5px">'+eh(d.address)+'</div>':'')+'</td></tr></table>';sigText=[d.name,[d.role,d.company].filter(Boolean).join(' | '),d.tagline,d.phone,d.email,d.website,d.address,d.linkedin].filter(Boolean).join('\n');signaturePreview.innerHTML=sigHtml;signatureCode.textContent=sigHtml;signaturePlain.textContent=sigText;copySignatureHtml.disabled=copySignatureText.disabled=downloadSignature.disabled=issues.length>0;signatureStatus.className=issues.length?'robots-warning':'robots-safe';signatureStatus.textContent=issues.length?issues.join(' '):'Signature is ready. Send yourself a test email before company-wide use.';};signatureForm.addEventListener('input',buildSignature);signatureForm.addEventListener('submit',e=>{e.preventDefault();buildSignature();});copySignatureHtml.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(sigHtml);signatureStatus.textContent='HTML source copied.';}catch(e){signatureStatus.textContent='Copy was blocked. Select the HTML source manually.';}});copySignatureText.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(sigText);signatureStatus.textContent='Plain-text signature copied.';}catch(e){signatureStatus.textContent='Copy was blocked.';}});downloadSignature.addEventListener('click',()=>{if(sigHtml)downloadText('dimple-enterprises-email-signature.html',sigHtml);});buildSignature();};const copyAnalyzerForm=document.querySelector('#copyAnalyzerForm'),copyAnalyzerText=document.querySelector('#copyAnalyzerText'),copyAnalyzerMetrics=document.querySelector('#copyAnalyzerMetrics'),copyAnalyzerInsights=document.querySelector('#copyAnalyzerInsights'),copyAnalyzerLong=document.querySelector('#copyAnalyzerLong'),copyAnalyzerKeywords=document.querySelector('#copyAnalyzerKeywords'),copyAnalyzerStatus=document.querySelector('#copyAnalyzerStatus'),downloadCopyReport=document.querySelector('#downloadCopyReport'),clearCopyAnalyzer=document.querySelector('#clearCopyAnalyzer');if(copyAnalyzerForm&&copyAnalyzerText){let copyReport='';const copyEsc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');copyAnalyzerForm.addEventListener('submit',e=>{e.preventDefault();const text=copyAnalyzerText.value.trim(),focus=document.querySelector('#copyAnalyzerFocus').value.trim().toLowerCase(),issues=[];if(text.length<80)issues.push('Add at least 80 characters for a useful analysis.');if(!text){copyAnalyzerStatus.className='robots-warning';copyAnalyzerStatus.textContent='Paste website copy first.';return;}const words=text.match(/[\p{L}\p{N}'’-]+/gu)||[],sentences=(text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)||[]).map(s=>s.trim()).filter(Boolean),paragraphs=text.split(/\n\s*\n/).filter(x=>x.trim()),longSentences=sentences.filter(s=>(s.match(/[\p{L}\p{N}'’-]+/gu)||[]).length>25),avg=sentences.length?words.length/sentences.length:words.length,minutes=Math.max(1,Math.ceil(words.length/200)),lower=text.toLowerCase(),focusCount=focus?lower.split(focus).length-1:0,density=words.length&&focus?focusCount/words.length*100:0,stop=new Set('the a an and or but for to of in on at is are was were be been with this that it your you we our as by from can will'.split(' ')),freq={};words.map(w=>w.toLowerCase()).filter(w=>w.length>3&&!stop.has(w)).forEach(w=>freq[w]=(freq[w]||0)+1);const top=Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,8),recommend=[];if(avg>22)recommend.push('Shorten sentences: the average is '+avg.toFixed(1)+' words. Aim near 15–20 for general web copy.');else recommend.push('Sentence length is generally concise at '+avg.toFixed(1)+' words on average.');if(longSentences.length)recommend.push('Review '+longSentences.length+' sentence'+(longSentences.length>1?'s':'')+' longer than 25 words.');else recommend.push('No sentences longer than 25 words were detected.');if(paragraphs.length===1&&words.length>100)recommend.push('Break the copy into shorter paragraphs or sections for scanning.');if(focus){if(!focusCount)recommend.push('The focus phrase does not appear in the copy. Add it naturally if relevant.');else if(density>3)recommend.push('The focus phrase density is '+density.toFixed(1)+'%; review for repetition and natural wording.');else recommend.push('The focus phrase appears '+focusCount+' time'+(focusCount===1?'':'s')+' ('+density.toFixed(1)+'% approximate density).');}copyAnalyzerMetrics.innerHTML=[['Words',words.length],['Sentences',sentences.length],['Paragraphs',paragraphs.length],['Reading time',minutes+' min']].map(x=>'<div class="copy-metric"><b>'+x[1]+'</b><span>'+x[0]+'</span></div>').join('');copyAnalyzerInsights.innerHTML=recommend.map(x=>'<div class="copy-insight">'+copyEsc(x)+'</div>').join('');copyAnalyzerLong.innerHTML=longSentences.length?'<h3>Long sentences to review</h3>'+longSentences.slice(0,10).map((s,i)=>'<div class="copy-long"><b>'+(i+1)+'.</b> '+copyEsc(s)+'</div>').join(''):'<div class="robots-safe">No long sentences detected.</div>';copyAnalyzerKeywords.innerHTML=top.map(([w,n])=>'<span class="copy-keyword">'+copyEsc(w)+' · '+n+'</span>').join('');copyAnalyzerStatus.className=issues.length?'robots-warning':'robots-safe';copyAnalyzerStatus.textContent=issues.length?issues.join(' '):'Analysis complete. Use the recommendations as editing guidance, not absolute rules.';copyReport=['WEBSITE COPY READABILITY REPORT','','Words: '+words.length,'Sentences: '+sentences.length,'Paragraphs: '+paragraphs.length,'Estimated reading time: '+minutes+' minute(s)','Average sentence length: '+avg.toFixed(1)+' words',focus?'Focus phrase: '+focus+' — '+focusCount+' occurrence(s), '+density.toFixed(1)+'% approximate density':'Focus phrase: not supplied','','RECOMMENDATIONS',...recommend.map(x=>'• '+x),'','TOP TERMS',...top.map(([w,n])=>'• '+w+': '+n),'','LONG SENTENCES',...(longSentences.length?longSentences.map((s,i)=>(i+1)+'. '+s):['None detected']),'','Note: Automated metrics cannot judge accuracy, tone, persuasion or audience fit.'].join('\n');downloadCopyReport.disabled=false;});downloadCopyReport.addEventListener('click',()=>{if(copyReport)downloadText('website-copy-readability-report.txt',copyReport);});clearCopyAnalyzer.addEventListener('click',()=>{copyAnalyzerText.value='';document.querySelector('#copyAnalyzerFocus').value='';copyAnalyzerMetrics.innerHTML='';copyAnalyzerInsights.innerHTML='';copyAnalyzerLong.innerHTML='';copyAnalyzerKeywords.innerHTML='';copyAnalyzerStatus.className='helper-note';copyAnalyzerStatus.textContent='Paste copy to begin.';downloadCopyReport.disabled=true;copyReport='';});};const redirectForm=document.querySelector('#redirectForm'),redirectEntries=document.querySelector('#redirectEntries'),redirectFormat=document.querySelector('#redirectFormat'),redirectOutput=document.querySelector('#redirectOutput'),redirectStatus=document.querySelector('#redirectStatus'),redirectSummary=document.querySelector('#redirectSummary'),redirectIssues=document.querySelector('#redirectIssues'),copyRedirectRules=document.querySelector('#copyRedirectRules'),downloadRedirectRules=document.querySelector('#downloadRedirectRules'),downloadRedirectCsv=document.querySelector('#downloadRedirectCsv'),loadRedirectSample=document.querySelector('#loadRedirectSample');if(redirectForm&&redirectEntries){let rules='',csv='';const rq=s=>'"'+String(s).replace(/"/g,'""')+'"';loadRedirectSample.addEventListener('click',()=>{redirectEntries.value='https://example.com/old-service | https://example.com/services | 301\nhttps://example.com/contact-us | https://example.com/contact | 301\nhttps://example.com/summer-offer | https://example.com/offers | 302';});redirectForm.addEventListener('submit',e=>{e.preventDefault();const lines=redirectEntries.value.split('\n').map(x=>x.trim()).filter(Boolean),items=[],issues=[],sources=new Set(),map=new Map();let sourceOrigin='';lines.forEach((line,i)=>{const [from='',to='',status='301']=line.split('|').map(x=>x.trim());let a,b;try{a=new URL(from);b=new URL(to);}catch(err){issues.push('Line '+(i+1)+': both URLs must be absolute.');return;}if(a.protocol!=='https:'||b.protocol!=='https:')issues.push('Line '+(i+1)+': use HTTPS URLs.');if(!sourceOrigin)sourceOrigin=a.origin;else if(a.origin!==sourceOrigin)issues.push('Line '+(i+1)+': source URL uses a different domain.');if(a.href===b.href)issues.push('Line '+(i+1)+': source and destination are identical.');if(sources.has(a.href))issues.push('Line '+(i+1)+': duplicate source URL.');if(!['301','302'].includes(status))issues.push('Line '+(i+1)+': status must be 301 or 302.');sources.add(a.href);map.set(a.href,b.href);items.push({from:a,to:b,status});});items.forEach((item,i)=>{const seen=new Set([item.from.href]);let next=item.to.href,steps=0;while(map.has(next)&&steps<=items.length){if(seen.has(next)){issues.push('Line '+(i+1)+': redirect loop detected.');break;}seen.add(next);next=map.get(next);steps++;}if(steps>0&&!seen.has(next))issues.push('Line '+(i+1)+': redirect chain detected; point directly to the final URL.');});const format=redirectFormat.value;if(format==='apache')rules=items.map(x=>'Redirect '+x.status+' '+x.from.pathname+x.from.search+' '+x.to.href).join('\n');else if(format==='nginx')rules=items.map(x=>'location = '+x.from.pathname+' { return '+x.status+' '+x.to.href+'; }').join('\n');else rules=items.map(x=>x.from.pathname+(x.from.search||'')+' '+x.to.href+' '+x.status).join('\n');csv='source,destination,status\n'+items.map(x=>[x.from.href,x.to.href,x.status].map(rq).join(',')).join('\n');redirectOutput.textContent=rules||'No valid redirect entries.';redirectSummary.innerHTML='<div class="redirect-stat"><b>'+items.length+'</b><span>parsed redirects</span></div><div class="redirect-stat"><b>'+issues.length+'</b><span>issues</span></div><div class="redirect-stat"><b>'+items.filter(x=>x.status==='301').length+'</b><span>permanent</span></div>';redirectIssues.innerHTML=issues.map(x=>'<div class="redirect-issue">'+x.replace(/[<>&]/g,'')+'</div>').join('');copyRedirectRules.disabled=downloadRedirectRules.disabled=downloadRedirectCsv.disabled=!items.length||issues.length>0;redirectStatus.className=issues.length?'robots-warning':'robots-safe';redirectStatus.textContent=issues.length?'Resolve all issues before implementation.':'Redirect map is ready for developer review and testing.';});copyRedirectRules.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(rules);redirectStatus.textContent='Redirect rules copied.';}catch(e){redirectStatus.textContent='Copy was blocked. Select the rules manually.';}});downloadRedirectRules.addEventListener('click',()=>{if(rules)downloadText(redirectFormat.value+'-redirect-rules.txt',rules);});downloadRedirectCsv.addEventListener('click',()=>{if(csv)downloadText('redirect-map.csv',csv);});};const pricingBuilderForm=document.querySelector('#pricingBuilderForm'),pricingLivePreview=document.querySelector('#pricingLivePreview'),pricingHtmlOutput=document.querySelector('#pricingHtmlOutput'),pricingBuilderStatus=document.querySelector('#pricingBuilderStatus'),copyPricingHtml=document.querySelector('#copyPricingHtml'),downloadPricingHtml=document.querySelector('#downloadPricingHtml');if(pricingBuilderForm&&pricingLivePreview){let pricingHtml='';const pv=id=>document.querySelector('#'+id).value.trim(),pe=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');const buildPricing=()=>{const highlight=document.querySelector('#pricingHighlight').value,cta=pv('pricingCta'),brand=pv('pricingBrand'),issues=[],plans=[1,2,3].map(i=>({name:pv('planName'+i),price:pv('planPrice'+i),note:pv('planNote'+i),features:pv('planFeatures'+i).split('\n').map(x=>x.trim()).filter(Boolean)}));if(!brand)issues.push('Brand colour is required.');try{if(new URL(cta).protocol!=='https:')issues.push('Call-to-action URL must use HTTPS.');}catch(e){issues.push('Enter a valid absolute call-to-action URL.');}plans.forEach((p,i)=>{if(!p.name||!p.price)issues.push('Plan '+(i+1)+' needs a name and price.');if(!p.features.length)issues.push('Plan '+(i+1)+' needs at least one feature.');});const cards=plans.map((p,i)=>{const featured=String(i+1)===highlight,items=p.features.map(f=>'<li style="margin:7px 0">'+pe(f)+'</li>').join('');return '<article style="padding:24px;border:'+(featured?'2px solid '+pe(brand):'1px solid #dfe4ec')+';border-radius:16px;background:#fff;display:flex;flex-direction:column">'+(featured?'<div style="color:'+pe(brand)+';font-weight:800">Recommended</div>':'')+'<h3 style="margin:8px 0">'+pe(p.name)+'</h3><div style="font-size:30px;font-weight:800">'+pe(p.price)+'</div>'+(p.note?'<p style="color:#526079">'+pe(p.note)+'</p>':'')+'<ul style="padding-left:20px;flex:1">'+items+'</ul><a href="'+pe(cta)+'" style="display:block;padding:11px;border-radius:9px;background:'+pe(brand)+';color:#fff;text-align:center;text-decoration:none;font-weight:800">Choose '+pe(p.name)+'</a></article>';}).join('');pricingHtml='<section aria-label="Pricing packages" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px">'+cards+'</section>';pricingLivePreview.innerHTML=plans.map((p,i)=>'<article class="pricing-live-card '+(String(i+1)===highlight?'featured':'')+'">'+(String(i+1)===highlight?'<b>Recommended</b>':'')+'<h3>'+pe(p.name||'Untitled plan')+'</h3><div class="price">'+pe(p.price||'Price')+'</div><p>'+pe(p.note)+'</p><ul>'+p.features.map(f=>'<li>'+pe(f)+'</li>').join('')+'</ul><a href="'+pe(cta||'#')+'">Choose '+pe(p.name||'plan')+'</a></article>').join('');pricingHtmlOutput.textContent=pricingHtml;copyPricingHtml.disabled=downloadPricingHtml.disabled=issues.length>0;pricingBuilderStatus.className=issues.length?'robots-warning':'robots-safe';pricingBuilderStatus.textContent=issues.length?issues.join(' '):'Pricing table is ready. Review package scope and pricing before publishing.';};pricingBuilderForm.addEventListener('submit',e=>{e.preventDefault();buildPricing();});pricingBuilderForm.addEventListener('input',buildPricing);copyPricingHtml.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(pricingHtml);pricingBuilderStatus.textContent='Pricing-table HTML copied.';}catch(e){pricingBuilderStatus.textContent='Copy was blocked. Select the HTML manually.';}});downloadPricingHtml.addEventListener('click',()=>{if(pricingHtml)downloadText('pricing-packages.html',pricingHtml);});buildPricing();};const testimonialForm=document.querySelector('#testimonialForm'),testimonialPreview=document.querySelector('#testimonialPreview'),testimonialHtml=document.querySelector('#testimonialHtml'),testimonialStatus=document.querySelector('#testimonialStatus'),copyTestimonialHtml=document.querySelector('#copyTestimonialHtml'),downloadTestimonialHtml=document.querySelector('#downloadTestimonialHtml');if(testimonialForm&&testimonialPreview){let testimonialCode='';const tv=id=>document.querySelector('#'+id).value.trim(),te=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');const renderTestimonials=()=>{const colour=tv('testimonialColour'),items=[1,2,3].map(i=>({quote:tv('testimonialQuote'+i),name:tv('testimonialName'+i),detail:tv('testimonialDetail'+i),rating:Number(tv('testimonialRating'+i)),source:tv('testimonialSource'+i)})),issues=[];items.forEach((x,i)=>{if(!x.quote||!x.name)issues.push('Testimonial '+(i+1)+' needs a quote and customer name.');if(x.quote.length<20)issues.push('Testimonial '+(i+1)+' quote is unusually short.');if(x.quote.length>600)issues.push('Testimonial '+(i+1)+' quote exceeds 600 characters.');if(x.source){try{if(new URL(x.source).protocol!=='https:')issues.push('Testimonial '+(i+1)+' source must use HTTPS.');}catch(e){issues.push('Testimonial '+(i+1)+' source URL is invalid.');}}});const card=x=>{const stars='★'.repeat(x.rating)+'☆'.repeat(5-x.rating),source=x.source?'<a href="'+te(x.source)+'" rel="noopener" style="color:'+te(colour)+'">View source</a>':'Source not supplied';return '<figure style="margin:0;padding:22px;border:1px solid #dfe4ec;border-radius:16px;background:#fff"><div aria-label="'+x.rating+' out of 5 stars" style="color:#d48300;letter-spacing:2px">'+stars+'</div><blockquote style="margin:14px 0">'+te(x.quote)+'</blockquote><figcaption><strong>'+te(x.name)+'</strong>'+(x.detail?'<br><span style="color:#526079">'+te(x.detail)+'</span>':'')+'<br><small>'+source+'</small></figcaption></figure>';};testimonialCode='<section aria-label="Customer testimonials" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px">'+items.map(card).join('')+'</section>';testimonialPreview.innerHTML=items.map(x=>'<figure class="testimonial-live-card"><div class="testimonial-stars" aria-label="'+x.rating+' out of 5 stars">'+'★'.repeat(x.rating)+'☆'.repeat(5-x.rating)+'</div><blockquote>'+te(x.quote||'Customer quote')+'</blockquote><figcaption><b>'+te(x.name||'Customer name')+'</b><div>'+te(x.detail)+'</div><div class="testimonial-source">'+(x.source?'Source link supplied':'Source not supplied')+'</div></figcaption></figure>').join('');testimonialHtml.textContent=testimonialCode;copyTestimonialHtml.disabled=downloadTestimonialHtml.disabled=issues.length>0;testimonialStatus.className=issues.length?'robots-warning':'robots-safe';testimonialStatus.textContent=issues.length?issues.join(' '):'Showcase is ready. Confirm customer consent and quote accuracy before publishing.';};testimonialForm.addEventListener('input',renderTestimonials);testimonialForm.addEventListener('submit',e=>{e.preventDefault();renderTestimonials();});copyTestimonialHtml.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(testimonialCode);testimonialStatus.textContent='Testimonial HTML copied.';}catch(e){testimonialStatus.textContent='Copy was blocked. Select the HTML manually.';}});downloadTestimonialHtml.addEventListener('click',()=>{if(testimonialCode)downloadText('customer-testimonials.html',testimonialCode);});renderTestimonials();}
(()=>{const form=document.getElementById('course-finder-form');if(!form)return;const goal=document.getElementById('course-goal'),level=document.getElementById('course-level'),result=document.getElementById('course-result'),wa=document.getElementById('course-whatsapp');const courses={website:['Web Foundations: HTML, CSS & JavaScript','Frontend Projects & Responsive Design','Advanced Web Apps & Deployment'],java:['Java Programming Foundations','Java, SQL & Spring Boot Starter','Spring Boot, Microservices & Cloud'],mobile:['Mobile App Foundations','Android App Development','Advanced Mobile Apps & APIs'],marketing:['Digital Marketing Foundations','SEO, Social Media & Analytics','Growth Campaigns & Automation'],ai:['Practical AI Tools for Beginners','AI Productivity & Content Workflows','AI Automation for Professionals']};form.addEventListener('submit',e=>{e.preventDefault();const levels={beginner:0,basic:1,working:2};const course=courses[goal.value][levels[level.value]];result.textContent='Recommended starting path: '+course+'. We can confirm the syllabus, duration and batch after a short discussion.';wa.href='https://wa.me/918668098213?text='+encodeURIComponent('Hello Starwalt Company, I am interested in '+course+'. Please share course details.');});})();
(()=>{const download=(name,text)=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/plain'}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);};let batchText='',serviceText='';const bf=document.getElementById('batch-planner');if(bf){const out=document.getElementById('batch-output'),wa=document.getElementById('batch-whatsapp'),dl=document.getElementById('batch-download');bf.addEventListener('submit',e=>{e.preventDefault();const course=document.getElementById('batch-course').value,mode=document.getElementById('batch-mode').value,time=document.getElementById('batch-time').value;batchText='STARWALT COMPANY - Training Request\nCourse: '+course+'\nMode: '+mode+'\nSchedule: '+time;out.textContent='Your request: '+course+' · '+mode+' · '+time+'. Contact us to confirm syllabus, fee and batch date.';wa.href='https://wa.me/918668098213?text='+encodeURIComponent('Hello STARWALT COMPANY,\n'+batchText+'\nPlease share fee and batch details.');dl.disabled=false;});dl.addEventListener('click',()=>download('starwalt-training-request.txt',batchText));}const sf=document.getElementById('service-matcher');if(sf){const out=document.getElementById('service-output'),wa=document.getElementById('service-whatsapp'),dl=document.getElementById('service-download');const names={launch:'Business Website Starter',leads:'Growth Website + Local SEO',sell:'E-commerce Solution',automate:'Business Automation Solution'};sf.addEventListener('submit',e=>{e.preventDefault();const goal=document.getElementById('service-goal'),budget=document.getElementById('service-budget'),timeline=document.getElementById('service-timeline');let rec=names[goal.value];if(budget.value==='starter'&&goal.value==='sell')rec='Product Catalogue + WhatsApp Orders';serviceText='STARWALT COMPANY - Digital Service Request\nGoal: '+goal.options[goal.selectedIndex].text+'\nBudget: '+budget.options[budget.selectedIndex].text+'\nTimeline: '+timeline.value+'\nSuggested starting package: '+rec;out.textContent='Recommended starting point: '+rec+'. Final scope and price will be confirmed after requirements review.';wa.href='https://wa.me/918668098213?text='+encodeURIComponent('Hello STARWALT COMPANY,\n'+serviceText+'\nPlease contact me to discuss.');dl.disabled=false;});dl.addEventListener('click',()=>download('starwalt-digital-service-request.txt',serviceText));}})();
(()=>{const save=(name,text,type='text/plain')=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);};const hf=document.getElementById('health-checker');let healthReport='';if(hf){const out=document.getElementById('health-output'),wa=document.getElementById('health-whatsapp'),dl=document.getElementById('health-download');const labels={mobile:'Improve mobile usability',speed:'Optimize page speed and images',https:'Enable HTTPS security',cta:'Add clear call and WhatsApp actions',local:'Add Vellore location and service details',analytics:'Configure enquiry analytics'};hf.addEventListener('submit',e=>{e.preventDefault();const checked=[...hf.querySelectorAll('input[type=checkbox]:checked')].map(x=>x.value),missing=Object.keys(labels).filter(x=>!checked.includes(x)),score=Math.round(checked.length/6*100),status=score>=84?'Strong foundation':score>=50?'Good start—improvements recommended':'Priority improvements needed';healthReport='STARWALT COMPANY - Website Health Report\nScore: '+score+'/100\nStatus: '+status+'\n\nRecommended actions:\n'+(missing.length?missing.map(x=>'- '+labels[x]).join('\n'):'- Continue monitoring performance, content and conversions.');out.textContent='Score: '+score+'/100 · '+status+'. '+(missing.length?missing.length+' improvement area(s) identified.':'All core checks are covered.');wa.href='https://wa.me/918668098213?text='+encodeURIComponent('Hello STARWALT COMPANY, my website health score is '+score+'/100. Please help with: '+(missing.map(x=>labels[x]).join(', ')||'ongoing improvement'));dl.disabled=false;});dl.addEventListener('click',()=>save('starwalt-website-health-report.txt',healthReport));}const cf=document.getElementById('consultation-form');let eventText='';if(cf){const out=document.getElementById('consult-output'),wa=document.getElementById('consult-whatsapp'),cal=document.getElementById('consult-calendar');cf.addEventListener('submit',e=>{e.preventDefault();const name=document.getElementById('consult-name').value.trim(),phone=document.getElementById('consult-phone').value.trim(),topic=document.getElementById('consult-topic').value,raw=document.getElementById('consult-date').value,mode=document.getElementById('consult-mode').value,start=new Date(raw),end=new Date(start.getTime()+30*60000),fmt=d=>d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');eventText='BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//STARWALT COMPANY//Consultation//EN\r\nBEGIN:VEVENT\r\nUID:'+Date.now()+'@starwalt.github.io\r\nDTSTAMP:'+fmt(new Date())+'\r\nDTSTART:'+fmt(start)+'\r\nDTEND:'+fmt(end)+'\r\nSUMMARY:STARWALT Consultation - '+topic+'\r\nDESCRIPTION:Requested by '+name+' ('+phone+'). Mode: '+mode+'\r\nEND:VEVENT\r\nEND:VCALENDAR';const when=start.toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'});out.textContent='Consultation request: '+topic+' · '+when+' · '+mode+'. Please send it on WhatsApp for confirmation.';wa.href='https://wa.me/918668098213?text='+encodeURIComponent('Hello STARWALT COMPANY, I am '+name+'. I request a consultation for '+topic+' on '+when+' via '+mode+'. My phone: '+phone+'. Please confirm availability.');cal.disabled=false;});cal.addEventListener('click',()=>save('starwalt-consultation.ics',eventText,'text/calendar'));}})();
(()=>{const save=(name,text)=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'text/plain'}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);};const rf=document.getElementById('roadmap-builder');let roadmapText='';if(rf){const tracks={web:{hours:70,modules:['Internet, HTML & semantic structure','CSS, responsive layouts & accessibility','JavaScript fundamentals & DOM','Forms, APIs & browser storage','Portfolio projects & deployment']},java:{hours:110,modules:['Java language & object-oriented programming','Collections, exceptions, streams & testing','SQL, JDBC & data modelling','Spring Boot REST APIs & validation','Security, microservices basics & deployment']},mobile:{hours:90,modules:['Mobile UX and programming foundations','Application screens, navigation & state','APIs, storage and device features','Testing, performance & security','Capstone app and publishing readiness']},marketing:{hours:60,modules:['Audience, positioning & campaign goals','Content, social media & creative planning','SEO and Google Business Profile','Paid campaign foundations & tracking','Analytics, reporting & optimization']},ai:{hours:55,modules:['Responsible AI and prompt foundations','Research, content and productivity workflows','Data handling and quality checks','No-code automation and integrations','Practical business automation project']}};const out=document.getElementById('roadmap-output'),list=document.getElementById('roadmap-modules'),wa=document.getElementById('roadmap-whatsapp'),dl=document.getElementById('roadmap-download');rf.addEventListener('submit',e=>{e.preventDefault();const key=document.getElementById('roadmap-track').value,level=document.getElementById('roadmap-level').value,hours=Math.max(2,Number(document.getElementById('roadmap-hours').value)||2),data=tracks[key],factor=level==='working'?.7:level==='basic'?.85:1,total=Math.round(data.hours*factor),weeks=Math.ceil(total/hours),title=document.getElementById('roadmap-track').selectedOptions[0].text;out.textContent='Estimated learning plan: '+total+' guided/self-study hours across approximately '+weeks+' weeks at '+hours+' hours per week.';list.innerHTML=data.modules.map((m,i)=>'<span>'+(i+1)+'. '+m+'</span>').join('');roadmapText='STARWALT COMPANY - Learning Roadmap\nTrack: '+title+'\nLevel: '+level+'\nWeekly study time: '+hours+' hours\nEstimated duration: '+weeks+' weeks\n\nModules:\n'+data.modules.map((m,i)=>(i+1)+'. '+m).join('\n')+'\n\nThis is an indicative learning plan; final duration depends on practice and project completion.';wa.href='https://wa.me/918668098213?text='+encodeURIComponent('Hello STARWALT COMPANY, I created a '+title+' roadmap for about '+weeks+' weeks. Please share training options.');dl.disabled=false;});dl.addEventListener('click',()=>save('starwalt-learning-roadmap.txt',roadmapText));}const cf=document.getElementById('campaign-builder');let campaignText='';if(cf){const out=document.getElementById('campaign-output'),split=document.getElementById('campaign-split'),wa=document.getElementById('campaign-whatsapp'),dl=document.getElementById('campaign-download');cf.addEventListener('submit',e=>{e.preventDefault();const goal=document.getElementById('campaign-goal').value,channel=document.getElementById('campaign-channel').value,budget=Math.max(3000,Number(document.getElementById('campaign-budget').value)||3000),duration=document.getElementById('campaign-duration').value,media=Math.round(budget*.7),creative=Math.round(budget*.15),testing=budget-media-creative,fmt=n=>'₹'+n.toLocaleString('en-IN');out.textContent='Suggested monthly planning split for '+channel+': 70% media/distribution, 15% creative/content and 15% testing/measurement.';split.innerHTML='<span><b>'+fmt(media)+'</b>Media</span><span><b>'+fmt(creative)+'</b>Creative</span><span><b>'+fmt(testing)+'</b>Testing</span>';campaignText='STARWALT COMPANY - Digital Campaign Brief\nGoal: '+goal+'\nPrimary channel: '+channel+'\nDuration: '+duration+'\nMonthly budget: '+fmt(budget)+'\n\nPlanning split:\n- Media/distribution: '+fmt(media)+'\n- Creative/content: '+fmt(creative)+'\n- Testing/measurement: '+fmt(testing)+'\n\nSuccess metrics to confirm: reach, qualified clicks, enquiries, cost per enquiry and sales follow-up.\nThis is planning guidance, not a results guarantee.';wa.href='https://wa.me/918668098213?text='+encodeURIComponent('Hello STARWALT COMPANY, I need a '+channel+' campaign for '+goal+' with a monthly budget of '+fmt(budget)+' ('+duration+'). Please review my plan.');dl.disabled=false;});dl.addEventListener('click',()=>save('starwalt-campaign-brief.txt',campaignText));}})();
;(() => {
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();
  ready(() => {
    const launchForm = document.getElementById('launch-checker-form');
    const launchResult = document.getElementById('launch-result');
    const launchReset = document.getElementById('launch-reset');
    if (launchForm && launchResult) {
      launchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const items = [...launchForm.querySelectorAll('input[name="launch-item"]')];
        const completed = items.filter((item) => item.checked);
        const missing = items.filter((item) => !item.checked).map((item) => item.value);
        const score = Math.round((completed.length / items.length) * 100);
        let status = score >= 85 ? 'Launch ready' : score >= 60 ? 'Almost ready' : 'Needs attention';
        let next = missing.length ? 'Next priorities:\n• ' + missing.slice(0, 3).join('\n• ') : 'Excellent—your core launch checklist is complete.';
        launchResult.innerHTML = '<strong>' + status + ': ' + score + '%</strong><div class="readiness-meter" aria-label="' + score + '% ready"><span style="width:' + score + '%"></span></div>' + next.replace(/\n/g, '<br>');
        launchResult.hidden = false;
      });
      launchReset?.addEventListener('click', () => {
        launchForm.reset();
        launchResult.hidden = true;
        launchResult.textContent = '';
      });
    }

    const followupForm = document.getElementById('followup-builder-form');
    const followupResult = document.getElementById('followup-result');
    const copyButton = document.getElementById('followup-copy');
    const whatsapp = document.getElementById('followup-whatsapp');
    let followupMessage = '';
    if (followupForm && followupResult) {
      followupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('followup-name')?.value.trim() || 'there';
        const service = document.getElementById('followup-service')?.value || 'our services';
        const nextStep = document.getElementById('followup-next')?.value || 'a discussion';
        const time = document.getElementById('followup-time')?.value.trim();
        followupMessage = 'Hello ' + name + ', thank you for your interest in Starwalt Company’s ' + service + '. We would be happy to understand your requirement and help you choose the right next step. Can we arrange ' + nextStep + (time ? ' at ' + time : ' at a convenient time') + '? Please share any questions or goals you would like us to prepare for.';
        followupResult.textContent = followupMessage;
        followupResult.hidden = false;
        if (copyButton) copyButton.disabled = false;
        if (whatsapp) {
          whatsapp.href = 'https://wa.me/?text=' + encodeURIComponent(followupMessage);
          whatsapp.hidden = false;
        }
      });
      copyButton?.addEventListener('click', async () => {
        if (!followupMessage) return;
        try {
          await navigator.clipboard.writeText(followupMessage);
          const original = copyButton.textContent;
          copyButton.textContent = 'Copied';
          setTimeout(() => { copyButton.textContent = original; }, 1600);
        } catch {
          followupResult.focus?.();
        }
      });
    }
  });
})();

;(() => {
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();
  ready(() => {
    const seoForm = document.getElementById('local-seo-form');
    const seoResult = document.getElementById('local-seo-result');
    if (seoForm && seoResult) {
      seoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const items = [...seoForm.querySelectorAll('input[name="seo-item"]')];
        const done = items.filter((item) => item.checked);
        const missing = items.filter((item) => !item.checked).map((item) => item.value);
        const score = Math.round((done.length / items.length) * 100);
        const label = score >= 85 ? 'Strong local foundation' : score >= 55 ? 'Good start—improvements available' : 'Local visibility needs work';
        seoResult.textContent = label + ': ' + score + '%\n' + (missing.length ? 'Focus next on:\n• ' + missing.slice(0, 3).join('\n• ') : 'Your core local SEO checklist is complete. Keep your profile, photos and reviews fresh.');
        seoResult.hidden = false;
      });
      document.getElementById('local-seo-reset')?.addEventListener('click', () => {
        seoForm.reset();
        seoResult.hidden = true;
        seoResult.textContent = '';
      });
    }

    const plannerForm = document.getElementById('content-planner-form');
    const plannerResult = document.getElementById('content-result');
    const downloadButton = document.getElementById('content-download');
    let planText = '';
    if (plannerForm && plannerResult) {
      plannerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const business = document.getElementById('content-business')?.value || 'business';
        const goal = document.getElementById('content-goal')?.value || 'Get more enquiries';
        const platform = document.getElementById('content-platform')?.value || 'Instagram';
        const ideas = [
          ['Day 1 · Introduce', 'Explain who you help, the problem you solve, and why it matters locally.'],
          ['Day 2 · Educate', 'Share one common mistake customers make and one practical tip to avoid it.'],
          ['Day 3 · Show proof', 'Post a completed-work example, process photo, result, or verified customer review.'],
          ['Day 4 · Behind the scenes', 'Show how your team prepares, checks quality, or delivers the service.'],
          ['Day 5 · Answer a question', 'Answer the most frequent customer question in a short post or video.'],
          ['Day 6 · Offer next step', 'Invite people to request a consultation, quote, demo, visit, or course discussion.'],
          ['Day 7 · Community post', 'Share a local insight, useful checklist, or question that encourages replies.']
        ];
        plannerResult.replaceChildren();
        ideas.forEach(([day, idea]) => {
          const card = document.createElement('div');
          card.className = 'content-day';
          const heading = document.createElement('b');
          heading.textContent = day;
          const text = document.createElement('span');
          text.textContent = idea;
          card.append(heading, text);
          plannerResult.append(card);
        });
        planText = 'STARWALT 7-DAY CONTENT PLAN\nBusiness: ' + business + '\nGoal: ' + goal + '\nPlatform: ' + platform + '\n\n' + ideas.map(([day, idea]) => day + '\n' + idea).join('\n\n');
        plannerResult.hidden = false;
        if (downloadButton) downloadButton.disabled = false;
      });
      downloadButton?.addEventListener('click', () => {
        if (!planText) return;
        const blob = new Blob([planText], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'starwalt-7-day-content-plan.txt';
        link.click();
        URL.revokeObjectURL(url);
      });
    }
  });
})();

;(() => {
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();
  const money = (value) => new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'INR', maximumFractionDigits: 0}).format(value);
  ready(() => {
    const breakForm = document.getElementById('breakeven-form');
    const breakResult = document.getElementById('breakeven-result');
    if (breakForm && breakResult) {
      breakForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const budget = Number(document.getElementById('breakeven-budget')?.value);
        const revenue = Number(document.getElementById('breakeven-revenue')?.value);
        const margin = Number(document.getElementById('breakeven-margin')?.value);
        const conversion = Number(document.getElementById('breakeven-conversion')?.value);
        if (![budget, revenue, margin, conversion].every((value) => Number.isFinite(value) && value > 0) || margin > 100 || conversion > 100) {
          breakResult.textContent = 'Enter valid positive numbers. Margin and conversion rate must be between 1% and 100%.';
          breakResult.hidden = false;
          return;
        }
        const profitPerCustomer = revenue * (margin / 100);
        const customers = Math.ceil(budget / profitPerCustomer);
        const leads = Math.ceil(customers / (conversion / 100));
        const salesRevenue = customers * revenue;
        breakResult.replaceChildren();
        const intro = document.createElement('strong');
        intro.textContent = 'Estimated break-even target';
        const grid = document.createElement('div');
        grid.className = 'metric-grid';
        [
          [customers, 'paying customers'],
          [leads, 'qualified leads'],
          [money(profitPerCustomer), 'profit per customer'],
          [money(salesRevenue), 'sales revenue at target']
        ].forEach(([value, label]) => {
          const card = document.createElement('div');
          card.className = 'metric-card';
          const number = document.createElement('b');
          number.textContent = String(value);
          const caption = document.createElement('span');
          caption.textContent = label;
          card.append(number, caption);
          grid.append(card);
        });
        breakResult.append(intro, grid);
        breakResult.hidden = false;
      });
      document.getElementById('breakeven-reset')?.addEventListener('click', () => {
        breakForm.reset();
        breakResult.hidden = true;
        breakResult.textContent = '';
      });
    }

    const reviewForm = document.getElementById('review-request-form');
    const reviewResult = document.getElementById('review-result');
    const reviewCopy = document.getElementById('review-copy');
    const reviewWhatsApp = document.getElementById('review-whatsapp');
    let reviewMessage = '';
    if (reviewForm && reviewResult) {
      reviewForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('review-name')?.value.trim();
        const business = document.getElementById('review-business')?.value.trim() || 'our business';
        const link = document.getElementById('review-link')?.value.trim();
        const tone = document.getElementById('review-tone')?.value || 'warm';
        const greeting = name ? 'Hello ' + name + ',' : 'Hello,';
        if (tone === 'professional') {
          reviewMessage = greeting + ' thank you for choosing ' + business + '. We value your feedback. If you have a moment, please share an honest review about your experience' + (link ? ': ' + link : '.') + ' Your feedback helps us improve and helps other customers make an informed decision.';
        } else if (tone === 'short') {
          reviewMessage = greeting + ' thank you for choosing ' + business + '. Could you share an honest review of your experience' + (link ? '? ' + link : '?') + ' Thank you for your time.';
        } else {
          reviewMessage = greeting + ' thank you for supporting ' + business + '! We hope you had a good experience. When you have a moment, we would really appreciate an honest review' + (link ? ': ' + link : '.') + ' Your feedback means a lot to our team.';
        }
        reviewResult.textContent = reviewMessage;
        reviewResult.hidden = false;
        if (reviewCopy) reviewCopy.disabled = false;
        if (reviewWhatsApp) {
          reviewWhatsApp.href = 'https://wa.me/?text=' + encodeURIComponent(reviewMessage);
          reviewWhatsApp.hidden = false;
        }
      });
      reviewCopy?.addEventListener('click', async () => {
        if (!reviewMessage) return;
        try {
          await navigator.clipboard.writeText(reviewMessage);
          const old = reviewCopy.textContent;
          reviewCopy.textContent = 'Copied';
          setTimeout(() => { reviewCopy.textContent = old; }, 1600);
        } catch {
          reviewResult.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
      });
    }
  });
})();

;(() => {
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();
  const formatDate = (value) => {
    if (!value) return 'To be confirmed';
    const [year, month, day] = value.split('-').map(Number);
    return new Intl.DateTimeFormat('en-IN', {day: 'numeric', month: 'short', year: 'numeric'}).format(new Date(year, month - 1, day));
  };
  const downloadText = (name, text) => {
    const blob = new Blob([text], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
    URL.revokeObjectURL(url);
  };
  ready(() => {
    const briefForm = document.getElementById('requirements-brief-form');
    const briefResult = document.getElementById('brief-result');
    const briefDownload = document.getElementById('brief-download');
    let briefText = '';
    if (briefForm && briefResult) {
      briefForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const business = document.getElementById('brief-business')?.value.trim();
        const type = document.getElementById('brief-type')?.value.trim();
        const goal = document.getElementById('brief-goal')?.value;
        const pages = [...briefForm.querySelectorAll('input[name="brief-page"]:checked')].map((item) => item.value);
        const date = formatDate(document.getElementById('brief-date')?.value);
        const extra = document.getElementById('brief-extra')?.value.trim();
        if (!business || !type) return;
        briefText = 'WEBSITE PROJECT BRIEF\n\nBusiness / project: ' + business + '\nBusiness type: ' + type + '\nPrimary goal: ' + goal + '\nRequired pages: ' + (pages.length ? pages.join(', ') : 'To be discussed') + '\nTarget launch: ' + date + '\nExtra requirements: ' + (extra || 'To be discussed') + '\n\nNext step: confirm content, features, ownership, timeline, support and final quotation.';
        briefResult.textContent = briefText;
        briefResult.hidden = false;
        if (briefDownload) briefDownload.disabled = false;
      });
      briefDownload?.addEventListener('click', () => {
        if (briefText) downloadText('starwalt-website-project-brief.txt', briefText);
      });
    }

    const paymentForm = document.getElementById('payment-reminder-form');
    const paymentResult = document.getElementById('payment-result');
    const paymentCopy = document.getElementById('payment-copy');
    const paymentWhatsApp = document.getElementById('payment-whatsapp');
    let paymentMessage = '';
    if (paymentForm && paymentResult) {
      paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('payment-name')?.value.trim();
        const reference = document.getElementById('payment-reference')?.value.trim();
        const amount = Number(document.getElementById('payment-amount')?.value);
        const due = document.getElementById('payment-date')?.value;
        const tone = document.getElementById('payment-tone')?.value;
        if (!Number.isFinite(amount) || amount <= 0 || !due) return;
        const formattedAmount = new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'INR', maximumFractionDigits: 0}).format(amount);
        const greeting = name ? 'Hello ' + name + ',' : 'Hello,';
        const refText = reference ? ' for ' + reference : '';
        if (tone === 'overdue') {
          paymentMessage = greeting + ' this is a follow-up regarding the pending payment of ' + formattedAmount + refText + ', which was due on ' + formatDate(due) + '. Please let us know the expected payment date or contact us if you need any clarification. Thank you.';
        } else if (tone === 'professional') {
          paymentMessage = greeting + ' this is a reminder that the payment of ' + formattedAmount + refText + ' is due on ' + formatDate(due) + '. Kindly arrange payment by the due date and share confirmation once completed. Please contact us if you have any questions.';
        } else {
          paymentMessage = greeting + ' a friendly reminder that ' + formattedAmount + refText + ' is due on ' + formatDate(due) + '. Please share an update when convenient, and let us know if you need the invoice or any clarification. Thank you!';
        }
        paymentResult.textContent = paymentMessage;
        paymentResult.hidden = false;
        if (paymentCopy) paymentCopy.disabled = false;
        if (paymentWhatsApp) {
          paymentWhatsApp.href = 'https://wa.me/?text=' + encodeURIComponent(paymentMessage);
          paymentWhatsApp.hidden = false;
        }
      });
      paymentCopy?.addEventListener('click', async () => {
        if (!paymentMessage) return;
        try {
          await navigator.clipboard.writeText(paymentMessage);
          const old = paymentCopy.textContent;
          paymentCopy.textContent = 'Copied';
          setTimeout(() => { paymentCopy.textContent = old; }, 1600);
        } catch {
          paymentResult.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
      });
    }
  });
})();

;(() => {
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();
  ready(() => {
    const maintenanceForm = document.getElementById('maintenance-planner-form');
    const maintenanceResult = document.getElementById('maintenance-result');
    const maintenanceDownload = document.getElementById('maintenance-download');
    let maintenanceText = '';
    if (maintenanceForm && maintenanceResult) {
      maintenanceForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const type = document.getElementById('maintenance-type')?.value;
        const frequency = document.getElementById('maintenance-frequency')?.value;
        const features = [...maintenanceForm.querySelectorAll('input[name="maintenance-feature"]:checked')].map((item) => item.value);
        const tasks = [
          ['Security and backups', 'Confirm the site loads securely, create a backup, and check for unexpected changes.'],
          ['Forms and customer actions', 'Test contact links, forms, phone, WhatsApp, email, booking, and payment actions that apply.'],
          ['Content accuracy', 'Review service details, prices, team information, opening hours, offers, and contact information.'],
          ['Performance and mobile', 'Check important pages on mobile, compress new images, and review loading performance.'],
          ['Search visibility', 'Review page titles, broken links, search performance, local profile details, and recent reviews.'],
          ['Analytics and improvement', 'Compare traffic and enquiries, identify the strongest pages, and plan one improvement.']
        ];
        if (features.includes('Online payments')) tasks.splice(2, 0, ['Payment checks', 'Complete a small test transaction where appropriate and verify confirmation and refund information.']);
        if (features.includes('Product catalogue')) tasks.splice(3, 0, ['Catalogue checks', 'Review stock, product information, pricing, images, and unavailable items.']);
        if (features.includes('Booking system')) tasks.splice(2, 0, ['Booking checks', 'Test available slots, confirmation messages, cancellations, and notification delivery.']);
        maintenanceResult.replaceChildren();
        tasks.forEach(([title, detail]) => {
          const card = document.createElement('div');
          card.className = 'content-day';
          const heading = document.createElement('b');
          heading.textContent = title;
          const copy = document.createElement('span');
          copy.textContent = detail;
          card.append(heading, copy);
          maintenanceResult.append(card);
        });
        maintenanceText = 'STARWALT WEBSITE MAINTENANCE PLAN\nWebsite type: ' + type + '\nReview frequency: ' + frequency + '\nFeatures: ' + (features.join(', ') || 'Standard website') + '\n\n' + tasks.map(([title, detail]) => title + '\n' + detail).join('\n\n');
        maintenanceResult.hidden = false;
        if (maintenanceDownload) maintenanceDownload.disabled = false;
      });
      maintenanceDownload?.addEventListener('click', () => {
        if (!maintenanceText) return;
        const blob = new Blob([maintenanceText], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'starwalt-website-maintenance-plan.txt';
        link.click();
        URL.revokeObjectURL(url);
      });
    }

    const priorityForm = document.getElementById('lead-priority-form');
    const priorityResult = document.getElementById('lead-priority-result');
    if (priorityForm && priorityResult) {
      priorityForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const score = ['lead-timeline', 'lead-clarity', 'lead-budget', 'lead-decision']
          .reduce((total, id) => total + Number(document.getElementById(id)?.value || 0), 0);
        const high = score >= 9;
        const medium = score >= 5 && score < 9;
        const label = high ? 'High follow-up priority' : medium ? 'Medium follow-up priority' : 'Early-stage enquiry';
        const className = high ? 'priority-high' : medium ? 'priority-medium' : 'priority-low';
        const action = high
          ? 'Recommended next action: arrange a requirements call soon, confirm scope and decision steps, then prepare a written proposal.'
          : medium
            ? 'Recommended next action: clarify the main requirement, target date, budget expectations and decision process before proposing.'
            : 'Recommended next action: share a useful guide or service overview, ask one simple discovery question, and schedule a later follow-up.';
        priorityResult.replaceChildren();
        const badge = document.createElement('span');
        badge.className = 'priority-badge ' + className;
        badge.textContent = label;
        const detail = document.createElement('div');
        detail.textContent = action;
        priorityResult.append(badge, detail);
        priorityResult.hidden = false;
      });
      document.getElementById('lead-priority-reset')?.addEventListener('click', () => {
        priorityForm.reset();
        priorityResult.hidden = true;
        priorityResult.textContent = '';
      });
    }
  });
})();

;(() => {
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();
  const saveText = (filename, content) => {
    const blob = new Blob([content], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };
  const dateLabel = (value) => {
    if (!value) return 'To be confirmed';
    const [year, month, day] = value.split('-').map(Number);
    return new Intl.DateTimeFormat('en-IN', {day: 'numeric', month: 'short', year: 'numeric'}).format(new Date(year, month - 1, day));
  };
  ready(() => {
    const onboardingForm = document.getElementById('onboarding-checklist-form');
    const onboardingResult = document.getElementById('onboarding-result');
    const onboardingDownload = document.getElementById('onboarding-download');
    let onboardingText = '';
    if (onboardingForm && onboardingResult) {
      const common = [
        'Confirm the primary contact and decision-maker',
        'Agree on goals, scope, deliverables, timeline and approval process',
        'Collect brand name, logo, colours, fonts and approved business information',
        'Confirm communication channel, meeting frequency and response expectations',
        'Document ownership, access, support and handover responsibilities'
      ];
      const serviceTasks = {
        website: ['Collect page list, content, photos and reference websites', 'Confirm domain, hosting, forms, WhatsApp, Maps and analytics needs', 'Agree on mobile, accessibility, SEO and launch checks'],
        marketing: ['Define audience, offer, campaign goal and success measures', 'Collect approved creative assets and platform access', 'Confirm budget, review process and reporting schedule'],
        seo: ['Confirm target services, locations and priority search terms', 'Review website, Google Business Profile and contact consistency', 'Collect existing reports, review links and competitor references'],
        automation: ['Map the current process, inputs, outputs and exceptions', 'Confirm approved systems, data access and human review points', 'Define privacy, security, monitoring and fallback requirements'],
        training: ['Confirm learner level, outcomes, schedule and batch size', 'Share prerequisites, software setup and learning materials', 'Agree on attendance, assessments, support and completion criteria']
      };
      onboardingForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const service = document.getElementById('onboarding-service')?.value || 'website';
        const serviceName = document.getElementById('onboarding-service')?.selectedOptions?.[0]?.textContent || 'Service';
        const start = dateLabel(document.getElementById('onboarding-date')?.value);
        const contact = document.getElementById('onboarding-contact')?.value.trim() || 'To be confirmed';
        const tasks = [...common, ...(serviceTasks[service] || [])];
        onboardingResult.replaceChildren();
        tasks.forEach((task, index) => {
          const card = document.createElement('div');
          card.className = 'content-day';
          const heading = document.createElement('b');
          heading.textContent = 'Step ' + (index + 1);
          const detail = document.createElement('span');
          detail.textContent = task;
          card.append(heading, detail);
          onboardingResult.append(card);
        });
        onboardingText = 'STARWALT CLIENT ONBOARDING CHECKLIST\nService: ' + serviceName + '\nStart date: ' + start + '\nPrimary contact: ' + contact + '\n\n' + tasks.map((task, index) => '☐ ' + (index + 1) + '. ' + task).join('\n');
        onboardingResult.hidden = false;
        if (onboardingDownload) onboardingDownload.disabled = false;
      });
      onboardingDownload?.addEventListener('click', () => {
        if (onboardingText) saveText('starwalt-client-onboarding-checklist.txt', onboardingText);
      });
    }

    const issueForm = document.getElementById('issue-report-form');
    const issueResult = document.getElementById('issue-result');
    const issueCopy = document.getElementById('issue-copy');
    const issueDownload = document.getElementById('issue-download');
    let issueText = '';
    if (issueForm && issueResult) {
      issueForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const page = document.getElementById('issue-url')?.value.trim();
        const type = document.getElementById('issue-type')?.value;
        const device = document.getElementById('issue-device')?.value.trim();
        const description = document.getElementById('issue-description')?.value.trim();
        const steps = document.getElementById('issue-steps')?.value.trim() || 'Not provided';
        const impact = document.getElementById('issue-impact')?.value;
        if (!page || !device || !description) return;
        issueText = 'WEBSITE ISSUE REPORT\n\nPage: ' + page + '\nIssue type: ' + type + '\nDevice / browser: ' + device + '\nBusiness impact: ' + impact + '\n\nWhat happened:\n' + description + '\n\nSteps to reproduce:\n' + steps + '\n\nSecurity note: No passwords, OTPs, payment details or secret keys are included.';
        issueResult.textContent = issueText;
        issueResult.hidden = false;
        if (issueCopy) issueCopy.disabled = false;
        if (issueDownload) issueDownload.disabled = false;
      });
      issueCopy?.addEventListener('click', async () => {
        if (!issueText) return;
        try {
          await navigator.clipboard.writeText(issueText);
          const old = issueCopy.textContent;
          issueCopy.textContent = 'Copied';
          setTimeout(() => { issueCopy.textContent = old; }, 1600);
        } catch {
          issueResult.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
      });
      issueDownload?.addEventListener('click', () => {
        if (issueText) saveText('starwalt-website-issue-report.txt', issueText);
      });
    }
  });
})();

;(() => {
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();
  ready(() => {
    const search = document.getElementById('business-tool-search');
    const filters = [...document.querySelectorAll('[data-tool-filter]')];
    const panels = [...document.querySelectorAll('.business-tools-grid .tool-panel[data-tool-key]')];
    const status = document.getElementById('tool-directory-status');
    if (!search || !panels.length || !status) return;

    let activeFilter = 'all';
    let favourites = new Set();
    try {
      favourites = new Set(JSON.parse(localStorage.getItem('starwalt-tool-favourites') || '[]'));
    } catch {
      favourites = new Set();
    }

    const saveFavourites = () => {
      try {
        localStorage.setItem('starwalt-tool-favourites', JSON.stringify([...favourites]));
      } catch {
        // Favourites remain available for the current visit when storage is unavailable.
      }
    };

    const updateFavouriteButton = (button, key) => {
      const saved = favourites.has(key);
      button.classList.toggle('is-favourite', saved);
      button.textContent = saved ? '★' : '☆';
      button.setAttribute('aria-pressed', String(saved));
      button.setAttribute('aria-label', saved ? 'Remove from favourites' : 'Save to favourites');
      button.title = saved ? 'Remove from favourites' : 'Save to favourites';
    };

    panels.forEach((panel) => {
      const key = panel.dataset.toolKey;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'tool-favourite';
      updateFavouriteButton(button, key);
      button.addEventListener('click', () => {
        favourites.has(key) ? favourites.delete(key) : favourites.add(key);
        saveFavourites();
        updateFavouriteButton(button, key);
        applyFilters();
      });
      panel.prepend(button);
    });

    function applyFilters() {
      const query = search.value.trim().toLowerCase();
      let visible = 0;
      panels.forEach((panel) => {
        const categoryMatch = activeFilter === 'all'
          || (activeFilter === 'favourites' ? favourites.has(panel.dataset.toolKey) : panel.dataset.toolCategory === activeFilter);
        const searchable = (panel.dataset.toolKeywords + ' ' + panel.textContent).toLowerCase();
        const queryMatch = !query || searchable.includes(query);
        const show = categoryMatch && queryMatch;
        panel.hidden = !show;
        if (show) visible += 1;
      });
      const filterLabel = activeFilter === 'all' ? 'tools' : activeFilter === 'favourites' ? 'favourite tools' : activeFilter + ' tools';
      status.textContent = visible
        ? 'Showing ' + visible + ' ' + filterLabel
        : activeFilter === 'favourites' && favourites.size === 0
          ? 'No favourites saved yet. Tap the star on any tool to save it.'
          : 'No tools match this search. Try another keyword or category.';
    }

    search.addEventListener('input', applyFilters);
    filters.forEach((button) => {
      button.addEventListener('click', () => {
        activeFilter = button.dataset.toolFilter;
        filters.forEach((item) => item.classList.toggle('is-active', item === button));
        applyFilters();
      });
    });
    applyFilters();
  });
})();

;(() => {
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();
  ready(() => {
    const panels = [...document.querySelectorAll('.business-tools-grid .tool-panel[data-tool-key]')];
    const recentBox = document.getElementById('recent-tools');
    const recentList = document.getElementById('recent-tools-list');
    const search = document.getElementById('business-tool-search');
    const allFilter = document.querySelector('[data-tool-filter="all"]');
    if (!panels.length) return;

    let recent = [];
    try {
      recent = JSON.parse(localStorage.getItem('starwalt-recent-tools') || '[]');
      if (!Array.isArray(recent)) recent = [];
    } catch {
      recent = [];
    }

    const panelByKey = (key) => panels.find((panel) => panel.dataset.toolKey === key);
    const panelTitle = (panel) => panel.querySelector('h3')?.textContent.trim() || 'Business tool';

    const saveRecent = (key) => {
      recent = [key, ...recent.filter((item) => item !== key)].slice(0, 4);
      try {
        localStorage.setItem('starwalt-recent-tools', JSON.stringify(recent));
      } catch {
        // Recent shortcuts still work during the current visit.
      }
      renderRecent();
    };

    const closePanel = (panel) => {
      const form = panel.querySelector('form');
      const button = panel.querySelector('.tool-open');
      if (form) form.hidden = true;
      panel.classList.remove('is-open');
      if (button) {
        button.textContent = 'Open tool';
        button.setAttribute('aria-expanded', 'false');
      }
    };

    const openPanel = (panel, shouldScroll = true) => {
      panels.forEach((item) => { if (item !== panel) closePanel(item); });
      const form = panel.querySelector('form');
      const button = panel.querySelector('.tool-open');
      if (form) form.hidden = false;
      panel.classList.add('is-open');
      if (button) {
        button.textContent = 'Close tool';
        button.setAttribute('aria-expanded', 'true');
      }
      saveRecent(panel.dataset.toolKey);
      const hash = '#' + panel.id;
      if (history.replaceState) history.replaceState(null, '', hash);
      if (shouldScroll) panel.scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    const showTool = (key) => {
      const panel = panelByKey(key);
      if (!panel) return;
      if (search) {
        search.value = '';
        search.dispatchEvent(new Event('input', {bubbles: true}));
      }
      allFilter?.click();
      panel.hidden = false;
      openPanel(panel);
    };

    function renderRecent() {
      if (!recentBox || !recentList) return;
      const available = recent.map(panelByKey).filter(Boolean);
      recentList.replaceChildren();
      available.forEach((panel) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'recent-tool-link';
        button.textContent = panelTitle(panel);
        button.addEventListener('click', () => showTool(panel.dataset.toolKey));
        recentList.append(button);
      });
      recentBox.hidden = available.length === 0;
    }

    panels.forEach((panel) => {
      const key = panel.dataset.toolKey;
      panel.id = 'tool-' + key;
      const form = panel.querySelector('form');
      if (!form) return;
      form.hidden = true;

      const controls = document.createElement('div');
      controls.className = 'tool-card-controls';
      const openButton = document.createElement('button');
      openButton.type = 'button';
      openButton.className = 'tool-open';
      openButton.textContent = 'Open tool';
      openButton.setAttribute('aria-expanded', 'false');
      openButton.setAttribute('aria-controls', form.id);

      const copyButton = document.createElement('button');
      copyButton.type = 'button';
      copyButton.className = 'tool-copy-link';
      copyButton.textContent = 'Copy tool link';

      openButton.addEventListener('click', () => {
        panel.classList.contains('is-open') ? closePanel(panel) : openPanel(panel, false);
      });
      copyButton.addEventListener('click', async () => {
        const link = location.origin + location.pathname + '#tool-' + key;
        try {
          await navigator.clipboard.writeText(link);
          copyButton.textContent = 'Link copied';
          setTimeout(() => { copyButton.textContent = 'Copy tool link'; }, 1600);
        } catch {
          location.hash = 'tool-' + key;
          copyButton.textContent = 'Link ready';
          setTimeout(() => { copyButton.textContent = 'Copy tool link'; }, 1600);
        }
      });
      controls.append(openButton, copyButton);
      form.before(controls);
    });

    renderRecent();
    const initialKey = location.hash.startsWith('#tool-') ? location.hash.slice(6) : '';
    if (initialKey && panelByKey(initialKey)) {
      setTimeout(() => showTool(initialKey), 0);
    }
    window.addEventListener('hashchange', () => {
      const key = location.hash.startsWith('#tool-') ? location.hash.slice(6) : '';
      if (key && panelByKey(key)) showTool(key);
    });
  });
})();

;(() => {
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();
  ready(() => {
    const recommender = document.getElementById('tool-recommender-form');
    const result = document.getElementById('tool-recommender-result');
    const download = document.getElementById('download-favourites');
    const clear = document.getElementById('clear-favourites');
    const panels = [...document.querySelectorAll('.business-tools-grid .tool-panel[data-tool-key]')];
    if (!panels.length) return;

    const panelByKey = (key) => panels.find((panel) => panel.dataset.toolKey === key);
    const titleOf = (panel) => panel?.querySelector('h3')?.textContent.trim() || 'Business tool';
    const showPanel = (panel) => {
      const search = document.getElementById('business-tool-search');
      if (search) {
        search.value = '';
        search.dispatchEvent(new Event('input', {bubbles: true}));
      }
      document.querySelector('[data-tool-filter="all"]')?.click();
      panel.hidden = false;
      const open = panel.querySelector('.tool-open');
      if (!panel.classList.contains('is-open')) open?.click();
      panel.scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    const recommendations = {
      customers: ['local-seo', 'content-planner', 'review-request'],
      website: ['requirements-brief', 'launch-checker', 'maintenance-plan'],
      sales: ['lead-followup', 'lead-priority', 'payment-reminder'],
      operations: ['client-onboarding', 'requirements-brief', 'maintenance-plan'],
      support: ['issue-report', 'maintenance-plan', 'launch-checker']
    };

    recommender?.addEventListener('submit', (event) => {
      event.preventDefault();
      const goal = document.getElementById('recommend-goal')?.value || 'customers';
      const stage = document.getElementById('recommend-stage')?.value || 'starting';
      let keys = [...(recommendations[goal] || recommendations.customers)];
      if (stage === 'starting' && keys.includes('requirements-brief')) {
        keys = ['requirements-brief', ...keys.filter((key) => key !== 'requirements-brief')];
      }
      result.replaceChildren();
      const intro = document.createElement('strong');
      intro.textContent = 'Recommended next tools';
      result.append(intro);
      keys.map(panelByKey).filter(Boolean).forEach((panel) => {
        const row = document.createElement('div');
        row.className = 'recommended-tool';
        const label = document.createElement('span');
        label.textContent = titleOf(panel);
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = 'Open tool';
        button.addEventListener('click', () => showPanel(panel));
        row.append(label, button);
        result.append(row);
      });
      result.hidden = false;
    });

    const favouritePanels = () => panels.filter((panel) => panel.querySelector('.tool-favourite.is-favourite'));
    const refreshFavouriteActions = () => {
      const count = favouritePanels().length;
      if (download) {
        download.disabled = count === 0;
        download.textContent = count ? 'Download favourites (' + count + ')' : 'Download favourites';
      }
      if (clear) clear.disabled = count === 0;
    };

    document.addEventListener('click', (event) => {
      if (event.target.closest('.tool-favourite')) setTimeout(refreshFavouriteActions, 0);
    });

    download?.addEventListener('click', () => {
      const favourites = favouritePanels();
      if (!favourites.length) return;
      const base = location.origin + location.pathname;
      const text = 'STARWALT FAVOURITE TOOLS\n\n' + favourites.map((panel, index) =>
        (index + 1) + '. ' + titleOf(panel) + '\n' + base + '#tool-' + panel.dataset.toolKey
      ).join('\n\n');
      const blob = new Blob([text], {type: 'text/plain'});
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'starwalt-favourite-tools.txt';
      link.click();
      URL.revokeObjectURL(url);
    });

    clear?.addEventListener('click', () => {
      favouritePanels().forEach((panel) => panel.querySelector('.tool-favourite')?.click());
      refreshFavouriteActions();
    });

    setTimeout(refreshFavouriteActions, 0);
  });
})();

;(() => {
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();
  ready(() => {
    const remember = document.getElementById('remember-tool-entries');
    const clearData = document.getElementById('clear-tool-data');
    const storageStatus = document.getElementById('tool-storage-status');
    const panels = [...document.querySelectorAll('.business-tools-grid .tool-panel[data-tool-key]')];
    const forms = panels.map((panel) => panel.querySelector('form')).filter(Boolean);
    if (!panels.length) return;

    const draftKey = (form) => 'starwalt-tool-draft-' + form.id;
    const fieldsOf = (form) => [...form.querySelectorAll('input, select, textarea')]
      .filter((field) => !['button', 'submit', 'reset', 'file'].includes(field.type));

    const setStatus = (message) => {
      if (storageStatus) storageStatus.textContent = message;
    };

    const isRemembering = () => {
      try {
        return localStorage.getItem('starwalt-remember-tool-entries') === 'true';
      } catch {
        return false;
      }
    };

    const saveForm = (form) => {
      if (!isRemembering()) return;
      const values = {};
      fieldsOf(form).forEach((field, index) => {
        const key = field.name || field.id || 'field-' + index;
        if (field.type === 'checkbox' || field.type === 'radio') values[key] = field.checked;
        else values[key] = field.value;
      });
      try {
        localStorage.setItem(draftKey(form), JSON.stringify(values));
        setStatus('Entries are saved only on this device. You can clear them at any time.');
      } catch {
        setStatus('This browser could not save entries. Your forms still work normally.');
      }
    };

    const restoreForm = (form) => {
      let values;
      try {
        values = JSON.parse(localStorage.getItem(draftKey(form)) || 'null');
      } catch {
        values = null;
      }
      if (!values) return;
      fieldsOf(form).forEach((field, index) => {
        const key = field.name || field.id || 'field-' + index;
        if (!(key in values)) return;
        if (field.type === 'checkbox' || field.type === 'radio') field.checked = Boolean(values[key]);
        else field.value = values[key];
      });
    };

    const removeDrafts = () => {
      forms.forEach((form) => {
        try { localStorage.removeItem(draftKey(form)); } catch {}
      });
    };

    if (remember) {
      remember.checked = isRemembering();
      if (remember.checked) {
        forms.forEach(restoreForm);
        setStatus('Entries are saved only on this device. You can clear them at any time.');
      }
      remember.addEventListener('change', () => {
        try {
          localStorage.setItem('starwalt-remember-tool-entries', String(remember.checked));
        } catch {
          remember.checked = false;
          setStatus('This browser does not allow local entry saving.');
          return;
        }
        if (remember.checked) {
          forms.forEach(saveForm);
          setStatus('Entry saving is on for this device.');
        } else {
          removeDrafts();
          setStatus('Entry saving is off. Previously saved entries were removed.');
        }
      });
    }

    forms.forEach((form) => {
      form.addEventListener('input', () => saveForm(form));
      form.addEventListener('change', () => saveForm(form));
      form.addEventListener('reset', () => setTimeout(() => saveForm(form), 0));
    });

    clearData?.addEventListener('click', () => {
      const approved = window.confirm('Clear saved entries, favourites and recently opened tools from this device?');
      if (!approved) return;
      try {
        Object.keys(localStorage)
          .filter((key) => key.startsWith('starwalt-'))
          .forEach((key) => localStorage.removeItem(key));
      } catch {}
      forms.forEach((form) => form.reset());
      location.reload();
    });

    panels.forEach((panel) => {
      const controls = panel.querySelector('.tool-card-controls');
      if (!controls || controls.querySelector('.tool-print')) return;
      const printButton = document.createElement('button');
      printButton.type = 'button';
      printButton.className = 'tool-print';
      printButton.textContent = 'Print tool';
      printButton.addEventListener('click', () => {
        if (!panel.classList.contains('is-open')) panel.querySelector('.tool-open')?.click();
        document.body.classList.add('printing-tool');
        panel.classList.add('print-target');
        const cleanup = () => {
          document.body.classList.remove('printing-tool');
          panel.classList.remove('print-target');
        };
        window.addEventListener('afterprint', cleanup, {once: true});
        window.print();
      });
      controls.append(printButton);
    });
  });
})();

;(() => {
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();
  ready(() => {
    const panels = [...document.querySelectorAll('.business-tools-grid .tool-panel[data-tool-key]')];
    const search = document.getElementById('business-tool-search');
    if (!panels.length) return;

    panels.forEach((panel) => {
      const controls = panel.querySelector('.tool-card-controls');
      if (!controls || controls.querySelector('.tool-share')) return;
      const share = document.createElement('button');
      share.type = 'button';
      share.className = 'tool-share';
      share.textContent = 'Share tool';
      share.addEventListener('click', async () => {
        const title = panel.querySelector('h3')?.textContent.trim() || 'Starwalt business tool';
        const url = location.origin + location.pathname + '#tool-' + panel.dataset.toolKey;
        if (navigator.share) {
          try {
            await navigator.share({title, text: 'Try this free Starwalt business tool: ' + title, url});
            return;
          } catch (error) {
            if (error?.name === 'AbortError') return;
          }
        }
        try {
          await navigator.clipboard.writeText(url);
          const old = share.textContent;
          share.textContent = 'Link copied';
          setTimeout(() => { share.textContent = old; }, 1600);
        } catch {
          location.hash = 'tool-' + panel.dataset.toolKey;
          share.textContent = 'Link ready';
          setTimeout(() => { share.textContent = 'Share tool'; }, 1600);
        }
      });
      controls.append(share);
    });

    document.addEventListener('keydown', (event) => {
      const target = event.target;
      const typing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement || target?.isContentEditable;
      const focusSearch = (event.key === '/' && !typing) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k');
      if (focusSearch && search) {
        event.preventDefault();
        search.focus();
        search.select();
        search.scrollIntoView({behavior: 'smooth', block: 'center'});
        return;
      }
      if (event.key === 'Escape') {
        const openPanel = panels.find((panel) => panel.classList.contains('is-open'));
        if (openPanel) {
          openPanel.querySelector('.tool-open')?.click();
          if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
          openPanel.querySelector('.tool-open')?.focus();
        } else if (typing) {
          target.blur();
        }
      }
    });
  });
})();

;(() => {
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();
  const fallbackCopy = (text) => {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();
    const copied = document.execCommand('copy');
    area.remove();
    return copied;
  };
  ready(() => {
    const panels = [...document.querySelectorAll('.business-tools-grid .tool-panel[data-tool-key]')];
    panels.forEach((panel) => {
      const result = panel.querySelector('.tool-result');
      if (!result || result.nextElementSibling?.classList.contains('generated-result-actions')) return;

      const actions = document.createElement('div');
      actions.className = 'generated-result-actions';
      actions.hidden = true;

      const copy = document.createElement('button');
      copy.type = 'button';
      copy.textContent = 'Copy result';

      const download = document.createElement('button');
      download.type = 'button';
      download.textContent = 'Download result';

      const clear = document.createElement('button');
      clear.type = 'button';
      clear.className = 'clear-generated-result';
      clear.textContent = 'Clear result';

      const resultText = () => result.innerText.trim();
      const update = () => {
        actions.hidden = result.hidden || !resultText();
      };

      copy.addEventListener('click', async () => {
        const text = resultText();
        if (!text) return;
        let copied = false;
        try {
          await navigator.clipboard.writeText(text);
          copied = true;
        } catch {
          copied = fallbackCopy(text);
        }
        if (copied) {
          copy.textContent = 'Copied';
          setTimeout(() => { copy.textContent = 'Copy result'; }, 1600);
        }
      });

      download.addEventListener('click', () => {
        const text = resultText();
        if (!text) return;
        const title = panel.querySelector('h3')?.textContent.trim() || 'Starwalt tool result';
        const content = title.toUpperCase() + '\n\n' + text;
        const blob = new Blob([content], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'starwalt-' + panel.dataset.toolKey + '-result.txt';
        link.click();
        URL.revokeObjectURL(url);
      });

      clear.addEventListener('click', () => {
        result.replaceChildren();
        result.hidden = true;
        actions.hidden = true;
      });

      actions.append(copy, download, clear);
      result.after(actions);
      new MutationObserver(update).observe(result, {attributes: true, childList: true, subtree: true});
      update();
    });
  });
})();

;(() => {
  const ready = (fn) => document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn();
  ready(() => {
    const largeText = document.getElementById('tool-large-text');
    const highContrast = document.getElementById('tool-high-contrast');
    const reduceMotion = document.getElementById('tool-reduce-motion');
    const reset = document.getElementById('reset-tool-display');
    const status = document.getElementById('tool-display-status');
    if (!largeText || !highContrast || !reduceMotion) return;

    const storageKey = 'starwalt-tool-display';
    const systemReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false;
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    } catch {
      saved = null;
    }

    largeText.checked = Boolean(saved?.largeText);
    highContrast.checked = Boolean(saved?.highContrast);
    reduceMotion.checked = saved ? Boolean(saved.reduceMotion) : systemReducedMotion;

    const apply = (announce = true) => {
      document.body.classList.toggle('tool-large-text', largeText.checked);
      document.body.classList.toggle('tool-high-contrast', highContrast.checked);
      document.body.classList.toggle('tool-reduce-motion', reduceMotion.checked);
      const active = [
        largeText.checked && 'larger text',
        highContrast.checked && 'higher contrast',
        reduceMotion.checked && 'reduced motion'
      ].filter(Boolean);
      if (status && announce) status.textContent = active.length
        ? 'Active: ' + active.join(', ') + '.'
        : 'Default display settings are active.';
    };

    const save = () => {
      const preferences = {
        largeText: largeText.checked,
        highContrast: highContrast.checked,
        reduceMotion: reduceMotion.checked
      };
      try {
        localStorage.setItem(storageKey, JSON.stringify(preferences));
      } catch {
        if (status) status.textContent = 'Settings are active for this visit but could not be saved.';
      }
      apply();
    };

    [largeText, highContrast, reduceMotion].forEach((control) => control.addEventListener('change', save));
    reset?.addEventListener('click', () => {
      largeText.checked = false;
      highContrast.checked = false;
      reduceMotion.checked = systemReducedMotion;
      try { localStorage.removeItem(storageKey); } catch {}
      apply();
      if (status) status.textContent = systemReducedMotion
        ? 'Display reset. Reduced motion follows your device preference.'
        : 'Display settings reset to default.';
    });

    apply(false);
    if (status) {
      const active = [
        largeText.checked && 'larger text',
        highContrast.checked && 'higher contrast',
        reduceMotion.checked && 'reduced motion'
      ].filter(Boolean);
      status.textContent = active.length ? 'Active: ' + active.join(', ') + '.' : 'Default display settings are active.';
    }
  });
})();
