import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderSales } from "./OrderSales";

@Entity("order_sale_receipt_type", { schema: "inopack" })
export class OrderSaleReceiptType {
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

  @OneToMany(() => OrderSales, (orderSales) => orderSales.orderSaleReceiptType)
  orderSales: OrderSales[];
}
