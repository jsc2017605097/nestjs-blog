import * as mongoose from 'mongoose';

export const BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    body: String,
    author: String,
    date_posted: { type: Date, default: Date.now() },
    updated: { type: Date },
    tags: { type: [mongoose.Types.ObjectId], ref: "Tag" }
})