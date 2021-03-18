import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderSaleCollectionStatuses } from "./OrderSaleCollectionStatuses";
import { OrderSales } from "./OrderSales";

@Index("order_sale_payments_order_sale_id_foreign", ["orderSaleId"], {})
@Index(
  "order_sale_payments_order_sale_collection_status_id_foreign",
  ["orderSaleCollectionStatusId"],
  {}
)
@Entity("order_sale_payments", { schema: "inopack" })
export class OrderSalePayments {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("date", { name: "date_paid" })
  datePaid: string;

  @Column("double", { name: "amount", precision: 10, scale: 2 })
  amount: number;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "order_sale_id", nullable: true, unsigned: true })
  orderSaleId: number | null;

  @Column("int", {
    name: "order_sale_collection_status_id",
    nullable: true,
    unsigned: true,
  })
  orderSaleCollectionStatusId: number | null;

  @ManyToOne(
    () => OrderSaleCollectionStatuses,
    (orderSaleCollectionStatuses) =>
      orderSaleCollectionStatuses.orderSalePayments,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "order_sale_collection_status_id", referencedColumnName: "id" },
  ])
  orderSaleCollectionStatus: OrderSaleCollectionStatuses;

  @ManyToOne(() => OrderSales, (orderSales) => orderSales.orderSalePayments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "order_sale_id", referencedColumnName: "id" }])
  orderSale: OrderSales;
}
