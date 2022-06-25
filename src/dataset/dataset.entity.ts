import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Dataset {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  curency: string;
  @Column()
  department: string;
  @Column()
  sub_department: string;
  @CreateDateColumn()
  created_at: string;
  @UpdateDateColumn()
  updated_at: string;
}
