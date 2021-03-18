import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Expenses } from "./Expenses";
import { Products } from "./Products";

@Index("expense_products_product_id_foreign", ["productId"], {})
@Index("expense_products_expense_id_foreign", ["expenseId"], {})
@Entity("expense_products", { schema: "inopack" })
export class ExpenseProducts {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("double", { name: "kilos", precision: 8, scale: 2 })
  kilos: number;

  @Column("double", { name: "groups", nullable: true, precision: 8, scale: 2 })
  groups: number | null;

  @Column("double", { name: "kilo_price", precision: 8, scale: 2 })
  kiloPrice: number;

  @Column("double", {
    name: "group_weight",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  groupWeight: number | null;

  @Column("int", { name: "product_id", nullable: true, unsigned: true })
  productId: number | null;

  @Column("int", { name: "expense_id", nullable: true, unsigned: true })
  expenseId: number | null;

  @ManyToOne(() => Expenses, (expenses) => expenses.expenseProducts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "expense_id", referencedColumnName: "id" }])
  expense: Expenses;

  @ManyToOne(() => Products, (products) => products.expenseProducts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Products;
}
