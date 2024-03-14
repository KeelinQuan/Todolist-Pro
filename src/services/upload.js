import axios from 'axios';

export const upload = async (files, ref, refId, field) => {
    var bodyFormData = new FormData();
    bodyFormData.append('aaaa','bbbb')
    bodyFormData.append('files', files)
    bodyFormData.append('ref', ref)
    bodyFormData.append('refId', refId)
    bodyFormData.append('field', field)
    const response = await axios({
        url: '/upload',
        method: 'POST',
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
}