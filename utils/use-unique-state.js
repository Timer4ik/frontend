import { v4 } from "uuid"
export default (data) => useState(v4(), () => data) 