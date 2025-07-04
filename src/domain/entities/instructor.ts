import { Entity } from "@/core/entities/entity"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"
interface InstructorProps {
  name: string
}
export class Instructor extends Entity<InstructorProps> {
  static create(props: InstructorProps, id?: UniqueEntityId): Instructor {
    return new Instructor({ ...props }, id)
  }

  get name() {
    return this.props?.name
  }
}
