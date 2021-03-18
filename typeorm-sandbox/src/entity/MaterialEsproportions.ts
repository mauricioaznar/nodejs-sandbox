import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ExpenseSubcategories } from "./ExpenseSubcategories";
import { Materials } from "./Materials";

@Index(
  "material_esproportions_expense_subcategory_id_foreign",
  ["expenseSubcategoryId"],
  {}
)
@Index("material_esproportions_material_id_foreign", ["materialId"], {})
@Entity("material_esproportions", { schema: "inopack" })
export class MaterialEsproportions {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("date", { name: "start_date" })
  startDate: string;

  @Column("date", { name: "end_date" })
  endDate: string;

  @Column("double", { name: "proportion", precision: 4, scale: 3 })
  proportion: number;

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

  @Column("int", { name: "material_id", nullable: true, unsigned: true })
  materialId: number | null;

  @ManyToOne(
    () => ExpenseSubcategories,
    (expenseSubcategories) => expenseSubcategories.materialEsproportions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "expense_subcategory_id", referencedColumnName: "id" }])
  expenseSubcategory: ExpenseSubcategories;

  @ManyToOne(() => Materials, (materials) => materials.materialEsproportions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "material_id", referencedColumnName: "id" }])
  material: Materials;
}
