import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderRequestProducts } from "./OrderRequestProducts";
import { ClientContacts } from "./ClientContacts";
import { Clients } from "./Clients";
import { OrderRequestStatuses } from "./OrderRequestStatuses";
import { OrderSales } from "./OrderSales";

@Index("order_requests_company_id_foreign", ["clientId"], {})
@Index("order_requests_client_id_foreign", ["clientContactId"], {})
@Index(
  "order_requests_order_request_status_id_foreign",
  ["orderRequestStatusId"],
  {}
)
@Entity("order_requests", { schema: "inopack" })
export class OrderRequests {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "order_code" })
  orderCode: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("date", { name: "date" })
  date: string;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "client_id", nullable: true, unsigned: true })
  clientId: number | null;

  @Column("int", { name: "client_contact_id", nullable: true, unsigned: true })
  clientContactId: number | null;

  @Column("int", {
    name: "order_request_status_id",
    nullable: true,
    unsigned: true,
  })
  orderRequestStatusId: number | null;

  @Column("date", { name: "estimated_delivery_date" })
  estimatedDeliveryDate: string;

  @Column("double", { name: "priority", precision: 8, scale: 2 })
  priority: number;

  @OneToMany(
    () => OrderRequestProducts,
    (orderRequestProducts) => orderRequestProducts.orderRequest
  )
  orderRequestProducts: OrderRequestProducts[];

  @ManyToOne(
    () => ClientContacts,
    (clientContacts) => clientContacts.orderRequests,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "client_contact_id", referencedColumnName: "id" }])
  clientContact: ClientContacts;

  @ManyToOne(() => Clients, (clients) => clients.orderRequests, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "id" }])
  client: Clients;

  @ManyToOne(
    () => OrderRequestStatuses,
    (orderRequestStatuses) => orderRequestStatuses.orderRequests,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "order_request_status_id", referencedColumnName: "id" }])
  orderRequestStatus: OrderRequestStatuses;

  @OneToMany(() => OrderSales, (orderSales) => orderSales.orderRequest)
  orderSales: OrderSales[];
}
