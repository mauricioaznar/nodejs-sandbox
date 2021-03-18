import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Expenses } from "./Expenses";

@Entity("expense_invoice_payment_methods", { schema: "inopack" })
export class ExpenseInvoicePaymentMethods {
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

  @OneToMany(() => Expenses, (expenses) => expenses.expenseInvoicePaymentMethod)
  expenses: Expenses[];
}
