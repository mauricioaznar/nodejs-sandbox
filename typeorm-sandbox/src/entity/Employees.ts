import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EmployeeAttendances } from "./EmployeeAttendances";
import { Branches } from "./Branches";
import { EmployeeStatuses } from "./EmployeeStatuses";
import { EmployeeType } from "./EmployeeType";
import { OrderProductionEmployees } from "./OrderProductionEmployees";
import { OrderProductions } from "./OrderProductions";
import { PayrollPayments } from "./PayrollPayments";
import { ProductionEvents } from "./ProductionEvents";

@Index("employees_employee_type_id_foreign", ["employeeTypeId"], {})
@Index("employees_employee_status_id_foreign", ["employeeStatusId"], {})
@Index("employees_branch_id_foreign", ["branchId"], {})
@Entity("employees", { schema: "inopack" })
export class Employees {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("varchar", { name: "first_name", length: 255 })
  firstName: string;

  @Column("varchar", { name: "last_name", length: 255 })
  lastName: string;

  @Column("varchar", { name: "cellphone", length: 255 })
  cellphone: string;

  @Column("varchar", { name: "email", length: 255 })
  email: string;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "employee_type_id", nullable: true, unsigned: true })
  employeeTypeId: number | null;

  @Column("varchar", { name: "fullname", length: 255 })
  fullname: string;

  @Column("int", { name: "employee_status_id", nullable: true, unsigned: true })
  employeeStatusId: number | null;

  @Column("int", { name: "branch_id", nullable: true, unsigned: true })
  branchId: number | null;

  @Column("double", { name: "base_salary", precision: 8, scale: 2 })
  baseSalary: number;

  @Column("double", { name: "hours_should_work", precision: 8, scale: 2 })
  hoursShouldWork: number;

  @Column("double", { name: "infonavit", precision: 8, scale: 2 })
  infonavit: number;

  @Column("double", { name: "credit", precision: 8, scale: 2 })
  credit: number;

  @Column("int", { name: "credit_required", default: () => "'1'" })
  creditRequired: number;

  @OneToMany(
    () => EmployeeAttendances,
    (employeeAttendances) => employeeAttendances.employee
  )
  employeeAttendances: EmployeeAttendances[];

  @ManyToOne(() => Branches, (branches) => branches.employees, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "branch_id", referencedColumnName: "id" }])
  branch: Branches;

  @ManyToOne(
    () => EmployeeStatuses,
    (employeeStatuses) => employeeStatuses.employees,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "employee_status_id", referencedColumnName: "id" }])
  employeeStatus: EmployeeStatuses;

  @ManyToOne(() => EmployeeType, (employeeType) => employeeType.employees, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "employee_type_id", referencedColumnName: "id" }])
  employeeType: EmployeeType;

  @OneToMany(
    () => OrderProductionEmployees,
    (orderProductionEmployees) => orderProductionEmployees.employee
  )
  orderProductionEmployees: OrderProductionEmployees[];

  @OneToMany(
    () => OrderProductions,
    (orderProductions) => orderProductions.employee
  )
  orderProductions: OrderProductions[];

  @OneToMany(
    () => PayrollPayments,
    (payrollPayments) => payrollPayments.employee
  )
  payrollPayments: PayrollPayments[];

  @OneToMany(
    () => ProductionEvents,
    (productionEvents) => productionEvents.maintenanceEmployee
  )
  productionEvents: ProductionEvents[];

  @OneToMany(
    () => ProductionEvents,
    (productionEvents) => productionEvents.reportEmployee
  )
  productionEvents2: ProductionEvents[];
}
