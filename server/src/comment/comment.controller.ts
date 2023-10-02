import { Controller, Inject } from '@nestjs/common';

import { CommentService } from './comment.service'

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  create() {
    
  }
}
