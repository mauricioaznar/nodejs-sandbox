import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderSalePayments } from "./OrderSalePayments";
import { OrderSaleProducts } from "./OrderSaleProducts";
import { ClientContacts } from "./ClientContacts";
import { OrderRequests } from "./OrderRequests";
import { OrderSaleCollectionStatuses } from "./OrderSaleCollectionStatuses";
import { OrderSalePaymentType } from "./OrderSalePaymentType";
import { OrderSaleReceiptType } from "./OrderSaleReceiptType";
import { OrderSaleStatuses } from "./OrderSaleStatuses";

@Index("order_sales_client_id_foreign", ["clientContactId"], {})
@Index("order_sales_order_sale_status_id_foreign", ["orderSaleStatusId"], {})
@Index("order_sales_order_request_id_foreign", ["orderRequestId"], {})
@Index(
  "order_sales_order_sale_receipt_type_id_foreign",
  ["orderSaleReceiptTypeId"],
  {}
)
@Index(
  "order_sales_order_sale_payment_type_id_foreign",
  ["orderSalePaymentTypeId"],
  {}
)
@Index(
  "order_sales_order_sale_collection_status_id_foreign",
  ["orderSaleCollectionStatusId"],
  {}
)
@Entity("order_sales", { schema: "inopack" })
export class OrderSales {
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

  @Column("int", { name: "client_contact_id", nullable: true, unsigned: true })
  clientContactId: number | null;

  @Column("int", {
    name: "order_sale_status_id",
    nullable: true,
    unsigned: true,
  })
  orderSaleStatusId: number | null;

  @Column("int", { name: "order_request_id", nullable: true, unsigned: true })
  orderRequestId: number | null;

  @Column("int", {
    name: "order_sale_receipt_type_id",
    nullable: true,
    unsigned: true,
  })
  orderSaleReceiptTypeId: number | null;

  @Column("int", {
    name: "order_sale_payment_type_id",
    nullable: true,
    unsigned: true,
  })
  orderSalePaymentTypeId: number | null;

  @Column("double", { name: "amount_collected", precision: 8, scale: 2 })
  amountCollected: number;

  @Column("int", {
    name: "order_sale_collection_status_id",
    nullable: true,
    unsigned: true,
  })
  orderSaleCollectionStatusId: number | null;

  @Column("date", { name: "date_collected", nullable: true })
  dateCollected: string | null;

  @Column("int", { name: "invoice_code" })
  invoiceCode: number;

  @OneToMany(
    () => OrderSalePayments,
    (orderSalePayments) => orderSalePayments.orderSale
  )
  orderSalePayments: OrderSalePayments[];

  @OneToMany(
    () => OrderSaleProducts,
    (orderSaleProducts) => orderSaleProducts.orderSale
  )
  orderSaleProducts: OrderSaleProducts[];

  @ManyToOne(
    () => ClientContacts,
    (clientContacts) => clientContacts.orderSales,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "client_contact_id", referencedColumnName: "id" }])
  clientContact: ClientContacts;

  @ManyToOne(() => OrderRequests, (orderRequests) => orderRequests.orderSales, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "order_request_id", referencedColumnName: "id" }])
  orderRequest: OrderRequests;

  @ManyToOne(
    () => OrderSaleCollectionStatuses,
    (orderSaleCollectionStatuses) => orderSaleCollectionStatuses.orderSales,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "order_sale_collection_status_id", referencedColumnName: "id" },
  ])
  orderSaleCollectionStatus: OrderSaleCollectionStatuses;

  @ManyToOne(
    () => OrderSalePaymentType,
    (orderSalePaymentType) => orderSalePaymentType.orderSales,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "order_sale_payment_type_id", referencedColumnName: "id" },
  ])
  orderSalePaymentType: OrderSalePaymentType;

  @ManyToOne(
    () => OrderSaleReceiptType,
    (orderSaleReceiptType) => orderSaleReceiptType.orderSales,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "order_sale_receipt_type_id", referencedColumnName: "id" },
  ])
  orderSaleReceiptType: OrderSaleReceiptType;

  @ManyToOne(
    () => OrderSaleStatuses,
    (orderSaleStatuses) => orderSaleStatuses.orderSales,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "order_sale_status_id", referencedColumnName: "id" }])
  orderSaleStatus: OrderSaleStatuses;
}
