import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FileMetadata {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fileName: string;

    @Column()
    fileUrl: string;

    @Column('int')
    size: number;

    @Column()
    mimeType: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
