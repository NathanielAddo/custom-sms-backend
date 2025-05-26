// src/entities/user.entity.ts
import { Entity, PrimaryColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Member } from "./member.entity";

@Entity()
export class User {
  @PrimaryColumn()
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  phone!: string;

  @Column()
  passwordHash!: string;

  @OneToMany(() => Member, member => member.user)
  members!: Member[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
