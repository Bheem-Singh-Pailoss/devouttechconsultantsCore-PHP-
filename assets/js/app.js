$(function () {
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

var imgUpload = document.getElementById('upload-img')
    , imgPreview = document.getElementById('img-preview')
    , imgUploadForm = document.getElementById('form-upload')
    , totalFiles
    , previewTitle
    , previewTitleText
    , img;

imgUpload.addEventListener('change', previewImgs, true);


// Image Functionaly Function 

function previewImgs(event) {
    imgPreview.html("")
    var file_target = event.target.files;
    var image_leangh = file_target.length;
    var fileName;
    var totalsize = 0;
    var notvalidate = false;
    var fileName = ''; var fileSize = ''; var fileType = ''; var fileextention = '';
    if (!!image_leangh) {
        for (let i = 0; i < image_leangh; i++) {
            fileName = event.target.files[i].name;
            fileType = file_target[i].type.split('/')[0];
            totalsize += Number(event.target.files[i].size);
            let maxsize = 5 * 1024 * 1024; //10Mb
            fileextention = file_target[i].type.split('/')[1];
            if (fileType == '' || fileextention == 'undefined') {
                imgUpload.val('');
                fnon_alert('Please Choose image');
            }  else  if (validate_fileExtension(fileName) === false) {
                imgUpload.val('');
                fnon_alert('Choose Only image Formet');
            } else if (totalsize > maxsize && notvalidate === false) {
                imgUpload.val('');
                fnon_alert('Image Shoud be atleast 5 mb');
            } else {
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
                    var new_data = image_leangh - 1 ;
                    console.log(new_data);
                    $('#upload-img').val(new_data);
                });
            }
        }
    } else {
        $('#img-preview .wrapper-thumb').remove();

    }


}


function fnon_alert(msg) {
    Fnon.Hint.Danger(msg, { position: 'right-top', fontSize: '14px', width: '300px' });
}
function validate_fileExtension(fileName) {
    let image_extensions = new Array("bmp", "jpg", "jpeg", "jpe", "jfif", "png");
    let allowed_extensions = image_extensions;
    let file_extension = fileName.split('.').pop().toLowerCase();

    for (let i = 0; i <= allowed_extensions.length; i++) {
        if (allowed_extensions[i] == file_extension) {
            return true;
        }
    }
    return false;
}




