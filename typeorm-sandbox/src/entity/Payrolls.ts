import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PayrollPayments } from "./PayrollPayments";
import { Branches } from "./Branches";
import { PayrollType } from "./PayrollType";

@Index("payrolls_payroll_type_id_foreign", ["payrollTypeId"], {})
@Index("payrolls_branch_id_foreign", ["branchId"], {})
@Entity("payrolls", { schema: "inopack" })
export class Payrolls {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("datetime", { name: "start_date_time" })
  startDateTime: Date;

  @Column("datetime", { name: "end_date_time" })
  endDateTime: Date;

  @Column("double", { name: "credit_used", precision: 8, scale: 2 })
  creditUsed: number;

  @Column("double", { name: "infonavit_used", precision: 8, scale: 2 })
  infonavitUsed: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "payroll_type_id", nullable: true, unsigned: true })
  payrollTypeId: number | null;

  @Column("int", { name: "branch_id", nullable: true, unsigned: true })
  branchId: number | null;

  @OneToMany(
    () => PayrollPayments,
    (payrollPayments) => payrollPayments.payroll
  )
  payrollPayments: PayrollPayments[];

  @ManyToOne(() => Branches, (branches) => branches.payrolls, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "branch_id", referencedColumnName: "id" }])
  branch: Branches;

  @ManyToOne(() => PayrollType, (payrollType) => payrollType.payrolls, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "payroll_type_id", referencedColumnName: "id" }])
  payrollType: PayrollType;
}
