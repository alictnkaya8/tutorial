import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Post } from './post.interface';

@Injectable()
export class PostsService {
  private lastPostId = 0;
  private posts: Post[] = [];

  getAllPosts() {
    return this.posts;
  }

  getPostById(id: number) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) throw new HttpException('Post not found!', HttpStatus.NOT_FOUND);
    return post;
  }

  replacePost(id: number, updatePostDto: UpdatePostDto) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex > -1) {
      this.posts[postIndex] = updatePostDto;
      return updatePostDto;
    }
    throw new HttpException('Post not found!', HttpStatus.NOT_FOUND);
  }

  createPost(createPostDto: CreatePostDto) {
    const newPost = {
      id: ++this.lastPostId,
      ...createPostDto,
    };
    this.posts.push(newPost);
    return newPost;
  }

  deletePost(id: number) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex > -1) {
      this.posts.splice(postIndex, 1);
    } else {
      throw new HttpException('Post not found!', HttpStatus.NOT_FOUND);
    }
  }
}
