'use client';

import {useState} from "react";
import Link from "next/link";
import { Button, Modal, Logo } from "@/components/ui";
import { DoubleChevronRightIcon } from "@/components/icons";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
    <Button variant="primary" onClick={() => setModalOpen(true)}>Button</Button><br/><br/>
    <Button variant="secondary">Button</Button><br/><br/>
    <Button variant="tertiary">Button</Button><br/> <br/>

    <Modal
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
      title="Sample Modal"
    />

    <Logo /><br/><br/>
    <Logo variant="large" /><br/><br/>

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
