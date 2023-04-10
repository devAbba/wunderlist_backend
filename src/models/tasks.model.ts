import { Schema, model } from 'mongoose'
import { ITask } from '../types'

const taskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    set_reminder: {
        type: Boolean,
        default: false
    },
    re_occuring: {
        type: Boolean,
        default: false
    },
    createdAt: Date,
    updatedAt: Date,
})

taskSchema.pre('save', function (this: ITask, next){
    const task = this
    task.updatedAt = new Date()
    return next()
})

const Task = model<ITask>('Task', taskSchema)

export default Task
