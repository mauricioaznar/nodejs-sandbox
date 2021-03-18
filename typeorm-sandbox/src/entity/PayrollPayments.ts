import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employees } from "./Employees";
import { Payrolls } from "./Payrolls";

@Index("payroll_payments_payroll_id_foreign", ["payrollId"], {})
@Index("payroll_payments_employee_id_foreign", ["employeeId"], {})
@Entity("payroll_payments", { schema: "inopack" })
export class PayrollPayments {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("double", { name: "base_salary", precision: 8, scale: 2 })
  baseSalary: number;

  @Column("double", { name: "time_delays", precision: 8, scale: 2 })
  timeDelays: number;

  @Column("double", { name: "absences", precision: 8, scale: 2 })
  absences: number;

  @Column("int", { name: "credit_required", default: () => "'1'" })
  creditRequired: number;

  @Column("double", { name: "hours_should_work", precision: 8, scale: 2 })
  hoursShouldWork: number;

  @Column("double", { name: "hours_normal_worked", precision: 8, scale: 2 })
  hoursNormalWorked: number;

  @Column("double", { name: "hours_extra_worked", precision: 8, scale: 2 })
  hoursExtraWorked: number;

  @Column("double", { name: "hours_triple_worked", precision: 8, scale: 2 })
  hoursTripleWorked: number;

  @Column("double", { name: "bonus_punctuality", precision: 8, scale: 2 })
  bonusPunctuality: number;

  @Column("double", { name: "bonus_availability", precision: 8, scale: 2 })
  bonusAvailability: number;

  @Column("double", { name: "bonus_others", precision: 8, scale: 2 })
  bonusOthers: number;

  @Column("double", { name: "discount_loans", precision: 8, scale: 2 })
  discountLoans: number;

  @Column("double", { name: "discount_others", precision: 8, scale: 2 })
  discountOthers: number;

  @Column("double", { name: "infonavit", precision: 8, scale: 2 })
  infonavit: number;

  @Column("double", { name: "earnings_normal", precision: 8, scale: 2 })
  earningsNormal: number;

  @Column("double", { name: "earnings_extra", precision: 8, scale: 2 })
  earningsExtra: number;

  @Column("double", { name: "earnings_triple", precision: 8, scale: 2 })
  earningsTriple: number;

  @Column("double", { name: "total_cash", precision: 8, scale: 2 })
  totalCash: number;

  @Column("double", { name: "total_credit", precision: 8, scale: 2 })
  totalCredit: number;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "payroll_id", nullable: true, unsigned: true })
  payrollId: number | null;

  @Column("int", { name: "employee_id", nullable: true, unsigned: true })
  employeeId: number | null;

  @Column("double", { name: "bonus_position", precision: 8, scale: 2 })
  bonusPosition: number;

  @Column("double", { name: "bonus_assistance", precision: 8, scale: 2 })
  bonusAssistance: number;

  @Column("double", { name: "bonus_loans", precision: 8, scale: 2 })
  bonusLoans: number;

  @Column("double", { name: "bonus_festive", precision: 8, scale: 2 })
  bonusFestive: number;

  @ManyToOne(() => Employees, (employees) => employees.payrollPayments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "employee_id", referencedColumnName: "id" }])
  employee: Employees;

  @ManyToOne(() => Payrolls, (payrolls) => payrolls.payrollPayments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "payroll_id", referencedColumnName: "id" }])
  payroll: Payrolls;
}
