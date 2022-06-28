import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';

@Entity()
export class Dataset extends BaseEntity {
  @Column()
  name: string;
  @Column()
  salary: number;
  @Column()
  currency?: string;
  @Column()
  department: string;
  @Column('boolean', { default: false })
  on_contract?: boolean = false;
  @Column({ nullable: true })
  sub_department: string;
}
