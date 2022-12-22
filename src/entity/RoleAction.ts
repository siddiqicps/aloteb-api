import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name: 'role_actions'})
export class RoleAction {

    @PrimaryGeneratedColumn()
    role_action_id: number

    @Column({ type: "int", width: 4 })
    role_id: number

    @Column({ type: "varchar", length: 80 })
    action: string

}
