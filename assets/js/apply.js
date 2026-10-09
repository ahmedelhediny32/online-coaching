var I18N = {
  ar:{eyebrow:'قبل ما تبدأ', title:'جهّز بياناتك، وابدأ رحلتك مع الكوتش',
    sub:'اختار من الاتنين تحت: سجّل بياناتك عشان نبني خطتك، أو راجع نصائح تحضير الإنبودي لو عندك موعد قياس قريب.',
    c1t:'تسجيل بياناتك', c1d:'استمارة كاملة عن هدفك، تمرينك، أكلك، وصحتك — بياخد منك حوالي 5 دقايق وبتراجع شخصيًا بمعرفة الكوتش.', c1g:'ابدأ الاستمارة ←',
    c2t:'نصائح ما قبل الإنبودي', c2d:'هتعمل قياس InBody؟ شوف التعليمات قبل الاختبار عشان القراءة تطلع مظبوطة ودقيقة.', c2g:'اعرض التعليمات ←',
    foot:'© 2026 Khaled Fit — Online Coaching'},
  en:{eyebrow:'BEFORE YOU START', title:'Set up your profile and start your journey',
    sub:'Choose one of the two options below: register your data so we can build your plan, or review the InBody prep guide if you have a scan coming up.',
    c1t:'Register Your Data', c1d:'A complete intake covering your goal, training, nutrition and health — takes about 5 minutes and is reviewed personally by your coach.', c1g:'Start the form →',
    c2t:'InBody Prep Tips', c2d:'Getting an InBody scan? Check the pre-test instructions so your reading comes out accurate.', c2g:'View instructions →',
    foot:'© 2026 Khaled Fit — Online Coaching'}
};
function setL(l){
  document.documentElement.lang = l;
  document.documentElement.dir = l==='ar'?'rtl':'ltr';
  document.querySelectorAll('.lang-pill button').forEach(function(b){ b.classList.toggle('on', b.dataset.l===l); });
  var t = I18N[l];
  document.getElementById('t-eyebrow').textContent = t.eyebrow;
  document.getElementById('t-title').textContent = t.title;
  document.getElementById('t-sub').textContent = t.sub;
  document.getElementById('t-card1-title').textContent = t.c1t;
  document.getElementById('t-card1-desc').textContent = t.c1d;
  document.getElementById('t-card1-go').textContent = t.c1g;
  document.getElementById('t-card2-title').textContent = t.c2t;
  document.getElementById('t-card2-desc').textContent = t.c2d;
  document.getElementById('t-card2-go').textContent = t.c2g;
  document.getElementById('t-foot').textContent = t.foot;
  try{ localStorage.setItem('oc_lang', l); }catch(e){}
}
(function(){
  var saved = 'ar';
  try{ saved = localStorage.getItem('oc_lang') || 'ar'; }catch(e){}
  setL(saved);
})();