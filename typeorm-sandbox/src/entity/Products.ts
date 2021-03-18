import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ExpenseProducts } from "./ExpenseProducts";
import { OrderAdjustmentProducts } from "./OrderAdjustmentProducts";
import { OrderProductionProducts } from "./OrderProductionProducts";
import { OrderRequestProducts } from "./OrderRequestProducts";
import { OrderSaleProducts } from "./OrderSaleProducts";
import { Materials } from "./Materials";
import { Packings } from "./Packings";
import { ProductType } from "./ProductType";

@Index("products_material_id_foreign", ["materialId"], {})
@Index("products_packing_id_foreign", ["packingId"], {})
@Index("products_product_type_id_foreign", ["productTypeId"], {})
@Entity("products", { schema: "inopack" })
export class Products {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("int", { name: "group_weight_strict", default: () => "'0'" })
  groupWeightStrict: number;

  @Column("varchar", { name: "code", length: 255 })
  code: string;

  @Column("varchar", { name: "description", length: 255 })
  description: string;

  @Column("double", { name: "current_kilo_price", precision: 8, scale: 2 })
  currentKiloPrice: number;

  @Column("double", { name: "width", precision: 8, scale: 2 })
  width: number;

  @Column("double", { name: "length", nullable: true, precision: 8, scale: 2 })
  length: number | null;

  @Column("double", {
    name: "current_group_weight",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  currentGroupWeight: number | null;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "material_id", nullable: true, unsigned: true })
  materialId: number | null;

  @Column("int", { name: "packing_id", nullable: true, unsigned: true })
  packingId: number | null;

  @Column("int", { name: "product_type_id", nullable: true, unsigned: true })
  productTypeId: number | null;

  @Column("double", { name: "calibre", precision: 8, scale: 2 })
  calibre: number;

  @OneToMany(
    () => ExpenseProducts,
    (expenseProducts) => expenseProducts.product
  )
  expenseProducts: ExpenseProducts[];

  @OneToMany(
    () => OrderAdjustmentProducts,
    (orderAdjustmentProducts) => orderAdjustmentProducts.product
  )
  orderAdjustmentProducts: OrderAdjustmentProducts[];

  @OneToMany(
    () => OrderProductionProducts,
    (orderProductionProducts) => orderProductionProducts.product
  )
  orderProductionProducts: OrderProductionProducts[];

  @OneToMany(
    () => OrderRequestProducts,
    (orderRequestProducts) => orderRequestProducts.product
  )
  orderRequestProducts: OrderRequestProducts[];

  @OneToMany(
    () => OrderSaleProducts,
    (orderSaleProducts) => orderSaleProducts.product
  )
  orderSaleProducts: OrderSaleProducts[];

  @ManyToOne(() => Materials, (materials) => materials.products, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "material_id", referencedColumnName: "id" }])
  material: Materials;

  @ManyToOne(() => Packings, (packings) => packings.products, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "packing_id", referencedColumnName: "id" }])
  packing: Packings;

  @ManyToOne(() => ProductType, (productType) => productType.products, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "product_type_id", referencedColumnName: "id" }])
  productType: ProductType;
}
