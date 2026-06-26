require('dotenv').config()
const app = require('./src/app')

app.listen(8000, () => {
    console.log('app running');
})