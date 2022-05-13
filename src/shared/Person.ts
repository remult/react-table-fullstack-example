import { Entity, Fields } from "remult";

@Entity("person",
    { allowApiCrud: true })
export class Person {
    @Fields.uuid()
    id?: string;

    @Fields.string()
    firstName = '';

    @Fields.string()
    lastName = '';

    @Fields.integer()
    age = 0;

    @Fields.integer()
    visits = 0;

    @Fields.integer({ caption: "Profile Progress" })
    progress = 0;

    @Fields.string()
    status = '';
}