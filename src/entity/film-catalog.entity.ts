import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'films' })
export class FilmCatalogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty({ description: 'Mome do Filme.' })
  name: string;

  @Column()
  @ApiProperty({ description: 'Ano de Lançamento.' })
  year: number;

  @Column()
  @ApiProperty({ description: 'Gênero do Filme.' })
  genre: string;

  @Column()
  @ApiProperty({ description: 'Diretor do Filme.' })
  director: string;

  @Column()
  @ApiProperty({ description: 'Duração do Filme.' })
  duration: number;

  @Column()
  @ApiProperty({ description: 'Sinopse do Filme.' })
  synopsis: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleteDate: Date;
}
