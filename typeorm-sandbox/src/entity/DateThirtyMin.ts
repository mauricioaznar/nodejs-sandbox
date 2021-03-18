import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("date_thirty_min", { schema: "inopack" })
export class DateThirtyMin {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("datetime", { name: "date_time" })
  dateTime: Date;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;
}
