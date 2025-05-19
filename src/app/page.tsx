"use client"

import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();

  useEffect(() => {
    router.push("/en/login");
  }, [router])
  return (
    <Box >

    </Box>
  );
}
