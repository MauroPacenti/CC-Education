import"./modulepreload-polyfill-B5Qt9EMX.js";import"./global-BxX6xo6f.js";const x=c=>{switch(c){case 1:return"08:00";case 2:return"13:00";case 3:return"08:00";case 4:return"08:00"}},N=c=>{switch(c){case 1:return"12:00";case 2:return"19:00";case 3:return"19:00";case 4:return"12:00"}},e=document.querySelector(".appointment-form"),i={keeper:{firstName:"",lastName:"",email:"",cf:"",phone:""},group:{minors:0,adults:0},organization:{name:"",type:"",address:"",phone:"",email:""},journeyRequest:{startAvailabilityDate:"",endAvailabilityDate:"",duration:0}},D=c=>{const o=c.querySelectorAll("input, select, textarea"),d={};return o.forEach(v=>{v.name&&(d[v.name]=v.type==="number"?Number(v.value):v.value)}),d},R=c=>{c.querySelectorAll("input, select, textarea").forEach(d=>{d.value=""})},q=document.getElementById("successModal"),S=document.getElementById("errorModal"),P=document.querySelectorAll(".close-button"),p=document.querySelector(".modal");e==null||e.addEventListener("submit",async c=>{if(c.preventDefault(),m===null||n===null||k===null||w===null)return;const o=D(m),d=D(n),v=D(k),E=D(w);i.keeper=o,i.organization=d,i.group=v,i.journeyRequest=E,i.group.minors=Number(i.group.minors),i.group.adults=Number(i.group.adults),i.journeyRequest.duration=Number(i.journeyRequest.duration),i.journeyRequest.startAvailabilityDate=`${i.journeyRequest.startAvailabilityDate}T${x(i.journeyRequest.duration)}:00`,i.journeyRequest.endAvailabilityDate=`${i.journeyRequest.endAvailabilityDate}T${N(i.journeyRequest.duration)}:00`;const s="/api/pub/createJourneyRequest";p==null||p.classList.toggle("active");const t=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});console.log(i),t.ok?(await t.json(),q!==null&&(q.style.display="block")):(console.error("Errore nella richiesta di prenotazione"),S!==null&&(S.style.display="block")),R(m),R(n),R(k),R(w),p==null||p.classList.toggle("active")});P.forEach(c=>{c.addEventListener("click",()=>{q!==null&&(q.style.display="none"),S!==null&&(S.style.display="none")})});window.addEventListener("click",c=>{c.target===q&&q!==null&&(q.style.display="none"),c.target===S&&S!==null&&(S.style.display="none")});let y=0;const Z=document.querySelectorAll(".btn-next"),$=document.querySelectorAll(".btn-prev"),m=document.querySelector("#page1"),n=document.querySelector("#page2"),f=document.querySelector("#page3"),b=document.querySelector("#icon1"),u=document.querySelector("#icon2"),A=document.querySelector("#icon3"),h=document.querySelector("#icon1 img"),g=document.querySelector("#icon2 img"),L=document.querySelector(".form-title"),j=document.querySelector("#done1"),z=document.querySelector("#done2"),k=document.querySelector(".group"),w=document.querySelector(".journey");Z.forEach(c=>{c.addEventListener("click",()=>{C(y)&&(y===0?(L!==null&&(L.textContent="Dati Organizzazione"),m==null||m.classList.remove("active"),n==null||n.classList.add("active"),b==null||b.classList.replace("active","done"),u==null||u.classList.add("active"),h==null||h.classList.add("hide"),j==null||j.classList.remove("hide"),y++):y===1&&(L!==null&&(L.textContent="Dati Prenotazione"),n==null||n.classList.remove("active"),f==null||f.classList.add("active"),u==null||u.classList.replace("active","done"),A==null||A.classList.add("active"),g==null||g.classList.add("hide"),z==null||z.classList.remove("hide"),y++))})});$.forEach(c=>{c.addEventListener("click",()=>{y===2?(L!==null&&(L.textContent="Dati Organizzazione"),f==null||f.classList.remove("active"),n==null||n.classList.add("active"),A==null||A.classList.remove("active"),u==null||u.classList.replace("done","active"),g==null||g.classList.remove("hide"),z==null||z.classList.add("hide"),y--):y===1&&(L!==null&&(L.textContent="Dati Accompagnatore"),n==null||n.classList.remove("active"),m==null||m.classList.add("active"),u==null||u.classList.remove("active"),b==null||b.classList.replace("done","active"),h==null||h.classList.remove("hide"),j==null||j.classList.add("hide"),y--)})});const C=c=>{let o=!0;const d=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,v=/^[A-Z0-9]{6}[0-9]{2}[A-Z]{1}[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{1}$/,E=/^\+?[0-9]{1,4}?[-.\s]?[0-9]{6,10}$/;if(c===0){const s=e==null?void 0:e.querySelector('[name="firstName"]'),t=e==null?void 0:e.querySelector('[name="lastName"]'),l=e==null?void 0:e.querySelector('[name="email"]'),a=e==null?void 0:e.querySelector('[name="cf"]'),r=e==null?void 0:e.querySelector('[name="phone"]');s!=null&&s.value.trim()?s.classList.remove("error"):(s==null||s.classList.add("error"),o=!1),t!=null&&t.value.trim()?t.classList.remove("error"):(t==null||t.classList.add("error"),o=!1),!(l!=null&&l.value.trim())||!d.test(l.value)?(l==null||l.classList.add("error"),o=!1):l.classList.remove("error"),!(a!=null&&a.value.trim())||!v.test(a.value)?(a==null||a.classList.add("error"),o=!1):a.classList.remove("error"),!(r!=null&&r.value.trim())||!E.test(r.value)?(r==null||r.classList.add("error"),o=!1):r.classList.remove("error")}if(c===1){const s=e==null?void 0:e.querySelector('[name="name"]'),t=e==null?void 0:e.querySelector('[name="type"]'),l=e==null?void 0:e.querySelector('[name="address"]'),a=e==null?void 0:e.querySelector('[name="phone"]'),r=e==null?void 0:e.querySelector('[name="email"]');s!=null&&s.value.trim()?s.classList.remove("error"):(s==null||s.classList.add("error"),o=!1),t!=null&&t.value.trim()?t.classList.remove("error"):(t==null||t.classList.add("error"),o=!1),l!=null&&l.value.trim()?l.classList.remove("error"):(l==null||l.classList.add("error"),o=!1),!(a!=null&&a.value.trim())||!E.test(a.value)?(a==null||a.classList.add("error"),o=!1):a.classList.remove("error"),!(r!=null&&r.value.trim())||!d.test(r.value)?(r==null||r.classList.add("error"),o=!1):r.classList.remove("error")}if(c===2){const s=e==null?void 0:e.querySelector('[name="minors"]'),t=e==null?void 0:e.querySelector('[name="adults"]'),l=e==null?void 0:e.querySelector('[name="startAvailabilityDate"]'),a=e==null?void 0:e.querySelector('[name="endAvailabilityDate"]'),r=e==null?void 0:e.querySelector('[name="duration"]');(s==null?void 0:s.value.trim())===""||Number(s==null?void 0:s.value)<0?(s==null||s.classList.add("error"),o=!1):s==null||s.classList.remove("error"),(t==null?void 0:t.value.trim())===""||Number(t==null?void 0:t.value)<=0?(t==null||t.classList.add("error"),o=!1):t==null||t.classList.remove("error"),!(l!=null&&l.value.trim())||!(a!=null&&a.value.trim())||new Date(l.value)>=new Date(a.value)?(l==null||l.classList.add("error"),a==null||a.classList.add("error"),o=!1):(l.classList.remove("error"),a.classList.remove("error")),(r==null?void 0:r.value.trim())===""||Number(r==null?void 0:r.value)<=0?(r==null||r.classList.add("error"),o=!1):r==null||r.classList.remove("error")}return o};
