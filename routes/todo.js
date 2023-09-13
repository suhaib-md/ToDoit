const router = require('express').Router();
const Todo = require("../models/Todo");

// routes

router.post("/add/todo", (req, res) =>{
    const {todo} = req.body;
    const newTodo = new Todo({todo})

    //save the todo
    newTodo.save()
    .then(() =>{
        console.log("Successfully added task!");
        res.redirect("/");
    })

    .catch((err) => console.log(err));
})

.get("/delete/todo/:_id", (req, res) =>{
    const {_id} = req.params;
    Todo.deleteOne({_id})
    .then(() =>{
        console.log("Deleted Task successfully");
        res.redirect("/");
    })
    .catch((err) => console.log(err));
});
router.get('/update/todo/:_id', (req, res) => {
    const { _id } = req.params;

    Todo.findById(_id)
        .then((todoItem) => {
            if (!todoItem) {
                console.log('Todo item not found');
                return res.status(404).json({ error: 'Todo item not found' });
            }

            res.render('update', { todoItem }); // Replace 'update' with your update page template
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

router.post('/update/todo/:_id', (req, res) => {
    const { _id } = req.params;
    const { updatedTodo } = req.body;

    Todo.findByIdAndUpdate(_id, { todo: updatedTodo }, { new: true })
        .then((updatedItem) => {
            if (!updatedItem) {
                console.log('Todo item not found');
                return res.status(404).json({ error: 'Todo item not found' });
            }

            console.log('Updated task successfully');
            res.redirect('/');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        });
});

module.exports = router;