import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true, length: 254 })
  email: string;

  @Column({ nullable: false, length: 128 })
  password: string;

  @Column({ nullable: false, default: false })
  isEmailVerified: boolean;
}
