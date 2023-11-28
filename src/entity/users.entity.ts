import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hashSync } from 'bcryptjs'; // Altere 'bcrypt' para 'bcryptjs'
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'first_name' })
  @ApiProperty({ description: 'O Seu Primeiro Nome.' })
  firstName: string;

  @Column({ name: 'last_name' })
  @ApiProperty({ description: 'O Seu Último Nome.' })
  lastName: string;

  @Column()
  @ApiProperty({ description: 'O Seu Email.' })
  email: string;

  @Column()
  @ApiProperty({ description: 'A Sua Senha.' })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password, 10);
  }
}
