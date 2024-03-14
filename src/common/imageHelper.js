export const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

export const beforeUpload = (file) => {
    var errorMess = null
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      errorMess = 'You can only upload JPG/PNG file!'
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      errorMess = 'Image must smaller than 2MB!'
    }
    return errorMess;
};