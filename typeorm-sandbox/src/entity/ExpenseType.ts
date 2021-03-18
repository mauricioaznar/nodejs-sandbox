import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ExpenseMoneySources } from "./ExpenseMoneySources";
import { Expenses } from "./Expenses";
import { Suppliers } from "./Suppliers";

@Entity("expense_type", { schema: "inopack" })
export class ExpenseType {
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
    () => ExpenseMoneySources,
    (expenseMoneySources) => expenseMoneySources.expenseType
  )
  expenseMoneySources: ExpenseMoneySources[];

  @OneToMany(() => Expenses, (expenses) => expenses.expenseType)
  expenses: Expenses[];

  @OneToMany(() => Suppliers, (suppliers) => suppliers.defaultExpenseType)
  suppliers: Suppliers[];
}
