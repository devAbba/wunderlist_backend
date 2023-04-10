import express from 'express'
import { ITask } from '../types'
import Task from '../models/tasks.model'

const tasksRouter = express.Router()

tasksRouter.post('/task', async (req: any, res: any, next) => {
    try {
    const {title} = req.body
    const task = new Task({title})
    const savedTask: ITask = await task.save()

    res.status(201).json({
        status: true,
        task: savedTask
    })
    }
    catch (error){
        next(error)
    }
})

export default tasksRouter