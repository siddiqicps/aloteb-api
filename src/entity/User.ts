import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    uid: number

    @Column({ type: "varchar", length: 60 })
    username: string

    @Column({ type: "varchar", length: 64 })
    password: string

    @Column({ type: "int", width: 4 })
    role_id: number

    @Column({ type: "varchar", length: 80 })
    name: string

    @Column({ type: "varchar", length: 60 })
    email: string

    @Column({ type: "varchar", length: 100 })
    contact_no: string

    @Column({ type: "text" })
    user_address: string

    @Column({ type: "text" })
    user_other_details: string

    @Column({ type: "varchar", length: 255 })
    user_bank_details: string

    @Column({ type: "datetime" })
    last_login_time: string

    @Column({ type: "varchar", length: 32 })
    last_login_ip: string

    @Column({ type: "datetime" })
    last_logout_time: string

    @Column({ type: "tinyint", width: 1 })
    login_status: number

    @Column({type: "datetime"})
    add_date_time: string

    @Column({ type: "datetime" })
    modified_date_time: string

    @Column({ type: "tinyint", width: 4 })
    status: number

    @Column({ type: "text" })
    access_token: string

}
