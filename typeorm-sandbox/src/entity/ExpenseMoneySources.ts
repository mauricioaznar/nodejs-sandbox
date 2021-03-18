import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ExpenseType } from "./ExpenseType";
import { ExpensePayments } from "./ExpensePayments";
import { Expenses } from "./Expenses";
import { Suppliers } from "./Suppliers";

@Index("expense_money_sources_expense_type_id_foreign", ["expenseTypeId"], {})
@Entity("expense_money_sources", { schema: "inopack" })
export class ExpenseMoneySources {
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

  @Column("int", { name: "expense_type_id", nullable: true, unsigned: true })
  expenseTypeId: number | null;

  @ManyToOne(
    () => ExpenseType,
    (expenseType) => expenseType.expenseMoneySources,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "expense_type_id", referencedColumnName: "id" }])
  expenseType: ExpenseType;

  @OneToMany(
    () => ExpensePayments,
    (expensePayments) => expensePayments.expenseMoneySource
  )
  expensePayments: ExpensePayments[];

  @OneToMany(() => Expenses, (expenses) => expenses.expenseMoneySource)
  expenses: Expenses[];

  @OneToMany(
    () => Suppliers,
    (suppliers) => suppliers.defaultExpenseMoneySource
  )
  suppliers: Suppliers[];
}
