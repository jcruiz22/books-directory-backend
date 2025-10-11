import mongoose, { Schema, Document } from "mongoose";

//Define interface for Book document
export interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
    publishedYear: number;
}

//Define Book schema
const bookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publishedYear: { type: Number, required: true },
},
{ timestamps: true }
)

//Create and export Book model
const Book = mongoose.model<IBook>("Book", bookSchema);
export default Book;
