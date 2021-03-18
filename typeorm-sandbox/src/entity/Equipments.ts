import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BranchesEquipments } from "./BranchesEquipments";
import { EquipmentTransactionItems } from "./EquipmentTransactionItems";
import { EquipmentCategories } from "./EquipmentCategories";
import { EquipmentMeasurementUnits } from "./EquipmentMeasurementUnits";
import { EquipmentSubcategories } from "./EquipmentSubcategories";
import { MachinesEquipments } from "./MachinesEquipments";

@Index("equipments_equipment_category_id_foreign", ["equipmentCategoryId"], {})
@Index(
  "equipments_equipment_subcategory_id_foreign",
  ["equipmentSubcategoryId"],
  {}
)
@Index(
  "equipments_equipment_measurement_unit_id_foreign",
  ["equipmentMeasurementUnitId"],
  {}
)
@Entity("equipments", { schema: "inopack" })
export class Equipments {
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

  @Column("varchar", { name: "description", length: 255 })
  description: string;

  @Column("int", {
    name: "equipment_category_id",
    nullable: true,
    unsigned: true,
  })
  equipmentCategoryId: number | null;

  @Column("int", {
    name: "equipment_subcategory_id",
    nullable: true,
    unsigned: true,
  })
  equipmentSubcategoryId: number | null;

  @Column("int", {
    name: "equipment_measurement_unit_id",
    nullable: true,
    unsigned: true,
  })
  equipmentMeasurementUnitId: number | null;

  @Column("varchar", { name: "image_name", length: 255 })
  imageName: string;

  @OneToMany(
    () => BranchesEquipments,
    (branchesEquipments) => branchesEquipments.equipment
  )
  branchesEquipments: BranchesEquipments[];

  @OneToMany(
    () => EquipmentTransactionItems,
    (equipmentTransactionItems) => equipmentTransactionItems.equipment
  )
  equipmentTransactionItems: EquipmentTransactionItems[];

  @ManyToOne(
    () => EquipmentCategories,
    (equipmentCategories) => equipmentCategories.equipments,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "equipment_category_id", referencedColumnName: "id" }])
  equipmentCategory: EquipmentCategories;

  @ManyToOne(
    () => EquipmentMeasurementUnits,
    (equipmentMeasurementUnits) => equipmentMeasurementUnits.equipments,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "equipment_measurement_unit_id", referencedColumnName: "id" },
  ])
  equipmentMeasurementUnit: EquipmentMeasurementUnits;

  @ManyToOne(
    () => EquipmentSubcategories,
    (equipmentSubcategories) => equipmentSubcategories.equipments,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "equipment_subcategory_id", referencedColumnName: "id" },
  ])
  equipmentSubcategory: EquipmentSubcategories;

  @OneToMany(
    () => MachinesEquipments,
    (machinesEquipments) => machinesEquipments.equipment
  )
  machinesEquipments: MachinesEquipments[];
}
