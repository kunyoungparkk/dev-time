import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/signup">Sign-Up</Link><br/>
      <Link href="/login">Login</Link>
    </div>
  );
}
