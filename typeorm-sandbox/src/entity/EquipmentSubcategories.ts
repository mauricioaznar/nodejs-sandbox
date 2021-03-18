import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EquipmentCategories } from "./EquipmentCategories";
import { Equipments } from "./Equipments";

@Index(
  "equipment_subcategories_equipment_category_id_foreign",
  ["equipmentCategoryId"],
  {}
)
@Entity("equipment_subcategories", { schema: "inopack" })
export class EquipmentSubcategories {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", {
    name: "equipment_category_id",
    nullable: true,
    unsigned: true,
  })
  equipmentCategoryId: number | null;

  @ManyToOne(
    () => EquipmentCategories,
    (equipmentCategories) => equipmentCategories.equipmentSubcategories,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "equipment_category_id", referencedColumnName: "id" }])
  equipmentCategory: EquipmentCategories;

  @OneToMany(() => Equipments, (equipments) => equipments.equipmentSubcategory)
  equipments: Equipments[];
}
