$(function () {
    // Initialize cropper when an image is selected
    $('#inputImage').on('change', function (e) {
        var file = e.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#previewImage').attr('src', e.target.result);

                // Initialize cropper
                $('#previewImage').cropper({
                    aspectRatio: 1, // Set your desired aspect ratio
                    viewMode: 2,    // Set to 2 for responsive cropping
                });
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle crop button click
    $('#cropButton').on('click', function () {
        // Get cropped data
        var imageData = $('#previewImage').cropper('getCroppedCanvas').toDataURL('image/jpeg');

        // Send cropped data to server (you need to implement the server-side part)
        $.ajax({
            url: 'crop.php',
            method: 'POST',
            data: { imageData: imageData },
            success: function(response) {
                console.log(response); // Handle the response from the server
            },
            error: function(error) {
                console.error(error);
            }
        });
    });
});
