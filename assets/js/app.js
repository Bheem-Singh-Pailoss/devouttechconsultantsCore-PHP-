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

// 
$("#form_submition").submit(function (e) {
    e.preventDefault();
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
            if (data.status == 'false') {
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


// Image Functionaly Function 

function previewImgs(event) {
    $("#img-preview").html("")
    var file_target = event.target.files;
    var image_leangh = file_target.length;
    var fileName;
    var totalsize = 0;
    var notvalidate = false;
    var fileName = ''; var fileSize = ''; var fileType = ''; var fileextention = '';
    if (!!image_leangh) {
        imgPreview.classList.remove('img-thumbs-hidden');
        for (let i = 0; i < image_leangh; i++) {
            fileSize = file_target[i].size;
            fileName = event.target.files[i].name;
            fileType = file_target[i].type.split('/')[0];
            totalsize += Number(event.target.files[i].size);
            let maxsize = 5 * 1024 * 1024; //10Mb
            console.log(totalsize);
            fileextention = file_target[i].type.split('/')[1];
            console.log(fileextention);
            if (fileType == '' || fileextention == 'undefined') {
                $('#upload-img').val('');
                Fnon.Hint.Danger('Please Add the Correct image Formet', {
                    position: 'right-top',
                    fontSize: '14px',
                    width: '300px',
                    title: 'Image Error ',
                    callback: function () {
                        //do something
                    }
                });

            } 
           
            else  if (validate_fileExtension(fileName) === false) {
                
                $('#upload-img').val('');
                Fnon.Hint.Danger('Allowed only files with extension (jpg, png)', {
                    position: 'right-top',
                    fontSize: '14px',
                    width: '300px',
                    title: 'Image Error ',
                    callback: function () {
                        //do something
                    }
                });
            } else if (totalsize > maxsize && notvalidate === false) {
                $('#upload-img').val('');
                Fnon.Hint.Danger('The Size of Image Must be 5mb)', {
                    position: 'right-top',
                    fontSize: '14px',
                    width: '300px',
                    title: 'Image Error ',
                    callback: function () {
                        //do something
                    }
                });

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




