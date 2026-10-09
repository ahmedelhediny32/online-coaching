(function(){
'use strict';

/* رقم واتساب المدرب بالصيغة الدولية من غير + ولا مسافات، مثال: 201012345678 */
var COACH = '201011695885';

/*S-START*/
var S = [
 {t:'بياناتك', f:[
  {k:'name', l:'الاسم', q:'اسمك بالكامل', type:'text', req:1},
  {k:'age', l:'السن', q:'سنك كام؟', type:'number', req:1, min:10, max:90},
  {k:'gender', l:'النوع', q:'النوع', type:'choice', o:['ذكر','أنثى'], req:1},
  {k:'phone', l:'الموبايل', q:'رقم الواتساب بتاعك', type:'tel', req:1},
  {k:'city', l:'المدينة', q:'محافظتك أو مدينتك', type:'text'},
  {k:'job', l:'طبيعة الشغل', q:'شغلك أو دراستك', type:'choice', o:['مكتبي','حركي','مختلط']}
 ]},
 {t:'جسمك', f:[
  {k:'height', l:'الطول (سم)', q:'طولك بالسنتيمتر', type:'number', req:1, min:100, max:230},
  {k:'weight', l:'الوزن الحالي (كجم)', q:'وزنك الحالي بالكيلو', type:'number', req:1, min:25, max:300},
  {k:'targetWeight', l:'الوزن المستهدف (كجم)', q:'الوزن اللي عايز توصله', type:'number', min:25, max:300},
  {k:'waist', l:'محيط الوسط (سم)', q:'محيط وسطك بالسنتيمتر', type:'number', min:40, max:250, h:'قيسه عند السُّرة.'},
  {k:'hasInbody', l:'عندي InBody', q:'عندك قياس InBody؟', type:'choice', o:['نعم','لا'], h:'لو نعم، ابعت صورته على الواتساب بعد ما تبعت الاستمارة.'}
 ]},
 {t:'هدفك', f:[
  {k:'goal', l:'الهدف الأساسي', q:'إيه هدفك الأساسي؟', type:'choice', o:['خسارة دهون','زيادة كتلة عضلية','زيادة وزن','لياقة وتثبيت','أداء رياضي'], req:1},
  {k:'goalDetail', l:'تفاصيل الهدف', q:'عايز توصل لإيه بالظبط؟', type:'textarea'},
  {k:'deadline', l:'ميعاد الوصول للهدف', q:'في ميعاد محدد تحب توصل فيه؟', type:'date'},
  {k:'commit', l:'الالتزام من 10', q:'التزامك المتوقع بالخطة من 1 لـ 10', type:'scale'}
 ]},
 {t:'صحتك', f:[
  {k:'conditions', l:'أمراض أو حالات صحية', q:'عندك أي أمراض أو حالات صحية؟', type:'textarea', h:'اكتب «مفيش» لو مفيش.'},
  {k:'injuries', l:'إصابات', q:'إصابات حالية أو قديمة؟', type:'textarea'},
  {k:'meds', l:'أدوية', q:'بتاخد أدوية بانتظام؟', type:'textarea'},
  {k:'allergies', l:'حساسية', q:'حساسية من أكل أو أدوية؟', type:'textarea'},
  {k:'restrictions', l:'قيود طبية على التمرين', q:'دكتور منعك من نوع تمرين معين؟', type:'textarea'},
  {k:'confirm', l:'إقرار صحة البيانات الصحية', q:'أؤكد إن المعلومات الصحية اللي كتبتها صحيحة وكاملة على حد علمي', type:'check', req:1}
 ]},
 {t:'تمرينك', f:[
  {k:'trains', l:'بتتمرن دلوقتي', q:'بتتمرن حاليًا؟', type:'choice', o:['نعم','لا']},
  {k:'trainDays', l:'أيام التمرين في الأسبوع', q:'بتتمرن كام يوم في الأسبوع؟', type:'number', min:0, max:7},
  {k:'trainType', l:'نوع التمرين', q:'نوع التمرين', type:'text', h:'مثال: حديد، كارديو، كرة قدم، كروس فيت.'},
  {k:'trainPlace', l:'مكان التمرين', q:'مكان التمرين', type:'choice', o:['جيم','البيت','نادي','ملعب']},
  {k:'level', l:'المستوى', q:'مستواك', type:'choice', o:['مبتدئ','متوسط','متقدم']},
  {k:'sessionMin', l:'مدة الحصة (دقيقة)', q:'الحصة بتاخد كام دقيقة؟', type:'number', min:10, max:300}
 ]},
 {t:'أكلك', f:[
  {k:'meals', l:'عدد الوجبات في اليوم', q:'بتاكل كام وجبة في اليوم؟', type:'number', min:1, max:10},
  {k:'typicalDay', l:'يوم أكل عادي', q:'اكتب يوم أكل عادي عندك', type:'textarea', h:'من الصبح لحد بالليل، وبأي مواعيد تقريبًا.'},
  {k:'likes', l:'أكل بحبه', q:'أكل بتحبه', type:'text'},
  {k:'dislikes', l:'أكل مبحبوش أو مش بقدر أكله', q:'أكل مبتحبوش أو مش بتقدر تاكله', type:'text'},
  {k:'eatOut', l:'أكل بره (مرات في الأسبوع)', q:'بتاكل بره كام مرة في الأسبوع؟', type:'number', min:0, max:21},
  {k:'cook', l:'مين بيطبخ', q:'مين بيجهز الأكل عندك؟', type:'choice', o:['أنا','الأهل','مطاعم']},
  {k:'budget', l:'ميزانية الأكل', q:'ميزانية الأكل التقريبية', type:'text', h:'في اليوم أو في الأسبوع.'},
  {k:'protein', l:'البروتين المفضل', q:'البروتين اللي بتفضله', type:'multi', o:['فراخ','لحوم','سمك','بيض','ألبان','بقوليات']},
  {k:'carbs', l:'الكارب المفضل', q:'الكربوهيدرات اللي بتفضلها', type:'multi', o:['رز','مكرونة','بطاطس','بطاطا','شوفان','عيش']},
  {k:'supps', l:'المكملات', q:'المكملات اللي بتستخدمها', type:'multi', o:['Whey Protein','Creatine','Omega-3','Multivitamin','Vitamin D','Electrolytes','مش بستخدم مكملات']}
 ]},
 {t:'حياتك', f:[
  {k:'sleepHours', l:'ساعات النوم', q:'بتنام كام ساعة في اليوم؟', type:'number', min:1, max:16},
  {k:'sleepQuality', l:'جودة النوم من 10', q:'جودة نومك من 1 لـ 10', type:'scale'},
  {k:'stress', l:'التوتر من 10', q:'مستوى التوتر عندك من 1 لـ 10', type:'scale'},
  {k:'water', l:'المياه (لتر)', q:'بتشرب كام لتر مياه في اليوم؟', type:'number', min:0, max:10},
  {k:'smoke', l:'تدخين', q:'بتدخن؟', type:'choice', o:['نعم','لا']},
  {k:'caffeine', l:'كافيين في اليوم', q:'بتشرب كام كوباية قهوة أو شاي أو مشروب طاقة في اليوم؟', type:'number', min:0, max:20},
  {k:'barrier', l:'أصعب حاجة في الالتزام', q:'إيه أكتر حاجة بتصعّب عليك الالتزام؟', type:'textarea'},
  {k:'contact', l:'طريقة التواصل', q:'تحب نتواصل إزاي؟', type:'choice', o:['واتساب','مكالمة']},
  {k:'notes', l:'ملاحظات تانية', q:'أي حاجة تانية تحب نعرفها؟', type:'textarea'}
 ]}
];
/*S-END*/

var TOTAL = S.length + 1;
var DRAFT = 'intake_draft_v1';
var V = {}, step = 0;
var body = document.getElementById('body');

function h(tag, props){
  var el = document.createElement(tag), p = props || {};
  Object.keys(p).forEach(function(k){
    var v = p[k];
    if (k === 'class') el.className = v;
    else if (k === 'on') Object.keys(v).forEach(function(ev){ el.addEventListener(ev, v[ev]); });
    else if (v === true) el.setAttribute(k, '');
    else if (v !== false && v != null) el.setAttribute(k, v);
  });
  Array.prototype.slice.call(arguments, 2).forEach(function add(kid){
    if (kid == null || kid === false) return;
    if (Array.isArray(kid)) return kid.forEach(add);
    el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
  });
  return el;
}
function norm(s){ return String(s).replace(/[٠-٩]/g, function(d){ return '٠١٢٣٤٥٦٧٨٩'.indexOf(d); }).replace(/٫/g, '.'); }
function has(v){ return Array.isArray(v) ? v.length > 0 : (v != null && v !== ''); }
function show(v){ return Array.isArray(v) ? v.join('، ') : String(v); }

/* draft (so a refresh doesn't lose answers) */
function save(){ try { localStorage.setItem(DRAFT, JSON.stringify({V:V, step:step})); } catch(e){} }
(function load(){
  try {
    var d = JSON.parse(localStorage.getItem(DRAFT) || 'null');
    if (d && d.V){ V = d.V; step = Math.min(Math.max(d.step|0, 0), TOTAL-1); }
  } catch(e){}
})();

/* fields */
function setErr(k, msg){
  var q = body.querySelector('[data-k="' + k + '"]'); if (!q) return;
  q.classList.toggle('bad', !!msg);
  var e = q.querySelector('.err'); e.textContent = msg || ''; e.hidden = !msg;
}
function isOn(f, val){ return f.type === 'multi' ? (V[f.k]||[]).indexOf(val) > -1 : V[f.k] === val; }
function optionsEl(f){
  var g = h('div', {class:'opts' + (f.type === 'scale' ? ' scale' : '')});
  var list = f.type === 'scale' ? ['1','2','3','4','5','6','7','8','9','10'] : f.o;
  list.forEach(function(val){
    var b = h('button', {type:'button', class:'opt', 'aria-pressed': String(isOn(f, val))}, val);
    b.addEventListener('click', function(){
      if (f.type === 'multi'){
        var a = (V[f.k]||[]).slice(), i = a.indexOf(val);
        if (i > -1) a.splice(i,1); else a.push(val);
        V[f.k] = a;
      } else {
        V[f.k] = (V[f.k] === val && !f.req) ? '' : val;
      }
      g.querySelectorAll('.opt').forEach(function(x){ x.setAttribute('aria-pressed', String(isOn(f, x.textContent))); });
      setErr(f.k, ''); save();
    });
    g.append(b);
  });
  return g;
}
function fieldEl(f){
  var label = f.q + (f.req ? ' *' : '');
  var hint = f.h ? h('span', {class:'hint'}, f.h) : null;
  var err = h('span', {class:'err', role:'alert', hidden:true});
  if (f.type === 'choice' || f.type === 'multi' || f.type === 'scale'){
    return h('fieldset', {class:'q', 'data-k':f.k}, h('legend', {class:'ql'}, label), optionsEl(f), hint, err);
  }
  if (f.type === 'check'){
    var cb = h('input', {type:'checkbox'}); cb.checked = V[f.k] === 'نعم';
    cb.addEventListener('change', function(){ V[f.k] = cb.checked ? 'نعم' : ''; setErr(f.k, ''); save(); });
    return h('div', {class:'q', 'data-k':f.k}, h('label', {class:'ck'}, cb, h('span', {}, label)), err);
  }
  var input;
  if (f.type === 'textarea') input = h('textarea', {rows:3});
  else if (f.type === 'date') input = h('input', {type:'date'});
  else if (f.type === 'number') input = h('input', {type:'text', inputmode:'decimal', autocomplete:'off'});
  else if (f.type === 'tel') input = h('input', {type:'tel', dir:'ltr', inputmode:'tel', autocomplete:'tel'});
  else input = h('input', {type:'text', autocomplete:'off'});
  input.value = V[f.k] != null ? V[f.k] : '';
  input.addEventListener('input', function(){
    V[f.k] = (f.type === 'number' || f.type === 'tel') ? norm(input.value).trim() : input.value.trim();
    setErr(f.k, ''); save();
  });
  return h('label', {class:'q', 'data-k':f.k}, h('span', {class:'ql'}, label), input, hint, err);
}

/* validation */
function problem(f){
  var v = V[f.k];
  if (f.req && !has(v)) return 'مطلوب';
  if (!has(v)) return '';
  if (f.type === 'number'){
    var n = Number(v);
    if (!/^\d+(\.\d+)?$/.test(v) || (f.min != null && n < f.min) || (f.max != null && n > f.max)) return 'اكتب رقم صحيح';
  }
  if (f.type === 'tel' && String(v).replace(/\D/g,'').length < 10) return 'اكتب رقم صحيح';
  return '';
}
function validateStep(){
  var first = null;
  S[step].f.forEach(function(f){
    var m = problem(f); setErr(f.k, m);
    if (m && !first) first = f.k;
  });
  if (first){
    var el = body.querySelector('[data-k="' + first + '"]');
    el.scrollIntoView({block:'center'});
    var i = el.querySelector('input,textarea,button'); if (i) i.focus();
    return false;
  }
  return true;
}
function missing(){
  var out = [];
  S.forEach(function(s){ s.f.forEach(function(f){ if (problem(f)) out.push(f.l); }); });
  return out;
}

/* PDF: built in the browser from the answers, then WhatsApp opens on the coach's number */
function fileName(){
  var n = String(V.name || 'عميل').replace(/[\\\/:*?"<>|\s]+/g, '-').replace(/^-+|-+$/g, '');
  return 'استمارة-' + (n || 'عميل') + '.pdf';
}
function buildPdfDom(){
  var root = h('div', {id:'pdfdoc'});
  var dateStr = new Date().toLocaleDateString('ar-EG-u-nu-latn', {year:'numeric', month:'long', day:'numeric'});
  root.append(h('div', {class:'phead'}, h('h1', {}, 'استمارة عميل'),
    h('p', {}, (V.name ? V.name + ' — ' : '') + dateStr),
    h('p', {dir:'ltr'}, 'C/ Khaled Ahmed')));
  S.forEach(function(s){
    var rows = s.f.filter(function(f){ return has(V[f.k]); });
    if (!rows.length) return;
    var sec = h('section', {class:'sec cut'}, h('h2', {}, s.t));
    rows.forEach(function(f, i){
      sec.append(h('div', {class:'row' + (i > 0 ? ' cut' : '')}, h('div', {class:'k'}, f.l), h('div', {class:'v'}, show(V[f.k]))));
    });
    root.append(sec);
  });
  return root;
}
function makePdf(){
  if (!window.html2canvas || !window.jspdf) return Promise.reject(new Error('libs'));
  var root = buildPdfDom();
  document.body.append(root);
  var ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
  return ready.then(function(){
    var W = root.offsetWidth, H = root.offsetHeight, top = root.getBoundingClientRect().top, cuts = [];
    root.querySelectorAll('.cut').forEach(function(el){ cuts.push(Math.round(el.getBoundingClientRect().top - top)); });
    var scale = Math.max(1, Math.min(2, 15e6 / (W * H)));
    return window.html2canvas(root, {scale:scale, backgroundColor:'#F3ECD6', useCORS:true, logging:false}).then(function(canvas){
      root.remove();
      var doc = new window.jspdf.jsPDF({unit:'mm', format:'a4', compress:true});
      var P0 = Math.floor(W * 289 / 210), P1 = Math.floor(W * 281 / 210);
      var sc = canvas.width / W, start = 0, idx = 0;
      while (start < H - 1){
        var limit = start + (idx === 0 ? P0 : P1), end;
        if (limit >= H) end = H;
        else {
          end = limit;
          for (var i = cuts.length - 1; i >= 0; i--){
            if (cuts[i] > start + 40 && cuts[i] <= limit){ end = cuts[i]; break; }
          }
        }
        var c2 = document.createElement('canvas');
        c2.width = canvas.width; c2.height = Math.max(1, Math.round((end - start) * sc));
        c2.getContext('2d').drawImage(canvas, 0, Math.round(start * sc), canvas.width, c2.height, 0, 0, canvas.width, c2.height);
        if (idx > 0) doc.addPage();
        doc.setFillColor(243, 236, 214); doc.rect(0, 0, 210, 297, 'F');
        doc.addImage(c2.toDataURL('image/jpeg', 0.92), 'JPEG', 0, idx === 0 ? 0 : 8, 210, (end - start) * 210 / W);
        start = end; idx++;
      }
      return doc.output('blob');
    });
  }).catch(function(e){ if (root.isConnected) root.remove(); throw e; });
}
function anchorSave(blob, name){
  var url = URL.createObjectURL(blob);
  var a = h('a', {href:url, download:name}); document.body.append(a); a.click(); a.remove();
  setTimeout(function(){ URL.revokeObjectURL(url); }, 20000);
}
function saveBlob(blob, name){
  var use = (window.claude && window.claude.use) ? window.claude.use('downloads') : Promise.resolve(null);
  return use.catch(function(){ return null; }).then(function(dl){
    if (!dl){ anchorSave(blob, name); return; }
    return dl.save({filename:name, data:blob}).catch(function(e){ if (!(e && e.code === 'declined')) anchorSave(blob, name); });
  });
}
function sharePdf(blob, name){
  var file = new File([blob], name, {type:'application/pdf'});
  if(navigator.canShare && navigator.canShare({files:[file]})){
    return navigator.share({
      files:[file],
      title:'استمارة عميل — ' + (V.name||''),
      text:'استمارة عميل جديد — ' + (V.name||'')
    }).then(function(){ return 'shared'; });
  }
  return Promise.resolve('no-share');
}

/* review + send */
function review(){
  body.append(h('p', {class:'lead'}, 'راجع إجاباتك. لو تمام، دوس «ابعت الاستمارة».'));
  S.forEach(function(s, i){
    var rows = s.f.filter(function(f){ return has(V[f.k]); });
    if (!rows.length) return;
    var dl = h('dl', {class:'qa'});
    rows.forEach(function(f){ dl.append(h('dt', {}, f.l), h('dd', {}, show(V[f.k]))); });
    body.append(h('section', {class:'rv'},
      h('div', {class:'rvh'}, h('h2', {}, s.t),
        h('button', {type:'button', class:'btn ghost small', on:{click:function(){ step = i; render(); }}}, 'تعديل')), dl));
  });
  var miss = missing();
  var send = h('div', {class:'send'});
  if (miss.length){
    send.append(h('div', {class:'note', role:'alert'}, 'لسه ناقص: ' + miss.join('، ') + '. دوس «تعديل» على القسم وكمّله.'));
  }
  var status = h('p', {class:'after', role:'status'});
  var after = h('div', {class:'send', hidden:true});
  var go = h('button', {type:'button', class:'btn big', 'aria-disabled': String(miss.length > 0)}, 'ابعت الاستمارة');
  go.addEventListener('click', function(){
    if (miss.length || go.getAttribute('aria-busy') === 'true') return;
    go.setAttribute('aria-busy', 'true'); go.setAttribute('aria-disabled', 'true');
    status.textContent = 'بنجهز ملف الـ PDF…'; after.hidden = true;
    var name = fileName();
    makePdf().then(function(blob){
      status.textContent = 'الملف جاهز! بنفتحلك المشاركة…';
      return sharePdf(blob, name).then(function(result){
        if(result === 'shared'){
          /* User shared successfully via native share sheet */
          status.textContent = '✅ تم إرسال الاستمارة بنجاح!';
          after.replaceChildren(
            h('div', {class:'sendnote'}, h('strong', {}, '✅ تم بنجاح!'),
              'الاستمارة اتبعتت. المدرب هيراجعها ويتواصل معاك قريب.'),
            h('button', {type:'button', class:'btn ghost', on:{click:function(){ anchorSave(blob, name); }}}, '⬇️ نزّل نسخة PDF على جهازك'));
          after.hidden = false;
          try{ localStorage.removeItem(DRAFT); }catch(e){}
        } else {
          /* Web Share API not supported (desktop) — download PDF + open WhatsApp */
          anchorSave(blob, name);
          status.textContent = '📄 الملف نزل على جهازك.';
          var waText = '📋 *استمارة عميل جديد*\n\n';
          waText += '👤 الاسم: ' + (V.name||'') + '\n';
          if(V.phone) waText += '📱 الموبايل: ' + V.phone + '\n';
          if(V.goal) waText += '🎯 الهدف: ' + V.goal + '\n';
          waText += '\n📎 *الملف اتحمّل عندي — هبعته دلوقتي*';
          var waLink = 'https://wa.me/' + COACH + '?text=' + encodeURIComponent(waText);
          after.replaceChildren(
            h('div', {class:'sendnote'}, h('strong', {}, '📄 الملف نزل على جهازك'),
              'دوس على الزرار تحت عشان تفتح واتساب المدرب، وبعدين ارفق الملف «' + name + '» من جهازك.'),
            h('a', {class:'btn big', href:waLink, target:'_blank', rel:'noopener noreferrer'}, '📲 افتح واتساب المدرب'),
            h('button', {type:'button', class:'btn ghost', on:{click:function(){ anchorSave(blob, name); }}}, '⬇️ نزّل الـ PDF تاني'));
          after.hidden = false;
        }
      });
    }).catch(function(err){
      console.error(err);
      /* If user cancelled the share or PDF generation failed */
      if(err && err.name === 'AbortError'){
        status.textContent = 'تم إلغاء المشاركة. تقدر تحاول تاني.';
      } else {
        status.textContent = 'حصلت مشكلة. جرّب تاني أو اتأكد من النت.';
      }
    }).then(function(){
      go.removeAttribute('aria-busy'); go.setAttribute('aria-disabled', String(miss.length > 0));
    });
  });
  send.append(go, status, after);
  body.append(send);
}

/* shell */
function render(){
  body.replaceChildren();
  var prog = document.getElementById('prog'); prog.replaceChildren();
  for (var i = 0; i < TOTAL; i++) prog.append(h('i', {class: i <= step ? 'on' : ''}));
  var title = step < S.length ? S[step].t : 'راجع وابعت';
  var sn = document.getElementById('stepname');
  sn.replaceChildren(title, h('small', {}, 'الخطوة ' + (step+1) + ' من ' + TOTAL));
  var prev = document.getElementById('prev'), next = document.getElementById('next');
  prev.hidden = step === 0;
  if (step < S.length){
    S[step].f.forEach(function(f){ body.append(fieldEl(f)); });
    next.hidden = false;
    next.textContent = step === S.length - 1 ? 'راجع وابعت' : 'التالي';
  } else {
    review();
    next.hidden = true;
  }
  save();
  window.scrollTo(0, 0);
}
document.getElementById('next').addEventListener('click', function(){
  if (step < S.length && !validateStep()) return;
  step++; render();
});
document.getElementById('prev').addEventListener('click', function(){ if (step > 0){ step--; render(); } });
render();
})();