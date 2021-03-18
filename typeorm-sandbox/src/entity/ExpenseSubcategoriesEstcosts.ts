import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ExpenseSubcategories } from "./ExpenseSubcategories";

@Index(
  "expense_subcategories_estcosts_expense_subcategory_id_foreign",
  ["expenseSubcategoryId"],
  {}
)
@Entity("expense_subcategories_estcosts", { schema: "inopack" })
export class ExpenseSubcategoriesEstcosts {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("date", { name: "start_date" })
  startDate: string;

  @Column("date", { name: "end_date" })
  endDate: string;

  @Column("double", { name: "cost", precision: 8, scale: 2 })
  cost: number;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", {
    name: "expense_subcategory_id",
    nullable: true,
    unsigned: true,
  })
  expenseSubcategoryId: number | null;

  @ManyToOne(
    () => ExpenseSubcategories,
    (expenseSubcategories) => expenseSubcategories.expenseSubcategoriesEstcosts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "expense_subcategory_id", referencedColumnName: "id" }])
  expenseSubcategory: ExpenseSubcategories;
}
