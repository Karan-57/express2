const ImageKit = require('@imagekit/nodejs');

const client = new ImageKit({
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY, // This is the default and can be omitted
});

const uploadFile = async(buffer) => {

    const response = await client.files.upload({
        file: buffer.toString('base64'),
        fileName: 'image.jpg',
    });

    return response;

}

module.exports = uploadFile;