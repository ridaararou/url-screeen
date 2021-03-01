"use strict";

// AdBlock Detector
// We use this function on Ads In order to detect if the user Has AdBlock Active.
function adsBlocked(callback) {
  var testURL = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  var myInit = {
    method: 'HEAD',
    mode: 'no-cors'
  };
  var myRequest = new Request(testURL, myInit);
  fetch(myRequest).then(function (response) {
    return response;
  }).then(function (response) {
    console.log('Ads are not blocked: ' + response);
    callback(false);
  }).catch(function (e) {
    console.log('Ads are blocked: ' + e);
    callback(true);
  });
}

;
"use strict";

/*
This script controls the affix position of the nav-pills to the top when using medium to small screens
To use it just change the parameters inside the function
*/
function affixFunc(el, top) {
  if ($(window).width() > 767) {
    var elClass = el.hasClass('nav'),
        elementOffset = top.offset().top;
    el.affix({
      offset: {
        top: function top() {
          return this.top = elementOffset;
        },
        bottom: function bottom() {
          var bottomHeight;

          if (elClass) {
            bottomHeight = $('footer').outerHeight(true) + 48;
          } else {
            bottomHeight = $('footer').outerHeight(true) + 134;
          }

          return this.bottom = bottomHeight;
        }
      }
    });
  }
}
"use strict";

/*
This script has 2 functions which allows us to play/pause audios and videos in the background
function audioPlay is a function that play/pauses the audio in the background
*/
// audioPlay 
// A function that play/pauses audio in the background
// Using data-play tag
function audioPlay(dataPlay) {
  // Get the audio URL and play it
  var url = $(dataPlay).attr('data-play');
  var hasAudio = $(dataPlay).hasClass('hasAudio');

  if (hasAudio) {
    // if this button already has audio
    var audioID = $(dataPlay).find('audio').attr('id');
    var x = document.getElementById(audioID);

    if (x.paused) {
      // paused all videos or audios
      pauseAllVideosOrAudios(); // if audio is paused play it

      x.play();
      $(dataPlay).find('svg use').attr('href', $(dataPlay).find('svg use').attr('href').replace('play-circle', 'pause-circle'));
      $(dataPlay).addClass('isPlaying');
    } else {
      x.pause();
      $(dataPlay).find('svg use').attr('href', $(dataPlay).find('svg use').attr('href').replace('pause-circle', 'play-circle'));
      $(dataPlay).removeClass('isPlaying');
    }
  } else {
    // paused all videos or audios
    pauseAllVideosOrAudios(); // if the audio tag doesn't exist, 
    // Create it and give it a unique id
    // I'll use Date.now() for the id

    $(dataPlay).append('<audio id="' + Date.now() + '" src="' + url + '"></audio>');
    var audioID = $(dataPlay).find('audio').attr('id');
    var x = document.getElementById(audioID);
    x.play();
    $(dataPlay).addClass('hasAudio');
    $(dataPlay).find('svg use').attr('href', $(dataPlay).find('svg use').attr('href').replace('play-circle', 'pause-circle'));
    $(dataPlay).addClass('isPlaying');
  }

  ;

  if ($('audio').length) {
    // check if there's another audio playing in the background
    $('audio').each(function () {
      var a = document.getElementById($(this).attr('id'));
      if (!a) return;

      if (!a.paused && $(this).attr('id') != audioID) {
        // Pause audio if it's playing
        a.pause();
        $(this).parent().find('svg use').attr('href', $(this).parent().find('svg use').attr('href').replace('pause-circle', 'play-circle'));
        $(this).parent().removeClass('isPlaying');
      }
    });
  }

  ;
}

; // initialize audioPlay

$(document).on('click', '[data-play]', function (e) {
  e.preventDefault();
  audioPlay(this);
}); // Pause music when modal is shown

$('#modalViewTrack').on('shown.bs.modal', function () {
  if ($(".isPlaying")[0]) {
    $('.isPlaying').trigger('click');
  }

  ;
}); // pause track when modal is closed

$('#modalViewTrack').on('hidden.bs.modal', function () {
  $('#modalViewTrack audio')[0].pause();
  $('#modalViewTrack audio')[0].currentTime = 0;
});

function pauseAllVideosOrAudios() {
  if ($('video, audio').length > 0) {
    $('video, audio').toArray().forEach(function (elm) {
      if (!$(elm)[0].paused) {
        var iconSvg = $(elm).parents('[data-select-item]').find('[data-play-vid] svg use, [data-play] svg use').first();
        console.log('ELEMNT::', $(elm), iconSvg);
        $(elm)[0].pause();
        iconSvg.attr('href', iconSvg.attr('href').replace('pause-circle', 'play-circle')); // $(this).removeClass('isPlaying');
      }
    });
  }
} // play video 


$('[data-play-vid]').click(function () {
  var targetVid = $($(this).attr('data-play-vid'))[0];

  if (targetVid) {
    if (targetVid.paused) {
      // paused all videos or audios
      pauseAllVideosOrAudios(); // if video is paused play it

      targetVid.play();
      $(this).find('svg use').attr('href', $(this).find('svg use').attr('href').replace('play-circle', 'pause-circle'));
      $(this).addClass('isPlaying');
    } else {
      targetVid.pause();
      $(this).find('svg use').attr('href', $(this).find('svg use').attr('href').replace('pause-circle', 'play-circle'));
      $(this).removeClass('isPlaying');
    }
  }
});
"use strict";

/*
This script calculate the textarea height so it expands automatically
To use it just add data-expand="true"
*/
var autoExpand = function autoExpand(field) {
  field.style.height = 'inherit';
  var computed = window.getComputedStyle(field);
  var height = parseInt(computed.getPropertyValue('border-top-width'), 10) + parseInt(computed.getPropertyValue('padding-top'), 10) + field.scrollHeight + parseInt(computed.getPropertyValue('padding-bottom'), 10) + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
  field.style.height = height + 'px';
};

$('[data-expand="true"]').on('change keydown paste input', function () {
  autoExpand(this);
});
"use strict";

/*
This script centers the modal when modal:visible
To use just use .modal class
*/
function centerModal() {
  $(this).css('display', 'block');
  var $dialog = $(this).find(".modal-dialog"),
      offset = ($(window).height() - $dialog.height()) / 2,
      bottomMargin = parseInt($dialog.css('marginBottom'), 10); // Make sure you don't hide the top part of the modal w/ a negative margin if it's longer than the screen height, and keep the margin equal to the bottom margin of the modal

  if (offset < bottomMargin) offset = bottomMargin;
  $dialog.css("margin-top", offset);
}

(function ($) {
  $(document).on('show.bs.modal', '.modal', centerModal);
  $(window).on("resize", function () {
    $('.modal:visible').each(centerModal);
  });
})(jQuery);
"use strict";

/*
This script sets the character count limit for an input
To use it just change the parameters inside the function, the last parameter should be the maximum characters you want 
*/
function charLimit(input, output, textMax) {
  $(output).html('0 / ' + textMax);
  var textLength = $(input).val().length;
  $(output).html(textLength + ' / ' + textMax);

  if (textLength >= textMax - 5) {
    $(output).addClass("text-danger");
  } else {
    $(output).removeClass("text-danger");
  }
}
"use strict";

/**
 * Element.requestFullScreen() polyfill
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!Element.prototype.requestFullscreen) {
  Element.prototype.requestFullscreen = Element.prototype.mozRequestFullscreen || Element.prototype.webkitRequestFullscreen || Element.prototype.msRequestFullscreen;
}
/**
 * document.exitFullScreen() polyfill
 * @author Chris Ferdinandi
 * @license MIT
 */


if (!document.exitFullscreen) {
  document.exitFullscreen = document.mozExitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
}
/**
 * document.fullscreenElement polyfill
 * Adapted from https://shaka-player-demo.appspot.com/docs/api/lib_polyfill_fullscreen.js.html
 * @author Chris Ferdinandi
 * @license MIT
 */


if (!document.fullscreenElement) {
  Object.defineProperty(document, 'fullscreenElement', {
    get: function get() {
      return document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement;
    }
  });
  Object.defineProperty(document, 'fullscreenEnabled', {
    get: function get() {
      return document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitFullscreenEnabled;
    }
  });
} // on click on the fullscreen button


document.addEventListener('click', function (e) {
  // Ignore clicks that weren't on the toggle button
  if (!e.target.hasAttribute('data-toggle-fs')) return; // If there's an element in fullscreen, exit
  // Otherwise, enter it

  var elm = e.target.getAttribute('data-toggle-fs') ? document.getElementById(e.target.getAttribute('data-toggle-fs')) : document.documentElement;

  if (document.fullscreenElement) {
    document.exitFullscreen();
    elm.classList.remove('fs-section');
    e.target.classList.remove('fs-active');
    e.target.setAttribute('data-original-title', 'Maximize'); // maximize

    e.target.querySelector('svg use').setAttribute('href', 'img/icons.svg#icon-arrows-maximize');
  } else {
    elm.requestFullscreen();
    elm.classList.add('fs-section');
    e.target.classList.add('fs-active');
    e.target.setAttribute('data-original-title', 'Minimize'); // minimize

    e.target.querySelector('svg use').setAttribute('href', 'img/icons.svg#icon-arrows-minimize');
  }
}, false);
"use strict";

/* 
This script takes the input text and replaces with in a specific target, used in mainly .panel-post
To use it add :
- data-text="name" to the textarea or the input you want to type inside of it
- data-text-target="name" to the element you want to edit the text when it's typed
*/
$(document).on('input', '[data-text]', function (e) {
  var content = $(this).val().trim().replace(/\n\n/g, "</p><p>");
  var target = $(this).attr("data-text");
  content = content.replace(/\n/g, "<br>");

  if (e.target == "HtmlTextareaElement") {
    content = '<p>' + content + '</p>';
  }

  ;
  $('[data-text-target="' + target + '"]').html(content);
});
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// =============== Library Cropper ===============
function setCropper(elm, imgPreview, imageName) {
  var Cropper = window.Cropper;
  var URL = window.URL || window.webkitURL;
  var container = document.querySelector(elm);
  var image = container.getElementsByTagName('img').item(0); // var download = document.getElementById('downlodID');

  var options = {
    viewMode: 1,
    // aspectRatio: 16 / 9,
    preview: imgPreview,
    ready: function ready(e) {},
    cropstart: function cropstart(e) {},
    cropmove: function cropmove(e) {},
    cropend: function cropend(e) {},
    crop: function crop(e) {
      var data = e.detail;
    },
    zoom: function zoom(e) {}
  };
  var cropper = new Cropper(image, options);
  var originalImageURL = image.src;
  var uploadedImageType = 'image/png';
  var uploadedImageName = imageName;
  var uploadedImageURL; // Tooltip

  $('[data-toggle="tooltip"]').tooltip(); // Buttons

  if (!document.createElement('canvas').getContext) {
    $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
  }

  if (typeof document.createElement('cropper').style.transition === 'undefined') {
    $('button[data-method="rotate"]').prop('disabled', true);
    $('button[data-method="scale"]').prop('disabled', true);
  } // Download
  // if (typeof download.download === 'undefined') {
  //   download.className += ' disabled';
  //   download.title = 'Your browser does not support download';
  // }
  // Options


  document.querySelector('[data-name="cropperOptions"]').onchange = function (event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var cropBoxData;
    var canvasData;
    var isCheckbox;
    var isRadio;
    console.log('targ', target);

    if (!cropper) {
      return;
    }

    if (target.tagName.toLowerCase() === 'label') {
      target = target.querySelector('input');
    }

    isCheckbox = target.type === 'checkbox';
    isRadio = target.type === 'radio';
    var isSelect = target.type === 'select-one';

    if (isSelect) {
      options[target.name] = target.value;

      options.ready = function () {
        console.log('ready', options[target.name]);
      }; // Restart


      cropper.destroy();
      cropper = new Cropper(image, options);
    } else if (isCheckbox || isRadio) {
      if (isCheckbox) {
        options[target.name] = target.checked;
        cropBoxData = cropper.getCropBoxData();
        canvasData = cropper.getCanvasData();

        options.ready = function () {
          console.log('ready');
          cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
        };
      } else {
        options[target.name] = target.value;

        options.ready = function () {
          console.log('ready', options[target.name]);
        };
      } // Restart


      cropper.destroy();
      cropper = new Cropper(image, options);
    }
  }; // Methods


  $(document).on('click', '[data-method]', function (event) {
    var target = this;
    var cropped;
    var result;
    var input;
    var data;

    if (!cropper) {
      return;
    }

    if (target.disabled || target.className.indexOf('disabled') > -1) {
      return;
    }

    data = {
      method: target.getAttribute('data-method'),
      target: target.getAttribute('data-target'),
      option: target.getAttribute('data-option') || undefined,
      secondOption: target.getAttribute('data-second-option') || undefined
    };
    cropped = cropper.cropped;

    if (data.method) {
      if (typeof data.target !== 'undefined') {
        input = document.querySelector(data.target);

        if (!target.hasAttribute('data-option') && data.target && input) {
          try {
            data.option = JSON.parse(input.value);
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            cropper.clear();
          }

          break;

        case 'getCroppedCanvas':
          try {
            data.option = JSON.parse(data.option);
          } catch (e) {
            console.log(e.message);
          }

          if (uploadedImageType === 'image/png') {
            if (!data.option) {
              data.option = {};
            } // data.option.fillColor = '#fff';

          }

          console.log(data.option);
          break;
      }

      if (data.method != 'cropImage') result = cropper[data.method](data.option, data.secondOption);

      switch (data.method) {
        case 'rotate':
          if (cropped && options.viewMode > 0) {
            cropper.crop();
          }

          break;

        case 'scaleX':
        case 'scaleY':
          target.setAttribute('data-option', -data.option);
          break;

        case 'getCroppedCanvas':
          console.log('result::', result);

          if (result) {
            var link = document.createElement("a");
            link.download = uploadedImageName;
            link.href = result.toDataURL(uploadedImageType);
            link.click();
            console.dir('link', link);
          }

          break;

        case 'cropImage':
          // image.src = uploadedImageURL = URL.createObjectURL(file);
          // console.log(URL.createObjectURL(cropper.getCroppedCanvas().toDataURL()));
          var srcImg = cropper.getCroppedCanvas().toDataURL();

          try {
            fetch(srcImg).then(function (response) {
              return response.blob();
            }).then(function (blob) {
              srcImg = window.URL.createObjectURL(blob, {
                type: 'image/png'
              });
              console.log(srcImg);
              image.src = srcImg;
              cropper.destroy();
              cropper = new Cropper(image, options);
              setTimeout(function () {
                cropper.clear();
              }, 250);
            });
          } catch (error) {
            console.error('blob error');
            image.src = cropper.getCroppedCanvas().toDataURL();
            cropper.destroy();
            cropper = new Cropper(image, options);
          } // $(image).removeClass('cropper-hidden').siblings('.cropper-container').addClass('cropper-hidden');


          break;

        case 'reset':
          image.src = originalImageURL;
          cropper.destroy();
          cropper = new Cropper(image, options);
          break;

        case 'destroy':
          cropper = null;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
            uploadedImageURL = '';
            image.src = originalImageURL;
          }

          break;
      }

      if (_typeof(result) === 'object' && result !== cropper && input) {
        try {
          input.value = JSON.stringify(result);
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  });

  document.body.onkeydown = function (event) {
    console.log('key');
    var e = event || window.event;

    if (e.target !== this || !cropper || this.scrollTop > 300) {
      return;
    }

    switch (e.keyCode) {
      case 37:
        e.preventDefault();
        cropper.move(-1, 0);
        break;

      case 38:
        e.preventDefault();
        cropper.move(0, -1);
        break;

      case 39:
        e.preventDefault();
        cropper.move(1, 0);
        break;

      case 40:
        e.preventDefault();
        cropper.move(0, 1);
        break;
    }
  }; // Import image


  var inputImage = document.getElementById('inputImage');

  if (inputImage) {
    if (URL) {
      console.log(URL);

      inputImage.onchange = function () {
        var files = this.files;
        var file;

        if (cropper && files && files.length) {
          file = files[0];

          if (/^image\/\w+/.test(file.type)) {
            uploadedImageType = file.type;
            uploadedImageName = file.name;

            if (uploadedImageURL) {
              URL.revokeObjectURL(uploadedImageURL);
            }

            image.src = uploadedImageURL = URL.createObjectURL(file);
            cropper.destroy();
            cropper = new Cropper(image, options);
            inputImage.value = null;
          } else {
            window.alert('Please choose an image file.');
          }
        }
      };
    } else {
      inputImage.disabled = true;
      inputImage.parentNode.className += ' disabled';
    }
  }

  return cropper;
}

; // =============== End of Library Cropper ===============
"use strict";

// =============== initializers ===============
// initialize place holder
$('input, textarea').placeholder();
/*
 initialize date
 Add [data-type="date-picker"]
*/

$('[data-type="date-picker"]').datetimepicker({
  format: "MM/DD/YYYY"
});
/*
 initialize custom select used in themes
 add [data-type="select-custom"]
*/

$('[data-type="select-custom"]').chosen({});
/*
 initialize bootstrapSwitch (the on and off switch)
 add [data-type="switch"]
*/

$('[data-type="switch"]').bootstrapSwitch();
/*
 initializing popover
 add [data-toggle="popover"]
*/

$(function () {
  $('[data-toggle="popover"]').popover();
}); // =============== End of initializers ===============
// =============== Events ===============

/*
This script disables the click on disabled buttons
To use it just add disabled attr inside button element
*/

$('[disabled]').click(function (event) {
  event.stopPropagation();
});
/*
This script prevents the dropdown from closing when we click inside it
To use it just add .dropdown class
*/

$(document).on('click', '.dropdown', function (e) {
  e.stopPropagation();
});
/*
 This script removes any commas when using bootstrap-tagsinput
 To use it just add .bootstrap-tagsinput class
*/

$(document).on('keyup', '.bootstrap-tagsinput input', function () {
  if ($(this).val() === ',') {
    $(this).val('');
  }
});
/*
 This script fixes the min-height of the nav links
 To use just add [data-fix="aside"]
*/

$(".nav-tabs a").on('shown.bs.tab', function () {
  var tabId = $(this).attr("href");
  $(tabId).find('[data-fix="aside"]').parent().siblings().first().css('min-height', $(tabId).find('[data-fix="aside"]').height());
}); // =============== End of Events ===============
// =============== modal functions/events ===============

/*
 This script is for global events to do on modal shown
 To use it just add data-expand="true"
*/

$('.modal').on('shown.bs.modal', function () {
  $('[data-expand="true"]').trigger('change');
  $(window).trigger('resize');
});
/*
This script controls the backdrop (shadow) of the modal when there is a modal and another one opens
To use it just add .modal-backdrop class
*/

$(document).on('show.bs.modal', '.modal', function (event) {
  var zIndex = 1040 + 10 * $('.modal:visible').length;
  $(this).css('z-index', zIndex);
  setTimeout(function () {
    $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
  }, 0);
});
/*
 This script adds an animation when we open modals
 To use it just add .modal class
*/

$('.modal').on('hidden.bs.modal', function () {
  if ($('.modal.fade.in').length) $('body').addClass('modal-open');else {
    $('body').removeClass('modal-open');
  }
}); // =============== End of modal functions/events ===============
// =============== Lity.js ===============

$('[data-lity]').on('click', function () {
  var lityButton = '<button class="lity-mini" id="lityMini" title="Maximize the video"><svg viewBox="0 0 24 24" class="icon"><use href="img/icons.svg#icon-arrows-maximize"></use></svg></button><button class="lity-external" id="lityExternal" title="Open the video in a new window"><svg viewBox="0 0 24 24" class="icon"><use href="img/icons.svg#icon-external-link"></use></svg></button>';

  if ($('.lity-opened')) {
    $('.lity-opened').remove();
  }

  setTimeout(function () {
    $('.lity-opened .lity-container').append(lityButton);
  }, 100);
});
$(document).on('click', '#lityExternal', function () {
  var lityLink = $('.lity-iframe-container iframe').attr('src');
  window.open(lityLink, 'Listings-To-Leads', 'width=600,height=338');
  $('[data-lity-close]').trigger('click');
});
$(document).on('click', '#lityMini', function () {
  var t = $(this);

  if ($('.lity-controls').hasClass('lity-minimized')) {
    $('.lity-controls').removeClass('lity-minimized');
    t.attr('title', 'Minimize the video').find('.fa-expand').addClass('fa-compress').removeClass('fa-expand');
  } else {
    setTimeout(function () {
      $('.lity-opened').addClass('lity-minimized');
      t.attr('title', 'Maximize the video').find('.fa-compress').addClass('fa-expand').removeClass('fa-compress');
    }, 100);
  }
}); // =============== End of Lity.js ===============
// =============== Noty.js ===============
// Noty.js default options

Noty.overrideDefaults({
  theme: 'default',
  layout: "bottomLeft",
  timeout: 6000
}); // =============== End of Noty.js ===============
// =============== Tagify ===============
// function create initial standard tagify

function defaultTagify(inputs, data) {
  $(inputs).toArray().forEach(function (el) {
    new Tagify(el, data);
  });
} // =============== End of Tagify ===============
// =============== DropzoneJs ===============
// Initialize dropzone for MLS photos & Add listing


Dropzone.autoDiscover = false;
$('[data-type="dropzone-photos"]').dropzone({
  url: "/uploads",
  acceptedFiles: "image/*",
  thumbnailWidth: 190,
  thumbnailHeight: 190,
  dictDefaultMessage: '<svg viewBox="0 0 24 24" class="icon"><use href="img/icons.svg#icon-image"></use></svg> Drop here or click to upload',
  previewTemplate: '<div class="dz-preview dz-file-preview ui-state-default"><div class="dz-image"><img data-dz-thumbnail /></div><div class="dz-details"><div class="dz-filename"><span data-dz-name></span></div><div class="dz-size" data-dz-size></div></div><div class="dz-description"><div class="dz-head"><div class="unb checkbox pull-left"><label><input type="checkbox" checked> Unbranded</label></div><a class="btn btn-xs btn-danger pull-right" data-hover="tooltip" data-placement="bottom" title="Delete" data-dz-remove>&times;</a></div><input type="text" class="form-control" placeholder="Title"><textarea class="form-control" placeholder="Subtitle"></textarea><div class="radio llp"><label><input type="radio" name="llp" checked> Listing Landing Page</label></div></div><div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div><div class="dz-success-mark"><span>✔</span></div><div class="dz-error-mark"><span>✘</span></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div>',
  init: function init() {
    this.on("addedfile", function (file) {
      $('[data-hover="tooltip"]').tooltip();
    });
  }
}); // Initialize dropzone for VT photos & Add listing

$('[data-type="dropzone-vt"]').dropzone({
  url: "/uploads",
  acceptedFiles: "image/*",
  thumbnailWidth: 190,
  thumbnailHeight: 190,
  dictDefaultMessage: '<svg viewBox="0 0 24 24" class="icon"><use href="img/icons.svg#icon-image"></use></svg><br>Drop here or click to upload',
  previewTemplate: '<div class="dz-preview dz-file-preview ui-state-default"><div class="dz-image"><img data-dz-thumbnail /></div><div class="dz-details"></div><div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div><div class="dz-success-mark"><span>✔</span></div><div class="dz-error-mark"><span>✘</span></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div>',
  init: function init() {
    this.on("addedfile", function (file) {
      $('[data-hover="tooltip"]').tooltip();
    });
  }
}); // Initialize dropzone for banner

$('[data-type="dropzone-banner"]').dropzone({
  url: "/uploads",
  acceptedFiles: "image/*",
  uploadMultiple: false,
  thumbnailWidth: 777,
  maxFiles: 1,
  thumbnailHeight: 130,
  dictRemoveFile: true,
  dictDefaultMessage: '<svg viewBox="0 0 24 24" class="icon"><use href="img/icons.svg#icon-image"></use></svg> Drop here or Click to upload',
  previewTemplate: '<div class="dz-preview dz-file-preview"><img data-dz-thumbnail class="img-responsive" data-hover="tooltip" data-placement="top" title="Drop Custom Banner here or click to upload"/><div class="dz-details"><div class="dz-filename"><span data-dz-name></span></div><div class="dz-size" data-dz-size></div></div><div class="dz-head"><a class="btn btn-xs btn-danger pull-right" data-hover="tooltip" data-placement="bottom" title="Delete" data-dz-remove>&times;</a></div><div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div><div class="dz-success-mark"><span>✔</span></div><div class="dz-error-mark"><span>✘</span></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div>',
  accept: function accept(file, done) {
    console.log("uploaded");
    done();
  },
  init: function init() {
    // if a file added remove the older one
    this.on("addedfile", function () {
      if (this.files[1] !== null && this.files[0] !== null) {
        this.removeFile(this.files[0]);
      }
    });
  }
}); // initialize sortable

$('[data-type="dropzone-photos"]').sortable(); // mls photos

$('[data-type="dropzone-vt"]').sortable(); // virtual tour photos

$('[data-type="photos-sort"]').sortable(); // sort photos
// Remove/Delete Image from dropzone

$(document).on('click', '[data-type="dz-photo-del"]', function () {
  $('body').addClass('noty-backdrop');
  var t = $(this);
  var n = new Noty({
    text: 'Permanently delete this image?',
    layout: 'center',
    type: 'alert',
    closeWith: 'button',
    timeout: false,
    buttons: [Noty.button('Delete', 'btn btn-danger btn-sm', function () {
      t.closest('.dropzone').addClass('dz-delete');
      t.closest('.dz-preview').remove();

      if (!$('.dz-delete').find('.dz-preview').length) {
        $('.dz-started').removeClass('dz-started');
      }

      t.closest('.dropzone').removeClass('dz-delete');
      $('.tooltip').hide();
      new Noty({
        text: 'Image was deleted successfully.',
        type: 'success'
      }).show();
      n.close();
    }, {
      id: 'button1',
      'data-status': 'ok'
    }), Noty.button('Cancel', 'btn btn-success btn-sm', function () {
      n.close();
    })]
  }).on('onClose', function () {
    setTimeout(function () {
      $('body').removeClass('noty-backdrop');
    }, 300);
  }).show();
}); // =============== End of DropzoneJs ===============
// This function is not in use anymore

$('[data-type="share"]').click(function () {
  var window_size = "width=585,height=511";
  var url = this.href;
  var domain = url.split("/")[2];

  switch (domain) {
    case "www.facebook.com":
      window_size = "width=585,height=368";
      break;

    case "www.twitter.com":
      window_size = "width=585,height=261";
      break;

    case "plus.google.com":
      window_size = "width=517,height=511";
      break;

    case "linkedin.com":
      window_size = "width=550,height=527";
      break;

    case "pinterest.com":
      window_size = "width=750,height=555";
      break;
  }

  window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,' + window_size);
  return false;
}); // =============== Tooltip ===============
// initialize tooltip

$('body').tooltip({
  selector: '[data-toggle="tooltip"]'
}); // Image Preview Tooltip

$('[data-toggle="tooltip-img"]').tooltip({
  container: 'body',
  animated: 'fade',
  placement: 'bottom',
  html: true,
  trigger: 'click',
  template: '<div class="tooltip tooltip-img"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
});
$('[data-toggle="tooltip-img-hover"]').tooltip({
  container: 'body',
  animated: 'fade',
  placement: 'bottom',
  html: true,
  trigger: 'hover',
  template: '<div class="tooltip tooltip-img"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
}); // Image Preview Tooltip Fallback

$('[data-toggle="tooltip-img"]').on('show.bs.tooltip', function () {
  $('[data-toggle="tooltip-img"][aria-describedby]').not(this).trigger('click');
  $('body').addClass('data-toggle-img-active');
});
$('[data-toggle="tooltip-img"]').on('hidden.bs.tooltip', function () {
  if (!$(".tooltip-img")[0]) {
    $('body').removeClass('data-toggle-img-active');
  }
});
$(document).on("click", ".data-toggle-img-active", function () {
  $('[data-toggle="tooltip-img"][aria-describedby]').trigger('click');
});
$('[data-toggle="tooltip-img"]').click(function (e) {
  e.stopPropagation();
});
$(function () {
  $('[data-hover="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover'
  });
}); // =============== End of Tooltip ===============
// make text element editable
// data-txt-edited

function makeTextEdited() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.querySelector('[data-txt-edited]');

  if (target) {
    target.innerHTML = "<span contenteditable=\"true\" class=\"d-inline-block single-line\">".concat(target.textContent, "</span>\n    <span onclick=\"this.parentElement.children[0].focus()\"><svg viewBox=\"0 0 24 24\" class=\"icon icon-lg text-primary ml10\" style=\"cursor: pointer;vertical-align: top;\"><use href=\"img/icons.svg#icon-pencil\"></use></svg></span>");
  }
}
"use strict";

// Disabling the tooltips when the page loads and attaching them to the body to avoid some issues
$(function () {
  $('.navbar [data-hover="tooltip"]').tooltip({
    container: 'body',
    trigger: 'hover'
  });
  $('.navbar [data-hover="tooltip"]').not('[data-name="hideNavbar"]').tooltip('disable');
});
/*
 Click event that toggles the navbar-hidden class which minimizes the navbar content
 and enable the tooltips back on
*/

$('[data-name="hideNavbar"]').on('click', function () {
  $('.navbar [data-hover="tooltip"]').not($(this)).tooltip('toggleEnabled');
  $('body').toggleClass('navbar-hidden'); // This shows the sign out icon

  $('.navbar-footer .nav-link').toggleClass('hidden');

  if ($('body').hasClass('navbar-hidden')) {
    $(this).attr('data-original-title', 'Show Menu');
  } else {
    $(this).attr('data-original-title', 'Hide Menu');
  }
});
"use strict";

/*
This script preserve the width of table cells when using sortable
To use it just add  helper: PreserveCellWidth,  to the sortable function objects
*/
var PreserveCellWidth = function PreserveCellWidth(e, ui) {
  ui.children().each(function () {
    $(this).width($(this).width());
  });
  return ui;
};
"use strict";

/*
This script takes the input we're typing to a different element of the page, so when we are typing it looks like we are editing those elements like titles, headers...
To use it just change the parameters inside the function
the first parameter is the input we're typing and the second one is the target we want to edit
*/
function previewText(input, title) {
  var textValue = $(input).val();
  $(title).html(textValue);
}
"use strict";

/*
//  ra-swipe light slider 
//  2020 © copyright kreatinc.com
*************************************/
var raSwipeXDown = null;
$(document).on('mousedown', '.ra-swipe-container', function (e) {
  raSwipeXDown = e.clientX; // console.log(e, 'DOWN::',raSwipeXDown) ; 
});
$(document).on('mousemove', '.ra-swipe-container', function (e) {
  if (!raSwipeXDown) return; // disable check item

  $(this).css('cursor', 'grabbing').find('.ra-swipe-item').css('pointer-events', 'none');
  var xUp = e.clientX;
  var scrollEl = $('.ra-swipe-container')[0].scrollLeft;
  var xDiff = raSwipeXDown - xUp;
  raSwipeXDown = xUp; // if ( xDiff > 0 )
  //   /* left swipe */ 
  // else
  //   /* right swipe */ 

  $('.ra-swipe-container').animate({
    scrollLeft: scrollEl + xDiff
  }, 0);
});
$(document).on('mouseup mouseleave', '.ra-swipe-container', function (e) {
  /* reset values */
  raSwipeXDown = null;
  $(this).css('cursor', 'default').find('.ra-swipe-item').css('pointer-events', ''); // console.log('end swipe');
});
"use strict";

/*
This script rotates the image left and right 
To use it just add data-name="rotate-left" and data-name="rotate-right" each to its particular icon/svg...
*/
$(document).on('click', '[data-name="rotate-left"]', function () {
  var thisPic = $(this).closest('.dz-image');

  if (thisPic.find("img")[0]) {
    thisPic.find('img').rotate(-90);
  } else {
    thisPic.find('canvas').rotate(-90);
  }
});
$(document).on('click', '[data-name="rotate-right"]', function () {
  var thisPic = $(this).closest('.dz-image');

  if (thisPic.find("img")[0]) {
    thisPic.find("img").rotate(90);
  } else {
    thisPic.find('canvas').rotate(90);
  }
});
"use strict";

/*
These 3 functions down below are responsible for counting the rows selected, selecting all the rows and deleting the rows from the table.
to use them :
  - be sure to include the attribute data-name="select" next to the checkbox inside the table row
  - be sure to include the attribute data-name="selectAll" next to the checkbox responsible for selecting all
  - add a data-name="element" in the same level as the (table) class, element is basically what content is used inside the table ex: data-name="listing", data-name="auto-posting", data-name="landing-page"..
    and always separate each word with a hyphen (-) and don't capitalize any letter and use singular words (listing, report, landing-page ...)

This is an example of the hidden table row where all the hidden content will be at and we will show it when we select a checkbox 
  <tr class="warning hidden" data-name="selectActions"> 
    <th colspan="8" class="text-center"> 
      <span class="mr15" data-name="selectNumber"> 11 Listings selected</span>
      <!-- <a class="mr15" href="#"> Add to collection</a> -->
      <a href="javascript: void(0)" data-name="selectDelete"><svg viewBox="0 0 24 24" class="icon"><use href="img/icons.svg#icon-delete"></use></svg> Delete</a>
    </th> 
  </tr>
All the content above should be inside of data-name="selectActions" attribute and it should be hidden by default
it should not necessarily be used in a table row you can show it in a div but just make sure the parent of these elements is always data-name="selectActions"
*/

/*
 the rowSelect(elm) function is responsible for counting the rows and showing the data-name="selectActions" explained above and getting what type of table (listing, report...)
*/
function rowSelect(elm) {
  var parent = $(elm).parents('.table');
  ;
  var selected = parent.find('[data-name="select"]:checked').length;
  var allSelections = parent.find('[data-name="select"]').length;
  var selectAll = parent.find('[data-name="selectAll"]');
  var target = parent.find('[data-name="selectActions"]');
  var counter = parent.find('[data-name="selectNumber"]'); // Getting the name of table type

  var str = parent.data('name').split(/\s*\-\s*/g); // Converting the array to a string and replacing the commas with spaces and uppercasing first letter of each word

  var newStr = str.toString();
  var elmName = newStr.replace(/,/g, ' ').toLowerCase().replace(/\b[a-z]/g, function (letter) {
    return letter.toUpperCase();
  }); // Checking for selected rows to show the selectActions update the counter and its text

  if (selected > 0) {
    target.removeClass('hidden');
    selected == 1 ? counter.text("".concat(selected, "  ").concat(elmName, " Selected")) : counter.text("".concat(selected, "  ").concat(elmName, "s Selected"));
  } else {
    target.addClass('hidden');
  } // Checking if all rows are selected to check and uncheck the select all option checkbox


  allSelections == selected ? selectAll.prop('checked', true) : selectAll.prop('checked', false);
} // Call the rowSelect(elm) function when selecting a checkbox and Pass it the (this) keyword


$('[data-name="select"]').on('click', function () {
  rowSelect(this);
});
/*
 the rowSelectAll(elm) function is responsible for selecting all the checkboxes when we click the data-name="selectAll" checkbox
*/

function rowSelectAll(elm) {
  var parent = $(elm).parents('.table');

  if ($(elm).is(':checked')) {
    parent.find('[data-name="select"]').prop('checked', true);
  } else {
    parent.find('[data-name="select"]').prop('checked', false);
    $(elm).prop('checked', false);
  }
} // Call the rowSelectAll(elm) and rowSelect(elm) functions when we click the select all checkbox  


$('[data-name="selectAll"]').on('click', function () {
  rowSelectAll(this);
  rowSelect(this);
});
/*
 the rowDelete(elm) function is responsible for deleting the rows selected and showing the Noty confirmation message
*/

function rowDelete(elm) {
  var parent = $(elm).parents('.table');
  var selected = parent.find('[data-name="select"]:checked');
  var selectedNumber = selected.length;
  var target = parent.find('[data-name="selectActions"]');
  var selectAll = parent.find('[data-name="selectAll"]'); // Getting the name of the element passed in [data-name="table-element"] (listings, landing page, report ...) 

  var str = parent.data('name').split(/\s*\-\s*/g); // Converting the array to a string and replacing the commas with spaces and uppercasing first letter of each word

  var newStr = str.toString();
  var elmName = newStr.replace(/,/g, ' ').toLowerCase().replace(/\b[a-z]/g, function (letter) {
    return letter.toUpperCase();
  });
  selected.closest('tr').addClass('danger');
  $('body').addClass('noty-backdrop');
  var n = new Noty({
    text: "Permanently delete the selected <strong> ".concat(selectedNumber, " ").concat(elmName, "s?</strong>"),
    layout: 'center',
    type: 'alert',
    closeWith: 'button',
    timeout: false,
    buttons: [Noty.button('Delete', 'btn btn-danger btn-sm', function () {
      selectAll.prop('checked', false);
      selected.closest('tr').remove();
      selectedNumber = parent.find('[data-name="select"]:checked').length;
      new Noty({
        text: "The selected ".concat(elmName, "s were deleted successfully."),
        type: 'success'
      }).show();
      n.close();
    }, {
      id: 'button1',
      'data-status': 'ok'
    }), Noty.button('Cancel', 'btn btn-success btn-sm', function () {
      selected.closest('tr').removeClass('danger');
      n.close();
    })]
  }).on('onClose', function () {
    if (selectedNumber < 1) target.addClass('hidden');
    setTimeout(function () {
      $('body').removeClass('noty-backdrop');
    }, 300);
  }).show();
} // Call the rowDelete(elm) function when we click the delete icon  


$('[data-name="selectDelete"]').on('click', function () {
  rowDelete(this);
});
"use strict";

// SelectAll
// we'll use this function to select a target
// Add 'data-select' to a button,
// When clicked this will add 'active' to the nearest data-select-item
// And check the 'checkbox' inside this button or label.
// and show the data-select-target
// We can later improve to use on tables etc..
function selectAll(button) {
  var selected = 0;
  var item = $(button).closest('[data-select-item]');
  var items = $('[data-select-item="' + item.attr('data-select-item') + '"]');
  var checkbox = $(item).find('[type="checkbox"]');
  var target = $('[data-select-target="' + item.attr('data-select-item') + '"]'); // add active class and check/uncheck checkbox

  item.toggleClass('active');
  checkbox.prop("checked", !checkbox.prop("checked"));
  $(button).find('[data-icon-check] svg[hidden]').removeAttr('hidden').siblings('svg').attr('hidden', '');
  items.each(function () {
    if ($(this).hasClass('active')) {
      selected += 1;
    }

    ;
  }); //  show/hide target buttons

  if (selected > 0) {
    target.removeClass('hidden');
    target.find('small').html('<strong>' + selected + '</strong> selected');
  } else {
    target.addClass('hidden');
  }
}

; // Initialize

$(document).on('click', '[data-select]', function (e) {
  e.preventDefault();
  selectAll(this); // single select

  var parent = $(this).parents('[data-parent="single"]').first();

  if (parent.length > 0) {
    if (!$(this).closest('[data-select-item]').hasClass('active')) return;
    parent.find('[data-select-item]').removeClass('active').find('[type="checkbox"]').prop("checked", false);
    parent.find('[data-select] [data-icon-check]').children('svg:first-child').removeAttr('hidden').siblings('svg').attr('hidden', '');
    selectAll(this);
    parent.find('[data-select-target]').hide();
  }
}); // preventdefault click of data-select (we don't select an item when we click on a button into the item ..)

$(document).on('click', '[data-select] .btn-clear:not([data-icon-check])', function (e) {
  e.stopPropagation();
});
"use strict";

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
  palette: [['#ffffff', 'rgba(209, 19, 34, 0.7)', '#919295', '#666666'], ['#474c59', '#6C6256', '#ADA485', '#000000'], ['#EAE3D4', '#FF0000', '#fb3e5e', '#ab2328'], ['#f48024', '#FF5F00', '#61367a', '#552448'], ['#521F1E', '#769CCD', '#007cc2', '#4B7076'], ['#81D8D0', '#58c887', '#ABB400', '#BADA55']],
  move: function move(color) {
    if (this.getAttribute('data-ie-edit') == 'primaryColor') $(this).parents('.ssi-editor').first().find('.ssi-editor-body')[0].style.setProperty('--ie-primary-color', color.toRgbString());
    if (this.getAttribute('data-ie-edit') == 'secondaryColor') $(this).parents('.ssi-editor').first().find('.ssi-editor-body')[0].style.setProperty('--ie-secondary-color', color.toRgbString());
  }
}); // set default colors of primary and secondary colors

$('[data-ie-edit="primaryColor"]').spectrum('set', 'rgba(209, 19, 34, 0.7)');
$('[data-ie-edit="secondaryColor"]').spectrum('set', '#fff'); // change img editor font family

$('[data-ie-edit="fontFamily"]').change(function (el) {
  $(this).parents('.ssi-editor').first().find('.ssi-editor-body')[0].style.setProperty('--ie-font-family', this.value + ", Avenir Next, -apple-system, Segoe UI, Roboto, sans-serif");
}); // change title/subtitle text

$(document).on('click', '[data-ie-edit="textContent"]', function (el) {
  var title = $(this).parents('.modal').first().find('[name="headline"]').val(),
      subtitle = $(this).parents('.modal').first().find('[name="subheadline"]').val();
  $('.modal.in .ssi-editor').find('[data-ie="title"]').text(title);
  $('.modal.in .ssi-editor').find('[data-ie="subtitle"]').text(subtitle);
  if (title.length < 1) $('.modal.in .ssi-editor').find('[data-ie="title"]').css('display', 'none');else $('.modal.in .ssi-editor').find('[data-ie="title"]').css('display', '');
  if (subtitle.length < 1) $('.modal.in .ssi-editor').find('[data-ie="subtitle"]').css('display', 'none');else $('.modal.in .ssi-editor').find('[data-ie="subtitle"]').css('display', '');
}); //-- make title/subtitle contenteditable
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
}); // social share img editor modal

$('[data-ie-modal]').on('shown.bs.modal', function (e) {
  //-- create edit controls for elements
  // if the controls are already exist return
  if ($(this).find('.ssi-editor-controls').length > 0) return;
  var thisModal = $(this); // create controls

  setTimeout(function () {
    thisModal.find('[data-ie-controls]').toArray().forEach(function (element) {
      var controlsData = JSON.parse($(element).attr('data-ie-controls'));
      var controlsDiv = "<div class=\"ssi-editor-controls ".concat(controlsData.align ? controlsData.align : '', "\" data-ie-target=\"[data-ie='").concat($(element).attr('data-ie'), "']\"><div class=\"btn-group\" role=\"group\" aria-label=\"Button group with nested dropdown\">");
      controlsData.controls.forEach(function (elm) {
        if (elm.position) {
          controlsDiv += "<button type=\"button\" class=\"btn btn-xs btn-default\" data-hover=\"tooltip\" title=\"Change Position\" data-ie-edit-position=\"".concat(elm.position ? elm.position : 'middle', "\"><svg viewBox=\"0 0 24 24\" class=\"icon icon-sm\"><use href=\"../../img/icons.svg#icon-border-").concat(elm.position == 'middle' ? 'horizontal' : elm.position, "\"></use></svg></button>");
        }

        if (elm.rotate != undefined) {
          controlsDiv += "<button type=\"button\" class=\"btn btn-xs btn-default\" data-hover=\"tooltip\" title=\"Rotate\" data-ie-edit-rotate=\"".concat(elm.rotate ? elm.rotate : "0", "\"><svg viewBox=\"0 0 24 24\" class=\"icon icon-sm\"><use href=\"../../img/icons.svg#icon-redo\"></use></svg></button>");
        }

        switch (elm) {
          case 'm-gallery':
            controlsDiv += "<button type=\"button\" class=\"btn btn-xs btn-default\" data-hover=\"tooltip\" title=\"Change Image\" data-toggle=\"modal\" data-target=\"#modalLibrary\"><svg viewBox=\"0 0 24 24\" class=\"icon icon-sm\"><use href=\"../../img/icons.svg#icon-pencil\"></use></svg></button>";
            break;
          // case 'hide':
          //   controlsDiv += `<button type="button" class="btn btn-xs btn-default" data-hover="tooltip" title="Hide &amp; Show Banner" data-ie-edit-show="true"><svg viewBox="0 0 24 24" class="icon icon-sm"><use href="../../img/icons.svg#icon-eye"></use></svg></button>`;              
          //   break;

          case 'm-text':
            controlsDiv += "<button type=\"button\" class=\"btn btn-xs btn-default\" data-hover=\"tooltip\" title=\"Update Text\" data-toggle=\"modal\" data-target=\"#modalEditTextContent\"><svg viewBox=\"0 0 24 24\" class=\"icon icon-sm\"><use href=\"../../img/icons.svg#icon-pencil\"></use></svg></button>";
            break;

          default:
            break;
        }
      });
      controlsDiv += '</div></div>';
      if (controlsData.type == 'content') $(element).prepend(controlsDiv);else if (controlsData.type == 'img') {
        $(element).before(controlsDiv);
      }
      $('[data-hover]').tooltip({
        container: 'body',
        trigger: 'hover'
      });
    });
  }, 100);
}); // show hide element

$(document).on('click', '[data-ie-edit-show]', function () {
  var imgEditor = $(this).parents('.ssi-editor').first();
  var target = imgEditor.find($(this).parents('[data-ie-target]').first().attr('data-ie-target'));

  if ($(this).attr('data-ie-edit-show') != 'false') {
    if (target.attr('data-ie') == "content") target.find('section').attr('hidden', true);else target.attr('hidden', true);
    $(this).attr('data-ie-edit-show', 'false');
    $(this).find('svg use').attr('href', '../../img/icons.svg#icon-eye-off');
    $(this).siblings().attr('hidden', true);
  } else {
    if (target.attr('data-ie') == "content") target.find('section').removeAttr('hidden');else target.removeAttr('hidden');
    $(this).attr('data-ie-edit-show', 'true');
    $(this).find('svg use').attr('href', '../../img/icons.svg#icon-eye');
    $(this).siblings().removeAttr('hidden');
  }
}); // change position

$(document).on('click', '[data-ie-edit-position]', function () {
  var imgEditor = $(this).parents('.ssi-editor').first(),
      elmTarget = imgEditor.find($(this).parents('[data-ie-target]').first().attr('data-ie-target')).first();
  var elControls = JSON.parse(elmTarget.attr('data-ie-controls'));
  var posEl;
  elControls.controls.forEach(function (el) {
    if (el.position) posEl = el;
  });

  if (elmTarget.attr('data-ie') == "content") {
    elmTarget[0].style.removeProperty('transform');

    switch (this.getAttribute('data-ie-edit-position')) {
      case 'top':
        $(this).attr('data-ie-edit-position', 'bottom').find('svg use').attr('href', '../../img/icons.svg#icon-border-bottom');
        elmTarget[0].style.setProperty('--ie-content-top', 'auto');
        elmTarget[0].style.setProperty('--ie-content-bottom', '15px');
        posEl.position = 'bottom';
        break;

      case 'bottom':
        $(this).attr('data-ie-edit-position', 'middle').find('svg use').attr('href', '../../img/icons.svg#icon-border-horizontal');
        elmTarget[0].style.setProperty('transform', 'translateY(-50%)');
        elmTarget[0].style.setProperty('--ie-content-top', '50%');
        elmTarget[0].style.setProperty('--ie-content-bottom', 'auto');
        posEl.position = 'middle';
        break;

      case 'middle':
        $(this).attr('data-ie-edit-position', 'top').find('svg use').attr('href', '../../img/icons.svg#icon-border-top');
        elmTarget[0].style.setProperty('--ie-content-top', '15px');
        elmTarget[0].style.setProperty('--ie-content-bottom', 'auto');
        posEl.position = 'top';
        break;

      default:
        break;
    }

    $('.tooltip.in').remove();
  } else if (elmTarget[0].tagName == "IMG") {
    elmTarget[0].style.removeProperty('object-fit');

    switch (this.getAttribute('data-ie-edit-position')) {
      case 'bottom':
        $(this).attr('data-ie-edit-position', 'middle').find('svg use').attr('href', '../../img/icons.svg#icon-border-horizontal');
        elmTarget[0].style.setProperty('--ie-bg-img-position', 'center');
        posEl.position = 'middle';
        break;

      case 'middle':
        $(this).attr('data-ie-edit-position', 'top').find('svg use').attr('href', '../../img/icons.svg#icon-border-top');
        elmTarget[0].style.setProperty('--ie-bg-img-position', 'left top');
        posEl.position = 'top';
        break;

      case 'top':
        $(this).attr('data-ie-edit-position', 'bottom').find('svg use').attr('href', '../../img/icons.svg#icon-border-bottom');
        elmTarget[0].style.setProperty('--ie-bg-img-position', 'right bottom');
        posEl.position = 'bottom'; // $(this).attr('data-ie-edit-position', 'fill').find('svg use').attr('href', '../../img/icons.svg#icon-border-outer');
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
}); // on click on rotate button

$(document).on('click', '[data-ie-edit-rotate]', function () {
  var angle = (parseInt(this.getAttribute('data-ie-edit-rotate')) + 90) % 360;
  $(this).attr('data-ie-edit-rotate', angle);
  var elmTarget = $(this).parents('.ssi-editor').first().find($(this).parents('[data-ie-target]').attr('data-ie-target'));
  elmTarget.removeClass('rotate0 rotate90 rotate180 rotate270').addClass('rotate' + angle);
  var elControls = JSON.parse(elmTarget.attr('data-ie-controls'));
  elControls.controls.forEach(function (el) {
    if (el.rotate != undefined) el.rotate = angle;
  });
  elmTarget.attr('data-ie-controls', JSON.stringify(elControls));
}); // change fb/instagram editor type 

$(document).on('change', '[name="ie-height"]', function () {
  if (this.value == 'instagram') $(this).parents('.ssi-editor').first().addClass('instagram');else $(this).parents('.ssi-editor').first().removeClass('instagram');
  setTimeout(function () {
    $('.modal:visible').each(centerModal);
  }, 502);
}); // get text content position style

function ssieTextPosition(position) {
  var ieContentStyle = '';

  switch (position) {
    case 'bottom':
      ieContentStyle = "style=\" --ie-content-top: auto; --ie-content-bottom: 15px; \"";
      break;

    case 'middle':
      ieContentStyle = "style=\" --ie-content-top: 50%; --ie-content-bottom: auto; transform: translateY(-50%); \"";
      break;

    case 'top':
      ieContentStyle = "style=\" --ie-content-top: 15px; --ie-content-bottom: auto; \"";
      break;
  }

  return ieContentStyle;
} // get editor images positon


function ssieImgPosition(position) {
  return position.indexOf('top') !== -1 ? "top" : position.indexOf('bottom') !== -1 ? "bottom" : "middle";
} // get social editor tempalte html (use this to convert html to image to get the 2x size (wdith: 1200px))


function ssieTemplateProd(imgEditorSelector) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'facebook';
  var newTemplate = $(imgEditorSelector).clone();
  newTemplate.find('.ssi-editor-controls').remove(); //-- Facebook template

  var template2xHTML = '<div class="ssi-editor ssi-editor-prod">' + newTemplate.find('.ssi-editor-body')[0].outerHTML + '</div>'; //-- Instagram template (just add instagram class next ssi-editor)

  if (type && type == 'instagram') {
    var template2xHTML = '<div class="ssi-editor ssi-editor-prod instagram">' + newTemplate.find('.ssi-editor-body')[0].outerHTML + '</div>';
  }

  return template2xHTML;
} // generate social share image template


function ssieGenTemplateBody(data) {
  var templateNum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var template = null;
  var ieBodyStyle = "style=\" --ie-primary-color: ".concat(data.colors.primary ? data.colors.primary : 'inherit', "; --ie-secondary-color: ").concat(data.colors.secondary ? data.colors.secondary : 'inherit', "; --ie-font-family: ").concat(data.font ? data.font : 'inherit', " \"");

  switch (templateNum) {
    case 0:
      template = "<div class=\"ssi-editor-body\" ie-template-type=\"0\" ".concat(ieBodyStyle, "> \n        <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[0].src : 'img/12.jpg', "\" alt=\"social share image\" class=\"ssi-editor-bg ").concat(data.images && parseInt(data.images[0].rotation) > 0 ? 'rotate' + data.images[0].rotation : '', "\" data-ie=\"img-1\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[0].position : 'center', "\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\", {\"rotate\":\"").concat(data.images ? data.images[0].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[0].position : 'middle'), "\"}]}'> </div>");
      break;

    case 1:
      template = "<div class=\"ssi-editor-body\" ie-template-type=\"1\" ".concat(ieBodyStyle, "> \n        <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[0].src : 'img/12.jpg', "\" alt=\"social share image\" class=\"ssi-editor-bg ").concat(data.images && parseInt(data.images[0].rotation) > 0 ? 'rotate' + data.images[0].rotation : '', "\" data-ie=\"img-1\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[0].position : 'center', "\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\", {\"rotate\":\"").concat(data.images ? data.images[0].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[0].position : 'middle'), "\"}]}'> \n        <div class=\"ssi-editor-content\" ").concat(ssieTextPosition(data.textPosition), " data-ie=\"content\" \n        data-ie-controls='{\"type\":\"content\", \"controls\": [\"m-text\",{\"position\":\"").concat(data.textPosition ? data.textPosition : 'bottom', "\"},\"hide\"]}'> \n        <section class=\"banner\"> \n          <h3 data-ie=\"title\" class=\"title\">").concat(data.title || data.title == '' ? data.title : 'Coming Soon in Granite Bay!', "</h3> \n          <p data-ie=\"subtitle\" class=\"subtitle\">").concat(data.subtitle || data.subtitle == '' ? data.subtitle : 'Click or Text 10002 to 256748 for Photos & Details!', "</p> \n        </section> </div> </div>");
      break;

    case 2:
      template = "<div class=\"ssi-editor-body t2\" ie-template-type=\"2\" ".concat(ieBodyStyle, "> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[0].src : 'img/12.jpg', "\" alt=\"social share image\" class=\"ssi-editor-bg ").concat(data.images && parseInt(data.images[0].rotation) > 0 ? 'rotate' + data.images[0].rotation : '', "\" data-ie=\"img-1\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[0].position : 'center', "\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\", {\"rotate\":\"").concat(data.images ? data.images[0].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[0].position : ' middle'), "\"}]}'> <div class=\"ssi-editor-content\" ").concat(ssieTextPosition(data.textPosition), " data-ie=\"content\" data-ie-controls='{\"type\":\"content\", \"controls\": [\"m-text\",{\"position\":\"").concat(data.textPosition ? data.textPosition : ' bottom', "\"},\"hide\"], \"align\" :\"center\"}'> <section class=\"media\"> <div class=\"media-left\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.agent.src ? data.agent.src : 'img/agent-profile.jpg', "\" class=\"img-circle img mr5 ").concat(data.agent && parseInt(data.agent.rotation) > 0 ? 'rotate' + data.agent.rotation : '', "\" style=\"max-width: 100px; --ie-bg-img-position: ").concat(data.agent ? data.agent.position : 'center', "\" alt=\"profile\" width=\"70\" height=\"70\" data-ie=\"img-profile\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\",{\"rotate\":\"").concat(data.agent ? data.agent.rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.agent ? data.agent.position : ' middle'), "\"},\"hide\"]}'> </div> <div class=\"media-body align-middle\"> <h3 class=\"title\" data-ie=\"title\">").concat(data.title || data.title == '' ? data.title : 'Coming Soon in Granite Bay!', "</h3> <p class=\"subtitle\" data-ie=\"subtitle\">").concat(data.subtitle || data.subtitle == '' ? data.subtitle : 'Click or Text 10002 to 256748 for Photos & Details!', "</p> </div> </section> </div> </div>");
      break;

    case 3:
      template = "<div class=\"ssi-editor-body t3\" ie-template-type=\"3\" ".concat(ieBodyStyle, "> <div class=\"ie-div mb5\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[2].src : 'img/3.jpg', "\" alt=\"share image\" class=\"img img-2 ").concat(data.images && parseInt(data.images[2].rotation) > 0 ? 'rotate' + data.images[2].rotation : '', "\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[2].position : 'center', "\" data-ie=\"img-3\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\",{\"rotate\":\"").concat(data.images ? data.images[2].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[2].position : ' middle'), "\"}]}'> </div> <div class=\"row row-xs\"> <div class=\"col-xs-8\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[0].src : 'img/12.jpg', "\" alt=\"social share image\" class=\"ssi-editor-bg ").concat(data.images && parseInt(data.images[0].rotation) > 0 ? 'rotate' + data.images[0].rotation : '', "\" data-ie=\"img-1\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[0].position : 'center', "\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\", {\"rotate\":\"").concat(data.images ? data.images[0].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[0].position : ' middle'), "\"}]}'> </div> <div class=\"col-xs-4 pl0\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[1].src : 'img/2.jpg', "\" alt=\"share image\" class=\"ssi-editor-bg ssi-editor-2 ").concat(data.images && parseInt(data.images[1].rotation) > 0 ? 'rotate' + data.images[1].rotation : '', "\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[1].position : 'center', "\" data-ie=\"img-2\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\",{\"rotate\":\"").concat(data.images ? data.images[1].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[1].position : ' middle'), "\"}], \"align\" : \"center\" }'> </div> </div> <div class=\"ssi-editor-content\" ").concat(ssieTextPosition(data.textPosition), " data-ie=\"content\" data-ie-controls='{\"type\":\"content\", \"controls\": [\"m-text\",{\"position\":\"").concat(data.textPosition ? data.textPosition : ' bottom', "\"},\"hide\"], \"align\" :\"center\"}'> <section> <div class=\"media banner-alt\"> <div class=\"media-left\" style=\" min-width: 50px; height: 62px; \"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.agent.src ? data.agent.src : 'img/agent-profile.jpg', "\" class=\"img-circle img ").concat(data.agent && parseInt(data.agent.rotation) > 0 ? 'rotate' + data.agent.rotation : '', "\" style=\" max-width: 80px; --ie-bg-img-position: ").concat(data.agent ? data.agent.position : 'center', "\" alt=\"profile\" width=\"64\" height=\"64\" data-ie=\"img-profile\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\",{\"rotate\":\"").concat(data.agent ? data.agent.rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.agent ? data.agent.position : ' middle'), "\"}]}'> </div> <div class=\"media-body align-middle\"> <h3 class=\"title\" data-ie=\"title\">").concat(data.title || data.title == '' ? data.title : 'Coming Soon in Granite Bay!', "</h3> <p class=\"subtitle\" data-ie=\"subtitle\">").concat(data.subtitle || data.subtitle == '' ? data.subtitle : 'Click or Text 10002 to 256748 for Photos & Details!', "</p> </div> </div> </section> </div> </div>");
      break;

    case 4:
      template = "<div class=\"ssi-editor-body t4\" ie-template-type=\"4\" ".concat(ieBodyStyle, "> <div class=\"row row-xs\"> <div class=\"col-xs-8\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[0].src : 'img/12.jpg', "\" alt=\"social share image\" class=\"ssi-editor-bg ").concat(data.images && parseInt(data.images[0].rotation) > 0 ? 'rotate' + data.images[0].rotation : '', "\" data-ie=\"img-1\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[0].position : 'center', "\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\", {\"rotate\":\"").concat(data.images ? data.images[0].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[0].position : ' middle'), "\"}]}'> </div> <div class=\"col-xs-4 pl0\"> <div class=\"ie-div\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[1].src : 'img/2.jpg', "\" alt=\"share image\" class=\"img img-1 ").concat(data.images && parseInt(data.images[1].rotation) > 0 ? 'rotate' + data.images[1].rotation : '', "\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[1].position : 'center', "\" data-ie=\"img-2\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\",{\"rotate\":\"").concat(data.images ? data.images[1].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[1].position : ' middle'), "\"}]}'> </div> <div class=\"ie-div mt5\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[2].src : 'img/2.jpg', "\" alt=\"share image\" class=\"img img-1 ").concat(data.images && parseInt(data.images[2].rotation) > 0 ? 'rotate' + data.images[2].rotation : '', "\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[2].position : 'center', "\" data-ie=\"img-3\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\",{\"rotate\":\"").concat(data.images ? data.images[2].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[2].position : ' middle'), "\"}]}'> </div> <div class=\"ie-div ie-insta mt5\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[3].src : 'img/4.jpg', "\" alt=\"share image\" class=\"img img-1 ").concat(data.images && parseInt(data.images[3].rotation) > 0 ? 'rotate' + data.images[3].rotation : '', "\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[3].position : 'center', "\" data-ie=\"img-4\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\",{\"rotate\":\"").concat(data.images ? data.images[3].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[3].position : ' middle'), "\"}]}'> </div> </div> </div> <div class=\"ssi-editor-content\" ").concat(ssieTextPosition(data.textPosition), " data-ie=\"content\" data-ie-controls='{\"type\":\"content\", \"controls\": [\"m-text\",\"hide\"]}'> <section> <div class=\"media banner-alt\"> <div class=\"media-body align-middle\"> <h3 class=\"title\" data-ie=\"title\">").concat(data.title || data.title == '' ? data.title : 'Coming Soon in Granite Bay!', "</h3> <p class=\"subtitle\" data-ie=\"subtitle\">").concat(data.subtitle || data.subtitle == '' ? data.subtitle : 'Click or Text 10002 to 256748 for Photos & Details!', "</p> </div> <div class=\"media-right align-middle\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.agent.src ? data.agent.src : 'img/agent-profile.jpg', "\" class=\"img ").concat(data.agent && parseInt(data.agent.rotation) > 0 ? 'rotate' + data.agent.rotation : '', "\" alt=\"profile\" height=\"75\" width=\"75\" style=\"max-width: 75px; --ie-bg-img-position: ").concat(data.agent ? data.agent.position : 'center', "\" data-ie=\"img-profile\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\",{\"rotate\":\"").concat(data.agent ? data.agent.rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.agent ? data.agent.position : ' middle'), "\"}],\"align\": \"right\" }'> </div> </div> </section> </div> </div>");
      break;

    case 5:
      template = "<div class=\"ssi-editor-body t5\" ie-template-type=\"5\" ".concat(ieBodyStyle, "> <div class=\"row row-xs\"> <div class=\"col-xs-8\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[0].src : 'img/12.jpg', "\" alt=\"social share image\" class=\"ssi-editor-bg ").concat(data.images && parseInt(data.images[0].rotation) > 0 ? 'rotate' + data.images[0].rotation : '', "\" data-ie=\"img-1\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[0].position : 'center', "\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\", {\"rotate\":\"").concat(data.images ? data.images[0].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[0].position : ' middle'), "\"}]}'> </div> <div class=\"col-xs-4 pl0\"> <div class=\"ie-div\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[1].src : 'img/2.jpg', "\" alt=\"share image\" class=\"img img-1 ").concat(data.images && parseInt(data.images[1].rotation) > 0 ? 'rotate' + data.images[1].rotation : '', "\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[1].position : 'center', "\" data-ie=\"img-2\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\",{\"rotate\":\"").concat(data.images ? data.images[1].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[1].position : ' middle'), "\"}]}'> </div> <div class=\"ie-div ie-insta mt5\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[3].src : 'img/4.jpg', "\" alt=\"share image\" class=\"img img-1 ").concat(data.images && parseInt(data.images[3].rotation) > 0 ? 'rotate' + data.images[3].rotation : '', "\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[3].position : 'center', "\" data-ie=\"img-4\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\",{\"rotate\":\"").concat(data.images ? data.images[3].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[3].position : ' middle'), "\"}]}'> </div> <div class=\"ie-div mt5\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[2].src : 'img/3.jpg', "\" alt=\"share image\" class=\"img img-1 ").concat(data.images && parseInt(data.images[2].rotation) > 0 ? 'rotate' + data.images[2].rotation : '', "\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[2].position : 'center', "\" data-ie=\"img-3\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\",{\"rotate\":\"").concat(data.images ? data.images[2].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[2].position : ' middle'), "\"}]}'> <div class=\"fixed-middle-text\"><span>").concat(data.moreImgNb ? '+' + data.moreImgNb : '+39', "</span></div> </div> </div> </div> <div class=\"ssi-editor-content\" ").concat(ssieTextPosition(data.textPosition), " data-ie=\"content\" data-ie-controls='{\"type\":\"content\", \"controls\": [\"m-text\",{\"position\":\"").concat(data.textPosition ? data.textPosition : ' bottom', "\"},\"hide\"]}'> <section> <h3 class=\"title\" data-ie=\"title\" ").concat(data.title ? '' : 'style="display: none;"', ">").concat(data.title || data.title == '' ? data.title : ' Coming Soon in Granite Bay!', "</h3> <br> <p class=\"subtitle\" data-ie=\"subtitle\" ").concat(data.subtitle ? '' : 'style="display: none;"', ">").concat(data.subtitle || data.subtitle == '' ? data.subtitle : ' Click or Text 10002 to 256748 for Photos & Details!', "</p> </section> </div> </div>");
      break;

    case 6:
      template = "<div class=\"ssi-editor-body t6\" ie-template-type=\"6\" ".concat(ieBodyStyle, "> <div class=\"row row-xs\"> <div class=\"col-xs-7\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[0].src : 'img/12.jpg', "\" alt=\"social share image\" class=\"ssi-editor-bg ").concat(data.images && parseInt(data.images[0].rotation) > 0 ? 'rotate' + data.images[0].rotation : '', "\" data-ie=\"img-1\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[0].position : 'center', "\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\", {\"rotate\":\"").concat(data.images ? data.images[0].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[0].position : ' middle'), "\"}]}'> </div> <div class=\"col-xs-5 pl0\"> <div class=\"ie-div\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[1].src : 'img/2.jpg', "\" alt=\"share image\" class=\"img img-1 ").concat(data.images && parseInt(data.images[1].rotation) > 0 ? 'rotate' + data.images[1].rotation : '', "\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[1].position : 'center', "\" data-ie=\"img-2\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\",{\"rotate\":\"").concat(data.images ? data.images[1].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[1].position : ' middle'), "\"}]}'> </div> <div class=\"row row-xs\"> <div class=\"col-xs-6\"> <div class=\"ie-div mt5\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\"  src=\"").concat(data.images ? data.images[2].src : 'img/3.jpg', "\" alt=\"share image\" class=\"img img-1 ").concat(data.images && parseInt(data.images[2].rotation) > 0 ? 'rotate' + data.images[2].rotation : '', "\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[2].position : 'center', "\" data-ie=\"img-3\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\",{\"rotate\":\"").concat(data.images ? data.images[2].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[2].position : ' middle'), "\"}]}'> </div> </div> <div class=\"col-xs-6 pl0\"> <div class=\"ie-div mt5\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[3].src : 'img/4.jpg', "\" alt=\"share image\" class=\"img img-1 ").concat(data.images && parseInt(data.images[3].rotation) > 0 ? 'rotate' + data.images[3].rotation : '', "\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[3].position : 'center', "\" data-ie=\"img-4\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\",{\"rotate\":\"").concat(data.images ? data.images[3].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[3].position : ' middle'), "\"}]}'> <div class=\"fixed-middle-text\"><span>").concat(data.moreImgNb ? '+' + data.moreImgNb : '+24', "</span></div> </div> </div> </div> </div> </div> <div class=\"ssi-editor-content\" ").concat(ssieTextPosition(data.textPosition), " data-ie=\"content\" data-ie-controls='{\"type\":\"content\", \"controls\": [\"m-text\",{\"position\":\"").concat(data.textPosition ? data.textPosition : ' top', "\"},\"hide\"], \"align\" :\"bottom\"}'> <section> <h3 class=\"title\" data-ie=\"title\" ").concat(data.title ? '' : 'style="display: none;"', ">").concat(data.title || data.title == '' ? data.title : ' Coming Soon in Granite Bay!', "</h3> <br> <p class=\"subtitle\" data-ie=\"subtitle\" ").concat(data.subtitle ? '' : 'style="display: none;"', ">").concat(data.subtitle ? data.subtitle : '', "</p> </section> </div> </div>");
      break;

    case 7:
      template = "<div class=\"ssi-editor-body t7\" ie-template-type=\"7\" ".concat(ieBodyStyle, "> <div class=\"ie-div-bg\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[0].src : 'img/12.jpg', "\" alt=\"social share image\" class=\"ssi-editor-bg ").concat(data.images && parseInt(data.images[0].rotation) > 0 ? 'rotate' + data.images[0].rotation : '', "\" data-ie=\"img-1\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[0].position : 'center', "\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\", {\"rotate\":\"").concat(data.images ? data.images[0].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[0].position : ' middle'), "\"}]}'> </div> <div class=\"row row-xs\"> <div class=\"col-xs-4\"> <div class=\"ie-div mt5\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[1].src : 'img/2.jpg', "\" alt=\"share image\" class=\"img img-1 ").concat(data.images && parseInt(data.images[1].rotation) > 0 ? 'rotate' + data.images[1].rotation : '', "\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[1].position : 'center', "\" data-ie=\"img-2\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\",{\"rotate\":\"").concat(data.images ? data.images[1].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[1].position : ' middle'), "\"}]}'> </div> </div> <div class=\"col-xs-4 pl0\"> <div class=\"ie-div mt5\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[2].src : 'img/3.jpg', "\" alt=\"share image\" class=\"img img-1 ").concat(data.images && parseInt(data.images[2].rotation) > 0 ? 'rotate' + data.images[2].rotation : '', "\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[2].position : 'center', "\" data-ie=\"img-3\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\",{\"rotate\":\"").concat(data.images ? data.images[2].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[2].position : ' middle'), "\"}]}'> </div> </div> <div class=\"col-xs-4 pl0\"> <div class=\"ie-div mt5\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"").concat(data.images ? data.images[3].src : 'img/4.jpg', "\" alt=\"share image\" class=\"img img-1 ").concat(data.images && parseInt(data.images[3].rotation) > 0 ? 'rotate' + data.images[3].rotation : '', "\" style=\" --ie-bg-img-position: ").concat(data.images ? data.images[3].position : 'center', "\" data-ie=\"img-4\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\",{\"rotate\":\"").concat(data.images ? data.images[3].rotation : 0, "\"},{\"position\":\"").concat(ssieImgPosition(data.images ? data.images[3].position : ' middle'), "\"}]}'> <div class=\"fixed-middle-text\"><span>").concat(data.moreImgNb ? '+' + data.moreImgNb : '+38', "</span></div> </div> </div> </div> <div class=\"ssi-editor-content\" ").concat(ssieTextPosition(data.textPosition == 'bottom' ? "top" : data.textPosition), " data-ie=\"content\" data-ie-controls='{\"type\":\"content\", \"controls\": [\"m-text\",{\"position\":\"").concat(data.textPosition ? data.textPosition == 'bottom' ? "top" : data.textPosition : 'top', "\"},\"hide\"], \"align\" :\"right\"}'> <section> <h3 class=\"title\" data-ie=\"title\" ").concat(data.title ? '' : 'style="display: none;"', ">").concat(data.title || data.title == '' ? data.title : ' Coming Soon in Granite Bay!', "</h3> <br> <p class=\"subtitle\" data-ie=\"subtitle\" ").concat(data.subtitle ? '' : 'style="display: none;"', ">").concat(data.subtitle ? data.subtitle : '', "</p> </section> </div> </div>");
      break;
  }

  if (!template) template = "<div class=\"ssi-editor-body\"> <img onerror=\"this.onerror=null; this.src = 'img/no-image-available.jpg'\" src=\"img/1.jpg\" alt=\"share image\" class=\"ssi-editor-bg\" data-ie=\"img-1\" data-ie-controls='{\"type\":\"img\", \"controls\": [\"m-gallery\", {\"rotate\":\"0\"},{\"position\":\"middle\"}]}'> <div class=\"ssi-editor-content\" data-ie=\"content\" data-ie-controls='{\"type\":\"content\", \"controls\": [\"m-text\",{\"position\":\"bottom\"},\"hide\"]}'> <section class=\"banner\"> <h3 data-ie=\"title\" class=\"title\">Coming Soon in Granite Bay!</h3> <p data-ie=\"subtitle\" class=\"subtitle\">Click or Text 10002 to 256748 for Photos & Details!</p> </section> </div> </div>";
  return template;
} // generate png image from data


function generateImageDynamic(data) {
  var templateNb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'facebook';
  var temBody = ssieGenTemplateBody(data, parseInt(templateNb) || data.template || 1); // console.log('temBody!', temBody);

  var prod = "<div class=\"ssi-editor ssi-editor-prod ".concat(type && type == 'instagram' ? 'instagram' : '', "\"> ").concat(temBody, " </div>"); // console.log('node!', prod);

  var node = document.createElement('div');
  node.innerHTML = prod; // specific style for each type

  var spStyle = type === 'facebook' ? 'height: 628px; margin-top: 157px' : 'height:1200px; margin-top: 300px;';
  node.setAttribute('style', spStyle + '; width: 1200px; display: block; position: relative;');
  return node; // console.log('NODE:', node)
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
} // get template data from editor


function ssieGetTemplateData(imgEditor) {
  var templateData = {
    template: parseInt(imgEditor.find('[ie-template-type]').attr('ie-template-type')) || 0,
    colors: {
      primary: imgEditor.find('[data-ie-edit="primaryColor"]').spectrum('get').toRgbString() || '#111',
      secondary: imgEditor.find('[data-ie-edit="secondaryColor"]').spectrum('get').toRgbString() || '#fff'
    },
    font: imgEditor.find('[data-ie-edit="fontFamily"]').val() || "Avenir " + ", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Open Sans', 'Helvetica Neue', sans-serif",
    title: imgEditor.find('[data-ie="title"]').text() || '',
    subtitle: imgEditor.find('[data-ie="subtitle"]').text() || '',
    textPosition: 'bottom'
  }; // text position

  var controls = JSON.parse(imgEditor.find('[data-ie="content"]').attr('data-ie-controls')).controls;
  controls.forEach(function (el) {
    if (el.position) {
      templateData.textPosition = el.position || 'bottom';
    }
  }); // images

  var tImages = imgEditor.find('[data-ie*="img-"]:not([data-ie="img-profile"])');
  templateData.images = [];
  tImages.toArray().forEach(function (img) {
    var controls = JSON.parse($(img).attr('data-ie-controls')).controls;
    var rotate = 0,
        position = 'center';
    controls.forEach(function (el) {
      if (el.rotate != undefined) rotate = el.rotate;

      if (el.position) {
        position = el.position;
        position = position == 'top' ? position = 'left top' : position == 'bottom' ? position = 'right bottom' : position = 'center';
      }
    });

    switch ($(img).attr('data-ie')) {
      case 'img-1':
        templateData.images.unshift({
          src: img.src || '',
          position: position,
          rotation: rotate
        });
        break;

      case 'img-2':
        templateData.images.splice(1, 0, {
          src: img.src || '',
          position: position,
          rotation: rotate
        });
        break;

      case 'img-3':
        templateData.images.splice(2, 0, {
          src: img.src || '',
          position: position,
          rotation: rotate
        });
        break;

      case 'img-4':
        templateData.images.splice(3, 0, {
          src: img.src || '',
          position: position,
          rotation: rotate
        });
        break;

      default:
        templateData.images.push({
          src: img.src || '',
          position: position,
          rotation: rotate
        });
        break;
    }
  }); // profile picture

  if (imgEditor.find('[data-ie="img-profile"]').length > 0) {
    var controls = JSON.parse(imgEditor.find('[data-ie="img-profile"]').attr('data-ie-controls')).controls;
    var rotate = 0,
        position = 'center';
    controls.forEach(function (el) {
      if (el.rotate != undefined) rotate = el.rotate;

      if (el.position) {
        position = el.position;
        position = position == 'top' ? position = 'left top' : position == 'bottom' ? position = 'right bottom' : position = 'center';
      }
    });
    templateData.agent = {
      src: imgEditor.find('[data-ie="img-profile"]')[0].src || '',
      position: position,
      rotation: rotate
    };
  }

  return templateData;
}
"use strict";

/*
This script on medium to smaller screen : 
it adds .nav-tabs .nav-tabs-mobile-fix classes and removes .nav-pills .nav-stacked classes from .nav-stacked
*/
$(document).ready(function () {
  // nav-tabs-mobile-fix
  function tabFix() {
    if ($(window).width() < 768) {
      $('.nav-stacked').removeClass('nav-pills nav-stacked').addClass('nav-tabs nav-tabs-mobile-fix');
    } else {
      $('.nav-tabs-mobile-fix').addClass('nav-pills nav-stacked').removeClass('nav-tabs');
    }
  }

  tabFix();
  $(window).resize(function () {
    tabFix();
  });
});
"use strict";

/*
This script gives up multiple options to use and change from colors, bg colors, font families of a specified element, it makes it look like you are editing the specific element
There are multiple use of it:
always add data-theme="themePreview" to the element you want to apply changes on
always use spectrumJs classes under the inputs so you can see the colors you are changing

if you want to change the bg color :
- add data-theme="themeColorBg" to the input that changes the bg color

if you want to change nav color:
- add data-theme="themeNav1/2" to the input that changes the nav color (1 for the left side and 2 for the right side of the nav)
- add data-theme="themePreviewNav" to the element you want changes to apply to

if you want to change button color:
- add data-theme="themeColorBtn" to the input that changes the button color
- add data-theme="themePreviewBtn" to the element you want changes to apply to

if you want to change status color:
- add data-theme="themeColorStatus" to the input that changes the status color
- add data-theme="themePreviewStatus" to the element you want changes to apply to

if you want to change border color:
- add data-theme="themeColorBorder" to the input that changes the border color
- add data-theme="themePreviewBorder" to the element you want changes to apply to

if you want to change banner color:
- add data-theme="themeImageBanner" to the input that changes the banner color

if you want to add font-family options:
- add data-theme="themePreviewFontFamily" to select
- inside the select add multiple options with values = to the font family you want
*/
// convert rgb to hex color
function rgb2hex(orig) {
  var rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+)/i);
  return rgb && rgb.length === 4 ? "#" + ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) + ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : orig;
} // Darken or lighten a hex color


function LightenDarkenColor(col, amt) {
  var usePound = false;

  if (col[0] == "#") {
    col = col.slice(1);
    usePound = true;
  }

  var R = parseInt(col.substring(0, 2), 16);
  var G = parseInt(col.substring(2, 4), 16);
  var B = parseInt(col.substring(4, 6), 16); // to make the colour less bright than the input
  // change the following three "+" symbols to "-"

  R += amt;
  G += amt;
  B += amt;
  if (R > 255) R = 255;else if (R < 0) R = 0;
  if (G > 255) G = 255;else if (G < 0) G = 0;
  if (B > 255) B = 255;else if (B < 0) B = 0;
  var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);
  return (usePound ? "#" : "") + RR + GG + BB;
} // Return black or white color depending on a hex color


function invertColor(hex, bw) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  } // convert 3-digit hex to 6-digits.


  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }

  var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);

  if (bw) {
    return r * 0.299 + g * 0.587 + b * 0.114 > 160 ? '#000000' : '#FFFFFF';
  } // invert color components


  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16); // pad each with zeros and return

  return "#" + padZero(r) + padZero(g) + padZero(b);
} // Calculations for the first color


function themeColorBg(el, bool) {
  var bodyBg;
  var cardBg;
  var tableStriped;
  var tableHover;

  if (bool) {
    bodyBg = el.toRgbString();
  } else {
    bodyBg = el;
  }

  if (bodyBg) {
    var convertRgbToHex = rgb2hex(bodyBg);
    var invertTheColor = invertColor(convertRgbToHex, true);
    cardBg = LightenDarkenColor(convertRgbToHex, 10);

    if (invertTheColor.toString() === '#000000') {
      tableStriped = LightenDarkenColor(convertRgbToHex, -10);
      tableHover = LightenDarkenColor(convertRgbToHex, -20);
      $('[data-theme="themePreview"] .theme-preview-heading').css('color', '#212529');
      $('[data-theme="themePreview"]').css('color', '#484848');
      $('[data-theme="themePreview"] .theme-preview-link').css('color', '#212529');
      $('[data-theme="body-color"]').val('#484848');
      $('[data-theme="headings-color"]').val('#212529');

      if ($('[data-logo-default]').length > 0) {
        if ($('[data-theme="themePreview-logo"]').attr('data-logo-default').length > 0) $('[data-theme="themePreview-logo"]').attr('src', $('[data-theme="themePreview-logo"]').attr('data-logo-default'));
      }
    } else {
      tableStriped = LightenDarkenColor(convertRgbToHex, 10);
      tableHover = LightenDarkenColor(convertRgbToHex, 20);
      $('[data-theme="themePreview"] .theme-preview-heading').css('color', '#fff');
      $('[data-theme="themePreview"]').css('color', '#f5f5f5');
      $('[data-theme="themePreview"] .theme-preview-link').css('color', '#fff');
      $('[data-theme="body-color"]').val('#f5f5f5');
      $('[data-theme="headings-color"]').val('#fff');

      if ($('[data-logo-darker]').length > 0) {
        if ($('[data-theme="themePreview-logo"]').attr('data-logo-darker').length > 0) $('[data-theme="themePreview-logo"]').attr('src', $('[data-theme="themePreview-logo"]').attr('data-logo-darker'));
      }
    }

    $('[data-theme="themePreview"]').css('background-color', bodyBg);
    $('[data-theme="themePreviewCard"]').css('background-color', cardBg);
    $('[data-theme="body-bg"]').val(bodyBg);
    $('[data-theme="card-bg"]').val(cardBg);
    $('[data-theme="table-striped"]').val(tableStriped);
    $('[data-theme="table-hover"]').val(tableHover);
  }
} // Calculations for the second color


function themeColorNav1(el, bool) {
  var themePreviewNav1;

  if (bool) {
    themePreviewNav1 = el.toRgbString();
  } else {
    themePreviewNav1 = el;
  }

  if (themePreviewNav1) {
    var themePreviewNav2 = $('[data-theme="themeColorNav2"]').siblings('.sp-replacer').find('.sp-preview-inner').css('background-color');
    var navbarGradientBg = 'linear-gradient(to right, ' + themePreviewNav1 + ', ' + themePreviewNav2 + ')';
    var convertRgbToHex = rgb2hex(themePreviewNav1);
    var invertTheColor = invertColor(convertRgbToHex, true);
    $('[data-theme="themePreviewNav"] span').css('color', invertTheColor);
    $('[data-theme="navbar-link-color"]').val(invertTheColor);

    if (invertTheColor.toString() === '#000000') {
      $('[data-theme="navbar-link-hover-color"]').val('#555555');
    } else {
      $('[data-theme="navbar-link-hover-color"]').val('#eeeeee');
    }

    if (themePreviewNav1 === themePreviewNav2) {
      $('[data-theme="themePreviewNav"]').css('background', themePreviewNav1);
      $('[data-theme="navbar-bg"]').val(themePreviewNav1);
    } else {
      $('[data-theme="themePreviewNav"]').css('background', navbarGradientBg);
      $('[data-theme="navbar-bg"]').val(navbarGradientBg);
    }
  }
} // Calculations for the third color


function themeColorNav2(el, bool) {
  var themePreviewNav2;

  if (bool) {
    themePreviewNav2 = el.toRgbString();
  } else {
    themePreviewNav2 = el;
  }

  if (themePreviewNav2) {
    var themePreviewNav1 = $('[data-theme="themeColorNav1"]').siblings('.sp-replacer').find('.sp-preview-inner').css('background-color');
    var navbarGradientBg = 'linear-gradient(to right, ' + themePreviewNav1 + ', ' + themePreviewNav2 + ')';

    if (themePreviewNav1 === themePreviewNav2) {
      $('[data-theme="themePreviewNav"]').css('background', themePreviewNav2);
      $('[data-theme="navbar-bg"]').val(themePreviewNav2);
    } else {
      $('[data-theme="themePreviewNav"]').css('background', navbarGradientBg);
      $('[data-theme="navbar-bg"]').val(navbarGradientBg);
    }
  }
} // Calculations for the fourth color


function themeColorBtn(el, bool) {
  var bgColor;
  var bgDark;
  var bgDarker;

  if (bool) {
    bgColor = el.toRgbString();
  } else {
    bgColor = el;
  }

  if (bgColor) {
    var convertRgbToHex = rgb2hex(bgColor);
    var textColor = invertColor(convertRgbToHex, true);

    if (textColor.toString() === '#000000') {
      bgDark = LightenDarkenColor(convertRgbToHex, -20);
      bgDarker = LightenDarkenColor(convertRgbToHex, -40);
    } else {
      bgDark = LightenDarkenColor(convertRgbToHex, 20);
      bgDarker = LightenDarkenColor(convertRgbToHex, 40);
    }

    $('[data-theme="themePreviewBtn"]').css({
      'background-color': bgColor,
      'border-color': bgDark,
      'color': textColor
    });
    $('[data-theme="btn-bg"]').val(bgColor);
    $('[data-theme="btn-border"]').val(bgDark);
    $('[data-theme="btn-color"]').val(textColor);
    $('[data-theme="btn-bg-hover"]').val(bgDark);
    $('[data-theme="btn-border-hover"]').val(bgDarker);
  }
} // Calculations for the fifth color


function themeColorStatus(el, bool) {
  var statusBg;

  if (bool) {
    statusBg = el.toRgbString();
  } else {
    statusBg = el;
  }

  if (statusBg) {
    var convertRgbToHex = rgb2hex(statusBg);
    var statusColor = invertColor(convertRgbToHex, true);
    $('[data-theme="themePreviewStatus"]').css({
      'background-color': statusBg,
      'color': statusColor
    });
    $('[data-theme="status-bg"]').val(statusBg);
    $('[data-theme="status-color"]').val(statusColor);
  }
} // Calculations for the sixth color


function themeColorBorder(el, bool) {
  var borderColor;
  var borderColorFocus;

  if (bool) {
    borderColor = el.toRgbString();
  } else {
    borderColor = el;
  }

  if (borderColor) {
    $('[data-theme="themePreviewBorder"]').css('border-color', borderColor);
    $('[data-theme="themePreviewCard"]').css('border-color', borderColor);
    $('[data-theme="themePreviewNav"]').css('border-color', borderColor);
    var convertRgbToHex = rgb2hex(borderColor);
    var invertTheColor = invertColor(convertRgbToHex, true);

    if (invertTheColor.toString() === '#000000') {
      borderColorFocus = LightenDarkenColor(convertRgbToHex, -20);
    } else {
      borderColorFocus = LightenDarkenColor(convertRgbToHex, 20);
    }

    $('[data-theme="border-color-base"]').val(borderColor);
    $('[data-theme="border-color-focus"]').val(borderColorFocus);
  }
} // Determining the font family


function themeFontFamily(el) {
  if (el.val() === 'proxima-nova') {
    $('[data-theme="themePreview"]').addClass('ff-proxima-nova').removeClass('ff-montserrat ff-default ff-avenir-next ff-avenir ff-futura-pt');
    $('[data-theme="body-font-family"]').val("'proxima-nova'");
    $('[data-theme="theme-fontFamily"]').val('proxima-nova');
    $('[data-theme="themePreviewFontFamily"]').find('option').attr('selected', false);
    $('[data-theme="themePreviewFontFamily"]').find('option[value="proxima-nova"]').attr('selected', true);
    $('[data-theme="themePreviewFontFamily"]').val('proxima-nova');
  } else if (el.val() === 'futura-pt') {
    $('[data-theme="themePreview"]').addClass('ff-futura-pt').removeClass('ff-montserrat ff-proxima-nova ff-avenir-next ff-avenir ff-default');
    $('[data-theme="body-font-family"]').val("'futura-pt'");
    $('[data-theme="theme-fontFamily"]').val('futura-pt');
    $('[data-theme="themePreviewFontFamily"]').find('option').attr('selected', false);
    $('[data-theme="themePreviewFontFamily"]').find('option[value="futura-pt"]').attr('selected', true);
    $('[data-theme="themePreviewFontFamily"]').val('futura-pt');
  } else if (el.val() === 'avenir-next') {
    $('[data-theme="themePreview"]').addClass('ff-avenir-next').removeClass('ff-montserrat ff-proxima-nova ff-avenir ff-default ff-futura-pt');
    $('[data-theme="body-font-family"]').val("'Avenir Next'");
    $('[data-theme="theme-fontFamily"]').val('avenir-next');
    $('[data-theme="themePreviewFontFamily"]').find('option').attr('selected', false);
    $('[data-theme="themePreviewFontFamily"]').find('option[value="avenir-next"]').attr('selected', true);
    $('[data-theme="themePreviewFontFamily"]').val('avenir-next');
  } else if (el.val() === 'montserrat') {
    $('[data-theme="themePreview"]').addClass('ff-montserrat').removeClass('ff-proxima-nova ff-avenir-next ff-avenir ff-default ff-futura-pt');
    $('[data-theme="body-font-family"]').val("'montserrat'");
    $('[data-theme="theme-fontFamily"]').val('montserrat');
    $('[data-theme="themePreviewFontFamily"]').find('option').attr('selected', false);
    $('[data-theme="themePreviewFontFamily"]').find('option[value="montserrat"]').attr('selected', true);
    $('[data-theme="themePreviewFontFamily"]').val('montserrat');
  } else if (el.val() === 'avenir') {
    $('[data-theme="themePreview"]').addClass('ff-avenir').removeClass('ff-montserrat ff-proxima-nova ff-avenir-next ff-default ff-futura-pt');
    $('[data-theme="body-font-family"]').val("'Avenir'");
    $('[data-theme="theme-fontFamily"]').val('avenir');
    $('[data-theme="themePreviewFontFamily"]').find('option').attr('selected', false);
    $('[data-theme="themePreviewFontFamily"]').find('option[value="avenir"]').attr('selected', true);
    $('[data-theme="themePreviewFontFamily"]').val('avenir');
  } else if (el.val() === 'default') {
    $('[data-theme="themePreview"]').addClass('ff-default').removeClass('ff-montserrat ff-proxima-nova ff-avenir-next ff-avenir ff-futura-pt');
    $('[data-theme="body-font-family"]').val("'Arial'");
    $('[data-theme="theme-fontFamily"]').val('default');
    $('[data-theme="themePreviewFontFamily"]').find('option').attr('selected', false);
    $('[data-theme="themePreviewFontFamily"]').find('option[value="default"]').attr('selected', true);
    $('[data-theme="themePreviewFontFamily"]').val('default');
  }
}

function settingTheTheme() {
  var color1 = $('[data-theme="theme-color-1"]').val(),
      color2 = $('[data-theme="theme-color-2"]').val(),
      color3 = $('[data-theme="theme-color-3"]').val(),
      color4 = $('[data-theme="theme-color-4"]').val(),
      color5 = $('[data-theme="theme-color-5"]').val(),
      color6 = $('[data-theme="theme-color-6"]').val(),
      colorText = $('[data-theme="theme-colorText"]').val(),
      fontFamily = $('[data-theme="theme-fontFamily"]'),
      name = $('[data-theme="theme-name"]').val();

  if (name !== undefined) {
    name = name.replace(/-/g, ' ');
  } // image banner color


  var imageBannerColor = name == 'Realty One' ? color4 : color5;
  $('#themePreviewPredefined').find('[data-theme="name"]').text(name);
  $('#themePreviewPredefined').find('[data-theme="span-1"]').css('background-color', color1);
  $('#themePreviewPredefined').find('[data-theme="span-2"]').css('background-color', color2);
  $('#themePreviewPredefined').find('[data-theme="span-3"]').css('background-color', color3);
  $('#themePreviewPredefined').find('[data-theme="span-4"]').css('background-color', color4);
  $('#themePreviewPredefined').find('[data-theme="span-5"]').css('background-color', color5);
  $('#themePreviewPredefined').find('[data-theme="span-6"]').css('background-color', color6);
  $('[data-theme="themeColorBg"]').spectrum('set', color1);
  $('[data-theme="themeColorNav1"]').spectrum('set', color2);
  $('[data-theme="themeColorNav2"]').spectrum('set', color3);
  $('[data-theme="themeColorBtn"]').spectrum('set', color4);
  $('[data-theme="themeColorStatus"]').spectrum('set', color5);
  $('[data-theme="themeColorBorder"]').spectrum('set', color6);
  $('[data-theme="themeImageBanner"]').spectrum('set', imageBannerColor);
  themeColorBg(color1, false);
  themeColorNav1(color2, false);
  themeColorNav2(color3, false);
  themeColorBtn(color4, false);
  themeColorStatus(color5, false);
  themeColorBorder(color6, false);
  themeFontFamily(fontFamily);

  if (colorText === 'dark') {
    $('[data-theme="body-color"]').val('#f5f5f5');
    $('[data-theme="headings-color"]').val('#fff');
  } else if (colorText === 'light') {
    $('[data-theme="body-color"]').val('#484848');
    $('[data-theme="headings-color"]').val('#212529');
  }
} // color picker initialization


$('[data-theme="themeColorBg"]').spectrum({
  showAlpha: false,
  showButtons: false,
  showInput: true,
  showInitial: true,
  preferredFormat: 'rgb',
  showPalette: true,
  palette: [['#ffffff', '#B2ABA3', '#919295', '#666666'], ['#474c59', '#6C6256', '#ADA485', '#000000'], ['#EAE3D4', '#FF0000', '#fb3e5e', '#ab2328'], ['#f48024', '#FF5F00', '#61367a', '#552448'], ['#521F1E', '#769CCD', '#007cc2', '#4B7076'], ['#81D8D0', '#58c887', '#ABB400', '#BADA55']],
  move: function move(color) {
    themeColorBg(color, true);
    $('[data-theme="theme-color-1"]').val(color);
    $('[data-theme="theme-name"]').val('custom');
    $('#themePreviewPredefined').find('[data-theme="name"]').text('Custom');
    $('#themePreviewPredefined').find('[data-theme="span-1"]').css('background-color', color.toRgbString());
  },
  change: function change(color) {
    themeColorBg(color, true);
    $('[data-theme="theme-color-1"]').val(color);
    $('[data-theme="theme-name"]').val('custom');
    $('#themePreviewPredefined').find('[data-theme="name"]').text('Custom');
    $('#themePreviewPredefined').find('[data-theme="span-1"]').css('background-color', color.toRgbString());
  }
});
$('[data-theme="themeColorNav1"]').spectrum({
  showAlpha: false,
  showButtons: false,
  showInput: true,
  showInitial: true,
  preferredFormat: 'rgb',
  showPalette: true,
  palette: [['#ffffff', '#B2ABA3', '#919295', '#666666'], ['#474c59', '#6C6256', '#ADA485', '#000000'], ['#EAE3D4', '#FF0000', '#fb3e5e', '#ab2328'], ['#f48024', '#FF5F00', '#61367a', '#552448'], ['#521F1E', '#769CCD', '#007cc2', '#4B7076'], ['#81D8D0', '#58c887', '#ABB400', '#BADA55']],
  move: function move(color) {
    themeColorNav1(color, true);
    $('[data-theme="theme-color-2"]').val(color);
    $('[data-theme="theme-name"]').val('custom');
    $('#themePreviewPredefined').find('[data-theme="name"]').text('Custom');
    $('#themePreviewPredefined').find('[data-theme="span-2"]').css('background-color', color.toRgbString());
  },
  change: function change(color) {
    themeColorNav1(color, true);
    $('[data-theme="theme-color-2"]').val(color);
    $('[data-theme="theme-name"]').val('custom');
    $('#themePreviewPredefined').find('[data-theme="name"]').text('Custom');
    $('#themePreviewPredefined').find('[data-theme="span-2"]').css('background-color', color.toRgbString());
  }
});
$('[data-theme="themeColorNav2"]').spectrum({
  showAlpha: false,
  showButtons: false,
  showInput: true,
  showInitial: true,
  preferredFormat: 'rgb',
  showPalette: true,
  palette: [['#ffffff', '#B2ABA3', '#919295', '#666666'], ['#474c59', '#6C6256', '#ADA485', '#000000'], ['#EAE3D4', '#FF0000', '#fb3e5e', '#ab2328'], ['#f48024', '#FF5F00', '#61367a', '#552448'], ['#521F1E', '#769CCD', '#007cc2', '#4B7076'], ['#81D8D0', '#58c887', '#ABB400', '#BADA55']],
  move: function move(color) {
    themeColorNav2(color, true);
    $('[data-theme="theme-color-3"]').val(color);
    $('[data-theme="theme-name"]').val('custom');
    $('#themePreviewPredefined').find('[data-theme="name"]').text('Custom');
    $('#themePreviewPredefined').find('[data-theme="span-3"]').css('background-color', color.toRgbString());
  },
  change: function change(color) {
    themeColorNav2(color, true);
    $('[data-theme="theme-color-3"]').val(color);
    $('[data-theme="theme-name"]').val('custom');
    $('#themePreviewPredefined').find('[data-theme="name"]').text('Custom');
    $('#themePreviewPredefined').find('[data-theme="span-3"]').css('background-color', color.toRgbString());
  }
});
$('[data-theme="themeColorBtn"]').spectrum({
  showAlpha: false,
  showButtons: false,
  showInput: true,
  showInitial: true,
  preferredFormat: 'rgb',
  showPalette: true,
  palette: [['#ffffff', '#B2ABA3', '#919295', '#666666'], ['#474c59', '#6C6256', '#ADA485', '#000000'], ['#EAE3D4', '#FF0000', '#fb3e5e', '#ab2328'], ['#f48024', '#FF5F00', '#61367a', '#552448'], ['#521F1E', '#769CCD', '#007cc2', '#4B7076'], ['#81D8D0', '#58c887', '#ABB400', '#BADA55']],
  move: function move(color) {
    themeColorBtn(color, true);
    $('[data-theme="theme-color-4"]').val(color);
    $('[data-theme="theme-name"]').val('custom');
    $('#themePreviewPredefined').find('[data-theme="name"]').text('Custom');
    $('#themePreviewPredefined').find('[data-theme="span-4"]').css('background-color', color.toRgbString());
  },
  change: function change(color) {
    themeColorBtn(color, true);
    $('[data-theme="theme-color-4"]').val(color);
    $('[data-theme="theme-name"]').val('custom');
    $('#themePreviewPredefined').find('[data-theme="name"]').text('Custom');
    $('#themePreviewPredefined').find('[data-theme="span-4"]').css('background-color', color.toRgbString());
  }
});
$('[data-theme="themeColorStatus"]').spectrum({
  showAlpha: false,
  showButtons: false,
  showInput: true,
  showInitial: true,
  preferredFormat: 'rgb',
  showPalette: true,
  palette: [['#ffffff', '#B2ABA3', '#919295', '#666666'], ['#474c59', '#6C6256', '#ADA485', '#000000'], ['#EAE3D4', '#FF0000', '#fb3e5e', '#ab2328'], ['#f48024', '#FF5F00', '#61367a', '#552448'], ['#521F1E', '#769CCD', '#007cc2', '#4B7076'], ['#81D8D0', '#58c887', '#ABB400', '#BADA55']],
  move: function move(color) {
    themeColorStatus(color, true);
    $('[data-theme="theme-color-5"]').val(color);
    $('[data-theme="theme-name"]').val('custom');
    $('#themePreviewPredefined').find('[data-theme="name"]').text('Custom');
    $('#themePreviewPredefined').find('[data-theme="span-5"]').css('background-color', color.toRgbString());
  },
  change: function change(color) {
    themeColorStatus(color, true);
    $('[data-theme="theme-color-5"]').val(color);
    $('[data-theme="theme-name"]').val('custom');
    $('#themePreviewPredefined').find('[data-theme="name"]').text('Custom');
    $('#themePreviewPredefined').find('[data-theme="span-5"]').css('background-color', color.toRgbString());
  }
});
$('[data-theme="themeColorBorder"]').spectrum({
  showAlpha: false,
  showButtons: false,
  showInput: true,
  showInitial: true,
  preferredFormat: 'rgb',
  showPalette: true,
  palette: [['#ffffff', '#B2ABA3', '#919295', '#666666'], ['#474c59', '#6C6256', '#ADA485', '#000000'], ['#EAE3D4', '#FF0000', '#fb3e5e', '#ab2328'], ['#f48024', '#FF5F00', '#61367a', '#552448'], ['#521F1E', '#769CCD', '#007cc2', '#4B7076'], ['#81D8D0', '#58c887', '#ABB400', '#BADA55']],
  move: function move(color) {
    themeColorBorder(color, true);
    $('[data-theme="theme-color-6"]').val(color);
    $('[data-theme="theme-name"]').val('custom');
    $('#themePreviewPredefined').find('[data-theme="name"]').text('Custom');
    $('#themePreviewPredefined').find('[data-theme="span-6"]').css('background-color', color.toRgbString());
  },
  change: function change(color) {
    themeColorBorder(color, true);
    $('[data-theme="theme-color-6"]').val(color);
    $('[data-theme="theme-name"]').val('custom');
    $('#themePreviewPredefined').find('[data-theme="name"]').text('Custom');
    $('#themePreviewPredefined').find('[data-theme="span-6"]').css('background-color', color.toRgbString());
  }
});
$('[data-theme="themeImageBanner"]').spectrum({
  showAlpha: false,
  showButtons: false,
  showInput: true,
  showInitial: true,
  preferredFormat: 'rgb',
  showPalette: true,
  palette: [['#ffffff', '#B2ABA3', '#919295', '#666666'], ['#474c59', '#6C6256', '#ADA485', '#000000'], ['#EAE3D4', '#FF0000', '#fb3e5e', '#ab2328'], ['#f48024', '#FF5F00', '#61367a', '#552448'], ['#521F1E', '#769CCD', '#007cc2', '#4B7076'], ['#81D8D0', '#58c887', '#ABB400', '#BADA55']]
});
settingTheTheme();
$('.theme-preview-dropdown-menu [data-theme="link"]').each(function () {
  var name = $(this).find('[data-theme="name"]').text().replace(/\s+/g, '-');
  var colour1 = $(this).find('[data-theme="span-1"]').css('background-color');
  var colour2 = $(this).find('[data-theme="span-2"]').css('background-color');
  var colour3 = $(this).find('[data-theme="span-3"]').css('background-color');
  var colour4 = $(this).find('[data-theme="span-4"]').css('background-color');
  var colour5 = $(this).find('[data-theme="span-5"]').css('background-color');
  var colour6 = $(this).find('[data-theme="span-6"]').css('background-color');
  var themeSelected = $(this).find('.theme-preview-selected');
  themeSelected.attr('data-theme-name', name);
  themeSelected.attr('data-theme-color-1', colour1);
  themeSelected.attr('data-theme-color-2', colour2);
  themeSelected.attr('data-theme-color-3', colour3);
  themeSelected.attr('data-theme-color-4', colour4);
  themeSelected.attr('data-theme-color-5', colour5);
  themeSelected.attr('data-theme-color-6', colour6);
});
$('[data-theme="themePreviewFontFamily"]').change(function () {
  if ($('[data-theme="theme-fontFamily"]').val() !== $(this).val()) {
    $('#themePreviewPredefined').find('[data-theme="name"]').text('Custom');
  }

  themeFontFamily($(this));
});
$('[data-theme="link"]').on('click', function (e) {
  e.preventDefault();
  var themeSelected = $(this).find('.theme-preview-selected');
  $(this).find('input[type="radio"]').prop('checked', true);
  var name = themeSelected.attr('data-theme-name').toString();
  var colorText = themeSelected.attr('data-theme-colortext').toString();
  var fontFamily = themeSelected.attr('data-theme-fontfamily').toString();
  var colorBg = themeSelected.attr('data-theme-color-1').toString();
  var colorNav1 = themeSelected.attr('data-theme-color-2').toString();
  var colorNav2 = themeSelected.attr('data-theme-color-3').toString();
  var colorBtn = themeSelected.attr('data-theme-color-4').toString();
  var colorStatus = themeSelected.attr('data-theme-color-5').toString();
  var colorBorder = themeSelected.attr('data-theme-color-6').toString();
  $('[data-theme="theme-name"]').val(name);
  $('[data-theme="theme-colorText"]').val(colorText);
  $('[data-theme="theme-fontFamily"]').val(fontFamily);
  $('[data-theme="theme-color-1"]').val(colorBg);
  $('[data-theme="theme-color-2"]').val(colorNav1);
  $('[data-theme="theme-color-3"]').val(colorNav2);
  $('[data-theme="theme-color-4"]').val(colorBtn);
  $('[data-theme="theme-color-5"]').val(colorStatus);
  $('[data-theme="theme-color-6"]').val(colorBorder);
  settingTheTheme();
});
$('[data-type="thumbnail-select"]').click(function () {
  $('[data-type="thumbnail-select"]').removeClass('active');
  $(this).addClass('active');
  $(this).find('input:radio[name=theme]').prop('checked', true);
}); // End of Theme ====================================================================================================
"use strict";

/*
This script will show/hide sections based on if the checkbox is selected or not 
To use it:
- add data-toggle-chk="name" to the checkbox input
- add data-toggle-chk-target="name" to the element you want to show when the checkbox is selected, don't forget to add hidden/class attr to this element
*/
function toggleCheckbox(dataName) {
  dataName = $(dataName).attr('data-toggle-chk');
  $('[data-toggle-chk-target=' + dataName + ']').toggleClass('hidden');
}

$(document).on('change switchChange.bootstrapSwitch', '[data-toggle-chk]', function () {
  toggleCheckbox(this);
  $('[data-expand="true"]').trigger('change');
  $(window).trigger('resize');
});
"use strict";

// This script will active the avatar based on if it's clicked or not 
// To use it add data-name="avatar"
$(document).on('click', '[data-name="avatar"]', function (e) {
  e.preventDefault();
  $(this).toggleClass('active');
  var active = $(this).find('input');
  active.prop("checked", !active.prop("checked"));
});
"use strict";

/*
This script will show/hide sections based on if the button is clicked or not 
To use it :
- add data-toggle-btn="name" to the button
- add data-toggle-btn-target="name" to the element you want to show when the button is clicked, don't forget to add hidden attr/class to this element
*/
function toggleButton(dataName) {
  var target = '[data-toggle-btn-target="' + $(dataName).attr('data-toggle-btn') + '"]';
  $(target).toggleClass('hidden');
}

;
$(document).on('click', '[data-toggle-btn]', function (e) {
  e.preventDefault();
  toggleButton(this);
  $('[data-expand="true"]').trigger('change');
  $(window).trigger('resize');
});
"use strict";

/*
This script will show/hide sections based on if the radio is checked or not 
To use it :
- add data-toggle-radio="name" to the radio input 
- add data-toggle-radio-target="name" to the element you want to show when the radio is selected, don't forget to add hidden attr/class to this element
*/
function toggleRadio(dataName) {
  var radio = '[name="' + $(dataName).attr('name') + '"]';
  $(radio).each(function () {
    dataName = $(this).attr('data-toggle-radio');

    if ($(this).prop('checked')) {
      $('[data-toggle-radio-target=' + dataName + ']').removeAttr('hidden');
      $('[data-toggle-radio-target=' + dataName + ']').removeClass('hidden');
    } else {
      $('[data-toggle-radio-target=' + dataName + ']').addClass('hidden');
    }
  });
}

;
$(document).on('change', '[data-toggle-radio]', function () {
  toggleRadio(this);
  $('[data-expand="true"]').trigger('change');
  $(window).trigger('resize');
});
"use strict";

/*
This script will show/hide sections based on if the select is selected on or not 
To use it :
- add data-toggle-select="name" to the select input
- add data-toggle-select-target="name" to the element you want to show when we select an option, don't forget to add hidden attr/class to this element
*/
function toggleSelect(select) {
  var options = $(select).find('option[data-toggle-select]');
  var selectedOptions = options.filter(':selected');
  options.each(function (index, optionElement) {
    // turn hidden all targets
    var dataName = $(optionElement).attr('data-toggle-select');
    $('[data-toggle-select-target=' + dataName + ']').addClass('hidden');
  });
  selectedOptions.each(function (index, optionElement) {
    // turn show only selected options
    var dataName = $(optionElement).attr('data-toggle-select');
    $('[data-toggle-select-target=' + dataName + ']').removeClass('hidden');
  });
}

$('[data-toggle-select]').parent('select').change(function () {
  toggleSelect(this);
});
"use strict";

/*
This script allows the user to watch video by uploading the files, adding a URL or an embed code
There are multiple use of it :
always add .videoPreview class to the element yo want the video to be shown at

if the video is a file :
- add data-name="videoFileUpload" to the input
- add data-name="videoPreviewNative" to the element the video is shown at

if the video is a URL:
- add data-name="videoURL" to the input
- add data-name="videoPreviewURL" to the element the video is shown at

if the video is an embed code :
- add data-name="embedPreview" to the element the video is shown at
*/
// video Preview 
function videoPreview(url, type) {
  var embedVideo = '';

  if (type == 'mp4') {
    embedVideo += '<video playsinline loop muted controls> <source src="' + url + '" type="video/mp4"> </video>';
  } else if (type == 'youtube') {
    embedVideo += '<iframe type="text/html" class="embed-responsive-item" width="720" height="405" src="https://www.youtube.com/embed/' + url + '"  frameborder="0" allowfullscreen></iframe>';
  } else if (type == 'vimeo') {
    embedVideo += '<iframe class="embed-responsive-item" src="https://player.vimeo.com/video/' + url + '" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> ';
  }

  $('[data-name="videoPreviewURL"]').html(embedVideo);
} // Upload progress


function uploadProgress(input, progressbar, message) {
  var videoURL = URL.createObjectURL(input.files[0]),
      videoTYPE = input.files[0].type;
  $(progressbar).removeClass('hidden').find('.progress-bar').css('width', '0');
  $(message).text('');
  var filename = $(input).val().split('\\').pop().replace(/\.[^/.]+$/, "");
  var myfile = $(input).val();

  if (filename == '' || myfile == '') {
    alert('Please select file');
    return;
  }

  var formData = new FormData();
  formData.append('myfile', $(input)[0].files[0]);
  formData.append('filename', filename);
  $(message).text('Uploading in progress...');
  $.ajax({
    url: 'uploadscript.php',
    data: formData,
    processData: false,
    contentType: false,
    type: 'POST',
    // this part is progress bar
    xhr: function xhr() {
      var xhr = new window.XMLHttpRequest();
      xhr.upload.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
          var percentComplete = evt.loaded / evt.total;
          percentComplete = parseInt(percentComplete * 100);
          $(progressbar).find('.progress-bar').text(percentComplete + '%');
          $(progressbar).find('.progress-bar').css('width', percentComplete + '%');
          $(progressbar).find('.progress-bar').attr('aria-valuenow', percentComplete); // on success

          setTimeout(function () {
            $('[data-name="videoPreviewNative"]').html('<video controls muted playsinline> <source src="' + videoURL + '" type="' + videoTYPE + '"></video>');
          }, 900);
        }
      }, false);
      return xhr;
    },
    success: function success(data) {
      $(message).removeClass('text-info').addClass('text-success').text(data);
    },
    error: function error(err) {
      console.log(err);
    }
  });
}

$('[data-name="videoFileUpload"]').change(function () {
  var labelText = this.value.substr(12, this.value.length);
  $(this).siblings(".file-return").val(labelText);
  uploadProgress(this, '[data-name="videoProgress"]', '[data-name="videoUploadMsg"]');
});
$('[data-name="videoURL"]').on('input', function (e) {
  var url = $(this).val();
  var type = '';

  if (url.indexOf("youtube") >= 0) {
    url = $(this).val().split('?v=')[1].replace(/\s/g, '');
    $('[data-name="videoMessage"]').removeClass('text-danger').addClass('text-info').html('<svg viewBox="0 0 24 24" class="icon"><use href="img/icons.svg#icon-youtube"></use></svg> Youtube');
    $('[name="videoType"]').val('youtube');
    type = 'youtube';
  } else if (url.indexOf("youtu.be") >= 0) {
    url = $(this).val().split('.be/')[1].replace(/\s/g, '');
    $('[data-name="videoMessage"]').removeClass('text-danger').addClass('text-info').html('<svg viewBox="0 0 24 24" class="icon"><use href="img/icons.svg#icon-youtube"></use></svg> Youtube');
    type = 'youtube';
  } else if (url.indexOf("vimeo") >= 0) {
    url = $(this).val().split('vimeo.com/')[1].replace(/\s/g, '');

    if (url.indexOf("channels/staffpicks/") >= 0) {
      url = $(this).val().split('channels/staffpicks/')[1].replace(/\s/g, '');
    }

    $('[data-name="videoMessage"]').removeClass('text-danger').addClass('text-info').html('<svg viewBox="0 0 24 24" class="icon"><use href="img/icons.svg#icon-video"></use></svg> Vimeo');
    type = 'vimeo';
  } else if (url.indexOf(".mp4") >= 0) {
    url = $(this).val().replace(/\s/g, '');
    $('[data-name="videoMessage"]').removeClass('text-danger').addClass('text-info').html('<svg viewBox="0 0 24 24" class="icon"><use href="img/icons.svg#icon-video"></use></svg> MP4');
    type = 'mp4';
  } else {
    $('[data-name="videoMessage"]').addClass('text-danger').removeClass('text-info').text('Please enter a valid YouTube, Vimeo or MP4 link');
  }

  $('[name="videoType"]').val(type);
  $('[name="videoURL"]').val(url);
  videoPreview(url, type);
}); // on autoplay/mute alert message

$('[data-name="videoAutoplay"], [data-name="videoMute"]').change(function () {
  if ($('[data-name="videoAutoplay"]').prop("checked") && !$('[data-name="videoMute"]').prop("checked")) $('[data-name="autoplayMessage"]').removeAttr('hidden');else $('[data-name="autoplayMessage"]').attr('hidden', '');
}); // End of Video Tab scripts