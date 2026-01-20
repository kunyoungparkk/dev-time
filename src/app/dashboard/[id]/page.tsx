import Link from "next/link";

export default function Dashboard() {
  return (
    <div>Dashboard <br/>
    <Link href={'/dashboard/0/detail'}>Detail</Link>
    </div>
  );
}
