import Task from "../model/Task.js";


export const createTask = async (req, res) =>{
    try {
        const { title, status } = req.body;

        const task = await Task.create({
            title, status, createdBy: req.user._id
        })

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const getTasks = async (req, res) =>{
    try {
        const { status } = req.query;

        const filter = { createdBy: req.user._id};

        if(status) filter.status = status;

        const tasks = await Task.find(filter).sort({createdAt: -1})

        res.json(tasks);
    } catch (error) {
        res.status(500).json({message:"Internal Server error"})
    }
}

export const deleteTask = async (req, res)=>{
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user._id,
        })

        if(!task) return res.status(404).json({ message: "Task not found"});

        res.json({message: "Task deleted"});
        
    } catch (error) {
          res.status(500).json({message:"Internal Server error"})
    }
}

export const updateTask = async( req, res)=>{

    try {
        const { title, status} = req.body;

        const task = await Task.findOneAndUpdate({_id: req.params.id, createdBy: req.user._id},
            {$set: {title, status}},
            {new:true}
        )

        if(!task) return res.status(404).json({ message: "Task not found"});

        res.json(task);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}


