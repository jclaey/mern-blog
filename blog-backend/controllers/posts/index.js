import Post from '../../models/Post.js'

export const postNew = async (req, res, next) => {
    try {
        const { title, content, author } = req.body

        if (!title || !content) {
            res.status(400);
            throw new Error('Please provide all required fields');
        }

        let images = req.files || []

        const post = await Post.create({
            title,
            content,
            images,
            author
        })

        res.status(201).json({
            _id: post._id,
            title: post.title,
            content: post.content,
            images: post.images,
            author: post.author
        })
    } catch (err) {
        next(err)
    }
}

export const getPosts = (req, res, next) => {

}