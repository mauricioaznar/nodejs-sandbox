import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EquipmentTransactions } from "./EquipmentTransactions";
import { Expenses } from "./Expenses";
import { OtherIncomes } from "./OtherIncomes";
import { Branches } from "./Branches";
import { ExpenseMoneySources } from "./ExpenseMoneySources";
import { ExpenseSubcategories } from "./ExpenseSubcategories";
import { ExpenseType } from "./ExpenseType";

@Index(
  "suppliers_default_expense_type_id_foreign",
  ["defaultExpenseTypeId"],
  {}
)
@Index(
  "suppliers_default_expense_subcategory_id_foreign",
  ["defaultExpenseSubcategoryId"],
  {}
)
@Index(
  "suppliers_default_expense_money_source_id_foreign",
  ["defaultExpenseMoneySourceId"],
  {}
)
@Index("suppliers_default_branch_id_foreign", ["defaultBranchId"], {})
@Entity("suppliers", { schema: "inopack" })
export class Suppliers {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "abbreviation", length: 255 })
  abbreviation: string;

  @Column("varchar", { name: "house_phone", length: 255 })
  housePhone: string;

  @Column("varchar", { name: "address1", length: 60 })
  address1: string;

  @Column("varchar", { name: "address2", length: 60 })
  address2: string;

  @Column("varchar", { name: "country", length: 255 })
  country: string;

  @Column("varchar", { name: "city", length: 255 })
  city: string;

  @Column("varchar", { name: "zip_code", length: 255 })
  zipCode: string;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "default_branch_id", nullable: true, unsigned: true })
  defaultBranchId: number | null;

  @Column("int", {
    name: "default_expense_type_id",
    nullable: true,
    unsigned: true,
  })
  defaultExpenseTypeId: number | null;

  @Column("int", {
    name: "default_expense_subcategory_id",
    nullable: true,
    unsigned: true,
  })
  defaultExpenseSubcategoryId: number | null;

  @Column("int", {
    name: "default_expense_money_source_id",
    nullable: true,
    unsigned: true,
  })
  defaultExpenseMoneySourceId: number | null;

  @OneToMany(
    () => EquipmentTransactions,
    (equipmentTransactions) => equipmentTransactions.supplier
  )
  equipmentTransactions: EquipmentTransactions[];

  @OneToMany(() => Expenses, (expenses) => expenses.supplier)
  expenses: Expenses[];

  @OneToMany(() => OtherIncomes, (otherIncomes) => otherIncomes.supplier)
  otherIncomes: OtherIncomes[];

  @ManyToOne(() => Branches, (branches) => branches.suppliers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "default_branch_id", referencedColumnName: "id" }])
  defaultBranch: Branches;

  @ManyToOne(
    () => ExpenseMoneySources,
    (expenseMoneySources) => expenseMoneySources.suppliers,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "default_expense_money_source_id", referencedColumnName: "id" },
  ])
  defaultExpenseMoneySource: ExpenseMoneySources;

  @ManyToOne(
    () => ExpenseSubcategories,
    (expenseSubcategories) => expenseSubcategories.suppliers,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "default_expense_subcategory_id", referencedColumnName: "id" },
  ])
  defaultExpenseSubcategory: ExpenseSubcategories;

  @ManyToOne(() => ExpenseType, (expenseType) => expenseType.suppliers, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "default_expense_type_id", referencedColumnName: "id" }])
  defaultExpenseType: ExpenseType;
}
