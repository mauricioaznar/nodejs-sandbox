import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ExpenseItems } from "./ExpenseItems";
import { ExpenseSubcategoriesEstcosts } from "./ExpenseSubcategoriesEstcosts";
import { ExpenseCategories } from "./ExpenseCategories";
import { ExpenseSubcategoryFrequencies } from "./ExpenseSubcategoryFrequencies";
import { Expenses } from "./Expenses";
import { MaterialEsproportions } from "./MaterialEsproportions";
import { Suppliers } from "./Suppliers";

@Index(
  "expense_subcategories_expense_category_id_foreign",
  ["expenseCategoryId"],
  {}
)
@Index(
  "expense_subcategories_expense_subcategory_frequency_id_foreign",
  ["expenseSubcategoryFrequencyId"],
  {}
)
@Entity("expense_subcategories", { schema: "inopack" })
export class ExpenseSubcategories {
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

  @Column("int", {
    name: "expense_category_id",
    nullable: true,
    unsigned: true,
  })
  expenseCategoryId: number | null;

  @Column("int", {
    name: "expense_subcategory_frequency_id",
    nullable: true,
    unsigned: true,
  })
  expenseSubcategoryFrequencyId: number | null;

  @Column("int", { name: "has_estimate", default: () => "'-1'" })
  hasEstimate: number;

  @OneToMany(
    () => ExpenseItems,
    (expenseItems) => expenseItems.expenseSubcategory
  )
  expenseItems: ExpenseItems[];

  @OneToMany(
    () => ExpenseSubcategoriesEstcosts,
    (expenseSubcategoriesEstcosts) =>
      expenseSubcategoriesEstcosts.expenseSubcategory
  )
  expenseSubcategoriesEstcosts: ExpenseSubcategoriesEstcosts[];

  @ManyToOne(
    () => ExpenseCategories,
    (expenseCategories) => expenseCategories.expenseSubcategories,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "expense_category_id", referencedColumnName: "id" }])
  expenseCategory: ExpenseCategories;

  @ManyToOne(
    () => ExpenseSubcategoryFrequencies,
    (expenseSubcategoryFrequencies) =>
      expenseSubcategoryFrequencies.expenseSubcategories,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "expense_subcategory_frequency_id", referencedColumnName: "id" },
  ])
  expenseSubcategoryFrequency: ExpenseSubcategoryFrequencies;

  @OneToMany(() => Expenses, (expenses) => expenses.expenseSubcategory)
  expenses: Expenses[];

  @OneToMany(
    () => MaterialEsproportions,
    (materialEsproportions) => materialEsproportions.expenseSubcategory
  )
  materialEsproportions: MaterialEsproportions[];

  @OneToMany(
    () => Suppliers,
    (suppliers) => suppliers.defaultExpenseSubcategory
  )
  suppliers: Suppliers[];
}
