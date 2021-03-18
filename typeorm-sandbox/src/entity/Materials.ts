import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { MaterialEsproportions } from "./MaterialEsproportions";
import { ProductType } from "./ProductType";
import { Products } from "./Products";

@Index("materials_product_type_id_foreign", ["productTypeId"], {})
@Entity("materials", { schema: "inopack" })
export class Materials {
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

  @Column("int", { name: "product_type_id", nullable: true, unsigned: true })
  productTypeId: number | null;

  @OneToMany(
    () => MaterialEsproportions,
    (materialEsproportions) => materialEsproportions.material
  )
  materialEsproportions: MaterialEsproportions[];

  @ManyToOne(() => ProductType, (productType) => productType.materials, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "product_type_id", referencedColumnName: "id" }])
  productType: ProductType;

  @OneToMany(() => Products, (products) => products.material)
  products: Products[];
}
