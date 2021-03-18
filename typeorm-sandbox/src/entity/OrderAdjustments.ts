import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderAdjustmentProducts } from "./OrderAdjustmentProducts";
import { OrderAdjustmentType } from "./OrderAdjustmentType";

@Index(
  "order_adjustments_order_adjustment_type_id_foreign",
  ["orderAdjustmentTypeId"],
  {}
)
@Entity("order_adjustments", { schema: "inopack" })
export class OrderAdjustments {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("date", { name: "date" })
  date: string;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", {
    name: "order_adjustment_type_id",
    nullable: true,
    unsigned: true,
  })
  orderAdjustmentTypeId: number | null;

  @OneToMany(
    () => OrderAdjustmentProducts,
    (orderAdjustmentProducts) => orderAdjustmentProducts.orderAdjustment
  )
  orderAdjustmentProducts: OrderAdjustmentProducts[];

  @ManyToOne(
    () => OrderAdjustmentType,
    (orderAdjustmentType) => orderAdjustmentType.orderAdjustments,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "order_adjustment_type_id", referencedColumnName: "id" },
  ])
  orderAdjustmentType: OrderAdjustmentType;
}
