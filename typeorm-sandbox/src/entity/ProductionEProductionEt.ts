import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductionEvents } from "./ProductionEvents";
import { ProductionEventType } from "./ProductionEventType";

@Index(
  "production_e_production_et_production_event_id_foreign",
  ["productionEventId"],
  {}
)
@Index(
  "production_e_production_et_production_event_type_id_foreign",
  ["productionEventTypeId"],
  {}
)
@Entity("production_e_production_et", { schema: "inopack" })
export class ProductionEProductionEt {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", {
    name: "production_event_id",
    nullable: true,
    unsigned: true,
  })
  productionEventId: number | null;

  @Column("int", {
    name: "production_event_type_id",
    nullable: true,
    unsigned: true,
  })
  productionEventTypeId: number | null;

  @ManyToOne(
    () => ProductionEvents,
    (productionEvents) => productionEvents.productionEProductionEts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "production_event_id", referencedColumnName: "id" }])
  productionEvent: ProductionEvents;

  @ManyToOne(
    () => ProductionEventType,
    (productionEventType) => productionEventType.productionEProductionEts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "production_event_type_id", referencedColumnName: "id" },
  ])
  productionEventType: ProductionEventType;
}
