import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Expenses } from "./Expenses";

@Index("expense_credit_notes_expense_id_foreign", ["expenseId"], {})
@Entity("expense_credit_notes", { schema: "inopack" })
export class ExpenseCreditNotes {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("date", { name: "date" })
  date: string;

  @Column("double", { name: "amount", precision: 8, scale: 2 })
  amount: number;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "expense_id", nullable: true, unsigned: true })
  expenseId: number | null;

  @ManyToOne(() => Expenses, (expenses) => expenses.expenseCreditNotes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "expense_id", referencedColumnName: "id" }])
  expense: Expenses;
}
