import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Clients } from "./Clients";
import { OrderRequests } from "./OrderRequests";
import { OrderSales } from "./OrderSales";

@Index("clients_company_id_foreign", ["clientId"], {})
@Entity("client_contacts", { schema: "inopack" })
export class ClientContacts {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("varchar", { name: "first_name", length: 255 })
  firstName: string;

  @Column("varchar", { name: "last_name", length: 255 })
  lastName: string;

  @Column("varchar", { name: "cellphone", length: 255 })
  cellphone: string;

  @Column("varchar", { name: "email", length: 255 })
  email: string;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "client_id", nullable: true, unsigned: true })
  clientId: number | null;

  @Column("varchar", { name: "fullname", length: 255 })
  fullname: string;

  @ManyToOne(() => Clients, (clients) => clients.clientContacts, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "client_id", referencedColumnName: "id" }])
  client: Clients;

  @OneToMany(
    () => OrderRequests,
    (orderRequests) => orderRequests.clientContact
  )
  orderRequests: OrderRequests[];

  @OneToMany(() => OrderSales, (orderSales) => orderSales.clientContact)
  orderSales: OrderSales[];
}
