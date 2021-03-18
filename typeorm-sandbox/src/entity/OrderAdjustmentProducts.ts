import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderAdjustments } from "./OrderAdjustments";
import { Products } from "./Products";

@Index("order_adjustment_products_product_id_foreign", ["productId"], {})
@Index(
  "order_adjustment_products_order_adjustment_id_foreign",
  ["orderAdjustmentId"],
  {}
)
@Entity("order_adjustment_products", { schema: "inopack" })
export class OrderAdjustmentProducts {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

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

  @Column("double", {
    name: "group_weight",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  groupWeight: number | null;

  @Column("int", { name: "product_id", nullable: true, unsigned: true })
  productId: number | null;

  @Column("int", {
    name: "order_adjustment_id",
    nullable: true,
    unsigned: true,
  })
  orderAdjustmentId: number | null;

  @ManyToOne(
    () => OrderAdjustments,
    (orderAdjustments) => orderAdjustments.orderAdjustmentProducts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "order_adjustment_id", referencedColumnName: "id" }])
  orderAdjustment: OrderAdjustments;

  @ManyToOne(() => Products, (products) => products.orderAdjustmentProducts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Products;
}
