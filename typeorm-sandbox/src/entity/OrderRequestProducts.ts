import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderRequests } from "./OrderRequests";
import { Products } from "./Products";

@Index("order_request_products_product_id_foreign", ["productId"], {})
@Index(
  "order_request_products_order_request_id_foreign",
  ["orderRequestId"],
  {}
)
@Entity("order_request_products", { schema: "inopack" })
export class OrderRequestProducts {
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

  @Column("int", { name: "order_request_id", nullable: true, unsigned: true })
  orderRequestId: number | null;

  @ManyToOne(
    () => OrderRequests,
    (orderRequests) => orderRequests.orderRequestProducts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "order_request_id", referencedColumnName: "id" }])
  orderRequest: OrderRequests;

  @ManyToOne(() => Products, (products) => products.orderRequestProducts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Products;
}
