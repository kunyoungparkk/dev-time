import Link from "next/link";
export default function Timer() {
  return (
    <div>Timer <br/>
    <Link href={'/timer/todos'}>Todos</Link><br/>
    <Link href={'/timer/review'}>Review</Link><br/>
    <Link href={'/timer/todos-edit/0'}>Todos Edit</Link><br/>
    </div>
  );
}
