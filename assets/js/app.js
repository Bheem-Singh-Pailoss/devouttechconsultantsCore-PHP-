$(function () {
    // Country State Functionalty 
    $("#country-error-filed").change(function () {
        $('#state-error-filed').removeAttr("disabled")
        var element = $(this).find('option:selected');
        var countryId = element.attr("data-id");
        console.log(countryId);
        $.post("ajex_call.php", { getStatesByCountry: 'getStatesByCountry', countryId: countryId }, function (response) {
            var data = response.split('^');
            var stateData = data[1];
            $("#state-error-filed").html(stateData);
        });

    });

    // State Counrty Functrionaly 
    $("#state-error-filed").change(function () {
        $('#city-error-filed').removeAttr("disabled")
        var element = $(this).find('option:selected');
        var stateId = element.attr("data-id");
        $.post("ajex_call.php", { getCityByState: 'getCityByState', stateId: stateId }, function (response) {
            var data = response.split('^');
            var cityData = data[1];
            $("#city-error-filed").html(cityData);
        });

    });





});

// 
$("#form_submition").submit(function (e) {
    e.preventDefault(); // avoid to execute the actual submit of the form.
    $.ajax({
        type: "POST",
        url: "ajex_call.php",
        contentType: false,
        data: new FormData(this),
        cache: false,
        processData: false,
        dataType: 'json',
        beforeSend: function () {
            run_waitMe($('#container > form'), 1, 'ios');
        }, success: function (data) {
            // console.log(data.status);
            
            if (data.status == 'false') {
                // console.log(data.errors);
                var errors = data.errors;
                console.log(errors);
                $.each(errors, function (index, value) {
                    $("#" + index + "-error").text(value);

                });
            } else {
                var message = data.message;
                


            }


        }, error: function (xhr) {

        },
        complete: function () {
            $('#container > form').waitMe('hide');
        }
    });

});



var imgUpload = document.getElementById('upload-img')
    , imgPreview = document.getElementById('img-preview')
    , imgUploadForm = document.getElementById('form-upload')
    , totalFiles
    , previewTitle
    , previewTitleText
    , img;

imgUpload.addEventListener('change', previewImgs, true);

function previewImgs(event) {
    totalFiles = imgUpload.files.length;

    if (!!totalFiles) {
        imgPreview.classList.remove('img-thumbs-hidden');
    }
var image_list  = ['jpg','jpeg','png'];
    for (var i = 0; i < totalFiles; i++) {
        var type =event.target.files[i].type.split('/')[0];
        console.log(type);
        var extention =event.target.files[i].type.split('/')[1];
        console.log(extention);
        if (type == '' ||extention =='undefined' ) {
            $('#image_priew_errors').text('Please Add the Correct image Formet');
        }else if (type == 'image') {
            if ($.inArray(extention, image_list) >= 0) {
        wrapper = document.createElement('div');
        wrapper.classList.add('wrapper-thumb');
        removeBtn = document.createElement("span");
        nodeRemove = document.createTextNode('x');
        removeBtn.classList.add('remove-btn');
        removeBtn.appendChild(nodeRemove);
        img = document.createElement('img');
        img.src = URL.createObjectURL(event.target.files[i]);
        img.classList.add('img-preview-thumb');
        wrapper.appendChild(img);
        wrapper.appendChild(removeBtn);
        imgPreview.appendChild(wrapper);
          $('.remove-btn').click(function () {
            $(this).parent('.wrapper-thumb').remove();
        });
            } else {
                Fnon.Hint.Danger('Allowed only files with extension (jpg, png)',{
                    position: 'right-top',
                    fontSize: '14px',
                    width: '300px',
                    title:'Image Error ',
                    callback:function(){
                      //do something
                    }
                });
            }
        }else{
            $('#image_priew_errors').text('');
            Fnon.Hint.Danger('Please Select Vaid Image Formet',{
                position: 'right-top',
                fontSize: '14px',
                width: '300px',
                title:'Image Error ',
                callback:function(){
                  //do something
                }
            });
        }
       
      

      

    }


}


// Function Used In Jqueru 


function run_waitMe(el, num, effect) {
    text = 'Please wait...';
    fontSize = '';
    switch (num) {
        case 1:
            maxSize = '';
            textPos = 'vertical';
            break;
        case 2:
            text = '';
            maxSize = 30;
            textPos = 'vertical';
            break;
        case 3:
            maxSize = 30;
            textPos = 'horizontal';
            fontSize = '18px';
            break;
    }
    el.waitMe({
        effect: effect,
        text: text,
        bg: 'rgba(255,255,255,0.7)',
        color: '#000',
        maxSize: maxSize,
        waitTime: -1,
        source: 'img.svg',
        textPos: textPos,
        fontSize: fontSize,
        onClose: function (el) { }
    });
}


