import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employees } from "./Employees";

@Index("employee_attendances_employee_id_foreign", ["employeeId"], {})
@Entity("employee_attendances", { schema: "inopack" })
export class EmployeeAttendances {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "entrance_date_time" })
  entranceDateTime: Date;

  @Column("datetime", { name: "exit_date_time" })
  exitDateTime: Date;

  @Column("varchar", { name: "entrance_image_name", length: 255 })
  entranceImageName: string;

  @Column("varchar", { name: "exit_image_name", length: 255 })
  exitImageName: string;

  @Column("int", { name: "employee_id", nullable: true, unsigned: true })
  employeeId: number | null;

  @ManyToOne(() => Employees, (employees) => employees.employeeAttendances, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "employee_id", referencedColumnName: "id" }])
  employee: Employees;
}
