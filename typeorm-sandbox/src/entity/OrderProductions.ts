import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderProductionEmployees } from "./OrderProductionEmployees";
import { OrderProductionProducts } from "./OrderProductionProducts";
import { Branches } from "./Branches";
import { Employees } from "./Employees";
import { OrderProductionType } from "./OrderProductionType";

@Index("order_productions_employee_id_foreign", ["employeeId"], {})
@Index(
  "order_productions_order_production_type_id_foreign",
  ["orderProductionTypeId"],
  {}
)
@Index("order_productions_branch_id_foreign", ["branchId"], {})
@Entity("order_productions", { schema: "inopack" })
export class OrderProductions {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("datetime", { name: "start_date_time" })
  startDateTime: Date;

  @Column("datetime", { name: "end_date_time" })
  endDateTime: Date;

  @Column("double", { name: "waste", precision: 8, scale: 2 })
  waste: number;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "employee_id", nullable: true, unsigned: true })
  employeeId: number | null;

  @Column("int", {
    name: "order_production_type_id",
    nullable: true,
    unsigned: true,
  })
  orderProductionTypeId: number | null;

  @Column("double", { name: "performance", precision: 8, scale: 2 })
  performance: number;

  @Column("int", { name: "branch_id", nullable: true, unsigned: true })
  branchId: number | null;

  @OneToMany(
    () => OrderProductionEmployees,
    (orderProductionEmployees) => orderProductionEmployees.orderProduction
  )
  orderProductionEmployees: OrderProductionEmployees[];

  @OneToMany(
    () => OrderProductionProducts,
    (orderProductionProducts) => orderProductionProducts.orderProduction
  )
  orderProductionProducts: OrderProductionProducts[];

  @ManyToOne(() => Branches, (branches) => branches.orderProductions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "branch_id", referencedColumnName: "id" }])
  branch: Branches;

  @ManyToOne(() => Employees, (employees) => employees.orderProductions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "employee_id", referencedColumnName: "id" }])
  employee: Employees;

  @ManyToOne(
    () => OrderProductionType,
    (orderProductionType) => orderProductionType.orderProductions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "order_production_type_id", referencedColumnName: "id" },
  ])
  orderProductionType: OrderProductionType;
}
