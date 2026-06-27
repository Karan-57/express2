const { ImageKit } = require('@imagekit/nodejs');

const client = new ImageKit({
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY, // This is the default and can be omitted
});

async function uploadFile(file) {
    const result = await client.files.upload({
        file: file,
        fileName: 'music' + Date.now(),
        folder: 'spotify/music'
    });

    return result;

}


module.exports = uploadFile;