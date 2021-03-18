import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Machines } from "./Machines";
import { OrderProductions } from "./OrderProductions";
import { Products } from "./Products";

@Index("order_production_products_product_id_foreign", ["productId"], {})
@Index("order_production_products_machine_id_foreign", ["machineId"], {})
@Index(
  "order_production_products_order_production_id_foreign",
  ["orderProductionId"],
  {}
)
@Entity("order_production_products", { schema: "inopack" })
export class OrderProductionProducts {
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

  @Column("double", {
    name: "group_weight",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  groupWeight: number | null;

  @Column("int", { name: "product_id", nullable: true, unsigned: true })
  productId: number | null;

  @Column("int", { name: "machine_id", nullable: true, unsigned: true })
  machineId: number | null;

  @Column("int", {
    name: "order_production_id",
    nullable: true,
    unsigned: true,
  })
  orderProductionId: number | null;

  @ManyToOne(() => Machines, (machines) => machines.orderProductionProducts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "machine_id", referencedColumnName: "id" }])
  machine: Machines;

  @ManyToOne(
    () => OrderProductions,
    (orderProductions) => orderProductions.orderProductionProducts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "order_production_id", referencedColumnName: "id" }])
  orderProduction: OrderProductions;

  @ManyToOne(() => Products, (products) => products.orderProductionProducts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "id" }])
  product: Products;
}
