import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employees } from "./Employees";
import { OrderProductions } from "./OrderProductions";

@Index(
  "order_production_employees_order_production_id_foreign",
  ["orderProductionId"],
  {}
)
@Index("order_production_employees_employee_id_foreign", ["employeeId"], {})
@Entity("order_production_employees", { schema: "inopack" })
export class OrderProductionEmployees {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("int", { name: "is_leader", default: () => "'0'" })
  isLeader: number;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", {
    name: "order_production_id",
    nullable: true,
    unsigned: true,
  })
  orderProductionId: number | null;

  @Column("int", { name: "employee_id", nullable: true, unsigned: true })
  employeeId: number | null;

  @ManyToOne(
    () => Employees,
    (employees) => employees.orderProductionEmployees,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "employee_id", referencedColumnName: "id" }])
  employee: Employees;

  @ManyToOne(
    () => OrderProductions,
    (orderProductions) => orderProductions.orderProductionEmployees,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "order_production_id", referencedColumnName: "id" }])
  orderProduction: OrderProductions;
}
