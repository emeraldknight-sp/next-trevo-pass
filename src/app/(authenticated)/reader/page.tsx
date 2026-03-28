"use client";

import { Html5QrcodeScanner } from "html5-qrcode";
import { createTransactionController } from "@/features/transactions/controllers/transaction.controller";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { useEffect } from "react";

export default function Reader() {
  const { user } = useAuth();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false,
    );

    scanner.render(
      async (decodedText) => {
        if (!decodedText || decodedText.length < 20) return;

        try {
          const data = JSON.parse(decodedText);
          console.log("PARSED: ", data)
          await createTransactionController({ transactionId: data.id, customerId: user!.uid });
          // await fetch("/api/transaction", {
          //   method: "POST",
          //   body: JSON.stringify({
          //     transactionId: data.id,
          //     customerId: user!.uid
          //   })
          // })
          toast.success("QR LIDO");
        } catch (error: unknown) {
          console.error(error);
          toast.error(`QR invalido: ${error}`, {id: "invalid-qr-code"});
        }
      },
      (error: unknown) => {
        console.warn("QR scan error: ", error);
      },
    );

    return () => {
      scanner.clear();
    };
  }, []);

  return <div id="reader"></div>;
}
