//entity/registration.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Registration {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  surname!: string;

  @Column({ type: "date" })
  dob!: Date;

  @Column()
  subgroup!: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  phoneNumber!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: "member" })
  userType!: "member" | "non-member";

  @Column({ default: "birthday" })
  registrationType!: "birthday" | "thankyou";

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}