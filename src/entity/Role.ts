import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name: 'roles'})
export class Role {

    @PrimaryGeneratedColumn()
    role_id: number

    @Column({ type: "varchar", length: 64 })
    role_title: string

    @Column({ type: "varchar", length: 64 })
    alias: string

}
