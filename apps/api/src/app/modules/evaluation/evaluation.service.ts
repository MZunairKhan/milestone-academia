import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MCQS } from './entities/mcqs.entity';
import { CreateMcqsDTO } from './dto/mcqs.dto';
import { SubjectService } from '../subject/subject.service';
import { SearchMcqsDTO } from './dto/seach-mcqs.dto';
import { UpdateMcqsDto } from './dto/update-mcqs.dto';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(MCQS)
    private readonly mcqsRepository: Repository<MCQS>,
    private readonly subjectService: SubjectService
  ) {}

  async createMcqs(createMcqsDto: CreateMcqsDTO): Promise<MCQS> {
    const subject = await this.subjectService.findOne(createMcqsDto.subjectId);

    if (!subject) {
      throw new BadRequestException('Invalid SubjectId');
    }

    return await this.mcqsRepository.save({
      choices: createMcqsDto.choices,
      correctOption: createMcqsDto.correctOption,
      question: createMcqsDto.question,
      subjectId: subject,
      level: createMcqsDto.level,
    });
  }

  async findAllMcqs(): Promise<MCQS[]> {
    return this.mcqsRepository.find();
  }

  findOneMcq(id: string): Promise<MCQS> {
    return this.mcqsRepository.findOneBy({ id: id });
  }

  async removeMcq(id: string): Promise<void> {
    await this.mcqsRepository.softDelete(id);
  }

  async updateMcqs(id: string , updateMcqDto: UpdateMcqsDto){

return await this.mcqsRepository.update(id,updateMcqDto)
  }

  async findMcqsWithFilterAndPagination(
    searchMcqDTO: SearchMcqsDTO
  ) {
    const {question, level , subject , page , limit} = searchMcqDTO ;

    const pages = page ? page : 1
    const limits = limit ? limit : 5

    const queryBuilder = this.mcqsRepository.createQueryBuilder('mcqs');

   
    if (level) {
      queryBuilder.andWhere('mcqs.level IN (:...level)', { level: level });
    }

    if (subject) {
      queryBuilder.andWhere('mcqs.subject = :subject', { subject });
    }

    if (question) {
      const searchTerm = `%${question}%`;
      queryBuilder.andWhere('mcqs.question LIKE :question', { question: searchTerm });
    }

    queryBuilder.andWhere('mcqs.deletedDate IS NULL')
    queryBuilder.skip((pages - 1) * limits).take(limit);


    return await queryBuilder.getManyAndCount();
  }
}
