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

export const getPosts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit

        const filter = {};
        if (req.query.author) filter.author = req.query.author;
        if (req.query.title) filter.title = new RegExp(req.query.title, 'i');

        const posts = await Post.find({})
            .populate({ path: 'author' })
            .sort({ '_id': -1 })
            .skip(skip)
            .limit(limit)

        const totalPosts = await Post.countDocuments()

        res.status(200).json({
            totalPosts,
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit),
            posts
        })
    } catch (err) {
        next(err)
    }
}