import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("date_day", { schema: "inopack" })
export class DateDay {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("date", { name: "date" })
  date: string;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;
}
