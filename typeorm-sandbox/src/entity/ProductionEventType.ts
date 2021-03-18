import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductionEProductionEt } from "./ProductionEProductionEt";
import { ProductionEvents } from "./ProductionEvents";

@Entity("production_event_type", { schema: "inopack" })
export class ProductionEventType {
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

  @OneToMany(
    () => ProductionEProductionEt,
    (productionEProductionEt) => productionEProductionEt.productionEventType
  )
  productionEProductionEts: ProductionEProductionEt[];

  @OneToMany(
    () => ProductionEvents,
    (productionEvents) => productionEvents.productionEventType
  )
  productionEvents: ProductionEvents[];
}
