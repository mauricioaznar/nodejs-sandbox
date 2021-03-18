import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Suppliers } from "./Suppliers";

@Index("other_incomes_supplier_id_foreign", ["supplierId"], {})
@Entity("other_incomes", { schema: "inopack" })
export class OtherIncomes {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("date", { name: "date" })
  date: string;

  @Column("double", { name: "total", precision: 8, scale: 2 })
  total: number;

  @Column("varchar", { name: "description", length: 255 })
  description: string;

  @Column("int", { name: "supplier_id", nullable: true, unsigned: true })
  supplierId: number | null;

  @ManyToOne(() => Suppliers, (suppliers) => suppliers.otherIncomes, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "supplier_id", referencedColumnName: "id" }])
  supplier: Suppliers;
}
