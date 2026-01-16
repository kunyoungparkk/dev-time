import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DoubleChevronRightIcon } from "@/components/icons";

export default function Home() {
  return (
    <div>
    <Button variant="primary">Button</Button><br/><br/>
    <Button variant="secondary">Button</Button><br/><br/>
    <Button variant="tertiary">Button</Button><br/> <br/>

    <DoubleChevronRightIcon />
    <Link href={'/timer'}>Timer</Link><br/>
    <Link href={'/login'}>Login</Link><br/>
    <Link href={'/signup'}>Signup</Link><br/>
    <Link href={'/dashboard/0'}>dashboard</Link><br/>
    <Link href={'/ranking'}>ranking</Link><br/>
    <Link href={'/mypage'}>mypage</Link><br/>
    </div>
  );
}
