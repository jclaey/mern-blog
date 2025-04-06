import mongoose from 'mongoose'
import cloudinary from 'cloudinary'
import Post from '../../models/Post.js'

export const postNew = async (req, res, next) => {
    try {
        const { title, content } = req.body

        if (!title || !content) {
            res.status(400)
            throw new Error('Please provide all required fields')
        }

        let image = {}

        image = {
            path: req.file.path,
            filename: req.file.filename
        }

        const post = await Post.create({
            title,
            content,
            image,
            author: req.adminId
        })

        res.status(201).json({
            _id: post._id,
            title: post.title,
            content: post.content,
            image: post.image,
            author: post.author
        })
    } catch (err) {
        next(err)
    }
}

export const postsGet = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit

        const filter = {};
        if (req.query.author) filter.author = req.query.author
        if (req.query.title) filter.title = new RegExp(req.query.title, 'i')

        const totalPosts = await Post.countDocuments(filter)

        const posts = await Post.find(filter)
            .populate({ path: 'author' })
            .sort({ '_id': -1 })
            .skip(skip)
            .limit(limit)
            .exec()

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

export const postGet = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid post ID' })
        }

        const post = await Post.findById(req.params.id)
            .populate({ path: 'author', select: 'name' })

        if (!post) {
            res.status(404)
            throw new Error('Post not found')
        }

        res.status(200).json({ post })
    } catch (err) {
        console.error(`Error fetching post: ${err.message}`)
        next(err)
    }
}

export const postUpdate = async (req, res, next) => {
  try {
    const postId = req.params.id
    const { title, content } = req.body

    const post = await Post.findById(postId)
    if (!post) return res.status(404).json({ message: "Post not found" })

    if (req.file) {
      if (post.image?.filename) {
        await cloudinary.v2.uploader.destroy(post.image.filename)
      }

      post.image = {
        path: req.file.path,
        filename: req.file.filename,
      }
    }

    post.title = title
    post.content = content

    await post.save()

    res.status(200).json(post)
  } catch (err) {
    next(err)
  }
}

export const postDelete = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid post ID' })
        }

        const post = await Post.findById(req.params.id)

        if (!post) {
            res.status(404)
            throw new Error('Post not found')
        }

        if (post.image && post.image.filename) {
            await cloudinary.uploader.destroy(post.image.filename)
        }

        await Post.findByIdAndDelete(req.params.id)

        console.log(`Post with ID ${req.params.id} deleted successfully.`)
        res.status(200).json({ message: 'Post deleted successfully' })
    } catch (err) {
        next(err)
    }
}