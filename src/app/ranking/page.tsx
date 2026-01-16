import Link from "next/link";

export default function Ranking() {
  return (
    <div>Ranking<br/>
      <Link href={'/dashboard/0'}>user0 dashboard</Link><br/>
      <Link href={'/dashboard/1'}>user1 dashboard</Link><br/>
      <Link href={'/dashboard/2'}>user2 dashboard</Link><br/>
    </div>
  );
}
