const express = require('express')
const noteModel = require('./models/note.model')

const app = express();

app.use(express.json());

app.post('/notes', (req, res) => {
    const data = req.body;
    noteModel.create({
        title: data.title,
        description: data.description
    });
    res.status(201).send({ message: "created" });
});

app.get('/notes', async(req, res) => {
    const notes = await noteModel.find();
    res.status(200).send({ notes: notes });
});

app.delete('/notes/:id', async(req, res) => {
    const id = req.params.id;
    await noteModel.findOneAndDelete({ _id: id });
    res.status(200).send({ message: "deleted" });
});

app.patch('/notes/:id', async(req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    await noteModel.findOneAndUpdate({ _id: id }, { title: title, description: description });
    res.status(200).send({ message: "note updates" });

})

module.exports = app;