import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderReturnType } from "./OrderReturnType";

@Index("order_returns_order_return_type_id_foreign", ["orderReturnTypeId"], {})
@Entity("order_returns", { schema: "inopack" })
export class OrderReturns {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("date", { name: "date" })
  date: string;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("double", { name: "quantity", precision: 8, scale: 2 })
  quantity: number;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", {
    name: "order_return_type_id",
    nullable: true,
    unsigned: true,
  })
  orderReturnTypeId: number | null;

  @ManyToOne(
    () => OrderReturnType,
    (orderReturnType) => orderReturnType.orderReturns,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "order_return_type_id", referencedColumnName: "id" }])
  orderReturnType: OrderReturnType;
}
