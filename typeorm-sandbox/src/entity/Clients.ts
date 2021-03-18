import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClientContacts } from "./ClientContacts";
import { OrderRequests } from "./OrderRequests";

@Entity("clients", { schema: "inopack" })
export class Clients {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "abbreviation", length: 255 })
  abbreviation: string;

  @Column("varchar", { name: "house_phone", length: 255 })
  housePhone: string;

  @Column("varchar", { name: "address1", length: 60 })
  address1: string;

  @Column("varchar", { name: "address2", length: 60 })
  address2: string;

  @Column("varchar", { name: "country", length: 255 })
  country: string;

  @Column("varchar", { name: "city", length: 255 })
  city: string;

  @Column("varchar", { name: "zip_code", length: 255 })
  zipCode: string;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => ClientContacts, (clientContacts) => clientContacts.client)
  clientContacts: ClientContacts[];

  @OneToMany(() => OrderRequests, (orderRequests) => orderRequests.client)
  orderRequests: OrderRequests[];
}
