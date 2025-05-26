//entity/member.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id!: string;

 @ManyToOne(() => User, user => user.members, { onDelete: 'CASCADE' })
 @JoinColumn({ name: "userId" })
 user!: User;

@Column()
userId!: string; 


  @Column()
  firstName!: string;

  @Column()
  surname!: string;

  @Column({ type: "date" })
  dob!: Date;

  @Column()
  subgroup!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}