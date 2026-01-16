import Link from "next/link";
export default function Home() {
  return (
    <div>
    <Link href={'/timer'}>Timer</Link><br/>
    <Link href={'/login'}>Login</Link><br/>
    <Link href={'/signup'}>Signup</Link><br/>
    <Link href={'/dashboard/0'}>dashboard</Link><br/>
    <Link href={'/ranking'}>ranking</Link><br/>
    <Link href={'/mypage'}>mypage</Link><br/>
    </div>
  );
}
