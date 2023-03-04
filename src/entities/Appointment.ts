import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

export interface CreateAppointmentDTO {
  provider: string
  date: Date
}

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  provider: string

  @Column('time with time zone')
  date: Date
}

export default Appointment
