import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Expenses } from "./Expenses";

@Index("expense_invoice_complements_expense_id_foreign", ["expenseId"], {})
@Entity("expense_invoice_complements", { schema: "inopack" })
export class ExpenseInvoiceComplements {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("int", { name: "delivered" })
  delivered: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "expense_id", nullable: true, unsigned: true })
  expenseId: number | null;

  @ManyToOne(() => Expenses, (expenses) => expenses.expenseInvoiceComplements, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "expense_id", referencedColumnName: "id" }])
  expense: Expenses;
}
