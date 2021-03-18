import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductionEProductionEt } from "./ProductionEProductionEt";
import { Machines } from "./Machines";
import { Employees } from "./Employees";
import { ProductionEventType } from "./ProductionEventType";

@Index("production_events_machine_id_foreign", ["machineId"], {})
@Index(
  "production_events_production_event_type_id_foreign",
  ["productionEventTypeId"],
  {}
)
@Index("production_events_report_employee_id_foreign", ["reportEmployeeId"], {})
@Index(
  "production_events_maintenance_employee_id_foreign",
  ["maintenanceEmployeeId"],
  {}
)
@Entity("production_events", { schema: "inopack" })
export class ProductionEvents {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("datetime", { name: "start_date_time" })
  startDateTime: Date;

  @Column("datetime", { name: "end_date_time" })
  endDateTime: Date;

  @Column("varchar", { name: "maintenance_employee_description", length: 255 })
  maintenanceEmployeeDescription: string;

  @Column("int", { name: "machine_id", nullable: true, unsigned: true })
  machineId: number | null;

  @Column("int", {
    name: "production_event_type_id",
    nullable: true,
    unsigned: true,
  })
  productionEventTypeId: number | null;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "report_employee_id", nullable: true, unsigned: true })
  reportEmployeeId: number | null;

  @Column("int", {
    name: "maintenance_employee_id",
    nullable: true,
    unsigned: true,
  })
  maintenanceEmployeeId: number | null;

  @Column("varchar", { name: "report_employee_description", length: 255 })
  reportEmployeeDescription: string;

  @OneToMany(
    () => ProductionEProductionEt,
    (productionEProductionEt) => productionEProductionEt.productionEvent
  )
  productionEProductionEts: ProductionEProductionEt[];

  @ManyToOne(() => Machines, (machines) => machines.productionEvents, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "machine_id", referencedColumnName: "id" }])
  machine: Machines;

  @ManyToOne(() => Employees, (employees) => employees.productionEvents, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "maintenance_employee_id", referencedColumnName: "id" }])
  maintenanceEmployee: Employees;

  @ManyToOne(
    () => ProductionEventType,
    (productionEventType) => productionEventType.productionEvents,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "production_event_type_id", referencedColumnName: "id" },
  ])
  productionEventType: ProductionEventType;

  @ManyToOne(() => Employees, (employees) => employees.productionEvents2, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "report_employee_id", referencedColumnName: "id" }])
  reportEmployee: Employees;
}
