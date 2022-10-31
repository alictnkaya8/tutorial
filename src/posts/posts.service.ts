import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  getAllPosts() {
    return this.postRepository.find();
  }

  getPostById(id: number) {
    const post = this.postRepository.findOne({ where: { id } });
    if (!post) throw new HttpException('Post not found!', HttpStatus.NOT_FOUND);
    return post;
  }

  async replacePost(id: number, updatePostDto: UpdatePostDto) {
    await this.postRepository.update(id, updatePostDto);
    const updatedPost = await this.postRepository.findOne({ where: { id } });
    if (!updatedPost)
      throw new HttpException('Post not found!', HttpStatus.NOT_FOUND);
    return updatedPost;
  }

  async createPost(createPostDto: CreatePostDto) {
    const newPost = this.postRepository.create(createPostDto);
    await this.postRepository.save(newPost);
    return newPost;
  }

  async deletePost(id: number) {
    const deletedPost = await this.postRepository.delete(id);
    if (!deletedPost)
      throw new HttpException('Post not found!', HttpStatus.NOT_FOUND);
  }
}
