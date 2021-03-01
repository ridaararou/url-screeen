//  Social Media Share Image Editor JS
//  01/11/2020
// ********************************** 

 

// image editor text/bg colors
$('[data-ie-edit="primaryColor"], [data-ie-edit="secondaryColor"]').spectrum({
  showAlpha: true,
  showButtons: false,
  showInput: true,
  showInitial: true,
  preferredFormat: 'rgb',
  showPalette: true,
  palette: [
    ['#ffffff', 'rgba(209, 19, 34, 0.7)', '#919295', '#666666'],
    ['#474c59', '#6C6256', '#ADA485', '#000000'],
    ['#EAE3D4', '#FF0000', '#fb3e5e', '#ab2328'],
    ['#f48024', '#FF5F00', '#61367a', '#552448'],
    ['#521F1E', '#769CCD', '#007cc2', '#4B7076'],
    ['#81D8D0', '#58c887', '#ABB400', '#BADA55']
  ],
  move: function (color) {
    if(this.getAttribute('data-ie-edit') == 'primaryColor')
      $(this).parents('.ssi-editor').first().find('.ssi-editor-body')[0].style.setProperty('--ie-primary-color', color.toRgbString());
    if(this.getAttribute('data-ie-edit') == 'secondaryColor')
      $(this).parents('.ssi-editor').first().find('.ssi-editor-body')[0].style.setProperty('--ie-secondary-color', color.toRgbString());
  }
});

// set default colors of primary and secondary colors
$('[data-ie-edit="primaryColor"]').spectrum('set', 'rgba(209, 19, 34, 0.7)');
$('[data-ie-edit="secondaryColor"]').spectrum('set', '#fff');

// change img editor font family
$('[data-ie-edit="fontFamily"]').change(function (el) {
  $(this).parents('.ssi-editor').first().find('.ssi-editor-body')[0].style.setProperty('--ie-font-family', this.value + ", Avenir Next, -apple-system, Segoe UI, Roboto, sans-serif");
});

// change title/subtitle text
$(document).on('click','[data-ie-edit="textContent"]', function (el) {
  var title = $(this).parents('.modal').first().find('[name="headline"]').val(),
  subtitle = $(this).parents('.modal').first().find('[name="subheadline"]').val();
  $('.modal.in .ssi-editor').find('[data-ie="title"]').text(title);
  $('.modal.in .ssi-editor').find('[data-ie="subtitle"]').text(subtitle);

  if(title.length < 1)
    $('.modal.in .ssi-editor').find('[data-ie="title"]').css('display', 'none');
  else
    $('.modal.in .ssi-editor').find('[data-ie="title"]').css('display', '');
  if(subtitle.length < 1)
    $('.modal.in .ssi-editor').find('[data-ie="subtitle"]').css('display', 'none');
  else
    $('.modal.in .ssi-editor').find('[data-ie="subtitle"]').css('display', '');
});

//-- make title/subtitle contenteditable
// $('.ssi-editor-edit .title, .ssi-editor-edit .subtitle').dblclick(function () {
//   $(this).attr('contenteditable',true);
// });

// set template text values in the edit inputs
$('#modalEditTextContent').on('show.bs.modal', function (e) {
  var clickedBtn = $(e.relatedTarget);
  var title = clickedBtn.parents('.ssi-editor-content').find('[data-ie="title"]').text();
  var subtitle = clickedBtn.parents('.ssi-editor-content').find('[data-ie="subtitle"]').text();
  $(this).find('[name="headline"]').val(title);
  $(this).find('[name="subheadline"]').val(subtitle);
});

// social share img editor modal
$('[data-ie-modal]').on('shown.bs.modal', function (e) {

  //-- create edit controls for elements
  // if the controls are already exist return
  if($(this).find('.ssi-editor-controls').length > 0)
    return;

  var thisModal = $(this);
  // create controls
  setTimeout(function () {
      
    thisModal.find('[data-ie-controls]').toArray().forEach(element => {
      var controlsData = JSON.parse($(element).attr('data-ie-controls'));
      var controlsDiv = `<div class="ssi-editor-controls ${controlsData.align ? controlsData.align: ''}" data-ie-target="[data-ie='${$(element).attr('data-ie')}']"><div class="btn-group" role="group" aria-label="Button group with nested dropdown">`;

      controlsData.controls.forEach((elm) => {
        if(elm.position) {
          controlsDiv += `<button type="button" class="btn btn-xs btn-default" data-hover="tooltip" title="Change Position" data-ie-edit-position="${elm.position? elm.position: 'middle'}"><svg viewBox="0 0 24 24" class="icon icon-sm"><use href="../../img/icons.svg#icon-border-${elm.position == 'middle'? 'horizontal' : elm.position}"></use></svg></button>`;              
        }
        if(elm.rotate != undefined) {
          controlsDiv += `<button type="button" class="btn btn-xs btn-default" data-hover="tooltip" title="Rotate" data-ie-edit-rotate="${elm.rotate ? elm.rotate : "0"}"><svg viewBox="0 0 24 24" class="icon icon-sm"><use href="../../img/icons.svg#icon-redo"></use></svg></button>`;              
        }
        switch (elm) {
          case 'm-gallery':
            controlsDiv += `<button type="button" class="btn btn-xs btn-default" data-hover="tooltip" title="Change Image" data-toggle="modal" data-target="#modalLibrary"><svg viewBox="0 0 24 24" class="icon icon-sm"><use href="../../img/icons.svg#icon-pencil"></use></svg></button>`;              
            break;

          // case 'hide':
          //   controlsDiv += `<button type="button" class="btn btn-xs btn-default" data-hover="tooltip" title="Hide &amp; Show Banner" data-ie-edit-show="true"><svg viewBox="0 0 24 24" class="icon icon-sm"><use href="../../img/icons.svg#icon-eye"></use></svg></button>`;              
          //   break;

          case 'm-text':
            controlsDiv += `<button type="button" class="btn btn-xs btn-default" data-hover="tooltip" title="Update Text" data-toggle="modal" data-target="#modalEditTextContent"><svg viewBox="0 0 24 24" class="icon icon-sm"><use href="../../img/icons.svg#icon-pencil"></use></svg></button>`;              
            break;
          
          default:
            break;
        }
      });

      controlsDiv += '</div></div>';
      if(controlsData.type == 'content')
        $(element).prepend(controlsDiv);
      else if(controlsData.type == 'img') {
        $(element).before(controlsDiv);
      }

      $('[data-hover]').tooltip({container: 'body',trigger: 'hover'});

    });
  }, 100);

});

// show hide element
$(document).on('click', '[data-ie-edit-show]', function () {
  var imgEditor = $(this).parents('.ssi-editor').first();
  var target = imgEditor.find($(this).parents('[data-ie-target]').first().attr('data-ie-target'));

  if($(this).attr('data-ie-edit-show') != 'false') {
    if(target.attr('data-ie') == "content")
      target.find('section').attr('hidden', true);
    else 
      target.attr('hidden', true);
    $(this).attr('data-ie-edit-show', 'false');
    $(this).find('svg use').attr('href', '../../img/icons.svg#icon-eye-off');
    $(this).siblings().attr('hidden', true);
  } 
  else {
    if(target.attr('data-ie') == "content")
      target.find('section').removeAttr('hidden');
    else 
      target.removeAttr('hidden');
    $(this).attr('data-ie-edit-show', 'true');
    $(this).find('svg use').attr('href', '../../img/icons.svg#icon-eye');
    $(this).siblings().removeAttr('hidden');
  }
});


// change position
$(document).on('click','[data-ie-edit-position]', function () {

  var imgEditor = $(this).parents('.ssi-editor').first(),
  elmTarget = imgEditor.find($(this).parents('[data-ie-target]').first().attr('data-ie-target')).first();

  var elControls = JSON.parse(elmTarget.attr('data-ie-controls'));
  var posEl;
  elControls.controls.forEach(el => { if(el.position) posEl = el; });
  
  if(elmTarget.attr('data-ie') == "content") {
    elmTarget[0].style.removeProperty('transform');
    switch (this.getAttribute('data-ie-edit-position')) {
      case 'top':
        $(this).attr('data-ie-edit-position', 'bottom').find('svg use').attr('href', '../../img/icons.svg#icon-border-bottom');
        elmTarget[0].style.setProperty('--ie-content-top','auto');
        elmTarget[0].style.setProperty('--ie-content-bottom', '15px');
        posEl.position = 'bottom';
        break;
      case 'bottom':
        $(this).attr('data-ie-edit-position', 'middle').find('svg use').attr('href', '../../img/icons.svg#icon-border-horizontal');
        elmTarget[0].style.setProperty('transform','translateY(-50%)');
        elmTarget[0].style.setProperty('--ie-content-top','50%');
        elmTarget[0].style.setProperty('--ie-content-bottom', 'auto');
        posEl.position = 'middle';
        break;
      case 'middle':
        $(this).attr('data-ie-edit-position', 'top').find('svg use').attr('href', '../../img/icons.svg#icon-border-top');
        elmTarget[0].style.setProperty('--ie-content-top','15px');
        elmTarget[0].style.setProperty('--ie-content-bottom', 'auto');
        posEl.position = 'top';
        break;
      default:
        break;
    }
    $('.tooltip.in').remove();
  }
  else if (elmTarget[0].tagName == "IMG") {
    elmTarget[0].style.removeProperty('object-fit');
    switch (this.getAttribute('data-ie-edit-position')) {
      case 'bottom':
        $(this).attr('data-ie-edit-position', 'middle').find('svg use').attr('href', '../../img/icons.svg#icon-border-horizontal');
        elmTarget[0].style.setProperty('--ie-bg-img-position','center');
        posEl.position = 'middle';
        break;
      case 'middle':
        $(this).attr('data-ie-edit-position', 'top').find('svg use').attr('href', '../../img/icons.svg#icon-border-top');
        elmTarget[0].style.setProperty('--ie-bg-img-position','left top');
        posEl.position = 'top';
        break;
      case 'top':
        $(this).attr('data-ie-edit-position', 'bottom').find('svg use').attr('href', '../../img/icons.svg#icon-border-bottom');
        elmTarget[0].style.setProperty('--ie-bg-img-position','right bottom');
        posEl.position = 'bottom';
        // $(this).attr('data-ie-edit-position', 'fill').find('svg use').attr('href', '../../img/icons.svg#icon-border-outer');
        // elmTarget[0].style.setProperty('object-fit','fill');
        break;
      // case 'fill':
      //   $(this).attr('data-ie-edit-position', 'bottom').find('svg use').attr('href', '../../img/icons.svg#icon-border-bottom');
      //   elmTarget[0].style.setProperty('--ie-bg-img-position','right bottom');
      //   break;  

      default:
        break;
    }
  }

  elmTarget.attr('data-ie-controls', JSON.stringify(elControls));

});

// on click on rotate button
$(document).on('click','[data-ie-edit-rotate]', function () {
  var angle = (parseInt(this.getAttribute('data-ie-edit-rotate')) + 90)%360;
  $(this).attr('data-ie-edit-rotate', angle);
  var elmTarget = $(this).parents('.ssi-editor').first().find($(this).parents('[data-ie-target]').attr('data-ie-target'));
  elmTarget.removeClass('rotate0 rotate90 rotate180 rotate270').addClass('rotate'+angle);

  var elControls = JSON.parse(elmTarget.attr('data-ie-controls'));
  elControls.controls.forEach(el => { if(el.rotate != undefined) el.rotate = angle; });
  elmTarget.attr('data-ie-controls', JSON.stringify(elControls));

});

// change fb/instagram editor type 
$(document).on('change', '[name="ie-height"]' , function () {
  if(this.value == 'instagram')
    $(this).parents('.ssi-editor').first().addClass('instagram');
  else
    $(this).parents('.ssi-editor').first().removeClass('instagram');

  setTimeout( () => {$('.modal:visible').each(centerModal);} ,502)
});


// get text content position style
function ssieTextPosition(position) {
  var ieContentStyle = '';
  switch (position) {
    case 'bottom':
      ieContentStyle = `style=" --ie-content-top: auto; --ie-content-bottom: 15px; "`;
      break;
    case 'middle':
      ieContentStyle = `style=" --ie-content-top: 50%; --ie-content-bottom: auto; transform: translateY(-50%); "`;
      break;
    case 'top':
      ieContentStyle = `style=" --ie-content-top: 15px; --ie-content-bottom: auto; "`;
      break;
  }
  return ieContentStyle;
}  

// get editor images positon
function ssieImgPosition(position) {
  return position.indexOf('top') !== -1 ? "top" : (position.indexOf('bottom') !== -1 ? "bottom" : "middle");
}

// get social editor tempalte html (use this to convert html to image to get the 2x size (wdith: 1200px))

function ssieTemplateProd(imgEditorSelector, type = 'facebook') {

  var newTemplate = $(imgEditorSelector).clone();
  newTemplate.find('.ssi-editor-controls').remove();

  //-- Facebook template
  var template2xHTML = '<div class="ssi-editor ssi-editor-prod">' + newTemplate.find('.ssi-editor-body')[0].outerHTML + '</div>';

  //-- Instagram template (just add instagram class next ssi-editor)
  if(type && type == 'instagram') {
    var template2xHTML = '<div class="ssi-editor ssi-editor-prod instagram">' + newTemplate.find('.ssi-editor-body')[0].outerHTML + '</div>';
  }

  return template2xHTML;
}


// generate social share image template
function ssieGenTemplateBody(data, templateNum = 1) {

  var template = null;
  var ieBodyStyle = `style=" --ie-primary-color: ${data.colors.primary? data.colors.primary : 'inherit'}; --ie-secondary-color: ${data.colors.secondary? data.colors.secondary : 'inherit'}; --ie-font-family: ${data.font? data.font : 'inherit'} "`;

  switch (templateNum) {

    case 0:
      template = `<div class="ssi-editor-body" ie-template-type="0" ${ieBodyStyle}> 
        <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[0].src : 'img/12.jpg'}" alt="social share image" class="ssi-editor-bg ${data.images && parseInt(data.images[0].rotation) > 0 ?'rotate'+data.images[0].rotation:''}" data-ie="img-1" style=" --ie-bg-img-position: ${data.images ? data.images[0].position : 'center'}" data-ie-controls='{"type":"img", "controls": ["m-gallery", {"rotate":"${data.images? data.images[0].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[0].position : 'middle')}"}]}'> </div>`;
      break;
    case 1: 
      template = `<div class="ssi-editor-body" ie-template-type="1" ${ieBodyStyle}> 
        <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[0].src : 'img/12.jpg'}" alt="social share image" class="ssi-editor-bg ${data.images && parseInt(data.images[0].rotation) > 0 ?'rotate'+data.images[0].rotation:''}" data-ie="img-1" style=" --ie-bg-img-position: ${data.images ? data.images[0].position : 'center'}" data-ie-controls='{"type":"img", "controls": ["m-gallery", {"rotate":"${data.images? data.images[0].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[0].position : 'middle')}"}]}'> 
        <div class="ssi-editor-content" ${ssieTextPosition(data.textPosition)} data-ie="content" 
        data-ie-controls='{"type":"content", "controls": ["m-text",{"position":"${data.textPosition ? data.textPosition : 'bottom'}"},"hide"]}'> 
        <section class="banner"> 
          <h3 data-ie="title" class="title">${data.title || data.title == '' ? data.title : 'Coming Soon in Granite Bay!'}</h3> 
          <p data-ie="subtitle" class="subtitle">${data.subtitle || data.subtitle  == '' ? data.subtitle : 'Click or Text 10002 to 256748 for Photos & Details!'}</p> 
        </section> </div> </div>`;
      break;

    case 2:
      template = `<div class="ssi-editor-body t2" ie-template-type="2" ${ieBodyStyle}> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[0].src : 'img/12.jpg'}" alt="social share image" class="ssi-editor-bg ${data.images && parseInt(data.images[0].rotation) > 0 ?'rotate'+data.images[0].rotation:''}" data-ie="img-1" style=" --ie-bg-img-position: ${data.images ? data.images[0].position : 'center'}" data-ie-controls='{"type":"img", "controls": ["m-gallery", {"rotate":"${data.images? data.images[0].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[0].position : ' middle')}"}]}'> <div class="ssi-editor-content" ${ssieTextPosition(data.textPosition)} data-ie="content" data-ie-controls='{"type":"content", "controls": ["m-text",{"position":"${data.textPosition ? data.textPosition : ' bottom'}"},"hide"], "align" :"center"}'> <section class="media"> <div class="media-left"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.agent.src? data.agent.src : 'img/agent-profile.jpg'}" class="img-circle img mr5 ${data.agent && parseInt(data.agent.rotation) > 0 ?'rotate'+data.agent.rotation:''}" style="max-width: 100px; --ie-bg-img-position: ${data.agent ? data.agent.position : 'center'}" alt="profile" width="70" height="70" data-ie="img-profile" data-ie-controls='{"type":"img", "controls": ["m-gallery",{"rotate":"${data.agent? data.agent.rotation : 0}"},{"position":"${ssieImgPosition(data.agent ? data.agent.position : ' middle')}"},"hide"]}'> </div> <div class="media-body align-middle"> <h3 class="title" data-ie="title">${data.title || data.title == '' ? data.title : 'Coming Soon in Granite Bay!'}</h3> <p class="subtitle" data-ie="subtitle">${data.subtitle || data.subtitle == '' ? data.subtitle : 'Click or Text 10002 to 256748 for Photos & Details!'}</p> </div> </section> </div> </div>`;
      break;

    case 3: 
      template = `<div class="ssi-editor-body t3" ie-template-type="3" ${ieBodyStyle}> <div class="ie-div mb5"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[2].src : 'img/3.jpg'}" alt="share image" class="img img-2 ${data.images && parseInt(data.images[2].rotation) > 0 ?'rotate'+data.images[2].rotation:''}" style=" --ie-bg-img-position: ${data.images ? data.images[2].position : 'center'}" data-ie="img-3" data-ie-controls='{"type":"img", "controls": ["m-gallery",{"rotate":"${data.images? data.images[2].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[2].position : ' middle')}"}]}'> </div> <div class="row row-xs"> <div class="col-xs-8"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[0].src : 'img/12.jpg'}" alt="social share image" class="ssi-editor-bg ${data.images && parseInt(data.images[0].rotation) > 0 ?'rotate'+data.images[0].rotation:''}" data-ie="img-1" style=" --ie-bg-img-position: ${data.images ? data.images[0].position : 'center'}" data-ie-controls='{"type":"img", "controls": ["m-gallery", {"rotate":"${data.images? data.images[0].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[0].position : ' middle')}"}]}'> </div> <div class="col-xs-4 pl0"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[1].src : 'img/2.jpg'}" alt="share image" class="ssi-editor-bg ssi-editor-2 ${data.images && parseInt(data.images[1].rotation) > 0 ?'rotate'+data.images[1].rotation:''}" style=" --ie-bg-img-position: ${data.images ? data.images[1].position : 'center'}" data-ie="img-2" data-ie-controls='{"type":"img", "controls": ["m-gallery",{"rotate":"${data.images? data.images[1].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[1].position : ' middle')}"}], "align" : "center" }'> </div> </div> <div class="ssi-editor-content" ${ssieTextPosition(data.textPosition)} data-ie="content" data-ie-controls='{"type":"content", "controls": ["m-text",{"position":"${data.textPosition ? data.textPosition : ' bottom'}"},"hide"], "align" :"center"}'> <section> <div class="media banner-alt"> <div class="media-left" style=" min-width: 50px; height: 62px; "> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.agent.src? data.agent.src : 'img/agent-profile.jpg'}" class="img-circle img ${data.agent && parseInt(data.agent.rotation) > 0 ?'rotate'+data.agent.rotation:''}" style=" max-width: 80px; --ie-bg-img-position: ${data.agent ? data.agent.position : 'center'}" alt="profile" width="64" height="64" data-ie="img-profile" data-ie-controls='{"type":"img", "controls": ["m-gallery",{"rotate":"${data.agent? data.agent.rotation : 0}"},{"position":"${ssieImgPosition(data.agent ? data.agent.position : ' middle')}"}]}'> </div> <div class="media-body align-middle"> <h3 class="title" data-ie="title">${data.title || data.title == '' ? data.title : 'Coming Soon in Granite Bay!'}</h3> <p class="subtitle" data-ie="subtitle">${data.subtitle || data.subtitle == '' ? data.subtitle : 'Click or Text 10002 to 256748 for Photos & Details!'}</p> </div> </div> </section> </div> </div>`;
      break;

    case 4:
      template = `<div class="ssi-editor-body t4" ie-template-type="4" ${ieBodyStyle}> <div class="row row-xs"> <div class="col-xs-8"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[0].src : 'img/12.jpg'}" alt="social share image" class="ssi-editor-bg ${data.images && parseInt(data.images[0].rotation) > 0 ?'rotate'+data.images[0].rotation:''}" data-ie="img-1" style=" --ie-bg-img-position: ${data.images ? data.images[0].position : 'center'}" data-ie-controls='{"type":"img", "controls": ["m-gallery", {"rotate":"${data.images? data.images[0].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[0].position : ' middle')}"}]}'> </div> <div class="col-xs-4 pl0"> <div class="ie-div"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[1].src : 'img/2.jpg'}" alt="share image" class="img img-1 ${data.images && parseInt(data.images[1].rotation) > 0 ?'rotate'+data.images[1].rotation:''}" style=" --ie-bg-img-position: ${data.images ? data.images[1].position : 'center'}" data-ie="img-2" data-ie-controls='{"type":"img", "controls": ["m-gallery",{"rotate":"${data.images? data.images[1].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[1].position : ' middle')}"}]}'> </div> <div class="ie-div mt5"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[2].src : 'img/2.jpg'}" alt="share image" class="img img-1 ${data.images && parseInt(data.images[2].rotation) > 0 ?'rotate'+data.images[2].rotation:''}" style=" --ie-bg-img-position: ${data.images ? data.images[2].position : 'center'}" data-ie="img-3" data-ie-controls='{"type":"img", "controls": ["m-gallery",{"rotate":"${data.images? data.images[2].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[2].position : ' middle')}"}]}'> </div> <div class="ie-div ie-insta mt5"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[3].src : 'img/4.jpg'}" alt="share image" class="img img-1 ${data.images && parseInt(data.images[3].rotation) > 0 ?'rotate'+data.images[3].rotation:''}" style=" --ie-bg-img-position: ${data.images ? data.images[3].position : 'center'}" data-ie="img-4" data-ie-controls='{"type":"img", "controls": ["m-gallery",{"rotate":"${data.images? data.images[3].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[3].position : ' middle')}"}]}'> </div> </div> </div> <div class="ssi-editor-content" ${ssieTextPosition(data.textPosition)} data-ie="content" data-ie-controls='{"type":"content", "controls": ["m-text","hide"]}'> <section> <div class="media banner-alt"> <div class="media-body align-middle"> <h3 class="title" data-ie="title">${data.title || data.title == '' ? data.title : 'Coming Soon in Granite Bay!'}</h3> <p class="subtitle" data-ie="subtitle">${data.subtitle || data.subtitle == '' ? data.subtitle : 'Click or Text 10002 to 256748 for Photos & Details!'}</p> </div> <div class="media-right align-middle"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.agent.src? data.agent.src : 'img/agent-profile.jpg'}" class="img ${data.agent && parseInt(data.agent.rotation) > 0 ?'rotate'+data.agent.rotation:''}" alt="profile" height="75" width="75" style="max-width: 75px; --ie-bg-img-position: ${data.agent ? data.agent.position : 'center'}" data-ie="img-profile" data-ie-controls='{"type":"img", "controls": ["m-gallery",{"rotate":"${data.agent? data.agent.rotation : 0}"},{"position":"${ssieImgPosition(data.agent ? data.agent.position : ' middle')}"}],"align": "right" }'> </div> </div> </section> </div> </div>`;
      break;

    case 5:
      template = `<div class="ssi-editor-body t5" ie-template-type="5" ${ieBodyStyle}> <div class="row row-xs"> <div class="col-xs-8"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[0].src : 'img/12.jpg'}" alt="social share image" class="ssi-editor-bg ${data.images && parseInt(data.images[0].rotation) > 0 ?'rotate'+data.images[0].rotation:''}" data-ie="img-1" style=" --ie-bg-img-position: ${data.images ? data.images[0].position : 'center'}" data-ie-controls='{"type":"img", "controls": ["m-gallery", {"rotate":"${data.images? data.images[0].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[0].position : ' middle')}"}]}'> </div> <div class="col-xs-4 pl0"> <div class="ie-div"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[1].src : 'img/2.jpg'}" alt="share image" class="img img-1 ${data.images && parseInt(data.images[1].rotation) > 0 ?'rotate'+data.images[1].rotation:''}" style=" --ie-bg-img-position: ${data.images ? data.images[1].position : 'center'}" data-ie="img-2" data-ie-controls='{"type":"img", "controls": ["m-gallery",{"rotate":"${data.images? data.images[1].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[1].position : ' middle')}"}]}'> </div> <div class="ie-div ie-insta mt5"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[3].src : 'img/4.jpg'}" alt="share image" class="img img-1 ${data.images && parseInt(data.images[3].rotation) > 0 ?'rotate'+data.images[3].rotation:''}" style=" --ie-bg-img-position: ${data.images ? data.images[3].position : 'center'}" data-ie="img-4" data-ie-controls='{"type":"img", "controls": ["m-gallery",{"rotate":"${data.images? data.images[3].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[3].position : ' middle')}"}]}'> </div> <div class="ie-div mt5"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[2].src : 'img/3.jpg'}" alt="share image" class="img img-1 ${data.images && parseInt(data.images[2].rotation) > 0 ?'rotate'+data.images[2].rotation:''}" style=" --ie-bg-img-position: ${data.images ? data.images[2].position : 'center'}" data-ie="img-3" data-ie-controls='{"type":"img", "controls": ["m-gallery",{"rotate":"${data.images? data.images[2].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[2].position : ' middle')}"}]}'> <div class="fixed-middle-text"><span>${data.moreImgNb? '+'+data.moreImgNb: '+39'}</span></div> </div> </div> </div> <div class="ssi-editor-content" ${ssieTextPosition(data.textPosition)} data-ie="content" data-ie-controls='{"type":"content", "controls": ["m-text",{"position":"${data.textPosition ? data.textPosition : ' bottom'}"},"hide"]}'> <section> <h3 class="title" data-ie="title" ${data.title?'':'style="display: none;"'}>${data.title || data.title == '' ? data.title : ' Coming Soon in Granite Bay!'}</h3> <br> <p class="subtitle" data-ie="subtitle" ${data.subtitle?'':'style="display: none;"'}>${data.subtitle || data.subtitle  == '' ? data.subtitle : ' Click or Text 10002 to 256748 for Photos & Details!'}</p> </section> </div> </div>`;
      break;

    case 6:
      template = `<div class="ssi-editor-body t6" ie-template-type="6" ${ieBodyStyle}> <div class="row row-xs"> <div class="col-xs-7"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[0].src : 'img/12.jpg'}" alt="social share image" class="ssi-editor-bg ${data.images && parseInt(data.images[0].rotation) > 0 ?'rotate'+data.images[0].rotation:''}" data-ie="img-1" style=" --ie-bg-img-position: ${data.images ? data.images[0].position : 'center'}" data-ie-controls='{"type":"img", "controls": ["m-gallery", {"rotate":"${data.images? data.images[0].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[0].position : ' middle')}"}]}'> </div> <div class="col-xs-5 pl0"> <div class="ie-div"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[1].src : 'img/2.jpg'}" alt="share image" class="img img-1 ${data.images && parseInt(data.images[1].rotation) > 0 ?'rotate'+data.images[1].rotation:''}" style=" --ie-bg-img-position: ${data.images ? data.images[1].position : 'center'}" data-ie="img-2" data-ie-controls='{"type":"img", "controls": ["m-gallery",{"rotate":"${data.images? data.images[1].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[1].position : ' middle')}"}]}'> </div> <div class="row row-xs"> <div class="col-xs-6"> <div class="ie-div mt5"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'"  src="${data.images ? data.images[2].src : 'img/3.jpg'}" alt="share image" class="img img-1 ${data.images && parseInt(data.images[2].rotation) > 0 ?'rotate'+data.images[2].rotation:''}" style=" --ie-bg-img-position: ${data.images ? data.images[2].position : 'center'}" data-ie="img-3" data-ie-controls='{"type":"img", "controls": ["m-gallery",{"rotate":"${data.images? data.images[2].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[2].position : ' middle')}"}]}'> </div> </div> <div class="col-xs-6 pl0"> <div class="ie-div mt5"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[3].src : 'img/4.jpg'}" alt="share image" class="img img-1 ${data.images && parseInt(data.images[3].rotation) > 0 ?'rotate'+data.images[3].rotation:''}" style=" --ie-bg-img-position: ${data.images ? data.images[3].position : 'center'}" data-ie="img-4" data-ie-controls='{"type":"img", "controls": ["m-gallery",{"rotate":"${data.images? data.images[3].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[3].position : ' middle')}"}]}'> <div class="fixed-middle-text"><span>${data.moreImgNb? '+'+data.moreImgNb: '+24'}</span></div> </div> </div> </div> </div> </div> <div class="ssi-editor-content" ${ssieTextPosition(data.textPosition)} data-ie="content" data-ie-controls='{"type":"content", "controls": ["m-text",{"position":"${data.textPosition ? data.textPosition : ' top'}"},"hide"], "align" :"bottom"}'> <section> <h3 class="title" data-ie="title" ${data.title?'':'style="display: none;"'}>${data.title || data.title == '' ? data.title : ' Coming Soon in Granite Bay!'}</h3> <br> <p class="subtitle" data-ie="subtitle" ${data.subtitle ? '' :'style="display: none;"'}>${data.subtitle ? data.subtitle : ''}</p> </section> </div> </div>`;

      break;
      case 7:
        template = `<div class="ssi-editor-body t7" ie-template-type="7" ${ieBodyStyle}> <div class="ie-div-bg"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[0].src : 'img/12.jpg'}" alt="social share image" class="ssi-editor-bg ${data.images && parseInt(data.images[0].rotation) > 0 ?'rotate'+data.images[0].rotation:''}" data-ie="img-1" style=" --ie-bg-img-position: ${data.images ? data.images[0].position : 'center'}" data-ie-controls='{"type":"img", "controls": ["m-gallery", {"rotate":"${data.images? data.images[0].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[0].position : ' middle')}"}]}'> </div> <div class="row row-xs"> <div class="col-xs-4"> <div class="ie-div mt5"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[1].src : 'img/2.jpg'}" alt="share image" class="img img-1 ${data.images && parseInt(data.images[1].rotation) > 0 ?'rotate'+data.images[1].rotation:''}" style=" --ie-bg-img-position: ${data.images ? data.images[1].position : 'center'}" data-ie="img-2" data-ie-controls='{"type":"img", "controls": ["m-gallery",{"rotate":"${data.images? data.images[1].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[1].position : ' middle')}"}]}'> </div> </div> <div class="col-xs-4 pl0"> <div class="ie-div mt5"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[2].src : 'img/3.jpg'}" alt="share image" class="img img-1 ${data.images && parseInt(data.images[2].rotation) > 0 ?'rotate'+data.images[2].rotation:''}" style=" --ie-bg-img-position: ${data.images ? data.images[2].position : 'center'}" data-ie="img-3" data-ie-controls='{"type":"img", "controls": ["m-gallery",{"rotate":"${data.images? data.images[2].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[2].position : ' middle')}"}]}'> </div> </div> <div class="col-xs-4 pl0"> <div class="ie-div mt5"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="${data.images ? data.images[3].src : 'img/4.jpg'}" alt="share image" class="img img-1 ${data.images && parseInt(data.images[3].rotation) > 0 ?'rotate'+data.images[3].rotation:''}" style=" --ie-bg-img-position: ${data.images ? data.images[3].position : 'center'}" data-ie="img-4" data-ie-controls='{"type":"img", "controls": ["m-gallery",{"rotate":"${data.images? data.images[3].rotation : 0}"},{"position":"${ssieImgPosition(data.images ? data.images[3].position : ' middle')}"}]}'> <div class="fixed-middle-text"><span>${data.moreImgNb? '+'+data.moreImgNb: '+38'}</span></div> </div> </div> </div> <div class="ssi-editor-content" ${ssieTextPosition((data.textPosition=='bottom'?"top":data.textPosition))} data-ie="content" data-ie-controls='{"type":"content", "controls": ["m-text",{"position":"${data.textPosition ? (data.textPosition=='bottom'?"top":data.textPosition) : 'top'}"},"hide"], "align" :"right"}'> <section> <h3 class="title" data-ie="title" ${data.title?'':'style="display: none;"'}>${data.title || data.title == '' ? data.title : ' Coming Soon in Granite Bay!'}</h3> <br> <p class="subtitle" data-ie="subtitle" ${data.subtitle ? '' :'style="display: none;"'}>${data.subtitle ? data.subtitle : ''}</p> </section> </div> </div>`;
        
      break;
  }

  if(!template)
    template = `<div class="ssi-editor-body"> <img onerror="this.onerror=null; this.src = 'img/no-image-available.jpg'" src="img/1.jpg" alt="share image" class="ssi-editor-bg" data-ie="img-1" data-ie-controls='{"type":"img", "controls": ["m-gallery", {"rotate":"0"},{"position":"middle"}]}'> <div class="ssi-editor-content" data-ie="content" data-ie-controls='{"type":"content", "controls": ["m-text",{"position":"bottom"},"hide"]}'> <section class="banner"> <h3 data-ie="title" class="title">Coming Soon in Granite Bay!</h3> <p data-ie="subtitle" class="subtitle">Click or Text 10002 to 256748 for Photos & Details!</p> </section> </div> </div>`;

  return template;
  
}

// generate png image from data
function generateImageDynamic(data, templateNb = 1, type = 'facebook') {

  var temBody = ssieGenTemplateBody(data, parseInt(templateNb) || data.template || 1);
  // console.log('temBody!', temBody);

  var prod = `<div class="ssi-editor ssi-editor-prod ${(type && type == 'instagram') ? 'instagram': ''}"> ${temBody} </div>`;
  // console.log('node!', prod);

  var node = document.createElement('div');
  node.innerHTML = prod;
  // specific style for each type
  var spStyle = (type === 'facebook' ? 'height: 628px; margin-top: 157px' : 'height:1200px; margin-top: 300px;');
  node.setAttribute('style', spStyle +'; width: 1200px; display: block; position: relative;');
  
  return node;

  // console.log('NODE:', node)
  // document.body.appendChild(node);

  // domtoimage.toPng(node)
  // .then(function (dataUrl) {
  //   // remove node
  //   document.body.removeChild(node);

  //   // create image
  //   var img = new Image();
  //   img.src = dataUrl;
  //   document.body.appendChild(img);

  //   // create blob url
  //   try {
  //     var arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  //     while(n--) {  u8arr[n] = bstr.charCodeAt(n);  }
  //     var blobUrl = new Blob([u8arr], {type:mime});
  //     blobUrl = URL.createObjectURL(blobUrl);
  //     console.log('imgURL::', blobUrl);
  //   } catch (error) { }

  //   return dataUrl;
  // })
  // .catch(function (error) {
  //   document.body.removeChild(node);
  //     console.error('oops, something went wrong!', error);
  // });
  
}

// get template data from editor
function ssieGetTemplateData(imgEditor) {
  var templateData = {
    template: parseInt(imgEditor.find('[ie-template-type]').attr('ie-template-type')) || 0, 
    colors: {primary: imgEditor.find('[data-ie-edit="primaryColor"]').spectrum('get').toRgbString() || '#111',
            secondary: imgEditor.find('[data-ie-edit="secondaryColor"]').spectrum('get').toRgbString() || '#fff'},
    font: imgEditor.find('[data-ie-edit="fontFamily"]').val() || "Avenir " + ", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Open Sans', 'Helvetica Neue', sans-serif",
    title: imgEditor.find('[data-ie="title"]').text() || '',
    subtitle: imgEditor.find('[data-ie="subtitle"]').text() || '',
    textPosition: 'bottom'
  };

  // text position
  var controls = JSON.parse(imgEditor.find('[data-ie="content"]').attr('data-ie-controls')).controls;
  controls.forEach(el => {
    if(el.position) {
      templateData.textPosition = el.position || 'bottom';
    }
  });

  // images
  var tImages = imgEditor.find('[data-ie*="img-"]:not([data-ie="img-profile"])');
  templateData.images = [];
  tImages.toArray().forEach(img => {
    var controls = JSON.parse($(img).attr('data-ie-controls')).controls;
    var rotate = 0, position = 'center';

    controls.forEach(el => {
      if(el.rotate != undefined)
        rotate = el.rotate;
      if(el.position) {
        position = el.position;
        position = position == 'top'? position = 'left top' : (position == 'bottom'? position = 'right bottom' : position =  'center');
      }
    });

    switch ($(img).attr('data-ie')) {
      case 'img-1':
        templateData.images.unshift({src:img.src || '', position: position, rotation: rotate});
        break;
      case 'img-2':
        templateData.images.splice(1, 0 , {src:img.src || '', position: position, rotation: rotate});
        break;
      case 'img-3':
        templateData.images.splice(2, 0 , {src:img.src || '', position: position, rotation: rotate});
        break;
      case 'img-4':
        templateData.images.splice(3, 0 , {src:img.src || '', position: position, rotation: rotate});
        break;
      default:
        templateData.images.push({src:img.src || '', position: position, rotation: rotate});
        break;
    }
    
  });

  // profile picture
  if(imgEditor.find('[data-ie="img-profile"]').length > 0) {
    var controls = JSON.parse(imgEditor.find('[data-ie="img-profile"]').attr('data-ie-controls')).controls;
    var rotate = 0, position = 'center';
    controls.forEach(el => {
      if(el.rotate != undefined)
        rotate = el.rotate;
      if(el.position) {
        position = el.position;
        position = position == 'top'? position = 'left top' : (position == 'bottom'? position = 'right bottom' : position =  'center');
      }
    })
    templateData.agent = {src: imgEditor.find('[data-ie="img-profile"]')[0].src || '', position: position, rotation: rotate}
  }

  return templateData;
  
}