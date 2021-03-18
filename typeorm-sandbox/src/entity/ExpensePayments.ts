import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Expenses } from "./Expenses";
import { ExpenseMoneySources } from "./ExpenseMoneySources";

@Index("expense_payments_expense_id_foreign", ["expenseId"], {})
@Index(
  "expense_payments_expense_money_source_id_foreign",
  ["expenseMoneySourceId"],
  {}
)
@Entity("expense_payments", { schema: "inopack" })
export class ExpensePayments {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("date", { name: "date" })
  date: string;

  @Column("double", { name: "subtotal", precision: 10, scale: 2 })
  subtotal: number;

  @Column("double", { name: "tax", precision: 8, scale: 2 })
  tax: number;

  @Column("double", { name: "ieps", precision: 8, scale: 2 })
  ieps: number;

  @Column("double", { name: "tax_retained", precision: 8, scale: 2 })
  taxRetained: number;

  @Column("double", { name: "isr_retained", precision: 8, scale: 2 })
  isrRetained: number;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "expense_id", nullable: true, unsigned: true })
  expenseId: number | null;

  @Column("int", {
    name: "expense_money_source_id",
    nullable: true,
    unsigned: true,
  })
  expenseMoneySourceId: number | null;

  @ManyToOne(() => Expenses, (expenses) => expenses.expensePayments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "expense_id", referencedColumnName: "id" }])
  expense: Expenses;

  @ManyToOne(
    () => ExpenseMoneySources,
    (expenseMoneySources) => expenseMoneySources.expensePayments,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "expense_money_source_id", referencedColumnName: "id" }])
  expenseMoneySource: ExpenseMoneySources;
}
