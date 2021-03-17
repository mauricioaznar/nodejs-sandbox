import mongoose from 'mongoose'

interface PostAttrs {
    name: string;
}

interface PostDoc extends mongoose.Document {
    name: string;
    hasName(name: string): Promise<boolean>;
}

interface PostModel extends mongoose.Model<PostDoc> {
    build(attrs: PostAttrs): PostDoc;
}

const postSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
            }
        }
    }
)

postSchema.statics.build = function (attrs: PostAttrs): PostDoc {
    return new Post(attrs)
}

postSchema.methods.hasName = async function (name: string): Promise<boolean> {
    return true
}

const Post = mongoose.model<PostDoc, PostModel>('Post', postSchema)

export { Post }