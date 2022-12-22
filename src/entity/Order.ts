import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name: 'orders'})
export class Order {
    
    @PrimaryGeneratedColumn()
    order_id: number;

    @Column({ type: "varchar", length: 30 })
    customer_first_name: string;
    
    @Column({ type: "varchar", length: 30 })
    customer_last_name: string;

    @Column({ type: "varchar", length: 60 })
    status: string;

    @Column({ type: "int", width: 10 })
    total_item_count: number;

    @Column({ type: "float", width: 10 })
    base_sub_total: number;

    @Column({ type: "float", width: 10 })
    base_grand_total: number;

    @Column({ type: "varchar", length: 60 })
    created_at: string;

    @Column({ type: "varchar", length: 60 })
    updated_at: string;

    // @ApiProperty()
    // public IsDeleted: boolean = false;

    
    
    // //@ApiProperty()
    // public CreatedBy: string;

}