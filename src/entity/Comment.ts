import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne} from "typeorm";
import { User } from "./User";

@Entity()
export class Comment {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @ManyToOne(type => Comment, comment => comment.children)
  parent: Comment

  @OneToMany(type => Comment, comment => comment.parent)
  children: Comment[]

  @ManyToOne(type => User, user => user.comments)
  user: User
}
