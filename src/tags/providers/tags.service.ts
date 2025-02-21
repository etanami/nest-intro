import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tag.entity';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from '../dtos/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  public async create(createTagDto: CreateTagDto) {
    const tag = this.tagsRepository.create(createTagDto);

    return await this.tagsRepository.save(tag);
  }

  public async getMultipleTags(id: number[]) {
    let tags = undefined;

    try {
      tags = await this.tagsRepository.find({
        where: {
          id: In(id),
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try again later.',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (!tags || tags.length !== id.length) {
      throw new BadRequestException(
        'Tags does not exist. Ensure tag Ids are correct',
      );
    }

    return tags;
  }

  public async delete(id: number) {
    await this.tagsRepository.delete(id);

    return {
      id,
      deleted: true,
    };
  }

  public async softDelete(id: number) {
    await this.tagsRepository.softDelete(id);

    return {
      id,
      deleted: true,
    };
  }
}
