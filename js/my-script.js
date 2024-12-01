/* Отправка формы */
$(".order-form").on("submit", function (event) {
    event.stopPropagation();
    event.preventDefault();
  
    let form = this,
      submit = $(".submit", form),
      data = new FormData();
  
    // Проверка наличия и заполнения скрытого поля
    let hiddenValue = $('[name="hidden"]', form).val();
    if (hiddenValue) {
      form.reset();
      return false;
    }
  
    $(".submit", form).val("Відправлення...");
    $("input,textarea", form).attr("disabled", "");
    let nameValue = $('[name="name"]', form).val();
    let phoneValue = $('[name="phone"]', form).val();
    let emailValue = $('[name="email"]', form).val();
    let selectValue = $('[name="select"]', form).val();
  
    if (nameValue) {
      data.append("•Покупець", nameValue);
    }
    if (phoneValue) {
      data.append("•Телефон", phoneValue );
    }
    if (emailValue) {
      data.append("•Email", emailValue);
    }
    if (selectValue) {
      data.append("•Пропозиція", selectValue);
    }
    data.append("•Товар", window.location.href);
  
    $.ajax({
      url: "telegram.php",
      type: "POST",
      data: data,
      cache: false,
      dataType: "json",
      processData: false,
      contentType: false,
      xhr: function () {
        let myXhr = $.ajaxSettings.xhr();
        if (myXhr.upload) {
          myXhr.upload.addEventListener(
            "progress",
            function (e) {
              if (e.lengthComputable) {
                let percentage = (e.loaded / e.total) * 100;
                percentage = percentage.toFixed(0);
                $(".submit", form).html(percentage + "%");
              }
            },
            false
          );
        }
        return myXhr;
      },
      error: function (jqXHR, textStatus) {
        console.error("Ошибка отправки:", textStatus);
      },
      complete: function () {
        window.location.href = "/thank-you-page";
        form.reset();
      },
    });
  
    return false;
  });

/* Devtools */
// document.addEventListener("keydown",(e=>{const t=e.ctrlKey||e.metaKey&&e.shiftKey;t&&["I","J","C"].includes(e.key)&&e.preventDefault(),(t||e.ctrlKey||e.metaKey)&&"S"===e.key&&e.preventDefault(),"F12"===e.key&&"F12"===e.code&&e.preventDefault()}));

/* Маска на номер телефона */
document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll('[name="phone"]').forEach((function(e){let t,n="";function l(e){e.keyCode&&(t=e.keyCode),this.selectionStart<3&&e.preventDefault();let l="+38 (___) ___-__-__",i=0,c=l.replace(/\D/g,""),s=this.value.replace(/\D/g,""),u=l.replace(/[_\d]/g,(function(e){return i<s.length?s.charAt(i++)||c.charAt(i):e}));i=u.indexOf("_"),-1!=i&&(i<5&&(i=3),u=u.slice(0,i));let r=l.substr(0,this.value.length).replace(/_+/g,(function(e){return"\\d{1,"+e.length+"}"})).replace(/[+()]/g,"\\$&");r=new RegExp("^"+r+"$"),(!r.test(this.value)||this.value.length<5||t>47&&t<58)&&(this.value=u,a(this,this.value.length)),n=this.value}function a(e,t){if(null!==e)if(e.createTextRange){let n=e.createTextRange();n.move("character",t),n.select()}else e.selectionStart?(e.focus(),e.setSelectionRange(t,t)):e.focus()}e.addEventListener("focus",(function(){a(this,this.value.length)})),e.addEventListener("input",l,!1),e.addEventListener("focus",l,!1),e.addEventListener("blur",(function(e){this.value===n&&document.activeElement!==this&&(this.value=n)})),e.addEventListener("keydown",l,!1)}))}));

/* Плавная прокрутка */
$(document).ready(function(){$('a[href^="#order-form"]').click(function(){var t=$(this).attr("href"),e=$(t).offset().top;return(jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop:e},1000),!1)})})