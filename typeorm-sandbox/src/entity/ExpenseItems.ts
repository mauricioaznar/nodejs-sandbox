import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Branches } from "./Branches";
import { Expenses } from "./Expenses";
import { ExpenseSubcategories } from "./ExpenseSubcategories";
import { Machines } from "./Machines";

@Index("expense_items_expense_id_foreign", ["expenseId"], {})
@Index("expense_items_machine_id_foreign", ["machineId"], {})
@Index(
  "expense_items_expense_subcategory_id_foreign",
  ["expenseSubcategoryId"],
  {}
)
@Index("expense_items_branch_id_foreign", ["branchId"], {})
@Entity("expense_items", { schema: "inopack" })
export class ExpenseItems {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("varchar", { name: "description", length: 255 })
  description: string;

  @Column("double", { name: "subtotal", precision: 10, scale: 2 })
  subtotal: number;

  @Column("double", {
    name: "quantity",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  quantity: number | null;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "expense_id", nullable: true, unsigned: true })
  expenseId: number | null;

  @Column("int", { name: "machine_id", nullable: true, unsigned: true })
  machineId: number | null;

  @Column("int", { name: "branch_id", nullable: true, unsigned: true })
  branchId: number | null;

  @Column("int", {
    name: "expense_subcategory_id",
    nullable: true,
    unsigned: true,
  })
  expenseSubcategoryId: number | null;

  @ManyToOne(() => Branches, (branches) => branches.expenseItems, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "branch_id", referencedColumnName: "id" }])
  branch: Branches;

  @ManyToOne(() => Expenses, (expenses) => expenses.expenseItems, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "expense_id", referencedColumnName: "id" }])
  expense: Expenses;

  @ManyToOne(
    () => ExpenseSubcategories,
    (expenseSubcategories) => expenseSubcategories.expenseItems,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "expense_subcategory_id", referencedColumnName: "id" }])
  expenseSubcategory: ExpenseSubcategories;

  @ManyToOne(() => Machines, (machines) => machines.expenseItems, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "machine_id", referencedColumnName: "id" }])
  machine: Machines;
}
