import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BranchesEquipments } from "./BranchesEquipments";
import { Employees } from "./Employees";
import { EquipmentTransactions } from "./EquipmentTransactions";
import { ExpenseItems } from "./ExpenseItems";
import { Expenses } from "./Expenses";
import { Machines } from "./Machines";
import { OrderProductions } from "./OrderProductions";
import { Payrolls } from "./Payrolls";
import { Suppliers } from "./Suppliers";
import { Users } from "./Users";

@Entity("branches", { schema: "inopack" })
export class Branches {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(
    () => BranchesEquipments,
    (branchesEquipments) => branchesEquipments.branch
  )
  branchesEquipments: BranchesEquipments[];

  @OneToMany(() => Employees, (employees) => employees.branch)
  employees: Employees[];

  @OneToMany(
    () => EquipmentTransactions,
    (equipmentTransactions) => equipmentTransactions.branch
  )
  equipmentTransactions: EquipmentTransactions[];

  @OneToMany(() => ExpenseItems, (expenseItems) => expenseItems.branch)
  expenseItems: ExpenseItems[];

  @OneToMany(() => Expenses, (expenses) => expenses.branch)
  expenses: Expenses[];

  @OneToMany(() => Machines, (machines) => machines.branch)
  machines: Machines[];

  @OneToMany(
    () => OrderProductions,
    (orderProductions) => orderProductions.branch
  )
  orderProductions: OrderProductions[];

  @OneToMany(() => Payrolls, (payrolls) => payrolls.branch)
  payrolls: Payrolls[];

  @OneToMany(() => Suppliers, (suppliers) => suppliers.defaultBranch)
  suppliers: Suppliers[];

  @OneToMany(() => Users, (users) => users.branch)
  users: Users[];
}
