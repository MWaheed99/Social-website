export interface Post {
  _id: string
  body: string
  privacy: string
  user: User
  image?: string
  sharedPost: any
  likes: any[]
  createdAt: string
  commentsCount: number
  topComment: TopComment
  sharesCount: number
  likesCount: number
  isShare: boolean
  id: string
  bookmarked: boolean
}

export interface User {
  _id: string
  name: string
  username: string
  photo: string
}

export interface TopComment {
  _id: string
  content: string
  commentCreator: CommentCreator
  post: string
  parentComment: any
  likes: any[]
  createdAt: string
  image?: string
}


export interface PostComment {
  _id: string
  content: string
  commentCreator: CommentCreator
  post: string
  parentComment: any
  likes: any[]
  createdAt: string
  image: string
}

export interface CommentCreator {
  _id: string
  name: string
  username: string
  photo: string
}


export interface CreatePost {
  body?: string
  image?: File
}

export interface CreateComment {
  content?: string
  image?: File
}